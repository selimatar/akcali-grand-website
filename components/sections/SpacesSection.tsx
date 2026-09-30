import { Container, Section } from '@/components/ui/Section'
import { headingIdFor, SectionHeader } from '@/components/ui/SectionHeader'
import { SpaceCard } from '@/components/ui/SpaceCard'
import type { HomeData, HomePage } from '@/lib/content'
import type { VisibleSection } from '@/lib/sections'

type Props = {
  section: VisibleSection
  content: HomePage['spacesSection'] | undefined
  spaces: HomeData['spaces']
}

/** 03 Mekânlar: heading with a short intro beside it, then the space cards in editor order. */
export function SpacesSection({ section, content, spaces }: Props) {
  const headingId = headingIdFor(section.id)

  return (
    <Section
      id={section.id}
      surface="dark"
      labelledBy={section.header?.title ? headingId : undefined}
    >
      <Container className="flex flex-col gap-stack">
        <div className="flex reveal flex-wrap items-end justify-between gap-6">
          <SectionHeader number={section.number} header={section.header} headingId={headingId} />
          {content?.intro ? (
            <p className="max-w-aside text-body font-light text-fg-body">{content.intro}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-card-y">
          {groupRows(spaces).map((row) => (
            <div key={row[0]!.space._id} className="grid grid-cards gap-x-card-x gap-y-card-y">
              {row.map(({ space, index }) => (
                <SpaceCard key={space._id} space={space} index={index} />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

type Indexed = { space: HomeData['spaces'][number]; index: number }

/**
 * Featured spaces get a row of their own; consecutive regular spaces share a grid. Separate grids
 * let two regular cards fill the row at desktop widths instead of leaving an empty third track.
 */
function groupRows(spaces: HomeData['spaces']): Indexed[][] {
  const rows: Indexed[][] = []
  spaces.forEach((space, index) => {
    const last = rows.at(-1)
    if (!space.featured && last && !last[0]!.space.featured) last.push({ space, index })
    else rows.push([{ space, index }])
  })
  return rows
}
