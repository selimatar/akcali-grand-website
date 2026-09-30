// Fixed interface strings that editors never change (button labels, aria labels, column labels).
// All venue content comes from Sanity; nothing in here is copy.

export const ui = {
  brandName: 'Akcali Garden of Eden', // accessible name of the logo asset in /public/brand
  skipToContent: 'İçeriğe geç',
  menu: {
    open: 'Menü',
    close: 'Kapat',
    navLabel: 'Ana menü',
    dialogLabel: 'Site menüsü',
  },
  footer: {
    address: 'Adres',
    phone: 'Telefon',
    backToTop: 'Başa dön ↑',
    contactLabel: 'İletişim bilgileri',
  },
} as const
