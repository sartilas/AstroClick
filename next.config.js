/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images-assets.nasa.gov',
            },
            {
                protocol: 'http',
                hostname: 'images-assets.nasa.gov',
            },
        ],
    },
}

module.exports = nextConfig
