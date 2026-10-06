import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const languages = ['th', 'en', 'ja'];
const expectedPages = [
  '_index.md',
  '00-current-preview-workflow.md',
  '01-install-extension-and-compiler.md',
  '02-create-first-project.md',
  '03-workspace-and-manifest.md',
  '04-write-with-language-intelligence.md',
  '05-diagnostics-and-quick-fixes.md',
  '06-navigation-and-refactoring.md',
  '07-modules-and-dependency-paths.md',
  '08-run-build-and-tasks.md',
  '09-test-explorer.md',
  '10-examples-and-tui.md',
  '11-settings-trust-troubleshooting.md',
  '12-daily-workflow-and-limits.md',
];
const expectedScreenshots = [
  '01-toolchain-status.png',
  '02-new-project.png',
  '03-projects-view.png',
  '04-source-intelligence.png',
  '05-diagnostics.png',
  '06-navigation-rename.png',
  '07-module-dependency.png',
  '08-run-build-tasks.png',
  '09-test-explorer.png',
  '10-examples.png',
];
const failures = [];
const wanted = [...expectedPages].sort();
const currentExtension = JSON.parse(await readFile(path.join(root, 'src/static/extension-update.json'), 'utf8'));
const compilerRelease = JSON.parse(await readFile(path.join(root, 'src/static/compiler-release.json'), 'utf8'));

for (const language of languages) {
  const sourceRoot = path.join(root, 'src', 'content', language, 'books', 'w-basic-extension');
  const outputRoot = path.join(root, 'html', language, 'books', 'w-basic-extension');
  const sourceEntries = await readdir(sourceRoot);
  const markdown = sourceEntries.filter((entry) => entry.endsWith('.md')).sort();
  if (JSON.stringify(markdown) !== JSON.stringify(wanted)) {
    failures.push(`${language}: expected ${wanted.length} guide Markdown pages; found ${markdown.length}: ${markdown.join(', ')}`);
  }

  const sourceText = (await Promise.all(expectedPages.map(async (page) => {
    const file = path.join(sourceRoot, page);
    try {
      const text = await readFile(file, 'utf8');
      for (const version of [currentExtension.extensionVersion, compilerRelease.extensionVersion]) {
        if (!text.includes(version)) failures.push(`${language}/${page}: missing local/bundled extension identity ${version}`);
      }
      return text;
    } catch (error) {
      failures.push(`${language}: missing source page ${page}: ${error.message}`);
      return '';
    }
  }))).join('\n');

  for (const screenshot of expectedScreenshots) {
    const marker = `name="${screenshot}"`;
    if (!sourceText.includes(marker)) failures.push(`${language}: missing screenshot slot ${screenshot}`);
  }

  for (const page of expectedPages) {
    const slug = page === '_index.md' ? '' : page.replace(/\.md$/, '');
    const output = path.join(outputRoot, slug, 'index.html');
    try {
      await access(output);
    } catch {
      failures.push(`${language}: missing generated page ${path.relative(root, output)}`);
    }
  }

  const generatedText = (await Promise.all(expectedPages.map(async (page) => {
    const slug = page === '_index.md' ? '' : page.replace(/\.md$/, '');
    const output = path.join(outputRoot, slug, 'index.html');
    try {
      return await readFile(output, 'utf8');
    } catch {
      return '';
    }
  }))).join('\n');

  for (const screenshot of expectedScreenshots) {
    if (!generatedText.includes(screenshot)) {
      failures.push(`${language}: generated guide does not expose image or placeholder ${screenshot}`);
    }
  }

  if (!generatedText.includes('guide-screenshot-placeholder') && !generatedText.includes('/images/w-basic-extension/')) {
    failures.push(`${language}: generated guide contains neither screenshot placeholders nor real guide images`);
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exit(1);
}

console.log(`PASS: ${expectedPages.length} paired guide pages and ${expectedScreenshots.length} replaceable screenshot slots per language are present in source and generated HTML.`);
