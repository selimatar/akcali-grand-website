import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { client } from '@/sanity/lib/client'
import { readToken } from '@/sanity/lib/token'

/**
 * Called by the Studio's Presentation tool ("Önizleme"). It validates a short-lived secret that the
 * Studio creates, then turns on Next.js draft mode so pages render drafts.
 */
const enableDraftMode =
  client && readToken
    ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) })
    : null

export async function GET(request: Request) {
  if (!enableDraftMode) {
    return new Response('Draft preview is not configured (SANITY_API_READ_TOKEN).', { status: 501 })
  }
  return enableDraftMode.GET(request)
}
