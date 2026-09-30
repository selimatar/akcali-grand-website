import type { Metadata } from 'next'
import { Fragment, type ReactNode } from 'react'

import { AboutSection } from '@/components/sections/AboutSection'
import { AmenitiesSection } from '@/components/sections/AmenitiesSection'
import { JsonLd } from '@/components/sanity/JsonLd'
import { HeroSection } from '@/components/sections/HeroSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { SpacesSection } from '@/components/sections/SpacesSection'
import { getHome, getSettings } from '@/lib/content'
import { getVisibleSections, type SectionKey, type VisibleSection } from '@/lib/sections'
import { buildHomeMetadata, buildVenueJsonLd } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHome(), getSettings()])
  return buildHomeMetadata(home, settings)
}

/**
 * Homepage. Statically generated; content comes from Sanity and is refreshed by on-demand
 * revalidation. Sections with no content are skipped (see lib/sections.ts).
 */
export default async function HomePage() {
  const [home, settings] = await Promise.all([getHome(), getSettings()])
  const sections = getVisibleSections(home, settings)

  // Gallery and testimonials are switched off in lib/sections.ts and have no component yet.
  const page = home?.page
  const renderers: Partial<Record<SectionKey, (section: VisibleSection) => ReactNode>> = {
    location: (section) => (
      <LocationSection section={section} content={page?.locationSection} settings={settings} />
    ),
    about: (section) => <AboutSection section={section} about={page?.about} />,
    spaces: (section) => (
      <SpacesSection section={section} content={page?.spacesSection} spaces={home?.spaces ?? []} />
    ),
    amenities: (section) => (
      <AmenitiesSection
        section={section}
        content={page?.amenitiesSection}
        amenities={home?.amenities ?? []}
      />
    ),
  }

  return (
    <>
      <JsonLd data={buildVenueJsonLd(home, settings)} />
      <HeroSection
        hero={page?.hero}
        siteName={settings?.siteName}
        nextSectionId={sections[0]?.id ?? null}
      />
      {sections.map((section) => (
        <Fragment key={section.key}>{renderers[section.key]?.(section)}</Fragment>
      ))}
    </>
  )
}
