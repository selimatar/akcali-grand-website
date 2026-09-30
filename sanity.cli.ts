/**
 * Sanity CLI configuration: used by `sanity schema extract`, `sanity typegen generate` and
 * `sanity exec` (seed script). Loads .env / .env.local the same way Next.js does.
 */
import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'

loadEnvConfig(process.cwd())

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_SANITY_PROJECT_ID || 'unconfigured',
    dataset: process.env.NEXT_SANITY_DATASET || 'production',
  },
  typegen: {
    path: [
      './sanity/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './lib/**/*.{ts,tsx}',
    ],
    schema: './schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
    formatGeneratedCode: true,
  },
})
