import { defineConfig, devices } from '@playwright/test';

const isDeploymentTest = process.env.DEPLOY_ROUTE_TEST === '1';
const deploymentURL = process.env.DEPLOY_URL;

if (isDeploymentTest && !deploymentURL) {
  throw new Error('DEPLOY_URL is required for deployed route tests.');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'line',
  use: {
    baseURL: isDeploymentTest ? deploymentURL : 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: isDeploymentTest
    ? undefined
    : {
        command: 'npm run preview -- --host 127.0.0.1 --port 4173',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: false,
      },
});
