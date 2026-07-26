import { expect, test } from '@playwright/test';

test('renders a featured case study from the production build', async ({ page }) => {
  // Given
  const browserErrors: string[] = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));

  // When
  const response = await page.goto('/work/pantauanggaran');

  // Then
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Pantau Anggaran — Case Study · Ryan Prayoga');
  await expect(page.locator('h1')).toHaveText('Pantau Anggaran');
  expect(browserErrors).toEqual([]);
});

test('unknown case study slug returns 404', async ({ page }) => {
  // When
  const response = await page.goto('/work/tidak-ada');

  // Then
  expect(response?.status()).toBe(404);
});
