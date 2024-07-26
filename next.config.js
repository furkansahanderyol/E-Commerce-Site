/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.dummyjson.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
