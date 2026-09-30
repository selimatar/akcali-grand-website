import { SanityImage } from '@/components/sanity/SanityImage'
import { AmenityList } from '@/components/ui/AmenityList'
import { Container, Section } from '@/components/ui/Section'
import { headingIdFor, SectionHeader } from '@/components/ui/SectionHeader'
import type { HomeData, HomePage } from '@/lib/content'
import type { VisibleSection } from '@/lib/sections'
import { hasAsset } from '@/sanity/lib/image'

type Props = {
  section: VisibleSection
  content: HomePage['amenitiesSection'] | undefined
  amenities: HomeData['amenities']
}

/** 04 Hizmetler: heading and a 3:2 detail photo beside the numbered list of services. */
export function AmenitiesSection({ section, content, amenities }: Props) {
  const headingId = headingIdFor(section.id)

  return (
    <Section
      id={section.id}
      surface="light"
      labelledBy={section.header?.title ? headingId : undefined}
    >
      <Container className="grid grid-split items-start gap-split">
        <div className="flex reveal flex-col gap-8">
          <SectionHeader
            number={section.number}
            header={section.header}
            headingId={headingId}
            balance
          />
          {hasAsset(content?.image) ? (
            <SanityImage
              image={content?.image}
              aspectRatio={3 / 2}
              sizes="(min-width: 64rem) 36rem, 100vw"
              className="h-auto w-full bg-stone"
            />
          ) : null}
        </div>

        <AmenityList amenities={amenities} />
      </Container>
    </Section>
  )
}
