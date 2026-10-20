import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out - remove if not needed
  trailingSlash: true,
  // crossOrigin: 'anonymous', // REMOVE THIS - not a valid Next.js config option
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // For production, specify your actual domain instead of "*"
          { key: "Access-Control-Allow-Origin", value: "*" }, // Replace with your actual origin for production
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-XSRF-TOKEN" },
          // Add OPTIONS preflight response
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
    ];
  },
};

export default nextConfig;