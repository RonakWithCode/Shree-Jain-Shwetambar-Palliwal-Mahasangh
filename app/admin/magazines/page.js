"use client";
import { useState, useEffect } from 'react';
import { databases, storage, ID, DATABASE_ID, MAGAZINE_COLLECTION_ID, MAGAZINE_BUCKET_ID, Query } from '@/lib/appwrite';
import { FaUpload, FaSpinner, FaTrash, FaEdit, FaEye } from 'react-icons/fa';

export default function MagazineManagement() {
  const [loading, setLoading] = useState(false);
  const [magazines, setMagazines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    publishDate: '',
    coverImage: null,
    pdfFile: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MAGAZINE_COLLECTION_ID,
        [Query.orderDesc('publishDate')]
      );
      setMagazines(response.documents);
    } catch (error) {
      console.error('Error fetching magazines:', error);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'cover' && file) {
      setPreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, coverImage: file }));
    } else if (type === 'pdf' && file) {
      setFormData(prev => ({ ...prev, pdfFile: file }));
    }
  };

  const handleDelete = async (id, coverImageId, pdfFileId) => {
    if (!window.confirm('Are you sure you want to delete this magazine?')) return;
    
    try {
      setLoading(true);
      await databases.deleteDocument(DATABASE_ID, MAGAZINE_COLLECTION_ID, id);
      await storage.deleteFile(MAGAZINE_BUCKET_ID, coverImageId);
      await storage.deleteFile(MAGAZINE_BUCKET_ID, pdfFileId);
      await fetchMagazines();
    } catch (error) {
      console.error('Error deleting magazine:', error);
      alert('Error deleting magazine');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (magazine) => {
    setEditingId(magazine.$id);
    setFormData({
      title: magazine.title,
      publishDate: magazine.publishDate,
      coverImage: null,
      pdfFile: null
    });
    setPreview(magazine.coverImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageId = editingId ? magazines.find(m => m.$id === editingId).coverImageId : null;
      let pdfFileId = editingId ? magazines.find(m => m.$id === editingId).pdfFileId : null;
      let coverImageUrl = editingId ? magazines.find(m => m.$id === editingId).coverImageUrl : null;
      let pdfFileUrl = editingId ? magazines.find(m => m.$id === editingId).pdfFileUrl : null;

      if (formData.coverImage) {
        if (coverImageId) {
          await storage.deleteFile(MAGAZINE_BUCKET_ID, coverImageId);
        }
        const coverImageFile = await storage.createFile(
          MAGAZINE_BUCKET_ID,
          ID.unique(),
          formData.coverImage
        );
        coverImageId = coverImageFile.$id;
        coverImageUrl = storage.getFileView(MAGAZINE_BUCKET_ID, coverImageId).toString();
      }

      if (formData.pdfFile) {
        if (pdfFileId) {
          await storage.deleteFile(MAGAZINE_BUCKET_ID, pdfFileId);
        }
        const pdfFile = await storage.createFile(
          MAGAZINE_BUCKET_ID,
          ID.unique(),
          formData.pdfFile
        );
        pdfFileId = pdfFile.$id;
        pdfFileUrl = storage.getFileView(MAGAZINE_BUCKET_ID, pdfFileId).toString();
      }

      const magazineData = {
        title: formData.title,
        publishDate: formData.publishDate,
        coverImageId,
        pdfFileId,
        coverImageUrl,
        pdfFileUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await databases.updateDocument(
          DATABASE_ID,
          MAGAZINE_COLLECTION_ID,
          editingId,
          magazineData
        );
      } else {
        await databases.createDocument(
          DATABASE_ID,
          MAGAZINE_COLLECTION_ID,
          ID.unique(),
          {
            ...magazineData,
            createdAt: new Date().toISOString()
          }
        );
      }

      await fetchMagazines();
      resetForm();
    } catch (error) {
      console.error('Error saving magazine:', error);
      alert('Error saving magazine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      publishDate: '',
      coverImage: null,
      pdfFile: null
    });
    setPreview(null);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">
            {editingId ? 'Edit Magazine' : 'Add New Magazine'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Publish Date</label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Cover Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cover')}
                  className="hidden"
                  id="coverImage"
                  required
                />
                <label
                  htmlFor="coverImage"
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                >
                  <FaUpload className="inline mr-2" />
                  Upload Cover
                </label>
                {preview && (
                  <img src={preview} alt="Preview" className="h-20 w-20 object-cover rounded" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">PDF File</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'pdf')}
                  className="hidden"
                  id="pdfFile"
                  required
                />
                <label
                  htmlFor="pdfFile"
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                >
                  <FaUpload className="inline mr-2" />
                  Upload PDF
                </label>
                {formData.pdfFile && (
                  <span className="text-sm text-gray-600">
                    {formData.pdfFile.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {loading ? (
                  <FaSpinner className="inline animate-spin mr-2" />
                ) : editingId ? 'Update Magazine' : 'Upload Magazine'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Magazine List Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Published Magazines</h2>
          <div className="space-y-4">
            {magazines.map((magazine) => (
              <div key={magazine.$id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={magazine.coverImageUrl} 
                    alt={magazine.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{magazine.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(magazine.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(magazine.pdfFileUrl, '_blank')}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(magazine)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(magazine.$id, magazine.coverImageId, magazine.pdfFileId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 