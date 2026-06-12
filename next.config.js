/** @type {import('next').NextConfig} */

// Build the CSP, allowing the self-hosted Umami origin when configured at build time
function buildCsp() {
    let umamiOrigin = '';
    try {
        if (process.env.NEXT_PUBLIC_UMAMI_URL) {
            umamiOrigin = ' ' + new URL(process.env.NEXT_PUBLIC_UMAMI_URL).origin;
        }
    } catch { /* invalid URL: ignore */ }

    return [
        "default-src 'self'",
        // 'unsafe-inline'/'unsafe-eval' required by Next.js hydration and Three.js shader compilation
        `script-src 'self' 'unsafe-inline' 'unsafe-eval'${umamiOrigin}`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' https://images-assets.nasa.gov data: blob:",
        "media-src 'self'",
        `connect-src 'self' https://images-api.nasa.gov${umamiOrigin}`,
        "font-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
    ].join('; ');
}

const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images-assets.nasa.gov',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Content-Security-Policy', value: buildCsp() },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
                ],
            },
        ];
    },
}

module.exports = nextConfig
