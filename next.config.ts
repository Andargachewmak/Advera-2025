// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Add the placeholder domain here
        port: "",
        pathname: "/**", // Allow all paths under the domain
      },
    ],
  },
};

module.exports = nextConfig;