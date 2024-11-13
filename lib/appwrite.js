import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67237a03002bd713ceaf");

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };

export const ENDPOINT = "https://cloud.appwrite.io/v1";

// Constants
export const DATABASE_ID = "671fd2b80021d301dc2e";
export const COLLECTION_ID = "671fd2b800279f2b18b8";
export const MAGAZINE_COLLECTION_ID = "6720cc6c001db0abb3cf";
export const BUCKET_ID = "6720cf070005faf69479"; // this is for news image
export const MAGAZINE_BUCKET_ID = "6720cf070005faf69479";
export const SLIDER_COLLECTION_ID = "672130a5003879654c9e";
export const SLIDER_BUCKET_ID = "672130b40038988ff60c";

export const NEW_UPDATE_COLLECTION_ID = "6721c85d001c1b240516";
export const DOCUMENT_NEW_UPDATE_ID = "6721cac10005634a1ad5";

export const PHOTO_GALLERY_COLLECTION_ID = "6721f29f00114752fc9b";
export const PHOTO_GALLERY_BUCKET_ID = "6721f2dd000cf0a70252";

export const CONTACT_COLLECTION_ID = "67220f4300055d5ac9e1";

export const APPLICATION_FORM_COLLECTION_ID = "6722699b0004ccac63fc";
export const APPLICATION_FORM_BUCKET_ID = "672269a00001526a6ade";


// ... existing imports and configurations ...

// Add these new constants
export const FORM_CATEGORIES = {
    MEMBERSHIP: 'membership',
    EDUCATION: 'education',
    EMPLOYMENT: 'employment',
    FINANCIAL: 'financial',
    OTHER: 'other'
  };
  
  // Add category labels (for display)
  export const CATEGORY_LABELS = {
    [FORM_CATEGORIES.MEMBERSHIP]: 'सदस्यता फॉर्म',
    [FORM_CATEGORIES.EDUCATION]: 'शैक्षिक फॉर्म',
    [FORM_CATEGORIES.EMPLOYMENT]: 'रोजगार फॉर्म',
    [FORM_CATEGORIES.FINANCIAL]: 'वित्तीय सहायता फॉर्म',
    [FORM_CATEGORIES.OTHER]: 'अन्य फॉर्म'
  };
  
  // ... rest of the existing code ...
// Helper function to check if Appwrite is configured
export const isAppwriteConfigured = () => {
    return true; // Since we're using hardcoded values, this will always be true
};

// Log configuration
console.log('Initializing Appwrite client with:', {
    endpoint: "http://88.222.215.5/v1",
    projectId: "67237a03002bd713ceaf",
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


// 
// import { Client, Account, Databases, Storage, ID ,Query } from 'appwrite';

// const client = new Client()
//     .setEndpoint("http://88.222.215.5/v1")
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// // Initialize services
// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export { ID, Query };


// // Constants
// export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
// export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_NEWS_COLLECTION_ID;
// export const MAGAZINE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_COLLECTION_ID;
// export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
// export const MAGAZINE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_BUCKET_ID;
// export const SLIDER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SLIDER_COLLECTION_ID;
// export const SLIDER_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_SLIDER_BUCKET_ID;

// export const NEW_UPDATE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_NEW_UPDATE_COLLECTION_ID;
// export const DOCUMENT_NEW_UPDATE_ID = process.env.NEXT_PUBLIC_APPWRITE_DOCUMENT_NEW_UPDATE_ID;

// export const PHOTO_GALLERY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PHOTO_GALLERY_COLLECTION_ID;
// export const PHOTO_GALLERY_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_PHOTO_GALLERY_BUCKET_ID;

// export const CONTACT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID;

// export const APPLICATION_FORM_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPLICATION_FORM_COLLECTION_ID;
// export const APPLICATION_FORM_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_APPLICATION_FORM_BUCKET_ID;

// // Helper function to check if Appwrite is configured
// export const isAppwriteConfigured = () => {
//     return Boolean(
//         process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
//         process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
//         DATABASE_ID &&
//         COLLECTION_ID &&
//         BUCKET_ID &&
//         MAGAZINE_COLLECTION_ID &&
//         MAGAZINE_BUCKET_ID &&
//         NEW_UPDATE_COLLECTION_ID &&
//         DOCUMENT_NEW_UPDATE_ID &&
//         PHOTO_GALLERY_COLLECTION_ID &&
//         PHOTO_GALLERY_BUCKET_ID &&
//         CONTACT_COLLECTION_ID &&
//         APPLICATION_FORM_COLLECTION_ID &&
//         APPLICATION_FORM_BUCKET_ID
//     );
// };

// // Log configuration
// console.log('Initializing Appwrite client with:', {
//     endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
//     projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
//     databaseId: DATABASE_ID,
//     collectionId: COLLECTION_ID,
//     bucketId: BUCKET_ID,
//     magazineCollectionId: MAGAZINE_COLLECTION_ID,
//     magazineBucketId: MAGAZINE_BUCKET_ID,
//     sliderCollectionId: SLIDER_COLLECTION_ID,
//     sliderBucketId: SLIDER_BUCKET_ID,
//     newUpdateCollectionId: NEW_UPDATE_COLLECTION_ID,
//     documentNewUpdateId: DOCUMENT_NEW_UPDATE_ID,
//     photoGalleryCollectionId: PHOTO_GALLERY_COLLECTION_ID,
//     photoGalleryBucketId: PHOTO_GALLERY_BUCKET_ID,
//     contactCollectionId: CONTACT_COLLECTION_ID,
//     applicationFormCollectionId: APPLICATION_FORM_COLLECTION_ID,
//     applicationFormBucketId: APPLICATION_FORM_BUCKET_ID
// });
// 
