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
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = `Portfolio contact from ${name}`;
  const body = `${message}\n\n— ${name} (${email})`;
  const mailto = `${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  status.className = 'form__status is-success';
  status.textContent = 'Opening your email app…';
});
