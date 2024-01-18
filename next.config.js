/** @type {import('next').NextConfig} */

const securityHeaders = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    {
        key: 'Permissions-Policy',
        value: 'geolocation=(), microphone=(), camera=(),  browsing-topics=(), interest-cohort=(), accelerometer=(), gyroscope=(), magnetometer=(), payment=()',
    },
]

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    async headers() {
        return [{
            source: '/:path*',
            headers: securityHeaders,
        }, ]
    }
}

module.exports = nextConfig
