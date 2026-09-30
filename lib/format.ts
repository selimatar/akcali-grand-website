// Turkish formatting helpers shared by the site and the Studio previews.

const LOCALE = 'tr-TR'

/** Uppercase with Turkish rules (i → İ, ı → I). Never use plain toUpperCase() for display text. */
export function trUpper(value: string): string {
  return value.toLocaleUpperCase(LOCALE)
}

/** "2025-06-14" → "Haziran 2025". Invalid or empty input → null. */
export function formatMonthYear(isoDate: string | null | undefined): string | null {
  if (!isoDate) return null
  const date = new Date(`${isoDate.slice(0, 10)}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(LOCALE, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

/** 1 → "01", used for section and list numbering. */
export function padNumber(value: number): string {
  return String(value).padStart(2, '0')
}

const ROMAN: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

/** 3 → "III" (small numbers only; used for the About pillars). */
export function toRoman(value: number): string {
  let rest = value
  let out = ''
  for (const [amount, numeral] of ROMAN) {
    while (rest >= amount) {
      out += numeral
      rest -= amount
    }
  }
  return out
}

/** Shorten text for Studio previews. */
export function truncate(value: string | null | undefined, length = 80): string {
  if (!value) return ''
  return value.length > length ? `${value.slice(0, length - 1).trimEnd()}…` : value
}
