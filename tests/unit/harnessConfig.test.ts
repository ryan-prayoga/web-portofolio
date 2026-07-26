import { describe, expect, it } from 'vitest';
import { focusedCoverageHelperFiles } from '../../config/focused-coverage';
import playwrightConfig from '../../playwright.config';

describe('verification harness configuration', () => {
  it('enforces focused coverage for every scene lifecycle helper', () => {
    // Given
    const requiredHelpers: readonly (typeof focusedCoverageHelperFiles)[number][] = [
      'src/lib/components/three/sceneGeneration.ts',
      'src/lib/components/three/sceneResources.ts',
      'src/lib/stores/motion.svelte.ts',
    ];

    // When
    const configuredHelpers = new Set(focusedCoverageHelperFiles);

    // Then
    expect(requiredHelpers.every((helper) => configuredHelpers.has(helper))).toBe(true);
  });

  it('keeps active Playwright artifacts outside historical evidence', () => {
    // Given
    const temporaryOutputPrefix = '.playwright-output/';
    const htmlReporter = playwrightConfig.reporter?.[1];

    // When
    const outputDirectory = playwrightConfig.outputDir;
    const reportDirectory = Array.isArray(htmlReporter) ? htmlReporter[1]?.outputFolder : undefined;

    // Then
    expect(outputDirectory?.startsWith(temporaryOutputPrefix)).toBe(true);
    expect(reportDirectory?.startsWith(temporaryOutputPrefix)).toBe(true);
    expect(outputDirectory?.startsWith('.omo/evidence/')).toBe(false);
  });
});
