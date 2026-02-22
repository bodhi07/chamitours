import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Bypass Next.js image optimization for external images during dev
    // to avoid Unsplash rate limiting the optimization server
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
