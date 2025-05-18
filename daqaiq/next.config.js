/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
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
    return {
      beforeFiles: [
        {
          source: '/supplier/:path*',
          destination: '/app/supplier/:path*',
        },
        {
          source: '/admin/:path*',
          destination: '/app/admin/:path*',
        }
      ],
      afterFiles: [
        {
          source: '/:path*',
          destination: '/app/:path*',
        }
      ]
    };
  }
};

module.exports = nextConfig; 