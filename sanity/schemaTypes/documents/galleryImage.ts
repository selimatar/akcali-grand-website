import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { ImagesIcon } from '@sanity/icons/Images'
import { defineField, defineType } from 'sanity'

import { formatMonthYear } from '../../../lib/format'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galeri fotoğrafı',
  type: 'document',
  icon: ImagesIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'galleryImage', newItemPosition: 'before' }),
    defineField({
      name: 'image',
      title: 'Fotoğraf',
      description:
        'Galeride farklı oranlarda kırpılabilir; önemli bölgeyi “odak noktası” ile işaretleyin. Büyük görünümde fotoğrafın tamamı gösterilir.',
      type: 'imageWithAlt',
      validation: (rule) => rule.required().error('Fotoğraf zorunludur.').assetRequired(),
    }),
    defineField({
      name: 'coupleNames',
      title: 'Çiftin adları',
      description:
        'Fotoğrafın üzerinde görünür. Yalnızca çiftin izniyle yazın. Örn. “Elif & Kerem”.',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'eventDate',
      title: 'Düğün tarihi',
      description: 'Sitede yalnızca ay ve yıl gösterilir (örn. “Haziran 2025”).',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
  ],
  preview: {
    select: { couple: 'coupleNames', alt: 'image.alt', date: 'eventDate', media: 'image' },
    prepare: ({ couple, alt, date, media }) => ({
      title: couple || alt || 'Fotoğraf',
      subtitle: formatMonthYear(date) ?? undefined,
      media,
    }),
  },
})
