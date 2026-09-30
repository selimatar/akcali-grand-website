import type { ReactNode } from 'react'

type Surface = 'light' | 'sand' | 'dark'

type SectionProps = {
  id: string
  surface: Surface
  /** id of the section's h2, so the section is announced by its title. */
  labelledBy?: string
  /** Padding differs per section in the design; default is the standard section padding. */
  className?: string
  children: ReactNode
}

/** A homepage section: anchor target, surface colors (see styles/globals.css) and padding. */
export function Section({
  id,
  surface,
  labelledBy,
  className = 'px-gutter py-section',
  children,
}: SectionProps) {
  return (
    <section id={id} data-surface={surface} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  )
}

/** Centered content column: `content` (1200px) for most sections, `wide` (1320px) for the gallery. */
export function Container({
  width = 'content',
  className = '',
  children,
}: {
  width?: 'content' | 'wide'
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`mx-auto ${width === 'wide' ? 'max-w-wide' : 'max-w-content'} ${className}`}>
      {children}
    </div>
  )
}
