// Singleton documents: exactly one instance each, with a fixed _id equal to the type name.
// They're pinned at the top of the Studio, hidden from "create new" menus, and can't be deleted or
// duplicated (see sanity.config.ts).

export const SINGLETONS = {
  siteSettings: { id: 'siteSettings', title: 'Site Ayarları' },
  homePage: { id: 'homePage', title: 'Ana Sayfa' },
} as const

export type SingletonType = keyof typeof SINGLETONS

export const singletonTypes = new Set<string>(Object.keys(SINGLETONS))

/** Document actions that make sense for a singleton. */
export const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
