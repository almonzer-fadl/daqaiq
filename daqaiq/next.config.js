/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // You can add specific options here if needed
      // For example:
      // enable: true,
    },
  },
  distDir: '.next',
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
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle supplier subdomain
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'supplier.daqaiq.com',
            },
          ],
          destination: '/supplier/:path*',
        },
      ],
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
  webpack: (config, { isServer }) => {
    // Ensure proper path handling
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    
    if (!isServer) {
      // Polyfills for client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve('path-browserify'),
      };
    }

    return config;
  }
};

module.exports = nextConfig; 