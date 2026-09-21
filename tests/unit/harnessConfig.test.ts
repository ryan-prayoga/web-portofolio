import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { focusedCoverageHelperFiles } from '../../config/focused-coverage';
import { scripts } from '../../package.json';
import playwrightConfig from '../../playwright.config';

const temporaryRoots: string[] = [];
const gitConfigSentinel = '[core]\n\trepositoryformatversion = 0\n\thooksPath = sentinel-hooks\n';

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function prepareFixture(syncExit: number): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-prepare-'));
  temporaryRoots.push(root);
  await Promise.all(
    ['.git/objects', '.git/refs', 'node_modules/.bin'].map((directory) =>
      mkdir(join(root, directory), { recursive: true }),
    ),
  );
  await Promise.all([
    writeFile(join(root, '.git/HEAD'), 'ref: refs/heads/main\n'),
    writeFile(join(root, '.git/config'), gitConfigSentinel),
    writeFile(
      join(root, 'package.json'),
      JSON.stringify({ name: 'prepare-fixture', private: true, scripts: { prepare: scripts.prepare } }),
    ),
    writeFile(
      join(root, 'node_modules/.bin/svelte-kit'),
      `#!/bin/sh\nprintf '%s\\n' "$@" > sync-args\nexit ${syncExit}\n`,
      { mode: 0o755 },
    ),
  ]);
  return root;
}

function runPrepare(root: string) {
  return spawnSync('npm', ['run', 'prepare'], {
    cwd: root,
    env: {
      PATH: process.env.PATH,
      HOME: root,
      TMPDIR: tmpdir(),
      GIT_MASTER: '1',
      GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: '/dev/null',
      GIT_CEILING_DIRECTORIES: root,
    },
    encoding: 'utf8',
    timeout: 5000,
    killSignal: 'SIGKILL',
  });
}

describe('verification harness configuration', () => {
  it('enforces focused coverage for every behavioral helper', () => {
    // Given
    const requiredHelpers: readonly (typeof focusedCoverageHelperFiles)[number][] = [
      'src/lib/data/portfolioContract.ts',
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

describe('prepare lifecycle', () => {
  it.each([0, 23])('preserves Git config bytes when sync exits %i', async (syncExit) => {
    // Given
    const root = await prepareFixture(syncExit);
    const before = await readFile(join(root, '.git/config'));

    // When
    const result = runPrepare(root);

    // Then
    expect(result.error).toBeUndefined();
    expect(result.signal).toBeNull();
    expect(await readFile(join(root, '.git/config'))).toEqual(before);
  });

  it.each([0, 23])('runs sync and propagates its exit code when sync exits %i', async (syncExit) => {
    // Given
    const root = await prepareFixture(syncExit);

    // When
    const result = runPrepare(root);

    // Then
    expect(result.error).toBeUndefined();
    expect(result.signal).toBeNull();
    expect(await readFile(join(root, 'sync-args'), 'utf8')).toBe('sync\n');
    expect(result.status).toBe(syncExit);
  });
});
