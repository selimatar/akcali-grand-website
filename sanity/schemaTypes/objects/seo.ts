import { SearchIcon } from '@sanity/icons/Search'
import { defineField, defineType } from 'sanity'

/** Image asset refs encode their size: image-<hash>-<width>x<height>-<ext>. */
function dimensionsFromRef(ref: string): { width: number; height: number } | null {
  const match = /-(\d+)x(\d+)-[a-z0-9]+$/.exec(ref)
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null
}

export const seo = defineType({
  name: 'seo',
  title: 'Arama motoru ve paylaşım',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa başlığı',
      description: 'Google sonuçlarında ve tarayıcı sekmesinde görünür. En fazla 60 karakter.',
      type: 'string',
      validation: (rule) => rule.max(60).error('En fazla 60 karakter olmalıdır.'),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      description:
        'Google sonuçlarında başlığın altında görünen 1–2 cümle. İdeali 70–160 karakter.',
      type: 'text',
      rows: 3,
      validation: (rule) => [
        rule.max(160).error('En fazla 160 karakter olmalıdır.'),
        rule.min(70).warning('70 karakterden kısa açıklamalar arama sonuçlarında zayıf kalır.'),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Paylaşım görseli',
      description:
        'Bağlantı WhatsApp, Instagram veya Facebook’ta paylaşıldığında görünen görsel. En az 1200×630 piksel.',
      type: 'imageWithAlt',
      validation: (rule) =>
        rule
          .custom<{ asset?: { _ref?: string } }>((value) => {
            const ref = value?.asset?._ref
            const size = ref ? dimensionsFromRef(ref) : null
            if (size && (size.width < 1200 || size.height < 630)) {
              return `Görsel ${size.width}×${size.height} piksel; en az 1200×630 önerilir.`
            }
            return true
          })
          .warning(),
    }),
  ],
})
