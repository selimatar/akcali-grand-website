import type { ClientReturn, QueryParams } from 'next-sanity'

import type { ContentType } from '../schemaTypes'
import { client } from './client'

type FetchOptions<Query extends string> = {
  query: Query
  params?: QueryParams
  /**
   * Cache tags: the document types this query reads. The Sanity webhook calls
   * revalidateTag(<_type>) on publish, which refreshes every page that used that type.
   */
  tags: ContentType[]
}

/**
 * Fetch content for a statically generated page. Results are cached (force-cache) and only
 * refreshed by on-demand revalidation. Returns null when Sanity isn't configured or the request
 * fails, so sections hide instead of crashing the build.
 */
export async function sanityFetch<const Query extends string>({
  query,
  params = {},
  tags,
}: FetchOptions<Query>): Promise<ClientReturn<Query, unknown> | null> {
  if (!client) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set; rendering without content.')
    }
    return null
  }

  try {
    return await client.fetch(query, params, {
      cache: 'force-cache',
      next: { tags },
    })
  } catch (error) {
    // A failed fetch must never take the site down; a later revalidation will retry.
    console.error('[sanity] Query failed:', error)
    return null
  }
}
