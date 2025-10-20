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
  // Using @cloudflare/next-on-pages for dynamic features
  // Do NOT use output: 'export' with @cloudflare/next-on-pages
}

module.exports = nextConfig


