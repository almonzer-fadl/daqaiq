/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'd1muf25xaso8hp.cloudfront.net',
      'placehold.co'  // Adding this for our placeholder images
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1muf25xaso8hp.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    return config;
  }
};

module.exports = nextConfig; 