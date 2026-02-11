import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**'
      },
      {
        protocol: 'https',
        hostname: 'api-contenna.trianandafajar.com',
        pathname: '/storage/**'
      }
    ]
  }
};

export default nextConfig;
