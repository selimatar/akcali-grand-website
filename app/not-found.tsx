import '@/styles/globals.css'

import type { Metadata } from 'next'
import Link from 'next/link'

import { Logo } from '@/components/ui/Logo'
import { OrnamentDivider } from '@/components/ui/OrnamentDivider'
import { ui } from '@/lib/ui-strings'

export const metadata: Metadata = {
  title: { absolute: `${ui.notFound.title} · ${ui.brandName}` },
  robots: { index: false, follow: false },
}

/** Turkish 404 for unknown URLs (the site itself is a single page). */
export default function NotFound() {
  return (
    <main
      data-surface="dark"
      className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center"
    >
      <Link href="/" aria-label={ui.notFound.home}>
        <Logo className="h-auto w-logo-footer" alt="" />
      </Link>
      <div className="flex flex-col items-center gap-4">
        <p className="text-label tracking-eyebrow text-eyebrow uppercase">404</p>
        <h1 className="font-display text-display font-normal">{ui.notFound.title}</h1>
        <OrnamentDivider variant="center" />
        <p className="max-w-measure-sm text-body font-light text-fg-body">{ui.notFound.text}</p>
      </div>
      <Link
        href="/"
        className="border-b border-gold py-3 text-label tracking-button uppercase no-underline"
      >
        {ui.notFound.home}
      </Link>
    </main>
  )
}
