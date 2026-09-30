// Sanity connection settings. NEXT_PUBLIC_* values are inlined at build time, so they must be read
// with literal `process.env.NAME` expressions.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-01'

/**
 * False until a project ID is set. The site still builds without one (every section hides), so
 * lint/typecheck/build work on a fresh clone before the Sanity project exists.
 */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)

/** Placeholder testimonials are only ever shown outside the production dataset (and in draft preview). */
export const isProductionDataset = dataset === 'production'

export const studioBasePath = '/studio'
