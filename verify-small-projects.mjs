import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Run after entering the native Windows ARM64 developer environment.
// This compiles and executes each downloadable source, then compares exact stdout.
const root = path.dirname(fileURLToPath(import.meta.url));
const compilerRoot = process.argv[2];
if (!compilerRoot) throw new Error('Usage: node verify-small-projects.mjs <compiler-checkout>');
const compiler = path.join(compilerRoot, 'target/debug/wb.exe');
const runtime = path.join(compilerRoot, 'target/debug/wb_runtime.lib');
const sources = path.join(root, 'src/static/downloads/small-wbasic-projects');
const artifacts = path.join(root, '.artifacts/small-projects');
fs.mkdirSync(artifacts, { recursive: true });
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 60000, maxBuffer: 4 * 1024 * 1024, ...options });
  if (result.error || result.status !== 0) throw new Error(`${path.basename(command)} ${args[0]}: ${result.error || result.stderr || result.stdout}`);
  return result.stdout.replace(/\r\n/g, '\n');
}
const sha = run('git', ['rev-parse', 'HEAD'], { cwd: compilerRoot }).trim();
if (run('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: compilerRoot }).trim()) {
  throw new Error('Compiler checkout has tracked changes; capture clean compiler provenance first.');
}
const results = [];
for (const slug of fs.readdirSync(sources).sort()) {
  const source = path.join(sources, slug, 'main.wbas');
  if (!fs.existsSync(source)) continue;
  const chapter = fs.readFileSync(path.join(root, 'src/content/th/books/small-wbasic-projects', `${slug}.md`), 'utf8');
  const expectedFile = path.join(sources, slug, 'expected-output.txt');
  const sample = /```text\r?\n([\s\S]*?)```/.exec(chapter)?.[1]?.replace(/\r\n/g, '\n');
  const expected = fs.existsSync(expectedFile) ? fs.readFileSync(expectedFile, 'utf8').replace(/\r\n/g, '\n') : sample;
  if (expected === undefined) throw new Error(`${slug}: missing independently authored expected output`);
  if (sample !== undefined && sample !== expected) throw new Error(`${slug}: chapter output differs from expected-output.txt`);
  const checked = JSON.parse(run(compiler, ['check', source, '--json']));
  if (checked.accepted !== true) throw new Error(`${slug}: source rejected`);
  const dir = path.join(artifacts, slug);
  fs.mkdirSync(dir, { recursive: true });
  const object = path.join(dir, 'program.obj');
  const driver = path.join(dir, 'driver.c');
  const executable = path.join(dir, 'program.exe');
  run(compiler, ['emit-object', source, '--output', object]);
  fs.writeFileSync(driver, 'extern int wb_main(void);\nint main(void) { return wb_main(); }\n');
  run('cl.exe', ['/nologo', '/MD', '/utf-8', '/W4', '/WX', driver, object, runtime,
    'bcrypt.lib', 'advapi32.lib', 'ws2_32.lib', 'userenv.lib', 'user32.lib', 'ntdll.lib',
    'crypt32.lib', 'secur32.lib', 'ncrypt.lib', `/Fo${path.join(dir, 'driver.obj')}`,
    `/Fe${executable}`, '/link', '/INCREMENTAL:NO'], { cwd: dir });
  const bytes = fs.readFileSync(executable);
  const pe = bytes.readUInt32LE(0x3c);
  if (bytes.readUInt32LE(pe) !== 0x4550 || bytes.readUInt16LE(pe + 4) !== 0xaa64) throw new Error(`${slug}: expected ARM64 PE`);
  const inputFile = path.join(sources, slug, 'input.txt');
  const stdout = run(executable, [], { input: fs.existsSync(inputFile) ? fs.readFileSync(inputFile, 'utf8') : '' });
  if (stdout !== expected) throw new Error(`${slug}: output mismatch\nexpected=${JSON.stringify(expected)}\nactual=${JSON.stringify(stdout)}`);
  if (slug === '72-spongecase') {
    const fixture = path.join(dir, 'unicode-boundary.wbas');
    const original = fs.readFileSync(source, 'utf8');
    assertReplacement(original, '"WBasic is fun!"');
    fs.writeFileSync(fixture, original.replace('"WBasic is fun!"', '"KAB"'));
    run(compiler, ['emit-object', fixture, '--output', object]);
    run('cl.exe', ['/nologo', '/MD', '/utf-8', '/W4', '/WX', driver, object, runtime,
      'bcrypt.lib', 'advapi32.lib', 'ws2_32.lib', 'userenv.lib', 'user32.lib', 'ntdll.lib',
      'crypt32.lib', 'secur32.lib', 'ncrypt.lib', `/Fo${path.join(dir, 'driver.obj')}`,
      `/Fe${executable}`, '/link', '/INCREMENTAL:NO'], { cwd: dir });
    if (run(executable, []) !== 'KAB\nKaB\n') throw new Error('72-spongecase: non-ASCII character changed or advanced alternation');
  }
  results.push({ slug, source_sha256: hash(source), expected_sha256: crypto.createHash('sha256').update(expected).digest('hex'), check: 'Passed', pe_machine: '0xAA64', execution: 'Passed', exact_stdout: 'Passed' });
  console.log(`PASS ${slug}: check, ARM64 PE, execution, exact output`);
}
if (results.length !== 29) throw new Error(`Expected 29 source examples, found ${results.length}`);
const evidence = { compiler_sha: sha, compiler_sha256: hash(compiler), runtime_sha256: hash(runtime), host: 'Windows ARM64', node: process.version, examples: results, regressions: [{ chapter: '72-spongecase', case: 'U+212A stays unchanged and does not advance ASCII alternation', status: 'Passed' }], macos: 'Not run for this documentation batch' };
fs.mkdirSync(path.join(root, 'evidence'), { recursive: true });
fs.writeFileSync(path.join(root, 'evidence/small-projects-windows.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(`PASS: ${results.length} independent native examples; evidence/small-projects-windows.json`);

function assertReplacement(text, value) {
  if (!text.includes(value)) throw new Error('Regression fixture source marker missing');
}
