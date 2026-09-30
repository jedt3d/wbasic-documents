import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const roots = ['README.md', 'AGENTS.md', 'src', 'archived', 'design-system'];
const failures = [];
let markdownCount = 0;
let localLinkCount = 0;

async function filesUnder(candidate) {
  const absolute = path.join(root, candidate);
  const info = await stat(absolute);
  if (!info.isDirectory()) return [absolute];
  const result = [];
  for (const entry of await readdir(absolute)) {
    result.push(...await filesUnder(path.join(candidate, entry)));
  }
  return result;
}

function decodeTarget(value) {
  const target = value.split('#', 1)[0].split('?', 1)[0];
  if (!target) return null;
  try {
    return decodeURIComponent(target.replace(/^<|>$/g, ''));
  } catch {
    return target;
  }
}

for (const candidate of roots) {
  for (const file of await filesUnder(candidate)) {
    if (!file.endsWith('.md')) continue;
    markdownCount += 1;
    let text;
    try {
      const bytes = await readFile(file);
      text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch (error) {
      failures.push(`${path.relative(root, file)} is not valid UTF-8: ${error.message}`);
      continue;
    }

    const fences = text.match(/^```/gm)?.length ?? 0;
    if (fences % 2 !== 0) failures.push(`${path.relative(root, file)} has an unclosed fenced block`);

    for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const value = match[1].trim();
      if (/^(?:https?:|mailto:|#)/i.test(value) || value.includes('{{<')) continue;
      const target = decodeTarget(value);
      if (!target) continue;
      localLinkCount += 1;
      const resolved = path.resolve(path.dirname(file), target);
      try {
        await stat(resolved);
      } catch {
        failures.push(`${path.relative(root, file)} has missing local link ${value}`);
      }
    }
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exit(1);
}

console.log(`PASS: ${markdownCount} Markdown files are UTF-8 with balanced fences and ${localLinkCount} valid local links.`);
