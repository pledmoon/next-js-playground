import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://xswkhmqtzaeqvufyjedn.supabase.co/storage/v1/object/public/**'),
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      //hmrRefreshes: true,
    },
  },
}

export default nextConfig
