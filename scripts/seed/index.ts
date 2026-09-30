/**
 * One-off seed: imports the design's placeholder content into a DEVELOPMENT dataset so pages aren't
 * empty during development.
 *
 *   npm run seed                              # uses SANITY_API_WRITE_TOKEN from .env.local
 *   npm run seed -- --hero ./path/hero.jpg    # use a real hero photo instead of a placeholder
 *   npx sanity exec scripts/seed/index.ts --with-user-token   # use your CLI login instead of a token
 *
 * Safe to re-run: documents have fixed IDs and are replaced; identical images are deduplicated by
 * Sanity. It refuses to write to `production` unless you pass --allow-production.
 */
import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import { getCliClient } from 'sanity/cli'

import * as content from './content'
import { renderPlaceholder } from './placeholders'

const args = process.argv.slice(2)
const argValue = (name: string) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

const client = getCliClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-01',
  ...(process.env.SANITY_API_WRITE_TOKEN ? { token: process.env.SANITY_API_WRITE_TOKEN } : {}),
  useCdn: false,
})

const { projectId, dataset } = client.config()

// LexoRank-style ranks for @sanity/orderable-document-list: "0|100000:", "0|200000:", …
const rank = (index: number) => `0|${(index + 1).toString(36)}00000:`

type ImageValue = {
  _type: 'imageWithAlt'
  asset: { _type: 'reference'; _ref: string }
  alt: string
}

async function uploadImage(buffer: Buffer, filename: string, alt: string): Promise<ImageValue> {
  const asset = await client.assets.upload('image', buffer, { filename })
  return { _type: 'imageWithAlt', asset: { _type: 'reference', _ref: asset._id }, alt }
}

async function uploadPlaceholder(image: content.PlaceholderImage): Promise<ImageValue> {
  const buffer = await renderPlaceholder(image)
  return uploadImage(buffer, `placeholder-${image.key}.jpg`, image.description)
}

function block(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
  }
}

async function main() {
  if (!projectId || projectId === 'unconfigured') {
    throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set (see .env.example).')
  }
  if (dataset === 'production' && !args.includes('--allow-production')) {
    throw new Error(
      'Refusing to seed placeholder content into "production". Set NEXT_PUBLIC_SANITY_DATASET=development, or pass --allow-production if you really mean it.',
    )
  }

  console.log(`Seeding ${projectId}/${dataset}…`)

  // Images -------------------------------------------------------------------------------------
  const heroPath = argValue('--hero')
  const hero = heroPath
    ? await uploadImage(
        await readFile(heroPath),
        basename(heroPath),
        content.images.hero.description,
      )
    : await uploadPlaceholder(content.images.hero)
  console.log(`  ✓ hero image${heroPath ? ` (${heroPath})` : ' (placeholder)'}`)

  const [aboutImage, amenitiesImage] = await Promise.all([
    uploadPlaceholder(content.images.about),
    uploadPlaceholder(content.images.amenities),
  ])
  const spaceImages = await Promise.all(
    content.spaces.map((space) => uploadPlaceholder(space.image)),
  )
  const galleryImages = await Promise.all(
    content.gallery.map((item) => uploadPlaceholder(item.image)),
  )
  console.log(`  ✓ ${2 + spaceImages.length + galleryImages.length} placeholder images`)

  // Documents ----------------------------------------------------------------------------------
  const tx = client.transaction()

  tx.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: content.settings.siteName,
    phone: content.settings.phone,
    contactHours: content.settings.contactHours,
    address: content.settings.address,
    location: { _type: 'geopoint', ...content.settings.location },
    socialLinks: [
      {
        _key: 'instagram',
        _type: 'socialLink',
        platform: 'instagram',
        url: content.settings.instagramUrl,
      },
    ],
    defaultSeo: {
      _type: 'seo',
      title: content.settings.seo.title,
      description: content.settings.seo.description,
      ogImage: hero,
    },
  })

  const { home } = content
  tx.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    hero: { image: hero, tagline: home.tagline },
    about: {
      header: { _type: 'sectionHeader', ...home.about.header },
      body: home.about.paragraphs.map((text, index) => block(`about-${index + 1}`, text)),
      pillars: home.about.pillars.map((pillar, index) => ({
        _key: `pillar-${index + 1}`,
        _type: 'pillar',
        ...pillar,
      })),
      image: aboutImage,
    },
    spacesSection: {
      header: { _type: 'sectionHeader', ...home.spaces.header },
      intro: home.spaces.intro,
    },
    amenitiesSection: {
      header: { _type: 'sectionHeader', ...home.amenities.header },
      image: amenitiesImage,
    },
    gallerySection: {
      header: { _type: 'sectionHeader', ...home.gallery.header },
      intro: home.gallery.intro,
      instagramCtaLabel: home.gallery.instagramCtaLabel,
    },
    testimonialsSection: {
      header: { _type: 'sectionHeader', ...home.testimonials.header },
    },
    locationSection: {
      header: { _type: 'sectionHeader', ...home.location.header },
      directions: home.location.directions.map((direction, index) => ({
        _key: `direction-${index + 1}`,
        _type: 'direction',
        ...direction,
      })),
    },
  })

  content.spaces.forEach((space, index) => {
    tx.createOrReplace({
      _id: space.id,
      _type: 'space',
      orderRank: rank(index),
      name: space.name,
      featured: space.featured,
      description: space.description,
      capacities: space.capacities.map((capacity, capacityIndex) => ({
        _key: `capacity-${capacityIndex + 1}`,
        _type: 'capacity',
        ...capacity,
      })),
      image: spaceImages[index],
    })
  })

  content.amenities.forEach((amenity, index) => {
    tx.createOrReplace({
      _id: `amenity-${String(index + 1).padStart(2, '0')}`,
      _type: 'amenity',
      orderRank: rank(index),
      ...amenity,
    })
  })

  content.gallery.forEach((item, index) => {
    tx.createOrReplace({
      _id: item.id,
      _type: 'galleryImage',
      orderRank: rank(index),
      coupleNames: item.coupleNames,
      eventDate: item.eventDate,
      image: galleryImages[index],
    })
  })

  content.testimonials.forEach((testimonial, index) => {
    tx.createOrReplace({
      _id: testimonial.id,
      _type: 'testimonial',
      orderRank: rank(index),
      isPlaceholder: true,
      quote: testimonial.quote,
      coupleNames: '[Çift adı]',
      spaces: testimonial.spaceIds.map((id) => ({
        _key: id,
        _type: 'reference',
        _ref: id,
      })),
    })
  })

  await tx.commit()
  console.log(
    `  ✓ siteSettings, homePage, ${content.spaces.length} spaces, ${content.amenities.length} amenities, ${content.gallery.length} gallery images, ${content.testimonials.length} placeholder testimonials`,
  )
  console.log('\nDone. Replace the phone number, address and map coordinates in Site Ayarları.')
}

main().catch((error: unknown) => {
  console.error(`\nSeed failed: ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
