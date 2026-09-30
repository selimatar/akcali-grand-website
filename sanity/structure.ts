import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { CogIcon } from '@sanity/icons/Cog'
import { CommentIcon } from '@sanity/icons/Comment'
import { HomeIcon } from '@sanity/icons/Home'
import { ImagesIcon } from '@sanity/icons/Images'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { ThLargeIcon } from '@sanity/icons/ThLarge'
import type { StructureResolver } from 'sanity/structure'

import { SINGLETONS } from './singletons'

/**
 * Studio sidebar: the two singletons pinned on top, then the drag-and-drop ordered lists.
 * Order in these lists is the order on the site.
 */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('İçerik')
    .items([
      S.listItem()
        .title(SINGLETONS.homePage.title)
        .id(SINGLETONS.homePage.id)
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId(SINGLETONS.homePage.id)
            .title(SINGLETONS.homePage.title),
        ),
      S.listItem()
        .title(SINGLETONS.siteSettings.title)
        .id(SINGLETONS.siteSettings.id)
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SINGLETONS.siteSettings.id)
            .title(SINGLETONS.siteSettings.title),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'space',
        title: 'Mekânlar',
        icon: ThLargeIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'amenity',
        title: 'Hizmetler',
        icon: SparklesIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'galleryImage',
        title: 'Galeri',
        icon: ImagesIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'Yorumlar',
        icon: CommentIcon,
        S,
        context,
      }),
    ])
