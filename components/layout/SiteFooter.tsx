import type { ReactNode } from 'react'

import { Logo } from '@/components/ui/Logo'
import { getSettings } from '@/lib/content'
import { telHref } from '@/lib/phone'
import { HERO_ID } from '@/lib/sections'
import { platformTitle, socialHandle } from '@/lib/social'
import { ui } from '@/lib/ui-strings'

function FooterColumn({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-micro tracking-button text-gold uppercase">{label}</p>
      {children}
    </div>
  )
}

const valueClass = 'text-body-sm text-on-dark-strong font-light no-underline'

/** Footer: logo, address, phone and one column per social account. Empty columns are omitted. */
export async function SiteFooter() {
  const settings = await getSettings()
  const address = settings?.address
  const locality = [address?.district, address?.city].filter(Boolean).join(' / ')
  const phoneHref = telHref(settings?.phone)
  const socialLinks = (settings?.socialLinks ?? []).filter((link) => link.url && link.platform)

  return (
    <footer data-surface="dark" className="px-gutter pt-footer-top pb-8">
      <div className="mx-auto flex max-w-content flex-col gap-16">
        <div className="grid grid-footer items-start gap-x-8 gap-y-12">
          <Logo className="h-auto w-logo-footer" />

          {address?.streetAddress || locality ? (
            <FooterColumn label={ui.footer.address}>
              <address className={`${valueClass} not-italic`}>
                {address?.streetAddress}
                {address?.streetAddress && locality ? <br /> : null}
                {locality}
              </address>
            </FooterColumn>
          ) : null}

          {settings?.phone ? (
            <FooterColumn label={ui.footer.phone}>
              {phoneHref ? (
                <a href={phoneHref} className={valueClass}>
                  {settings.phone}
                </a>
              ) : (
                <span className={valueClass}>{settings.phone}</span>
              )}
              {settings.contactHours ? (
                <span className="text-meta text-fg-muted">{settings.contactHours}</span>
              ) : null}
            </FooterColumn>
          ) : null}

          {socialLinks.map((link) => (
            <FooterColumn key={link._key} label={platformTitle(link.platform)}>
              <a href={link.url!} className={valueClass}>
                {socialHandle(link.url) ?? link.url}
              </a>
            </FooterColumn>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-on-dark-rule-soft pt-6 text-label tracking-meta text-on-dark-subtle">
          <span>
            © {new Date().getFullYear()} {settings?.siteName ?? ui.brandName}
          </span>
          <a href={`#${HERO_ID}`} className="no-underline">
            {ui.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
