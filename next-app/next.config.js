/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'res.cloudinary.com'
    ],
  },
};

module.exports = nextConfig;