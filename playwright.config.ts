import { defineConfig, devices } from '@playwright/test';

const isDeploymentTest = process.env.DEPLOY_ROUTE_TEST === '1';
const deploymentURL = process.env.DEPLOY_URL;
const localPort = Number(process.env.ROUTE_TEST_PORT || 4173);
const externalServer = process.env.ROUTE_TEST_EXTERNAL_SERVER === '1';

if (!Number.isInteger(localPort) || localPort < 1024 || localPort > 65535) {
  throw new Error('ROUTE_TEST_PORT must be an integer between 1024 and 65535.');
}

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
    baseURL: isDeploymentTest ? deploymentURL : `http://127.0.0.1:${localPort}`,
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
  webServer: isDeploymentTest || externalServer
    ? undefined
    : {
        command: `npm run preview -- --host 127.0.0.1 --port ${localPort} --strictPort`,
        url: `http://127.0.0.1:${localPort}`,
        reuseExistingServer: false,
      },
});
