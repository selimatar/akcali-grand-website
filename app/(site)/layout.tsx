import '@/styles/globals.css'

import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { MAIN_ID } from '@/lib/sections'

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
