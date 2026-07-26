<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core';
  import * as THREE from 'three';
  import { beacons } from '$lib/data/beacons';
  import { makeProjector } from './geo';
  import { parsePointBudget } from './archipelagoData';
  import { SceneGeneration } from './sceneGeneration';
  import { loadArchipelagoData, type SceneStatusCallback } from './sceneLifecycle';
  import { SceneResources } from './sceneResources';
  import { archipelagoVertex, archipelagoFragment, beaconVertex, beaconFragment } from './shaders';

  let {
    paused = false,
    scrollProgress = 0,
    pointBudget = 5000,
    onStatus,
  }: { paused?: boolean; scrollProgress?: number; pointBudget?: number; onStatus?: SceneStatusCallback } = $props();

  const componentResources = new SceneResources();

  const { scene } = useThrelte();
  scene.fog = new THREE.FogExp2('#0a1020', 0.014);

  const [archMat, beaconMat] = componentResources.createMaterials(
    {
      vertexShader: archipelagoVertex,
      fragmentShader: archipelagoFragment,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.32 },
        uColor: { value: new THREE.Color('#f09e58') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    },
    {
      vertexShader: beaconVertex,
      fragmentShader: beaconFragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#ffbd82') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    },
  );

  let archPoints = $state<THREE.Points | undefined>();
  let beaconPoints = $state<THREE.Points | undefined>();
  // Posisi HQ (Tangerang) di world space — target dolly kamera
  let hqWorld = $state<[number, number, number]>([-4.9, 0, 1.7]);

  $effect(() => {
    const requestResources = componentResources.createGeneration();
    onStatus?.('loading');
    const generation = new SceneGeneration(requestResources.controller, (event) => {
      if (event.kind === 'error') {
        console.error('Failed to initialize the archipelago scene', event.error);
        onStatus?.('error');
        return;
      }
      archPoints = event.result.archPoints;
      beaconPoints = event.result.beaconPoints;
      hqWorld = [...event.result.hqWorld];
      onStatus?.('ready');
    });
    void generation.run(async () => {
      const data = await loadArchipelagoData(fetch, requestResources.controller.signal);
      const proj = makeProjector(data.bounds);
      const budget = parsePointBudget(pointBudget);

      // Subsample deterministik sesuai budget device
      const total = data.count;
      const stride = Math.max(1, Math.ceil(total / budget));
      const kept = Math.floor(total / stride);

      const positions = new Float32Array(kept * 3);
      const seeds = new Float32Array(kept);
      const brights = new Float32Array(kept);
      for (let i = 0; i < kept; i++) {
        const src = i * stride * 3;
        const [x, y, z] = proj.quantizedToWorld(data.points[src], data.points[src + 1]);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        seeds[i] = ((i * 2654435761) % 1000) / 1000;
        brights[i] = (data.points[src + 2] / 255) * 0.85;
      }
      const geo = requestResources.createGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
      geo.setAttribute('aBright', new THREE.BufferAttribute(brights, 1));
      const nextArchPoints = new THREE.Points(geo, archMat);

      // Beacon: satu Points kecil, pulse per titik
      const bPos = new Float32Array(beacons.length * 3);
      const bPhase = new Float32Array(beacons.length);
      const bScale = new Float32Array(beacons.length);
      let nextHqWorld: [number, number, number] = [-4.9, 0, 1.7];
      beacons.forEach((b, i) => {
        const [x, y, z] = proj.lonLatToWorld(b.lonlat[0], b.lonlat[1]);
        bPos[i * 3] = x;
        bPos[i * 3 + 1] = y + 0.05;
        bPos[i * 3 + 2] = z;
        bPhase[i] = i * 1.7;
        bScale[i] = b.hq ? 3.4 : 2.3;
        if (b.hq) nextHqWorld = [x, 0, z];
      });
      const bGeo = requestResources.createGeometry();
      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
      bGeo.setAttribute('aPhase', new THREE.BufferAttribute(bPhase, 1));
      bGeo.setAttribute('aScale', new THREE.BufferAttribute(bScale, 1));
      const nextBeaconPoints = new THREE.Points(bGeo, beaconMat);
      return { archPoints: nextArchPoints, beaconPoints: nextBeaconPoints, hqWorld: nextHqWorld };
    });
    return () => requestResources.dispose();
  });

  // ── Kamera: wide view → dolly ke Jawa mengikuti scrollProgress ──
  let camera = $state<THREE.PerspectiveCamera | undefined>();
  const WIDE_POS = new THREE.Vector3(0, 10.5, 12.5);
  const WIDE_TARGET = new THREE.Vector3(0, 0, 0);
  const pointer = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  const curPos = WIDE_POS.clone();
  const curTarget = WIDE_TARGET.clone();
  const zoomPos = new THREE.Vector3();
  const zoomTarget = new THREE.Vector3();
  let time = 0;

  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  componentResources.ownPointerListener(window, onMove);

  const task = useTask((delta) => {
    time += delta;
    archMat.uniforms.uTime.value = time;
    beaconMat.uniforms.uTime.value = time;
    if (!camera) return;

    smooth.x += (pointer.x - smooth.x) * Math.min(delta * 3, 1);
    smooth.y += (pointer.y - smooth.y) * Math.min(delta * 3, 1);

    const p = Math.min(Math.max(scrollProgress, 0), 1);
    const ease = p * p * (3 - 2 * p); // smoothstep

    zoomPos.set(hqWorld[0], 4.2, hqWorld[2] + 5.2);
    zoomTarget.set(hqWorld[0], 0, hqWorld[2]);

    curPos.lerpVectors(WIDE_POS, zoomPos, ease);
    curTarget.lerpVectors(WIDE_TARGET, zoomTarget, ease);

    camera.position.set(curPos.x + smooth.x * 0.9, curPos.y + smooth.y * 0.5, curPos.z);
    camera.lookAt(curTarget);
  });
  componentResources.ownTask(task);

  $effect(() => () => componentResources.dispose());

  $effect(() => {
    if (paused) task.stop();
    else task.start();
  });
</script>

<T.PerspectiveCamera makeDefault fov={40} bind:ref={camera} />
{#if archPoints}
  <T is={archPoints} />
{/if}
{#if beaconPoints}
  <T is={beaconPoints} />
{/if}
