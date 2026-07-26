import { expect, test, type Page } from '@playwright/test';

const scene = '.canvas-wrap';

async function captureErrors(page: Page): Promise<readonly string[]> {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(`pageerror:${error.message}`));
  return errors;
}

test('real payload reaches ready before the poster fades', async ({ page }) => {
  // Given
  const errors = await captureErrors(page);

  // When
  await page.goto('/');

  // Then
  await expect(page.locator(scene)).toHaveAttribute('data-scene-status', 'ready', { timeout: 15_000 });
  await expect(page.locator(scene)).toHaveClass(/ready/);
  await expect(page.locator('canvas')).toBeVisible();
  expect(errors).toEqual([]);
});

test('HTTP 500 retains the poster without an unhandled error', async ({ page }) => {
  // Given
  const errors = await captureErrors(page);
  await page.route('**/data/archipelago.json', (route) => route.fulfill({ status: 500, body: 'failure' }));

  // When
  await page.goto('/');

  // Then
  await expect(page.locator(scene)).toHaveAttribute('data-scene-status', 'error', { timeout: 15_000 });
  await expect(page.locator(scene)).not.toHaveClass(/ready/);
  expect(errors.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
  const applicationErrors = errors.filter((message) => !message.startsWith('Failed to load resource:'));
  expect(applicationErrors).toHaveLength(1);
  expect(applicationErrors[0]).toContain('Failed to initialize the archipelago scene');
});

test('malformed schema retains the poster without an unhandled error', async ({ page }) => {
  // Given
  const errors = await captureErrors(page);
  await page.route('**/data/archipelago.json', (route) => route.fulfill({ json: { count: 1 } }));

  // When
  await page.goto('/');

  // Then
  await expect(page.locator(scene)).toHaveAttribute('data-scene-status', 'error', { timeout: 15_000 });
  await expect(page.locator(scene)).not.toHaveClass(/ready/);
  expect(errors.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
  expect(errors).toHaveLength(1);
  expect(errors[0]).toContain('bounds');
});

test('malformed JSON retains the poster without an unhandled rejection', async ({ page }) => {
  // Given
  const errors = await captureErrors(page);
  await page.route('**/data/archipelago.json', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"count":' }),
  );

  // When
  await page.goto('/');

  // Then
  await expect(page.locator(scene)).toHaveAttribute('data-scene-status', 'error', { timeout: 15_000 });
  await expect(page.locator(scene)).not.toHaveClass(/ready/);
  expect(errors.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
  expect(errors).toHaveLength(1);
  expect(errors[0]).toContain('Failed to initialize the archipelago scene');
});

test('network rejection retains the poster without an unhandled rejection', async ({ page }) => {
  // Given
  const errors = await captureErrors(page);
  await page.route('**/data/archipelago.json', (route) => route.abort('failed'));

  // When
  await page.goto('/');

  // Then
  await expect(page.locator(scene)).toHaveAttribute('data-scene-status', 'error', { timeout: 15_000 });
  await expect(page.locator(scene)).not.toHaveClass(/ready/);
  expect(errors.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
  const applicationErrors = errors.filter((message) => !message.startsWith('Failed to load resource:'));
  expect(applicationErrors).toHaveLength(1);
  expect(applicationErrors[0]).toContain('Failed to initialize the archipelago scene');
});

test('unmount aborts a delayed request without error or unhandled rejection', async ({ page }) => {
  // Given
  const errors = await captureErrors(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  let aborted = false;
  const sceneRequests = new Set<string>();
  cdp.on('Network.requestWillBeSent', (event) => {
    if (event.request.url.endsWith('/data/archipelago.json')) sceneRequests.add(event.requestId);
  });
  cdp.on('Network.loadingFailed', (event) => {
    if (sceneRequests.has(event.requestId) && event.canceled) aborted = true;
  });
  await page.route('**/data/archipelago.json', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (!aborted) await route.fulfill({ json: { count: 1 } });
  });
  await page.goto('/');
  await expect(page.locator(scene)).toHaveAttribute('data-scene-status', 'loading', { timeout: 15_000 });

  // When
  await page.evaluate(() => {
    const link = document.createElement('a');
    link.href = '/scene-unmount-test';
    link.textContent = 'Unmount scene';
    document.body.append(link);
  });
  await page.getByRole('link', { name: 'Unmount scene' }).click();
  await expect(page).toHaveURL(/scene-unmount-test/);

  // Then
  await expect.poll(() => aborted).toBe(true);
  expect(errors.filter((message) => message.startsWith('pageerror:'))).toEqual([]);
  expect(errors.filter((message) => message.includes('Failed to initialize the archipelago scene'))).toEqual([]);
});
