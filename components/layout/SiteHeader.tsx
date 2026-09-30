import { Fragment } from 'react'

import { getHome, getSettings } from '@/lib/content'
import { telHref } from '@/lib/phone'
import { getVisibleSections } from '@/lib/sections'
import { socialHandle } from '@/lib/social'

import { MenuDialog, type MenuItem } from './MenuDialog'

/** Site header: the floating menu. Menu items follow the sections that actually render. */
export async function SiteHeader() {
  const [home, settings] = await Promise.all([getHome(), getSettings()])

  const items: MenuItem[] = getVisibleSections(home, settings).flatMap((section) =>
    section.navLabel ? [{ id: section.id, number: section.number, label: section.navLabel }] : [],
  )

  const phone = settings?.phone
  const phoneHref = telHref(phone)
  const instagramUrl = settings?.socialLinks?.find((link) => link.platform === 'instagram')?.url
  const instagramHandle = socialHandle(instagramUrl)

  const contactParts = [
    phone ? (
      phoneHref ? (
        <a key="phone" href={phoneHref} className="no-underline">
          {phone}
        </a>
      ) : (
        <span key="phone">{phone}</span>
      )
    ) : null,
    instagramUrl && instagramHandle ? (
      <a key="instagram" href={instagramUrl} className="no-underline">
        {instagramHandle}
      </a>
    ) : null,
  ].filter(Boolean)

  const contact = contactParts.length
    ? contactParts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? ' · ' : null}
          {part}
        </Fragment>
      ))
    : null

  if (items.length === 0 && !contact) return null

  return (
    <header>
      <MenuDialog items={items} contact={contact} />
    </header>
  )
}
