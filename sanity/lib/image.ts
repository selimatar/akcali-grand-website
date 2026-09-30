import { createImageUrlBuilder } from '@sanity/image-url'

import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId: projectId || 'unconfigured', dataset })

/** The shape every image projection in queries.ts returns. */
export type SanityImageData = {
  alt: string | null
  crop: { top?: number; bottom?: number; left?: number; right?: number } | null
  hotspot: { x?: number; y?: number } | null
  asset: {
    _id: string
    metadata: {
      lqip: string | null
      dimensions: { width: number | null; height: number | null; aspectRatio: number | null } | null
    } | null
  } | null
}

type ImageSource = Pick<SanityImageData, 'crop' | 'hotspot'> & { asset: { _id: string } }

/** True when the image has an uploaded asset (the only thing we can render). */
export function hasAsset<T extends { asset: { _id: string } | null } | null | undefined>(
  image: T,
): image is T & { asset: { _id: string } } {
  return Boolean(image?.asset?._id)
}

/**
 * Image URL through Sanity's image pipeline. With both width and height the crop is centered on
 * the editor's hotspot; `auto('format')` serves WebP to browsers that accept it.
 */
export function imageUrl(
  image: ImageSource,
  { width, height, quality = 75 }: { width: number; height?: number; quality?: number },
): string {
  let url = builder
    .image({
      asset: { _ref: image.asset._id },
      crop: image.crop ?? undefined,
      hotspot: image.hotspot ?? undefined,
    })
    .width(Math.round(width))
    .quality(quality)
    .auto('format')
  if (height) url = url.height(Math.round(height)).fit('crop')
  return url.url()
}

/** Pixel size of the image after the editor's crop. */
export function croppedSize(image: SanityImageData): { width: number; height: number } | null {
  const dims = image.asset?.metadata?.dimensions
  if (!dims?.width || !dims.height) return null
  const crop = image.crop ?? {}
  const width = Math.round(dims.width * (1 - (crop.left ?? 0) - (crop.right ?? 0)))
  const height = Math.round(dims.height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0)))
  return width > 0 && height > 0 ? { width, height } : null
}

/**
 * CSS object-position for `fill` images, so cover-cropping in the browser keeps the hotspot in view.
 * Hotspot coordinates are relative to the full image, so convert them into the cropped frame.
 */
export function hotspotPosition(image: SanityImageData): string {
  const hotspot = image.hotspot
  if (hotspot?.x == null || hotspot.y == null) return '50% 50%'
  const crop = image.crop ?? {}
  const left = crop.left ?? 0
  const top = crop.top ?? 0
  const visibleWidth = 1 - left - (crop.right ?? 0)
  const visibleHeight = 1 - top - (crop.bottom ?? 0)
  const clamp = (value: number) => Math.min(100, Math.max(0, value * 100))
  const x = visibleWidth > 0 ? clamp((hotspot.x - left) / visibleWidth) : 50
  const y = visibleHeight > 0 ? clamp((hotspot.y - top) / visibleHeight) : 50
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`
}
