import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/",
        permanent: true
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/index.html"
        },
        {
          source: "/number-war",
          destination: "/number-war/index.html"
        }
      ]
    };
  }
};

export default nextConfig;
