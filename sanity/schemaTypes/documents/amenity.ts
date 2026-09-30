import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { defineField, defineType } from 'sanity'

import { truncate } from '../../../lib/format'

export const amenity = defineType({
  name: 'amenity',
  title: 'Hizmet',
  type: 'document',
  icon: SparklesIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'amenity' }),
    defineField({
      name: 'title',
      title: 'Başlık',
      description: 'Örn. “Mutfak & İkram”. Numara (01, 02…) sıraya göre otomatik eklenir.',
      type: 'string',
      validation: (rule) => rule.required().error('Başlık zorunludur.').max(40),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().error('Açıklama zorunludur.').max(220),
    }),
  ],
  preview: {
    select: { title: 'title', description: 'description' },
    prepare: ({ title, description }) => ({
      title: title ?? 'İsimsiz hizmet',
      subtitle: truncate(description),
    }),
  },
})
