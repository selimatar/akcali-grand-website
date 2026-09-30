import '@/styles/globals.css'

import { VisualEditing } from 'next-sanity/visual-editing'

import { DraftModeBar } from '@/components/layout/DraftModeBar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { MAIN_ID } from '@/lib/sections'
import { isDraftMode } from '@/sanity/lib/fetch'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const draft = await isDraftMode()

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      {/* Preview only: click-to-edit overlays and live refresh. Never loaded for visitors. */}
      {draft ? (
        <>
          <VisualEditing />
          <DraftModeBar />
        </>
      ) : null}
    </>
  )
}
