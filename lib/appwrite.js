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
// Helper function to check if Appwrite is configured
export const isAppwriteConfigured = () => {
    return Boolean(
        process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
        DATABASE_ID &&
        COLLECTION_ID &&
        BUCKET_ID &&
        MAGAZINE_COLLECTION_ID &&
        MAGAZINE_BUCKET_ID
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
    magazineBucketId: MAGAZINE_BUCKET_ID
});

