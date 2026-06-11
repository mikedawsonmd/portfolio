(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');

  function setMenu(open) {
    if (!toggle || !nav) return;
    const openIcon = toggle.querySelector('.data-menu-icon-open');
    const closeIcon = toggle.querySelector('.data-menu-icon-close');

    nav.hidden = !open;
    nav.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (openIcon) {
      openIcon.hidden = open;
      openIcon.classList.toggle('hidden', open);
    }
    if (closeIcon) {
      closeIcon.hidden = !open;
      closeIcon.classList.toggle('hidden', !open);
    }
  }

  if (toggle && nav) {
    setMenu(false);

    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedToggle = toggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  const caseLinks = [...document.querySelectorAll('[data-case-nav-link]')];
  const sections = [...document.querySelectorAll('[data-case-section]')];

  if (!caseLinks.length || !sections.length || !('IntersectionObserver' in window)) return;

  function activate(sectionId) {
    caseLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${sectionId}`;
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target.id) activate(visible.target.id);
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
})();
