// tokens-ignore-file — TEMPORARY design-token specimen for step 1 review. Replaced by the real
// homepage in step 4; nothing here is site content.
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token specimen',
  robots: { index: false, follow: false },
}

const swatches = [
  ['night', '#0E0D0B', 'bg-night'],
  ['night-soft', '#15130F', 'bg-night-soft'],
  ['night-raised', '#1C1915', 'bg-night-raised'],
  ['ivory', '#FAF8F4', 'bg-ivory'],
  ['sand', '#F2EEE6', 'bg-sand'],
  ['stone', '#E9E4DA', 'bg-stone'],
  ['stone-deep', '#E4DED2', 'bg-stone-deep'],
  ['white', '#FFFFFF', 'bg-white'],
  ['ink', '#1A1917', 'bg-ink'],
  ['ink-soft', '#2E2B27', 'bg-ink-soft'],
  ['ink-muted', '#5C5750', 'bg-ink-muted'],
  ['line', '#E2DCD0', 'bg-line'],
  ['line-sand', '#DDD6C8', 'bg-line-sand'],
  ['line-dashed', '#A39B8C', 'bg-line-dashed'],
  ['gold', '#B8963E', 'bg-gold'],
  ['gold-deep', '#9A7A2A', 'bg-gold-deep'],
] as const

const typeScale = [
  ['display', 'font-display text-display', 'Bir bahçe, bir salon, bir de sizin hikâyeniz.'],
  ['menu', 'font-display text-menu', 'Mekânlar'],
  ['title-lg', 'font-display text-title-lg', 'Ana Salon'],
  ['tagline', 'font-display text-tagline italic', 'Bir ömrün en güzel gecesi, bahçenin kalbinde.'],
  ['numeral', 'font-display text-numeral text-accent', 'I · II · III · 01'],
  ['title', 'font-display text-title font-medium', 'Mutfak & İkram'],
  ['title-sm', 'font-display text-title-sm', 'Elif & Kerem · Haziran 2025'],
  ['quote', 'font-display text-quote italic', 'O gün hiçbir detayla uğraşmadık.'],
  [
    'body-lg',
    'text-body-lg font-light text-fg-body',
    'Asırlık çınarların gölgesinde, şehrin gürültüsünden uzak.',
  ],
  [
    'body',
    'text-body font-light text-fg-body',
    'Nikâhı bahçede, yemeği salonda, gece yarısı pastasını terasta.',
  ],
  ['body-sm', 'text-body-sm font-medium', 'Günde tek düğün'],
  [
    'small',
    'text-small font-light text-fg-muted',
    'O gün mekânın tamamı ve tüm ekibimiz yalnızca sizin.',
  ],
  ['meta', 'text-meta text-fg-muted', 'Örnek yorum · Bahçe + Ana Salon'],
  ['label', 'text-label tracking-eyebrow uppercase text-eyebrow', '03 — Hizmetler'],
  ['micro', 'text-micro tracking-button uppercase text-eyebrow', 'Adres · İletişim'],
] as const

function Divider() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="block h-px w-16 bg-linear-to-r from-gold-fade to-gold" />
      <span className="block size-1.5 rotate-45 bg-gold" />
    </div>
  )
}

function SurfaceSample({ surface, label }: { surface: 'light' | 'sand' | 'dark'; label: string }) {
  return (
    <div data-surface={surface} className="flex flex-col gap-4 p-8">
      <span className="text-label tracking-eyebrow text-eyebrow uppercase">01 — {label}</span>
      <h2 className="font-display text-display tracking-display">Geriye kalan hisler</h2>
      <Divider />
      <p className="text-body font-light text-fg-body">
        Gövde metni (fg-body). Çiftlerimizin izniyle paylaştığımız, gerçek düğünlerden kareler.
      </p>
      <p className="text-small text-fg-muted">Soluk metin (fg-muted) · Araçla ~20 dk</p>
      <p className="font-display text-numeral text-accent">I &nbsp; II &nbsp; III</p>
      <a
        href="#specimen"
        className="self-start border-b border-gold py-3 text-label tracking-button uppercase no-underline"
      >
        Haritada aç ↗ (odak halkası için Tab)
      </a>
      <hr className="border-rule" />
    </div>
  )
}

export default function TokenSpecimenPage() {
  return (
    <div id="specimen" data-surface="light" className="min-h-screen">
      <div className="mx-auto flex max-w-content flex-col gap-16 px-gutter py-section">
        <header className="flex flex-col gap-4">
          <span className="text-label tracking-eyebrow text-eyebrow uppercase">
            Adım 1 — Tasarım token’ları
          </span>
          <h1 className="font-display text-display tracking-display">
            Token örnek sayfası (geçici)
          </h1>
          <Divider />
        </header>

        <section className="flex flex-col gap-6">
          <h2 className="text-label tracking-eyebrow uppercase">
            Türkçe karakterler ve büyük harf
          </h2>
          <p className="font-display text-title">
            Cormorant: ç ğ ı İ ö ş ü · Ç Ğ I İ Ö Ş Ü · “hikâye” Mekânlar Nikâh
          </p>
          <p className="font-display text-title italic">
            Cormorant italik: ç ğ ı İ ö ş ü · Ç Ğ I İ Ö Ş Ü
          </p>
          <p className="text-body-lg">Jost 400: ç ğ ı İ ö ş ü · Ç Ğ I İ Ö Ş Ü</p>
          <p className="text-body-lg font-light">Jost 300: ç ğ ı İ ö ş ü · Ç Ğ I İ Ö Ş Ü</p>
          <p className="text-body-lg font-medium">Jost 500: ç ğ ı İ ö ş ü · Ç Ğ I İ Ö Ş Ü</p>
          <p className="text-label tracking-eyebrow uppercase">
            CSS uppercase (lang=tr): hizmetler · galeri · çiftlerimiz anlatıyor · keşfedin · menü ·
            iletişim
          </p>
          <p className="text-small text-fg-muted">
            Beklenen: HİZMETLER · GALERİ · ÇİFTLERİMİZ ANLATIYOR · KEŞFEDİN · MENÜ · İLETİŞİM
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-label tracking-eyebrow uppercase">Renkler</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {swatches.map(([name, hex, bg]) => (
              <li key={name} className="flex flex-col gap-2">
                <span className={`${bg} block h-16 border border-line`} />
                <span className="text-small font-medium">{name}</span>
                <span className="text-meta text-fg-muted">{hex}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-label tracking-eyebrow uppercase">Yazı ölçeği</h2>
          <ul className="flex flex-col">
            {typeScale.map(([name, cls, sample]) => (
              <li
                key={name}
                className="grid gap-2 border-t border-rule py-4 sm:grid-cols-[8rem_1fr]"
              >
                <span className="text-meta text-fg-muted">{name}</span>
                <span className={cls}>{sample}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-label tracking-eyebrow uppercase">Yüzeyler (surface token’ları)</h2>
          <div className="grid grid-split">
            <SurfaceSample surface="light" label="Açık" />
            <SurfaceSample surface="sand" label="Kum" />
            <SurfaceSample surface="dark" label="Koyu" />
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-label tracking-eyebrow uppercase">
            Yer tutucu dokuları ve sahne efekti
          </h2>
          <div className="grid grid-cards gap-x-card-x gap-y-card-y">
            <div className="aspect-4/5 bg-hatch-light" />
            <div className="aspect-4/5 bg-hatch-dark" />
            <div className="aspect-square bg-hatch-map" />
          </div>
          <div data-surface="dark" className="relative flex h-48 items-end justify-center pb-6">
            <div className="absolute inset-0 bg-hero-overlay" />
            <span className="relative block h-12 w-px overflow-hidden bg-on-dark-track">
              <span className="absolute inset-0 animate-cue bg-gold" />
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
