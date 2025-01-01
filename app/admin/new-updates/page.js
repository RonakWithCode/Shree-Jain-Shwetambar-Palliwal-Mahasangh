"use client";
import { useState, useEffect } from 'react';
import { newUpdateService } from '@/services/newUpdateService';
import { FaSave, FaSpinner, FaBullhorn } from 'react-icons/fa';

export default function NewUpdatesPage() {
  const [currentUpdate, setCurrentUpdate] = useState({ text: '', Activate: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchCurrentUpdate();
  }, []);

  const fetchCurrentUpdate = async () => {
    try {
      const data = await newUpdateService.getNewUpdate();
      setCurrentUpdate(data || { text: '', Activate: false });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news update:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const newUpdate = {
        text: currentUpdate.text,
        Activate: currentUpdate.Activate
      }
      await newUpdateService.createNewUpdate(newUpdate);
      await fetchCurrentUpdate();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Failed to save update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <FaBullhorn className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">News Update Manager</h1>
            <p className="text-gray-600 mt-1">Manage your website's news ticker update</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Edit News Update</h2>
          <p className="text-indigo-100 text-sm mt-1">
            This update will be displayed in the news ticker at the top of your website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Text
              </label>
              <textarea
                value={currentUpdate.text}
                onChange={(e) => setCurrentUpdate({ ...currentUpdate, text: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200
                placeholder-gray-400 min-h-[100px]"
                placeholder="Enter your news update text here..."
                required
              />
            </div>

            {/* Activation Toggle */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Activation Status</label>
                  <p className="text-sm text-gray-500 mt-1">
                    Toggle to show/hide the update on your website
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentUpdate.Activate}
                    onChange={(e) => setCurrentUpdate({ ...currentUpdate, Activate: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                    peer-focus:ring-indigo-300 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
                  </div>
                </label>
              </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Update saved successfully!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 
                rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-indigo-400
                shadow-lg hover:shadow-xl"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Save Update</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
