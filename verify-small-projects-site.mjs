import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const outputRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'html');
const source = path.join(root, 'src/content/th/books/small-wbasic-projects');
const downloads = path.join(root, 'src/static/downloads/small-wbasic-projects');
const generated = path.join(outputRoot, 'th/books/small-wbasic-projects');
const chapters = fs.readdirSync(source).filter(name => /^\d\d-.*\.md$/.test(name));
assert.equal(chapters.length, 81, 'one chapter for every source project');
assert.deepEqual(chapters.map(name => Number(name.slice(0, 2))).sort((a, b) => a - b), Array.from({ length: 81 }, (_, i) => i + 1));
let runnable = 0;
let planned = 0;
for (const name of chapters) {
  const slug = name.slice(0, -3);
  const markdown = fs.readFileSync(path.join(source, name), 'utf8');
  assert.match(markdown, new RegExp(`project-download "${slug}"`), `${slug}: download at chapter start`);
  assert.ok(markdown.indexOf('project-download') < markdown.indexOf('\n## '), `${slug}: download precedes tutorial sections`);
  const page = fs.readFileSync(path.join(generated, slug, 'index.html'), 'utf8');
  const link = /class=\"?project-download\"?[^>]*>\s*<a[^>]*href=(?:"([^"]+)"|([^ >]+))/.exec(page);
  assert.ok(link, `${slug}: rendered download anchor`);
  const href = link[1] || link[2];
  const target = href.startsWith('/wbasic-documents/')
    ? path.join(outputRoot, href.slice('/wbasic-documents/'.length))
    : path.resolve(generated, slug, href);
  assert.ok(fs.existsSync(target), `${slug}: download exists in built site`);
  const hasSource = fs.existsSync(path.join(downloads, slug, 'main.wbas'));
  if (hasSource) {
    runnable++;
    assert.match(markdown, /project-source/, `${slug}: source displayed from download`);
    assert.ok(target.endsWith('main.wbas'));
    assert.equal(fs.readFileSync(target, 'utf8'), fs.readFileSync(path.join(downloads, slug, 'main.wbas'), 'utf8'));
  } else {
    planned++;
    assert.ok(target.endsWith('PLAN.md'), `${slug}: no counterfeit source for placeholder`);
    assert.match(markdown, /[Pp]laceholder|รอ|แผน/);
  }
}
assert.equal(runnable, 29);
assert.equal(planned, 52);
const intro = fs.readFileSync(path.join(generated, 'index.html'), 'utf8');
assert.match(intro, /Al Sweigart/);
assert.match(intro, /https:\/\/inventwithpython.com\/bigbookpython\//);
const books = [...intro.matchAll(/class=(?:"book-title[^\"]*"|book-title)[^>]*href=(?:"([^"]+)"|([^ >]+))/g)].map(match => match[1] || match[2]);
assert.ok(books.length > 1, 'book navigation found');
assert.ok(books[0].includes('/getting-started/'), 'Getting Started is first');
assert.ok(books[1].includes('/small-wbasic-projects/'), 'Small Wbasic Projects is second');
console.log(`PASS: 81 project chapters; ${runnable} source downloads; ${planned} explicit plans; attribution; second-book navigation.`);
