import { useId } from 'react'

type Props = {
  /** `start`: line fading in from the left, then the diamond (section headers).
   *  `center`: line, diamond, line (centered headers, e.g. the gallery). */
  variant?: 'start' | 'center'
  className?: string
}

// Geometry from the design: 64px (start) / 48px (center) hairlines, 8px gaps, a 6px square
// rotated 45° (≈8.5px across).
const DIAMOND_HALF = 4.25
const GAP = 8
const HEIGHT = 9
const MID = HEIGHT / 2

/**
 * The gold hairline-and-diamond ornament under every section title. Inline SVG in the page's gold
 * (currentColor), purely decorative.
 */
export function OrnamentDivider({ variant = 'start', className = '' }: Props) {
  const gradientId = useId()
  const line = variant === 'center' ? 48 : 64
  const diamondX = line + GAP + DIAMOND_HALF
  const width = variant === 'center' ? diamondX * 2 : diamondX + DIAMOND_HALF

  const diamond = `${diamondX},${MID - DIAMOND_HALF} ${diamondX + DIAMOND_HALF},${MID} ${diamondX},${MID + DIAMOND_HALF} ${diamondX - DIAMOND_HALF},${MID}`

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={width}
      height={HEIGHT}
      viewBox={`0 0 ${width} ${HEIGHT}`}
      className={`block text-gold ${className}`}
    >
      <defs>
        <linearGradient id={`${gradientId}-in`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id={`${gradientId}-out`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y={MID - 0.5} width={line} height="1" fill={`url(#${gradientId}-in)`} />
      <polygon points={diamond} fill="currentColor" />
      {variant === 'center' ? (
        <rect
          x={diamondX + DIAMOND_HALF + GAP}
          y={MID - 0.5}
          width={line}
          height="1"
          fill={`url(#${gradientId}-out)`}
        />
      ) : null}
    </svg>
  )
}
