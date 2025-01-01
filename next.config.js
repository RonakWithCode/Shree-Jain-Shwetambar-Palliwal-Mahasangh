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
        NEXT_PUBLIC_APPWRITE_MAGAZINE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_MAGAZINE_BUCKET_ID,
        NEXT_PUBLIC_APPWRITE_SLIDER_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_SLIDER_COLLECTION_ID,
        NEXT_PUBLIC_APPWRITE_SLIDER_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_SLIDER_BUCKET_ID
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
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        unoptimized: true,
        domains: ['cloud.appwrite.io'],
    },
    experimental: {
        serverComponentsExternalPackages: ['mongoose'],
    },
    webpack: (config, { isServer }) => {
        // Basic optimization
        config.optimization = {
            ...config.optimization,
            minimize: true,
        };

        // Only apply chunk splitting on client-side
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    framework: {
                        name: 'framework',
                        test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
                        priority: 40,
                        chunks: 'all',
                    },
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2,
                        priority: 20,
                    },
                    shared: {
                        name: (module, chunks) => {
                            const moduleFileName = module
                                .identifier()
                                .split('/')
                                .reduceRight((item) => item);
                            return `shared-${moduleFileName}`;
                        },
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'async',
                        priority: 10,
                        reuseExistingChunk: true,
                        minChunks: 2,
                    },
                },
            };
        }

        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;

        return config;
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
                ]
            }
        ];
    },
};

module.exports = nextConfig;
