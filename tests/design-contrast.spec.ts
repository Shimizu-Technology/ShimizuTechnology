import { expect, test } from '@playwright/test';
function luminance(hex: string) {
  const c = hex.match(/[a-f\d]{2}/gi)!.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
}
function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}
test('navy rhythm AA palette contrast', () => {
  const pairs = [['#ffffff', '#285b65'], ['#b8dfe5', '#10151f'], ['#b8c4d4', '#10151f'], ['#a9b3c4', '#10151f'], ['#8d9095', '#10151f'], ['#f8fafc', '#10151f'], ...['#f8fafc', '#edf2f6', '#eef3f6', '#ffffff'].map(s => ['#285b65', s])];
  for (const [fg, bg] of pairs) expect(contrast(fg, bg), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
});
for (const width of [390, 1280]) {
  test(`statement stays readable through scroll and reduced motion at ${width}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 800 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const statement = page.locator('.motion-statement');
    await expect(statement).toHaveCSS('background-color', 'rgb(16, 21, 31)');
    const words = page.locator('[data-fill-word]');
    for (const [name, progress] of [['start', .08], ['middle', .5], ['end', 1]] as const) {
      await statement.evaluate((el, p) => {
        const r = el.getBoundingClientRect();
        scrollTo(0, scrollY + r.top - innerHeight * .85 + p * (r.height + innerHeight * .25));
      }, progress);
      await expect.poll(async () => Math.abs(await words.evaluateAll(els => els.filter(el => getComputedStyle(el).color === 'rgb(248, 250, 252)').length) - Math.ceil(28 * progress))).toBeLessThanOrEqual(1);
      const colors = await words.evaluateAll(els => els.map(el => getComputedStyle(el).color));
      expect(colors.every(c => ['rgb(141, 144, 149)', 'rgb(248, 250, 252)'].includes(c))).toBe(true);
      const clip = await statement.evaluate(el => { const r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }; });
      await page.screenshot({ path: testInfo.outputPath(`statement-${width}-${name}.png`), fullPage: true, clip });
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await statement.scrollIntoViewIfNeeded();
    await expect(words.first()).toHaveCSS('color', 'rgb(248, 250, 252)');
    await expect(words.last()).toHaveCSS('color', 'rgb(248, 250, 252)');
    await expect(page.locator('html')).not.toHaveAttribute('data-direction');
    await expect(page.getByRole('navigation', { name: 'Preview design direction' })).toHaveCount(0);
  });
}
