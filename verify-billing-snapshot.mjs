import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const evidence = JSON.parse(fs.readFileSync(path.join(root, 'evidence/billing-time-snapshot-2026-10-06.json'), 'utf8'));
const release = JSON.parse(fs.readFileSync(path.join(root, 'src/static/compiler-release.json'), 'utf8'));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(evidence.status, 'Passed');
assert.equal(evidence.compilerVersion, release.compilerVersion);
assert.equal(evidence.compilerSourceRevision, release.sourceRevision);
assert.equal(evidence.files.length, 10);
function filesUnder(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? filesUnder(path.join(directory, entry.name), `${prefix}${entry.name}/`) : [`${prefix}${entry.name}`]);
}
for (const directory of ['src/static/downloads', 'html/downloads']) {
  const snapshot = path.join(root, directory, 'billing-time');
  assert.deepEqual(filesUnder(snapshot).sort(), evidence.files.map(file => file.path).sort(), 'only the verified ten source/config files are published');
  for (const file of evidence.files) {
    const bytes = fs.readFileSync(path.join(snapshot, file.path));
    assert.equal(bytes.length, file.bytes, `${directory}/${file.path}: size`);
    assert.equal(hash(bytes), file.sha256, `${directory}/${file.path}: source identity`);
  }
  assert.equal(hash(fs.readFileSync(path.join(root, directory, 'billing-time-source.zip'))), evidence.zipSha256, `${directory}: source ZIP identity`);
}
for (const target of ['windows', 'macos']) {
  const native = evidence.native[target].result;
  assert.equal(native.status, 'Passed');
  assert.deepEqual(native.profiles.map(profile => profile.profile), ['debug', 'release']);
  for (const profile of native.profiles) {
    assert.equal(profile.freshInvoiceCents, 18000);
    assert.equal(profile.repeatInvoice, 2);
    assert.equal(profile.invalidArgumentsBeforeDatabase, true);
  }
  assert.equal(native.genericRunWithoutArguments, 'Passed');
  assert.equal(native.explicitDatabaseArgument, 'Passed');
}
console.log('PASS: ten Billing Time source/config files and ZIP match the recorded Windows/macOS ARM64 debug/release evidence; no generated binaries published.');
