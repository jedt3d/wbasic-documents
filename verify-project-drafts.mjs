import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const evidence = JSON.parse(read('evidence/small-projects-drafts-source-check.json'));
const prior = JSON.parse(read('evidence/small-projects-windows.json'));
assert.equal(evidence.compilerSha256, prior.compiler_sha256);
assert.equal(evidence.cases.length, 3);
assert.deepEqual(JSON.parse(read('src/static/downloads/small-wbasic-projects/_evidence/drafts-source-check.json')), evidence);
for (const slug of ['08-calendar-maker', '13-conway-s-game-of-life', '73-sudoku-puzzle']) {
  const directory = `src/static/downloads/small-wbasic-projects/${slug}`;
  assert.ok(!fs.existsSync(path.join(root, directory, 'main.wbas')), `${slug}: no counterfeit runnable source`);
  const draft = read(`${directory}/draft.wbas.txt`);
  const check = evidence.cases.find(item => item.slug === slug);
  assert.ok(check);
  assert.equal(crypto.createHash('sha256').update(draft).digest('hex'), check.sourceSha256, `${slug}: draft matches source-check evidence`);
  assert.equal(check.exitCode, 0);
  assert.equal(check.accepted, true);
  assert.deepEqual(check.diagnostics, []);
  assert.ok(draft.includes('Procedure Main()'), `${slug}: complete core sketch`);
  assert.equal(read(`html/downloads/small-wbasic-projects/${slug}/draft.wbas.txt`), draft);
  for (const language of ['th', 'en']) {
    const chapter = read(`src/content/${language}/books/small-wbasic-projects/${slug}.md`);
    const blocks = [...chapter.matchAll(/```basic\n([\s\S]*?)```/g)].map(match => match[1]);
    assert.ok(blocks.includes(draft), `${slug}/${language}: displayed draft equals download`);
    assert.ok(chapter.includes(`project-download "${slug}" "draft.wbas.txt"`));
    assert.ok(chapter.indexOf('draft.wbas.txt') < chapter.indexOf('\n## '));
    assert.match(chapter, language === 'th' ? /ร่าง/ : /[Dd]raft/);
    assert.ok(read(`${directory}/${language === 'th' ? 'PLAN.md' : 'PLAN.en.md'}`).includes('draft.wbas.txt'));
    assert.ok(read(`html/${language}/books/small-wbasic-projects/${slug}/index.html`).includes(`/${slug}/draft.wbas.txt`));
  }
}
console.log('PASS: 3 explicit drafts; bilingual displayed/downloaded code parity; no runnable-example promotion. Not native execution evidence.');
