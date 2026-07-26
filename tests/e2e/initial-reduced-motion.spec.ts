import { expect, test } from '@playwright/test';

test('initial reduced motion prevents the archipelago scene from starting', async ({ page }) => {
  // Given
  let archipelagoRequests = 0;
  page.on('request', (request) => {
    if (request.url().endsWith('/data/archipelago.json')) archipelagoRequests += 1;
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // When
  await page.goto('/');
  await page.waitForTimeout(4_500);

  // Then
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('[data-scene-status="ready"]')).toHaveCount(0);
  expect(archipelagoRequests).toBe(0);
});
