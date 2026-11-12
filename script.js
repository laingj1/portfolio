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

// Screenshot lightbox: a "View screenshots" button opens a <dialog> carousel
// built from a hidden set of <img> tags kept next to each project card.
// Guarded because not every page has a lightbox or gallery buttons.
const lightbox = document.getElementById('lightbox');
const galleryButtons = document.querySelectorAll('.case__gallery-btn');

if (lightbox && galleryButtons.length) {
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const counter = lightbox.querySelector('.lightbox__counter');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  let images = [];
  let index = 0;

  function render() {
    const item = images[index];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    counter.textContent = `${index + 1} / ${images.length}`;
  }

  galleryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const data = document.getElementById(btn.dataset.galleryTarget);
      images = Array.from(data.querySelectorAll('img')).map((img) => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
      }));
      index = 0;
      render();
      lightbox.showModal();
    });
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    render();
  });
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    render();
  });
  closeBtn.addEventListener('click', () => lightbox.close());

  // Click outside the card (on the backdrop) closes it.
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}
