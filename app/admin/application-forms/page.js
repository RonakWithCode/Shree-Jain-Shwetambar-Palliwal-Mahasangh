"use client";
import { useState, useEffect } from 'react';

import { 
  databases, 
  storage, 
  APPLICATION_FORM_COLLECTION_ID, 
  APPLICATION_FORM_BUCKET_ID,
  DATABASE_ID,
  ID,
  Query 
} from '@/lib/appwrite';
import { toast } from 'react-hot-toast';

export default function ApplicationForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    isActive: true,
    file: null
  });

  // Fetch existing forms
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setForms(response.documents);
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast.error('Failed to fetch forms');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Generate timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileExtension = formData.file.name.split('.').pop();
      const newFileName = `${formData.title}-${timestamp}.${fileExtension}`;

      // Create file with custom name
      const fileBlob = new Blob([formData.file], { type: formData.file.type });
      const newFile = new File([fileBlob], newFileName, { type: formData.file.type });

      // 1. Upload file to storage with timestamp name
      const fileUpload = await storage.createFile(
        APPLICATION_FORM_BUCKET_ID,
        ID.unique(),
        newFile
      );

      // 2. Generate preview and download URLs
  

      const downloadUrl = storage.getFileView(
        APPLICATION_FORM_BUCKET_ID,
        fileUpload.$id
      );

      // 3. Create database entry with URLs
      await databases.createDocument(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        ID.unique(),
        {
          title: formData.title,
          isActive: formData.isActive,
          fileId: fileUpload.$id,
          fileName: newFileName,
          fileSize: newFile.size,
          mimeType: newFile.type,
          previewUrl: downloadUrl.toString(),
          downloadUrl: downloadUrl.toString(),
          uploadedAt: new Date().toISOString()
        }
      );

      // Reset form and refresh list
      setFormData({ title: '', isActive: true, file: null });
      toast.success('Form uploaded successfully');
      fetchForms();
    } catch (error) {
      console.error('Error uploading form:', error);
      toast.error('Failed to upload form');
    } finally {
      setUploading(false);
    }
  };

  const toggleFormStatus = async (form) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        form.$id,
        { isActive: !form.isActive }
      );
      toast.success('Status updated successfully');
      fetchForms();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteForm = async (form) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;

    try {
      // Delete file from storage
      await storage.deleteFile(APPLICATION_FORM_BUCKET_ID, form.fileId);
      // Delete database entry
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Form File (PDF/Image)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Active</label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
              disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Form'}
          </button>
        </form>
      </div>

      {/* Forms List */}
      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold p-6 border-b">Uploaded Forms</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forms.map((form) => (
                <tr key={form.$id}>
                  <td className="px-6 py-4 whitespace-nowrap">{form.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFormStatus(form)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        form.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {form.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={storage.getFilePreview(
                        APPLICATION_FORM_BUCKET_ID,
                        form.fileId,
                        {
                          width: 400,
                          height: 600,
                          gravity: 'center',
                          quality: 100,
                          output: 'jpg'  // or 'png'
                        }
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Preview
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteForm(form)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
