import type { ClientReturn, QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'

import type { ContentType } from '../contentTypes'
import { client } from './client'
import { readToken } from './token'

type FetchOptions<Query extends string> = {
  query: Query
  params?: QueryParams
  /**
   * Cache tags: the document types this query reads. The Sanity webhook calls
   * revalidateTag(<_type>) on publish, which refreshes every page that used that type.
   */
  tags: ContentType[]
}

/** True while an editor previews drafts from the Studio (Presentation tool). */
export async function isDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    // Outside a request (e.g. generateStaticParams, sitemap at build time).
    return false
  }
}

/**
 * Fetch content.
 * - Published (normal visitors): cached with `force-cache` + tags, so the page is served statically
 *   and only refreshed by on-demand revalidation.
 * - Draft mode: reads drafts with the viewer token, uncached, with stega encoding so the Studio's
 *   Presentation tool can map text on the page back to its field.
 * Returns null when Sanity isn't configured or the request fails, so sections hide instead of
 * crashing the build.
 */
export async function sanityFetch<const Query extends string>({
  query,
  params = {},
  tags,
}: FetchOptions<Query>): Promise<ClientReturn<Query, unknown> | null> {
  if (!client) {
    console.warn('[sanity] NEXT_SANITY_PROJECT_ID is not set; rendering without content.')
    return null
  }

  try {
    if (await isDraftMode()) {
      if (!readToken) throw new Error('SANITY_API_READ_TOKEN is required for draft preview.')
      return await client
        .withConfig({ token: readToken, perspective: 'drafts', useCdn: false, stega: true })
        .fetch(query, params, { cache: 'no-store' })
    }

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
