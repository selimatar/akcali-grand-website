# Akcali Garden of Eden — web sitesi

Introduction-only website (Turkish) for Akcali Garden of Eden, a wedding venue in Arsuz, Hatay.
Next.js (App Router) + Tailwind CSS v4 + Sanity CMS, deployed on Vercel.

> This README is expanded as the build progresses (Sanity setup, webhook, deployment and the editor
> guide land in later steps).

## Requirements

- Node.js ≥ 22.12
- pnpm 10 (`corepack enable`)

## Scripts

| Command             | What it does                                                          |
| ------------------- | --------------------------------------------------------------------- |
| `pnpm dev`          | Local dev server on http://localhost:3000                             |
| `pnpm build`        | Production build                                                      |
| `pnpm start`        | Serve the production build                                            |
| `pnpm lint`         | ESLint (Next core-web-vitals + TypeScript) and the design-token guard |
| `pnpm typecheck`    | Generate Next route types, then `tsc --noEmit`                        |
| `pnpm format`       | Prettier (with Tailwind class sorting)                                |
| `pnpm format:check` | Prettier in check mode                                                |

## Design tokens

All colors, type sizes, spacing, radii and motion values live in `styles/globals.css` (Tailwind v4
`@theme`). Sections set `data-surface="light" | "sand" | "dark"` and components use surface-aware
utilities (`text-fg`, `text-fg-body`, `text-accent`, `border-rule`, …), so gold text automatically
switches to the darker `gold-deep` on light backgrounds for WCAG AA contrast.

`scripts/check-tokens.mjs` (part of `pnpm lint`) fails on raw hex/rgb colors, `px` arbitrary
values and `px` strings in inline styles inside `components/` and `app/`.

## Fonts

Cormorant Garamond and Jost are self-hosted through `next/font/google` (`lib/fonts.ts`) with the
`latin` and `latin-ext` subsets, which cover ç, ğ, ı, İ, ö, ş, ü. The document is `lang="tr"`, so CSS
`text-transform: uppercase` produces correct Turkish capitals (i → İ).
