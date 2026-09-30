import { ImageIcon } from '@sanity/icons/Image'
import { defineField, defineType } from 'sanity'

/** Every image on the site: hotspot + crop enabled, alternative text required. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Görsel',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
    metadata: ['lqip', 'blurhash', 'palette'],
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternatif metin',
      description:
        'Fotoğrafı görme engelli ziyaretçiler ve arama motorları için bir cümleyle anlatın. Örn. “Gün batımında bahçede kurulu nikâh alanı”.',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .error('Alternatif metin zorunludur.')
          .max(150)
          .error('En fazla 150 karakter olmalıdır.'),
    }),
  ],
})
