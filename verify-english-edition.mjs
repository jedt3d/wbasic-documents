import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function markdowns(directory, prefix = '') {
  return fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? markdowns(`${directory}/${entry.name}`, `${prefix}${entry.name}/`)
      : entry.name.endsWith('.md') ? [`${prefix}${entry.name}`] : []);
}
const thai = markdowns('src/content/th').sort();
const english = markdowns('src/content/en').sort();
const thaiOnlyPrefixes = ['books/w-basic-extension/'];
const thaiOnly = thai.filter(relative => thaiOnlyPrefixes.some(prefix => relative.startsWith(prefix)));
const pairedThai = thai.filter(relative => !thaiOnlyPrefixes.some(prefix => relative.startsWith(prefix)));
assert.deepEqual(english, pairedThai,
  'every current page outside an explicitly Thai-first book has a corresponding English page');
assert.equal(thaiOnly.length, 13, 'the Thai-first WBasic Extension Guide has its complete 12 chapters and index');
const fences = text => [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map(match => match[0]);
let translated = 0;
for (const relative of pairedThai) {
  const th = read(`src/content/th/${relative}`);
  const en = read(`src/content/en/${relative}`);
  assert.doesNotMatch(en, /@@FENCE\d+@@/, `${relative}: no temporary authoring tokens`);
  if (!relative.startsWith('books/getting-started/')) {
    translated++;
    assert.deepEqual(fences(en), fences(th), `${relative}: unchanged code and expected-output fences`);
    assert.equal(/^weight: (.+)$/m.exec(en)?.[1], /^weight: (.+)$/m.exec(th)?.[1], `${relative}: ordering parity`);
    const prose = en.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '').replace(/`[^`]+`/g, '');
    assert.doesNotMatch(prose, /[\u0e00-\u0e7f]/, `${relative}: no untranslated Thai prose`);
  }
  if (/books\/small-wbasic-projects\/\d\d-/.test(relative)) {
    assert.ok(en.indexOf('project-download') > 0 && en.indexOf('project-download') < en.indexOf('\n## '), `${relative}: download at chapter start`);
    const slugs = text => [...text.matchAll(/{{< project-(?:download|source) [^\n]+/g)].map(match => match[0]);
    assert.deepEqual(slugs(en), slugs(th), `${relative}: shared source/download references`);
  }
  const route = relative.endsWith('_index.md') ? relative.slice(0, -9) : `${relative.slice(0, -3)}/`;
  const page = read(`html/en/${route}index.html`);
  for (const match of page.matchAll(/\b(?:href|src)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    const url = match[1] ?? match[2] ?? match[3];
    if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) continue;
    const clean = decodeURIComponent(url.split(/[?#]/)[0]);
    if (!clean) continue;
    const target = clean.startsWith('/wbasic-documents/')
      ? path.join(root, 'html', clean.slice('/wbasic-documents/'.length))
      : path.resolve(root, `html/en/${route}`, clean);
    assert.ok(fs.existsSync(target), `${relative}: rendered target ${url} exists`);
    if (fs.statSync(target).isDirectory()) assert.ok(fs.existsSync(path.join(target, 'index.html')), `${url}: directory index exists`);
  }
  const select = /<select[^>]*data-language-switcher[^>]*>([\s\S]*?)<\/select>/.exec(page)?.[1];
  assert.ok(select, `${relative}: language selector exists`);
  assert.ok(select.includes(`/th/${route}`), `${relative}: switch language at the same chapter`);
}
const downloads = 'src/static/downloads/small-wbasic-projects';
let plans = 0;
for (const slug of fs.readdirSync(path.join(root, downloads))) {
  if (!fs.existsSync(path.join(root, downloads, slug, 'PLAN.md'))) continue;
  plans++;
  const plan = read(`${downloads}/${slug}/PLAN.en.md`);
  assert.doesNotMatch(plan, /[\u0e00-\u0e7f]/, `${slug}: English plan`);
  assert.match(plan, /Al Sweigart/);
  assert.match(plan, /https:\/\/inventwithpython.com\/bigbookpython\/project\d+\.html/);
  const page = read(`html/en/books/small-wbasic-projects/${slug}/index.html`);
  assert.ok(page.includes(`/${slug}/PLAN.en.md`), `${slug}: English plan download`);
  assert.equal(read(`html/downloads/small-wbasic-projects/${slug}/PLAN.en.md`), plan);
}
assert.equal(plans, 52);
const evidence = JSON.parse(read('evidence/small-projects-windows.json'));
assert.equal(evidence.examples.length, 29);
for (const example of evidence.examples) {
  // Recorded fixtures use LF; normalize checkout line endings on Windows.
  const source = read(`${downloads}/${example.slug}/main.wbas`);
  assert.equal(hash(source), example.source_sha256, `${example.slug}: source matches prior native evidence`);
  const chapter = read(`src/content/en/books/small-wbasic-projects/${example.slug}.md`);
  const expected = /```text\n([\s\S]*?)```/.exec(chapter)?.[1];
  const output = fs.existsSync(path.join(root, downloads, example.slug, 'expected-output.txt'))
    ? read(`${downloads}/${example.slug}/expected-output.txt`) : expected;
  assert.equal(hash(output), example.expected_sha256, `${example.slug}: output matches prior native evidence`);
  if (expected !== undefined) assert.equal(expected, output);
  const page = read(`html/en/books/small-wbasic-projects/${example.slug}/index.html`);
  assert.ok(page.includes(`/${example.slug}/main.wbas`), `${example.slug}: shared source download`);
}
const roadmap = read('src/content/en/books/small-wbasic-projects/project-roadmap.md');
assert.equal((roadmap.match(/\| Core language \|/g) ?? []).length, 29);
assert.equal((roadmap.match(/\| Verification needed \|/g) ?? []).length, 47);
assert.equal((roadmap.match(/\| Missing API \|/g) ?? []).length, 5);
const thSearch = JSON.parse(read('html/th/index.json'));
const enSearch = JSON.parse(read('html/en/index.json'));
const pairedThaiSearch = thSearch.filter(item => !item.url.includes('/th/books/w-basic-extension/'));
assert.equal(enSearch.length, pairedThaiSearch.length, 'English search coverage matches the paired Thai edition');
assert.deepEqual(enSearch.map(item => item.url.replace('/en/', '/th/')).sort(),
  pairedThaiSearch.map(item => item.url).sort(), 'search indexes contain corresponding paired pages');
console.log(`PASS: ${english.length} paired pages; ${thaiOnly.length} Thai-first guide pages; ${translated} translation code/weight/prose checks; ${plans} English plans; 29 native-evidence source/output hashes; same-chapter language switching.`);
