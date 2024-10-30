"use client";
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUpload, FaTimes } from 'react-icons/fa';
import { databases, storage, ID, DATABASE_ID, Query, COLLECTION_ID, BUCKET_ID } from '@/lib/appwrite';
import Image from 'next/image';

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
    <div className="max-w-[2000px] mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">News Management</h1>
            <p className="text-gray-600 mt-1">Manage your website's news and articles</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 
            transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <FaPlus className="text-lg" />
            <span>Create News</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-blue-600 text-lg font-semibold">Total News</div>
            <div className="text-2xl font-bold">{news.length}</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-green-600 text-lg font-semibold">Active News</div>
            <div className="text-2xl font-bold">
              {news.filter(item => item.active).length}
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-purple-600 text-lg font-semibold">With Images</div>
            <div className="text-2xl font-bold">
              {news.filter(item => item.image).length}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              {editingId ? 'Edit News Article' : 'Create New Article'}
            </h2>
          </div>
          
          <div className="p-6">
            {formError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaTimes className="text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700">{formError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  >
                    {Object.entries(NEWS_TYPES).map(([key, value]) => (
                      <option key={key} value={value}>{key}</option>
                    ))}
                  </select>
                </div>

                {formData.type !== 'IMAGE_ONLY' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>
                )}
              </div>

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
        </div>
      )}

      {/* News Grid Section */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-lg">No news articles found</div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Create your first article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {news.map((item) => (
            <div key={item.$id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
              transition-all duration-200 transform hover:-translate-y-1"
            >
              {item.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.alt || item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                {item.content && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.content}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.$id, item.imageId)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
