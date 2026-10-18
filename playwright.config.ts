
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  
reporter: process.env.CI
  ? [
      ['list'],
      ['html', { open: 'never' }],
      ['json', { outputFile: 'test-results/results.json' }],
      ['github'],
    ]
  : [
      ['list'],
      ['html', { open: 'never' }],
    ],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
