import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Scene per-frame allocation contract', () => {
  it('constructs no Vector3 inside the task callback', async () => {
    // Given
    const source = await readFile(resolve('src/lib/components/three/Scene.svelte'), 'utf8');

    // When
    const taskBody = source.match(/useTask\(\(delta\) => \{([\s\S]*?)\n\s{2}\}\);/)?.[1];

    // Then
    expect(taskBody).toBeDefined();
    expect(taskBody).not.toContain('new THREE.Vector3');
  });

  it('binds production Scene construction and teardown to the typed ownership seam', async () => {
    // Given
    const source = await readFile(resolve('src/lib/components/three/Scene.svelte'), 'utf8');

    // When
    const directResourceConstruction = source.match(/new THREE\.(ShaderMaterial|BufferGeometry)/g) ?? [];

    // Then
    expect(source).toContain('const componentResources = new SceneResources()');
    expect(source).toContain('componentResources.createMaterials(');
    expect(source).toContain('componentResources.createGeneration()');
    expect(source).toContain('requestResources.createGeometry()');
    expect(source).toContain('new SceneGeneration(requestResources.controller');
    expect(source).toContain('componentResources.ownPointerListener(window, onMove)');
    expect(source).toContain('componentResources.ownTask(task)');
    expect(source).toContain('componentResources.dispose()');
    expect(directResourceConstruction).toEqual([]);
  });

  it('keeps resource disposal out of ArchipelagoScene and HeroCanvas wrappers', async () => {
    // Given
    const [archipelagoWrapper, heroWrapper] = await Promise.all([
      readFile(resolve('src/lib/components/three/ArchipelagoScene.svelte'), 'utf8'),
      readFile(resolve('src/lib/components/hero/HeroCanvas.svelte'), 'utf8'),
    ]);

    // When
    const wrapperSource = `${archipelagoWrapper}\n${heroWrapper}`;

    // Then
    expect(wrapperSource).not.toMatch(/\.dispose\s*\(/);
    expect(wrapperSource).not.toMatch(/\.abort\s*\(/);
    expect(wrapperSource).not.toMatch(/new THREE\.(ShaderMaterial|BufferGeometry)/);
    expect(archipelagoWrapper).toContain('<Scene {paused} {scrollProgress} {pointBudget} {onStatus} />');
  });
});
