import { databases, Query, DATABASE_ID, COLLECTION_ID } from '@/lib/appwrite';

export const newsService = {
  async getNews() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('active', true),
          Query.orderDesc('$createdAt'),
          Query.limit(100)
        ]
      );
      
      return response.documents;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
};
