/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        NEXT_PUBLIC_APPWRITE_NEWS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_NEWS_COLLECTION_ID,
        NEXT_PUBLIC_APPWRITE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        NEXT_PUBLIC_APPWRITE_MAGAZINE_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_COLLECTION_ID,
        NEXT_PUBLIC_APPWRITE_MAGAZINE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_BUCKET_ID
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cloud.appwrite.io',
                pathname: '/v1/**',
            }
        ],
        unoptimized: true,
    },
};

module.exports = nextConfig;
