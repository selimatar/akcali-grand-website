import 'server-only'

/** Viewer token for draft preview. Server-only: importing this from client code fails the build. */
export const readToken = process.env.SANITY_API_READ_TOKEN || ''
