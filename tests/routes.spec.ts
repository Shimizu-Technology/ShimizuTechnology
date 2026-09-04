import { expect, test } from '@playwright/test';

const hafaRemoteRoutes = [
  {
    path: '/hafa-remote',
    heading: 'Your Samsung TV remote. Nothing in the way.',
    title: 'Hafa Remote — Simple Samsung TV control',
    description: 'A straightforward iPhone remote for compatible Samsung smart TVs. No account, ads, tracking, backend, or subscription.',
    canonical: 'https://shimizu-technology.com/hafa-remote',
  },
  {
    path: '/hafa-remote/support',
    heading: 'Get connected and back to watching.',
    title: 'Hafa Remote Support',
    description: 'Setup, troubleshooting, compatibility, and contact information for Hafa Remote.',
    canonical: 'https://shimizu-technology.com/hafa-remote/support',
  },
  {
    path: '/hafa-remote/privacy',
    heading: 'Your remote stays in your home.',
    title: 'Hafa Remote Privacy Policy',
    description: 'How Hafa Remote handles TV information, pairing credentials, typed text, and local-network access.',
    canonical: 'https://shimizu-technology.com/hafa-remote/privacy',
  },
];

for (const route of hafaRemoteRoutes) {
  test(`${route.path} renders its page and metadata`, async ({ page }) => {
    await page.goto(route.path);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
  });
}

test('non-remote routes preserve the Shimizu Technology site', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Software built for how your business actually works.',
  );
  await expect(page).toHaveTitle(
    'Shimizu Technology | AI Apps, Mobile Development & Custom Software in Guam',
  );
});
