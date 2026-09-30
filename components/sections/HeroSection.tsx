import { SanityImage } from '@/components/sanity/SanityImage'
import { Logo } from '@/components/ui/Logo'
import { ScrollCue } from '@/components/ui/ScrollCue'
import type { HomePage } from '@/lib/content'
import { HERO_ID } from '@/lib/sections'

type Props = {
  hero: HomePage['hero'] | undefined
  siteName: string | null | undefined
  /** First section below the hero; the scroll cue is hidden when there is none. */
  nextSectionId: string | null
}

/**
 * 01 Hero: full-viewport photo with the design's dark vignette, the logo (the page's h1) and the
 * tagline. Always rendered (the logo is a code asset), so "Başa dön" can target it; without a photo
 * the dark background stays.
 */
export function HeroSection({ hero, siteName, nextSectionId }: Props) {
  return (
    <section
      id={HERO_ID}
      data-surface="dark"
      className="relative h-svh min-h-hero-min overflow-hidden bg-night-soft text-ivory"
    >
      <div className="absolute inset-0">
        <SanityImage image={hero?.image} fill sizes="100vw" preload />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-overlay" />

      <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
        <h1>
          <Logo priority alt={siteName || undefined} className="h-auto w-logo-hero" />
        </h1>
        {hero?.tagline ? (
          <p className="font-display text-tagline text-balance text-ivory italic">{hero.tagline}</p>
        ) : null}
      </div>

      {nextSectionId ? <ScrollCue targetId={nextSectionId} /> : null}
    </section>
  )
}
