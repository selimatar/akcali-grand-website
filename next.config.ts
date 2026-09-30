import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Sanity's image CDN resizes and serves WebP; see sanity/lib/image-loader.ts.
    loader: 'custom',
    loaderFile: './sanity/lib/image-loader.ts',
  },
  async headers() {
    return [
      {
        // The embedded Studio must never be indexed.
        source: '/studio/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
