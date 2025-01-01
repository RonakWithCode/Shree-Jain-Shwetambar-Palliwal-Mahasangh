"use client";
import { useState, useEffect } from 'react';
import { databases, storage, DATABASE_ID, ID, Query,PHOTO_GALLERY_BUCKET_ID ,ENDPOINT } from '@/lib/appwrite';
import { FaPlus, FaTrash, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

// Create new constants for photo gallery collections
const CATEGORIES_COLLECTION_ID = '6721f775003889370163'; // Create this collection in Appwrite
const IMAGES_COLLECTION_ID = '6721f29f00114752fc9b'; // Create this collection in Appwrite
const STORAGE_BUCKET_ID = PHOTO_GALLERY_BUCKET_ID;

export default function PhotoGallery() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchImages(selectedCategory.$id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setCategories(response.documents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const fetchImages = async (categoryId) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        IMAGES_COLLECTION_ID,
        [Query.equal('categoryId', categoryId)]
      );
      setImages(response.documents);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const category = await databases.createDocument(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        ID.unique(),
        {
          name: newCategory,
          isActive: true,
          createdAt: new Date().toISOString(),
        }
      );
      setCategories([category, ...categories]);
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const toggleCategoryStatus = async (category) => {
    try {
      const updatedCategory = await databases.updateDocument(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        category.$id,
        {
          isActive: !category.isActive,
        }
      );
      setCategories(categories.map(cat => 
        cat.$id === category.$id ? updatedCategory : cat
      ));
    } catch (error) {
      console.error('Error toggling category status:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category and all its images?')) return;

    try {
      // Delete all images in the category first
      const images = await databases.listDocuments(
        DATABASE_ID,
        IMAGES_COLLECTION_ID,
        [Query.equal('categoryId', categoryId)]
      );

      for (const image of images.documents) {
        await storage.deleteFile(STORAGE_BUCKET_ID, image.fileId);
        await databases.deleteDocument(DATABASE_ID, IMAGES_COLLECTION_ID, image.$id);
      }

      // Then delete the category
      await databases.deleteDocument(DATABASE_ID, CATEGORIES_COLLECTION_ID, categoryId);
      setCategories(categories.filter(cat => cat.$id !== categoryId));
      if (selectedCategory?.$id === categoryId) {
        setSelectedCategory(null);
        setImages([]);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleImageUpload = async (e) => {
    if (!selectedCategory) return;
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      for (const file of files) {
        // Upload file to storage
        const uploadResponse = await storage.createFile(
          STORAGE_BUCKET_ID,
          ID.unique(),
          file
        );

        // Create image document
        const imageDoc = await databases.createDocument(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          ID.unique(),
          {
            categoryId: selectedCategory.$id,
            fileId: uploadResponse.$id,
            isVisible: true,
            fileName: file.name,
            createdAt: new Date().toISOString(),
          }
        );

        setImages(prev => [imageDoc, ...prev]);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const toggleImageVisibility = async (image) => {
    try {
      const updatedImage = await databases.updateDocument(
        DATABASE_ID,
        IMAGES_COLLECTION_ID,
        image.$id,
        {
          isVisible: !image.isVisible,
        }
      );
      setImages(images.map(img => 
        img.$id === image.$id ? updatedImage : img
      ));
    } catch (error) {
      console.error('Error toggling image visibility:', error);
    }
  };

  const deleteImage = async (image) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, image.fileId);
      await databases.deleteDocument(DATABASE_ID, IMAGES_COLLECTION_ID, image.$id);
      setImages(images.filter(img => img.$id !== image.$id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FaSpinner className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Photo Gallery Categories</h2>
        
        {/* Add Category Form */}
        <form onSubmit={createCategory} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name in Hindi"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500
              font-hindi"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 
              transition-colors duration-200 flex items-center gap-2"
          >
            <FaPlus /> Add Category
          </button>
        </form>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.$id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200
                ${selectedCategory?.$id === category.$id ? 'ring-2 ring-blue-500' : ''}
                ${category.isActive ? 'bg-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{category.name}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategoryStatus(category);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-500"
                  >
                    {category.isActive ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(category.$id);
                    }}
                    className="p-2 text-gray-600 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Management */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Images in {selectedCategory.name}
            </h2>
            <div className="flex items-center gap-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label
                htmlFor="image-upload"
                className={`px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 
                  transition-colors duration-200 flex items-center gap-2 cursor-pointer
                  ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <FaPlus /> Upload Images
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.$id}
                className={`relative group rounded-lg overflow-hidden
                  ${!image.isVisible ? 'opacity-50' : ''}`}
              >
                <Image
    // return `${ENDPOINT}/storage/buckets/${PHOTO_GALLERY_BUCKET_ID}/files/${fileId}/view?project=67237a03002bd713ceaf`;

                  src={`${ENDPOINT}/storage/buckets/${PHOTO_GALLERY_BUCKET_ID}/files/${image.fileId}/view?project=67237a03002bd713ceaf`}
                  alt={image.fileName}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                
                {/* Image Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => toggleImageVisibility(image)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-500"
                  >
                    {image.isVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => deleteImage(image)}
                    className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
