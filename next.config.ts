import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
      },
      {
        protocol: 'https',
        hostname: 'api-contenable.egadestaviano.my.id',
        pathname: '/storage/**'
      },
      {
        protocol: 'https',
        hostname: 'api-contenable.devanyudistira.my.id',
        pathname: '/storage/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@clerk/nextjs",
      "@radix-ui/react-icons",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select"
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
