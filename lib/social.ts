// Social platforms editors can link in Site Ayarları. Titles are fixed UI strings (footer labels).

export const SOCIAL_PLATFORMS = [
  { title: 'Instagram', value: 'instagram' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'TikTok', value: 'tiktok' },
] as const

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]['value']

export function platformTitle(platform: string | null | undefined): string {
  return SOCIAL_PLATFORMS.find((item) => item.value === platform)?.title ?? ''
}

/** "@akcaligardenofeden" from "https://instagram.com/akcaligardenofeden/". */
export function socialHandle(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const segment = new URL(url).pathname.split('/').filter(Boolean)[0]
    return segment ? `@${segment.replace(/^@/, '')}` : null
  } catch {
    return null
  }
}
