import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const fallbackTailwindRoot = '/opt/nvm/versions/node/v22.16.0/lib/node_modules/tailwindcss';

function resolveTailwindRoot() {
  try {
    return dirname(require.resolve('tailwindcss/package.json'));
  } catch (_error) {
    return fallbackTailwindRoot;
  }
}

const tailwindRoot = resolveTailwindRoot();

async function loadTailwind() {
  try {
    return await import('tailwindcss');
  } catch (_error) {
    return await import(pathToFileURL(join(tailwindRoot, 'dist/lib.mjs')).href);
  }
}

async function loadStylesheet(id, base) {
  let file;
  if (id === 'tailwindcss') {
    file = join(tailwindRoot, 'index.css');
  } else if (id.startsWith('./') || id.startsWith('../')) {
    file = resolve(base, id);
  } else if (id.startsWith('tailwindcss/')) {
    file = join(tailwindRoot, `${id.replace('tailwindcss/', '')}.css`);
  } else {
    throw new Error(`Unknown stylesheet import: ${id}`);
  }

  return {
    path: file,
    base: dirname(file),
    content: await readFile(file, 'utf8')
  };
}

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function candidatesFromHtml(html) {
  const candidates = new Set();
  for (const match of html.matchAll(/class="([^"]+)"/g)) {
    match[1]
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .forEach((candidate) => candidates.add(candidate));
  }
  return candidates;
}

export async function buildCss() {
  const { compile } = await loadTailwind();
  const input = await readFile(join(root, 'src/styles/input.css'), 'utf8');
  const custom = await readFile(join(root, 'src/styles/custom.css'), 'utf8');
  const htmlFiles = await walk(root);
  const candidates = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const candidate of candidatesFromHtml(html)) candidates.add(candidate);
  }

  const compiler = await compile(input, { from: join(root, 'src/styles/input.css'), base: root, loadStylesheet });
  const tailwindCss = compiler.build([...candidates]);
  await writeFile(join(root, 'assets/css/styles.css'), `${tailwindCss}\n${custom}\n`, 'utf8');
  console.log(`Built CSS with ${candidates.size} utility candidates.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await buildCss();
}
