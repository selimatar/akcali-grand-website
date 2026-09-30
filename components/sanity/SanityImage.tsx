import Image from 'next/image'

import {
  croppedSize,
  hasAsset,
  hotspotPosition,
  imageUrl,
  type SanityImageData,
} from '@/sanity/lib/image'

/** Used only if an asset has no dimension metadata. */
const FALLBACK_SIZE = { width: 2400, height: 1600 }

type BaseProps = {
  image: SanityImageData | null | undefined
  /** Required: how wide the image renders at each breakpoint, e.g. "(min-width: 64rem) 50vw, 100vw". */
  sizes: string
  className?: string
  /** Hero only: preload and fetch with high priority. Everything else lazy-loads. */
  preload?: boolean
}

type Props = BaseProps &
  (
    | {
        /** Fill the positioned parent (object-fit: cover), keeping the hotspot in view. */
        fill: true
        aspectRatio?: never
      }
    | {
        fill?: false
        /**
         * Crop to this ratio around the editor's hotspot (e.g. 4 / 5). Omit to keep the image's
         * own ratio after the editor's crop.
         */
        aspectRatio?: number
      }
  )

/**
 * Renders a Sanity image through the Sanity image CDN: responsive srcset, WebP, hotspot-aware
 * crop and a blur placeholder. It's a server component (the loader is configured globally in
 * next.config.ts), so no image code ships to the browser. Renders nothing when the image has no
 * asset, so callers can show their own empty state.
 */
export function SanityImage({ image, sizes, className, preload = false, ...props }: Props) {
  if (!hasAsset(image)) return null

  const source = croppedSize(image) ?? FALLBACK_SIZE
  const lqip = image.asset.metadata?.lqip ?? undefined

  const alt = image.alt ?? ''
  const common = {
    sizes,
    className,
    preload,
    loading: preload ? ('eager' as const) : ('lazy' as const),
    fetchPriority: preload ? ('high' as const) : undefined,
    placeholder: lqip ? ('blur' as const) : ('empty' as const),
    blurDataURL: lqip,
  }

  if (props.fill) {
    // Only the editor's crop is applied; the browser covers the frame and object-position keeps
    // the hotspot visible at every container ratio.
    return (
      <Image
        {...common}
        alt={alt}
        src={imageUrl(image, { width: source.width })}
        fill
        style={{ objectFit: 'cover', objectPosition: hotspotPosition(image) }}
      />
    )
  }

  const ratio = props.aspectRatio ?? source.width / source.height
  // Largest frame of the requested ratio that fits inside the cropped source.
  const width = Math.round(Math.min(source.width, source.height * ratio))
  const height = Math.round(width / ratio)

  return (
    <Image
      {...common}
      alt={alt}
      src={imageUrl(image, { width, height })}
      width={width}
      height={height}
    />
  )
}
