import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const isDeploymentTest = process.env.DEPLOY_ROUTE_TEST === '1';

// Never send real analytics from tests.
test.beforeEach(async ({ context }) => {
  await context.route((url) => url.hostname.endsWith('posthog.com'), (route) => route.abort());
});

const contrastOf = (page: Page, selector: string) => page.locator(selector).first().evaluate((element) => {
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
      await expect(page.getByText('App Store release for Samsung TVs in preparation', { exact: true })).toBeVisible();
      await expect(page.getByText('Hafa Remote is currently in private testing. It is not available on the App Store yet.')).toBeVisible();
    }
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', route.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
  });
}

test('unknown Hafa Remote paths render the product 404', async ({ page }) => {
  const response = await page.goto('/hafa-remote/missing');

  // Netlify serves the product page with a real 404; the local preview server cannot set that status.
  expect(response?.status()).toBe(isDeploymentTest ? 404 : 200);
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
  await expect(page.getByRole('link', { name: 'Read the selected case studies' })).toHaveAttribute('href', '/#projects');
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

test('the company site renders from the first bundle without waiting for analytics', async ({ page }) => {
  const scripts: string[] = [];
  page.on('request', (request) => { if (request.resourceType() === 'script') scripts.push(new URL(request.url()).pathname); });
  const response = await page.goto('/');

  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Technology built for how your business actually works.');
  // One application script: no lazy page chunk and no analytics SDK on the critical path.
  expect(scripts.filter((path) => path.startsWith('/assets/'))).toHaveLength(1);
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveAttribute('fetchpriority', 'high');
  await expect(page.locator('.product-window img')).toHaveAttribute('fetchpriority', 'high');
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

test('in-page navigation jumps instead of smooth-scrolling the whole page', async ({ page }) => {
  await page.goto('/');
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
  await expect(page.getByRole('heading', { name: 'Information you send to support' })).toBeFocused();
  await expect(page.getByText(/we receive the message\/report and the sender information/)).toBeVisible();
  await expect(page.getByText(/name, email address, support-message content/)).toBeVisible();
  await expect(page.getByText(/app-interaction, performance, or other diagnostic information/)).toBeVisible();
  await expect(page.getByText(/90 days after the support issue is resolved/)).toBeVisible();
  await expect(page.getByText(/then delete those copies/)).toBeVisible();
  await expect(page.getByText(/does not promise immediate erasure/)).toBeVisible();
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
      await expect(page.getByRole('main')).toHaveCSS('outline-style', 'solid');
      await expect(page.getByRole('main')).toHaveCSS('outline-width', '3px');
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', route.title);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', route.canonical);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
    }
  });
}


test('support-topic fragments place keyboard focus at the requested heading', async ({ page }) => {
  for (const [fragment, name] of [
    ['setup', 'Set up your Samsung TV'],
    ['recovery', 'If the TV does not connect'],
    ['diagnostics', 'Optional diagnostics'],
    ['contact', 'Contact support'],
  ]) {
    await page.goto('/hafa-remote/support#' + fragment);
    const heading = page.getByRole('heading', { name, exact: true });
    await expect(heading).toBeInViewport();
    await expect(heading).toBeFocused();
  }
});

test('Hafa pages reflow at a 195px CSS viewport for increased page zoom', async ({ page }) => {
  await page.setViewportSize({ width: 195, height: 844 });
  for (const route of hafaRemoteRoutes) {
    await page.goto(route.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(195);
  }
});

test('phone menu rows and toggle meet touch target sizes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle menu' });
  const toggleBox = await toggle.boundingBox();
  expect(toggleBox?.width).toBeGreaterThanOrEqual(44);
  expect(toggleBox?.height).toBeGreaterThanOrEqual(44);
  await toggle.click();
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  for (const item of await menu.locator('a, button').all()) {
    expect((await item.boundingBox())?.height).toBeGreaterThanOrEqual(48);
  }
});

test('small links and disclosures keep 44px touch targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const targets = [
    page.locator('#projects summary').first(),
    page.getByRole('contentinfo').getByRole('link', { name: 'Services', exact: true }),
    page.getByRole('contentinfo').getByRole('link', { name: 'Portfolio', exact: true }),
    page.getByRole('link', { name: 'View registration platform' }),
    page.getByRole('link', { name: 'Plan a dependable launch' }),
    page.getByRole('link', { name: /Visit Code School of Guam/ }),
  ];
  for (const target of targets) expect((await target.boundingBox())?.height).toBeGreaterThanOrEqual(44);

  await page.goto('/work/');
  const appStore = page.getByRole('link', { name: /App Store for TraceBuddy/ });
  await expect(appStore).toHaveAttribute('href', 'https://apps.apple.com/us/app/tracebuddy-gu/id6779658138');
  expect((await appStore.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  // A tool's whole cell is its link target.
  const cell = page.locator('.tool-cell').filter({ hasText: 'Media Tools' });
  await cell.scrollIntoViewIfNeeded();
  const cellBox = await cell.boundingBox();
  const hit = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest('a')?.getAttribute('href'), { x: (cellBox?.x ?? 0) + (cellBox?.width ?? 0) / 2, y: (cellBox?.y ?? 0) + (cellBox?.height ?? 0) - 12 });
  expect(hit).toBe('https://media.shimizu-technology.com');
});

for (const width of [320, 390, 1280]) {
  test('company pages have no horizontal overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/work/']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  });
}

test('outcome values wrap instead of overlapping at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  const values = page.locator('text=VIP orders processed').locator('xpath=../..').locator(':scope > div');
  await values.first().evaluate((element) => {
    const first = element.querySelector('div');
    if (first) first.textContent = '$128,450';
  });
  const boxes = await values.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect()).map(({ left, right, top }) => ({ left, right, top })));
  for (let index = 1; index < boxes.length; index += 1) {
    const previous = boxes[index - 1];
    const current = boxes[index];
    expect(current.top > previous.top || current.left >= previous.right - 0.5).toBeTruthy();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

for (const [width, expected] of [[390, 'focus'], [800, 'wide'], [1280, 'focus']] as const) {
  test('case-study screenshots load with dimensions at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const images = page.locator('#projects img.case-screenshot');
    await expect(images).toHaveCount(3);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await image.getAttribute('alt')).toMatch(/.{30,}/);
      expect(await image.getAttribute('width')).toBeTruthy();
      expect(await image.getAttribute('height')).toBeTruthy();
      expect(await image.evaluate((element: HTMLImageElement) => element.currentSrc)).toContain(`-${expected}-`);
    }
  });
}

test('portfolio statuses, links, and counts reflect the current inventory', async ({ page }) => {
  await page.goto('/work/');
  const cards = page.locator('article.portfolio-card');
  const total = await cards.count();
  await expect(page.locator('main')).toContainText(`${total} products, pilots, and systems`);
  const card = (title: string) => cards.filter({ has: page.getByRole('heading', { name: new RegExp(`^${title}( \\(opens in a new tab\\))?$`) }) });
  await expect(card('Hafaloha Orders')).toContainText('Seasonal');
  await expect(card('Hafa Homes')).toContainText('Paused');
  await expect(card('Hafa Homes').getByRole('link')).toHaveCount(0);
  await expect(card('Guahan Grocer').getByRole('link')).toHaveCount(0);
  await expect(card('Hafa Workouts')).toContainText('In development');
  await expect(card('Hafa Workouts').getByRole('link')).toHaveCount(0);
  await expect(card('Flex and Care')).toContainText('Prototype');
  await expect(card('Flex and Care').getByRole('link').first()).toHaveAttribute('href', 'https://care.shimizu-technology.com');
  await expect(card('HafaPass').getByRole('link')).toHaveCount(0);
  await expect(card('Cornerstone Payroll').getByRole('link').first()).toHaveAttribute('href', 'https://payroll.shimizu-technology.com');
  await expect(card('Hafa Recipes').getByRole('link', { name: /App Store/ })).toHaveAttribute('href', 'https://apps.apple.com/us/app/h%C3%A5fa-recipes/id6755892896');
  await expect(page.locator('main')).not.toContainText(/Invoice Maker|Typr|Coming Soon/);
  await expect(page.locator('.tool-cell').filter({ hasText: 'Hafa Remote' })).toContainText('Sony and Vizio support is in development');

  await page.goto('/');
  await expect(page.locator('.hero-proof')).toContainText(`${total}Products & platforms built`);
  await expect(page.locator('.hero-proof')).toContainText('4App Store launches');
  await expect(page.getByRole('link', { name: `Explore all ${total} projects` })).toBeVisible();
});

test('status badges stay on one line and meet text contrast', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/work/');
  const badge = page.locator('article.portfolio-card span.font-mono-label', { hasText: 'Private deployment' }).first();
  await expect(badge).toHaveCSS('white-space', 'nowrap');
  expect((await badge.boundingBox())?.height).toBeLessThan(30);
  expect(await contrastOf(page, 'article.portfolio-card span.bg-emerald-700')).toBeGreaterThanOrEqual(4.5);
});

test('linked portfolio cards animate transform and border only, gated to fine pointers', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/work/');
  const card = page.locator('article.portfolio-card.is-linked').first();
  const transition = await card.evaluate((element) => getComputedStyle(element).transitionProperty);
  expect(transition).toContain('transform');
  expect(transition).not.toContain('box-shadow');
  await card.hover();
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');
});

test('contact band focus ring is visible on blue and white', async ({ page }) => {
  await page.goto('/#contact');
  await page.keyboard.press('Tab');
  const link = page.getByRole('link', { name: /Visit Code School of Guam/ });
  await link.focus();
  await expect(link).toHaveCSS('outline-color', 'rgb(255, 255, 255)');
  await expect(link).toHaveCSS('box-shadow', /rgb\(7, 16, 31\)/);
});

test('theme colors match each page header', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#ffffff');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/hafa-remote');
  await expect(page.locator('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')).toHaveAttribute('content', '#1c292b');
});

test('unknown company paths get the branded 404 page', async ({ page }) => {
  if (isDeploymentTest) {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
  } else {
    // vite preview cannot apply Netlify rules, so check the rules and the page separately.
    const rules = readFileSync('dist/_redirects', 'utf8').split('\n').map((line) => line.trim().split(/\s+/)).filter((parts) => parts[0] && !parts[0].startsWith('#'));
    expect(rules.at(-1)).toEqual(['/*', '/404.html', '404']);
    for (const path of ['/', '/hafa-remote', '/hafa-remote/support', '/hafa-remote/privacy']) {
      expect(rules.find((parts) => parts[0] === path)?.[2]).toBe('200');
    }
    await page.goto('/404.html');
  }
  await expect(page).toHaveTitle('Page not found | Shimizu Technology');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('We couldn’t find that page.');
  await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: 'Browse our work' })).toHaveAttribute('href', '/work/');
});

test('buttons give press feedback with transform and color only', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const action = page.getByRole('link', { name: 'Start a conversation', exact: true });
  const transition = await action.evaluate((element) => getComputedStyle(element).transitionProperty);
  expect(transition).toBe('background-color, border-color, transform');
  const box = await action.boundingBox();
  await page.mouse.move((box?.x ?? 0) + 10, (box?.y ?? 0) + 10);
  await page.mouse.down();
  await expect.poll(() => action.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(22, 58, 153)');
  await page.mouse.up();
});
