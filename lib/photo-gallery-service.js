import { databases,ENDPOINT ,DATABASE_ID, Query ,PHOTO_GALLERY_BUCKET_ID } from '@/lib/appwrite';

const CATEGORIES_COLLECTION_ID = '6721f775003889370163';
const IMAGES_COLLECTION_ID = '6721f29f00114752fc9b';
// const STORAGE_BUCKET_ID = PHOTO_GALLERY_BUCKET_ID;

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
    return `${ENDPOINT}/storage/buckets/${PHOTO_GALLERY_BUCKET_ID}/files/${fileId}/view?project=67237a03002bd713ceaf`;
  }
}
