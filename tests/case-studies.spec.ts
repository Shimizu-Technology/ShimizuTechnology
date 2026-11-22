import { expect, test } from '@playwright/test';

// Never send real analytics from tests.
test.beforeEach(async ({ context }) => {
  await context.route((url) => url.hostname.endsWith('posthog.com'), (route) => route.abort());
});

const caseStudyRoutes = [
  {
    slug: 'cornerstone-payroll',
    path: '/work/cornerstone-payroll/',
    title: 'Cornerstone Payroll Case Study | Guam Payroll Software | Shimizu Technology',
    canonical: 'https://shimizu-technology.com/work/cornerstone-payroll/',
    ogImage: 'https://shimizu-technology.com/images/case-studies/og-cornerstone-payroll.png',
    h1: 'Making Guam payroll repeatable for the staff who run it.',
  },
  {
    slug: 'hafaloha-orders',
    path: '/work/hafaloha-orders/',
    title: 'Hafaloha Orders Case Study | Event Ordering & Fulfillment | Shimizu Technology',
    canonical: 'https://shimizu-technology.com/work/hafaloha-orders/',
    ogImage: 'https://shimizu-technology.com/images/case-studies/og-hafaloha-orders.png',
    h1: '850+ concert VIP orders fulfilled with zero event-day downtime.',
  },
  {
    slug: 'marianas-open',
    path: '/work/marianas-open/',
    title: 'Marianas Open Case Study | Multilingual Tournament Platform | Shimizu Technology',
    canonical: 'https://shimizu-technology.com/work/marianas-open/',
    ogImage: 'https://shimizu-technology.com/images/case-studies/og-marianas-open.png',
    h1: 'One multilingual platform for an international tournament series.',
  },
] as const;

for (const route of caseStudyRoutes) {
  test(`${route.path} renders case study structure, metadata, JSON-LD, images, and contact CTA`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(route.path);
    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveTitle(route.title);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.h1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', route.canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', route.ogImage);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', route.ogImage);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);

    // JSON-LD structured data is valid JSON and matches the canonical route.
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd!);
    expect(parsed['@graph'][0].url).toBe(route.canonical);

    // Challenge -> What we built -> Result + Who this is for + CTA to /#contact
    await expect(page.getByText('01 · The challenge')).toBeVisible();
    await expect(page.getByText('02 · What we built')).toBeVisible();
    await expect(page.getByText('03 · The result')).toBeVisible();
    await expect(page.getByText('Who this is for')).toBeVisible();

    const contactCtas = page.locator('a[href="/#contact"]');
    expect(await contactCtas.count()).toBeGreaterThanOrEqual(2);
    await expect(contactCtas.first()).toBeVisible();

    // Every visible image loads cleanly with explicit dimensions and meaningful alt text.
    const images = page.locator('main img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
        .toBe(true);
      expect(await img.getAttribute('alt')).toMatch(/.{20,}/);
      expect(await img.getAttribute('width')).toBeTruthy();
      expect(await img.getAttribute('height')).toBeTruthy();
    }

    if (route.slug === 'cornerstone-payroll') {
      await expect(page.getByText('Demo data · all names fictional').first()).toBeVisible();
    }
    if (route.slug === 'hafaloha-orders') {
      await expect(page.locator('main')).toContainText('Guam brand Hafaloha');
      await expect(page.locator('main')).not.toContainText('Hawaiian businesses');
      await expect(page.locator('blockquote')).toContainText('valuable perk and adds to the VIP experience');
    }

    expect(errors).toEqual([]);
  });

  for (const width of [320, 375, 390, 430]) {
    test(`${route.path} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route.path);
      await page.evaluate(() => document.fonts.ready);

      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `horizontal overflow at top of ${route.path} (${width}px)`,
      ).toBe(true);

      for (const section of await page.locator('main section').all()) {
        await section.scrollIntoViewIfNeeded();
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          `horizontal overflow inside section of ${route.path} (${width}px)`,
        ).toBe(true);
      }
    });
  }
}

test('Cornerstone Payroll workflow diagram is click- and keyboard-operable with ARIA state', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/work/cornerstone-payroll/');

  const explorer = page.locator('#workflow-explorer');
  await explorer.scrollIntoViewIfNeeded();
  await expect(explorer.getByText('Illustrative workflow', { exact: true }).first()).toBeVisible();

  const tabs = explorer.getByRole('tab');
  await expect(tabs).toHaveCount(4);
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('tabpanel')).toContainText('Field and office staff record shifts');

  // Keyboard navigation: ArrowRight -> Step 2, End -> Step 4, ArrowLeft -> Step 3, Home -> Step 1
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('tabpanel')).toContainText('Supervisors resolve exceptions and lock the cutoff');

  await page.keyboard.press('End');
  await expect(tabs.nth(3)).toBeFocused();
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('tabpanel')).toContainText('Payment documents prepared with traceable history');
  await expect(explorer.getByRole('button', { name: 'Next step' })).toBeDisabled();

  await page.keyboard.press('ArrowLeft');
  await expect(tabs.nth(2)).toBeFocused();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('tabpanel')).toContainText('Accounting staff run calculations and review totals');

  await page.keyboard.press('Home');
  await expect(tabs.nth(0)).toBeFocused();
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('button', { name: 'Previous step' })).toBeDisabled();

  // Click control button to advance
  await explorer.getByRole('button', { name: 'Next step' }).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

  // Keyboard users keep focus on the step buttons as the step changes.
  const next = explorer.getByRole('button', { name: 'Next step' });
  const previous = explorer.getByRole('button', { name: 'Previous step' });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(next).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
  await expect(next).toBeDisabled();
  await expect(previous).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(previous).toBeFocused();
});

test('Cornerstone Payroll page respects reduced motion for hero media and workflow diagram', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const mediaRequests: string[] = [];
  page.on('request', (req) => {
    if (/\.(mp4|webm)$/.test(req.url())) mediaRequests.push(req.url());
  });

  await page.goto('/work/cornerstone-payroll/');
  await expect(page.locator('video')).toHaveCount(0);
  expect(mediaRequests).toEqual([]);

  const explorer = page.locator('#workflow-explorer');
  await explorer.scrollIntoViewIfNeeded();
  await explorer.getByRole('tab', { name: /Payroll calculates/ }).click();
  await expect(explorer.getByRole('tabpanel')).toContainText('Accounting staff run calculations and review totals');
  const railTransition = await explorer
    .locator('.cs-workflow-rail-fill')
    .evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(railTransition === '0s' || railTransition === '0.00001s').toBeTruthy();
});

test('Cornerstone Payroll static fallback remains readable with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  const response = await page.goto('/work/cornerstone-payroll/');
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Making Guam payroll repeatable for the staff who run it.',
  );
  await expect(page.locator('#workflow-explorer')).toContainText('Illustrative workflow');
  await expect(page.locator('#workflow-explorer')).toContainText('Staff clock in');
  await expect(page.locator('#workflow-explorer')).toContainText('Manager approves exceptions');
  await expect(page.locator('#workflow-explorer')).toContainText('Payroll calculates & commits');
  await expect(page.locator('#workflow-explorer')).toContainText('Checks & records archived');
  await expect(page.locator('a[href="/#contact"]').first()).toBeVisible();

  await context.close();
});

test('Case study mobile menu keeps 44px touch targets and restores scroll on Escape and desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/work/hafaloha-orders/');

  const brand = page.getByRole('link', { name: 'Shimizu Technology home' }).first();
  expect((await brand.boundingBox())?.height).toBeGreaterThanOrEqual(44);

  const toggle = page.getByRole('button', { name: 'Toggle menu' });
  expect((await toggle.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  expect((await toggle.boundingBox())?.width).toBeGreaterThanOrEqual(44);

  await toggle.click();
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();

  await toggle.click();
  await expect(menu).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(menu).toBeHidden();
  await expect.poll(() => page.locator('body').evaluate((el) => el.style.overflow)).not.toBe('hidden');
});
