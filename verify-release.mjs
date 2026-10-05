import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const release = JSON.parse(fs.readFileSync(path.join(root, 'src/static/version.json'), 'utf8'));
assert.match(release.version, /^docs-v\d{4}\.\d{2}\.\d{2}\.[1-9]\d*$/);
assert.equal(release.copyrightOwner, 'Worajedt Sitthidumrong');
assert.equal(release.copyrightYear, 2026);
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (process.argv.includes('--tag')) {
  const head = git(['rev-parse', 'HEAD']);
  const tagged = git(['rev-parse', `refs/tags/${release.version}^{commit}`]);
  assert.equal(tagged, head, 'release tag must point to the exact publishing commit');
  if (process.env.GITHUB_SHA) assert.equal(head, process.env.GITHUB_SHA);
  if (process.env.GITHUB_REF) assert.equal(process.env.GITHUB_REF, 'refs/heads/main', 'only main may publish');
}
const output = path.join(root, 'html');
assert.deepEqual(JSON.parse(fs.readFileSync(path.join(output, 'version.json'), 'utf8')), release);
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
let checked = 0;
const checkedPages = new Set();
for (const language of ['th', 'en', 'ja']) {
  for (const file of walk(path.join(output, language)).filter(file => file.endsWith('.html'))) {
    const html = fs.readFileSync(file, 'utf8');
    // Hugo's redirect aliases do not contain a document body.
    if (!html.includes('data-language-switcher')) continue;
    const footer = /<footer\b[\s\S]*?<\/footer>/.exec(html)?.[0];
    assert.ok(footer?.includes(release.version), `${file}: visible release version`);
    assert.ok(footer.includes(`https://github.com/jedt3d/wbasic-documents/tree/${release.version}`));
    assert.ok(footer.includes('Copyright © 2026 Worajedt Sitthidumrong.'));
    assert.ok(footer.includes({ en: 'not open-source software', th: 'ไม่ใช่ซอฟต์แวร์โอเพนซอร์ส', ja: 'オープンソースソフトウェアではありません' }[language]));
    assert.ok(footer.includes({ en: 'Third-party materials', th: 'บุคคลที่สาม', ja: '第三者の資料' }[language]));
    checked++;
    checkedPages.add(file);
  }
}
for (const language of ['th', 'en', 'ja']) {
  const contentRoot = path.join(root, 'src/content', language);
  for (const file of walk(contentRoot).filter(file => file.endsWith('.md'))) {
    const relative = path.relative(contentRoot, file).replaceAll('\\', '/');
    const route = relative.endsWith('_index.md') ? relative.slice(0, -9) : `${relative.slice(0, -3)}/`;
    assert.ok(checkedPages.has(path.join(output, language, route, 'index.html')), `${relative}: content page footer verified`);
  }
}
console.log(`PASS: ${release.version}; ${checked} TH/EN/JA version/copyright footers${process.argv.includes('--tag') ? '; exact commit tag' : ''}.`);
