import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ArtifactError, inspectBuildArtifact, inspectLazySceneBoundary } from '../../scripts/build-artifact.mjs';

describe('inspectBuildArtifact', () => {
  const temporaryRoots: string[] = [];

  afterEach(async () => {
    await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  it('accepts a complete adapter-node artifact', async () => {
    // Given
    const root = await mkdtemp(join(tmpdir(), 'portfolio-build-complete-'));
    temporaryRoots.push(root);
    await Promise.all(['client', 'server', 'prerendered'].map((directory) => mkdir(join(root, directory))));
    await Promise.all([
      writeFile(join(root, 'index.js'), ''),
      writeFile(join(root, 'handler.js'), ''),
      writeFile(join(root, 'env.js'), ''),
    ]);

    // When
    const result = await inspectBuildArtifact(root);

    // Then
    expect(result).toMatchObject({
      requiredFiles: ['index.js', 'handler.js', 'env.js'],
      requiredDirectories: ['client', 'server', 'prerendered'],
    });
  });

  it('rejects an incomplete artifact', async () => {
    // Given
    const root = await mkdtemp(join(tmpdir(), 'portfolio-build-incomplete-'));
    temporaryRoots.push(root);

    // When
    const inspection = inspectBuildArtifact(root);

    // Then
    await expect(inspection).rejects.toEqual(new ArtifactError('Missing build artifact: index.js'));
  });
});

describe('inspectLazySceneBoundary', () => {
  const temporaryRoots: string[] = [];

  afterEach(async () => {
    await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  it('accepts a dynamic Scene graph excluded from initial HTML', async () => {
    // Given
    const root = await mkdtemp(join(tmpdir(), 'portfolio-lazy-scene-'));
    temporaryRoots.push(root);
    const htmlPath = join(root, 'index.html');
    const manifestPath = join(root, 'manifest.json');
    await writeFile(htmlPath, '<script>import("_app/app.js")</script>');
    await writeFile(
      manifestPath,
      JSON.stringify({
        app: { file: '_app/app.js', dynamicImports: ['route'] },
        route: { file: '_app/route.js', dynamicImports: ['scene'] },
        scene: {
          file: '_app/scene.js',
          src: 'src/lib/components/three/ArchipelagoScene.svelte',
          imports: ['three'],
        },
        three: { file: '_app/three.js', src: 'node_modules/three/build/three.module.js' },
      }),
    );

    // When
    const result = await inspectLazySceneBoundary(htmlPath, manifestPath);

    // Then
    expect(result.sceneClosure).toEqual(['scene', 'three']);
  });

  it('rejects initial HTML that preloads a Scene dependency', async () => {
    // Given
    const root = await mkdtemp(join(tmpdir(), 'portfolio-preloaded-scene-'));
    temporaryRoots.push(root);
    const htmlPath = join(root, 'forbidden-preload.html');
    const manifestPath = join(root, 'manifest.json');
    await writeFile(htmlPath, '<link rel="modulepreload" href="_app/three.js"><script>import("_app/app.js")</script>');
    await writeFile(
      manifestPath,
      JSON.stringify({
        app: { file: '_app/app.js', dynamicImports: ['scene'] },
        scene: {
          file: '_app/scene.js',
          src: 'src/lib/components/three/ArchipelagoScene.svelte',
          imports: ['three'],
        },
        three: { file: '_app/three.js', src: 'node_modules/three/build/three.module.js' },
      }),
    );

    // When
    const inspection = inspectLazySceneBoundary(htmlPath, manifestPath);

    // Then
    await expect(inspection).rejects.toEqual(new ArtifactError('Initial HTML reaches lazy Scene graph: _app/three.js'));
  });
});
