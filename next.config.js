/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'fiverr.com'],
    unoptimized: true, // Required for Cloudflare Pages
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export', // Use static export for Cloudflare Pages
  trailingSlash: true, // Better compatibility with static hosting
}

module.exports = nextConfig


