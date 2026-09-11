import { expect, test } from '@playwright/test';

test.describe('SketchRevealAvatar interactivity', () => {
  test('renders initial sketch avatar with hint badge and toggles on hover/leave', async ({ page }) => {
    // Given
    await page.goto('/');

    const avatarCard = page.locator('header [role="button"][aria-label*="Ryan Prayoga"]');
    await expect(avatarCard).toBeVisible();

    const canvas = avatarCard.locator('canvas');
    await expect(canvas).toBeVisible();

    const hintButton = page.locator('header button', { hasText: /erase|hapus/i });
    await expect(hintButton).toBeVisible();
    await expect(hintButton).toContainText(/✎/);

    // When hovering avatar
    await avatarCard.hover();

    // Then hint changes to re-sketch
    const resketchHint = page.locator('header button', { hasText: /re-sketch|sketsa ulang/i });
    await expect(resketchHint).toBeVisible();
    await expect(resketchHint).toContainText(/↺/);

    // When hovering away
    await page.locator('h1').first().hover();

    // Then hint switches back to erase
    await expect(hintButton).toBeVisible();
    await expect(hintButton).toContainText(/✎/);
  });

  test('supports keyboard interaction and toggle button', async ({ page }) => {
    await page.goto('/');

    const avatarCard = page.locator('header [role="button"][aria-label*="Ryan Prayoga"]');
    await expect(avatarCard).toBeVisible();

    const hintButton = page.locator('header button', { hasText: /erase|hapus/i });
    await expect(hintButton).toBeVisible();

    // Keyboard navigation: focus card and press Enter
    await avatarCard.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('header button', { hasText: /re-sketch|sketsa ulang/i })).toBeVisible();

    // Press Space to toggle back
    await page.keyboard.press('Space');
    await expect(page.locator('header button', { hasText: /erase|hapus/i })).toBeVisible();

    // Click hint button directly
    await hintButton.click();
    await expect(page.locator('header button', { hasText: /re-sketch|sketsa ulang/i })).toBeVisible();
  });

  test('mobile viewport with touch: displays tap hint and toggles on tap', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('/');

    const avatarCard = page.locator('header [role="button"][aria-label*="Ryan Prayoga"]');
    await expect(avatarCard).toBeVisible();

    const tapHint = page.locator('header button', { hasText: /tap to erase|ketuk untuk hapus/i });
    await expect(tapHint).toBeVisible();

    // Tap to reveal photo
    await avatarCard.tap();
    await expect(page.locator('header button', { hasText: /re-sketch|sketsa ulang/i })).toBeVisible();

    // Tap again to re-sketch
    await avatarCard.tap();
    await expect(page.locator('header button', { hasText: /tap to erase|ketuk untuk hapus/i })).toBeVisible();

    await context.close();
  });

  test('captures screenshots of sketch and revealed photo states', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForTimeout(800);

    const avatarCard = page.locator('header [role="button"][aria-label*="Ryan Prayoga"]');
    await expect(avatarCard).toBeVisible();

    const box = await avatarCard.boundingBox();
    if (box) {
      await page.screenshot({
        path: testInfo.outputPath('screenshot-sketch.png'),
        clip: {
          x: Math.max(0, box.x - 20),
          y: Math.max(0, box.y - 20),
          width: box.width + 40,
          height: box.height + 70,
        },
      });

      await avatarCard.hover();
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: testInfo.outputPath('screenshot-photo.png'),
        clip: {
          x: Math.max(0, box.x - 20),
          y: Math.max(0, box.y - 20),
          width: box.width + 40,
          height: box.height + 70,
        },
      });

      // Toggle dark mode
      const themeToggle = page.locator('nav button[aria-label*="mode"]');
      await themeToggle.click();
      await page.waitForTimeout(600);

      // Move mouse away to re-sketch in dark mode
      await page.locator('h1').first().hover();
      await page.waitForTimeout(1200);

      await page.screenshot({
        path: testInfo.outputPath('screenshot-sketch-dark.png'),
        clip: {
          x: Math.max(0, box.x - 20),
          y: Math.max(0, box.y - 20),
          width: box.width + 40,
          height: box.height + 70,
        },
      });
    }
  });
});
