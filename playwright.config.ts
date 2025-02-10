import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 120000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  retries: 3,
  workers: 1,
  reporter: [['./custom-reporter.ts']],
  use: {
    baseURL: 'https://www.leasingmarkt.de',
    actionTimeout: 20000,
    navigationTimeout: 45000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
  ]
});
