import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = [];
const errors = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}

function textBetween(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
}

function attrValues(html, tag, attr) {
  const regex = new RegExp(`<${tag}\\b[^>]*\\s${attr}="([^"]*)"[^>]*>`, 'gi');
  return [...html.matchAll(regex)].map((match) => match[1]);
}

function metaContent(html, name) {
  const regex = new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]+)"`, 'i');
  const reversed = new RegExp(`<meta[^>]+content="([^"]+)"[^>]+name="${name}"`, 'i');
  return html.match(regex)?.[1] || html.match(reversed)?.[1] || '';
}

function propertyContent(html, property) {
  const regex = new RegExp(`<meta[^>]+property="${property}"[^>]+content="([^"]+)"`, 'i');
  const reversed = new RegExp(`<meta[^>]+content="([^"]+)"[^>]+property="${property}"`, 'i');
  return html.match(regex)?.[1] || html.match(reversed)?.[1] || '';
}

function check(condition, file, message) {
  if (!condition) errors.push(`${file}: ${message}`);
}

await walk(root);

const titles = new Map();
const descriptions = new Map();

for (const absoluteFile of htmlFiles) {
  const file = relative(root, absoluteFile);
  const html = await readFile(absoluteFile, 'utf8');
  const isRedirect = /<meta[^>]+http-equiv="refresh"/i.test(html);
  const title = textBetween(html, 'title');
  const description = metaContent(html, 'description');
  const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const images = (html.match(/<img\b[^>]*>/gi) || []);

  check(title.length > 10 && title.length < 70, file, 'title should be descriptive and under 70 characters');
  check(canonical, file, 'canonical URL missing');
  check(h1Count === 1, file, 'page should contain exactly one h1');

  if (!isRedirect) {
    check(description.length >= 50 && description.length <= 170, file, 'meta description should be 50-170 characters');
    check(propertyContent(html, 'og:title'), file, 'Open Graph title missing');
    check(propertyContent(html, 'og:description'), file, 'Open Graph description missing');
    check(propertyContent(html, 'og:image'), file, 'Open Graph image missing');
    check(metaContent(html, 'twitter:description'), file, 'Twitter description missing');
    check(!/EcoTrack|Lorem ipsum|1\.2M|CO2 Tons|App Store Rating|placeholder evidence/i.test(html), file, 'placeholder or unrelated case-study content found');
    check(!/background-image\s*:/i.test(html), file, 'content image should not be implemented as a CSS background image');
  }

  for (const image of images) {
    check(/\salt="[^"]+"/i.test(image), file, 'image is missing meaningful alt text');
    check(/\swidth="\d+"/i.test(image), file, 'image is missing width');
    check(/\sheight="\d+"/i.test(image), file, 'image is missing height');
  }

  if (titles.has(title)) errors.push(`${file}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, file);

  if (description) {
    if (descriptions.has(description)) errors.push(`${file}: duplicate meta description with ${descriptions.get(description)}`);
    else descriptions.set(description, file);
  }

  for (const json of [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]) {
    try {
      JSON.parse(json[1]);
    } catch (error) {
      errors.push(`${file}: invalid JSON-LD (${error.message})`);
    }
  }
}

if (errors.length) {
  console.error('Audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Audited ${htmlFiles.length} HTML files. SEO, accessibility and structured-data checks passed.`);
