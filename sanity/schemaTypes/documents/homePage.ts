import { HomeIcon } from '@sanity/icons/Home'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { SINGLETONS } from '../../singletons'

const header = (group: string) =>
  defineField({
    name: 'header',
    title: 'Bölüm başlığı',
    type: 'sectionHeader',
    group,
  })

/**
 * The homepage: one tab per design section. Lists that editors reorder (Mekânlar, Hizmetler, Galeri,
 * Yorumlar) are separate documents; this page only holds each section's heading and copy.
 * A section is hidden on the site when it has nothing to show.
 */
export const homePage = defineType({
  name: 'homePage',
  title: SINGLETONS.homePage.title,
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Giriş', default: true },
    { name: 'about', title: 'Salonumuz' },
    { name: 'spaces', title: 'Mekânlar' },
    { name: 'amenities', title: 'Hizmetler' },
    { name: 'gallery', title: 'Galeri' },
    { name: 'testimonials', title: 'Yorumlar' },
    { name: 'location', title: 'Konum' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Giriş',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        defineField({
          name: 'image',
          title: 'Arka plan fotoğrafı',
          description:
            'Sayfanın ilk ekranı, tam genişlik. Yatay ve en az 2400 piksel genişliğinde bir fotoğraf kullanın; önemli bölgeyi “odak noktası” ile işaretleyin.',
          type: 'imageWithAlt',
          validation: (rule) =>
            rule.required().error('Giriş fotoğrafı zorunludur.').assetRequired(),
        }),
        defineField({
          name: 'tagline',
          title: 'Slogan',
          description: 'Logonun altındaki italik cümle.',
          type: 'string',
          validation: (rule) => rule.max(90),
        }),
      ],
    }),

    defineField({
      name: 'about',
      title: 'Salonumuz',
      type: 'object',
      group: 'about',
      options: { collapsible: false },
      fields: [
        header('about'),
        defineField({
          name: 'body',
          title: 'Tanıtım metni',
          description: 'Paragraflar arasında boş satır bırakın.',
          type: 'richText',
        }),
        defineField({
          name: 'pillars',
          title: 'Öne çıkanlar',
          description:
            'Metnin altındaki kısa maddeler. Roma rakamları (I, II, III) otomatik eklenir.',
          type: 'array',
          validation: (rule) => rule.max(4),
          of: [
            defineArrayMember({
              name: 'pillar',
              title: 'Madde',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Başlık',
                  type: 'string',
                  validation: (rule) => rule.required().error('Başlık zorunludur.').max(30),
                }),
                defineField({
                  name: 'text',
                  title: 'Açıklama',
                  type: 'text',
                  rows: 2,
                  validation: (rule) => rule.required().error('Açıklama zorunludur.').max(110),
                }),
              ],
              preview: { select: { title: 'title', subtitle: 'text' } },
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Fotoğraf',
          description: 'Metnin yanında dikey (4:5) gösterilir.',
          type: 'imageWithAlt',
        }),
      ],
    }),

    defineField({
      name: 'spacesSection',
      title: 'Mekânlar',
      description: 'Mekân kartları sol menüdeki “Mekânlar” listesinden yönetilir.',
      type: 'object',
      group: 'spaces',
      options: { collapsible: false },
      fields: [
        header('spaces'),
        defineField({
          name: 'intro',
          title: 'Giriş metni',
          description: 'Başlığın yanındaki kısa açıklama.',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(220),
        }),
      ],
    }),

    defineField({
      name: 'amenitiesSection',
      title: 'Hizmetler',
      description: 'Hizmet maddeleri sol menüdeki “Hizmetler” listesinden yönetilir.',
      type: 'object',
      group: 'amenities',
      options: { collapsible: false },
      fields: [
        header('amenities'),
        defineField({
          name: 'image',
          title: 'Fotoğraf',
          description: 'Başlığın altında yatay (3:2) gösterilir.',
          type: 'imageWithAlt',
        }),
      ],
    }),

    defineField({
      name: 'gallerySection',
      title: 'Galeri',
      description: 'Fotoğraflar sol menüdeki “Galeri” listesinden yönetilir.',
      type: 'object',
      group: 'gallery',
      options: { collapsible: false },
      fields: [
        header('gallery'),
        defineField({
          name: 'intro',
          title: 'Giriş metni',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: 'instagramCtaLabel',
          title: 'Instagram bağlantı metni',
          description:
            'Galerinin altındaki bağlantı. Hesap adı (@…) Site Ayarları’ndaki Instagram hesabından otomatik eklenir.',
          type: 'string',
          validation: (rule) => rule.max(40),
        }),
      ],
    }),

    defineField({
      name: 'testimonialsSection',
      title: 'Yorumlar',
      description: 'Yorumlar sol menüdeki “Yorumlar” listesinden yönetilir.',
      type: 'object',
      group: 'testimonials',
      options: { collapsible: false },
      fields: [header('testimonials')],
    }),

    defineField({
      name: 'locationSection',
      title: 'Konum',
      description: 'Adres ve harita konumu Site Ayarları’ndan gelir.',
      type: 'object',
      group: 'location',
      options: { collapsible: false },
      fields: [
        header('location'),
        defineField({
          name: 'directions',
          title: 'Ulaşım bilgileri',
          description: 'Adresin altındaki satırlar. Örn. “Şehir merkezinden” — “Araçla ~20 dk”.',
          type: 'array',
          validation: (rule) => rule.max(5),
          of: [
            defineArrayMember({
              name: 'direction',
              title: 'Satır',
              type: 'object',
              fields: [
                defineField({
                  name: 'from',
                  title: 'Nereden',
                  type: 'string',
                  validation: (rule) => rule.required().error('Zorunlu alan.').max(40),
                }),
                defineField({
                  name: 'time',
                  title: 'Süre / açıklama',
                  type: 'string',
                  validation: (rule) => rule.required().error('Zorunlu alan.').max(60),
                }),
              ],
              preview: { select: { title: 'from', subtitle: 'time' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Boş bırakılan alanlarda Site Ayarları’ndaki varsayılan SEO kullanılır.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: SINGLETONS.homePage.title }),
  },
})
