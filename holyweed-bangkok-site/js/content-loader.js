// Loads editable homepage content (hero banner + reviews banner) from
// /content/home.json and applies it to any element tagged with a
// data-cms="<key>" attribute. This lets the admin panel (Decap CMS) change
// this text/photo without editing HTML directly.
//
// If content/home.json can't be reached for any reason, the page silently
// keeps whatever text is already hardcoded in the HTML — nothing breaks.
(function () {
  fetch('/content/home.json', { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error('content/home.json not found');
      return res.json();
    })
    .then(function (data) {
      document.querySelectorAll('[data-cms]').forEach(function (el) {
        var key = el.getAttribute('data-cms');
        if (!key || !(key in data) || !data[key]) return;
        var attr = el.getAttribute('data-cms-attr');
        if (attr) {
          el.setAttribute(attr, data[key]);
        } else {
          el.textContent = data[key];
        }
      });
    })
    .catch(function () {
      // No content file yet, or it failed to load — keep the page as-is.
    });
})();
