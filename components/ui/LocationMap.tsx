'use client'

import { useEffect, useRef, useState } from 'react'

import { ui } from '@/lib/ui-strings'

type Props = { lat: number; lng: number }

/**
 * Google Maps embed, loaded only when the map is about to scroll into view (no third-party requests
 * on first load). Until then, and without JavaScript, the design's placeholder with the dark/gold pin
 * is shown. The embed is desaturated to match the design's monochrome map.
 */
export function LocationMap({ lat, lng }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const node = frameRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&hl=tr&output=embed`

  return (
    <div ref={frameRef} className="relative aspect-square overflow-hidden bg-hatch-map">
      {!loaded ? (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-4 -translate-1/2 rounded-full bg-night ring-6 ring-gold-glow"
        />
      ) : null}
      {visible ? (
        <iframe
          src={src}
          title={ui.location.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 size-full border-0 grayscale transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}
    </div>
  )
}
