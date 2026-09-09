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

test('mobile viewport: verifies theme toggle icon sizing and ensures zero horizontal overflow', async ({
  page,
}, testInfo) => {
  const viewports = [
    { name: 'iphone-se', width: 375, height: 667 },
    { name: 'iphone-14', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');

    const themeToggle = page.locator('nav button[aria-label*="mode"]');
    await expect(themeToggle).toBeVisible();

    const svgIcon = themeToggle.locator('svg:not(.drawably-svg)');
    await expect(svgIcon).toBeVisible();

    const iconBox = await svgIcon.boundingBox();
    expect(iconBox).not.toBeNull();
    // Verify the icon is not squashed by drawably's default padding (was 4px width)
    expect(iconBox!.width).toBeGreaterThanOrEqual(18);
    expect(iconBox!.height).toBeGreaterThanOrEqual(18);

    // Verify button touch target size >= 34px
    const buttonBox = await themeToggle.boundingBox();
    expect(buttonBox!.width).toBeGreaterThanOrEqual(34);
    expect(buttonBox!.height).toBeGreaterThanOrEqual(34);

    // Check zero horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasHorizontalOverflow).toBe(false);

    const isInitiallyDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));

    // Capture mobile initial screenshot
    await page.screenshot({ path: testInfo.outputPath(`mobile-${vp.name}-initial.png`), fullPage: false });

    // Toggle theme
    await themeToggle.click();
    if (isInitiallyDark) {
      await expect(page.locator('html')).not.toHaveClass(/dark/);
    } else {
      await expect(page.locator('html')).toHaveClass(/dark/);
    }

    // Wait for circular reveal transition to settle
    await page.waitForTimeout(900);

    const toggledIconBox = await themeToggle.locator('svg:not(.drawably-svg)').boundingBox();
    expect(toggledIconBox).not.toBeNull();
    expect(toggledIconBox!.width).toBeGreaterThanOrEqual(18);
    expect(toggledIconBox!.height).toBeGreaterThanOrEqual(18);

    // Capture mobile toggled screenshot
    await page.screenshot({ path: testInfo.outputPath(`mobile-${vp.name}-toggled.png`), fullPage: false });
  }
});
