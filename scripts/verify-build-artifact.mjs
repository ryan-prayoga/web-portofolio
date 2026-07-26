import { inspectBuildArtifact, inspectForbiddenRemnants } from './build-artifact.mjs';

const [buildRoot = 'build'] = process.argv.slice(2);
const result = await inspectBuildArtifact(buildRoot);
const remnants = await inspectForbiddenRemnants(buildRoot);
console.log(
  `Verified ${result.requiredFiles.length} files, ${result.requiredDirectories.length} directories, and ${remnants.scanned} scanned files free of ${remnants.forbidden.join(', ')} in ${result.root}`,
);
