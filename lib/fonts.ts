import { Cormorant_Garamond, Jost } from 'next/font/google'

// Both families are variable fonts: one file per style/subset covers every weight the design uses
// (Cormorant 400/500 + 400 italic, Jost 300/400/500). `latin-ext` carries ğ, ş, İ (ç, ö, ü, ı are in `latin`).

export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-jost',
})

export const fontVariables = `${cormorant.variable} ${jost.variable}`
