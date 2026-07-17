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

// Progressive enhancement: AJAX submit for the Formspree form.
// If JS is off, the form still POSTs normally and works.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = 'form__status';
  status.textContent = 'Sending…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      form.reset();
      status.textContent = 'Thanks — your message was sent.';
      status.classList.add('is-success');
    } else {
      status.textContent = 'Something went wrong. Please email me directly.';
      status.classList.add('is-error');
    }
  } catch {
    status.textContent = 'Network error. Please try again.';
    status.classList.add('is-error');
  }
});

// Experience timeline: filter roles by skill tag.
// Progressive enhancement — without JS, every role is simply shown.
const chips = document.querySelectorAll('.exp__filter .chip');
const roles = document.querySelectorAll('.timeline .tl');
const emptyMsg = document.getElementById('exp-empty');

if (chips.length) {
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      // Update chip states
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });

      // Show/hide roles
      let visible = 0;
      roles.forEach((role) => {
        const tags = (role.dataset.tags || '').split(' ');
        const match = filter === 'all' || tags.includes(filter);
        role.hidden = !match;
        if (match) visible++;
      });

      emptyMsg.hidden = visible !== 0;
    });
  });
}
