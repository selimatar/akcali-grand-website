import Image from 'next/image'

import { ui } from '@/lib/ui-strings'

/**
 * The venue logo, a code asset (not CMS content). Interim: the design's raster logo as WebP (the
 * PNG is kept for structured data). Swap in /public/brand/logo-light.svg (and a dark variant for
 * light backgrounds) when the official SVGs arrive: only LOGOS changes.
 */
const LOGOS = {
  /** For dark backgrounds: silver wordmark, gold mark and flourish. */
  light: { src: '/brand/logo-light.webp', width: 577, height: 251 },
} as const

type Props = {
  variant?: keyof typeof LOGOS
  className?: string
  /** Hero logo only: fetch with high priority (it's the LCP element). */
  priority?: boolean
  /** Pass an empty string when the logo sits next to text that already names the venue. */
  alt?: string
}

export function Logo({
  variant = 'light',
  className,
  priority = false,
  alt = ui.brandName,
}: Props) {
  const logo = LOGOS[variant]
  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={alt}
      className={className}
      unoptimized
      // Always eager: every copy is the same file the hero already loads (cached), so lazy-loading
      // the footer copy saves nothing. It also stops Next's dev LCP check from flagging the hero
      // logo: it matches images by src and would otherwise pick up the footer's lazy copy.
      loading="eager"
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
