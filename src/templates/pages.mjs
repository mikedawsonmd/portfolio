import { site } from '../site.config.mjs';
import { absoluteUrl, baseLayout, escapeHtml, imageMarkup, materialIcon, projectUrl } from './layout.mjs';

const profileImage = {
  small: 'assets/images/mike-dawson-640.webp',
  large: 'assets/images/mike-dawson-960.webp',
  smallWidth: 640,
  largeWidth: 960,
  width: 960,
  height: 1023,
  alt: 'Portrait of Mike Dawson outdoors.'
};

function tagList(tags) {
  return tags.map((tag) => `<span class="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-300">${escapeHtml(tag)}</span>`).join('');
}

function projectCard(project, prefix = '') {
  return `
  <article class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-green-400/40">
    <a class="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="${prefix}projects/${project.slug}/index.html" aria-label="Read case study: ${escapeHtml(project.title)}"></a>
    <div class="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
      ${imageMarkup(prefix, project.thumbnail, 'aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105', 'lazy', '(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw')}
    </div>
    <div class="pt-6">
      <div class="mb-4 flex flex-wrap gap-2" aria-label="Project tags">${tagList(project.tags.slice(0, 3))}</div>
      <h3 class="text-xl font-black tracking-tight text-slate-950 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-green-400">${escapeHtml(project.title)}</h3>
      <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">${escapeHtml(project.cardSummary)}</p>
      <p class="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">${escapeHtml(project.productType)} / ${escapeHtml(project.year)}</p>
    </div>
  </article>`;
}

function personStructuredData(projects) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.author.name,
    jobTitle: site.author.jobTitle,
    url: absoluteUrl('/'),
    email: `mailto:${site.author.email}`,
    sameAs: [site.author.linkedin, site.author.figma],
    knowsAbout: [
      'Product design',
      'User experience design',
      'Enterprise software',
      'Design systems',
      'Accessibility',
      'Employee communications'
    ],
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      url: absoluteUrl(projectUrl(project))
    }))
  };
}

function websiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/'),
    description: site.description
  };
}

function itemListStructuredData(projects) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      url: absoluteUrl(projectUrl(project))
    }))
  };
}

export function renderHome(projects) {
  const children = `
  <section class="relative overflow-hidden px-5 py-16 sm:px-6 lg:py-24" aria-labelledby="hero-heading">
    <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 to-transparent dark:from-green-400/10" aria-hidden="true"></div>
    <div class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-300">
          <span class="relative flex size-2" aria-hidden="true"><span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 dark:bg-green-300"></span><span class="relative inline-flex size-2 rounded-full bg-primary dark:bg-green-300"></span></span>
          Open to opportunities
        </div>
        <h1 id="hero-heading" class="mt-7 max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">Senior product designer building accessible enterprise experiences.</h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">I am Mike Dawson, a Senior UX and Product Designer focused on product strategy, design systems, enterprise workflows and employee communication experiences that are easier to understand and use.</p>
        <div class="mt-9 flex flex-wrap gap-4">
          <a class="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-white shadow-soft transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="#projects">View selected projects ${materialIcon('arrow_forward', 'text-xl')}</a>
          <a class="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-900 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:text-green-400" href="assets/files/mike-dawson-cv.pdf" download aria-label="Download Mike Dawson CV as a PDF">Download CV ${materialIcon('download', 'text-xl')}</a>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primary/20 to-transparent blur-3xl dark:from-green-400/10" aria-hidden="true"></div>
        <div class="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          ${imageMarkup('', profileImage, 'aspect-[4/3] w-full rounded-[2rem] object-cover', 'eager', '(min-width: 1024px) 42vw, 100vw')}
        </div>
      </div>
    </div>
  </section>

  <section class="px-5 py-16 sm:px-6" id="projects" aria-labelledby="projects-heading">
    <div class="mx-auto max-w-7xl">
      <div class="mb-10 grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
        <div>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Selected work</p>
          <h2 id="projects-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Enterprise product design case studies</h2>
        </div>
        <p class="text-base leading-7 text-slate-600 dark:text-slate-400">Consistent templates, semantic page structure and accessible navigation make each case study easier to scan for hiring managers, collaborators and search engines.</p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        ${projects.map((project) => projectCard(project)).join('\n')}
      </div>
    </div>
  </section>

  <section class="px-5 py-16 sm:px-6" aria-labelledby="capabilities-heading">
    <div class="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/60 sm:p-10">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">How I work</p>
          <h2 id="capabilities-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Product thinking with design-system discipline.</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          ${[
            ['search', 'Discovery and research', 'Turning ambiguous product problems into clear user needs, workflows and decision points.'],
            ['account_tree', 'Information architecture', 'Structuring complex enterprise tasks so users can understand where they are and what to do next.'],
            ['draw', 'Interface design', 'Creating high-fidelity, responsive and accessible product experiences in Figma.'],
            ['deployed_code', 'Design systems', 'Building reusable patterns with variables, variants and implementation-aware documentation.']
          ].map(([icon, title, body]) => `
          <article class="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-background-dark/50">
            ${materialIcon(icon, 'text-3xl text-primary dark:text-green-400')}
            <h3 class="mt-4 font-black text-slate-950 dark:text-white">${title}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">${body}</p>
          </article>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <section class="px-5 py-16 sm:px-6" id="about" aria-labelledby="about-heading">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1fr] lg:items-center">
      <div class="relative order-2 lg:order-1">
        <div class="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          ${imageMarkup('', { ...profileImage, alt: 'Mike Dawson, senior product designer.' }, 'aspect-square w-full rounded-[2rem] object-cover grayscale transition duration-500 hover:grayscale-0', 'lazy', '(min-width: 1024px) 38vw, 100vw')}
        </div>
        <div class="absolute -bottom-5 right-5 hidden rounded-3xl bg-primary p-6 text-white shadow-soft sm:block">
          <span class="block text-4xl font-black">8+</span>
          <span class="text-xs font-bold uppercase tracking-widest opacity-90">Years experience</span>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">About</p>
        <h2 id="about-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Senior UX and Product Designer focused on enterprise systems.</h2>
        <div class="mt-6 space-y-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
          <p>I work across product strategy, research, interaction design and design systems, with a focus on making complex enterprise products clearer and more usable.</p>
          <p>Recent work includes scalable Figma components, variables and variants, AI-adjacent product explorations, employee communications, workflow design and close stakeholder collaboration.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="px-5 py-16 sm:px-6" id="contact" aria-labelledby="contact-heading">
    <div class="mx-auto max-w-5xl rounded-[2.5rem] bg-primary px-6 py-14 text-center text-white shadow-soft sm:px-10">
      <p class="text-sm font-bold uppercase tracking-widest text-white/80">Contact</p>
      <h2 id="contact-heading" class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Ready to build something better?</h2>
      <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85">Reach out for product design, design-system, portfolio review or enterprise UX opportunities.</p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a class="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-primary transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="mailto:${escapeHtml(site.author.email)}">Email me ${materialIcon('mail', 'text-xl')}</a>
        <a class="inline-flex items-center gap-2 rounded-2xl border border-white/70 px-6 py-4 font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="assets/files/mike-dawson-cv.pdf" download aria-label="Download Mike Dawson CV as a PDF">Download CV ${materialIcon('download', 'text-xl')}</a>
      </div>
    </div>
  </section>`;

  return baseLayout({
    title: site.title,
    description: site.description,
    path: '/',
    currentSection: 'home',
    image: profileImage,
    preload: profileImage,
    preloadSizes: '(min-width: 1024px) 42vw, 100vw',
    structuredData: [personStructuredData(projects), websiteStructuredData(), itemListStructuredData(projects)],
    children
  });
}

function breadcrumbStructuredData(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: absoluteUrl('/#projects') },
      { '@type': 'ListItem', position: 3, name: project.title, item: absoluteUrl(projectUrl(project)) }
    ]
  };
}

function creativeWorkStructuredData(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: `${project.title}: ${project.subtitle}`,
    description: project.metaDescription,
    url: absoluteUrl(projectUrl(project)),
    creator: {
      '@type': 'Person',
      name: site.author.name,
      jobTitle: site.author.jobTitle,
      url: absoluteUrl('/')
    },
    image: absoluteUrl(`/${project.thumbnail.large}`),
    keywords: project.tags.join(', '),
    about: project.productType
  };
}

function detail(label, value) {
  return `<div><dt class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">${escapeHtml(label)}</dt><dd class="mt-1 font-bold text-slate-950 dark:text-white">${Array.isArray(value) ? value.map(escapeHtml).join(', ') : escapeHtml(value)}</dd></div>`;
}

function nextProjectNav(prefix, current, projects) {
  const currentIndex = projects.findIndex((project) => project.slug === current.slug);
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];
  return `
  <nav class="mx-auto max-w-7xl px-5 pb-20 sm:px-6" aria-label="Project navigation">
    <div class="grid gap-4 border-t border-slate-200 pt-10 dark:border-slate-800 md:grid-cols-2">
      <a class="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-green-400" href="${prefix}projects/${previous.slug}/index.html">
        <span class="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Previous project</span>
        <span class="mt-3 flex items-center gap-3 text-xl font-black text-slate-950 group-hover:text-primary dark:text-white dark:group-hover:text-green-400">${materialIcon('arrow_back', 'text-xl')} ${escapeHtml(previous.title)}</span>
      </a>
      <a class="group rounded-3xl border border-slate-200 bg-white p-6 text-right transition hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-green-400" href="${prefix}projects/${next.slug}/index.html">
        <span class="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Next project</span>
        <span class="mt-3 flex items-center justify-end gap-3 text-xl font-black text-slate-950 group-hover:text-primary dark:text-white dark:group-hover:text-green-400">${escapeHtml(next.title)} ${materialIcon('arrow_forward', 'text-xl')}</span>
      </a>
    </div>
  </nav>`;
}


function contentBlock(title, body, bullets = []) {
  return `
  <section id="brief" aria-labelledby="brief-heading" data-case-section>
    <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Project brief</p>
    <h2 id="brief-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">${escapeHtml(title)}</h2>
    <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">${escapeHtml(body)}</p>
    <ul class="mt-6 grid gap-3 md:grid-cols-2">
      ${bullets.map((item) => `<li class="flex gap-3 rounded-3xl border border-slate-200 bg-white p-5 leading-7 dark:border-slate-800 dark:bg-slate-900/60">${materialIcon('task_alt', 'mt-0.5 shrink-0 text-primary dark:text-green-400')}<span>${escapeHtml(item)}</span></li>`).join('')}
    </ul>
  </section>`;
}

function contributionBlock(project) {
  if (!project.roleContribution) return '';
  return `
  <div class="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-background-dark/50">
    <h3 class="text-xl font-black text-slate-950 dark:text-white">${escapeHtml(project.roleContribution.title)}</h3>
    <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(project.roleContribution.body)}</p>
    <ul class="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
      ${project.roleContribution.bullets.map((item) => `<li class="flex gap-2 leading-6">${materialIcon('arrow_right_alt', 'mt-0.5 shrink-0 text-primary dark:text-green-400')}<span>${escapeHtml(item)}</span></li>`).join('')}
    </ul>
  </div>`;
}

function decisionsBlock(project) {
  if (!project.decisions?.length) return '';
  return `
  <section id="decisions" aria-labelledby="decisions-heading" data-case-section>
    <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Design decisions</p>
    <h2 id="decisions-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">What the design needed to make clear</h2>
    <div class="mt-8 grid gap-5 md:grid-cols-2">
      ${project.decisions.map((decision) => `
      <article class="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
        <h3 class="text-xl font-black text-slate-950 dark:text-white">${escapeHtml(decision.title)}</h3>
        <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(decision.body)}</p>
      </article>`).join('')}
    </div>
  </section>`;
}

function accessibilityBlock(project) {
  if (!project.accessibilityNotes?.length) return '';
  return `
  <section id="accessibility" aria-labelledby="accessibility-heading" data-case-section>
    <div class="rounded-[2.5rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
      <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Accessibility considerations</p>
      <h2 id="accessibility-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Inclusive product details that matter</h2>
      <ul class="mt-6 grid gap-3 md:grid-cols-2">
        ${project.accessibilityNotes.map((item) => `<li class="flex gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 leading-7 dark:border-slate-800 dark:bg-background-dark/50">${materialIcon('accessibility_new', 'mt-0.5 shrink-0 text-primary dark:text-green-400')}<span>${escapeHtml(item)}</span></li>`).join('')}
      </ul>
    </div>
  </section>`;
}

function sourceSummary(project) {
  if (!project.source) return '';
  const rows = [
    ['Source file', project.source.file],
    ['Figma file name', project.source.figmaName],
    ['Exported', project.source.exportedAt],
    ['Board size', project.source.boardSize],
    ['Embedded assets', project.source.extractedImages]
  ].filter(([, value]) => value);

  return `
  <section class="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60" aria-labelledby="source-heading">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-primary dark:text-green-400">Attached Figma source</p>
        <h2 id="source-heading" class="mt-2 text-xl font-black text-slate-950 dark:text-white">This case study is based on ${escapeHtml(project.source.file)}</h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">The page uses the supplied Figma export as the project source, with extracted visuals optimised for the web. Private Jira, Confluence and research evidence can be layered into the same data model later.</p>
      </div>
      <dl class="grid min-w-0 gap-3 text-sm sm:min-w-72">
        ${rows.map(([label, value]) => `<div class="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-background-dark/40"><dt class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">${escapeHtml(label)}</dt><dd class="mt-1 break-words font-bold text-slate-950 dark:text-white">${escapeHtml(value)}</dd></div>`).join('')}
      </dl>
    </div>
  </section>`;
}

function visualGallery(prefix, project) {
  if (!project.visuals?.length) return '';
  return `
        <section id="visuals" aria-labelledby="visuals-heading" data-case-section>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Figma artefacts</p>
          <h2 id="visuals-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Selected screens from the attached file</h2>
          <div class="mt-8 grid gap-6">
            ${project.visuals.map((visual, index) => `
            <figure class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900/60">
              <div class="overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-950/50">
                ${imageMarkup(prefix, visual.image, index === 0 ? 'w-full object-contain' : 'w-full object-cover', 'lazy', '(min-width: 1024px) 62vw, 100vw')}
              </div>
              <figcaption class="px-2 py-4">
                <h3 class="text-lg font-black text-slate-950 dark:text-white">${escapeHtml(visual.title)}</h3>
                <p class="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">${escapeHtml(visual.caption)}</p>
              </figcaption>
            </figure>`).join('')}
          </div>
        </section>`;
}

function caseNavLinks(caseNav, layout = 'stacked') {
  const baseClasses = layout === 'inline'
    ? 'case-nav-link whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-green-400'
    : 'case-nav-link block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-green-400';

  return caseNav.map(([label, href], index) => `<li><a class="${baseClasses}" href="${href}" data-case-nav-link${index === 0 ? ' aria-current="location"' : ''}>${label}</a></li>`).join('');
}

export function renderProject(project, projects) {
  const prefix = '../../';
  const caseNav = [
    ['Brief', '#brief'],
    ['Overview', '#overview'],
    ['Decisions', '#decisions'],
    ['Process', '#process'],
    ['Visuals', '#visuals'],
    ['Accessibility', '#accessibility'],
    ['Outcomes', '#outcomes']
  ];

  const children = `
  <article>
    <header class="px-5 py-10 sm:px-6 lg:py-16">
      <div class="mx-auto max-w-7xl">
        <nav class="mb-10" aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <li><a class="rounded-lg hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:hover:text-green-400" href="${prefix}index.html">Home</a></li>
            <li aria-hidden="true">${materialIcon('chevron_right', 'text-base')}</li>
            <li><a class="rounded-lg hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:hover:text-green-400" href="${prefix}index.html#projects">Projects</a></li>
            <li aria-hidden="true">${materialIcon('chevron_right', 'text-base')}</li>
            <li aria-current="page" class="font-bold text-slate-950 dark:text-white">${escapeHtml(project.title)}</li>
          </ol>
        </nav>
        <div class="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div class="mb-5 flex flex-wrap gap-2">${tagList(project.tags.slice(0, 5))}</div>
            <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">${escapeHtml(project.eyebrow)}</p>
            <h1 class="mt-4 max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">${escapeHtml(project.title)}</h1>
            <p class="mt-5 text-2xl font-bold text-slate-700 dark:text-slate-300">${escapeHtml(project.subtitle)}</p>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">${escapeHtml(project.overview)}</p>
            <dl class="mt-8 grid gap-5 border-y border-slate-200 py-6 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">
              ${detail('Role', project.role)}
              ${detail('Timeline', project.year)}
              ${detail('Product', project.productType)}
              ${detail('Tools', project.tools)}
            </dl>
            ${sourceSummary(project)}
          </div>
          <div class="relative">
            <div class="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primary/20 to-transparent blur-3xl dark:from-green-400/10" aria-hidden="true"></div>
            <div class="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              ${imageMarkup(prefix, project.thumbnail, 'aspect-[4/3] w-full rounded-[2rem] object-contain', 'eager', '(min-width: 1024px) 44vw, 100vw')}
            </div>
          </div>
        </div>
      </div>
    </header>

    <nav class="mx-auto mb-10 max-w-7xl px-5 sm:px-6 lg:hidden" aria-label="Case study quick links">
      <div class="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <p class="px-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">On this page</p>
        <ol class="mt-3 flex gap-2 overflow-x-auto pb-1">
          ${caseNavLinks(caseNav, 'inline')}
        </ol>
      </div>
    </nav>

    <div class="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-6 lg:grid-cols-[16rem_1fr]">
      <aside class="hidden lg:block">
        <nav class="sticky top-28 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60" aria-label="Case study sections">
          <p class="px-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">On this page</p>
          <ol class="mt-3 space-y-1">
            ${caseNavLinks(caseNav)}
          </ol>
        </nav>
      </aside>

      <div class="space-y-20">
        ${project.brief ? contentBlock(project.brief.title, project.brief.body, project.brief.bullets) : ''}

        <section id="overview" aria-labelledby="overview-heading" data-case-section>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Challenge</p>
          <h2 id="overview-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Understanding the problem space</h2>
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              ${materialIcon('person_alert', 'text-3xl text-primary dark:text-green-400')}
              <h3 class="mt-4 text-xl font-black text-slate-950 dark:text-white">${escapeHtml(project.problem.primaryLabel)}</h3>
              <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(project.problem.primary)}</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              ${materialIcon('rule_settings', 'text-3xl text-primary dark:text-green-400')}
              <h3 class="mt-4 text-xl font-black text-slate-950 dark:text-white">${escapeHtml(project.problem.secondaryLabel)}</h3>
              <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(project.problem.secondary)}</p>
            </div>
          </div>
          <div class="mt-6 rounded-3xl border border-primary/20 bg-primary/10 p-6 dark:border-green-400/20 dark:bg-green-400/10">
            <h3 class="text-xl font-black text-slate-950 dark:text-white">Solution direction</h3>
            <ul class="mt-4 grid gap-3 text-slate-800 dark:text-slate-200">
              ${project.solution.map((item) => `<li class="flex gap-3 leading-7">${materialIcon('check_circle', 'mt-0.5 shrink-0 text-primary dark:text-green-400')}<span>${escapeHtml(item)}</span></li>`).join('')}
            </ul>
          </div>
          ${contributionBlock(project)}
        </section>

        <section id="insights" aria-labelledby="insights-heading" data-case-section>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Insights</p>
          <h2 id="insights-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">What guided the design</h2>
          <div class="mt-8 grid gap-5 md:grid-cols-3">
            ${project.insights.map((insight) => `
            <article class="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <p class="text-sm font-black text-primary dark:text-green-400">${escapeHtml(insight.label)}</p>
              <h3 class="mt-3 text-xl font-black text-slate-950 dark:text-white">${escapeHtml(insight.title)}</h3>
              <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">${escapeHtml(insight.body)}</p>
            </article>`).join('')}
          </div>
        </section>

        ${decisionsBlock(project)}

        <section id="process" aria-labelledby="process-heading" data-case-section>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Process</p>
          <h2 id="process-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">A reusable design process</h2>
          <ol class="mt-8 grid gap-5 md:grid-cols-2">
            ${project.process.map((item, index) => `
            <li class="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <div class="flex items-center gap-4">
                <span class="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary font-black text-white">${index + 1}</span>
                <h3 class="text-xl font-black text-slate-950 dark:text-white">${escapeHtml(item.step)}</h3>
              </div>
              <p class="mt-4 leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(item.detail)}</p>
            </li>`).join('')}
          </ol>
        </section>

        ${visualGallery(prefix, project)}

        <section id="system" aria-labelledby="system-heading" data-case-section>
          <div class="rounded-[2.5rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
            <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Design system</p>
            <h2 id="system-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">${escapeHtml(project.designSystem.title)}</h2>
            <p class="mt-4 max-w-3xl leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(project.designSystem.body)}</p>
            <div class="mt-8 grid gap-6 md:grid-cols-2">
              ${project.highlights.map((highlight) => `
              <article class="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-background-dark/50">
                <h3 class="text-xl font-black text-slate-950 dark:text-white">${escapeHtml(highlight.title)}</h3>
                <p class="mt-3 leading-7 text-slate-700 dark:text-slate-300">${escapeHtml(highlight.body)}</p>
              </article>`).join('')}
            </div>
          </div>
        </section>

        ${accessibilityBlock(project)}

        <section id="outcomes" aria-labelledby="outcomes-heading" data-case-section>
          <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">Outcomes</p>
          <h2 id="outcomes-heading" class="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Impact and product contribution</h2>
          <ul class="mt-8 grid gap-4">
            ${project.outcomes.map((outcome) => `<li class="flex gap-3 rounded-3xl border border-slate-200 bg-white p-5 leading-7 dark:border-slate-800 dark:bg-slate-900/60">${materialIcon('verified', 'mt-0.5 shrink-0 text-primary dark:text-green-400')}<span>${escapeHtml(outcome)}</span></li>`).join('')}
          </ul>
        </section>
      </div>
    </div>
  </article>
  ${nextProjectNav(prefix, project, projects)}`;

  return baseLayout({
    prefix,
    title: `${project.title} | Mike Dawson`,
    description: project.metaDescription,
    path: projectUrl(project),
    currentSection: 'projects',
    image: project.thumbnail,
    preload: project.thumbnail,
    preloadSizes: '(min-width: 1024px) 44vw, 100vw',
    structuredData: [breadcrumbStructuredData(project), creativeWorkStructuredData(project)],
    children
  });
}

export function renderNotFound(projects) {
  const children = `
  <section class="px-5 py-24 sm:px-6" aria-labelledby="not-found-heading">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm font-bold uppercase tracking-widest text-primary dark:text-green-400">404</p>
      <h1 id="not-found-heading" class="mt-3 text-5xl font-black tracking-tight text-slate-950 dark:text-white">Page not found</h1>
      <p class="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">The page may have moved as part of the portfolio restructure. Start from the homepage or jump into a case study.</p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a class="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 font-bold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href="index.html">Go home ${materialIcon('home', 'text-xl')}</a>
        <a class="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-900 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:text-green-400" href="index.html#projects">View projects ${materialIcon('work', 'text-xl')}</a>
      </div>
    </div>
  </section>`;

  return baseLayout({
    title: `Page not found | ${site.name}`,
    description: 'The requested page could not be found on Mike Dawson portfolio. Return to selected enterprise product design projects and contact details.',
    path: '/404.html',
    currentSection: '',
    image: profileImage,
    structuredData: [websiteStructuredData(), itemListStructuredData(projects)],
    children
  });
}
