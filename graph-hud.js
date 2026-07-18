// Graph HUD + node spec sheets. Reads window.__GRAPH__ exposed by graph.js.
(function () {
  var container = document.getElementById('graph-container');
  if (!container) return;

  var hud = document.createElement('div');
  hud.className = 'graph-hud';
  hud.innerHTML =
    '<div class="gh-row"><span class="gh-dot"></span><span class="gh-label">Knowledge Graph</span></div>' +
    '<div class="gh-stats">' +
      '<div class="gh-stat"><span class="gh-num" id="gh-nodes">0</span><span class="gh-cap">Nodes</span></div>' +
      '<div class="gh-stat"><span class="gh-num" id="gh-projects">0</span><span class="gh-cap">Projects</span></div>' +
      '<div class="gh-stat"><span class="gh-num" id="gh-skills">0</span><span class="gh-cap">Skills</span></div>' +
      '<div class="gh-stat"><span class="gh-num" id="gh-clusters">0</span><span class="gh-cap">Clusters</span></div>' +
    '</div>';
  container.appendChild(hud);

  var reticle = document.createElement('div');
  reticle.className = 'graph-reticle';
  reticle.innerHTML = '<span class="gr-line"></span><span class="gr-tag">LIVE</span>';
  container.appendChild(reticle);

  var elN = hud.querySelector('#gh-nodes'), elP = hud.querySelector('#gh-projects'),
      elS = hud.querySelector('#gh-skills'), elC = hud.querySelector('#gh-clusters');

  function refresh() {
    var G = window.__GRAPH__; if (!G) return;
    var nodes = G.getNodes(), skills = G.getSkillData();
    var pn = 0, sn = 0, cats = {};
    for (var i = 0; i < nodes.length; i++) { if (nodes[i].kind === 'project') pn++; else if (nodes[i].kind === 'skill') sn++; }
    for (var j = 0; j < skills.length; j++) { if (skills[j].category) cats[skills[j].category] = 1; }
    if (elN) elN.textContent = nodes.length;
    if (elP) elP.textContent = pn;
    if (elS) elS.textContent = sn;
    if (elC) elC.textContent = Object.keys(cats).length;
  }
  setInterval(refresh, 800);
  setTimeout(refresh, 1500);

  var sheet = document.createElement('div');
  sheet.className = 'graph-spec';
  sheet.innerHTML =
    '<div class="gs-head"><span class="gs-kind" id="gs-kind"></span><span class="gs-title" id="gs-title"></span></div>' +
    '<div class="gs-desc" id="gs-desc"></div>' +
    '<div class="gs-meta"><div class="gs-row"><span class="gs-k">Stack</span><span class="gs-v" id="gs-stack"></span></div>' +
    '<div class="gs-row"><span class="gs-k">Links</span><span class="gs-v" id="gs-links"></span></div></div>';
  document.body.appendChild(sheet);
  var gsKind = sheet.querySelector('#gs-kind'), gsTitle = sheet.querySelector('#gs-title'),
      gsDesc = sheet.querySelector('#gs-desc'), gsStack = sheet.querySelector('#gs-stack'),
      gsLinks = sheet.querySelector('#gs-links');

  window.__GRAPH_HOVER__ = function (node, x, y) {
    if (!node) { sheet.classList.remove('show'); return; }
    var G = window.__GRAPH__; if (!G) return;
    var skills = G.getSkillData(), links = G.getSkillLinks();
    var ud = node.userData;
    var title = '', kind = '', desc = '', stack = '', linkCount = '';
    if (ud.project) {
      var p = ud.project;
      title = p.label || p.id; kind = (p.group || 'Project').toUpperCase(); desc = p.description || '';
      var ids = links.filter(function (l) { return l.project === p.id; }).map(function (l) { return l.skill; });
      stack = (p.techStack || p.tech_stack) || skills.filter(function (s) { return ids.indexOf(s.id) >= 0; }).map(function (s) { return s.name; }).join(', ');
      linkCount = (p.links ? p.links.length : 0) + ' external';
    } else if (ud.skill) {
      var s = ud.skill;
      title = s.name || s.id; kind = (s.category || 'Skill').toUpperCase(); desc = s.description || 'Skill node in the knowledge graph.';
      var projIds = links.filter(function (l) { return l.skill === s.id; }).map(function (l) { return l.project; });
      linkCount = projIds.length + ' projects';
    } else if (ud.isCore) {
      title = 'GasMan Core'; kind = 'CORE'; desc = 'Central node - click to open the AI assistant.'; linkCount = '-';
    }
    gsKind.textContent = kind; gsTitle.textContent = title;
    gsDesc.textContent = desc;
    gsStack.textContent = stack || '-'; gsStack.style.display = stack ? 'block' : 'none';
    gsLinks.textContent = linkCount || '-';
    sheet.classList.add('show');
    var w = 280, h = sheet.offsetHeight || 140, pad = 14;
    var vx = x + 16, vy = y + 16;
    if (vx + w + pad > window.innerWidth) vx = x - w - 16;
    if (vy + h + pad > window.innerHeight) vy = Math.max(8, y - h - 16);
    sheet.style.left = vx + 'px'; sheet.style.top = vy + 'px';
  };
})();
