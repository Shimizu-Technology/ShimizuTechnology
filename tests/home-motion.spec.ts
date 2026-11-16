import { expect, test } from "@playwright/test";
for (const width of [390, 1280]) {
  test(`homepage motion and contact journey at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 800 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto('/');
    const video = page.locator("video");
    await video.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        video.evaluate(
          (el: HTMLVideoElement) => !el.paused && el.currentTime > 0,
        ),
      )
      .toBe(true);
    await expect(video).toHaveAttribute("playsinline", "");
    expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(true);
    await page
      .getByRole("button", { name: "Pause Payroll demo video" })
      .click();
    await expect
      .poll(() => video.evaluate((el: HTMLVideoElement) => el.paused))
      .toBe(true);
    const pausedTime = await video.evaluate((el: HTMLVideoElement) => el.currentTime);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await video.scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("button", { name: "Play Payroll demo video" }),
    ).toBeVisible();
    // Check after observer delivery, not just immediately after scrolling.
    await page.waitForTimeout(600);
    expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
    expect(await video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBe(pausedTime);
    await page.getByRole("button", { name: "Play Payroll demo video" }).click();
    await expect
      .poll(() => video.evaluate((el: HTMLVideoElement) => !el.paused))
      .toBe(true);
    for (const id of ["projects", "services", "process", "about", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await expect(
      page.getByRole("link", { name: /Email us ShimizuTechnology/ }),
    ).toHaveAttribute("href", /^mailto:ShimizuTechnology@gmail.com/);
    await expect(page.getByRole("link", { name: /Call us/ })).toHaveAttribute(
      "href",
      "tel:+16714830219",
    );
    expect(errors).toEqual([]);
  });
}
test(`reduced motion uses poster and preference changes`, async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const mediaRequests: string[] = [];
  page.on("request", (req) => {
    if (/\.(mp4|webm)/.test(req.url())) mediaRequests.push(req.url());
  });
  await page.goto('/');
  await expect(page.locator("video")).toHaveCount(0);
  const poster = page.getByRole("img", {
    name: "Cornerstone Payroll demo with fictional payroll data",
  });
  await poster.scrollIntoViewIfNeeded();
  await expect(poster).toBeVisible();
  expect(mediaRequests).toEqual([]);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("video")).toHaveCount(1);
  const transforms = () => page.evaluate(() =>
    ["[data-tilt]", ".motion-process-line", ".motion-portrait img"].map(
      selector => document.querySelector<HTMLElement>(selector)?.style.transform ?? "",
    ));
  await expect.poll(transforms).not.toContain("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("video")).toHaveCount(0);
  await expect.poll(transforms).toEqual(["", "", ""]);
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect.poll(transforms).toEqual(["", "", ""]);
});

test(`phone About keyboard focus`, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole("button", { name: "Toggle menu" }).click();
  const about = page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About", exact: true });
  await about.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#about h2")).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect.poll(() => page.locator("body").evaluate(el => el.style.overflow)).not.toBe("hidden");
});
