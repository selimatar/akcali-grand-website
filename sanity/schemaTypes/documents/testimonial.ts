import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { CommentIcon } from '@sanity/icons/Comment'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { truncate } from '../../../lib/format'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Yorum',
  type: 'document',
  icon: CommentIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'testimonial' }),
    defineField({
      name: 'isPlaceholder',
      title: 'Yer tutucu (örnek yorum)',
      description:
        'Açıksa bu yorum canlı sitede GÖSTERİLMEZ; yalnızca geliştirme ortamında ve önizlemede “Örnek yorum” etiketiyle görünür. Gerçek bir çiftin yorumunu girdiğinizde kapatın.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'quote',
      title: 'Yorum',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().error('Yorum metni zorunludur.').max(300),
    }),
    defineField({
      name: 'coupleNames',
      title: 'Çiftin adları',
      description: 'Örn. “Elif & Kerem”. Yalnızca çiftin izniyle yazın.',
      type: 'string',
      validation: (rule) => rule.required().error('Çiftin adları zorunludur.').max(60),
    }),
    defineField({
      name: 'eventDate',
      title: 'Düğün tarihi',
      description: 'Sitede yalnızca ay ve yıl gösterilir.',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
    defineField({
      name: 'spaces',
      title: 'Kullanılan mekânlar',
      description: 'Yorumun altında “Bahçe + Ana Salon” şeklinde gösterilir.',
      type: 'array',
      validation: (rule) => rule.max(3).unique(),
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'space' }] })],
    }),
  ],
  preview: {
    select: { couple: 'coupleNames', quote: 'quote', isPlaceholder: 'isPlaceholder' },
    prepare: ({ couple, quote, isPlaceholder }) => ({
      title: `${isPlaceholder ? 'YER TUTUCU · ' : ''}${couple ?? 'İsimsiz yorum'}`,
      subtitle: truncate(quote),
    }),
  },
})
