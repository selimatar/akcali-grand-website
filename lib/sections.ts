import { padNumber } from './format'
import type { HomeData, Settings } from './content'

/** Anchor IDs from the design. The hero is always rendered, so "Başa dön" can target it. */
export const HERO_ID = 'giris'
export const MAIN_ID = 'icerik'

export const SECTION_IDS = {
  about: 'hakkimizda',
  spaces: 'mekanlar',
  amenities: 'hizmetler',
  gallery: 'galeri',
  testimonials: 'yorumlar',
  location: 'konum',
} as const

export type SectionKey = keyof typeof SECTION_IDS

export type SectionHeaderData = {
  eyebrow: string | null
  title: string | null
  navLabel: string | null
} | null

export type VisibleSection = {
  key: SectionKey
  id: string
  /** "01", "02"… in the order sections appear, so numbering never skips a hidden section. */
  number: string
  header: SectionHeaderData
  /** Label in the menu; null hides the section from the menu (it still renders). */
  navLabel: string | null
}

/**
 * Decides which homepage sections have enough content to render. A section with nothing to show
 * is hidden and drops out of the numbering and the menu, instead of rendering empty.
 */
export function getVisibleSections(
  home: HomeData | null,
  settings: Settings | null,
): VisibleSection[] {
  const page = home?.page
  const candidates: { key: SectionKey; header: SectionHeaderData; visible: boolean }[] = [
    {
      key: 'about',
      header: page?.about?.header ?? null,
      visible: Boolean(page?.about?.header?.title || page?.about?.body?.length),
    },
    {
      key: 'spaces',
      header: page?.spacesSection?.header ?? null,
      visible: (home?.spaces.length ?? 0) > 0,
    },
    {
      key: 'amenities',
      header: page?.amenitiesSection?.header ?? null,
      visible: (home?.amenities.length ?? 0) > 0,
    },
    {
      key: 'gallery',
      header: page?.gallerySection?.header ?? null,
      visible: (home?.gallery.length ?? 0) > 0,
    },
    {
      key: 'testimonials',
      header: page?.testimonialsSection?.header ?? null,
      visible: (home?.testimonials.length ?? 0) > 0,
    },
    {
      key: 'location',
      header: page?.locationSection?.header ?? null,
      visible: Boolean(settings?.address?.streetAddress || settings?.location),
    },
  ]

  return candidates
    .filter((section) => section.visible)
    .map((section, index) => ({
      key: section.key,
      id: SECTION_IDS[section.key],
      number: padNumber(index + 1),
      header: section.header,
      navLabel: section.header?.navLabel || section.header?.eyebrow || null,
    }))
}
