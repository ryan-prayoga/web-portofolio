import * as THREE from 'three';
import { describe, expect, it, vi } from 'vitest';
import {
  SceneResources,
  createDefaultSceneResourceFactory,
  type SceneResourceFactory,
} from '../../src/lib/components/three/sceneResources';

function createInstrumentedFactory() {
  const base = createDefaultSceneResourceFactory();
  const materials: THREE.ShaderMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const controllers: AbortController[] = [];
  const materialDisposals: ReturnType<typeof vi.fn>[] = [];
  const geometryDisposals: ReturnType<typeof vi.fn>[] = [];
  const factory: SceneResourceFactory = {
    createMaterial(parameters) {
      const material = base.createMaterial(parameters);
      const dispose = vi.spyOn(material, 'dispose');
      materials.push(material);
      materialDisposals.push(dispose);
      return material;
    },
    createGeometry() {
      const geometry = base.createGeometry();
      const dispose = vi.spyOn(geometry, 'dispose');
      geometries.push(geometry);
      geometryDisposals.push(dispose);
      return geometry;
    },
    createAbortController() {
      const controller = base.createAbortController();
      controllers.push(controller);
      return controller;
    },
  };
  return { controllers, factory, geometries, geometryDisposals, materialDisposals, materials };
}

describe('SceneResources production ownership path', () => {
  it('owns two real materials, two real geometries, task, listener, and request exactly once', () => {
    // Given
    const harness = createInstrumentedFactory();
    const resources = new SceneResources(harness.factory);
    const taskStop = vi.fn();
    const target = window;
    const listener = vi.fn();
    const removeListener = vi.spyOn(target, 'removeEventListener');
    resources.createMaterials({ vertexShader: '', fragmentShader: '' }, { vertexShader: '', fragmentShader: '' });
    const generation = resources.createGeneration();
    generation.createGeometry();
    generation.createGeometry();
    resources.ownTask({ stop: taskStop });
    resources.ownPointerListener(target, listener);

    // When
    resources.dispose();
    resources.dispose();

    // Then
    expect(harness.materials).toHaveLength(2);
    expect(harness.materials.every((material) => material instanceof THREE.ShaderMaterial)).toBe(true);
    expect(harness.geometries).toHaveLength(2);
    expect(harness.geometries.every((geometry) => geometry instanceof THREE.BufferGeometry)).toBe(true);
    expect(harness.materialDisposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
    expect(harness.geometryDisposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
    expect(harness.controllers[0]?.signal.aborted).toBe(true);
    expect(taskStop).toHaveBeenCalledOnce();
    expect(removeListener.mock.calls.filter(([type]) => type === 'pointermove')).toHaveLength(1);
  });

  it('disposes separate successful replacement generations exactly once', () => {
    // Given
    const harness = createInstrumentedFactory();
    const first = new SceneResources(harness.factory);
    first.createMaterials({ vertexShader: '', fragmentShader: '' }, { vertexShader: '', fragmentShader: '' });
    first.createGeneration().createGeometry();
    first.createGeneration().createGeometry();
    const second = new SceneResources(harness.factory);
    second.createMaterials({ vertexShader: '', fragmentShader: '' }, { vertexShader: '', fragmentShader: '' });
    second.createGeneration().createGeometry();
    second.createGeneration().createGeometry();

    // When
    first.dispose();
    second.dispose();
    first.dispose();
    second.dispose();

    // Then
    expect(harness.materials).toHaveLength(4);
    expect(harness.geometries).toHaveLength(4);
    expect(harness.materialDisposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
    expect(harness.geometryDisposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
  });

  it('cleans only resources created before partial geometry initialization fails', () => {
    // Given
    const harness = createInstrumentedFactory();
    let geometryCount = 0;
    const factory: SceneResourceFactory = {
      ...harness.factory,
      createGeometry() {
        geometryCount += 1;
        if (geometryCount === 2) throw new RangeError('second geometry failed');
        return harness.factory.createGeometry();
      },
    };
    const resources = new SceneResources(factory);
    resources.createMaterials({ vertexShader: '', fragmentShader: '' }, { vertexShader: '', fragmentShader: '' });
    const generation = resources.createGeneration();
    generation.createGeometry();

    // When / Then
    expect(() => generation.createGeometry()).toThrowError(RangeError);
    resources.dispose();
    expect(harness.geometries).toHaveLength(1);
    expect(harness.geometryDisposals[0]).toHaveBeenCalledOnce();
    expect(harness.materialDisposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
  });

  it('cleans the first material when creation of the second material fails', () => {
    // Given
    const harness = createInstrumentedFactory();
    let materialCount = 0;
    const factory: SceneResourceFactory = {
      ...harness.factory,
      createMaterial(parameters) {
        materialCount += 1;
        if (materialCount === 2) throw new RangeError('second material failed');
        return harness.factory.createMaterial(parameters);
      },
    };
    const resources = new SceneResources(factory);

    // When / Then
    expect(() =>
      resources.createMaterials({ vertexShader: '', fragmentShader: '' }, { vertexShader: '', fragmentShader: '' }),
    ).toThrowError(RangeError);
    resources.dispose();
    expect(harness.materials).toHaveLength(1);
    expect(harness.materialDisposals[0]).toHaveBeenCalledOnce();
  });

  it('aborts every interrupted generation exactly once', () => {
    // Given
    const harness = createInstrumentedFactory();
    const resources = new SceneResources(harness.factory);
    const generations = Array.from({ length: 4 }, () => resources.createGeneration());
    const aborts = harness.controllers.map((controller) => vi.spyOn(controller, 'abort'));

    // When
    for (const generation of generations) generation.dispose();
    resources.dispose();
    resources.dispose();

    // Then
    expect(harness.controllers).toHaveLength(4);
    expect(harness.controllers.every((controller) => controller.signal.aborted)).toBe(true);
    expect(aborts.every((abort) => abort.mock.calls.length === 1)).toBe(true);
  });
});
