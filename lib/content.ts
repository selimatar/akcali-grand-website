import { stegaClean } from 'next-sanity'
import { cache } from 'react'

import type { HOME_QUERY_RESULT, SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { isProductionDataset } from '@/sanity/env'
import { isDraftMode, sanityFetch } from '@/sanity/lib/fetch'
import { HOME_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'

export type Settings = NonNullable<SETTINGS_QUERY_RESULT>
export type HomeData = HOME_QUERY_RESULT
export type HomePage = NonNullable<HOME_QUERY_RESULT['page']>

/**
 * Site-wide settings (contact, address, social, default SEO). Deduplicated per request.
 * Cleaned of preview (stega) markers: code compares these values (platform names, phone digits,
 * URLs), which invisible characters would break.
 */
export const getSettings = cache(async (): Promise<Settings | null> => {
  const settings = await sanityFetch({ query: SETTINGS_QUERY, tags: ['siteSettings'] })
  return settings ? stegaClean(settings) : null
})

/**
 * All homepage content. Placeholder testimonials are included outside the production dataset and
 * in draft preview. Deduplicated per request, so the layout (menu) and the page share one fetch.
 */
export const getHome = cache(
  async (): Promise<HomeData | null> =>
    (await sanityFetch({
      query: HOME_QUERY,
      params: { includePlaceholders: !isProductionDataset || (await isDraftMode()) },
      tags: ['homePage', 'space', 'amenity', 'galleryImage', 'testimonial'],
    })) ?? null,
)
