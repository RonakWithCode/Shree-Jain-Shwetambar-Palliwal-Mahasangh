import { Client, Account, Databases, Storage, ID ,Query } from 'appwrite';

const client = new Client()
    .setEndpoint("http://localhost/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };


// Constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_NEWS_COLLECTION_ID;
export const MAGAZINE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_COLLECTION_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
export const MAGAZINE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_BUCKET_ID;
export const SLIDER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SLIDER_COLLECTION_ID;
export const SLIDER_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_SLIDER_BUCKET_ID;

export const NEW_UPDATE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_NEW_UPDATE_COLLECTION_ID;
export const DOCUMENT_NEW_UPDATE_ID = process.env.NEXT_PUBLIC_APPWRITE_DOCUMENT_NEW_UPDATE_ID;

export const PHOTO_GALLERY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PHOTO_GALLERY_COLLECTION_ID;
export const PHOTO_GALLERY_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_PHOTO_GALLERY_BUCKET_ID;

export const CONTACT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID;

export const APPLICATION_FORM_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPLICATION_FORM_COLLECTION_ID;
export const APPLICATION_FORM_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_APPLICATION_FORM_BUCKET_ID;

// Helper function to check if Appwrite is configured
export const isAppwriteConfigured = () => {
    return Boolean(
        process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
        DATABASE_ID &&
        COLLECTION_ID &&
        BUCKET_ID &&
        MAGAZINE_COLLECTION_ID &&
        MAGAZINE_BUCKET_ID &&
        NEW_UPDATE_COLLECTION_ID &&
        DOCUMENT_NEW_UPDATE_ID &&
        PHOTO_GALLERY_COLLECTION_ID &&
        PHOTO_GALLERY_BUCKET_ID &&
        CONTACT_COLLECTION_ID &&
        APPLICATION_FORM_COLLECTION_ID &&
        APPLICATION_FORM_BUCKET_ID
    );
};

// Log configuration
console.log('Initializing Appwrite client with:', {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: DATABASE_ID,
    collectionId: COLLECTION_ID,
    bucketId: BUCKET_ID,
    magazineCollectionId: MAGAZINE_COLLECTION_ID,
    magazineBucketId: MAGAZINE_BUCKET_ID,
    sliderCollectionId: SLIDER_COLLECTION_ID,
    sliderBucketId: SLIDER_BUCKET_ID,
    newUpdateCollectionId: NEW_UPDATE_COLLECTION_ID,
    documentNewUpdateId: DOCUMENT_NEW_UPDATE_ID,
    photoGalleryCollectionId: PHOTO_GALLERY_COLLECTION_ID,
    photoGalleryBucketId: PHOTO_GALLERY_BUCKET_ID,
    contactCollectionId: CONTACT_COLLECTION_ID,
    applicationFormCollectionId: APPLICATION_FORM_COLLECTION_ID,
    applicationFormBucketId: APPLICATION_FORM_BUCKET_ID
});

