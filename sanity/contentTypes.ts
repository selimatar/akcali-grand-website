// Document types whose changes should revalidate the site (webhook filter + cache tags).
// Kept free of Studio imports so server routes can use it without bundling `sanity`.
export const CONTENT_TYPES = [
  'siteSettings',
  'homePage',
  'space',
  'amenity',
  'galleryImage',
  'testimonial',
] as const

export type ContentType = (typeof CONTENT_TYPES)[number]
