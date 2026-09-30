import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/site'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SITEMAP_QUERY } from '@/sanity/lib/queries'

/** The site is one page; its lastModified is the latest content change. /studio is excluded. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updatedAt = await sanityFetch({
    query: SITEMAP_QUERY,
    tags: ['siteSettings', 'homePage', 'space', 'amenity', 'galleryImage', 'testimonial'],
  })
  return [
    {
      url: absoluteUrl('/'),
      lastModified: typeof updatedAt === 'string' ? new Date(updatedAt) : undefined,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
