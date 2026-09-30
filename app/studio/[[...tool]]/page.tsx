/**
 * Embedded Sanity Studio at /studio. All routes under /studio are handled by the Studio's own
 * router. It's excluded from search indexing (noindex meta here, X-Robots-Tag header in
 * next.config.ts, disallowed in robots.txt).
 */
import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
