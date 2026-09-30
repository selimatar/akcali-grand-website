import type { Settings } from './content'

/** "Haritada aç" target: the editor's Google Maps link, else a search for the coordinates. */
export function mapsHref(settings: Settings | null): string | null {
  if (settings?.mapsUrl) return settings.mapsUrl
  const location = settings?.location
  if (location?.lat == null || location.lng == null) return null
  return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
}
