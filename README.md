# Mike Dawson portfolio

A static, SEO-conscious and accessibility-focused portfolio site for Mike Dawson.

## What changed

- Replaced duplicated project pages with generated static pages driven by `src/data/projects.mjs`.
- Moved case studies into descriptive project folders, for example `projects/workflow-builder/`.
- Added legacy redirect pages for `project01.html`, `project02.html` and `project03.html` so old links do not break.
- Added unique page titles, meta descriptions, canonical URLs, Open Graph metadata, Twitter card metadata and JSON-LD structured data.
- Added `sitemap.xml`, `robots.txt` and `_redirects` for static hosts that support redirect rules.
- Rebuilt navigation as semantic HTML with a skip link, accessible mobile menu, breadcrumbs, mobile case-study quick links and sticky desktop page navigation.
- Added persistent Tailwind class-based dark mode using `localStorage` with system preference fallback.
- Replaced CSS background-image content with real `img` elements, descriptive alt text, responsive `srcset`, explicit dimensions and optimized WebP assets.
- Removed unrelated public placeholder case-study content and fake metrics from the generated HTML.
- Added repeatable checks for local links, SEO fundamentals, image accessibility and JSON-LD validity.

## File structure

```text
.
|-- index.html
|-- 404.html
|-- project01.html
|-- project02.html
|-- project03.html
|-- robots.txt
|-- sitemap.xml
|-- _redirects
|-- assets/
|   |-- css/styles.css
|   |-- favicons/
|   |-- files/mike-dawson-cv.pdf
|   |-- images/
|   `-- js/
|-- docs/content-intake.md
|-- projects/
|   |-- employee-communications-experience/index.html
|   |-- workflow-builder/index.html
|   `-- event-builder-module/index.html
|-- scripts/
|   |-- audit.mjs
|   |-- build-css.mjs
|   |-- build.mjs
|   `-- check-links.mjs
`-- src/
    |-- data/projects.mjs
    |-- site.config.mjs
    |-- styles/
    `-- templates/
```

## Local commands

```bash
npm install
npm run build
npm run check:links
npm run audit
```

The generated HTML is committed in the root and `projects/` folders, so the site can still be served by any static host.

## Editing project content

Update `src/data/projects.mjs`, then run:

```bash
npm run build
```

Each project supports:

- SEO title and description
- Tags
- Role, timeline, product type and tools
- Problem labels and problem statements
- Solution bullets
- Insights
- Process steps
- Design-system notes
- Highlights
- Outcomes
- Responsive image metadata

Use `docs/content-intake.md` when adding Figma URLs, `.fig` exports, Jira notes or Confluence material.

## Content access note

The public pages avoid invented metrics and avoid exposing private Jira or Confluence details. Add approved project evidence only after it is cleared for portfolio use. The old Notion URL can be used as a source when a public export or accessible page is provided.

## Deployment note

Update `siteUrl` in `src/site.config.mjs` before deployment if the live domain is not `https://mikedawson.ie`. Canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml` use this value.

The site is static and can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static host.
