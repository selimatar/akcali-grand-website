import { defineQuery } from 'next-sanity'

// Every image is fetched with the data the <SanityImage> pipeline needs: crop + hotspot for
// focal-point cropping, dimensions for aspect ratios, and lqip for the blur placeholder.
const image = /* groq */ `{
  alt,
  crop,
  hotspot,
  asset->{
    _id,
    metadata { lqip, dimensions { width, height, aspectRatio } }
  }
}`

const seo = /* groq */ `{
  title,
  description,
  ogImage ${image}
}`

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  siteName,
  phone,
  contactHours,
  address { streetAddress, district, city, postalCode },
  location { lat, lng },
  mapsUrl,
  socialLinks[] { _key, platform, url },
  defaultSeo ${seo}
}`)

/**
 * Everything the homepage renders, in one request. Collections come back in the order editors set
 * in the Studio (orderRank). Items missing their required content are filtered out here so
 * components never receive half-empty cards. Placeholder testimonials are only included when
 * $includePlaceholders is true (non-production dataset or draft preview).
 */
export const HOME_QUERY = defineQuery(`{
  "page": *[_type == "homePage"][0]{
    hero { tagline, image ${image} },
    about {
      header { eyebrow, title, navLabel },
      body,
      pillars[] { _key, title, text },
      image ${image}
    },
    spacesSection { header { eyebrow, title, navLabel }, intro },
    amenitiesSection { header { eyebrow, title, navLabel }, image ${image} },
    gallerySection { header { eyebrow, title, navLabel }, intro, instagramCtaLabel },
    testimonialsSection { header { eyebrow, title, navLabel } },
    locationSection { header { eyebrow, title, navLabel }, directions[] { _key, from, time } },
    seo ${seo}
  },
  "spaces": *[_type == "space" && defined(name)] | order(orderRank asc) {
    _id,
    name,
    description,
    featured,
    capacities[defined(label) && defined(guests)] { _key, label, guests },
    image ${image}
  },
  "amenities": *[_type == "amenity" && defined(title)] | order(orderRank asc) {
    _id,
    title,
    description
  },
  "gallery": *[_type == "galleryImage" && defined(image.asset)] | order(orderRank asc) {
    _id,
    coupleNames,
    eventDate,
    image ${image}
  },
  "testimonials": *[
    _type == "testimonial" && defined(quote) && ($includePlaceholders || isPlaceholder != true)
  ] | order(orderRank asc) {
    _id,
    quote,
    coupleNames,
    eventDate,
    isPlaceholder,
    "spaceNames": spaces[]->name
  }
}`)

/** Latest content change, used as the sitemap's lastModified. */
export const SITEMAP_QUERY = defineQuery(`*[
  _type in ["siteSettings", "homePage", "space", "amenity", "galleryImage", "testimonial"]
] | order(_updatedAt desc)[0]._updatedAt`)
