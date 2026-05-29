import * as THREE from 'three';

export function disposeThree(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
      child.geometry?.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const m of materials) {
        if (!m) continue;
        for (const key of Object.keys(m)) {
          const val = (m as Record<string, unknown>)[key];
          if (val && typeof val === 'object' && 'dispose' in val) {
            (val as { dispose: () => void }).dispose();
          }
        }
        m.dispose();
      }
    }
  });
}
