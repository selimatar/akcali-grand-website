import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

import { CONTENT_TYPES, type ContentType } from '@/sanity/contentTypes'

type WebhookPayload = { _type?: string; _id?: string }

/**
 * Sanity webhook → on-demand revalidation. Sanity calls this on every create/update/delete of a
 * content document; the request is signed with SANITY_REVALIDATE_SECRET. Every query is tagged
 * with the document types it reads, so revalidating the changed document's type refreshes exactly
 * the pages that show it. See README → "Webhook".
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 })
  }

  try {
    // `true`: wait briefly so the Content Lake has the change before pages re-fetch.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true)

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Missing _type in payload' }, { status: 400 })
    }
    if (!(CONTENT_TYPES as readonly string[]).includes(body._type)) {
      return NextResponse.json({ message: `Ignored type ${body._type}` }, { status: 200 })
    }

    // expire: 0 → the next request gets fresh content (no stale-while-revalidate window).
    revalidateTag(body._type as ContentType, { expire: 0 })
    return NextResponse.json({ revalidated: [body._type], now: Date.now() })
  } catch (error) {
    console.error('[revalidate]', error)
    return NextResponse.json({ message: 'Could not process webhook' }, { status: 500 })
  }
}
