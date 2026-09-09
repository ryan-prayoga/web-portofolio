import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ArtifactError, inspectBuildArtifact, inspectForbiddenRemnants } from '../../scripts/build-artifact.mjs';

const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function completeStaticArtifact(prefix: string): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), prefix));
  temporaryRoots.push(root);
  await mkdir(join(root, '_app'));
  await Promise.all([
    writeFile(join(root, 'index.html'), '<!doctype html><html><body>ok</body></html>'),
    writeFile(join(root, '404.html'), '<!doctype html><html><body>404</body></html>'),
    writeFile(join(root, 'sitemap.xml'), '<urlset/>'),
    writeFile(join(root, 'robots.txt'), 'User-agent: *'),
    writeFile(join(root, 'freelance.html'), '<!doctype html><html><body>freelance</body></html>'),
    writeFile(join(root, '_app', 'app.js'), 'console.log("app")'),
  ]);
  return root;
}

describe('inspectBuildArtifact', () => {
  it('accepts a complete adapter-static artifact', async () => {
    // Given
    const root = await completeStaticArtifact('portfolio-static-complete-');

    // When
    const result = await inspectBuildArtifact(root);

    // Then
    expect(result).toMatchObject({
      requiredFiles: ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'freelance.html'],
      requiredDirectories: ['_app'],
    });
  });

  it('rejects an incomplete artifact', async () => {
    // Given
    const root = await mkdtemp(join(tmpdir(), 'portfolio-static-incomplete-'));
    temporaryRoots.push(root);

    // When
    const inspection = inspectBuildArtifact(root);

    // Then
    await expect(inspection).rejects.toEqual(new ArtifactError('Missing build artifact: index.html'));
  });

  it('rejects an artifact without the _app directory', async () => {
    // Given
    const root = await completeStaticArtifact('portfolio-static-no-app-');
    await rm(join(root, '_app'), { recursive: true, force: true });

    // When
    const inspection = inspectBuildArtifact(root);

    // Then
    await expect(inspection).rejects.toEqual(new ArtifactError('Missing build directory: _app'));
  });
});

describe('inspectForbiddenRemnants', () => {
  it('accepts an artifact free of purged scene references', async () => {
    // Given
    const root = await completeStaticArtifact('portfolio-clean-remnants-');

    // When
    const result = await inspectForbiddenRemnants(root);

    // Then
    expect(result.scanned).toBeGreaterThan(0);
    expect(result.forbidden).toEqual(['archipelago.json', 'ArchipelagoScene']);
  });

  it('rejects an artifact that still references the purged scene data', async () => {
    // Given
    const root = await completeStaticArtifact('portfolio-dirty-remnants-');
    await writeFile(join(root, '_app', 'chunk.js'), 'fetch("/data/archipelago.json")');

    // When
    const inspection = inspectForbiddenRemnants(root);

    // Then
    await expect(inspection).rejects.toEqual(
      new ArtifactError(`Forbidden remnant "archipelago.json" found in ${join(root, '_app', 'chunk.js')}`),
    );
  });

  it('rejects an empty artifact with no scannable files', async () => {
    // Given
    const root = await mkdtemp(join(tmpdir(), 'portfolio-empty-remnants-'));
    temporaryRoots.push(root);

    // When
    const inspection = inspectForbiddenRemnants(root);

    // Then
    await expect(inspection).rejects.toEqual(new ArtifactError('No scannable files found in build artifact'));
  });
});
