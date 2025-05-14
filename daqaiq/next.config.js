/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    domains: ['*'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
      '@/lib': process.cwd() + '/lib',
      '@/models': process.cwd() + '/lib/models',
      '@/app': process.cwd() + '/app',
      '@/components': process.cwd() + '/app/components',
      '@/utils': process.cwd() + '/lib/utils',
    };
    return config;
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Supplier subdomain handling
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'supplier.daqaiq.com' }],
          destination: '/supplier/:path*',
        },
        // Admin subdomain handling
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
      // Redirect from main domain to supplier subdomain
      {
        source: '/supplier',
        has: [{ type: 'host', value: 'daqaiq.com' }],
        destination: 'https://supplier.daqaiq.com',
        permanent: true,
      },
      // Redirect from main domain to admin subdomain
      {
        source: '/admin',
        has: [{ type: 'host', value: 'daqaiq.com' }],
        destination: 'https://admin.daqaiq.com',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig; 