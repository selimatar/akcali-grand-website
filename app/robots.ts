import type { MetadataRoute } from 'next'

import { absoluteUrl, isIndexable } from '@/lib/site'

/** Production: everything except the Studio and API routes. Previews/local: nothing. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
