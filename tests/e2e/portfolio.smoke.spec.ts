import { expect, test } from '@playwright/test';

test('renders the portfolio shell from a production build', async ({ page }, testInfo) => {
  // Given
  const browserErrors: string[] = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));

  // When
  const response = await page.goto('/');

  // Then
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Ryan Prayoga — Fullstack Developer & Sub Team Lead');
  await expect(page.locator('main#top')).toBeVisible();
  await expect(page.locator('#experience')).toBeVisible();
  await expect(page.locator('#work')).toBeVisible();
  expect(browserErrors).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('portfolio-smoke.png'), fullPage: true });
});

test('toggles light and dark mode with smooth theme transition', async ({ page }) => {
  // Given
  await page.goto('/');
  const themeToggle = page.locator('nav button[aria-label*="mode"]');
  await expect(themeToggle).toBeVisible();

  const isInitiallyDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));

  // When clicking toggle
  await themeToggle.click();

  // Then html class should flip (auto-retrying assertion waits for view transition update callback)
  if (isInitiallyDark) {
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  } else {
    await expect(page.locator('html')).toHaveClass(/dark/);
  }

  // When clicking toggle again
  await themeToggle.click();

  // Then html class flips back
  if (isInitiallyDark) {
    await expect(page.locator('html')).toHaveClass(/dark/);
  } else {
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  }
});
