import { defineConfig, devices } from '@playwright/test';
import CustomHTMLReporter from './custom-reporter';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['./custom-reporter.ts']],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 20000,
    trace: 'on',
    screenshot: 'on',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--no-sandbox']
        }
      },
    },
  ]
});
