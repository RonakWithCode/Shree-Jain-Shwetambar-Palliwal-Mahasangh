import { databases, DATABASE_ID, Query } from '@/lib/appwrite';

const CATEGORIES_COLLECTION_ID = '6721f775003889370163';
const IMAGES_COLLECTION_ID = '6721f29f00114752fc9b';
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_PHOTO_GALLERY_BUCKET_ID;

export class PhotoGalleryService {
  static async getCategories() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  static async getImagesByCategory(categoryId) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        IMAGES_COLLECTION_ID,
        [
          Query.equal('categoryId', categoryId),
          Query.equal('isVisible', true),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }

  static getImageUrl(fileId) {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  }
}
