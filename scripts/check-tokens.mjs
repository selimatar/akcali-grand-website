#!/usr/bin/env node
// Design-token guard (runs as part of `pnpm lint`).
// Components must style through the tokens in styles/globals.css. This fails on:
//   • raw color literals (#hex, rgb(), rgba(), hsl())
//   • Tailwind arbitrary values containing px or a hex color, e.g. `w-[123px]`, `text-[#fff]`
//   • px strings in inline style objects, e.g. style={{ padding: '20px' }}
// Opt a whole file out with a `tokens-ignore-file` comment (only for temporary/dev files).

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const DIRS = ['components', 'app']
const EXTENSIONS = /\.(tsx|ts|jsx|js)$/
const SKIP_DIRS = new Set(['node_modules', '.next', 'studio'])

const RULES = [
  {
    name: 'hex color',
    pattern: /(?<![\w&/])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g,
  },
  { name: 'color function', pattern: /\b(?:rgba?|hsla?)\(\s*\d/g },
  { name: 'arbitrary px/hex value', pattern: /-\[[^\]]*?(?:\d+px|#[0-9a-fA-F]{3,8})[^\]]*\]/g },
  { name: 'px string in style', pattern: /['"`]-?\d+(?:\.\d+)?px['"`]/g },
]

function walk(dir) {
  let files = []
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return files
  }
  for (const entry of entries) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIRS.has(entry)) files = files.concat(walk(path))
    } else if (EXTENSIONS.test(entry)) {
      files.push(path)
    }
  }
  return files
}

const violations = []

for (const file of DIRS.flatMap((dir) => walk(join(ROOT, dir)))) {
  const source = readFileSync(file, 'utf8')
  if (source.includes('tokens-ignore-file')) continue

  source.split('\n').forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return
    for (const rule of RULES) {
      for (const match of line.matchAll(rule.pattern)) {
        violations.push(`${relative(ROOT, file)}:${index + 1}  ${rule.name}: ${match[0]}`)
      }
    }
  })
}

if (violations.length > 0) {
  console.error('Design-token check failed — use the tokens in styles/globals.css instead:\n')
  for (const violation of violations) console.error(`  ${violation}`)
  console.error(`\n${violations.length} violation(s).`)
  process.exit(1)
}

console.log('Design-token check passed.')
