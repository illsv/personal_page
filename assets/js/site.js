/* illsv.com — the only script on the site: theme toggle, eased in-page scrolling, back-to-top. */
(function () {
  var root = document.documentElement;
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- Theme: follows the system until the toggle is used; the choice lives in localStorage. ---- */
  function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function remember(v) { try { v ? localStorage.setItem('theme', v) : localStorage.removeItem('theme'); } catch (e) {} }
  function systemTheme() { return systemDark.matches ? 'dark' : 'light'; }
  var toggle = document.querySelector('.theme-toggle');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var color = theme === 'dark' ? '#161410' : '#f4f1ea';
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', color);
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  apply(stored() || systemTheme());
  systemDark.addEventListener('change', function () { if (!stored()) apply(systemTheme()); });

  if (toggle) toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    remember(next === systemTheme() ? null : next); /* back on the system theme → stop overriding */
    apply(next);
  });

  /* ---- In-page links: eased scroll instead of the browser's jump or its fixed-speed smooth scroll. ---- */
  var scrollRun = 0; /* a new scroll cancels the one still running */
  function scrollToY(target, done) {
    var run = ++scrollRun;
    var start = window.scrollY, dist = target - start;
    if (reduceMotion.matches || Math.abs(dist) < 2) {
      window.scrollTo({ top: target, behavior: 'instant' });
      if (done) done();
      return;
    }
    var duration = Math.min(1100, Math.max(450, Math.abs(dist) * 0.25));
    var t0 = performance.now();
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function step(now) {
      if (run !== scrollRun) return;
      var p = Math.min(1, (now - t0) / duration);
      window.scrollTo({ top: start + dist * ease(p), behavior: 'instant' });
      if (p < 1) requestAnimationFrame(step); else if (done) done();
    }
    requestAnimationFrame(step);
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href]');
    if (!a) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    var id = decodeURIComponent(url.hash.slice(1));
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    var menu = a.closest('details.menu');
    if (menu) menu.removeAttribute('open');
    var y = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY;
    scrollToY(y, function () {
      history.pushState(null, '', url.hash);
      if (id !== 'top') { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
    });
  });

  /* ---- Back to top: appears after one viewport of scrolling. ---- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var shown = false;
    function onScroll() {
      var show = window.scrollY > window.innerHeight;
      if (show !== shown) { shown = show; toTop.classList.toggle('is-visible', show); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
