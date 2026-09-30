import { PortableText } from '@/components/sanity/PortableText'
import { SanityImage } from '@/components/sanity/SanityImage'
import { PillarList } from '@/components/ui/PillarList'
import { Container, Section } from '@/components/ui/Section'
import { headingIdFor, SectionHeader } from '@/components/ui/SectionHeader'
import type { HomePage } from '@/lib/content'
import type { VisibleSection } from '@/lib/sections'
import { hasAsset } from '@/sanity/lib/image'

type Props = {
  section: VisibleSection
  about: HomePage['about'] | undefined
}

/** 02 Salonumuz: heading, intro text and highlights beside a portrait (4:5) photo. */
export function AboutSection({ section, about }: Props) {
  const headingId = headingIdFor(section.id)
  const showImage = hasAsset(about?.image)

  return (
    <Section
      id={section.id}
      surface="light"
      labelledBy={section.header?.title ? headingId : undefined}
    >
      <Container className="grid grid-split items-center gap-split">
        <div className="flex reveal flex-col gap-8">
          <SectionHeader
            number={section.number}
            header={section.header}
            headingId={headingId}
            balance
          />
          <PortableText
            value={about?.body}
            paragraphClassName="text-body-lg font-light text-pretty text-fg-body"
          />
          <PillarList pillars={about?.pillars} />
        </div>

        {showImage ? (
          <div className="reveal">
            <SanityImage
              image={about?.image}
              aspectRatio={4 / 5}
              sizes="(min-width: 64rem) 36rem, 100vw"
              className="h-auto w-full bg-stone"
            />
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
