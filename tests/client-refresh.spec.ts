import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const isDeploymentTest = process.env.DEPLOY_ROUTE_TEST === '1';

test.beforeEach(async ({ context }) => {
  await context.route((url) => url.hostname.endsWith('posthog.com'), (route) => route.abort());
});

test('inline Netlify contact form validates, submits via mocked POST, and handles errors accessibly', async ({ page }) => {
  const requests: { url: string; body: string | null }[] = [];
  let shouldFail = false;

  await page.route('**/__forms.html', async (route) => {
    requests.push({ url: route.request().url(), body: route.request().postData() });
    if (shouldFail) {
      await route.fulfill({ status: 500, contentType: 'text/plain', body: 'Server error' });
      return;
    }
    await route.fulfill({ status: 200, contentType: 'text/html', body: 'ok' });
  });

  await page.goto('/');

  // Static form detection file is shipped in dist for Netlify build-time parsing.
  if (!isDeploymentTest) {
    const formsHtml = readFileSync('dist/__forms.html', 'utf8');
    expect(formsHtml).toContain('name="business-inquiry"');
    expect(formsHtml).toContain('netlify-honeypot="bot-field"');
  }

  // Clicking a service row prefills the matching topic chip in the form.
  await page.locator('#services a.motion-service-row').nth(1).click();
  const businessChip = page.locator('#contact').getByRole('button', { name: 'Business Software', exact: true });
  await expect(businessChip).toHaveAttribute('aria-pressed', 'true');

  const form = page.getByRole('form', { name: 'Send a project note' });
  await expect(form.locator('input[name="form-name"]')).toHaveValue('business-inquiry');
  await expect(form.locator('input[name="bot-field"]')).toBeHidden();
  await expect(page.locator('#contact')).toContainText('within 1 business day (Guam time)');

  // Submitting empty fields shows an accessible validation alert without posting.
  await form.getByRole('button', { name: 'Send note' }).click();
  await expect(form.getByRole('alert')).toContainText('Please fill in your name');
  expect(requests).toHaveLength(0);

  // Fill fields and test error handling (no page reload, typed values preserved).
  await form.getByLabel('Your name').fill('Maria Cruz');
  await form.getByLabel('Email or phone').fill('maria@example.gu');
  await form.getByLabel('What would you like to improve?').fill('Replace weekly spreadsheet tracking for our office.');

  shouldFail = true;
  await form.getByRole('button', { name: 'Send note' }).click();
  await expect(form.getByRole('alert')).toContainText('ShimizuTechnology@gmail.com');
  await expect(form.getByLabel('Your name')).toHaveValue('Maria Cruz');
  expect(requests).toHaveLength(1);

  // Retry succeeds with expected url-encoded payload.
  shouldFail = false;
  await form.getByRole('button', { name: 'Send note' }).click();
  await expect(page.locator('#contact [role="status"]')).toContainText('Note received.');
  expect(requests).toHaveLength(2);

  const submitted = new URLSearchParams(requests[1].body ?? '');
  expect(submitted.get('form-name')).toBe('business-inquiry');
  expect(submitted.get('topic')).toBe('Business Software');
  expect(submitted.get('name')).toBe('Maria Cruz');
  expect(submitted.get('contact')).toBe('maria@example.gu');
  expect(submitted.get('message')).toContain('spreadsheet tracking');
  expect(submitted.get('bot-field')).toBe('');
});

test('/work/ filters switch cleanly between live, in-progress, paused, and all projects', async ({ page }) => {
  await page.goto('/work/');
  const filterGroup = page.getByRole('group', { name: 'Filter projects by status' });

  const liveBtn = filterGroup.getByRole('button', { name: /^Live & active \(/ });
  const allBtn = filterGroup.getByRole('button', { name: /^Show all \(/ });
  const progressBtn = filterGroup.getByRole('button', { name: /^In development & prototypes \(/ });
  const pausedBtn = filterGroup.getByRole('button', { name: /^Paused \(/ });

  await expect(liveBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#projects section h3').first()).toHaveText('Business Operations & Finance');
  await expect(page.locator('article.portfolio-card')).toHaveCount(13);

  await progressBtn.click();
  await expect(progressBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('article.portfolio-card')).toHaveCount(6);
  await expect(page.locator('#projects')).not.toContainText('Cornerstone Payroll');

  await pausedBtn.click();
  await expect(pausedBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('article.portfolio-card')).toHaveCount(3);
  await expect(page.locator('article.portfolio-card').first()).toContainText('Paused');

  await allBtn.click();
  await expect(allBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('article.portfolio-card')).toHaveCount(22);

  // Check group ordering on Show all.
  const headings = await page.locator('#projects section h3').allTextContents();
  expect(headings).toEqual([
    'Business Operations & Finance',
    'Commerce, Payments & Ordering',
    'Events & Sports',
    'AI, Education & Local Culture',
    'Civic, Membership & Community Systems',
  ]);
});

test('mobile header CTA, brand touch target, back-to-top hiding, and zero overflow on phone', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');

    const header = page.locator('header.site-header');
    const brand = header.getByRole('link', { name: 'Shimizu Technology home' });
    const mobileCta = header.getByRole('link', { name: 'Let’s talk' });

    await expect(brand).toBeVisible();
    await expect(mobileCta).toBeVisible();
    await expect(mobileCta).toHaveAttribute('href', '#contact');

    expect((await brand.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    expect((await mobileCta.boundingBox())?.height).toBeGreaterThanOrEqual(44);

    // Scroll down and verify Back-to-Top stays hidden on phones so it never covers content.
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Back to top' })).toBeHidden();

    // No horizontal overflow at this width.
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('homepage shows client testimonials, ways we work together, case study links, and Guam SEO metadata', async ({ page }) => {
  await page.goto('/');

  // Uniform client logos load cleanly.
  const logos = page.locator('.motion-logos img');
  await expect(logos).toHaveCount(6);
  for (const img of await logos.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }

  // Homepage cards link to the three new case-study URLs.
  await expect(page.locator('#projects a[href="/work/cornerstone-payroll/"]')).toBeVisible();
  await expect(page.locator('#projects a[href="/work/marianas-open/"]')).toBeVisible();
  await expect(page.locator('#projects a[href="/work/hafaloha-orders/"]')).toBeVisible();

  // Testimonials are surfaced verbatim without a carousel.
  await expect(page.getByText('It was incredible seeing what was only a discussion of an idea come to life.')).toBeVisible();
  await expect(page.getByText('Your technical expertise and attention to detail ensured the process was user-friendly')).toBeVisible();
  await expect(page.getByText('The staff are raving about the training.')).toBeVisible();

  // Ways we work together block includes ongoing monthly support without invented prices.
  await expect(page.getByText('Ways we work together')).toBeVisible();
  await expect(page.getByText('Ongoing monthly support & iteration')).toBeVisible();
  await expect(page.locator('#process')).not.toContainText(/\$\d/);

  // Code School of Guam linked in #about and footer.
  await expect(page.locator('#about a[href="https://codeschoolofguam.com"]')).toBeVisible();
  await expect(page.locator('footer a[href="https://codeschoolofguam.com"]')).toBeVisible();

  // LocalBusiness / ProfessionalService JSON-LD with Guam & public phone, and Gmail retained.
  const ldJson = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}');
  expect(ldJson['@type']).toEqual(['ProfessionalService', 'LocalBusiness']);
  expect(ldJson.telephone).toBe('+1-671-483-0219');
  expect(ldJson.email).toBe('ShimizuTechnology@gmail.com');
  expect(ldJson.areaServed?.name).toBe('Guam');

  // Security headers and refreshed sitemap include the new case-study URLs.
  if (!isDeploymentTest) {
    const headers = readFileSync('dist/_headers', 'utf8');
    expect(headers).toContain('X-Content-Type-Options: nosniff');
    expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin');
    expect(headers).toContain('Permissions-Policy:');

    const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
    expect(sitemap).toContain('https://shimizu-technology.com/work/cornerstone-payroll/');
    expect(sitemap).toContain('https://shimizu-technology.com/work/hafaloha-orders/');
    expect(sitemap).toContain('https://shimizu-technology.com/work/marianas-open/');
  }
});
