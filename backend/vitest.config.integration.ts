import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.integration.test.ts'],
    setupFiles: ['./src/modules/tasks/task.repository.setup.ts'],
  },
});