import { SanityImage } from '@/components/sanity/SanityImage'
import type { HomeData } from '@/lib/content'
import { padNumber } from '@/lib/format'
import { ui } from '@/lib/ui-strings'
import { hasAsset } from '@/sanity/lib/image'

type Space = HomeData['spaces'][number]

/**
 * One venue space: photo, number + name, description and capacities. A featured space spans the
 * whole row with a 16:9 photo (the design's Ana Salon); the others are 4:5.
 */
export function SpaceCard({ space, index }: { space: Space; index: number }) {
  const featured = Boolean(space.featured)
  const capacities = space.capacities ?? []

  return (
    <article className="flex reveal flex-col gap-6">
      <div
        className={`relative overflow-hidden bg-hatch-dark ${
          featured ? 'aspect-video min-h-wide-min' : 'aspect-4/5'
        }`}
      >
        {hasAsset(space.image) ? (
          <SanityImage
            image={space.image}
            fill
            sizes={
              featured
                ? '(min-width: 75rem) 75rem, 100vw'
                : '(min-width: 75rem) 36rem, (min-width: 50rem) 50vw, 100vw'
            }
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="text-label tracking-num text-accent">
            {padNumber(index + 1)}
          </span>
          <h3 className="font-display text-title-lg font-normal">{space.name}</h3>
        </div>
        {space.description ? (
          <p className="max-w-measure text-body font-light text-pretty text-fg-body">
            {space.description}
          </p>
        ) : null}
        {capacities.length > 0 ? (
          <dl className="flex flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4">
            {capacities.map((capacity) => (
              <div key={capacity._key} className="flex flex-col gap-1">
                <dt className="text-micro tracking-label text-fg-muted uppercase">
                  {capacity.label}
                </dt>
                <dd className="font-display text-title leading-auto text-fg">
                  {capacity.guests}{' '}
                  <span className="font-sans text-meta text-fg-muted">{ui.spaces.guestsUnit}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </article>
  )
}
