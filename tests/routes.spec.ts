import { expect, test } from '@playwright/test';

const hafaRemoteRoutes = [
  {
    path: '/hafa-remote',
    heading: 'Three brands. One remote. Nothing in the way.',
    title: 'Hafa Remote — Simple Wi-Fi TV remote',
    description: 'A straightforward iPhone remote for compatible Samsung, Sony, and Vizio smart TVs. No account, ads, tracking, backend, or subscription.',
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
    const response = await page.goto(route.path);

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
  });
}

test('unknown Hafa Remote paths render the product 404', async ({ page }) => {
  const response = await page.goto('/hafa-remote/missing');

  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'That page is not on this remote.',
  );
  await expect(page).toHaveTitle('Page not found — Hafa Remote');
});

test('non-remote routes preserve the Shimizu Technology site', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Software built for how your business actually works.',
  );
  await expect(page).toHaveTitle(
    'Shimizu Technology | AI Apps, Mobile Development & Custom Software in Guam',
  );
});

test('portfolio has its own route and links back to selected work', async ({ page }) => {
  const response = await page.goto('/work/');

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle('Our Work | Shimizu Technology');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work built for real operations.');
  await expect(page.getByRole('link', { name: 'Start with selected client stories' })).toHaveAttribute('href', '/#projects');
  await expect(page.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('href', '#projects');
  await expect(page.getByRole('link', { name: 'Contact', exact: true }).first()).toHaveAttribute('href', '#contact');
});

test('portfolio deep link lands on its archive section', async ({ page }) => {
  await page.goto('/work/#projects');
  await expect.poll(async () => page.locator('#projects').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(120);
  await expect.poll(async () => page.locator('#projects').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('contact deep link lands on the form after the home page loads', async ({ page }) => {
  await page.goto('/#contact');

  await expect(page.getByRole('heading', { name: 'Tell us about your project' })).toBeVisible();
  await expect.poll(async () => page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(120);
  await expect.poll(async () => page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('malformed fragments leave the homepage available', async ({ page }) => {
  await page.goto('/#%');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software built for how your business actually works.');
});

test('project inquiry sends the registered form payload and confirms success', async ({ page }) => {
  let payload = '';
  await page.route('**/__forms.html', async (route) => {
    payload = route.request().postData() ?? '';
    await route.fulfill({ status: 200, body: 'accepted' });
  });
  await page.goto('/#contact');
  await page.getByRole('textbox', { name: 'Your name' }).fill('QA Tester');
  await page.getByRole('textbox', { name: 'Email' }).fill('qa@example.com');
  await page.getByRole('textbox', { name: 'What are you trying to improve?' }).fill('Testing the inquiry flow');
  await page.getByRole('button', { name: 'Send project inquiry' }).click();

  await expect(page.getByRole('status')).toContainText('Your message was sent.');
  expect(new URLSearchParams(payload).get('form-name')).toBe('project-inquiry');
  expect(new URLSearchParams(payload).get('email')).toBe('qa@example.com');
  expect(new URLSearchParams(payload).get('project')).toBe('Testing the inquiry flow');
});

test('mobile menu closes on Escape and restores focus to its trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const trigger = page.getByRole('button', { name: 'Toggle menu' });
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await trigger.click();
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('a failed company-site chunk offers recovery instead of a blank page', async ({ page }) => {
  await page.route('**/assets/HomeSite-*.js', (route) => route.abort());
  const response = await page.goto('/');

  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'We couldn’t load the site.',
  );
  await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return Home' })).toHaveAttribute('href', '/');
});
