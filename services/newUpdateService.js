import { databases, DATABASE_ID, NEW_UPDATE_COLLECTION_ID ,DOCUMENT_NEW_UPDATE_ID } from '@/lib/appwrite';


export const newUpdateService = {
  async getNewUpdate() {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        NEW_UPDATE_COLLECTION_ID,
        DOCUMENT_NEW_UPDATE_ID
      );

      // console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching new update:', error);
      throw error;
    }
  }
};
