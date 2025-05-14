/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd1muf25xaso8hp.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'daqaiq.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'supplier.daqaiq.com',
        pathname: '/**',
      }
    ],
    domains: ['localhost', 'res.cloudinary.com', 'daqaiq.com', 'supplier.daqaiq.com', 'admin.daqaiq.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'supplier.daqaiq.com' }],
          destination: '/supplier/:path*',
        },
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'admin.daqaiq.com' }],
          destination: '/admin/:path*',
        }
      ]
    };
  },
  async redirects() {
    return [
      {
        source: '/supplier',
        has: [
          {
            type: 'host',
            value: 'daqaiq.com',
          },
        ],
        destination: 'https://supplier.daqaiq.com',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    };
    return config;
  },
};

module.exports = nextConfig; 