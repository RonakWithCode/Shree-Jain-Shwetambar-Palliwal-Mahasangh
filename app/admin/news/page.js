"use client";
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import { databases, storage, ID, DATABASE_ID, COLLECTION_ID, BUCKET_ID } from '@/lib/appwrite';
import Image from 'next/image';
import { Query } from 'appwrite';

const NEWS_TYPES = {
  TEXT_ONLY: 'TEXT_ONLY',
  IMAGE_ONLY: 'IMAGE_ONLY',
  IMAGE_TITLE: 'IMAGE_TITLE',
  IMAGE_TITLE_TEXT: 'IMAGE_TITLE_TEXT'
};

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    type: 'TEXT_ONLY',
    title: '',
    content: '',
    image: '',
    imageId: '',
    alt: '',
    active: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(100)
        ]
      );
      
      setNews(response.documents);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      
      // Update formData with the preview URL and file for later upload
      setFormData(prev => ({
        ...prev,
        image: previewUrl,
        imageFile: file
      }));
    } catch (error) {
      console.error('Error creating preview:', error);
      setFormError(error.message || 'Failed to create preview');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setUploadingImage(true);

    try {
      let imageId = formData.imageId;
      let imageUrl = formData.image;

      // Upload image if there's a new image file
      if (formData.imageFile) {
        const upload = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          formData.imageFile
        );
        imageId = upload.$id;
        console.log(storage.getFilePreview(BUCKET_ID, imageId));
        
        imageUrl = storage.getFilePreview(BUCKET_ID, imageId);
      }

      const newsData = {
        type: formData.type,
        title: formData.title,
        content: formData.content,
        image: imageUrl,
        imageId: imageId,
        alt: formData.alt,
        active: formData.active
      };

      if (editingId) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editingId,
          newsData
        );
      } else {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          newsData
        );
      }

      // Clean up the preview URL
      if (formData.image && formData.image.startsWith('blob:')) {
        URL.revokeObjectURL(formData.image);
      }

      await fetchNews();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving news:', error);
      setFormError('Failed to save news');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.$id);
    setShowForm(true);
  };

  const handleDelete = async (id, imageId) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      
      if (imageId) {
        await storage.deleteFile(BUCKET_ID, imageId);
      }

      await fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      setError('Failed to delete news');
    }
  };

  const resetForm = () => {
    // Clean up any existing preview URL
    if (formData.image && formData.image.startsWith('blob:')) {
      URL.revokeObjectURL(formData.image);
    }
    
    setFormData({
      type: 'TEXT_ONLY',
      title: '',
      content: '',
      image: '',
      imageId: '',
      alt: '',
      active: true
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add News
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit News' : 'Add News'}
          </h2>
          
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 border rounded"
              >
                {Object.entries(NEWS_TYPES).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </select>
            </div>

            {formData.type !== 'IMAGE_ONLY' && (
              <div>
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            {(formData.type === 'IMAGE_ONLY' || formData.type === 'IMAGE_TITLE' || formData.type === 'IMAGE_TITLE_TEXT') && (
              <>
                <div>
                  <label className="block text-gray-700 mb-2">Image</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer flex items-center"
                    >
                      <FaUpload className="mr-2" />
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </label>
                    {formData.image && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Image Alt Text</label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </>
            )}

            {(formData.type === 'TEXT_ONLY' || formData.type === 'IMAGE_TITLE_TEXT') && (
              <div>
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="mr-2"
              />
              <label className="text-gray-700">Active</label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No news items found
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div key={item.$id} className="bg-white p-4 rounded-lg shadow-md">
              {item.image && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={item.image}
                    alt={item.alt || item.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              {item.content && (
                <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
              )}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-sm ${
                  item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.active ? 'Active' : 'Inactive'}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.$id, item.imageId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
