import type { Metadata, Viewport } from 'next'

import { fontVariables } from '@/lib/fonts'
import { themeColor } from '@/lib/theme'

// Root layout: document shell only. Site styles are imported by the (site) route group so the
// embedded Sanity Studio at /studio never receives Tailwind's preflight.

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
}

export const viewport: Viewport = {
  themeColor,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="tr" className={fontVariables}>
      <body>{children}</body>
    </html>
  )
}
