/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
        port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "logos.covalenthq.com",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
