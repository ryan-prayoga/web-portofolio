import { inspectBuildArtifact, inspectLazySceneBoundary } from './build-artifact.mjs';

const [htmlPath = 'build/prerendered/index.html', manifestPath = '.svelte-kit/output/client/.vite/manifest.json'] =
  process.argv.slice(2);
const result = await inspectBuildArtifact('build');
const boundary = await inspectLazySceneBoundary(htmlPath, manifestPath);
console.log(
  `Verified ${result.requiredFiles.length} files, ${result.requiredDirectories.length} directories, and lazy Scene boundary (${boundary.sceneKey}) in ${result.root}`,
);
