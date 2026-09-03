import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // Required for Sanity Studio embedded in Next.js
  transpilePackages: ['sanity'],
}

export default nextConfig
