import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const documentsRoot = path.dirname(fileURLToPath(import.meta.url));
const outputRoot = path.join(documentsRoot, 'html');
const failures = [];

async function filesUnder(directory) {
  const result = [];
  for (const entry of await readdir(directory)) {
    const full = path.join(directory, entry);
    if ((await stat(full)).isDirectory()) result.push(...await filesUnder(full));
    else result.push(full);
  }
  return result;
}

function localTarget(page, value) {
  if (!value || /^(?:[a-z]+:|#|\/\/)/i.test(value)) return null;
  const withoutFragment = value.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment) return null;
  return path.resolve(path.dirname(page), decodeURIComponent(withoutFragment));
}

const files = await filesUnder(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
for (const required of ['en/index.html', 'th/index.html', 'en/index.json', 'th/index.json']) {
  if (!files.includes(path.join(outputRoot, ...required.split('/')))) failures.push(`missing ${required}`);
}

const thaiReferencePages = [
  ...[
    '01-a-wbasic-program',
    '02-source-text-names-literals-layout',
    '03-types-declarations-conversions',
    '04-expressions-operators-equality',
    '05-control-flow',
    '06-procedures-parameters',
    '07-structures-value-semantics',
    '08-null-safety',
    '09-collections-unicode-strings',
    '10-errors-resource-lifetime',
    '11-enum-flags',
    '12-modules-packages-visibility',
    '13-entry-tools-diagnostics'
  ].map((slug) => `th/books/language-reference/${slug}/index.html`),
  ...['core-io', 'streams-and-text', 'file-and-memory', 'json', 'http', 'sqlite', 'csv']
    .map((slug) => `th/books/standard-library/${slug}/index.html`),
  ...['tui-model-loop', 'layout-navigation-forms', 'data-and-rich-output', 'jobs', 'testing-and-doctor', 'terminal-lifecycle']
    .map((slug) => `th/books/api-reference/${slug}/index.html`)
];
for (const required of thaiReferencePages) {
  if (!files.includes(path.join(outputRoot, ...required.split('/')))) failures.push(`missing current Thai reference page ${required}`);
}

const thaiEditorialPages = [
  ...['01-introduction', '02-language-colors', '03-language-type']
    .map((slug) => `th/books/design-identity/${slug}/index.html`),
  ...[
    '01-billing-time-project-structure',
    '02-billing-time-key-concepts',
    '03-billing-time-models',
    '04-billing-time-schema-and-seed',
    '05-billing-time-log-time',
    '06-billing-time-invoice-transaction',
    '07-billing-time-tests-and-next-steps'
  ].map((slug) => `th/books/tutorials/${slug}/index.html`)
];
for (const required of thaiEditorialPages) {
  if (!files.includes(path.join(outputRoot, ...required.split('/')))) failures.push(`missing Thai editorial page ${required}`);
}

for (const required of [
  'fonts/ibm-plex-sans-400-normal.ttf',
  'fonts/ibm-plex-sans-thai-regular.ttf',
  'fonts/ibm-plex-sans-thai-looped-400-normal.woff2',
  'fonts/ibm-plex-sans-thai-looped-600-normal.woff2',
  'fonts/ibm-plex-sans-thai-looped-700-normal.woff2',
  'fonts/ibm-plex-mono-400-normal.ttf',
  'licenses/ibm-plex-sans-OFL.txt',
  'licenses/ibm-plex-sans-thai-looped-OFL.txt',
  'licenses/ibm-plex-mono-OFL.txt'
]) {
  if (!files.includes(path.join(outputRoot, ...required.split('/')))) failures.push(`missing theme asset ${required}`);
}

const cssText = (await Promise.all(files.filter((file) => file.endsWith('.css')).map((file) => readFile(file, 'utf8')))).join('\n');
for (const marker of ['#26343d', '#237f83', '#f3f6f4', 'IBM Plex Sans', 'IBM Plex Sans Thai Looped', 'U+E00-E7F', 'IBM Plex Mono', 'tok-keyword', '.identity-palette']) {
  if (!cssText.includes(marker)) failures.push(`generated CSS lacks ${marker}`);
}
const jsText = (await Promise.all(files.filter((file) => file.endsWith('.js')).map((file) => readFile(file, 'utf8')))).join('\n');
for (const marker of ['tok-keyword', 'tok-string', 'tok-number', 'language-basic']) {
  if (!jsText.includes(marker)) failures.push(`generated JavaScript lacks ${marker}`);
}
if (files.some((file) => file.endsWith('images/wbasic-mark.svg'))) failures.push('retired logo asset remains in generated site');

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(outputRoot, file).replaceAll('\\', '/');
  if (relative.startsWith('en/') || relative.startsWith('th/')) {
    for (const marker of ['data-theme-toggle', 'data-language-switcher', 'data-search-dialog', 'data-book-navigation']) {
      if (!html.includes(marker)) failures.push(`${relative} lacks ${marker}`);
    }
    if (!html.includes('class=wb')) failures.push(`${relative} does not use the default Wbasic theme body class`);
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = localTarget(file, match[1]);
    if (!target) continue;
    let resolved = target;
    try {
      if ((await stat(resolved)).isDirectory()) resolved = path.join(resolved, 'index.html');
      await stat(resolved);
    } catch {
      failures.push(`${path.relative(outputRoot, file)} has missing target ${match[1]}`);
    }
  }
}

const firstChapter = await readFile(path.join(outputRoot, 'th', 'books', 'language-reference', '01-a-wbasic-program', 'index.html'), 'utf8');
if (!firstChapter.includes('language-basic')) failures.push('first language chapter lacks a WBasic-highlightable code block');
const identityColors = await readFile(path.join(outputRoot, 'th', 'books', 'design-identity', '02-language-colors', 'index.html'), 'utf8');
if (!identityColors.includes('data-identity-palette')) failures.push('identity color chapter lacks its palette specimen');
const tutorialTransaction = await readFile(path.join(outputRoot, 'th', 'books', 'tutorials', '06-billing-time-invoice-transaction', 'index.html'), 'utf8');
if (!tutorialTransaction.includes('language-basic')) failures.push('billing-time walkthrough lacks WBasic-highlightable code');

for (const language of ['en', 'th']) {
  const index = JSON.parse(await readFile(path.join(outputRoot, language, 'index.json'), 'utf8'));
  const minimum = language === 'th' ? thaiReferencePages.length + thaiEditorialPages.length : 0;
  if (!Array.isArray(index) || index.length < minimum) failures.push(`${language}/index.json has too few searchable pages`);
  for (const item of index) {
    if (!item.title || !item.url || typeof item.summary !== 'string') failures.push(`${language}/index.json has a malformed item`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exit(1);
}
console.log(`PASS: ${htmlFiles.length} generated HTML pages, bilingual search indexes, UI markers, and local asset links.`);
