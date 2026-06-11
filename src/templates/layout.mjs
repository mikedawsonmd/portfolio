import { site } from '../site.config.mjs';

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function stripTrailingSlash(value) {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

export function absoluteUrl(path = '/') {
  const base = stripTrailingSlash(site.siteUrl);
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function asset(prefix, path) {
  return `${prefix}${path}`;
}

export function projectUrl(project) {
  return `/projects/${project.slug}/`;
}

export function jsonScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2).replaceAll('</', '<\/')}</script>`;
}

export function materialIcon(name, classes = '') {
  return `<span class="material-symbols-outlined ${classes}" aria-hidden="true">${escapeHtml(name)}</span>`;
}


export function brandLogo(classes = 'size-12') {
  return `<svg
                                class="${classes} fill-current"
                                viewBox="0 -16 96 96"
                            >
                                <path d="M94.649 26.267c0.459 -0.344 1.337 -0.135 1.351 -0.131 -1.386 0.95 -1.177 1.717 -1.173 1.73 -0.654 1.477 -2.027 5.589 -2.038 5.621 1.612 -2.941 2.819 -3.43 2.833 -3.436 -5.97 7.073 -9.411 26.178 -9.426 26.259 -2.37 0.162 -3.898 -1.737 -3.898 -1.737 0.648 -7.104 5.72 -19.534 6.446 -21.271 -1.332 3.15 -7.134 14.741 -7.164 14.801 -2.555 -0.208 -4.107 -1.945 -4.107 -1.945 0.069 -1.513 0.27 -3.166 0.548 -4.803 -0.077 0.347 -0.155 0.726 -0.247 1.143 -0.795 3.49 -2.416 5.636 -3.682 6.733s-3.258 0.664 -5.612 0c-2.355 -0.664 -3.852 -2.208 -4.184 -2.949 -0.332 -0.741 -0.178 -2.116 0.417 -4.44 0.077 -0.301 0.162 -0.587 0.255 -0.849 -0.903 1.521 -1.83 3.266 -1.752 3.915 -0.013 -0.003 -2.482 -0.644 -4.038 -1.807 -0.009 -0.013 -0.546 -0.783 0.556 -2.88 0 0 -3.358 2.818 -5.411 8.385 0.02 -0.02 2.091 -2.023 3.535 -2.061 1.451 -0.039 5.481 0.888 5.797 2.664 0.309 1.776 -0.254 5.76 -1.799 9.08 0.01 0 0.494 -0.045 1.992 -2.941 -0.008 0.024 -1.669 4.766 -5.18 8.601 -3.52 3.837 -6.531 2.44 -8.453 1.289s-3.142 -1.946 -3.15 -3.876c-0.008 -1.576 0.124 -4.564 3.867 -8.393 0.022 0.003 1.863 0.217 3.59 1.537 -0.008 0.006 -1.709 1.194 -2.794 6.362 -1.096 5.181 2.617 1.629 3.219 0.733s2.247 -3.459 3.142 -6.068c0.895 -2.602 1.52 -5.783 0.942 -6.764 -0.571 -0.988 -3.343 -0.131 -5.103 2.679 -0.016 -0.001 -1.527 -0.152 -2.748 -1.112 -0.012 -0.051 -1.773 -7.463 5.736 -13.234 0.024 0.006 2.087 0.52 2.617 0.996 -0.002 0.01 -0.083 0.456 0.054 0.517 0.007 -0.003 0.187 -0.089 0.27 -0.316l0.425 -0.039c0.016 -0.039 1.717 -4.242 2.393 -5.088 0.028 0.007 2.317 0.607 3.837 1.436 -0.006 0.012 -2.17 4.273 -2.718 6.57a240.369 240.369 0 0 1 2.1 -2.1c0.313 -0.496 0.55 -0.743 0.556 -0.749 0.192 0.016 1.117 0.305 1.127 0.309 0.664 -2.386 1.567 -3.606 2.146 -4.602 0.579 -0.988 1.15 -0.95 2.779 -0.703 1.629 0.247 3.814 0.988 4.755 1.382 0.935 0.391 1.329 1.154 1.335 1.166 0.101 0 0.379 -0.209 0.71 -0.502 0.639 -2.563 1.201 -4.367 1.204 -4.378 2.37 0.147 4.169 1.057 4.169 1.057 -2.926 10.624 -2.285 10.872 -2.285 10.872 4.014 -8.068 8.893 -16.794 8.893 -16.794 0.394 0.247 0.887 0.024 1.636 0.302 0.757 0.27 1.266 0.177 1.729 -0.17m-31.828 27.997c-2.069 7.419 -5.534 10.523 -6.677 11.373 -0.124 0.092 -0.247 0.178 -0.378 0.263 0.008 -0.005 0.146 -0.09 0.378 -0.263 5.271 -3.777 6.672 -11.34 6.677 -11.373m-11 -0.402c-2.245 1.615 -3.073 5.289 -3.08 5.32 1.443 -4.061 3.08 -5.32 3.08 -5.32m-0.688 0c-1.474 0.914 -2.383 3.311 -2.393 3.336 1.139 -2.249 2.386 -3.33 2.393 -3.336m40.875 -20.592c-6.461 16.518 -6.277 22.564 -6.276 22.6 1.714 -10.338 5.265 -19.975 6.276 -22.6m-18.982 9.064c-0.363 0.463 -1.367 1.019 -2.13 1.197 -0.768 0.184 -2.275 -0.555 -2.293 -0.563 -0.178 0.541 -0.301 1.807 -0.425 3.004 -0.123 1.197 0.047 1.714 0.618 2.085 0.563 0.371 1.181 0.27 2.1 -0.872 0.919 -1.135 2.13 -4.849 2.13 -4.849m1.166 -0.579a11.815 11.815 0 0 1 -0.448 0.347c-0.548 1.714 -1.351 3.583 -2.54 5.359 0.02 -0.018 1.92 -1.766 2.987 -5.706m0.409 -6.223c-0.093 -0.355 -0.803 -0.563 -1.204 -0.324s-0.81 1.281 -1.212 2.077 -1.158 3.104 -1.289 3.946 0.687 0.208 0.687 0.208c0.224 -0.147 1.428 -0.996 1.999 -1.482 0.563 -0.486 0.479 -0.957 0.749 -2.046 0.27 -1.081 0.363 -2.023 0.27 -2.379m0.294 0.085c0 0.009 -0.009 1.605 -0.471 3.876a3.323 3.323 0 0 1 0.27 -0.2c0.147 -1.104 0.224 -2.324 0.201 -3.675m4.029 1.351c-0.182 0.174 -0.304 0.304 -0.309 0.309 -0.016 0.378 -0.023 0.911 -0.193 2.023 0.162 -0.803 0.332 -1.583 0.501 -2.332m-8.183 -3.412c-0.008 0.009 -1.578 1.722 -2.517 4.91 0.015 -0.034 1.618 -3.758 2.517 -4.911"/><path d="M7.728 27.178c3.443 0.409 5.434 2.747 5.442 2.757 0.222 2.432 -0.744 5.505 -0.757 5.544 0.371 -0.634 2.579 -2.988 4.045 -3.189s3.912 1.566 3.914 1.567c0.176 0.344 0.079 1.106 0.077 1.12 1.034 0.34 2.84 2.007 2.964 2.818 0.131 0.811 1.05 4.618 -2.562 12.74 -3.602 8.098 -10.534 13.503 -10.576 13.535 -3.786 -0.515 -5.341 -1.292 -5.35 -1.297 0.038 -0.039 7.279 -7.488 10.121 -12.632 2.185 -4.224 4.516 -13.28 2.856 -14.153 -1.659 -0.872 -3.829 2.27 -5.164 4.339 -1.073 1.706 -7.58 21.865 -8.576 24.128 -0.256 0.053 -0.409 0.076 -0.417 0.077 -0.501 -0.417 -2.123 -1.93 -2.694 -2.494 -0.563 -0.563 -0.432 -0.981 -0.432 -0.981C0.116 61.004 0 60.696 0 60.696 7.641 41.527 7.913 29.831 7.913 29.826c-0.783 0.906 -2.505 3.95 -2.524 3.984 0.602 -2.193 2.339 -6.632 2.339 -6.632m15.253 14.215a18.462 18.462 0 0 1 -0.1 0.641c-0.448 2.486 -2.749 11.806 -12.745 21.465 0.048 -0.038 10.558 -8.454 12.745 -21.465 0.076 -0.414 0.1 -0.638 0.1 -0.641"/><path d="M51.551 35.216c1.552 -0.363 4.007 0.865 4.007 0.865 -4.582 7.618 -7.528 18.64 -7.542 18.693 -2.505 0.768 -3.625 -0.047 -3.636 -0.054 -0.749 -4.463 -0.525 -7.659 -0.525 -7.659 -0.972 1.992 -2.076 9.162 -2.146 9.605v0.023c-2.499 0.767 -3.62 -0.042 -3.636 -0.054 -0.463 -2.27 -0.672 -4.371 -0.71 -6.285a821.538 821.538 0 0 0 -2.779 7.243c-1.891 -0.116 -3.227 -0.796 -4.022 -1.359 -0.965 1.05 -1.76 1.591 -3.057 1.923 -1.405 0.355 -2.895 0.309 -3.891 -0.224 -1.042 -0.563 -1.93 -1.729 -2.239 -2.934 -0.309 -1.204 -0.386 -3.281 0.316 -5.59 0.71 -2.309 2.2 -5.397 2.64 -6.239 0.556 -1.088 1.544 -1.343 5.211 -0.579 1.25 0.263 2.107 0.548 2.709 0.841 0.552 -1.519 0.975 -2.534 0.98 -2.548 3.114 0.954 3.846 2.007 3.852 2.015 -2.069 5.276 -2.644 9.427 -2.648 9.458 0.88 -2.494 2.092 -5.034 3.234 -7.181 0.572 -3.953 1.706 -6.262 1.706 -6.262 1.718 -0.277 3.304 0.606 3.312 0.61 -1.436 3.752 -1.806 7.482 -1.775 10.493 1.365 -4.767 4.448 -12.031 4.454 -12.045 1.717 -0.277 3.304 0.606 3.312 0.61 -2.106 8.912 -1.793 11.774 -1.791 11.798 1.112 -7.381 4.662 -15.164 4.662 -15.164m-18.858 15.388c-1.904 5.116 -4.199 6.594 -4.215 6.617 2.693 -1.459 4.214 -6.613 4.215 -6.617m-3.644 -6.385c-0.911 -0.239 -1.76 0.649 -3.142 5.49 -1.374 4.841 -0.895 6.246 -0.054 6.779 0.729 0.453 1.344 -0.644 1.951 -1.727l0.01 -0.018c0.61 -1.097 1.536 -4.208 1.536 -4.208 1.15 -5.119 0.625 -6.076 -0.301 -6.316m16.535 -5.629c-0.009 0.022 -2.472 5.727 -3.45 8.995 0.023 -0.052 2.413 -6.236 3.45 -8.995"/><path d="M69.198 0c1.459 0.34 3.752 1.482 3.752 1.482 -2.501 4.563 -4.516 9.265 -6.044 13.35 2.717 -1.575 7.672 -4.377 7.943 -4.008 0.983 1.337 0.064 3.559 0.054 3.583 -0.957 0.525 -2.609 1.22 -4.276 1.869a23.631 23.631 0 0 1 1.529 0.687c-2.194 3.781 -3.03 12.853 -3.034 12.902 1.235 -2.571 3.212 -5.667 4.223 -7.204 1.433 -3.931 3.336 -7.778 3.342 -7.791h0.023c4.053 0.309 8.607 2.247 8.607 2.247 -0.548 1.396 -1.566 2.562 -1.629 2.633 -1.737 0.602 -4.554 2.656 -5.882 3.66 -0.803 2.173 -1.107 3.596 -1.112 3.621 3.173 -4.354 11.555 -6.64 9.727 -5.582 -6.149 3.556 -9.797 10.067 -9.819 10.107 -3.275 -0.285 -4.796 -2.001 -4.801 -2.008 -0.069 -0.656 0.023 -1.482 0.216 -2.424 -2.822 4.679 -3.504 6.996 -3.512 7.026 -1.858 -0.308 -3.692 -1.324 -3.713 -1.336 0 -4.795 2.685 -12.868 2.694 -12.894 -0.006 0.006 -0.426 0.408 -2.694 5.536 -2.262 5.112 -2.663 5.929 -2.671 5.945 -2.806 -0.215 -3.678 -1.084 -3.69 -1.096 -0.178 -1.853 0.363 -4.579 1.273 -7.652 -2.153 3.921 -5.814 11.251 -5.843 11.311 -2.146 -0.185 -3.543 -0.996 -4.246 -1.521 -1.775 1.152 -2.892 4.622 -2.903 4.656 -1.162 -0.239 -1.626 -0.654 -1.629 -0.656 -0.023 -0.123 0.015 -0.375 0.016 -0.378 -1.175 -0.33 -2.702 -1.487 -2.718 -1.498 -0.023 -3.405 2.718 -11.18 2.718 -11.18 -2.287 2.433 -6.133 11.38 -6.152 11.428 -3.234 0.322 -4.366 -0.93 -4.377 -0.942 0.293 -5.567 2.057 -10.48 2.061 -10.493 -8.213 10.046 -8.091 17.294 -8.09 17.349 -0.016 -0.008 -0.023 -0.008 -0.039 -0.008v0.008s-5.689 -1.259 -3.86 -7.104c2.069 -6.586 7.056 -15.812 10.29 -21.464C27.366 14.06 24.425 15.929 23.352 17.627c0.025 -0.011 2.718 -1.146 4.47 -1.907 0 0 -3.574 2.286 -5.103 3.289 0 0 -2.849 -1.529 -1.683 -2.78 -0.031 -0.023 -4.715 -3.463 7.419 -6.956 3.126 -0.904 6.338 -1.583 9.456 -2.154 0.217 0.031 4.693 0.672 4.223 1.459 -4.477 7.366 -7.488 13.388 -9.511 18.152 3.49 -6.28 8.241 -13.898 8.26 -13.928 1.353 0.208 3.87 1.671 3.891 1.683 -4.935 10.272 -5.384 13.646 -5.388 13.674 3.32 -8.637 10.453 -18.981 10.483 -19.025 1.646 0.377 3.853 1.406 3.867 1.413C48.868 22.08 46.866 34.683 46.858 34.737c1.073 -1.498 1.953 -2.139 2.548 -2.401 -0.247 -0.208 -0.371 -0.34 -0.371 -0.34 -0.401 -3.977 4.223 -12.5 4.223 -12.5 3.06 0.936 3.743 1.872 3.751 1.884 -2.306 4.498 -3.073 8.063 -3.08 8.092 1.652 -3.528 6.044 -10.817 8.893 -15.457C65.797 6.689 69.188 0.019 69.198 0m-24.463 23.132c-0.018 0.027 -3.365 3.457 -6.059 11.165 0.022 -0.054 2.822 -6.919 6.059 -11.165m7.38 -9.628c-4.445 9.916 -5.208 18.686 -5.211 18.731 1.832 -10.794 5.192 -18.687 5.211 -18.731m33.587 8.061c-5.523 3.112 -7.598 7.011 -7.619 7.049 2.853 -4.219 7.609 -7.036 7.619 -7.049m-18.625 -3.952a107.446 107.446 0 0 1 -1.345 0.477c-1.706 4.943 -2.547 8.362 -2.555 8.393 1.436 -3.32 2.995 -6.756 3.968 -8.895zm12.674 1.381a40.615 40.615 0 0 0 -1.197 2.555c1.498 -1.088 3.111 -1.838 3.752 -2.123 -1.728 -0.394 -2.446 -0.433 -2.555 -0.433m-12.39 -1.953c-0.889 0.304 -1.45 0.57 -1.46 0.579 0.489 -0.148 0.95 -0.297 1.389 -0.438l0.055 -0.018zm7.326 -2.873c-1.519 0.718 -3.023 1.292 -4.444 1.835l-0.048 0.018v0.131c3.157 -1.182 4.493 -1.984 4.493 -1.984M38.266 8.046s-5.033 0.255 -10.213 1.923c0.03 -0.015 0.046 -0.023 0.038 -0.023 -0.023 0.007 -0.054 0.023 -0.077 0.031 -2.47 0.795 -4.964 1.922 -6.963 3.489 0.018 -0.013 1.415 -1.003 3.991 -2.146 -2.385 1.281 -3.521 2.44 -3.536 2.455 1.351 -1.158 3.196 -2.193 4.585 -2.896 2.926 -1.182 7.056 -2.417 12.174 -2.834m31.388 -7.489c-0.017 0.031 -3.218 5.862 -5.643 12.222 0.017 -0.039 2.75 -6.211 5.643 -12.222"/><path d="M55.835 11.535c1.124 -0.069 4.076 1.436 4.091 1.444 -1.629 2.675 -2.05 5.68 -2.054 5.706 -2.208 -0.293 -3.829 -1.969 -3.829 -1.976 -0.1 -0.88 0.456 -2.502 0.456 -2.502 -0.628 0.107 -1.493 1.158 -1.505 1.173 1.078 -2.256 2.831 -3.837 2.841 -3.845m3.172 2.085c-1.613 2.051 -1.445 4.133 -1.443 4.154 0.277 -2.106 1.433 -4.135 1.443 -4.154"/>
                            </svg>`;
}

export function linkedinIcon() {
  return `<svg
                                class="size-6 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                ></path>
                            </svg>`;
}

export function figmaIcon() {
  return `<svg
                                class="size-6 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M11.988 0c2.551 0 4.618 2.068 4.618 4.618 0 1.505 -0.72 2.842 -1.834 3.685 1.114 0.843 1.834 2.18 1.834 3.685 0 2.55 -2.067 4.618 -4.618 4.618 -1.031 0 -1.984 -0.338 -2.752 -0.909v3.661c0 2.55 -2.068 4.618 -4.618 4.618s-4.618 -2.068 -4.618 -4.618C0 17.853 0.72 16.517 1.834 15.673 0.72 14.83 0 13.493 0 11.988c0 -1.505 0.72 -2.842 1.834 -3.685C0.72 7.46 0 6.123 0 4.618 0 2.068 2.068 0 4.618 0zM4.607 16.606c-1.515 0.006 -2.741 1.236 -2.741 2.752C1.866 20.878 3.098 22.111 4.618 22.111c1.52 0 2.752 -1.232 2.752 -2.752v-2.752zm7.381 -7.37c-1.518 0 -2.749 1.229 -2.752 2.747v0.011c0.003 1.517 1.234 2.747 2.752 2.747 1.52 0 2.752 -1.232 2.752 -2.752 0 -1.52 -1.232 -2.752 -2.752 -2.752m-7.37 0c-1.52 0 -2.752 1.232 -2.752 2.752 0 1.516 1.226 2.746 2.741 2.752h2.763V9.236zm0 -7.37c-1.52 0 -2.752 1.232 -2.752 2.752 0 1.52 1.232 2.752 2.752 2.752h2.752V1.866zm4.618 5.504h2.752c1.52 0 2.752 -1.232 2.752 -2.752s-1.232 -2.752 -2.752 -2.752H9.236z"
                                />
                            </svg>`;
}

function imageCandidates(prefix, image) {
  const small = image.small || image.large;
  const large = image.large || image.small;
  const smallWidth = image.smallWidth || 900;
  const largeWidth = image.largeWidth || image.width || 1600;
  return `${asset(prefix, small)} ${smallWidth}w, ${asset(prefix, large)} ${largeWidth}w`;
}

export function imageMarkup(prefix, image, className, loading = 'lazy', sizes = '(min-width: 1024px) 50vw, 100vw') {
  const width = image.width || image.largeWidth || 1600;
  const height = image.height || 1000;
  return `<img class="${className}" src="${asset(prefix, image.large || image.small)}" srcset="${imageCandidates(prefix, image)}" sizes="${sizes}" alt="${escapeHtml(image.alt)}" width="${width}" height="${height}" loading="${loading}" decoding="async">`;
}

function preloadImage(prefix, image, sizes) {
  if (!image) return '';
  if (typeof image === 'string') return `<link rel="preload" as="image" href="${asset(prefix, image)}">`;
  return `<link rel="preload" as="image" href="${asset(prefix, image.large || image.small)}" imagesrcset="${imageCandidates(prefix, image)}" imagesizes="${sizes}">`;
}

function imageMetadata(image) {
  if (!image || typeof image === 'string') {
    return {
      path: image || 'assets/images/employee-communications-1600.webp',
      alt: site.description,
      width: 1600,
      height: 1000
    };
  }

  return {
    path: image.large || image.small,
    alt: image.alt || site.description,
    width: image.width || image.largeWidth || 1600,
    height: image.height || 1000
  };
}

function navLink(prefix, item, currentSection) {
  const isHomeHash = item.href.startsWith('/#');
  const href = item.href === '/' ? `${prefix}index.html` : isHomeHash ? `${prefix}index.html${item.href.replace('/', '')}` : item.href;
  const label = escapeHtml(item.label);
  const isCurrent = currentSection === item.label.toLowerCase();
  const currentValue = item.href === '/' ? 'page' : 'location';
  const ariaCurrent = isCurrent ? ` aria-current="${currentValue}"` : '';
  const classes = isCurrent
    ? 'text-primary dark:text-green-400 font-bold'
    : 'text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-green-400';
  return `<a class="rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${classes}" href="${href}"${ariaCurrent}>${label}</a>`;
}

export function header(prefix = '', currentSection = '') {
  const links = site.nav.map((item) => navLink(prefix, item, currentSection)).join('\n');
  return `
  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="glass-nav sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 dark:border-slate-800/80 dark:bg-background-dark/85">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
      <a class="group inline-flex items-center gap-3 rounded-xl text-slate-950 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-white dark:hover:text-green-400" href="${prefix}index.html" aria-label="Mike Dawson home">
        <span class="sr-only">Mike Dawson</span>
        ${brandLogo('h-14 w-auto transition-colors')}
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
        ${links}
      </nav>

      <div class="flex items-center gap-2">
        <button class="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-green-400" type="button" data-theme-toggle aria-label="Switch colour theme" aria-pressed="false">
          ${materialIcon('dark_mode', 'text-[1.35rem] data-theme-icon-light')}
          ${materialIcon('light_mode', 'hidden text-[1.35rem] data-theme-icon-dark')}
        </button>
        <button class="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-green-400" type="button" data-menu-toggle aria-controls="mobile-navigation" aria-expanded="false" aria-label="Open navigation menu">
          ${materialIcon('menu', 'text-[1.45rem] data-menu-icon-open')}
          ${materialIcon('close', 'hidden text-[1.45rem] data-menu-icon-close')}
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" class="hidden border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-background-dark md:hidden" aria-label="Mobile primary navigation" data-mobile-nav hidden>
      <div class="mx-auto flex max-w-7xl flex-col gap-1">
        ${links}
      </div>
    </nav>
  </header>`;
}

export function footer(prefix = '') {
  return `
  <footer class="border-t border-slate-200 bg-background-light px-6 pb-10 pt-20 dark:border-slate-800 dark:bg-background-dark" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row md:items-center">
      <div class="flex max-w-xs flex-col gap-4">
        <a class="inline-flex rounded-xl text-slate-950 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-white dark:hover:text-green-400" href="${prefix}index.html" aria-label="Mike Dawson home">
          ${brandLogo('h-20 w-auto')}
        </a>
        <p class="text-sm leading-6 text-slate-500 dark:text-slate-400">Designing digital products and experiences<br class="hidden sm:block"> that make a difference in the world.</p>
      </div>

      <div class="flex flex-col gap-6">
        <p class="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Connect</p>
        <div class="flex gap-6">
          <a class="text-slate-500 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-slate-400 dark:hover:text-green-400" href="${site.author.linkedin}" target="_blank" rel="me noopener noreferrer" aria-label="Mike Dawson on LinkedIn">
            ${linkedinIcon()}
          </a>
          <a class="text-slate-500 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-slate-400 dark:hover:text-green-400" href="${site.author.figma}" target="_blank" rel="me noopener noreferrer" aria-label="Mike Dawson on Figma">
            ${figmaIcon()}
          </a>
        </div>
      </div>
    </div>
    <div class="mx-auto mt-20 flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row">
      <p>&copy; 2026 Mike Dawson. All rights reserved.</p>
    </div>
  </footer>`;
}

export function baseLayout({ prefix = '', title, description, path = '/', currentSection = '', image = 'assets/images/employee-communications-1600.webp', preload = null, preloadSizes = '(min-width: 1024px) 50vw, 100vw', children, structuredData = [] }) {
  const canonical = absoluteUrl(path);
  const imageData = imageMetadata(image);
  const imageUrl = absoluteUrl(`/${imageData.path}`);
  const allStructuredData = Array.isArray(structuredData) ? structuredData : [structuredData];

  return `<!doctype html>
<html class="scroll-smooth" lang="${site.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${escapeHtml(site.author.name)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="color-scheme" content="light dark">
  <meta name="format-detection" content="telephone=no">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#f5f6f8" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#101622" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="${imageData.width}">
  <meta property="og:image:height" content="${imageData.height}">
  <meta property="og:image:alt" content="${escapeHtml(imageData.alt)}">
  <meta property="og:locale" content="${site.locale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="${escapeHtml(imageData.alt)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
  <link rel="icon" type="image/png" href="${asset(prefix, 'assets/favicons/favicon-96x96.png')}" sizes="96x96">
  <link rel="icon" type="image/svg+xml" href="${asset(prefix, 'assets/favicons/favicon.svg')}">
  <link rel="shortcut icon" href="${asset(prefix, 'assets/favicons/favicon.ico')}">
  <link rel="apple-touch-icon" sizes="180x180" href="${asset(prefix, 'assets/favicons/apple-touch-icon.png')}">
  <link rel="manifest" href="${asset(prefix, 'assets/favicons/site.webmanifest')}">
  ${preloadImage(prefix, preload, preloadSizes)}
  <script src="${asset(prefix, 'assets/js/theme.js')}"></script>
  <link rel="stylesheet" href="${asset(prefix, 'assets/css/styles.css')}">
  ${allStructuredData.filter(Boolean).map(jsonScript).join('\n  ')}
</head>
<body class="bg-background-light font-body text-slate-900 antialiased selection:bg-primary selection:text-white dark:bg-background-dark dark:text-slate-100">
  ${header(prefix, currentSection)}
  <main id="main" tabindex="-1">
    ${children}
  </main>
  ${footer(prefix)}
  <script src="${asset(prefix, 'assets/js/navigation.js')}" defer></script>
</body>
</html>`;
}
