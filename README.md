# Akcali Garden of Eden — web sitesi

Introduction-only website (Turkish) for Akcali Garden of Eden, a wedding venue in Arsuz, Hatay.
Next.js (App Router) + Tailwind CSS v4 + Sanity CMS (Studio embedded at `/studio`), deployed on
Vercel.

> This README is expanded as the build progresses (webhook, deployment and the editor guide land in
> later steps).

## Requirements

- Node.js ≥ 22.12
- npm 10+

## Scripts

| Command                | What it does                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run dev`          | Local dev server on http://localhost:3000 (Studio at `/studio`)       |
| `npm run build`        | Production build                                                      |
| `npm start`            | Serve the production build                                            |
| `npm run lint`         | ESLint (Next core-web-vitals + TypeScript) and the design-token guard |
| `npm run typecheck`    | Generate Next route types, then `tsc --noEmit`                        |
| `npm run typegen`      | Extract the Sanity schema and regenerate `sanity.types.ts`            |
| `npm run seed`         | Import the design's placeholder content into a development dataset    |
| `npm run format`       | Prettier (with Tailwind class sorting)                                |
| `npm run format:check` | Prettier in check mode                                                |

## Setup

```sh
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run seed                 # optional: placeholder content for the development dataset
npm run dev
```

The site also builds without Sanity credentials (every content section is hidden), so lint,
typecheck and build work on a fresh clone.

## Environment variables

| Variable                         | Where      | Purpose                                                                |
| -------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | all        | Public origin, no trailing slash. Canonical URLs, Open Graph, sitemap. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | all        | Sanity project ID                                                      |
| `NEXT_PUBLIC_SANITY_DATASET`     | all        | `production` on the live site, `development` locally                   |
| `NEXT_PUBLIC_SANITY_API_VERSION` | all        | Pinned API version (`YYYY-MM-DD`)                                      |
| `SANITY_API_READ_TOKEN`          | server     | Viewer token for draft preview. Never expose it to the browser.        |
| `SANITY_API_WRITE_TOKEN`         | local only | Editor token, used only by `npm run seed`                              |
| `SANITY_REVALIDATE_SECRET`       | server     | Shared secret between the Sanity webhook and `/api/revalidate`         |

## Sanity project

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or `npx sanity login`
   then `npx sanity projects create`).
2. **Datasets:** `production` (live site) and `development` (local work and seed data).
3. **API → CORS origins:** add `http://localhost:3000` and the production URL, both with
   _Allow credentials_ on, so the embedded Studio can sign in.
4. **API → Tokens:** a _Viewer_ token (`SANITY_API_READ_TOKEN`) and, for seeding only, an _Editor_
   token (`SANITY_API_WRITE_TOKEN`).
5. Put the project ID and tokens in `.env.local`.

### Content model

| Document       | Kind      | Studio title  | Notes                                                      |
| -------------- | --------- | ------------- | ---------------------------------------------------------- |
| `homePage`     | singleton | Ana Sayfa     | One tab per homepage section, plus SEO                     |
| `siteSettings` | singleton | Site Ayarları | Contact, address, map location, social links, default SEO  |
| `space`        | ordered   | Mekânlar      | Name, photo, description, capacities, "geniş kart"         |
| `amenity`      | ordered   | Hizmetler     | Title and description                                      |
| `galleryImage` | ordered   | Galeri        | Photo, couple names, date                                  |
| `testimonial`  | ordered   | Yorumlar      | Quote, couple, date, spaces; `isPlaceholder` hides it live |

Schemas live in `sanity/schemaTypes`; the Studio sidebar in `sanity/structure.ts`. Singletons have
fixed IDs and can't be created, deleted or duplicated. Every image requires alternative text and
supports hotspot and crop. Rich text is limited to paragraphs and links, the only styles in the
design.

### Types

GROQ queries live in `sanity/lib/queries.ts` (`defineQuery`). After changing a schema or a query,
run `npm run typegen` and commit the updated `sanity.types.ts`. `client.fetch` results are typed
automatically from the query string.

### Seed data

`npm run seed` imports the design's copy and generated placeholder photos (hatched images printed
with the design's description of each intended shot). It refuses to write to `production`, is safe
to re-run, and marks all testimonials as placeholders. Pass a real hero photo with
`npm run seed -- --hero ./path/to/photo.jpg`. Seeded values to replace: the phone number, the exact
address and the map coordinates (currently the Arsuz town centre).

### Images

`components/sanity/SanityImage.tsx` renders through Sanity's image CDN via a global `next/image`
loader (`sanity/lib/image-loader.ts`): responsive `srcset`, WebP with JPEG fallback
(`auto=format`), hotspot-aware cropping and LQIP blur placeholders, with no client-side JavaScript.
Sanity's image CDN doesn't produce AVIF; images deliberately don't go through Vercel image
optimization, so there's no Vercel image quota to manage.

## Publishing and caching

The homepage is statically generated. Content is fetched at build time with `force-cache` and
tagged with the Sanity document types it reads (`sanity/lib/fetch.ts`). Visitors never trigger a
Sanity request.

### Webhook (on-demand revalidation)

When an editor publishes, a Sanity webhook calls `POST /api/revalidate`. The route checks the
signature, then calls `revalidateTag(<_type>, { expire: 0 })`, so the next visitor gets fresh
content. Set it up in [sanity.io/manage](https://www.sanity.io/manage) → API → Webhooks:

| Setting         | Value                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| URL             | `https://<your-domain>/api/revalidate`                                                |
| Dataset         | `production`                                                                          |
| Trigger on      | Create, Update, Delete                                                                |
| Filter          | `_type in ["siteSettings","homePage","space","amenity","galleryImage","testimonial"]` |
| Projection      | `{_type, _id}`                                                                        |
| Drafts/versions | Off                                                                                   |
| HTTP method     | POST                                                                                  |
| Secret          | the same value as `SANITY_REVALIDATE_SECRET`                                          |

Responses: `200` revalidated (or ignored type), `401` bad signature, `400` payload without `_type`,
`500` secret not configured. Webhook deliveries and their responses are listed in the webhook's
attempt log in sanity.io/manage.

### Draft preview (Studio → Önizleme)

The Studio's **Önizleme** tool (Presentation) shows the site with unpublished changes. It calls
`/api/draft-mode/enable`, which checks a short-lived secret from the Studio and turns on Next.js
draft mode. In draft mode, pages read drafts with `SANITY_API_READ_TOKEN`, uncached, with
click-to-edit overlays. Placeholder testimonials are also shown. Opening the site directly while in
draft mode shows an "Önizleme modu · Çık" bar; `/api/draft-mode/disable` leaves it.

Requirements: `SANITY_API_READ_TOKEN` (Viewer) on the server, and the site's origin in the
project's CORS origins with credentials allowed.

## Design tokens

All colors, type sizes, spacing, radii and motion values live in `styles/globals.css` (Tailwind v4
`@theme`). Sections set `data-surface="light" | "sand" | "dark"` and components use surface-aware
utilities (`text-fg`, `text-fg-body`, `text-accent`, `border-rule`, …), so gold text automatically
switches to the darker `gold-deep` on light backgrounds for WCAG AA contrast.

`scripts/check-tokens.mjs` (part of `npm run lint`) fails on raw hex/rgb colors, `px` arbitrary
values and `px` strings in inline styles inside `components/` and `app/`.

## Fonts

Cormorant Garamond and Jost are self-hosted through `next/font/google` (`lib/fonts.ts`) with the
`latin` and `latin-ext` subsets, which cover ç, ğ, ı, İ, ö, ş, ü. The document is `lang="tr"`, so CSS
`text-transform: uppercase` produces correct Turkish capitals (i → İ).
