"use client";
import { useState, useEffect } from 'react';
import { 
  databases, 
  storage, 
  APPLICATION_FORM_COLLECTION_ID, 
  APPLICATION_FORM_BUCKET_ID,
  DATABASE_ID,
  ID,
  Query,
} from '@/lib/appwrite';
import { toast } from 'react-hot-toast';
import { FaDownload, FaTrash, FaEye } from 'react-icons/fa';

export default function ApplicationForms() {
  const [forms, setForms] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    isActive: true,
    category: '',
    file: null
  });

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      
      // Extract unique categories from forms
      const uniqueCategories = [...new Set(response.documents.map(form => form.category))].filter(Boolean);
      setCategories(uniqueCategories.sort());
      
      // Group forms by category
      const groupedForms = response.documents.reduce((acc, form) => {
        const category = form.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(form);
        return acc;
      }, {});
      
      setForms(groupedForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast.error('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);
    try {
      const category = formData.category.trim();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileExtension = formData.file.name.split('.').pop();
      const newFileName = `${formData.title}-${timestamp}.${fileExtension}`;

      const fileBlob = new Blob([formData.file], { type: formData.file.type });
      const newFile = new File([fileBlob], newFileName, { type: formData.file.type });

      const fileUpload = await storage.createFile(
        APPLICATION_FORM_BUCKET_ID,
        ID.unique(),
        newFile
      );

      const downloadUrl = storage.getFileView(
        APPLICATION_FORM_BUCKET_ID,
        fileUpload.$id
      );

      await databases.createDocument(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        ID.unique(),
        {
          title: formData.title,
          isActive: formData.isActive,
          category: category,
          fileId: fileUpload.$id,
          fileName: newFileName,
          fileSize: newFile.size,
          mimeType: newFile.type,
          previewUrl: downloadUrl.toString(),
          downloadUrl: downloadUrl.toString(),
          uploadedAt: new Date().toISOString()
        }
      );

      setFormData({ 
        title: '', 
        isActive: true, 
        category: '', 
        file: null 
      });
      toast.success('Form uploaded successfully');
      fetchForms();
    } catch (error) {
      console.error('Error uploading form:', error);
      toast.error('Failed to upload form');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteForm = async (form) => {
    if (!window.confirm('Are you sure you want to delete this form?')) {
      return;
    }

    try {
      // Delete the file from storage
      await storage.deleteFile(APPLICATION_FORM_BUCKET_ID, form.fileId);
      
      // Delete the document from database
      await databases.deleteDocument(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        form.$id
      );

      toast.success('Form deleted successfully');
      fetchForms();
    } catch (error) {
      console.error('Error deleting form:', error);
      toast.error('Failed to delete form');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Application Forms Management</h1>

      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <div className="flex gap-2">
              {showNewCategoryInput ? (
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter new category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              ) : (
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowNewCategoryInput(!showNewCategoryInput);
                  setFormData(prev => ({ ...prev, category: '' }));
                }}
                className="mt-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {showNewCategoryInput ? 'Select Existing' : 'New Category'}
              </button>
            </div>
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {uploading ? 'Uploading...' : 'Upload Form'}
          </button>
        </form>
      </div>

      {/* Forms List */}
      <div className="space-y-8">
        {Object.entries(forms).map(([category, categoryForms]) => (
          <div key={category} className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold p-6 border-b bg-gray-50">
              {category}
              <span className="ml-2 text-sm text-gray-500">
                ({categoryForms.length})
              </span>
            </h2>
            <div className="divide-y divide-gray-200">
              {categoryForms.map((form) => (
                <div key={form.$id} className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{form.title}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(form.uploadedAt).toLocaleDateString()}
                    </p>
                    {!form.isActive && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <a
                      href={form.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-500"
                      title="Preview"
                    >
                      <FaEye className="h-5 w-5" />
                    </a>
                    <a
                      href={form.downloadUrl}
                      download
                      className="text-gray-400 hover:text-gray-500"
                      title="Download"
                    >
                      <FaDownload className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => handleDeleteForm(form)}
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
