import { MAIN_ID } from '@/lib/sections'
import { ui } from '@/lib/ui-strings'

/** First focusable element on the page: lets keyboard users jump past the menu. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_ID}`}
      data-surface="dark"
      className="sr-only z-60 h-pill items-center rounded-pill border border-on-dark-outline px-5 text-label tracking-button uppercase no-underline focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:flex"
    >
      {ui.skipToContent}
    </a>
  )
}
