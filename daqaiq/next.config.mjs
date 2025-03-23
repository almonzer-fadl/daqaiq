/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['daqaiq.com', 'supplier.daqaiq.com'],
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
  };
  
  export default nextConfig;