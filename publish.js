//
// https://newbedev.com/how-to-publish-an-npm-package-from-the-ci-build-pipeline-and-still-automate-versioning
//

const cp = require('child_process');

// get current semver version without prerelease suffix
const pkg = require('./dist/yti-common-ui/package.json');
const curVer = pkg.version.trim().split(/[.-]/).slice(0, 3).join('.');

const dateString = (new Date).toISOString('en-US')
  .substring(0, 10)
  .replace(/-/g, '');

const commit = cp.execSync('git rev-parse --short HEAD', {encoding: 'utf-8'}).trim();
let branch = cp.execSync('git rev-parse --abbrev-ref HEAD', {encoding: 'utf-8'}).trim();
branch = branch.replace('/', '-'); // feature/foo -> feature-foo

const meta =
  branch === 'prod' ? '' :
  branch === 'dev' ? `-beta+${dateString}.g${commit}` :
  `-alpha-${dateString}.g${commit}.${branch}`;
// -alpha- instead of -alpha+ because publish would cut everything after +

console.log(`Package: ${pkg.name}, version: ${curVer}, commit: ${commit}, branch: ${branch}`);

// 0.0.1
// 0.0.1-beta+20210906.ebaf822d
// 0.0.1-alpha+20210906.ebaf822d.wip-branch
const uniqueVer = `${curVer}${meta}`;

console.log('Generated version number: ' + uniqueVer);

process.chdir('./dist/yti-common-ui');

// use npm version to update package.json
cp.execSync(
  `npm version ${uniqueVer} --no-git-tag-version --allow-same-version`,
  { stdio: 'inherit' });

// publish and tag with commit id
cp.execSync(`npm publish --access public --tag ${commit}`, {stdio: 'inherit'});
