'use client'

/**
 * Sanity Studio configuration, embedded in the Next.js app at /studio (app/studio/[[...tool]]).
 */
import { trTRLocale } from '@sanity/locale-tr-tr'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioBasePath } from './sanity/env'
import { resolve } from './sanity/presentation'
import { schemaTypes } from './sanity/schemaTypes'
import { singletonActions, singletonTypes } from './sanity/singletons'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Akcali Garden of Eden',
  basePath: studioBasePath,
  // A placeholder keeps the Studio bundle building before a project exists; it shows a clear
  // "project not found" error until NEXT_PUBLIC_SANITY_PROJECT_ID is set.
  projectId: projectId || 'unconfigured',
  dataset,

  plugins: [
    structureTool({ structure, title: 'İçerik' }),
    // "Önizleme": edit with a live preview of the site, including unpublished drafts.
    presentationTool({
      title: 'Önizleme',
      resolve,
      previewUrl: {
        previewMode: { enable: '/api/draft-mode/enable', disable: '/api/draft-mode/disable' },
      },
    }),
    trTRLocale(),
    // GROQ playground for developers only.
    ...(process.env.NODE_ENV === 'development'
      ? [visionTool({ defaultApiVersion: apiVersion, title: 'GROQ' })]
      : []),
  ],

  schema: {
    types: schemaTypes,
    // Singletons can't be created from "+ Yeni" menus.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Singletons can only be published, reverted or restored — never deleted or duplicated.
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
    newDocumentOptions: (options, { creationContext }) =>
      creationContext.type === 'global'
        ? options.filter(({ templateId }) => !singletonTypes.has(templateId))
        : options,
  },
})
