"use client";
import { useState, useEffect } from 'react';
import { newUpdateService } from '@/services/newUpdateService';

export default function NewUpdatesPage() {
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ text: '', Activate: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsUpdates();
  }, []);

  const fetchNewsUpdates = async () => {
    try {
      const data = await newUpdateService.getNewUpdate();
      setNewsUpdates(Array.isArray(data) ? data : [data].filter(Boolean));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news updates:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newUpdateService.createNewUpdate(newUpdate);
      setNewUpdate({ text: '', Activate: false });
      fetchNewsUpdates();
    } catch (error) {
      console.error('Error creating news update:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage News Updates</h1>
      
      {/* Create New Update Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Update</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Update Text</label>
            <textarea
              value={newUpdate.text}
              onChange={(e) => setNewUpdate({ ...newUpdate, text: e.target.value })}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={newUpdate.Activate}
              onChange={(e) => setNewUpdate({ ...newUpdate, Activate: e.target.checked })}
              className="mr-2"
            />
            <label>Activate Update</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Update
          </button>
        </form>
      </div>

      {/* Existing Updates List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Updates</h2>
        <div className="space-y-4">
          {newsUpdates.map((update, index) => (
            <div key={index} className="border p-4 rounded">
              <p className="mb-2">{update.text}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className={`mr-2 px-2 py-1 rounded ${
                  update.Activate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {update.Activate ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
