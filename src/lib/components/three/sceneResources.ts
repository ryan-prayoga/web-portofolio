import * as THREE from 'three';

type Disposable = { dispose(): void };
type TaskControl = { stop(): void };
type PointerListener = (event: PointerEvent) => void;

export type MaterialShaders = {
  readonly vertexShader: string;
  readonly fragmentShader: string;
};

export interface SceneResourceFactory {
  createMaterial(parameters: THREE.ShaderMaterialParameters): THREE.ShaderMaterial;
  createGeometry(): THREE.BufferGeometry;
  createAbortController(): AbortController;
}

export function createDefaultSceneResourceFactory(): SceneResourceFactory {
  return {
    createMaterial: (parameters) => new THREE.ShaderMaterial(parameters),
    createGeometry: () => new THREE.BufferGeometry(),
    createAbortController: () => new AbortController(),
  };
}

class ResourceOwner implements Disposable {
  private readonly resources = new Set<Disposable>();
  private disposed = false;

  own<T extends Disposable>(resource: T): T {
    if (this.disposed) resource.dispose();
    else this.resources.add(resource);
    return resource;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const resource of this.resources) resource.dispose();
    this.resources.clear();
  }
}

export class SceneGenerationResources implements Disposable {
  readonly controller: AbortController;
  private readonly owner = new ResourceOwner();

  constructor(private readonly factory: SceneResourceFactory) {
    this.controller = factory.createAbortController();
    this.owner.own({ dispose: () => this.controller.abort() });
  }

  createGeometry(): THREE.BufferGeometry {
    return this.owner.own(this.factory.createGeometry());
  }

  dispose(): void {
    this.owner.dispose();
  }
}

export class SceneResources implements Disposable {
  private readonly owner = new ResourceOwner();

  constructor(private readonly factory = createDefaultSceneResourceFactory()) {}

  createMaterials(
    archipelago: THREE.ShaderMaterialParameters,
    beacon: THREE.ShaderMaterialParameters,
  ): readonly [THREE.ShaderMaterial, THREE.ShaderMaterial] {
    return [
      this.owner.own(this.factory.createMaterial(archipelago)),
      this.owner.own(this.factory.createMaterial(beacon)),
    ];
  }

  createGeneration(): SceneGenerationResources {
    return this.owner.own(new SceneGenerationResources(this.factory));
  }

  ownTask(task: TaskControl): void {
    this.owner.own({ dispose: () => task.stop() });
  }

  ownPointerListener(target: Window, listener: PointerListener): void {
    target.addEventListener('pointermove', listener, { passive: true });
    this.owner.own({ dispose: () => target.removeEventListener('pointermove', listener) });
  }

  dispose(): void {
    this.owner.dispose();
  }
}
