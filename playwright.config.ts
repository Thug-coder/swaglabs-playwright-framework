
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

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
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com/',
  },
  

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});