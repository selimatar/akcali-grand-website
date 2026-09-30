import type { HomeData } from '@/lib/content'
import { padNumber } from '@/lib/format'

/** Numbered services list (01, 02…). Numbers are generated from editor order and decorative. */
export function AmenityList({ amenities }: { amenities: HomeData['amenities'] }) {
  return (
    <ol className="flex flex-col">
      {amenities.map((amenity, index) => (
        <li key={amenity._id} className="grid reveal grid-numbered gap-4 border-t border-rule py-8">
          <span aria-hidden="true" className="font-display text-numeral text-accent">
            {padNumber(index + 1)}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-title font-medium">{amenity.title}</h3>
            {amenity.description ? (
              <p className="text-body font-light text-pretty text-fg-body">{amenity.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
