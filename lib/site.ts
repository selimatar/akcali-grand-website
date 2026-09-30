import { isProductionDataset } from '@/sanity/env'

/**
 * Public origin without a trailing slash. NEXT_PUBLIC_SITE_URL wins; on Vercel it falls back to the
 * project's production domain, locally to localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/+$/, '')

/**
 * Only the production deployment may be indexed. Vercel preview deployments and local builds
 * against a non-production dataset get noindex and a disallow-all robots.txt.
 */
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : isProductionDataset

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString()
