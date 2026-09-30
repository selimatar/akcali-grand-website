import { defineField, defineType } from 'sanity'

/**
 * The heading block every homepage section starts with: small eyebrow label ("Salonumuz"),
 * the large title, and an optional shorter label for the menu. The number in front of the
 * eyebrow ("01 —") is generated from the section order, so editors never type it.
 */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Bölüm başlığı',
  type: 'object',
  options: { collapsible: false },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Üst etiket',
      description:
        'Başlığın üstündeki küçük, büyük harfli etiket. Numara (01 —) otomatik eklenir. Örn. “Salonumuz”.',
      type: 'string',
      validation: (rule) => rule.required().error('Üst etiket zorunludur.').max(30),
    }),
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (rule) => rule.required().error('Başlık zorunludur.').max(80),
    }),
    defineField({
      name: 'navLabel',
      title: 'Menüdeki adı',
      description:
        'Boş bırakılırsa üst etiket kullanılır. Örn. üst etiket “Çiftlerimiz Anlatıyor”, menüde “Yorumlar”.',
      type: 'string',
      validation: (rule) => rule.max(20),
    }),
  ],
})
