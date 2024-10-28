/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI,
    },
    images: {
        domains: [
            "placehold.co"
        ],
    },
};

module.exports = nextConfig;
