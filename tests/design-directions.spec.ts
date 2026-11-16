import { expect, test } from '@playwright/test';

for (const direction of ['a', 'b', 'c']) {
  for (const width of [390, 1280]) {
    test(`direction ${direction} visual journey ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 800 });
      await page.goto(`/?direction=${direction}`);
      await expect(page.locator('html')).toHaveAttribute('data-direction', direction);
      await expect(page.getByRole('navigation', { name: 'Preview design direction' })).toBeVisible();
      const video = page.locator('video');
      await video.scrollIntoViewIfNeeded();
      await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0)).toBe(true);
      await page.getByRole('button', { name: 'Pause Payroll demo video' }).click();
      // Switching is in-place: preserve scroll context and explicit video pause.
      await page.getByRole('button', { name: 'B: Soft glow', exact: true }).click();
      await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
      await page.getByRole('button', { name: `${direction.toUpperCase()}:`, exact: false }).click();
      await expect(page.locator('html')).toHaveAttribute('data-direction', direction);
      for (const selector of ['.motion-hero', '.motion-logos', '#projects', '.motion-card:nth-child(2)', '.motion-card:nth-child(3)', '#services', '#process', '#contact']) {
        const section = page.locator(selector).first();
        await section.scrollIntoViewIfNeeded();
        await expect(section).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (process.env.CAPTURE_DIRECTIONS === '1') {
          if (!selector.startsWith('.motion-card')) {
            await section.evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 88));
          }
          await page.waitForTimeout(900);
          await page.screenshot({ path: `docs/design/directions/${direction}-${width}-${selector.replace(/[^a-z0-9]/gi, '')}.png` });
        }
      }
      await page.getByRole('link', { name: /Email us ShimizuTechnology/ }).focus();
      await expect(page.getByRole('link', { name: /Email us ShimizuTechnology/ })).toBeFocused();
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(video).toHaveCount(0);
      await expect(page.locator('[data-tilt]')).toHaveCSS('transform', 'none');
    });
  }
}

test('production bundle hides switcher and ignores direction on production and unrelated hosts', async ({ page, baseURL }) => {
  for (const host of ['shimizu-technology.com', 'www.shimizu-technology.com', 'shimizu-technology.netlify.app', 'example.com']) {
    await page.route(`https://${host}/**`, async route => {
      const url = new URL(route.request().url());
      const response = await page.request.get(`${baseURL}${url.pathname}${url.search}`);
      await route.fulfill({ response });
    });
    await page.goto(`https://${host}/?direction=c`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Preview design direction' })).toHaveCount(0);
    await expect(page.locator('html')).toHaveAttribute('data-direction', 'a');
  }
});

test('deploy-preview host allows choices; invalid query defaults to A; Back restores choice', async ({ page, baseURL }) => {
  const host = 'deploy-preview-26--shimizu-technology.netlify.app';
  await page.route(`https://${host}/**`, async route => {
    const url = new URL(route.request().url());
    await route.fulfill({ response: await page.request.get(`${baseURL}${url.pathname}${url.search}`) });
  });
  await page.goto(`https://${host}/?direction=invalid`);
  await expect(page.locator('html')).toHaveAttribute('data-direction', 'a');
  await page.getByRole('button', { name: 'C: Ink & silver' }).click();
  await expect(page).toHaveURL(/direction=c/);
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('data-direction', 'a');
});
