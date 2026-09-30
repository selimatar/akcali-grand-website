import { Fragment, type ReactNode } from 'react'

import { HeroSection } from '@/components/sections/HeroSection'
import { getHome, getSettings } from '@/lib/content'
import { getVisibleSections, type SectionKey, type VisibleSection } from '@/lib/sections'

/**
 * Homepage. Statically generated; content comes from Sanity and is refreshed by on-demand
 * revalidation. Sections with no content are skipped (see lib/sections.ts).
 */
export default async function HomePage() {
  const [home, settings] = await Promise.all([getHome(), getSettings()])
  const sections = getVisibleSections(home, settings)

  // Section components are added one at a time in step 4.
  const renderers: Partial<Record<SectionKey, (section: VisibleSection) => ReactNode>> = {}

  return (
    <>
      <HeroSection
        hero={home?.page?.hero}
        siteName={settings?.siteName}
        nextSectionId={sections[0]?.id ?? null}
      />
      {sections.map((section) => (
        <Fragment key={section.key}>{renderers[section.key]?.(section)}</Fragment>
      ))}
    </>
  )
}
