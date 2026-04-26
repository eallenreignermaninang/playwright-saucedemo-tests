// @ts-check
const { defineConfig, devices } = require('playwright/test');

module.exports = defineConfig({
  // Where our test files live
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build if you accidentally left test.only in the code
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI
  retries: process.env.CI ? 1 : 0,

  // Reporter - shows results in the terminal + generate HTML report
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
      // Base URL of the app we're testing
      baseURL: 'https://www.saucedemo.com',

      // Take a screenshot when a test fails
      screenshot: 'only-on-failure',

      // Record trace on first retry - helps debug failures
      trace: 'on-first-retry',
    },

    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari']},
      },
    ],
});