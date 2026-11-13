// Theme toggle: light (frosted glass) is the default; dark is opt-in and
// remembered in localStorage. The inline script in <head> already applies
// a stored 'dark' preference before first paint, to avoid a flash.
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const root = document.documentElement;

  function syncThemeToggleLabel() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    syncThemeToggleLabel();
  });

  syncThemeToggleLabel();
}

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Close menu when a link is tapped (mobile)
menu.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: build a pre-filled mailto: link from the fields and hand
// off to the visitor's email app. No backend or third-party form service
// needed. If JS is off, the form's own mailto action/enctype (see
// index.html) still opens a blank pre-addressed email as a fallback.
// Guarded because not every page (e.g. personal.html) has this form.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\nFrom: ${name} (${email})`;
    const mailto = `${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    status.className = 'form__status is-success';
    status.textContent = 'Opening your email app…';
  });
}

// In-place project screenshot carousel: a "View screenshots" button swaps
// the card's main image (brand art) for a flippable set of real screenshots,
// kept as a hidden set of <img> tags next to each card. No modal — the
// carousel plays out where the main image already is.
document.querySelectorAll('.case__gallery-btn').forEach((btn) => {
  const media = btn.closest('.case__media');
  const img = media.querySelector('.case__media-img');
  const prevBtn = media.querySelector('.case__nav--prev');
  const nextBtn = media.querySelector('.case__nav--next');
  const counter = media.querySelector('.case__counter');
  const label = btn.querySelector('.case__gallery-btn-label');
  const data = document.getElementById(btn.dataset.galleryTarget);

  const brandSrc = img.getAttribute('src');
  const brandAlt = img.getAttribute('alt');
  const shots = Array.from(data.querySelectorAll('img')).map((shot) => ({
    src: shot.getAttribute('src'),
    alt: shot.getAttribute('alt'),
  }));

  let active = false;
  let index = 0;

  function renderShot() {
    const shot = shots[index];
    img.src = shot.src;
    img.alt = shot.alt;
    counter.textContent = `${index + 1} / ${shots.length}`;
  }

  function enterGallery() {
    active = true;
    index = 0;
    renderShot();
    media.classList.add('case__media--gallery');
    prevBtn.hidden = false;
    nextBtn.hidden = false;
    counter.hidden = false;
    label.textContent = 'Back to overview';
  }

  function exitGallery() {
    active = false;
    img.src = brandSrc;
    img.alt = brandAlt;
    media.classList.remove('case__media--gallery');
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    counter.hidden = true;
    label.textContent = `View ${shots.length} screenshots`;
  }

  btn.addEventListener('click', () => (active ? exitGallery() : enterGallery()));
  prevBtn.addEventListener('click', () => {
    index = (index - 1 + shots.length) % shots.length;
    renderShot();
  });
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % shots.length;
    renderShot();
  });
});
