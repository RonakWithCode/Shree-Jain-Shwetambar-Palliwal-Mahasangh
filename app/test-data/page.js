'use client';
import { useState } from 'react';

export default function TestDataPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadTestData = async () => {
    try {
      setLoading(true);
      setStatus('Uploading test data...');

      const response = await fetch('/api/test-data', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setStatus(`Success! Inserted ${data.count} news items.`);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkTestData = async () => {
    try {
      setLoading(true);
      setStatus('Checking test data...');

      const response = await fetch('/api/test-data');
      const data = await response.json();

      if (data.success) {
        setStatus(data.message);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Data Management</h1>
      
      <div className="space-y-4">
        <button
          onClick={uploadTestData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Upload Test Data
        </button>

        <button
          onClick={checkTestData}
          disabled={loading}
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Check Test Data
        </button>

        {status && (
          <div className={`p-4 rounded ${
            status.includes('Error') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {status}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
