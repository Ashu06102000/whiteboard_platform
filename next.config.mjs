/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/clerk/:path*",
        destination: "https://api.clerk.com/:path*", // Proxy to the Clerk API
      },
    ];
  },
};

export default nextConfig;
