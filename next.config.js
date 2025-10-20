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
  // Cloudflare Pages requires export mode
  output: 'export',
}

module.exports = nextConfig


