import { defineConfig, devices } from '@playwright/test';
import CustomHTMLReporter from './custom-reporter';

export default defineConfig({
  testDir: './static',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: [['./custom-reporter.ts']],
  use: {
    baseURL: 'file://',
    actionTimeout: 5000,
    navigationTimeout: 10000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'test-results',
  preserveOutput: 'failures-only',
  maxFailures: 5,
});
