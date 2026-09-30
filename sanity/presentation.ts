import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

import { CONTENT_TYPES } from './contentTypes'

/** The site is a single page: every content document is shown on the homepage. */
const homepage = defineLocations({
  locations: [{ title: 'Ana Sayfa', href: '/' }],
  message: 'Bu içerik ana sayfada görünür.',
  tone: 'positive',
})

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: Object.fromEntries(CONTENT_TYPES.map((type) => [type, homepage])),
}
