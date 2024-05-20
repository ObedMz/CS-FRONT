/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        }]},
  experimental: {
          serverActions: {
              allowedOrigins: ['jabbustore.com', 'cs-front-sandy.vercel.app'],
          },
        },
};

export default nextConfig;