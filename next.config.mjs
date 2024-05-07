/** @type {import('next').NextConfig} */
const nextConfig = {
    // Разрешается загрузка картинок из разных источников
    images: {
        remotePatterns: [{
            hostname: '**'
        }]
    },

    experimental: {
        missingSuspenseWithCSRBailout: false
    },
};

export default nextConfig;