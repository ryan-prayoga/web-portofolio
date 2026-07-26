import { defineConfig, devices } from '@playwright/test';

const port = 4188;
const isolatedBuild = process.env.TASK8_BUILD_PATH;

if (!isolatedBuild) {
  throw new Error('TASK8_BUILD_PATH must point to an isolated adapter-node build entry');
}

export default defineConfig({
  testDir: '.',
  testMatch: 'mobile-menu.spec.ts',
  outputDir: '../../../.omo/evidence/task-8-review-fix-browser/final',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: `HOST=127.0.0.1 PORT=${port} node "${isolatedBuild}"`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
