/* Karatas Global — V2. Small, dependency-free behaviours. */
(function () {
  'use strict';

  var PHONE = '353834277556';
  var EMAIL = 'omer@karatasglobal.com';

  /* Header turns solid once the page is scrolled. */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-solid', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile navigation. */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    document.documentElement.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setNav(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setNav(false); }
  });

  /* Links that carry a topic pre-fill the requirement field. */
  var form = document.getElementById('req-form');
  var need = document.getElementById('req-need');
  document.querySelectorAll('[data-topic]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!need.value.trim()) { need.value = link.getAttribute('data-topic') + ': '; }
    });
  });

  /* Requirement form: validates, then opens email or WhatsApp with the details filled in. */
  function check(field) {
    var wrap = field.closest('.field');
    var bad = field.required && !field.value.trim();
    wrap.classList.toggle('is-invalid', bad);
    var msg = wrap.querySelector('.field__error');
    if (msg) { msg.hidden = !bad; }
    field.setAttribute('aria-invalid', String(bad));
    return !bad;
  }
  form.addEventListener('input', function (e) {
    if (e.target.closest('.is-invalid')) { check(e.target); }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea'));
    var firstBad = null;
    fields.forEach(function (f) { if (!check(f) && !firstBad) { firstBad = f; } });
    if (firstBad) { firstBad.focus(); return; }

    var v = function (name) { return form.elements[name].value.trim(); };
    var lines = ['Requirement: ' + v('need'), 'Name: ' + v('name')];
    if (v('company')) { lines.push('Company: ' + v('company')); }
    lines.push('Contact: ' + v('contact'));
    var body = lines.join('\n');

    var channel = (e.submitter && e.submitter.getAttribute('data-channel')) || 'email';
    if (channel === 'whatsapp') {
      window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent('Sourcing requirement\n' + body), '_blank', 'noopener');
    } else {
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Sourcing requirement') + '&body=' + encodeURIComponent(body);
    }
  });
})();
