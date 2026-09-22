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

test('notebook margin line: verifies hidden scrollbar, proportional scroll progress, and non-overlapping positioning', async ({
  page,
}, testInfo) => {
  // Test mobile viewport first
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  // Verify native scrollbar is hidden via CSS
  const scrollbarWidth = await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth);
  expect(scrollbarWidth).toBe('none');

  // Verify NotebookMargin is mounted
  const marginContainer = page.locator('div[style*="left: max(10px"]');
  await expect(marginContainer).toBeVisible();

  // Check initial stroke offset at top of page (should be ~1000)
  const linePath = marginContainer.locator('path');
  const initialOffset = await linePath.evaluate((el) => {
    return parseFloat(el.style.strokeDashoffset);
  });
  expect(initialOffset).toBeGreaterThanOrEqual(950);

  // Check horizontal position on mobile (should be at left ~10px)
  const mobileMarginBox = await marginContainer.boundingBox();
  expect(mobileMarginBox).not.toBeNull();
  // Stroke center is at 10px, container width is 16px centered with translateX(-50%), so left edge is at 2px
  expect(mobileMarginBox!.x).toBeCloseTo(2, 0);

  // First card in experience section
  const firstCard = page.locator('#experience article').first();
  await expect(firstCard).toBeVisible();
  const cardBox = await firstCard.boundingBox();
  expect(cardBox).not.toBeNull();
  // Card should have plenty of breathing room (>= 10px) from the margin line
  const marginLineCenter = mobileMarginBox!.x + mobileMarginBox!.width / 2;
  expect(cardBox!.x - marginLineCenter).toBeGreaterThanOrEqual(10);

  // Scroll 50% of the page
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.5);
  });
  await page.waitForTimeout(300);

  const midOffset = await linePath.evaluate((el) => {
    return parseFloat(el.style.strokeDashoffset);
  });
  // Progress at 50% scroll must be around 500 (50%), NOT completed (not 0)
  expect(midOffset).toBeGreaterThan(250);
  expect(midOffset).toBeLessThan(750);

  // Take mobile screenshot during mid-scroll
  await page.screenshot({ path: testInfo.outputPath('notebook-margin-mobile-mid.png'), fullPage: false });

  // Scroll to absolute bottom of page
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll, behavior: 'instant' });
  });
  await page.waitForFunction(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    return Math.abs(window.scrollY - maxScroll) < 5;
  });
  await page.waitForTimeout(100);

  const bottomOffset = await linePath.evaluate((el) => {
    return parseFloat(el.style.strokeDashoffset);
  });
  // At the bottom, progress should reach 100% (offset ~ 0)
  expect(bottomOffset).toBeLessThanOrEqual(50);

  // Now test desktop viewport
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForTimeout(300);

  const desktopMarginBox = await marginContainer.boundingBox();
  expect(desktopMarginBox).not.toBeNull();
  // On desktop 1280px, container 1024px starts at (1280 - 1024) / 2 = 128px.
  // Line center is at 128 + 8 = 136px. With 16px width centered (-50%), x is around 128px.
  expect(desktopMarginBox!.x).toBeGreaterThan(120);
  expect(desktopMarginBox!.x).toBeLessThan(135);

  // Capture desktop screenshot
  await page.screenshot({ path: testInfo.outputPath('notebook-margin-desktop.png'), fullPage: false });
});
