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
  // Disable server components for static export
  experimental: {
    appDir: true,
  },
}

export default nextConfig
