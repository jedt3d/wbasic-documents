import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8').replace(/\r\n/g, '\n');
const files = directory => fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? files(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);
const pages = language => files(`src/content/${language}`).filter(file => file.endsWith('.md'))
  .map(file => file.slice(`src/content/${language}/`.length)).sort();
const english = pages('en');
assert.deepEqual(pages('ja'), english, 'every current English page needs a Japanese translation');
const fences = text => [...text.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)].map(match => match[0]);
const shortcodes = text => [...text.matchAll(/{{<\s*([\w-]+)\s*([^]*?)>}}/g)].map(match => {
  // Screenshot captions and alt text are prose; their filenames are shared.
  return match[1] === 'guide-screenshot'
    ? [match[1], /name="([^"]+)"/.exec(match[2])?.[1]]
    : [match[1], match[2].trim()];
});
const route = file => file.endsWith('_index.md') ? file.slice(0, -9) : `${file.slice(0, -3)}/`;
const japanese = /[\u3040-\u30ff\u3400-\u9fff]/;
function checkTranslatedParagraphs(text, label) {
  const prose = text.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '')
    .replace(/{{<[^]*?>}}/g, '').replace(/`[^`]+`/g, '').replace(/https?:\/\/\S+/g, '');
  for (const paragraph of prose.split(/\n\s*\n/)) {
    // Short commands, identifiers, proper names and source URLs are shared.
    if ((paragraph.match(/[A-Za-z]/g) ?? []).length < 60) continue;
    assert.ok(japanese.test(paragraph), `${label}: untranslated prose paragraph ${paragraph.slice(0, 90)}`);
  }
}
let codeBlocks = 0;
for (const file of english) {
  const en = read(`src/content/en/${file}`);
  const ja = read(`src/content/ja/${file}`);
  assert.deepEqual(fences(ja), fences(en), `${file}: source code and expected output must not change`);
  codeBlocks += fences(en).length;
  assert.deepEqual(shortcodes(ja), shortcodes(en), `${file}: shared links, downloads and source references`);
  assert.equal(/^weight: (.+)$/m.exec(ja)?.[1], /^weight: (.+)$/m.exec(en)?.[1], `${file}: chapter ordering`);
  const keys = text => [...(/^---\n([^]*?)\n---/.exec(text)?.[1] ?? '').matchAll(/^([\w-]+):/gm)].map(match => match[1]).sort();
  assert.deepEqual(keys(ja), keys(en), `${file}: frontmatter keys are configuration, not translated prose`);
  const inline = text => [...text.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '').matchAll(/`([^`\n]+)`/g)].map(match => match[1]);
  const translatedTokens = new Set(inline(ja));
  for (const token of inline(en)) {
    const localized = token === 'PLAN.en.md' ? 'PLAN.ja.md' : token;
    assert.ok(translatedTokens.has(localized), `${file}: missing source/API token ${localized}`);
  }
  assert.ok(japanese.test(/^title: (.+)$/m.exec(ja)?.[1] ?? ''), `${file}: Japanese title`);
  const prose = ja.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '').replace(/`[^`]+`/g, '').replace(/{{<[^]*?>}}/g, '');
  assert.doesNotMatch(prose, /[\u0e00-\u0e7f]/, `${file}: untranslated Thai prose`);
  assert.doesNotMatch(ja, /@@(?:CODE|VERSION|FENCE)\d*@@/, `${file}: temporary authoring token`);
  checkTranslatedParagraphs(ja, file);
  for (const heading of prose.matchAll(/^#{1,6}\s+(.+)$/gm)) {
    assert.ok(japanese.test(heading[1]), `${file}: untranslated heading ${heading[1]}`);
  }
  for (const language of ['th', 'en', 'ja']) {
    const html = read(`html/${language}/${route(file)}index.html`);
    if (language === 'ja') assert.match(html, /<html\b[^>]*lang=(?:"ja-JP"|ja-JP)/);
    const selector = /<select[^>]*data-language-switcher[^>]*>([^]*?)<\/select>/.exec(html)?.[1];
    assert.ok(selector, `${language}/${file}: language switcher`);
    const destinations = [...selector.matchAll(/\bvalue=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
      .map(match => match[1] ?? match[2] ?? match[3]);
    for (const target of ['th', 'en', 'ja']) {
      assert.ok(destinations.includes(`/wbasic-documents/${target}/${route(file)}`), `${language}/${file}: same chapter in ${target}`);
    }
  }
}
const plans = files('src/static/downloads/small-wbasic-projects').filter(file => file.endsWith('/PLAN.en.md'));
assert.equal(plans.length, 52, 'existing planned lessons remain planned');
for (const file of plans) {
  const translated = file.replace('/PLAN.en.md', '/PLAN.ja.md');
  const text = read(translated);
  assert.ok(japanese.test(text));
  assert.doesNotMatch(text, /[\u0e00-\u0e7f]/);
  assert.match(text, /Al Sweigart/);
  assert.match(text, /https:\/\/inventwithpython.com\/bigbookpython\/project\d+\.html/);
  checkTranslatedParagraphs(text, translated);
  assert.equal(read(translated.replace('src/static/', 'html/')), text, `${file}: generated plan matches source`);
  const slug = path.basename(path.dirname(file));
  assert.ok(read(`html/ja/books/small-wbasic-projects/${slug}/index.html`).includes(`/${slug}/PLAN.ja.md`), `${slug}: Japanese plan download`);
}
const roadmapRows = text => text.split('\n').filter(line => /^\| \d+ \|/.test(line)).map(line => line.split('|')[3].trim());
const states = { 'Core language': '言語の基本機能', 'Verification needed': '検証待ち', 'Missing API': '不足しているAPI' };
const expectedStates = roadmapRows(read('src/content/en/books/small-wbasic-projects/project-roadmap.md'));
assert.equal(expectedStates.length, 81);
assert.deepEqual(roadmapRows(read('src/content/ja/books/small-wbasic-projects/project-roadmap.md')),
  expectedStates.map(state => { assert.ok(states[state], `unmapped status ${state}`); return states[state]; }),
  'each project keeps its precise implementation/verification status');
assert.deepEqual(Object.keys(states).map(state => expectedStates.filter(item => item === state).length), [29, 47, 5]);
const index = language => JSON.parse(read(`html/${language}/index.json`));
const normalized = (language, entries) => entries.map(entry => entry.url.replace(`/${language}/`, '/LANG/')).sort();
assert.deepEqual(normalized('ja', index('ja')), normalized('en', index('en')), 'Japanese search covers every translated page');
assert.ok(index('ja').some(entry => entry.title.includes('言語')));
console.log(`PASS: ${english.length} Japanese pages; ${codeBlocks} unchanged code/output blocks; ${plans.length} translated plans; TH/EN/JA same-chapter navigation and search coverage.`);
