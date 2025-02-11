import { defineConfig, devices } from '@playwright/test';
import CustomHTMLReporter from './custom-reporter';

// Check if running in GitHub Actions nightly build
const isNightlyBuild = process.env.GITHUB_WORKFLOW === 'Playwright Tests Nightly';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 15000 },
  fullyParallel: true,
  workers: 4,
  retries: 2,
  reporter: isNightlyBuild ? 
    [['./custom-reporter.ts', {}]] :  // Only custom reporter for nightly builds
    [
      ['list'],  // Built-in list reporter for console output
      ['html'],  // Built-in HTML reporter
      ['./custom-reporter.ts', {}]  // Our custom reporter
    ],
  use: {
    actionTimeout: 30000,
    navigationTimeout: 40000,
    trace: 'on-first-retry',  // Capture traces only on first retry
    screenshot: 'only-on-failure',  // Take screenshots only on test failures
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    bypassCSP: true
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      },
    },
  ]
});
