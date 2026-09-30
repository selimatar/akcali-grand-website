'use client'

import type { ImageLoaderProps } from 'next/image'

/**
 * Global next/image loader (next.config.ts → images.loaderFile). Sanity's image CDN does the
 * resizing, so nothing goes through Vercel image optimization.
 *
 * The `src` from <SanityImage> already carries the crop rectangle (editor crop + hotspot) and the
 * target aspect ratio as w/h; this only rescales to each srcset width. `auto=format` serves AVIF or
 * WebP depending on the browser's Accept header. Non-Sanity sources are passed through.
 */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith('https://cdn.sanity.io/')) {
    return `${src}${src.includes('?') ? '&' : '?'}w=${width}`
  }

  const url = new URL(src)
  const w = Number(url.searchParams.get('w'))
  const h = Number(url.searchParams.get('h'))
  if (w > 0 && h > 0) {
    // Keep the aspect ratio; `min` never upscales past the source.
    url.searchParams.set('h', String(Math.round((h / w) * width)))
    url.searchParams.set('fit', 'min')
  } else {
    url.searchParams.set('fit', 'max')
  }
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 75))
  url.searchParams.set('auto', 'format')
  return url.href
}
