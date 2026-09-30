import type { SectionHeaderData } from '@/lib/sections'

import { OrnamentDivider } from './OrnamentDivider'

type Props = {
  /** "01", from the section's position among visible sections. */
  number: string
  header: SectionHeaderData
  /** id for the h2 (the section is labelled by it). */
  headingId: string
  align?: 'start' | 'center'
  /** text-wrap: balance for long, multi-line titles. */
  balance?: boolean
  className?: string
}

/**
 * Section heading block from the design: "01 — Eyebrow", the large serif title and the gold
 * ornament. The eyebrow color follows the surface (muted ink on light, gold on dark).
 */
export function SectionHeader({
  number,
  header,
  headingId,
  align = 'start',
  balance = false,
  className = '',
}: Props) {
  const centered = align === 'center'
  return (
    <div
      className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : ''} ${className}`}
    >
      {header?.eyebrow ? (
        <p className="text-label tracking-eyebrow text-eyebrow uppercase">
          {number} — {header.eyebrow}
        </p>
      ) : null}
      {header?.title ? (
        <h2
          id={headingId}
          className={`font-display text-display font-normal ${balance ? 'text-balance' : ''}`}
        >
          {header.title}
        </h2>
      ) : null}
      <OrnamentDivider variant={centered ? 'center' : 'start'} />
    </div>
  )
}

/** Heading id convention: "hakkimizda" → "hakkimizda-baslik". */
export function headingIdFor(sectionId: string) {
  return `${sectionId}-baslik`
}
