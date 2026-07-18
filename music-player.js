// Sonic Forge - playlist music player for the portfolio.
// flowmusic.app songs can't be self-hosted (no direct audio URL, Cloudflare-gated),
// so each track launches on Flow Music; this player curates the list, features
// "Crafting Sessions", and shows a now-playing visualizer.
(function () {
  var TRACKS = [
    { id: "funnel-chaos-funk", title: "Funnel Chaos Funk", url: "https://www.flowmusic.app/song/b58f9a6b-cc26-41eb-b6db-1f20e63104c8" },
    { id: "vortex-agression", title: "Vortex Agression", url: "https://www.flowmusic.app/song/03e43f85-1e8f-4243-b6e3-759ee343e209" },
    { id: "the-physics-problem", title: "The Physics Problem", url: "https://www.flowmusic.app/song/00e17242-4309-4026-a4cc-ed9f945ec977" },
    { id: "from-rejection-to-triumph", title: "From Rejection To Triumph", url: "https://www.flowmusic.app/song/46320a2f-80ca-40dc-966b-1d22c238c6a5" },
    { id: "stop-motion-dreams", title: "Stop Motion Dreams", url: "https://www.flowmusic.app/song/5ebbc900-deb7-49b9-ad26-76b96d291a49" },
    { id: "crafting-sessions", title: "Crafting Sessions", url: "https://www.flowmusic.app/song/5f5e34aa-da8d-4662-b643-4534053d6298", mood: "Mellow lo-fi hip-hop - dusty vinyl crackle, warm Rhodes piano - 80 bpm", featured: true },
    { id: "analytical-isolation", title: "Analytical Isolation", url: "https://www.flowmusic.app/song/edc4698b-4d76-4c16-ae6e-abf7c7318f9c" }
  ];

  var player = document.getElementById('mp-player');
  var orb = document.getElementById('mp-toggle');
  var panel = document.getElementById('mp-panel');
  var closeBtn = document.getElementById('mp-close');
  var listEl = document.getElementById('mp-list');
  var npTitle = document.getElementById('mp-np-title');
  var npArtist = document.getElementById('mp-np-artist');
  var npMood = document.getElementById('mp-np-mood');
  var npPlay = document.getElementById('mp-np-play');
  if (!player || !orb || !panel) return;

  var activeId = (TRACKS.filter(function (t) { return t.featured; })[0] || TRACKS[0]).id;
  var open = false;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render() {
    var html = TRACKS.map(function (t, i) {
      var active = t.id === activeId;
      var num = t.featured ? '<i class="fas fa-star"></i>' : (i + 1);
      var sub = t.featured ? 'Featured' : 'Flow Music';
      return '<button class="mp-track' + (active ? ' active' : '') + '" data-id="' + t.id + '">' +
        '<span class="mp-track-num">' + num + '</span>' +
        '<span class="mp-track-meta"><span class="mp-track-title">' + escapeHtml(t.title) + '</span>' +
        '<span class="mp-track-sub">' + sub + '</span></span>' +
        '<span class="mp-track-go"><i class="fas fa-play"></i></span></button>';
    }).join('');
    listEl.innerHTML = html;
    var rows = listEl.querySelectorAll('.mp-track');
    for (var k = 0; k < rows.length; k++) {
      rows[k].addEventListener('click', (function (id) { return function () { select(id, true); }; })(rows[k].dataset.id));
    }
    updateNowPlaying();
  }

  function updateNowPlaying() {
    var t = TRACKS.filter(function (x) { return x.id === activeId; })[0] || TRACKS[0];
    if (npTitle) npTitle.textContent = t.title;
    if (npArtist) npArtist.textContent = 'GasMan - Flow Music';
    if (npMood) { npMood.textContent = t.mood || ''; npMood.style.display = t.mood ? 'block' : 'none'; }
    if (npPlay) npPlay.href = t.url;
    player.classList.add('active');
  }

  function select(id, launch) {
    activeId = id;
    var t = TRACKS.filter(function (x) { return x.id === id; })[0];
    var rows = listEl.querySelectorAll('.mp-track');
    for (var k = 0; k < rows.length; k++) rows[k].classList.toggle('active', rows[k].dataset.id === id);
    updateNowPlaying();
    if (launch && t) window.open(t.url, '_blank', 'noopener,noreferrer');
  }

  function setOpen(v) {
    open = v;
    panel.classList.toggle('open', v);
    panel.setAttribute('aria-hidden', v ? 'false' : 'true');
  }

  orb.addEventListener('click', function () { setOpen(!open); });
  orb.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } });
  if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });

  render();
})();