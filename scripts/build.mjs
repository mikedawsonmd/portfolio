import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.mjs';
import { site } from '../src/site.config.mjs';
import { absoluteUrl, escapeHtml, projectUrl } from '../src/templates/layout.mjs';
import { renderHome, renderNotFound, renderProject } from '../src/templates/pages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const legacyRoutes = [
  { from: 'project01.html', to: projectUrl(projects[0]), title: projects[0].title },
  { from: 'project02.html', to: projectUrl(projects[2]), title: projects[2].title },
  { from: 'project03.html', to: projectUrl(projects[1]), title: projects[1].title }
];

const legacyProjectSlugs = [
  { from: '/projects/employee-communications-experience/', to: projectUrl(projects[0]) },
  { from: '/projects/workflow-builder/', to: projectUrl(projects[2]) },
  { from: '/projects/event-builder-module/', to: projectUrl(projects[1]) }
];

async function write(path, content) {
  const destination = join(root, path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content, 'utf8');
}

function sitemapXml() {
  const urls = [
    { loc: absoluteUrl('/'), priority: '1.0' },
    ...projects.map((project) => ({ loc: absoluteUrl(projectUrl(project)), priority: '0.8' }))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
}

function redirectsFile() {
  return `${legacyRoutes.map((route) => `/${route.from} ${route.to} 301`).join('\n')}
${legacyProjectSlugs.map((route) => `${route.from} ${route.to} 301`).join('\n')}
/project01 ${projectUrl(projects[0])} 301
/project02 ${projectUrl(projects[2])} 301
/project03 ${projectUrl(projects[1])} 301
`;
}

function redirectPage(route) {
  const relativeTarget = `${route.to.replace(/^\//, '')}index.html`; // Explicit local target for servers that do not resolve directory indexes
  const canonical = absoluteUrl(route.to);
  return `<!doctype html>
<html lang="${site.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(route.title)} moved | ${escapeHtml(site.name)}</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${canonical}">
  <meta http-equiv="refresh" content="0; url=${relativeTarget}">
</head>
<body>
  <main>
    <h1>${escapeHtml(route.title)} has moved</h1>
    <p>This case study now lives at <a href="${relativeTarget}">${escapeHtml(canonical)}</a>.</p>
  </main>
</body>
</html>`;
}

await rm(join(root, 'projects'), { recursive: true, force: true });

await write('index.html', renderHome(projects));
await write('404.html', renderNotFound(projects));
await write('sitemap.xml', sitemapXml());
await write('robots.txt', robotsTxt());
await write('_redirects', redirectsFile());

for (const project of projects) {
  await write(`projects/${project.slug}/index.html`, renderProject(project, projects));
}

for (const route of legacyRoutes) {
  await write(route.from, redirectPage(route));
}

console.log(`Built ${site.name} portfolio with ${projects.length} project pages and ${legacyRoutes.length} legacy redirects.`);
