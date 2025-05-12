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
  
  // Use PROD_BUILD flag to determine environment
  // For development (without the flag): No base path
  // For production (with the flag): Use /petition-system base path
  basePath: process.env.PROD_BUILD ? '/petition-system' : '',
  assetPrefix: process.env.PROD_BUILD ? '/petition-system/' : '',
  
  // Add static export configuration
  experimental: {
  },
}

export default nextConfig
