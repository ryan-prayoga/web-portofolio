import { expect, test, type Page } from '@playwright/test';

const mobileViewport = { width: 390, height: 844 } as const;
const toggleId = 'mobile-menu-toggle';
const menuId = 'mobile-menu-dialog';

async function openMenu(page: Page) {
  const toggle = page.locator(`#${toggleId}`);
  await expect(toggle).toBeVisible();
  await expect(toggle).toBeEnabled();
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(`#${menuId}`)).toBeVisible();
  await expect(page.locator(`#${menuId} a`).first()).toBeFocused();
  return toggle;
}

test.describe('mobile menu', () => {
  test.use({ viewport: mobileViewport });

  test('baseline: toggles the existing mobile navigation and closes from a section link', async ({ page }) => {
    // Given
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle menu' });
    expect(await page.evaluate(() => document.body.getAttribute('style'))).toBeNull();

    // When
    await toggle.click();

    // Then
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator(`${menuId.startsWith('#') ? '' : '#'}${menuId} a[href="#work"]`)).toBeVisible();

    // When
    await page.locator(`${menuId.startsWith('#') ? '' : '#'}${menuId} a[href="#work"]`).click();

    // Then
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // When
    await openMenu(page);
    await page.keyboard.press('Escape');

    // Then
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => document.body.getAttribute('style'))).toBeNull();
  });

  test('contains keyboard focus and restores every modality boundary', async ({ page }, testInfo) => {
    // Given
    await page.goto('/');
    const originalBodyStyle = 'color: rgb(1, 2, 3); --todo-8-marker: exact; padding-right: 7px; overflow: clip;';
    await page.evaluate(() => {
      document.body.setAttribute(
        'style',
        'color: rgb(1, 2, 3); --todo-8-marker: exact; padding-right: 7px; overflow: clip;',
      );
    });
    const toggle = page.locator(`#${toggleId}`);
    const menu = page.locator(`#${menuId}`);
    const background = page.locator('#page-background');

    // When
    await openMenu(page);

    // Then
    await expect(toggle).toHaveAttribute('aria-controls', menuId);
    await expect(menu).toHaveAttribute('role', 'dialog');
    await expect(menu).toHaveAttribute('aria-modal', 'true');
    await expect(menu).toHaveAccessibleName(/navigation/i);
    await expect(background).toHaveAttribute('inert', '');
    await expect(page.locator('.brand')).toHaveAttribute('inert', '');
    const inactiveNavControls = page.locator('.nav-actions > :not(.menu-btn)');
    await expect(inactiveNavControls).toHaveCount(4);
    for (let index = 0; index < (await inactiveNavControls.count()); index += 1) {
      await expect(inactiveNavControls.nth(index)).toHaveAttribute('inert', '');
    }
    await expect(page.locator(`${menuId.startsWith('#') ? '' : '#'}${menuId} a`).first()).toBeFocused();
    expect(
      await page.evaluate(() => ({
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      })),
    ).toEqual({
      overflow: 'hidden',
      paddingRight: '7px',
    });
    expect(
      await page.evaluate(() => {
        const background = document.querySelector('#page-background');
        const candidates = background?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        return [...(candidates ?? [])].filter((element) => element.tabIndex >= 0 && !element.closest('[inert]')).length;
      }),
    ).toBe(0);
    await page.screenshot({ path: testInfo.outputPath('mobile-menu-open.png'), fullPage: true });

    const menuLinks = menu.getByRole('link');
    const linkCount = await menuLinks.count();
    for (let index = 1; index < linkCount; index += 1) {
      await page.keyboard.press('Tab');
      await expect(menuLinks.nth(index)).toBeFocused();
    }
    await page.keyboard.press('Tab');
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menuLinks.first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(menuLinks.last()).toBeFocused();

    // When
    await page.keyboard.press('Escape');

    // Then
    await expect(menu).toHaveCount(0);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await expect(background).not.toHaveAttribute('inert', '');
    expect(await page.evaluate(() => document.body.getAttribute('style'))).toBe(originalBodyStyle);

    // When
    await openMenu(page);
    await menu.locator('a[href="#work"]').click();

    // Then
    await expect(menu).toHaveCount(0);
    await expect(toggle).toBeFocused();

    // When
    await openMenu(page);
    await page.setViewportSize({ width: 900, height: 844 });

    // Then
    await expect(menu).toHaveCount(0);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.brand')).toBeVisible();
    await expect(page.locator('.brand')).toBeFocused();
    expect(await page.evaluate(() => document.body.getAttribute('style'))).toBe(originalBodyStyle);
  });

  test('restores modality state when the app tears down in the same document', async ({ page }) => {
    // Given
    await page.goto('/?test-teardown=1');
    const originalBodyStyle = 'background-color: rgb(4, 5, 6); --teardown-marker: retained; overflow: scroll;';
    await page.evaluate(() => {
      document.body.setAttribute(
        'style',
        'background-color: rgb(4, 5, 6); --teardown-marker: retained; overflow: scroll;',
      );
    });
    await openMenu(page);

    // When
    await page.evaluate(() => window.dispatchEvent(new Event('portfolio:test-teardown')));

    // Then
    await expect(page.locator('nav')).toHaveCount(0);
    await expect(page.locator('#page-background')).toHaveCount(0);
    expect(await page.evaluate(() => document.body.getAttribute('style'))).toBe(originalBodyStyle);
    expect(await page.evaluate(() => document.querySelectorAll('[inert]').length)).toBe(0);
  });
});
