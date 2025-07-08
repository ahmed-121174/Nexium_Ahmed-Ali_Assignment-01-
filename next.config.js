/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_NINJAS_KEY: process.env.API_NINJAS_KEY,
  },
}

module.exports = nextConfig