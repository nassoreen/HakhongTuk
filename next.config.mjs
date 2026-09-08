/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'down-th.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'sg-11134301-*.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'rakatookyang.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
