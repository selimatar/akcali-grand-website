import type { Metadata } from 'next'

import { hasAsset, imageUrl, type SanityImageData } from '@/sanity/lib/image'

import type { HomeData, Settings } from './content'
import { mapsHref } from './maps'
import { telHref } from './phone'
import { absoluteUrl, isIndexable, siteUrl } from './site'
import { ui } from './ui-strings'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

function ogImage(image: SanityImageData | null | undefined) {
  if (!hasAsset(image)) return null
  return {
    url: imageUrl(image, { width: OG_WIDTH, height: OG_HEIGHT, format: 'jpg', quality: 80 }),
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt: image.alt ?? '',
  }
}

/**
 * Homepage metadata. Each field falls back: homePage.seo → siteSettings.defaultSeo → site name /
 * hero. Canonical is always the root URL; non-production deployments are noindex.
 */
export function buildHomeMetadata(home: HomeData | null, settings: Settings | null): Metadata {
  const pageSeo = home?.page?.seo
  const defaultSeo = settings?.defaultSeo
  const siteName = settings?.siteName || ui.brandName

  const title = pageSeo?.title || defaultSeo?.title || siteName
  const description = pageSeo?.description || defaultSeo?.description || undefined
  const image =
    ogImage(pageSeo?.ogImage) ?? ogImage(defaultSeo?.ogImage) ?? ogImage(home?.page?.hero?.image)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: '/' },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: '/',
      siteName,
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  }
}

/**
 * schema.org structured data for the venue (LocalBusiness + EventVenue). Only facts from Sanity;
 * no reviews or ratings (testimonials aren't verified reviews).
 */
export function buildVenueJsonLd(home: HomeData | null, settings: Settings | null) {
  const address = settings?.address
  const location = settings?.location
  const phone = telHref(settings?.phone)?.replace('tel:', '')
  const image = ogImage(
    home?.page?.seo?.ogImage ?? settings?.defaultSeo?.ogImage ?? home?.page?.hero?.image,
  )
  const spaces = home?.spaces ?? []
  const capacities = spaces.flatMap((space) => (space.capacities ?? []).map((c) => c.guests))
  const sameAs = (settings?.socialLinks ?? []).map((link) => link.url).filter(Boolean)

  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EventVenue'],
    '@id': `${siteUrl}/#mekan`,
    name: settings?.siteName || ui.brandName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/brand/logo-light.png'),
    image: image ? [image.url] : undefined,
    description: home?.page?.seo?.description || settings?.defaultSeo?.description || undefined,
    telephone: phone || undefined,
    address:
      address?.streetAddress || address?.district
        ? {
            '@type': 'PostalAddress',
            streetAddress: address?.streetAddress || undefined,
            addressLocality: address?.district || undefined,
            addressRegion: address?.city || undefined,
            postalCode: address?.postalCode || undefined,
            addressCountry: 'TR',
          }
        : undefined,
    geo:
      location?.lat != null && location.lng != null
        ? { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng }
        : undefined,
    hasMap: mapsHref(settings) || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    maximumAttendeeCapacity: capacities.length ? Math.max(...capacities) : undefined,
    amenityFeature: (home?.amenities ?? []).map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.title,
      value: true,
    })),
    containsPlace: spaces.map((space) => ({
      '@type': 'Place',
      name: space.name,
      description: space.description || undefined,
      maximumAttendeeCapacity: (space.capacities ?? []).length
        ? Math.max(...(space.capacities ?? []).map((c) => c.guests))
        : undefined,
    })),
  }

  return data
}
