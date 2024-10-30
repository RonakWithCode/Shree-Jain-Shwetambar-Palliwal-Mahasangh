"use client";
import { useState, useEffect } from 'react';
import { appwriteService } from '@/services/contact-service';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await appwriteService.getAllContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsResponded = async (documentId) => {
    try {
      await appwriteService.updateContactResponse(documentId);
      // Refresh the contacts list
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div 
            key={contact.$id} 
            className={`p-4 rounded-lg border ${
              contact.isresponse ? 'bg-green-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.email}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
                <p className="mt-2">{contact.message}</p>
              </div>
              <button
                onClick={() => handleMarkAsResponded(contact.$id)}
                disabled={contact.isresponse}
                className={`px-4 py-2 rounded ${
                  contact.isresponse
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {contact.isresponse ? 'Responded' : 'Mark as Responded'}
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Received: {new Date(contact.$createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
