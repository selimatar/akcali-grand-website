import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { ThLargeIcon } from '@sanity/icons/ThLarge'
import { defineArrayMember, defineField, defineType } from 'sanity'

type Capacity = { label?: string; guests?: number }

export const space = defineType({
  name: 'space',
  title: 'Mekân',
  type: 'document',
  icon: ThLargeIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'space' }),
    defineField({
      name: 'name',
      title: 'Mekân adı',
      description: 'Örn. “Ana Salon”, “Bahçe”, “Teras”.',
      type: 'string',
      validation: (rule) => rule.required().error('Mekân adı zorunludur.').max(40),
    }),
    defineField({
      name: 'image',
      title: 'Fotoğraf',
      description: 'Normal kartlarda dikey (4:5), geniş kartta yatay (16:9) kırpılır.',
      type: 'imageWithAlt',
      validation: (rule) => rule.required().error('Fotoğraf zorunludur.').assetRequired(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().error('Açıklama zorunludur.').max(320),
    }),
    defineField({
      name: 'capacities',
      title: 'Kapasiteler',
      description: 'Kartın altında “Yemekli 650 davetli” şeklinde gösterilir.',
      type: 'array',
      validation: (rule) => rule.required().min(1).error('En az bir kapasite ekleyin.').max(3),
      of: [
        defineArrayMember({
          name: 'capacity',
          title: 'Kapasite',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Düzen',
              description: 'Örn. Yemekli, Kokteyl, Nikâh.',
              type: 'string',
              validation: (rule) => rule.required().error('Düzen adı zorunludur.').max(20),
            }),
            defineField({
              name: 'guests',
              title: 'Davetli sayısı',
              type: 'number',
              validation: (rule) =>
                rule.required().error('Davetli sayısı zorunludur.').integer().min(1).max(5000),
            }),
          ],
          preview: {
            select: { label: 'label', guests: 'guests' },
            prepare: ({ label, guests }) => ({
              title: `${label ?? '—'} · ${guests ?? '—'} davetli`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Geniş kart',
      description:
        'Açıksa kart tüm satırı kaplar ve fotoğraf yatay gösterilir (tasarımda Ana Salon).',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      featured: 'featured',
      c0: 'capacities.0',
      c1: 'capacities.1',
      c2: 'capacities.2',
    },
    prepare: ({ title, media, featured, c0, c1, c2 }) => {
      const capacities = [c0, c1, c2]
        .filter((c): c is Capacity => Boolean(c))
        .map((c) => `${c.label ?? ''} ${c.guests ?? ''}`.trim())
        .join(' · ')
      return {
        title: title ?? 'İsimsiz mekân',
        subtitle: [featured ? 'Geniş kart' : null, capacities].filter(Boolean).join(' — '),
        media,
      }
    },
  },
})
