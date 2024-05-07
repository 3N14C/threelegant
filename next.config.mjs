/** @type {import('next').NextConfig} */
const nextConfig = {
    // Разрешается загрузка картинок из разных источников
    images: {
        remotePatterns: [{
            hostname: '**'
        }]
    }
};

export default nextConfig;