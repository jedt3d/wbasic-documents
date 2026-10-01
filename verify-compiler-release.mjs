import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'src/static/compiler-release.json'), 'utf8'));
assert.equal(release.schemaVersion, 1);
assert.equal(release.channel, 'private-experimental');
assert.match(release.compilerVersion, /^0\.\d+\.\d+$/);
assert.equal(release.runtimeVersion, release.compilerVersion);
assert.equal(release.tag, `v${release.compilerVersion}`);
assert.equal(release.status, 'Published');
assert.match(release.extensionVersion, /^\d+\.\d+\.\d+$/);
assert.match(release.protocolVersion, /^\d+\.\d+\.\d+$/);
const website = JSON.parse(fs.readFileSync(path.join(root, 'src/static/version.json'), 'utf8'));
assert.equal(website.compilerVersion, release.compilerVersion);
assert.equal(website.runtimeVersion, release.runtimeVersion);
assert.equal(website.extensionVersion, release.extensionVersion);
assert.equal(website.compilerSourceRevision, release.sourceRevision);
assert.match(release.sourceRevision, /^[a-f0-9]{40}$/);
assert.equal(release.releaseUrl, `https://github.com/jedt3d/wbasic-language/releases/tag/${release.tag}`);
assert.equal(release.productionRelease, false);
assert.equal(release.noSdkDistribution, false);
assert.deepEqual(release.assets.map(a => a.target).sort(), ['aarch64-apple-darwin', 'aarch64-pc-windows-msvc']);
for (const asset of release.assets) {
  assert.match(asset.sha256, /^[a-f0-9]{64}$/);
  assert.ok(asset.bytes > 0);
  assert.ok(asset.name.startsWith(`wbasic-${release.compilerVersion}-`) && asset.name.endsWith('.zip'));
}
for (const language of ['th', 'en']) {
  const content = path.join(root, 'src/content', language);
  for (const relative of ['books/getting-started/02-create-billing-time-project.md', 'books/language-reference/12-modules-packages-visibility.md', 'books/w-basic-extension/03-workspace-and-manifest.md', 'books/w-basic-extension/07-modules-and-dependency-paths.md']) {
    const text = fs.readFileSync(path.join(content, relative), 'utf8');
    const pins = [...text.matchAll(/toolchain\s*=\s*"([^"\n]+)"/g)];
    assert.ok(pins.length > 0, `${language}/${relative}: missing example pin`);
    for (const pin of pins) assert.equal(pin[1], release.compilerVersion, `${language}/${relative}: stale toolchain pin`);
  }
  const guide = fs.readFileSync(path.join(content, 'books/w-basic-extension/00-current-preview-workflow.md'), 'utf8');
  assert.ok(guide.includes(release.releaseUrl));
  assert.ok(guide.includes(release.extensionVersion));
}
const generated = JSON.parse(fs.readFileSync(path.join(root, 'html/compiler-release.json'), 'utf8'));
assert.deepEqual(generated, release, 'generated compiler release manifest is stale');
console.log(`PASS: compiler/runtime ${release.compilerVersion}, Extension ${release.extensionVersion}; bilingual current pins and release identity.`);
