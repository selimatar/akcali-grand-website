import { LinkIcon } from '@sanity/icons/Link'
import { defineArrayMember, defineField, defineType } from 'sanity'

const MAX_CHARACTERS = 900

type Block = { _type: string; children?: { text?: string }[] }

function plainTextLength(blocks: Block[] | undefined): number {
  return (blocks ?? []).reduce(
    (total, block) =>
      total + (block.children ?? []).reduce((sum, child) => sum + (child.text?.length ?? 0), 0),
    0,
  )
}

/**
 * Rich text limited to what the design uses: plain paragraphs and links. No headings, lists, bold or
 * italic, so editors can't produce styles the site has no design for.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Metin',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Paragraf', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Bağlantı',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'Adres',
                description: 'https://…, tel:+90… veya mailto:… ile başlamalıdır.',
                type: 'url',
                validation: (rule) =>
                  rule
                    .required()
                    .uri({ scheme: ['http', 'https', 'tel', 'mailto'] })
                    .error('Geçerli bir https://, tel: veya mailto: adresi girin.'),
              }),
            ],
          }),
        ],
      },
    }),
  ],
  validation: (rule) =>
    rule.custom((value: Block[] | undefined) => {
      const length = plainTextLength(value)
      return length > MAX_CHARACTERS
        ? `Metin ${length} karakter; en fazla ${MAX_CHARACTERS} karakter olmalıdır.`
        : true
    }),
})
