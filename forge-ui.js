// Forge UI - micro-interactions + command palette. Self-initializing, no deps.
(function () {
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // ---- Cursor spotlight ----
  if (!prefersReduced) {
    var spot = document.createElement('div');
    spot.className = 'forge-spotlight';
    document.body.appendChild(spot);
    var sx = 0, sy = 0, cx = 0, cy = 0, raf = null;
    window.addEventListener('mousemove', function (e) { sx = e.clientX; sy = e.clientY; spot.classList.add('on'); if (!raf) raf = requestAnimationFrame(loop); });
    document.addEventListener('mouseleave', function () { spot.classList.remove('on'); });
    function loop() {
      cx += (sx - cx) * 0.12; cy += (sy - cy) * 0.12;
      spot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      if (Math.abs(sx - cx) > 0.5 || Math.abs(sy - cy) > 0.5) raf = requestAnimationFrame(loop); else raf = null;
    }
  }

  // ---- Magnetic buttons ----
  if (!prefersReduced) {
    var mags = document.querySelectorAll('[data-magnetic], .mp-cta, .modal-close, .logo, .btn, .cta-btn, .hero-cta');
    for (var i = 0; i < mags.length; i++) (function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) / r.width;
        var my = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = 'translate(' + (mx * 8) + 'px,' + (my * 8) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    })(mags[i]);
  }

  // ---- 3D tilt ----
  if (!prefersReduced) {
    var tilts = document.querySelectorAll('[data-tilt], .forge-tilt');
    for (var j = 0; j < tilts.length; j++) (function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var rx = -((e.clientY - r.top) / r.height - 0.5) * 10;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
        el.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    })(tilts[j]);
  }

  // ---- Kinetic reveals ----
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var heads = document.querySelectorAll('h1, h2:not(.modal-title), .section-title, .hero-title');
    for (var k = 0; k < heads.length; k++) heads[k].classList.add('forge-reveal');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    var revs = document.querySelectorAll('.forge-reveal');
    for (var m = 0; m < revs.length; m++) io.observe(revs[m]);
    setTimeout(function () {
      for (var n = 0; n < revs.length; n++) {
        var rect = revs[n].getBoundingClientRect();
        if (rect.top < window.innerHeight) revs[n].classList.add('is-visible');
      }
    }, 60);
  }

  // ---- Command palette ----
  var PAGES = [
    { label: 'Gaming', sub: 'Play in browser', href: '/gaming/', icon: 'fa-gamepad' },
    { label: 'Content', sub: 'Creator hub', href: '/content/', icon: 'fa-video' },
    { label: 'Kaggle', sub: 'Data and notebooks', href: '/kaggle/', icon: 'fa-chart-line' },
    { label: 'Home', sub: 'Top of page', href: '/', icon: 'fa-house' }
  ];

  function buildCommands() {
    var cmds = [];
    var nav = document.querySelectorAll('.nav-links a, nav a');
    var seen = {};
    for (var i = 0; i < nav.length; i++) {
      var a = nav[i];
      var href = a.getAttribute('href') || '';
      var label = (a.textContent || '').trim();
      if (!label || seen[href]) continue;
      seen[href] = true;
      if (href.charAt(0) === '#') cmds.push({ label: label, sub: 'Section', href: href, icon: 'fa-hashtag', type: 'scroll' });
    }
    if (!seen['#creative-lab']) cmds.push({ label: 'Creative Lab', sub: 'Generative mastery', href: '#creative-lab', icon: 'fa-palette', type: 'scroll' });
    for (var p = 0; p < PAGES.length; p++) {
      var pg = PAGES[p];
      if (!seen[pg.href]) cmds.push({ label: pg.label, sub: pg.sub, href: pg.href, icon: pg.icon, type: 'page' });
    }
    cmds.push({ label: 'Toggle Music', sub: 'Produced By GasMan', href: '#mp-toggle', icon: 'fa-music', type: 'click' });
    return cmds;
  }

  var palette = null, input = null, list = null, items = [], active = 0, cmds = [];

  function ensurePalette() {
    if (palette) return;
    palette = document.createElement('div');
    palette.className = 'forge-palette';
    palette.innerHTML =
      '<div class="forge-palette-box">' +
      '<input class="forge-palette-input" id="forge-palette-input" placeholder="Jump to anything..." autocomplete="off" />' +
      '<div class="forge-palette-list" id="forge-palette-list"></div>' +
      '<div class="forge-palette-foot"><span>GasMan Command</span><span><kbd>arrows</kbd> navigate &nbsp; <kbd>enter</kbd> open &nbsp; <kbd>esc</kbd> close</span></div>' +
      '</div>';
    document.body.appendChild(palette);
    input = palette.querySelector('#forge-palette-input');
    list = palette.querySelector('#forge-palette-list');
    palette.addEventListener('click', function (e) { if (e.target === palette) closePalette(); });
    input.addEventListener('input', renderList);
    input.addEventListener('keydown', onKey);
  }

  function filtered() {
    var q = (input.value || '').toLowerCase().trim();
    return cmds.filter(function (c) { return !q || c.label.toLowerCase().indexOf(q) >= 0 || c.sub.toLowerCase().indexOf(q) >= 0; });
  }

  function renderList() {
    var f = filtered();
    if (active >= f.length) active = 0;
    if (!f.length) { list.innerHTML = '<div style="padding:16px;color:#6b6555;font-size:13px;">No results</div>'; items = []; return; }
    list.innerHTML = f.map(function (c, i) {
      return '<button class="forge-cmd' + (i === active ? ' active' : '') + '" data-i="' + i + '">' +
        '<i class="fas ' + c.icon + '"></i><span>' + c.label + '</span>' +
        '<span class="forge-cmd-hint">' + c.sub + '</span></button>';
    }).join('');
    items = list.querySelectorAll('.forge-cmd');
    for (var k = 0; k < items.length; k++) items[k].addEventListener('click', (function (idx) { return function () { active = idx; runActive(); }; })(k));
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); var n = filtered().length; active = (active + 1) % Math.max(1, n); renderList(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); var n2 = filtered().length; active = (active - 1 + n2) % Math.max(1, n2); renderList(); }
    else if (e.key === 'Enter') { e.preventDefault(); runActive(); }
  }

  function runActive() {
    var f = filtered();
    var c = f[active] || f[0] || cmds[0];
    if (!c) return;
    closePalette();
    setTimeout(function () { execCommand(c); }, 60);
  }

  function execCommand(c) {
    if (c.type === 'scroll') {
      var el = document.querySelector(c.href);
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (c.type === 'click') {
      var t = document.querySelector(c.href);
      if (t) t.click();
    } else if (c.type === 'page') {
      if (window.parent) window.parent.postMessage({ type: 'portfolio-navigate', url: c.href }, '*');
    }
  }

  function openPalette() {
    ensurePalette();
    cmds = buildCommands();
    active = 0;
    if (input) input.value = '';
    palette.classList.add('open');
    setTimeout(function () { if (input) input.focus(); renderList(); }, 50);
  }
  function closePalette() { if (palette) palette.classList.remove('open'); }

  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (palette && palette.classList.contains('open')) closePalette(); else openPalette();
    }
    if (e.key === 'Escape' && palette && palette.classList.contains('open')) closePalette();
  });
})();
