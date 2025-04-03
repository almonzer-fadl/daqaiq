/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // You can add specific options here if needed
      // For example:
      // enable: true,
    },
  },
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
      // Add any other image domains you're using
    ],
  },
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    return config;
  }
};

module.exports = nextConfig; 