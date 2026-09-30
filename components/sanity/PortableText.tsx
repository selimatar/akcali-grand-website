import { PortableText as BasePortableText, type PortableTextComponents } from 'next-sanity'

import type { RichText } from '@/sanity.types'

type Props = {
  value: RichText | null | undefined
  /** Classes for each paragraph; the design styles paragraphs per section. */
  paragraphClassName?: string
}

/**
 * Renders the `richText` field. The schema only allows paragraphs and links, so those are the only
 * blocks handled here; anything unexpected renders nothing instead of breaking the page.
 */
export function PortableText({ value, paragraphClassName }: Props) {
  if (!value?.length) return null

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
    },
    marks: {
      link: ({ value: link, children }) => {
        const href = typeof link?.href === 'string' ? link.href : null
        return href ? (
          <a href={href} className="underline decoration-gold underline-offset-4">
            {children}
          </a>
        ) : (
          <>{children}</>
        )
      },
    },
  }

  return <BasePortableText value={value} components={components} onMissingComponent={false} />
}
