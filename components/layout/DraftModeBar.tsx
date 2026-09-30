'use client'

import { useEffect, useState } from 'react'

import { ui } from '@/lib/ui-strings'

/**
 * Shown only in draft mode when the site is opened directly (not inside the Studio's Önizleme
 * frame), so an editor always has a way back to the published site.
 */
export function DraftModeBar() {
  const [standalone, setStandalone] = useState(false)

  useEffect(() => {
    // Runs after hydration; inside the Presentation iframe the Studio provides its own controls.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStandalone(window.self === window.top)
  }, [])

  if (!standalone) return null

  return (
    <div
      role="status"
      data-surface="dark"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-4 rounded-pill border border-on-dark-outline glass px-5 py-3 text-label tracking-button uppercase"
    >
      <span>{ui.draftMode.label}</span>
      <a href="/api/draft-mode/disable" className="text-gold no-underline">
        {ui.draftMode.exit}
      </a>
    </div>
  )
}
