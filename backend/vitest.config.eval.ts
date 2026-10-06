import { existsSync } from 'node:fs';

import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// Evals call the real OpenAI API, so load OPENAI_API_KEY etc. from .env when present.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['src/**/*.eval.ts'],
    testTimeout: 120_000,
  },
});
