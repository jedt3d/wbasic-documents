import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const allowed = new Set(['git@github.com:jedt3d/wbasic-documents.git', 'https://github.com/jedt3d/wbasic-documents.git']);
assert.ok(allowed.has(git(['remote', 'get-url', '--push', 'origin'])), 'only the documentation remote may be published');
assert.equal(git(['status', '--porcelain']), '', 'build and commit all documentation changes before publishing');
const { version } = JSON.parse(fs.readFileSync(path.join(root, 'src/static/version.json'), 'utf8'));
assert.match(version, /^docs-v\d{4}\.\d{2}\.\d{2}\.[1-9]\d*$/);
for (const script of ['verify-source.mjs', 'verify-site.mjs', 'verify-small-projects-site.mjs', 'verify-english-edition.mjs', 'verify-release.mjs', 'verify-extension-guide.mjs']) {
  execFileSync(process.execPath, [script], { cwd: root, stdio: 'inherit' });
}
git(['fetch', 'origin', 'main', '--tags']);
git(['merge-base', '--is-ancestor', 'origin/main', 'HEAD']);
const head = git(['rev-parse', 'HEAD']);
assert.notEqual(head, git(['rev-parse', 'origin/main']), 'there is no new commit to publish');
assert.equal(git(['ls-remote', '--tags', 'origin', `refs/tags/${version}`]), '', 'choose a new version; published tags are immutable');
const exists = spawnSync('git', ['show-ref', '--verify', '--quiet', `refs/tags/${version}`], { cwd: root }).status === 0;
if (!exists) git(['tag', '-a', version, '-m', `WBasic documentation ${version}`]);
execFileSync(process.execPath, ['verify-release.mjs', '--tag'], { cwd: root, stdio: 'inherit' });
// One atomic push publishes only this repository's main and this exact tag.
execFileSync('git', ['push', '--atomic', 'origin', 'HEAD:refs/heads/main', `refs/tags/${version}:refs/tags/${version}`], { cwd: root, stdio: 'inherit' });
console.log(`Pushed ${version} at ${head}. Wait for GitHub Pages, then verify version.json and deployment.json on the live site.`);
