// HOLYWEED Bangkok — shared site behavior
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Footer year
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form (client-side only — no backend wired up yet)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var age = form.querySelector('#confirm-age');
      if (age && !age.checked) {
        status.textContent = 'Please confirm you are 20 years of age or older to continue.';
        status.style.color = '#b3261e';
        return;
      }
      status.textContent = 'Thanks — this form is a placeholder for now. Please reach us directly via LINE or phone for the fastest response while online submission is being connected.';
      status.style.color = '#3f4d38';
      form.reset();
    });
  }
});
