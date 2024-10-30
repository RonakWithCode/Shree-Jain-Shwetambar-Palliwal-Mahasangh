import { databases, storage, DATABASE_ID, APPLICATION_FORM_COLLECTION_ID, APPLICATION_FORM_BUCKET_ID, Query } from '@/lib/appwrite';

export class ApplicationFormService {
  async getActiveForms() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPLICATION_FORM_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('$createdAt')
        ]
      );
      
      return response.documents.map(doc => ({
        ...doc,
        fileUrl: storage.getFileView(APPLICATION_FORM_BUCKET_ID, doc.fileId)
      }));
    } catch (error) {
      console.error('Error fetching application forms:', error);
      throw error;
    }
  }


}

export const applicationFormService = new ApplicationFormService();
