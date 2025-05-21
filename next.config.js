const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  i18n,
  images: {
    domains: ['daqaiq.com', 'localhost', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.daqaiq.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'd1muf25xaso8hp.cloudfront.net',
        pathname: '/**',
      }
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/models': path.resolve(__dirname, 'lib/models'),
      '@/app': path.resolve(__dirname, 'app'),
      '@/components': path.resolve(__dirname, 'app/components'),
      '@/utils': path.resolve(__dirname, 'lib/utils'),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      // Handle supplier subdomain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'supplier.daqaiq.com',
          },
        ],
        destination: '/:path*',
      },
      // Handle admin subdomain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.daqaiq.com',
          },
        ],
        destination: '/:path*',
      },
      // Handle main domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'daqaiq.com',
          },
        ],
        destination: '/:path*',
      }
    ];
  }
};

module.exports = nextConfig; 