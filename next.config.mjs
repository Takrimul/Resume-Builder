/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['*', 'picsum.photos', '192.168.0.171', process.env.BACKEND_URL, '192.168.0.195'],
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    },
};

export default nextConfig;
