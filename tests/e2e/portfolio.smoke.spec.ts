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
