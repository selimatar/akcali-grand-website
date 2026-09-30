import { toRoman } from '@/lib/format'

type Pillar = { _key: string; title: string | null; text: string | null }

/**
 * The short highlights under the About text (I, II, III…). Numerals are generated and decorative;
 * the list itself conveys the order.
 */
export function PillarList({ pillars }: { pillars: Pillar[] | null | undefined }) {
  const items = (pillars ?? []).filter((pillar) => pillar.title || pillar.text)
  if (items.length === 0) return null

  return (
    <ul className="grid grid-pillars gap-6 border-t border-rule pt-4">
      {items.map((pillar, index) => (
        <li key={pillar._key} className="flex flex-col gap-2 pt-4">
          <span aria-hidden="true" className="font-display text-numeral text-accent">
            {toRoman(index + 1)}
          </span>
          {pillar.title ? (
            <span className="text-body-sm leading-auto font-medium text-fg">{pillar.title}</span>
          ) : null}
          {pillar.text ? (
            <span className="text-small font-light text-fg-muted">{pillar.text}</span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
