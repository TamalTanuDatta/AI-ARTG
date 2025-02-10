import { defineConfig, devices } from '@playwright/test';
import CustomHTMLReporter from './custom-reporter';

export default defineConfig({
  testDir: './static',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  retries: 2,
  workers: 1,
  reporter: [['./custom-reporter.ts']],
  use: {
    baseURL: 'https://www.leasingmarkt.de',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    viewport: { width: 1280, height: 720 },
    headless: true,
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
        }
      },
    },
  ],
  outputDir: 'test-results',
  preserveOutput: 'always',
});
