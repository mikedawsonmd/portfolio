(() => {
  const STORAGE_KEY = 'mikedawson-theme';
  const DARK_CLASS = 'dark';

  const safeStorage = {
    get() {
      try {
        return window.localStorage.getItem(STORAGE_KEY);
      } catch (_error) {
        return null;
      }
    },
    set(value) {
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch (_error) {
        // Ignore storage failures in private browsing or locked-down contexts.
      }
    }
  };

  const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const preferredTheme = () => safeStorage.get() || (prefersDark() ? 'dark' : 'light');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }

  function updateToggles() {
    const isDark = document.documentElement.classList.contains(DARK_CLASS);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    });
    document.querySelectorAll('.data-theme-icon-light').forEach((icon) => {
      icon.hidden = isDark;
      icon.classList.toggle('hidden', isDark);
    });
    document.querySelectorAll('.data-theme-icon-dark').forEach((icon) => {
      icon.hidden = !isDark;
      icon.classList.toggle('hidden', !isDark);
    });
  }

  function setTheme(theme) {
    safeStorage.set(theme);
    applyTheme(theme);
    updateToggles();
  }

  applyTheme(preferredTheme());
  window.setPortfolioTheme = setTheme;

  document.addEventListener('DOMContentLoaded', () => {
    updateToggles();
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const nextTheme = document.documentElement.classList.contains(DARK_CLASS) ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    });

    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', () => {
        if (!safeStorage.get()) applyTheme(preferredTheme());
        updateToggles();
      });
    }
  });
})();
