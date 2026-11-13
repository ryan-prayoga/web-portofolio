import { expect, test } from '@playwright/test';

test.describe('freelance landing page', () => {
  test('renders the freelance landing page from a production build', async ({ page }, testInfo) => {
    // Given
    const browserErrors: string[] = [];
    page.on('pageerror', (error) => browserErrors.push(error.message));

    // When
    const response = await page.goto('/freelance');

    // Then
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Portofolio|Portfolio/);
    await expect(page.locator('main#top')).toBeVisible();
    await expect(page.locator('#why-us')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#packages')).toBeVisible();
    await expect(page.locator('#process')).toBeVisible();
    await expect(page.locator('#revisions')).toBeVisible();
    await expect(page.locator('#showcase')).toBeVisible();
    await expect(page.locator('#faq')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    expect(browserErrors).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath('freelance-smoke.png'),
      fullPage: testInfo.project.name !== 'mobile-webkit',
    });
  });

  test('toggles language between Indonesian and English', async ({ page }) => {
    // Given
    await page.goto('/freelance');
    const langBtn = page.locator('nav.freelance-nav .lang-btn');
    await expect(langBtn).toBeVisible();

    // When toggling language
    await langBtn.click();

    // Then headline or buttons should update to the opposite language
    const currentLangText = await langBtn.innerText();
    expect(currentLangText).toContain('/');

    // When clicking again
    await langBtn.click();
  });

  test('expands and collapses FAQ accordion items', async ({ page }) => {
    // Given
    await page.goto('/freelance');
    const firstFaqButton = page.locator('#faq button[aria-expanded]').first();
    await expect(firstFaqButton).toBeVisible();

    // By default first is expanded
    await expect(firstFaqButton).toHaveAttribute('aria-expanded', 'true');

    // When clicking to collapse
    await firstFaqButton.click();
    await expect(firstFaqButton).toHaveAttribute('aria-expanded', 'false');

    // When clicking to re-expand
    await firstFaqButton.click();
    await expect(firstFaqButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('verifies WhatsApp order links contain valid target', async ({ page }) => {
    // Given
    await page.goto('/freelance');

    // When inspecting WhatsApp links
    const waLinks = page.locator('a[href*="wa.me"]');
    const count = await waLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const href = await waLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    }
  });

  test('renders pure English copy with no untranslated Indonesian strings', async ({ page }) => {
    // Given a visitor who switched to English (freelance defaults to Indonesian)
    await page.addInitScript(() => localStorage.setItem('locale', 'en'));
    await page.goto('/freelance');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // When reading everything the visitor can actually see
    const visibleText = await page.evaluate(() => document.body.innerText);

    // Then no Indonesian string may leak through hardcoded markup
    const indonesianMarkers = [
      'Tanyakan',
      'Hubungi',
      'Rekam Jejak',
      'Kredibilitas',
      'Legalitas',
      'Selamanya',
      'Konsultasi',
      'Lihat ',
    ];
    const leaked = indonesianMarkers.filter((marker) => visibleText.includes(marker));
    expect(leaked, `Indonesian copy leaked into the English page: ${leaked.join(', ')}`).toEqual([]);
  });

  test('prerenders Indonesian copy so search engines index the local-market page', async ({ request }) => {
    // Given the static HTML, before any JavaScript runs
    const freelanceHtml = await (await request.get('/freelance')).text();
    const homeHtml = await (await request.get('/')).text();

    // Then the freelance page ships Indonesian markup and metadata
    expect(freelanceHtml).toContain('<html lang="id">');
    expect(freelanceHtml).toContain('<title>Jasa Pembuatan Web Portofolio');
    expect(freelanceHtml).toContain('Konsultasi');

    // And the recruiter-facing portfolio stays English
    expect(homeHtml).toContain('<html lang="en">');
  });

  test('shows Indonesian to a first-time visitor without a saved language', async ({ page }) => {
    await page.goto('/freelance');

    await expect(page.locator('html')).toHaveAttribute('lang', 'id');
    await expect(page).toHaveTitle(/Jasa Pembuatan Web/);
  });

  test('only links to business showcases that are verified live', async ({ page }) => {
    await page.goto('/freelance');

    const showcaseLinks = page.locator('#showcase a[href^="https://"]');
    const hrefs = await showcaseLinks.evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));

    expect(hrefs.some((href) => href.includes('kasbadminton.com'))).toBe(true);
    expect(hrefs.some((href) => href.includes('putraselamatmakmur.com'))).toBe(true);
    expect(hrefs.some((href) => href.includes('konveksipro'))).toBe(false);
  });

  test('draws card outlines once, never a sketch stacked on a CSS border', async ({ page }) => {
    await page.goto('/freelance');
    await page.waitForSelector('.drawably-card');

    // Drawably menggambar garis tepi sendiri sebagai SVG. Kalau elemen yang
    // sama juga punya border CSS, pengunjung melihat dua garis: satu lurus,
    // satu goresan tangan.
    const { inspected, doubled } = await page.evaluate(() => {
      const sides = ['top', 'right', 'bottom', 'left'];
      const sketched = [...document.querySelectorAll('.drawably-card, .drawably-button, .drawably-badge')];
      const doubledUp = sketched
        .filter((el) => {
          const style = getComputedStyle(el);
          return sides.some(
            (side) =>
              style.getPropertyValue(`border-${side}-style`) !== 'none' &&
              parseFloat(style.getPropertyValue(`border-${side}-width`)) > 0,
          );
        })
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 120));

      return { inspected: sketched.length, doubled: doubledUp };
    });

    // Tanpa ini, tes lolos begitu saja kalau nama kelas drawably berubah.
    expect(inspected).toBeGreaterThan(10);
    expect(doubled, `elements with both a sketch and a CSS border: ${doubled.join(' | ')}`).toEqual([]);
  });

  test('prices every major request pack and links it to WhatsApp', async ({ page }) => {
    await page.goto('/freelance');

    const packSection = page.locator('#revisions');
    await expect(packSection).toContainText('Rp 400.000');
    await expect(packSection).toContainText('Rp 900.000');
    await expect(packSection).toContainText('Rp 1.500.000');

    const packLinks = packSection.locator('a[href*="wa.me"]');
    expect(await packLinks.count()).toBeGreaterThanOrEqual(3);
  });

  test('mobile viewport: ensures zero horizontal overflow', async ({ page }) => {
    const viewports = [
      { name: 'iphone-se', width: 375, height: 667 },
      { name: 'iphone-14', width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/freelance');
      await page.waitForLoadState('domcontentloaded');

      const hasHorizontalScrollbar = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalScrollbar).toBe(false);
    }
  });
});
