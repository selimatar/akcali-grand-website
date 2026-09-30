import { createClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId, studioBasePath } from '../env'

/**
 * Published-content client. `useCdn: false`: pages are only fetched at build time and when a Sanity
 * webhook revalidates them, so we read straight from the API and never get a stale CDN copy right
 * after publishing. Null until the project is configured.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
      stega: { studioUrl: studioBasePath },
    })
  : null
