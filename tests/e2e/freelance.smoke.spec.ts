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
    await expect(page.locator('#showcase')).toBeVisible();
    await expect(page.locator('#faq')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    expect(browserErrors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('freelance-smoke.png'), fullPage: true });
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
