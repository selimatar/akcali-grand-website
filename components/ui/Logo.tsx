import Image from 'next/image'

import { ui } from '@/lib/ui-strings'

/**
 * The venue logo, a code asset (not CMS content). Interim: the raster logo from the design;
 * swap in /public/brand/logo-light.svg (and a dark variant for light backgrounds) when the
 * official SVGs arrive: only LOGOS changes.
 */
const LOGOS = {
  /** For dark backgrounds: silver wordmark, gold mark and flourish. */
  light: { src: '/brand/logo-light.png', width: 577, height: 251 },
} as const

type Props = {
  variant?: keyof typeof LOGOS
  className?: string
  /** Hero logo only: it's part of the first screen, so don't lazy-load it. */
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
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
