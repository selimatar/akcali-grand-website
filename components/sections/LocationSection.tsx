import { Container, Section } from '@/components/ui/Section'
import { LocationMap } from '@/components/ui/LocationMap'
import { headingIdFor, SectionHeader } from '@/components/ui/SectionHeader'
import type { HomePage, Settings } from '@/lib/content'
import type { VisibleSection } from '@/lib/sections'
import { ui } from '@/lib/ui-strings'

type Props = {
  section: VisibleSection
  content: HomePage['locationSection'] | undefined
  settings: Settings | null
}

/** "Haritada aç" target: the editor's Google Maps link, else a search for the coordinates. */
function mapsHref(settings: Settings | null): string | null {
  if (settings?.mapsUrl) return settings.mapsUrl
  const location = settings?.location
  if (location?.lat == null || location.lng == null) return null
  return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
}

/** 07 Konum: address, directions and a map link beside the (lazy) map. */
export function LocationSection({ section, content, settings }: Props) {
  const headingId = headingIdFor(section.id)
  const address = settings?.address
  const locality = [address?.district, address?.city].filter(Boolean).join(' / ')
  const directions = (content?.directions ?? []).filter((item) => item.from || item.time)
  const location = settings?.location
  const hasMap = location?.lat != null && location.lng != null
  const href = mapsHref(settings)

  return (
    <Section
      id={section.id}
      surface="sand"
      labelledBy={section.header?.title ? headingId : undefined}
    >
      <Container className="grid grid-split-sm items-center gap-split">
        <div className="flex reveal flex-col gap-8">
          <SectionHeader number={section.number} header={section.header} headingId={headingId} />

          {address?.streetAddress || locality ? (
            <address className="text-body-lg leading-body font-light text-fg-body not-italic">
              {address?.streetAddress}
              {address?.streetAddress && locality ? <br /> : null}
              {locality}
            </address>
          ) : null}

          {directions.length > 0 ? (
            <ul className="flex flex-col">
              {directions.map((item) => (
                <li
                  key={item._key}
                  className="flex items-baseline justify-between gap-4 border-t border-rule py-4"
                >
                  <span className="text-body-sm leading-auto text-fg">{item.from}</span>
                  <span className="text-right text-small leading-auto text-fg-muted">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {href ? (
            <a
              href={href}
              className="self-start border-b border-gold py-3 text-label tracking-button uppercase no-underline"
            >
              {ui.location.openInMaps} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>

        {hasMap ? (
          <div className="reveal">
            <LocationMap lat={location.lat!} lng={location.lng!} />
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
