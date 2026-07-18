// Produced By GasMan - playlist music player with real audio playback + physics-based wave visualizer.
(function () {
  var TRACKS = [
    { id: "funnel-chaos-funk", title: "Funnel Chaos Funk", url: "https://www.flowmusic.app/song/b58f9a6b-cc26-41eb-b6db-1f20e63104c8", grad: ["#FF6B4A", "#FFB347"] },
    { id: "vortex-agression", title: "Vortex Agression", url: "https://www.flowmusic.app/song/03e43f85-1e8f-4243-b6e3-759ee343e209", grad: ["#7B2FFF", "#FF3D9A"] },
    { id: "the-physics-problem", title: "The Physics Problem", url: "https://www.flowmusic.app/song/00e17242-4309-4026-a4cc-ed9f945ec977", grad: ["#2EC4B6", "#1B6CA8"] },
    { id: "from-rejection-to-triumph", title: "From Rejection To Triumph", url: "https://www.flowmusic.app/song/46320a2f-80ca-40dc-966b-1d22c238c6a5", grad: ["#E9C46A", "#FF8C42"] },
    { id: "stop-motion-dreams", title: "Stop Motion Dreams", url: "https://www.flowmusic.app/song/5ebbc900-deb7-49b9-ad26-76b96d291a49", grad: ["#F2719A", "#7B5CFF"] },
    { id: "crafting-sessions", title: "Crafting Sessions", url: "https://www.flowmusic.app/song/5f5e34aa-da8d-4662-b643-4534053d6298", mood: "Mellow lo-fi hip-hop - dusty vinyl crackle, warm Rhodes piano - 80 bpm", grad: ["#E9C46A", "#3FB984"], featured: true },
    { id: "analytical-isolation", title: "Analytical Isolation", url: "https://www.flowmusic.app/song/edc4698b-4d76-4c16-ae6e-abf7c7318f9c", grad: ["#3D5AFE", "#6B7280"] }
  ];

  var DEFAULT_AUDIO = "assets/bg-music.mp3";

  var player = document.getElementById('mp-player');
  var orb = document.getElementById('mp-toggle');
  var panel = document.getElementById('mp-panel');
  var closeBtn = document.getElementById('mp-close');
  var listEl = document.getElementById('mp-list');
  var npTitle = document.getElementById('mp-np-title');
  var npArtist = document.getElementById('mp-np-artist');
  var npMood = document.getElementById('mp-np-mood');
  var npPlay = document.getElementById('mp-np-play');
  var npPlayIcon = document.getElementById('mp-np-play-icon');
  var npPlayLabel = document.getElementById('mp-np-play-label');
  var flowLink = document.getElementById('mp-flow-link');
  var mpArt = document.getElementById('mp-art');
  var audio = document.getElementById('mp-audio');
  if (!player || !orb || !panel || !audio) return;

  var activeId = (TRACKS.filter(function (t) { return t.featured; })[0] || TRACKS[0]).id;
  var open = false;
  var playing = false;
  var pendingAutoplay = true;

  // ---------- Physics-based wave visualizer ----------
  var canvas = document.getElementById('mp-wave-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var W = 0, H = 0, raf = null, tick = 0;
  var amp = 0, ampVel = 0, ampTarget = 0;

  function resizeWave() {
    if (!canvas || !ctx) return;
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = rect.width; H = rect.height;
  }

  function drawWave() {
    if (!ctx) return;
    tick += 1;
    var k = 0.055, damp = 0.86;
    ampVel = (ampVel + (ampTarget - amp) * k) * damp;
    amp = amp + ampVel;
    ctx.clearRect(0, 0, W, H);
    var layers = [
      { freq: 0.013, speed: 0.05, amp: 0.55, color: 'rgba(255,140,66,0.32)', w: 2, ph: 0 },
      { freq: 0.020, speed: -0.045, amp: 0.40, color: 'rgba(212,175,55,0.55)', w: 2, ph: 1.2 },
      { freq: 0.010, speed: 0.075, amp: 0.72, color: 'rgba(255,233,168,0.9)', w: 1.6, ph: 2.4 }
    ];
    var cy = H * 0.6;
    for (var li = 0; li < layers.length; li++) {
      var L = layers[li];
      var a = H * 0.26 * L.amp * amp;
      ctx.beginPath();
      for (var x = 0; x <= W; x += 2) {
        var y = cy + Math.sin(x * L.freq + tick * L.speed + L.ph) * a
              + Math.sin(x * L.freq * 2.3 + tick * L.speed * 1.7 + L.ph) * (a * 0.35);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = L.color; ctx.lineWidth = L.w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.stroke();
    }
    if (ampTarget > 0 || amp > 0.02 || Math.abs(ampVel) > 0.02) {
      raf = requestAnimationFrame(drawWave);
    } else {
      raf = null;
      ctx.clearRect(0, 0, W, H);
    }
  }

  function startWave() { ampTarget = 1; if (!raf) { resizeWave(); raf = requestAnimationFrame(drawWave); } }
  function stopWave() { ampTarget = 0; if (!raf && ctx) raf = requestAnimationFrame(drawWave); }
  function pulseWave() {
    ampTarget = 1.5;
    var wasOpen = open;
    setTimeout(function () { ampTarget = wasOpen ? 1 : 0; }, 220);
    if (!raf && ctx) { resizeWave(); raf = requestAnimationFrame(drawWave); }
  }
  if (window && canvas) window.addEventListener('resize', function () { if (open) resizeWave(); });

  // ---------- Playlist ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function artFor(t) {
    var g = t.grad || ['#D4AF37', '#F5EFE6'];
    return 'radial-gradient(circle at 28% 32%, ' + g[0] + ' 0%, ' + g[1] + ' 60%, #14110b 100%)';
  }

  function trackById(id) { return TRACKS.filter(function (x) { return x.id === id; })[0] || TRACKS[0]; }
  function trackSrc(t) { return t.file ? t.file : DEFAULT_AUDIO; }

  function setPlaying(v) {
    playing = v;
    if (npPlayIcon) npPlayIcon.className = v ? 'fas fa-pause' : 'fas fa-play';
    if (npPlayLabel) npPlayLabel.textContent = v ? 'Pause' : 'Play';
    if (npPlay) npPlay.setAttribute('aria-label', v ? 'Pause' : 'Play');
    if (v) startWave(); else stopWave();
  }

  function updateNowPlaying() {
    var t = trackById(activeId);
    if (npTitle) npTitle.textContent = t.title;
    if (npArtist) npArtist.textContent = 'GasMan - Flow Music';
    if (npMood) { npMood.textContent = t.mood || ''; npMood.style.display = t.mood ? 'block' : 'none'; }
    if (flowLink) flowLink.href = t.url || '#';
    if (mpArt) mpArt.style.background = artFor(t);
    player.classList.add('active');
    if (open) pulseWave();
  }

  function render() {
    var html = TRACKS.map(function (t, i) {
      var active = t.id === activeId;
      var idx = active ? '<span class="mp-eq"><i></i><i></i><i></i></span>'
               : (t.featured ? '<i class="fas fa-star"></i>' : (i + 1));
      var sub = t.featured ? 'Featured' : 'Flow Music';
      return '<button class="mp-track' + (active ? ' active' : '') + '" data-id="' + t.id + '" role="listitem">' +
        '<span class="mp-track-idx">' + idx + '</span>' +
        '<span class="mp-track-meta"><span class="mp-track-title">' + escapeHtml(t.title) + '</span>' +
        '<span class="mp-track-sub">' + sub + '</span></span>' +
        '<span class="mp-track-go"><i class="fas fa-play"></i></span></button>';
    }).join('');
    listEl.innerHTML = html;
    var rows = listEl.querySelectorAll('.mp-track');
    for (var k = 0; k < rows.length; k++) {
      rows[k].addEventListener('click', (function (id) { return function () { playTrack(id); }; })(rows[k].dataset.id));
    }
    updateNowPlaying();
  }

  // ---------- Audio playback ----------
  function loadTrack(id) {
    activeId = id;
    var t = trackById(id);
    audio.src = trackSrc(t);
    var rows = listEl.querySelectorAll('.mp-track');
    for (var k = 0; k < rows.length; k++) rows[k].classList.toggle('active', rows[k].dataset.id === id);
    updateNowPlaying();
  }

  function playTrack(id) {
    if (id !== activeId || !audio.src) loadTrack(id);
    pendingAutoplay = false;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () { setPlaying(true); }).catch(function () { setPlaying(false); pendingAutoplay = true; });
    } else {
      setPlaying(true);
    }
  }

  function pauseTrack() { audio.pause(); setPlaying(false); }
  function togglePlay() { if (playing) pauseTrack(); else playTrack(activeId); }

  function nextTrack() {
    var idx = -1;
    for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === activeId) idx = i;
    var nx = TRACKS[(idx + 1) % TRACKS.length];
    playTrack(nx.id);
  }

  audio.addEventListener('ended', nextTrack);
  audio.addEventListener('play', function () { setPlaying(true); });
  audio.addEventListener('pause', function () { setPlaying(false); });

  if (npPlay) npPlay.addEventListener('click', function (e) { e.preventDefault(); togglePlay(); });

  function setOpen(v) {
    open = v;
    panel.classList.toggle('open', v);
    panel.setAttribute('aria-hidden', v ? 'false' : 'true');
    if (v) startWave(); else stopWave();
  }

  orb.addEventListener('click', function () { setOpen(!open); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });

  render();
  loadTrack(activeId);

  // Autoplay featured ("Crafting Sessions") on load. Browsers block unmuted autoplay without a gesture, so retry on first interaction.
  function tryAutoplay() {
    if (!pendingAutoplay) return;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () { pendingAutoplay = false; setPlaying(true); }).catch(function () {});
    } else { pendingAutoplay = false; setPlaying(true); }
  }
  tryAutoplay();
  function onGesture() {
    tryAutoplay();
    document.removeEventListener('click', onGesture);
    document.removeEventListener('keydown', onGesture);
    document.removeEventListener('touchstart', onGesture);
  }
  document.addEventListener('click', onGesture);
  document.addEventListener('keydown', onGesture);
  document.addEventListener('touchstart', onGesture);
})();
