"use client";
import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

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
  const [formData, setFormData] = useState({
    type: 'TEXT_ONLY',
    title: '',
    content: '',
    image: '',
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

      const res = await fetch('/api/admin/news', {
        method: 'GET',
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      
      if (data.success) {
        setNews(data.news);
      } else {
        setError(data.error || 'Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      // Validate form data based on type
      if (formData.type !== 'IMAGE_ONLY' && !formData.title) {
        setFormError('Title is required');
        return;
      }

      if (['IMAGE_ONLY', 'IMAGE_TITLE', 'IMAGE_TITLE_TEXT'].includes(formData.type) && !formData.image) {
        setFormError('Image URL is required');
        return;
      }

      const url = editingId 
        ? `/api/admin/news/${editingId}`
        : '/api/admin/news';

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        await fetchNews();
        setShowForm(false);
        setFormData({
          type: 'TEXT_ONLY',
          title: '',
          content: '',
          image: '',
          alt: '',
          active: true
        });
        setEditingId(null);
      } else {
        setFormError(data.error || 'Failed to save news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      setFormError('Failed to save news');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      
      if (data.success) {
        await fetchNews();
      } else {
        setError(data.error || 'Failed to delete news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      setError('Failed to delete news');
    }
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
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
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
                  setEditingId(null);
                  setFormData({
                    type: 'TEXT_ONLY',
                    title: '',
                    content: '',
                    image: '',
                    alt: '',
                    active: true
                  });
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
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
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
                    onClick={() => handleDelete(item._id)}
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
