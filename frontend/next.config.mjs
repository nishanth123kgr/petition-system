/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  // Update the basePath and assetPrefix if you're not using a custom domain
  basePath: '/petition-system',
  assetPrefix: '/petition-system/',
  // Add static export configuration
  experimental: {
  },
}

export default nextConfig
