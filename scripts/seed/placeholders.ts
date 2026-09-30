// Generates the design's hatched photo placeholders as JPEGs (with the photo description printed on
// them) so development pages show correctly sized images before real photography exists.
import sharp from 'sharp'

import type { PlaceholderImage } from './content'

const TONES = {
  light: { background: '#E9E4DA', stripe: 'rgba(26,25,23,0.07)', text: '#5C5750' },
  dark: { background: '#1C1915', stripe: 'rgba(250,248,244,0.06)', text: 'rgba(250,248,244,0.7)' },
} as const

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if (line && `${line} ${word}`.length > maxChars) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

export async function renderPlaceholder(image: PlaceholderImage): Promise<Buffer> {
  const { width, height, tone } = image
  const colors = TONES[tone]
  const unit = Math.min(width, height)
  const fontSize = Math.round(unit / 28)
  const lineHeight = Math.round(fontSize * 1.5)
  const padding = Math.round(unit / 14)
  const stripeGap = Math.round(unit / 60)

  // Keep the caption inside the centre of the frame so it survives cover-cropping in the grid.
  const maxChars = Math.max(18, Math.floor((unit * 0.8) / (fontSize * 0.62)))
  const lines = ['YER TUTUCU FOTOĞRAF', ...wrap(image.description, maxChars)]
  const blockHeight = lines.length * lineHeight
  const startY = Math.round((height - blockHeight) / 2 + fontSize)
  const startX = Math.round((width - unit * 0.8) / 2)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <pattern id="hatch" width="${stripeGap}" height="${stripeGap}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="${Math.max(1, Math.round(stripeGap / 12))}" height="${stripeGap}" fill="${colors.stripe}"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="${colors.background}"/>
  <rect width="100%" height="100%" fill="url(#hatch)"/>
  <g font-family="Menlo, 'DejaVu Sans Mono', monospace" font-size="${fontSize}" fill="${colors.text}">
    ${lines
      .map(
        (line, index) =>
          `<text x="${startX}" y="${startY + index * lineHeight}"${index === 0 ? ' font-weight="bold"' : ''}>${escapeXml(line)}</text>`,
      )
      .join('\n    ')}
  </g>
  <rect x="${padding / 2}" y="${padding / 2}" width="${width - padding}" height="${height - padding}" fill="none" stroke="${colors.text}" stroke-opacity="0.25" stroke-dasharray="${fontSize / 2} ${fontSize / 2}"/>
</svg>`

  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}
