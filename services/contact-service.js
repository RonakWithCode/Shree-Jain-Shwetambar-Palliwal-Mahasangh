import { databases, DATABASE_ID, ID, CONTACT_COLLECTION_ID } from '@/lib/appwrite';

export const appwriteService = {
  async submitContactForm(data) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        CONTACT_COLLECTION_ID,
        ID.unique(),
        data
      );
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  },

  async getAllContacts() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CONTACT_COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  async updateContactResponse(documentId) {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        CONTACT_COLLECTION_ID,
        documentId,
        {
          isresponse: true
        }
      );
    } catch (error) {
      console.error('Error updating contact response:', error);
      throw error;
    }
  }
};
