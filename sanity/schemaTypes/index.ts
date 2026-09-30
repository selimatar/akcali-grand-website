import type { SchemaTypeDefinition } from 'sanity'

import { amenity } from './documents/amenity'
import { galleryImage } from './documents/galleryImage'
import { homePage } from './documents/homePage'
import { siteSettings } from './documents/siteSettings'
import { space } from './documents/space'
import { testimonial } from './documents/testimonial'
import { imageWithAlt } from './objects/imageWithAlt'
import { richText } from './objects/richText'
import { sectionHeader } from './objects/sectionHeader'
import { seo } from './objects/seo'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  siteSettings,
  homePage,
  // Ordered collections
  space,
  amenity,
  galleryImage,
  testimonial,
  // Shared objects
  imageWithAlt,
  sectionHeader,
  seo,
  richText,
]

/** Document types whose changes should revalidate the site (webhook filter + cache tags). */
export const CONTENT_TYPES = [
  'siteSettings',
  'homePage',
  'space',
  'amenity',
  'galleryImage',
  'testimonial',
] as const

export type ContentType = (typeof CONTENT_TYPES)[number]
