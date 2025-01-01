"use client";
import { useState, useEffect } from 'react';
import { databases, storage, ID, DATABASE_ID, MAGAZINE_COLLECTION_ID, MAGAZINE_BUCKET_ID, Query } from '@/lib/appwrite';
import { FaUpload, FaSpinner, FaTrash, FaEdit, FaEye, FaBook, FaCalendar, FaFilePdf } from 'react-icons/fa';

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
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <FaBook className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Magazine Management</h1>
            <p className="text-gray-600 mt-1">Upload and manage your digital magazines</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              {editingId ? 'Edit Magazine' : 'Add New Magazine'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Magazine Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Enter magazine title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Publish Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendar className="text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Cover Image</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label
                  htmlFor="coverImage"
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg 
                  cursor-pointer hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <FaUpload className="mr-2" />
                  Upload Cover
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cover')}
                  className="hidden"
                  id="coverImage"
                  required={!editingId}
                />
                {preview && (
                  <div className="relative group">
                    <img src={preview} alt="Preview" className="h-32 w-24 object-cover rounded-lg shadow-md" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 
                    transition-opacity rounded-lg flex items-center justify-center">
                      <FaTrash className="text-white cursor-pointer" onClick={() => setPreview(null)} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">PDF File</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label
                  htmlFor="pdfFile"
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg 
                  cursor-pointer hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <FaFilePdf className="mr-2" />
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'pdf')}
                  className="hidden"
                  id="pdfFile"
                  required={!editingId}
                />
                {formData.pdfFile && (
                  <span className="text-sm text-gray-600 truncate max-w-xs">
                    {formData.pdfFile.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                disabled:bg-gray-400 transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>{editingId ? 'Updating...' : 'Uploading...'}</span>
                  </>
                ) : (
                  <span>{editingId ? 'Update Magazine' : 'Upload Magazine'}</span>
                )}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                  transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Magazine List Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Published Magazines</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {magazines.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No magazines published yet
                </div>
              ) : (
                magazines.map((magazine) => (
                  <div key={magazine.$id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between 
                    p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img 
                        src={magazine.coverImageUrl} 
                        alt={magazine.title}
                        className="w-16 h-20 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{magazine.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <FaCalendar className="mr-2" />
                          {new Date(magazine.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => window.open(magazine.pdfFileUrl, '_blank')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View PDF"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(magazine)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(magazine.$id, magazine.coverImageId, magazine.pdfFileId)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 