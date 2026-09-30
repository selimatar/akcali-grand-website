// Placeholder content transcribed from the approved homepage design (Homepage.dc.html).
// Development only: every "photo" is a generated placeholder carrying the design's description of
// the intended shot, and details marked "(örnek)" or in [brackets] must be replaced by editors.

export type PlaceholderImage = {
  /** Stable key, used for the file name. */
  key: string
  /** The design's description of the intended photo; also used as alt text. */
  description: string
  width: number
  height: number
  tone: 'light' | 'dark'
}

const photo = (
  key: string,
  description: string,
  ratio: '16:9' | '4:5' | '3:2' | '1:1' | 'hero',
  tone: PlaceholderImage['tone'],
): PlaceholderImage => {
  const sizes = {
    '16:9': [2400, 1350],
    '4:5': [1600, 2000],
    '3:2': [2100, 1400],
    '1:1': [1600, 1600],
    hero: [2400, 1428],
  } as const
  const [width, height] = sizes[ratio]
  return { key, description, width, height, tone }
}

export const images = {
  hero: photo('hero', 'Hero fotoğrafı — akşam ışığında ana salon, avizeler yanık', 'hero', 'dark'),
  about: photo(
    'about',
    'Bahçe girişi, çınar ağaçları arasından salona uzanan yol. Gündüz, doğal ışık, dikey 4:5.',
    '4:5',
    'light',
  ),
  amenities: photo(
    'amenities',
    'Kurulu masa detayı: porselen, kristal kadeh, mum ışığı, beyaz çiçek aranjmanı. Yakın plan.',
    '3:2',
    'light',
  ),
} as const

export const settings = {
  siteName: 'Akcali Garden of Eden',
  // Design placeholder, intentionally invalid so the Studio flags it until the real number is set.
  phone: '+90 (5XX) XXX XX XX',
  contactHours: 'Her gün 10:00 – 19:00',
  address: {
    streetAddress: 'Çınarlı Mahallesi, Bahçe Sokak No: 12',
    district: 'Arsuz',
    city: 'Hatay',
  },
  // Approximate Arsuz town centre, NOT the venue. Replace with the venue's exact coordinates.
  location: { lat: 36.4127, lng: 35.8872 },
  instagramUrl: 'https://instagram.com/akcaligardenofeden',
  seo: {
    title: 'Akcali Garden of Eden · Düğün Salonu · Arsuz, Hatay',
    description:
      'Asırlık çınarların gölgesinde bahçe, salon ve teras: Arsuz’da nikâhınızı ve düğününüzü günde tek düğün ilkesiyle ağırlıyoruz.',
  },
}

export const home = {
  tagline: 'Bir ömrün en güzel gecesi, bahçenin kalbinde.',
  about: {
    header: { eyebrow: 'Salonumuz', title: 'Bir bahçe, bir salon, bir de sizin hikâyeniz.' },
    paragraphs: [
      'Akcali Garden of Eden, asırlık çınarların gölgesinde, şehrin gürültüsünden uzak ama herkesin kolayca ulaşabileceği bir noktada kuruldu. On beş yılı aşkın süredir, iki ailenin bir araya geldiği o özel günü sakin bir zarafetle ağırlıyoruz.',
      'Gün batımında bahçede kıyılan nikâhtan, avizelerin altında süren ilk dansa kadar her an; tek bir ekibin, tek bir düğüne odaklanan özeniyle hazırlanır.',
    ],
    pillars: [
      { title: 'Günde tek düğün', text: 'O gün mekânın tamamı ve tüm ekibimiz yalnızca sizin.' },
      {
        title: 'Kendi mutfağımız',
        text: 'Menüler, dışarıdan değil, kendi şeflerimizce hazırlanır.',
      },
      { title: 'İç ve dış mekân', text: 'Nikâh bahçede, kutlama salonda; hava ne olursa olsun.' },
    ],
  },
  spaces: {
    header: { eyebrow: 'Mekânlar', title: 'Üç ayrı atmosfer' },
    intro:
      'Nikâhı bahçede, yemeği salonda, gece yarısı pastasını terasta. Mekânlarımız birlikte ya da ayrı ayrı kullanılabilir.',
  },
  amenities: {
    header: { eyebrow: 'Hizmetler', title: 'Siz yalnızca anın tadını çıkarın.' },
  },
  gallery: {
    header: { eyebrow: 'Galeri', title: 'Burada evlenenler' },
    intro: 'Çiftlerimizin izniyle paylaştığımız, gerçek düğünlerden kareler.',
    instagramCtaLabel: 'Daha fazlası Instagram’da',
  },
  testimonials: {
    header: {
      eyebrow: 'Çiftlerimiz Anlatıyor',
      title: 'Geriye kalan hisler',
      navLabel: 'Yorumlar',
    },
  },
  location: {
    header: { eyebrow: 'Konum', title: 'Şehre yakın, gürültüye uzak' },
    directions: [
      { from: 'Şehir merkezinden', time: 'Araçla ~20 dk' },
      { from: 'Havalimanından', time: 'Araçla ~35 dk' },
      { from: 'Toplu taşıma', time: '[Hat no] · Çınarlı durağı, 3 dk yürüme' },
    ],
  },
}

export const spaces = [
  {
    id: 'space-ana-salon',
    name: 'Ana Salon',
    featured: true,
    description:
      'Yedi metrelik tavan yüksekliği, kristal avizeler ve kolonsuz geniş bir alan. Sahneyi her masadan rahatça görebilen düzeniyle kalabalık düğünlerde bile samimiyetini korur.',
    capacities: [
      { label: 'Yemekli', guests: 650 },
      { label: 'Kokteyl', guests: 900 },
    ],
    image: photo(
      'space-ana-salon',
      'Ana salon, akşam kurulumu. Kristal avizeler, yuvarlak masalar, dans pisti ortada. Yatay 16:9.',
      '16:9',
      'dark',
    ),
  },
  {
    id: 'space-bahce',
    name: 'Bahçe',
    featured: false,
    description:
      'Asırlık çınarların altında, çimenlerin üzerinde açık hava nikâhı. Mayıs–Ekim arası gün batımı törenleri için.',
    capacities: [
      { label: 'Nikâh', guests: 400 },
      { label: 'Kokteyl', guests: 600 },
    ],
    image: photo(
      'space-bahce',
      'Bahçede nikâh kurulumu: beyaz sandalyeler, çiçekli nikâh kemeri, çınarlar. Gün batımı.',
      '4:5',
      'dark',
    ),
  },
  {
    id: 'space-teras',
    name: 'Teras',
    featured: false,
    description:
      'Salonun üst katında, manzaraya açılan teras. Nikâh öncesi kokteyl, kına gecesi ya da daha küçük ve yakın kutlamalar için.',
    capacities: [
      { label: 'Kokteyl', guests: 250 },
      { label: 'Yemekli', guests: 150 },
    ],
    image: photo(
      'space-teras',
      'Teras, gece. Asma ışıklar, lounge oturma grupları, şehir manzarası.',
      '4:5',
      'dark',
    ),
  },
] as const

export const amenities = [
  {
    title: 'Mutfak & İkram',
    description:
      'Kendi mutfağımızda, mevsim ürünleriyle hazırlanan menüler. Tadım günü ile menünüzü birlikte belirliyoruz.',
  },
  {
    title: 'Dekorasyon',
    description:
      'Çiçek, masa düzeni ve nikâh alanı; tasarım ekibimizle konseptinize göre, sade ya da görkemli.',
  },
  {
    title: 'Işık & Ses',
    description:
      'Salona özel sahne ışıklandırması, profesyonel ses sistemi ve canlı müzik altyapısı.',
  },
  {
    title: 'Otopark',
    description: '300 araçlık ücretsiz otopark ve vale hizmeti; misafirleriniz park yeri aramaz.',
  },
  {
    title: 'Gelin Odası',
    description:
      'Doğal ışık alan, aynalı ve özel banyolu gelin odası. Hazırlık ve çekimler için sakin bir alan.',
  },
]

export const gallery = [
  ['Nikâh masası, bahçede gün batımı', 'Elif & Kerem', '2025-06-01'],
  ['İlk dans, salonda loş ışık', 'Zeynep & Mert', '2025-09-01'],
  ['Gelin detay: duvak ve buket', 'Ayşe & Can', '2025-05-01'],
  ['Aileler, toplu kare', 'Selin & Emre', '2025-07-01'],
  ['Terasta pasta kesimi, gece', 'Deniz & Ali', '2025-08-01'],
  ['Masa süslemesi, yakın plan', 'Buse & Onur', '2025-10-01'],
  ['Bahçe yürüyüşü, uzun kadraj', 'İrem & Barış', '2025-06-01'],
  ['Havai fişek, teras', 'Ece & Kaan', '2025-08-01'],
  ['Nikâh imzası, eller', 'Melis & Tolga', '2025-09-01'],
  ['Salon genel görünüm, davetlilerle', 'Gizem & Cem', '2025-05-01'],
].map(([description, coupleNames, eventDate], index) => ({
  id: `gallery-${String(index + 1).padStart(2, '0')}`,
  coupleNames: coupleNames!,
  eventDate: eventDate!,
  image: photo(`gallery-${index + 1}`, description!, '1:1', 'dark'),
}))

/** Placeholders (isPlaceholder: true): never shown on the production site. */
export const testimonials = [
  {
    id: 'testimonial-placeholder-1',
    quote:
      'Bahçedeki nikâh sırasında güneşin tam batışını yakaladık. Misafirlerimiz hâlâ o anı konuşuyor.',
    spaceIds: ['space-bahce', 'space-ana-salon'],
  },
  {
    id: 'testimonial-placeholder-2',
    quote: 'O gün hiçbir detayla uğraşmadık. Ekip her şeyi bizden önce düşünmüştü.',
    spaceIds: ['space-ana-salon'],
  },
  {
    id: 'testimonial-placeholder-3',
    quote:
      'Yemekler, ışıklar, müzik… Düğünümüzü dışarıdan izleyebilseydik, tam böyle olmasını isterdik.',
    spaceIds: ['space-teras'],
  },
]
