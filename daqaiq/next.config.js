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
    return [
      {
        source: '/supplier/:path*',
        destination: 'https://supplier.daqaiq.com/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/supplier',
        destination: 'https://supplier.daqaiq.com',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 