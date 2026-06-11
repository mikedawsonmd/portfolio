import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}

function isExternal(value) {
  return /^(https?:|mailto:|tel:|#)/.test(value);
}

function normalizeHref(href) {
  return href.split('#')[0];
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (_error) {
    return false;
  }
}

await walk(root);
const missing = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const dir = dirname(file);
  const attrs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  const srcsets = [...html.matchAll(/srcset="([^"]+)"/g)].flatMap((match) => match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));

  for (const raw of [...attrs, ...srcsets]) {
    const value = normalizeHref(raw);
    if (!value || isExternal(value) || value.startsWith('data:')) continue;
    const target = value.endsWith('/') ? join(dir, value, 'index.html') : join(dir, value);
    const candidate = normalize(target);
    if (!(await exists(candidate))) missing.push({ from: file.replace(`${root}/`, ''), target: value });
  }
}

if (missing.length) {
  console.error('Missing local references:');
  for (const item of missing) console.error(`${item.from} -> ${item.target}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. No missing local references.`);
