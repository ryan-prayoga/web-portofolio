import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';
import { focusedCoverageHelperFiles } from './config/focused-coverage';

const globalReportFiles = ['src/**/*.{js,ts}', 'scripts/build-artifact.mjs'];
const focusedThresholds = Object.fromEntries(
  focusedCoverageHelperFiles.map((file) => [file, { statements: 80, branches: 75, functions: 80, lines: 80 }]),
);

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
    conditions: ['browser'],
  },
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: globalReportFiles,
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: 'coverage',
      thresholds: focusedThresholds,
    },
  },
});
