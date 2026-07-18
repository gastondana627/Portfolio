// ============================================================
//  Knowledge Graph - Refined 3D (real force simulation)
//  Self-contained: depends only on THREE (r128) global.
//  Preserves: groupColors/skillColors, loadProjects (Railway +
//  fallback), showProjectDetails/closeModal/openChatbot,
//  zoomToProjectNode, search + deep-link, modal/carousel plumbing.
// ============================================================

// --- SETUP ---
const container = document.getElementById('graph-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070A, 0.02);

const viewW = container.clientWidth || window.innerWidth;
const viewH = container.clientHeight || 600;
const camera = new THREE.PerspectiveCamera(58, viewW / viewH, 0.1, 2000);
camera.position.set(0, 3, 22);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(viewW, viewH);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const plane = new THREE.Plane();
const tmpV = new THREE.Vector3();

let hoveredNode = null;
let selectedNode = null;
let hoveredPrism = false;

let projectNodes = [];
let skillNodes = [];
let projectData = [];
let skillData = [];
let skillLinks = [];
let skillConnectionLines = [];

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// --- PALETTE (preserved) ---
const groupColors = {
    'AI Projects': { main: 0xD4AF37, outline: 0xFF8C42 },
    'Gaming': { main: 0xFF8C42, outline: 0xD4AF37 },
    'Ethical Hacking': { main: 0xB8860B, outline: 0xFF8C42 },
    'default': { main: 0xFFFFFF, outline: 0xD4AF37 }
};
const skillColors = {
    'Language': { main: 0xFFD700, outline: 0xD4AF37 },
    'AI': { main: 0xD4AF37, outline: 0xFFD700 },
    'Database': { main: 0xFF8C42, outline: 0xD4AF37 },
    'Geospatial': { main: 0xDAA520, outline: 0xFF8C42 },
    'Domain': { main: 0xE67E22, outline: 0xFF8C42 }
};

// --- LIGHTING (three-point + ambient for glassy depth) ---
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const keyLight = new THREE.PointLight(0xffe8b0, 1.5, 0, 2); keyLight.position.set(14, 16, 14); scene.add(keyLight);
const rimLight = new THREE.PointLight(0x6cf2ff, 0.9, 0, 2); rimLight.position.set(-16, -6, -12); scene.add(rimLight);
const fillLight = new THREE.PointLight(0xff8c42, 0.6, 0, 2); fillLight.position.set(0, -12, 10); scene.add(fillLight);

// --- HELPERS ---
function hexToCss(hex) { return '#' + hex.toString(16).padStart(6, '0'); }
function hexToRgba(hex, a) {
    const r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
function makeGlowSprite(colorHex, size) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,0.9)');
    grd.addColorStop(0.25, hexToRgba(colorHex, 0.55));
    grd.addColorStop(1, hexToRgba(colorHex, 0));
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const s = new THREE.Sprite(mat); s.scale.set(size, size, 1);
    return s;
}
function makeLabel(text, colorHex) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128;
    const g = c.getContext('2d');
    g.font = '600 42px Inter, Poppins, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = hexToCss(colorHex);
    g.shadowColor = 'rgba(0,0,0,0.85)'; g.shadowBlur = 12;
    g.fillText(text, 256, 64);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const s = new THREE.Sprite(mat);
    s.scale.set(2.6, 2.6 * 128 / 512, 1);
    return s;
}

// --- CENTRAL CORE (glassy gold octahedron, chatbot trigger) ---
let prism = null;
(function createCore() {
    const geo = new THREE.OctahedronGeometry(1.5, 0);
    const mat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37, metalness: 0.65, roughness: 0.15,
        transparent: true, opacity: 0.92, emissive: 0x6a4a00, emissiveIntensity: 0.4
    });
    prism = new THREE.Mesh(geo, mat);
    prism.userData.isCore = true;
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xFFE9A8, transparent: true, opacity: 0.6 }));
    prism.add(edges);
    prism.add(makeGlowSprite(0xD4AF37, 6));
    scene.add(prism);
})();

// --- PHYSICS PARAMS (slider-driven) ---
const params = {
    charge: 40,        // repulsion magnitude
    link: 0.06,         // spring stiffness
    linkDistance: 7,   // desired link length
    center: 0.012,      // gravity toward origin
    damping: 0.86,
    collide: 1.7,
    alpha: 1,
    alphaDecay: 0.01,
    alphaMin: 0.05     // gentle simmer so it stays alive
};
let simNodes = [];   // {mesh, glow, label, kind, data, pos, vel, fixed, radius, baseOpacity}
let simLinks = [];   // {source, target, line}
function reheat(v) { params.alpha = Math.min(1, Math.max(params.alpha, v)); }

// --- AUDIO (compat for site music toggle) ---
let analyser, dataArray, audioGainNode = null;
function initAudio() {
    try {
        const el = document.getElementById('background-music');
        if (!el) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const src = ctx.createMediaElementSource(el);
        audioGainNode = ctx.createGain(); audioGainNode.gain.value = 0.3;
        analyser = ctx.createAnalyser(); analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        src.connect(audioGainNode); audioGainNode.connect(analyser); analyser.connect(ctx.destination);
        if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { console.warn('Audio init failed', e); }
}

// --- LOAD PROJECTS (Railway + fallback) ---
async function loadProjects() {
    try {
        const apiUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:5000/api/projects'
            : 'https://portfolio-production-b1b4.up.railway.app/api/projects';
        const response = await fetch(apiUrl);
        const data = await response.json();
        projectData = data.projects || data.nodes;
        skillData = data.skills || [];
        skillLinks = data.skill_links || [];
    } catch (error) {
        projectData = [
            { id: "stargate", group: "Gaming", label: "Project Stargate", description: "Gaming mentorship personas", links: [{ type: "github", url: "https://github.com/gastondana627/Stargate-and-Bobot" }] },
            { id: "peata", group: "AI Projects", label: "Peata", description: "AI pet recovery assistant", links: [{ type: "github", url: "https://github.com/gastondana627/Peata" }] },
            { id: "relic", group: "AI Projects", label: "Relic", description: "Archaeological research assistant", links: [{ type: "github", url: "https://github.com/gastondana627/Team-Relic-Xingu-Challenge" }] },
            { id: "sesa", group: "Ethical Hacking", label: "SESA", description: "Multi-agent AI system", links: [] },
            { id: "astro_archive", group: "AI Projects", label: "Astro Archive", description: "Memory-aware coaching agents", links: [{ type: "github", url: "https://github.com/gastondana627/Mongo_DB_NASA_OSDR" }] },
            { id: "nasa_kg", group: "AI Projects", label: "NASA Knowledge Graph", description: "Biological data mapping for astronaut health", links: [{ type: "github", url: "https://github.com/gastondana627/spoke_genelab" }] },
            { id: "planetrics", group: "AI Projects", label: "Planetrics", description: "Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog.", links: [{ type: "video", url: "https://www.linkedin.com/posts/gaston-d-859653184_plotly-python-datascience-activity-7380386160432500736-P6OA" }] },
            { id: "ai-room-designer", group: "AI Projects", label: "AI Room Designer", description: "Multi-modal AI interior design platform with dual modes: Generate New and Redesign My Room.", links: [{ type: "demo", url: "https://rooms-through-time-production.up.railway.app" }, { type: "github", url: "https://github.com/gastondana627/Rooms-Through-Time" }] }
        ];
        skillData = [
            { id: "python", name: "Python", category: "Language" },
            { id: "rag", name: "RAG", category: "AI" },
            { id: "ai_agents", name: "AI Agents", category: "AI" },
            { id: "neo4j", name: "Neo4j", category: "Database" },
            { id: "data_viz", name: "Data Visualization", category: "Domain" },
            { id: "api", name: "API Integration", category: "Domain" },
            { id: "react", name: "React", category: "Language" },
            { id: "computer_vision", name: "Computer Vision", category: "AI" }
        ];
        skillLinks = [
            { project: "peata", skill: "rag" },
            { project: "peata", skill: "python" },
            { project: "relic", skill: "rag" },
            { project: "nasa_kg", skill: "neo4j" },
            { project: "planetrics", skill: "python" },
            { project: "planetrics", skill: "data_viz" },
            { project: "planetrics", skill: "api" },
            { project: "ai-room-designer", skill: "python" },
            { project: "ai-room-designer", skill: "react" },
            { project: "ai-room-designer", skill: "ai_agents" },
            { project: "ai-room-designer", skill: "computer_vision" }
        ];
    }
    createProjectNodes();
    createSkillNodes();
    createSkillConnections();
    reheat(1);
    if (window.__GRAPH_FOCUS__) {
        setTimeout(function () {
            if (typeof window.zoomToProjectNode === 'function') window.zoomToProjectNode(window.__GRAPH_FOCUS__);
        }, 700);
    }
}

// --- CREATE NODES (sim) ---
function clearGraph() {
    [...projectNodes, ...skillNodes].forEach(n => {
        scene.remove(n);
        if (n.userData.outline) n.remove(n.userData.outline);
        if (n.userData.label) scene.remove(n.userData.label);
    });
    skillConnectionLines.forEach(l => scene.remove(l));
    projectNodes = []; skillNodes = []; skillConnectionLines = []; simNodes = []; simLinks = [];
}
function createProjectNodes() {
    projectNodes.forEach(n => { scene.remove(n); if (n.userData.label) scene.remove(n.userData.label); });
    projectNodes = []; simNodes = simNodes.filter(n => n.kind !== 'project');
    projectData.forEach((project) => {
        const colors = groupColors[project.group] || groupColors.default;
        const geo = new THREE.IcosahedronGeometry(0.9, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: colors.main, metalness: 0.55, roughness: 0.2,
            transparent: true, opacity: 0.92, emissive: colors.main, emissiveIntensity: 0.22
        });
        const mesh = new THREE.Mesh(geo, mat);
        const outline = new THREE.Mesh(new THREE.IcosahedronGeometry(1.06, 1), new THREE.MeshBasicMaterial({ color: colors.outline, wireframe: true, transparent: true, opacity: 0.5 }));
        mesh.add(outline);
        const glow = makeGlowSprite(colors.main, 3.4);
        mesh.add(glow);
        const label = makeLabel(project.label || project.id, colors.outline);
        scene.add(label); scene.add(mesh);
        const a = Math.random() * Math.PI * 2, b = (Math.random() - 0.5) * Math.PI, r = 7 + Math.random() * 4;
        const pos = new THREE.Vector3(Math.cos(a) * Math.cos(b) * r, Math.sin(b) * r * 0.5, Math.sin(a) * Math.cos(b) * r);
        mesh.position.copy(pos);
        mesh.userData = { project, id: project.id, outline, label, glow, kind: 'project', baseOpacity: 0.92 };
        projectNodes.push(mesh);
        simNodes.push({ mesh, kind: 'project', data: project, pos: pos.clone(), vel: new THREE.Vector3(), fixed: false, radius: 1.06, label });
    });
}
function createSkillNodes() {
    skillNodes.forEach(n => { scene.remove(n); if (n.userData.label) scene.remove(n.userData.label); });
    skillNodes = []; simNodes = simNodes.filter(n => n.kind !== 'skill');
    skillData.forEach((skill) => {
        const colors = skillColors[skill.category] || { main: 0xFFFFFF, outline: 0xD4AF37 };
        const geo = new THREE.OctahedronGeometry(0.5, 0);
        const mat = new THREE.MeshStandardMaterial({
            color: colors.main, metalness: 0.5, roughness: 0.25,
            transparent: true, opacity: 0.9, emissive: colors.main, emissiveIntensity: 0.18
        });
        const mesh = new THREE.Mesh(geo, mat);
        const outline = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), new THREE.MeshBasicMaterial({ color: colors.outline, wireframe: true, transparent: true, opacity: 0.5 }));
        mesh.add(outline);
        mesh.add(makeGlowSprite(colors.main, 2.2));
        const label = makeLabel(skill.name || skill.id, colors.outline);
        scene.add(label); scene.add(mesh);
        const a = Math.random() * Math.PI * 2, b = (Math.random() - 0.5) * Math.PI, r = 4 + Math.random() * 4;
        const pos = new THREE.Vector3(Math.cos(a) * Math.cos(b) * r, Math.sin(b) * r * 0.5, Math.sin(a) * Math.cos(b) * r);
        mesh.position.copy(pos);
        mesh.userData = { skill, id: skill.id, outline, label, kind: 'skill', baseOpacity: 0.9 };
        skillNodes.push(mesh);
        simNodes.push({ mesh, kind: 'skill', data: skill, pos: pos.clone(), vel: new THREE.Vector3(), fixed: false, radius: 0.6, label });
    });
}
function createSkillConnections() {
    skillConnectionLines.forEach(l => scene.remove(l));
    skillConnectionLines = []; simLinks = [];
    skillLinks.forEach((link) => {
        const p = projectNodes.find(n => n.userData.id === link.project);
        const s = skillNodes.find(n => n.userData.id === link.skill);
        if (!p || !s) return;
        const ps = simNodes.find(n => n.mesh === p);
        const ss = simNodes.find(n => n.mesh === s);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
        const mat = new THREE.LineBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.22 });
        const line = new THREE.Line(geo, mat);
        line.userData = { baseOpacity: 0.22, projectNode: p, skillNode: s };
        scene.add(line);
        skillConnectionLines.push(line);
        simLinks.push({ source: ps, target: ss, line });
    });
}

// --- PHYSICS STEP ---
function stepSim() {
    const n = simNodes.length;
    if (!n) return;
    const a = params.alpha;
    for (let i = 0; i < n; i++) {
        const ni = simNodes[i];
        let fx = 0, fy = 0, fz = 0;
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const nj = simNodes[j];
            let dx = ni.pos.x - nj.pos.x, dy = ni.pos.y - nj.pos.y, dz = ni.pos.z - nj.pos.z;
            let d2 = dx * dx + dy * dy + dz * dz; if (d2 < 0.04) d2 = 0.04;
            const d = Math.sqrt(d2);
            const f = params.charge * a / d2;
            fx += dx / d * f; fy += dy / d * f; fz += dz / d * f;
            const minD = ni.radius + nj.radius + params.collide;
            if (d < minD) { const push = (minD - d) * 0.5; fx += dx / d * push; fy += dy / d * push; fz += dz / d * push; }
        }
        fx -= ni.pos.x * params.center * a;
        fy -= ni.pos.y * params.center * a;
        fz -= ni.pos.z * params.center * a;
        for (let k = 0; k < simLinks.length; k++) {
            const l = simLinks[k];
            let other = null;
            if (l.source === ni) other = l.target; else if (l.target === ni) other = l.source;
            if (!other) continue;
            const dx = other.pos.x - ni.pos.x, dy = other.pos.y - ni.pos.y, dz = other.pos.z - ni.pos.z;
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
            const f = (d - params.linkDistance) * params.link * a;
            fx += dx / d * f; fy += dy / d * f; fz += dz / d * f;
        }
        if (!ni.fixed) {
            ni.vel.x = (ni.vel.x + fx) * params.damping;
            ni.vel.y = (ni.vel.y + fy) * params.damping;
            ni.vel.z = (ni.vel.z + fz) * params.damping;
            ni.pos.x += ni.vel.x; ni.pos.y += ni.vel.y; ni.pos.z += ni.vel.z;
        }
    }
    if (params.alpha > params.alphaMin) params.alpha -= params.alphaDecay;
    for (const node of simNodes) {
        node.mesh.position.copy(node.pos);
        node.label.position.set(node.pos.x, node.pos.y + node.radius + 0.85, node.pos.z);
        const pulse = 1 + 0.07 * Math.sin(clock.elapsedTime * 2 + node.pos.x);
        const gs = (node.kind === 'project' ? 3.4 : 2.2) * pulse;
        node.mesh.userData.glow.scale.set(gs, gs, 1);
    }
    for (const l of simLinks) {
        const arr = l.line.geometry.attributes.position.array;
        arr[0] = l.source.pos.x; arr[1] = l.source.pos.y; arr[2] = l.source.pos.z;
        arr[3] = l.target.pos.x; arr[4] = l.target.pos.y; arr[5] = l.target.pos.z;
        l.line.geometry.attributes.position.needsUpdate = true;
    }
}

// --- ORBIT CONTROLS (custom, damped, idle auto-rotate) ---
const orbit = {
    target: new THREE.Vector3(0, 0, 0),
    radius: 22, minRadius: 6, maxRadius: 60,
    azimuth: 0, polar: Math.PI / 2 - 0.12,
    aziVel: 0, polVel: 0,
    damping: 0.9, autoRotate: true, autoRotateSpeed: 0.0016,
    idle: 0
};
let zoomTween = null;
function applyCamera() {
    const sp = Math.sin(orbit.polar);
    camera.position.set(
        orbit.target.x + orbit.radius * sp * Math.cos(orbit.azimuth),
        orbit.target.y + orbit.radius * Math.cos(orbit.polar),
        orbit.target.z + orbit.radius * sp * Math.sin(orbit.azimuth)
    );
    camera.lookAt(orbit.target);
}
function tweenOrbit(targetV, radius, polar, azimuth, dur) {
    const s = { t: orbit.target.clone(), r: orbit.radius, p: orbit.polar, a: orbit.azimuth };
    const start = performance.now();
    orbit.autoRotate = false; orbit.idle = 0;
    zoomTween = function () {
        const k = Math.min(1, (performance.now() - start) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        orbit.target.lerpVectors(s.t, targetV, e);
        orbit.radius = s.r + (radius - s.r) * e;
        orbit.polar = s.p + (polar - s.p) * e;
        orbit.azimuth = s.a + (azimuth - s.a) * e;
        if (k >= 1) zoomTween = null;
    };
}
function updateControls() {
    orbit.azimuth += orbit.aziVel; orbit.polar += orbit.polVel;
    orbit.aziVel *= orbit.damping; orbit.polVel *= orbit.damping;
    orbit.polar = Math.max(0.18, Math.min(Math.PI - 0.18, orbit.polar));
    orbit.radius = Math.max(orbit.minRadius, Math.min(orbit.maxRadius, orbit.radius));
    orbit.idle += 1;
    if (orbit.autoRotate && orbit.idle > 180 && Math.abs(orbit.aziVel) < 0.0008 && !zoomTween) {
        orbit.azimuth += orbit.autoRotateSpeed;
    }
    applyCamera();
}

// --- PICKING / HOVER / CLICK ---
function pickNode(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const meshes = prism ? [...projectNodes, ...skillNodes, prism] : [...projectNodes, ...skillNodes];
    const hits = raycaster.intersectObjects(meshes, true);
    if (!hits.length) return null;
    let obj = hits[0].object;
    while (obj && !obj.userData.project && !obj.userData.skill && !obj.userData.isCore) obj = obj.parent;
    if (!obj) return null;
    return { node: obj, isCore: !!obj.userData.isCore };
}
let tooltipEl = null;
function showTooltip(text, x, y) {
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'graph-tooltip';
        tooltipEl.style.cssText = 'position:fixed;pointer-events:none;z-index:60;padding:6px 10px;background:rgba(5,7,10,0.88);border:1px solid rgba(212,175,55,0.45);color:#FFEDC2;font:600 12px Inter,sans-serif;border-radius:8px;transform:translate(-50%,-140%);opacity:0;transition:opacity .15s;white-space:nowrap;';
        document.body.appendChild(tooltipEl);
    }
    tooltipEl.textContent = text;
    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
    tooltipEl.style.opacity = '1';
}
function hideTooltip() { if (tooltipEl) tooltipEl.style.opacity = '0'; }
function hoverUpdate(clientX, clientY) {
    const hit = pickNode(clientX, clientY);
    const target = hit ? (hit.isCore ? prism : hit.node) : null;
    if (hoveredNode && hoveredNode !== target) {
        hoveredNode.material.opacity = hoveredNode.userData.baseOpacity;
        hoveredNode.scale.set(1, 1, 1);
        if (hoveredNode.userData.outline) hoveredNode.userData.outline.material.opacity = 0.5;
        hoveredNode = null;
    }
    hoveredPrism = (target === prism);
    if (target && target !== prism) {
        hoveredNode = target;
        target.material.opacity = 1;
        target.scale.set(1.25, 1.25, 1.25);
        if (target.userData.outline) target.userData.outline.material.opacity = 0.9;
        container.classList.add('hovering');
        const ud = target.userData;
        showTooltip(ud.project ? ud.project.label : (ud.skill ? ud.skill.name : ''), clientX, clientY);
    } else {
        container.classList.toggle('hovering', hoveredPrism);
        if (hoveredPrism) showTooltip('Ask me anything!', clientX, clientY); else hideTooltip();
    }
}
function handleNodeClick(node) {
    if (node === prism) { openChatbot(); return; }
    if (node.userData && node.userData.project) {
        selectedNode = node;
        showProjectDetails(node.userData.project);
        zoomToNode(node);
        if (typeof updateCarouselToProject === 'function') updateCarouselToProject(node.userData.project.id);
    }
}

// --- POINTER INTERACTION (orbit + drag-to-pin + click) ---
const ptr = { down: false, moved: 0, sx: 0, sy: 0, lx: 0, ly: 0, node: null, mode: null };
function downAt(x, y) {
    ptr.down = true; ptr.moved = 0; ptr.sx = x; ptr.sy = y; ptr.lx = x; ptr.ly = y;
    orbit.idle = 0; orbit.autoRotate = false; orbit.aziVel = 0; orbit.polVel = 0;
    const hit = pickNode(x, y);
    ptr.node = hit ? (hit.isCore ? prism : hit.node) : null;
    ptr.mode = hit ? 'drag' : 'orbit';
}
function moveAt(x, y) {
    if (!ptr.down) { hoverUpdate(x, y); return; }
    ptr.moved = Math.max(ptr.moved, Math.hypot(x - ptr.sx, y - ptr.sy));
    if (ptr.mode === 'orbit') {
        orbit.aziVel -= (x - ptr.lx) * 0.005;
        orbit.polVel -= (y - ptr.ly) * 0.005;
    } else if (ptr.mode === 'drag' && ptr.node && ptr.node !== prism) {
        dragNodeTo(ptr.node, x, y);
        ptr.moved = Math.max(ptr.moved, 7);
    }
    ptr.lx = x; ptr.ly = y;
}
function upAt(x, y) {
    if (!ptr.down) return;
    ptr.moved = Math.max(ptr.moved, Math.hypot(x - ptr.sx, y - ptr.sy));
    const isClick = ptr.moved < 6;
    if (ptr.mode === 'drag' && ptr.node) {
        const sn = simNodes.find(n => n.mesh === ptr.node);
        if (isClick) {
            if (sn) sn.fixed = false;
            handleNodeClick(ptr.node);
        } else if (sn) {
            sn.fixed = true; sn.vel.set(0, 0, 0);
        }
    } else if (isClick) {
        const hit = pickNode(x, y);
        if (hit) handleNodeClick(hit.isCore ? prism : hit.node);
    }
    ptr.down = false; ptr.mode = null; ptr.node = null;
    setTimeout(() => { orbit.autoRotate = true; }, 3000);
}
function dragNodeTo(mesh, x, y) {
    const rect = container.getBoundingClientRect();
    ndc.x = ((x - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((y - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const sn = simNodes.find(n => n.mesh === mesh);
    if (!sn) return;
    camera.getWorldDirection(tmpV);
    plane.setFromNormalAndCoplanarPoint(tmpV, sn.pos);
    if (raycaster.ray.intersectPlane(plane, tmpV)) {
        sn.pos.copy(tmpV); sn.vel.set(0, 0, 0); sn.fixed = true; reheat(0.3);
    }
}

// --- MODAL / CHATBOT / NAV (preserved) ---
function showProjectDetails(project) {
    const modal = document.getElementById('graph-modal');
    const overlay = document.getElementById('graph-modal-overlay');
    document.getElementById('modal-title').textContent = project.label;
    document.getElementById('modal-category').textContent = project.group;
    document.getElementById('modal-description').textContent = project.description || 'No description available.';
    const _ts = document.getElementById('modal-techstack');
    if (_ts) {
        let stack = project.techStack || project.tech_stack;
        if (!stack) {
            const ids = skillLinks.filter(l => l.project === project.id).map(l => l.skill);
            stack = skillData.filter(s => ids.indexOf(s.id) >= 0).map(s => s.name).join(', ');
        }
        _ts.textContent = stack ? 'Tech stack: ' + stack : '';
        _ts.style.display = stack ? 'block' : 'none';
    }
    const linksContainer = document.getElementById('modal-links');
    linksContainer.innerHTML = '';
    if (project.links && project.links.length > 0) {
        project.links.forEach(link => {
            const linkEl = document.createElement('a');
            linkEl.href = link.url; linkEl.target = '_blank'; linkEl.rel = 'noopener noreferrer';
            linkEl.className = 'modal-link';
            const icon = link.type === 'github' ? 'fab fa-github' :
                link.type === 'demo' ? 'fas fa-external-link-alt' :
                    link.type === 'video' ? 'fas fa-video' : 'fas fa-info-circle';
            const label = link.type === 'github' ? 'GitHub' :
                link.type === 'demo' ? 'Live Demo' :
                    link.type === 'video' ? 'Video Demo' : 'More Info';
            linkEl.innerHTML = '<i class="' + icon + '"></i> ' + label;
            linksContainer.appendChild(linkEl);
        });
    }
    overlay.classList.add('active');
    modal.classList.add('active');
}
function closeModal() {
    document.getElementById('graph-modal-overlay').classList.remove('active');
    document.getElementById('graph-modal').classList.remove('active');
    if (selectedNode) { zoomOut(); selectedNode = null; }
}
function openChatbot() { if (window.portfolioChatbot) window.portfolioChatbot.open(); }
window.zoomToProjectNode = function (projectId) {
    const node = projectNodes.find(n => n.userData.project && n.userData.project.id === projectId);
    if (node) {
        selectedNode = node;
        showProjectDetails(node.userData.project);
        zoomToNode(node);
        document.getElementById('graph-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
function zoomToNode(node) {
    const tp = node.position.clone();
    const off = new THREE.Vector3(0, 1.5, 8);
    const desired = tp.clone().add(off);
    const r = desired.distanceTo(tp);
    const polar = Math.acos(Math.max(-1, Math.min(1, off.y / r)));
    const azimuth = Math.atan2(off.z, off.x);
    tweenOrbit(tp, r, polar, azimuth, 900);
}
function zoomOut() {
    tweenOrbit(new THREE.Vector3(0, 0, 0), 22, Math.PI / 2 - 0.12, 0, 700);
}
function resetView() {
    simNodes.forEach(n => { n.fixed = false; n.vel.set(0, 0, 0); });
    reheat(0.6); selectedNode = null; closeModal(); clearSearch();
    zoomOut();
    setTimeout(() => { orbit.autoRotate = true; }, 3000);
}

// --- SEARCH (preserve behavior) ---
function _gsApplyOpacity(node, on) {
    const base = node.userData.baseOpacity || 0.9;
    node.material.opacity = on ? Math.min(1, base + 0.08) : 0.1;
    if (node.userData.outline) node.userData.outline.material.opacity = on ? 0.6 : 0.05;
}
function clearSearch() {
    projectNodes.forEach(n => _gsApplyOpacity(n, true));
    skillNodes.forEach(n => _gsApplyOpacity(n, true));
}
function searchGraph(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) { clearSearch(); return; }
    const pIds = new Set(), sIds = new Set();
    projectNodes.forEach(n => { const p = n.userData.project; if (((p.label || '') + ' ' + (p.description || '') + ' ' + (p.id || '')).toLowerCase().indexOf(q) >= 0) pIds.add(p.id); });
    skillNodes.forEach(n => { const s = n.userData.skill; if (((s.name || '') + ' ' + (s.id || '')).toLowerCase().indexOf(q) >= 0) sIds.add(s.id); });
    skillLinks.forEach(l => { if (pIds.has(l.project)) sIds.add(l.skill); if (sIds.has(l.skill)) pIds.add(l.project); });
    projectNodes.forEach(n => _gsApplyOpacity(n, pIds.has(n.userData.project.id)));
    skillNodes.forEach(n => _gsApplyOpacity(n, sIds.has(n.userData.skill.id)));
}

// --- PHYSICS SLIDERS ---
function buildSliders() {
    let host = document.querySelector('.graph-controls');
    if (!host) {
        host = document.createElement('div');
        host.className = 'graph-controls';
        host.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;align-items:center;';
        container.appendChild(host);
    }
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:16px;align-items:center;';
    wrap.innerHTML =
        '<label style="display:flex;flex-direction:column;gap:2px;font:600 11px Inter,sans-serif;color:#FFEDC2;">Repulsion<input type="range" id="gs-charge" min="5" max="120" value="40" step="1" style="width:120px;accent-color:#D4AF37;"></label>' +
        '<label style="display:flex;flex-direction:column;gap:2px;font:600 11px Inter,sans-serif;color:#FFEDC2;">Gravity<input type="range" id="gs-gravity" min="0" max="80" value="12" step="1" style="width:120px;accent-color:#D4AF37;"></label>';
    host.appendChild(wrap);
    document.getElementById('gs-charge').addEventListener('input', e => { params.charge = +e.target.value; reheat(0.4); });
    document.getElementById('gs-gravity').addEventListener('input', e => { params.center = (+e.target.value) / 1000; reheat(0.4); });
}

// --- ANIMATE ---
function animate() {
    requestAnimationFrame(animate);
    stepSim();
    if (zoomTween) zoomTween();
    updateControls();
    if (prism) { prism.rotation.y += 0.004; prism.rotation.x += 0.002; }
    renderer.render(scene, camera);
}

// --- EVENT LISTENERS ---
container.addEventListener('mousedown', e => { downAt(e.clientX, e.clientY); });
window.addEventListener('mousemove', e => { moveAt(e.clientX, e.clientY); });
window.addEventListener('mouseup', e => { if (ptr.down) upAt(e.clientX, e.clientY); });
container.addEventListener('wheel', e => {
    e.preventDefault();
    orbit.radius = Math.max(orbit.minRadius, Math.min(orbit.maxRadius, orbit.radius + e.deltaY * 0.012));
    orbit.idle = 0; orbit.autoRotate = false;
    setTimeout(() => { orbit.autoRotate = true; }, 2500);
}, { passive: false });
// touch: single finger = orbit/drag/tap; pinch = zoom
let pinchDist = 0;
function tDist(t) { const dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.hypot(dx, dy); }
container.addEventListener('touchstart', e => {
    if (e.touches.length === 1) { downAt(e.touches[0].clientX, e.touches[0].clientY); }
    else if (e.touches.length === 2) { pinchDist = tDist(e.touches); ptr.down = false; }
    e.preventDefault();
}, { passive: false });
container.addEventListener('touchmove', e => {
    if (e.touches.length === 1) moveAt(e.touches[0].clientX, e.touches[0].clientY);
    else if (e.touches.length === 2) {
        const d = tDist(e.touches);
        orbit.radius = Math.max(orbit.minRadius, Math.min(orbit.maxRadius, orbit.radius + (pinchDist - d) * 0.05));
        pinchDist = d; orbit.idle = 0; orbit.autoRotate = false;
    }
    e.preventDefault();
}, { passive: false });
container.addEventListener('touchend', e => {
    if (e.touches.length === 0 && ptr.down) {
        const t = e.changedTouches[0];
        upAt(t.clientX, t.clientY);
    }
    if (e.touches.length === 0) setTimeout(() => { orbit.autoRotate = true; }, 3000);
}, { passive: false });
window.addEventListener('resize', () => {
    const w = container.clientWidth || window.innerWidth, h = container.clientHeight || 600;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
});
const mc = document.querySelector('.modal-close');
if (mc) mc.addEventListener('click', closeModal);
const ov = document.getElementById('graph-modal-overlay');
if (ov) ov.addEventListener('click', closeModal);
const md = document.getElementById('graph-modal');
if (md) md.addEventListener('click', e => e.stopPropagation());

// --- INIT ---
buildSliders();
animate();
loadProjects().then(() => console.log('Knowledge Graph loaded')).catch(err => console.error('Graph load error:', err));

// Search + reset wiring (existing controls)
(function () {
    const input = document.getElementById('graph-search');
    if (input) input.addEventListener('input', e => searchGraph(e.target.value));
    const reset = document.getElementById('graph-reset');
    if (reset) reset.addEventListener('click', resetView);
})();