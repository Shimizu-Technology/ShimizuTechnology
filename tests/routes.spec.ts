import { expect, test } from '@playwright/test';

const hafaRemoteRoutes = [
  {
    path: '/hafa-remote',
    heading: 'Your Samsung TV. Within reach.',
    title: 'Hafa Remote — Samsung TV remote',
    description: 'A local iPhone remote for compatible Samsung TVs. No account, ads, tracking, backend, or subscription. App Store release in preparation.',
    canonical: 'https://shimizu-technology.com/hafa-remote',
  },
  {
    path: '/hafa-remote/support',
    heading: 'Get connected and back to watching.',
    title: 'Hafa Remote Support',
    description: 'Samsung setup, connection recovery, offline demo, optional diagnostics, and support for Hafa Remote.',
    canonical: 'https://shimizu-technology.com/hafa-remote/support',
  },
  {
    path: '/hafa-remote/privacy',
    heading: 'Local control. Sharing is your choice.',
    title: 'Hafa Remote Privacy Policy',
    description: 'Local TV data, default-off in-memory diagnostics, optional report sharing, and support reception in Hafa Remote.',
    canonical: 'https://shimizu-technology.com/hafa-remote/privacy',
  },
];

for (const route of hafaRemoteRoutes) {
  test(`${route.path} renders its page and metadata`, async ({ page }) => {
    const response = await page.goto(route.path);

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
    if (route.path === '/hafa-remote') {
      await expect(page.getByText('Samsung App Store release in preparation', { exact: true })).toBeVisible();
      await expect(page.getByText('Hafa Remote is currently in private testing. It is not available on the App Store yet.')).toBeVisible();
    }
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
    'Technology built for how your business actually works.',
  );
  await expect(page).toHaveTitle(
    'Shimizu Technology | Websites, Software & Automation in Guam',
  );
});

test('portfolio has its own route and links back to selected work', async ({ page }) => {
  const response = await page.goto('/work/');

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle('Our Work | Shimizu Technology');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work built for real operations.');
  await expect(page.getByRole('link', { name: 'Start with selected client stories' })).toHaveAttribute('href', '/#projects');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('href', '#projects');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Contact', exact: true }).first()).toHaveAttribute('href', '#contact');
});

test('portfolio deep link lands on its archive section', async ({ page }) => {
  await page.goto('/work/#projects');
  await expect.poll(async () => page.locator('#projects').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(120);
  await expect.poll(async () => page.locator('#projects').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('contact deep link lands on the inquiry panel after the home page loads', async ({ page }) => {
  await page.goto('/#contact');

  await expect(page.getByRole('heading', { name: 'Start with a short note.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email to start a conversation' })).toHaveAttribute('href', 'mailto:ShimizuTechnology@gmail.com?subject=Business%20conversation');
  await expect.poll(async () => page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(120);
  await expect.poll(async () => page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('malformed fragments leave the homepage available', async ({ page }) => {
  await page.goto('/#%');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Technology built for how your business actually works.');
});

test('mobile menu closes on Escape and restores focus to its trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const trigger = page.getByRole('button', { name: 'Toggle menu' });
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await trigger.click();
  await expect(menu).toBeVisible();
  const backdrop = page.getByRole('button', { name: 'Close menu' });
  await expect(backdrop).toBeVisible();
  expect((await backdrop.boundingBox())?.height).toBe(844);
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

test('resizing an open phone menu restores scrolling and visible keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const overflowBefore = await page.locator('body').evaluate((element) => element.style.overflow);
  await page.getByRole('button', { name: 'Toggle menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await expect.poll(() => page.locator('body').evaluate((element) => element.style.overflow)).toBe('hidden');
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  await expect.poll(() => page.locator('body').evaluate((element) => element.style.overflow)).toBe(overflowBefore);
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true })).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('phone navigation reaches the inquiry and restores scroll without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Start a conversation' }).click();
  await expect(page.getByRole('heading', { name: 'Where could technology make things easier?' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  await expect.poll(() => page.locator('body').evaluate((element) => element.style.overflow)).not.toBe('hidden');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await expect(page.getByRole('link', { name: 'Email to start a conversation' })).toHaveAttribute('href', 'mailto:ShimizuTechnology@gmail.com?subject=Business%20conversation');
});

test('primary action is visible in the desktop opening and has readable hover contrast', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  const action = page.getByRole('link', { name: 'Start a conversation', exact: true });
  await expect(action).toBeInViewport();
  const contrast = () => action.evaluate((element) => {
    const style = getComputedStyle(element);
    const luminance = (color: string) => {
      const components = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) || [];
      const linear = components.map((value) => { const channel = value / 255; return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4; });
      return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
    };
    const foreground = luminance(style.color);
    const background = luminance(style.backgroundColor);
    return (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
  });
  expect(await contrast()).toBeGreaterThanOrEqual(4.5);
  await action.hover();
  await expect(action).toHaveCSS('background-color', 'rgb(25, 68, 180)');
  await expect.poll(contrast).toBeGreaterThanOrEqual(4.5);
});

test('case-study details remain keyboard accessible with the held facts', async ({ page }) => {
  await page.goto('/');
  const story = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Cornerstone Payroll', exact: true }) });
  await story.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(story.getByText('A production system used by Cornerstone Accounting.', { exact: true })).toBeVisible();
});

test('failed font and hero image requests preserve the inquiry path under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/fonts/*.woff2', (route) => route.abort());
  await page.route('**/assets/hafaloha-orders-*.webp', (route) => route.abort());
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Technology built for how your business actually works.');
  await page.getByRole('link', { name: 'Start a conversation', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Email to start a conversation' })).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('Samsung product pages preserve local diagnostics and voluntary support boundaries', async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on('request', request => {
    if (/posthog|googletagmanager|google-analytics/i.test(request.url())) analyticsRequests.push(request.url());
  });
  await page.goto('/hafa-remote/support');
  await expect(page.getByRole('heading', { name: 'Set up your Samsung TV' })).toBeVisible();
  await expect(page.getByRole('main')).not.toContainText(/Sony|Vizio/);
  await expect(page.getByText(/TV can use Wi-Fi or Ethernet on the same non-guest/)).toBeVisible();
  await expect(page.getByText(/It resets to off when the app restarts/)).toBeVisible();
  await expect(page.getByText(/An existing preview stays unchanged/)).toBeVisible();
  await page.getByRole('link', { name: 'support privacy explanation' }).click();
  await expect(page).toHaveURL(/\/hafa-remote\/privacy#support$/);
  await expect(page.getByRole('heading', { name: 'Information you send to support' })).toBeInViewport();
  await expect(page.getByText(/we receive the message\/report and the sender information/)).toBeVisible();
  await expect(page.getByText(/It does not change an already-open preview/)).toBeVisible();
  await expect(page.getByText(/Uninstalling is not a guarantee/)).toBeVisible();
  await expect(page.getByRole('main')).not.toContainText(/Data we collect|Shimizu Technology does not collect data|Sony|Vizio/);
  expect(analyticsRequests).toEqual([]);
});

for (const width of [320, 390, 1280]) {
  test('Hafa routes stay readable and operable at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    for (const route of hafaRemoteRoutes) {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const nav = page.getByRole('navigation', { name: 'Hafa Remote', exact: true });
      for (const name of ['Support', 'Privacy']) {
        const link = nav.getByRole('link', { name, exact: true });
        const box = await link.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
        expect(box?.width).toBeGreaterThanOrEqual(44);
      }
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('main')).toBeFocused();
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', route.title);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', route.canonical);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
    }
  });
}
