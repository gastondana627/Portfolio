console.log('🚀 Knowledge Graph Loading...');

// --- SETUP ---
const container = document.getElementById('graph-container');
if (!container) {
    console.error('❌ graph-container not found!');
}
console.log('✅ Container found');

const scene = new THREE.Scene();
console.log('✅ Scene created');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let hoveredNode = null;
let selectedNode = null;
let analyser, dataArray;

// --- AUDIO SETUP ---
function initAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.getElementById('background-music');
    const source = audioContext.createMediaElementSource(audioElement);
    
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    audioElement.play();
}

// --- CENTRAL PRISM ---
const prismGeometry = new THREE.CylinderGeometry(1, 1, 3, 6);
const prismMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.9
});
const prism = new THREE.Mesh(prismGeometry, prismMaterial);

const innerPrismGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2.8, 6);
const innerPrismMaterial = new THREE.MeshBasicMaterial({
    color: 0x8309D5,
    transparent: true,
    opacity: 0.3
});
const innerPrism = new THREE.Mesh(innerPrismGeometry, innerPrismMaterial);
prism.add(innerPrism);
prism.userData.innerPrism = innerPrism;

const edgesGeometry = new THREE.EdgesGeometry(prismGeometry);
const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x09C1D5,
    linewidth: 2,
    transparent: true,
    opacity: 0.8
});
const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
prism.add(edges);
prism.userData.edges = edges;

scene.add(prism);

const prismColors = [
    new THREE.Color(0x8309D5),
    new THREE.Color(0x09C1D5),
    new THREE.Color(0xA855F7),
    new THREE.Color(0xFF00FF),
    new THREE.Color(0x00FFFF)
];
let currentColorIndex = 0;
const baseColor = new THREE.Color(0xffffff);
const glowColor = new THREE.Color(0x8309D5);

// --- PROJECT DATA ---
let projectNodes = [];
let skillNodes = [];
let projectData = [];
let skillData = [];
let skillLinks = [];

const groupColors = {
    'AI Projects': { 
        main: 0x8309D5,
        outline: 0x09C1D5
    },
    'Gaming': { 
        main: 0x09C1D5,
        outline: 0x8309D5
    },
    'Ethical Hacking': { 
        main: 0xA855F7,
        outline: 0x09C1D5
    },
    'default': {
        main: 0xFFFFFF,
        outline: 0x8309D5
    }
};

const skillColors = {
    'Language': { 
        main: 0xFFD700,
        outline: 0x8309D5
    },
    'AI': { 
        main: 0x8309D5,
        outline: 0xFFD700
    },
    'Database': { 
        main: 0x09C1D5,
        outline: 0x8309D5
    },
    'Geospatial': { 
        main: 0x00FF88,
        outline: 0x09C1D5
    },
    'Domain': { 
        main: 0xFF00FF,
        outline: 0x00FFFF
    }
};

// --- LOAD PROJECTS ---
async function loadProjects() {
    console.log('📡 Fetching projects...');
    try {
        const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api/projects'
        : 'https://portfolio-production-b1b4.up.railway.app/api/projects';
            
        const response = await fetch(apiUrl);
        const data = await response.json();
        projectData = data.projects || data.nodes;
        skillData = data.skills || [];
        skillLinks = data.skill_links || [];
        console.log('✅ Loaded', projectData.length, 'projects and', skillData.length, 'skills from backend');
    } catch (error) {
        console.log('⚠️ Backend unavailable, using fallback data');
        projectData = [
            {id: "stargate", group: "Gaming", label: "Project Stargate", description: "Gaming mentorship personas", links: [{type: "github", url: "https://github.com/gastondana627/Stargate-and-Bobot"}]},
            {id: "peata", group: "AI Projects", label: "Peata", description: "AI pet recovery assistant", links: [{type: "github", url: "https://github.com/gastondana627/Peata"}]},
            {id: "relic", group: "AI Projects", label: "Relic", description: "Archaeological research assistant", links: [{type: "github", url: "https://github.com/gastondana627/Team-Relic-Xingu-Challenge"}]},
            {id: "sesa", group: "Ethical Hacking", label: "SESA", description: "Multi-agent AI system", links: []},
            {id: "astro_archive", group: "AI Projects", label: "Astro Archive", description: "Memory-aware coaching agents", links: [{type: "github", url: "https://github.com/gastondana627/Mongo_DB_NASA_OSDR"}]},
            {id: "nasa_kg", group: "AI Projects", label: "NASA Knowledge Graph", description: "Biological data mapping for astronaut health", links: [{type: "github", url: "https://github.com/gastondana627/spoke_genelab"}]},
            {id: "planetrics", group: "AI Projects", label: "Planetrics", description: "Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog.", links: [{type: "video", url: "https://www.linkedin.com/posts/gaston-d-859653184_plotly-python-datascience-activity-7380386160432500736-P6OA?utm_source=share&utm_medium=member_desktop&rcm=ACoAACuFtgUBVdf9kFE9Wlxn2qi6FBP2M0VX6Ds"}]},
            {id: "ai-room-designer", group: "AI Projects", label: "AI Room Designer", description: "Multi-modal AI interior design platform with dual modes: Generate New and Redesign My Room.", links: [{type: "demo", url: "https://rooms-through-time-production.up.railway.app"}, {type: "github", url: "https://github.com/gastondana627/Rooms-Through-Time"}]}
        ];
        skillData = [
            {id: "python", name: "Python", category: "Language"},
            {id: "rag", name: "RAG", category: "AI"},
            {id: "ai_agents", name: "AI Agents", category: "AI"},
            {id: "neo4j", name: "Neo4j", category: "Database"},
            {id: "data_viz", name: "Data Visualization", category: "Domain"},
            {id: "api", name: "API Integration", category: "Domain"},
            {id: "react", name: "React", category: "Language"},
            {id: "computer_vision", name: "Computer Vision", category: "AI"}
        ];
        skillLinks = [
            {project: "peata", skill: "rag"},
            {project: "peata", skill: "python"},
            {project: "relic", skill: "rag"},
            {project: "nasa_kg", skill: "neo4j"},
            {project: "planetrics", skill: "python"},
            {project: "planetrics", skill: "data_viz"},
            {project: "planetrics", skill: "api"},
            {project: "ai-room-designer", skill: "python"},
            {project: "ai-room-designer", skill: "react"},
            {project: "ai-room-designer", skill: "ai_agents"},
            {project: "ai-room-designer", skill: "computer_vision"}
        ];
    }
    createProjectNodes();
    createSkillNodes();
    createSkillConnections();
}

// --- CREATE NODES ---
function createProjectNodes() {
    console.log('🎨 Creating', projectData.length, 'nodes');
    const radius = 8;
    const angleStep = (Math.PI * 2) / projectData.length;
    
    projectData.forEach((project, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        const colors = groupColors[project.group] || groupColors.default;
        const nodeColor = colors.main;
        const outlineColor = colors.outline;
        
        const nodeGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const nodeMaterial = new THREE.MeshBasicMaterial({ 
            color: nodeColor,
            transparent: true,
            opacity: 0.8
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        
        const hitboxGeometry = new THREE.SphereGeometry(1.5, 8, 8);
        const hitboxMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            visible: false
        });
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        node.add(hitbox);
        
        const outlineGeometry = new THREE.SphereGeometry(0.95, 16, 16);
        const outlineMaterial = new THREE.MeshBasicMaterial({
            color: outlineColor,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        
        node.add(outline);
        node.position.set(x, y, z);
        node.userData = {
            id: project.id,
            project: project,
            originalPosition: { x, y, z },
            baseColor: new THREE.Color(nodeColor),
            baseOutlineColor: new THREE.Color(outlineColor),
            outline: outline,
            isNode: true,
            type: "project-node"
        };
        
        scene.add(node);
        projectNodes.push(node);
    });
    
    console.log('✅ Created', projectNodes.length, 'project nodes');
}

// --- CREATE SKILL NODES ---
function createSkillNodes() {
    console.log('🎨 Creating', skillData.length, 'skill nodes');
    
    const innerRadius = 4;
    const angleStep = (Math.PI * 2) / skillData.length;
    
    skillData.forEach((skill, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * innerRadius;
        const z = Math.sin(angle) * innerRadius;
        const y = (Math.random() - 0.5) * 2;
        
        const colors = skillColors[skill.category] || { main: 0xFFFFFF, outline: 0x8309D5 };
        const skillColor = colors.main;
        const outlineColor = colors.outline;
        
        const skillGeometry = new THREE.OctahedronGeometry(0.5, 0);
        const skillMaterial = new THREE.MeshBasicMaterial({
            color: skillColor,
            transparent: true,
            opacity: 0.7,
            wireframe: false
        });
        const skillNode = new THREE.Mesh(skillGeometry, skillMaterial);
        
        skillNode.position.set(x, y, z);
        
        const hitboxGeometry = new THREE.OctahedronGeometry(1.0, 0);
        const hitboxMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            visible: false
        });
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        skillNode.add(hitbox);
        
        const outlineGeometry = new THREE.OctahedronGeometry(0.55, 0);
        const outlineMaterial = new THREE.MeshBasicMaterial({
            color: outlineColor,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        skillNode.add(outline);
        
        skillNode.userData = {
            id: skill.id,
            name: skill.name,
            category: skill.category,
            level: skill.level,
            originalPosition: new THREE.Vector3(x, y, z),
            baseColor: new THREE.Color(skillColor),
            baseOutlineColor: new THREE.Color(outlineColor),
            outline: outline,
            isSkill: true,
            type: "skill-node"
        };
        
        scene.add(skillNode);
        skillNodes.push(skillNode);
    });
    
    console.log('✅ Created', skillNodes.length, 'skill nodes');
}

// --- CREATE SKILL CONNECTIONS ---
let skillConnectionLines = [];

function createSkillConnections() {
    console.log('🔗 Creating skill connections');
    
    skillLinks.forEach(link => {
        const projectNode = projectNodes.find(n => n.userData.id === link.project);
        const skillNode = skillNodes.find(n => n.userData.id === link.skill);
        
        if (projectNode && skillNode) {
            const points = [projectNode.position, skillNode.position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: skillNode.userData.baseColor,
                transparent: true,
                opacity: 0.2,
                linewidth: 1
            });
            
            const line = new THREE.Line(geometry, material);
            line.userData = {
                isSkillConnection: true,
                projectNode: projectNode,
                skillNode: skillNode,
                baseOpacity: 0.2,
                type: "connection-line"
            };
            
            scene.add(line);
            skillConnectionLines.push(line);
        }
    });
    
    console.log('✅ Created', skillConnectionLines.length, 'skill connections');
    createEvolutionPaths();
}

// --- EVOLUTION PATHS ---
let evolutionLines = [];

function createEvolutionPaths() {
    const evolutionPaths = [
        { from: "peata", to: "relic", color: 0x8309D5 },
        { from: "relic", to: "astro_archive", color: 0x09C1D5 },
        { from: "astro_archive", to: "nasa_kg", color: 0xA855F7 },
        { from: "stargate", to: "peata", color: 0xFF00FF, dashed: true },
        { from: "sesa", to: "astro_archive", color: 0x00FFFF, dashed: true },
        { from: "nasa_kg", to: "ai-room-designer", color: 0x8309D5 },
        { from: "nasa_kg", to: "planetrics", color: 0x09C1D5, dashed: true }
    ];
    
    evolutionPaths.forEach(path => {
        const fromNode = projectNodes.find(n => n.userData.id === path.from);
        const toNode = projectNodes.find(n => n.userData.id === path.to);
        
        if (fromNode && toNode) {
            const curve = new THREE.QuadraticBezierCurve3(
                fromNode.position,
                new THREE.Vector3(
                    (fromNode.position.x + toNode.position.x) / 2,
                    (fromNode.position.y + toNode.position.y) / 2 + 2,
                    (fromNode.position.z + toNode.position.z) / 2
                ),
                toNode.position
            );
            
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            
            const material = new THREE.LineBasicMaterial({
                color: path.color,
                transparent: true,
                opacity: 0.4,
                linewidth: 2
            });
            
            if (path.dashed) {
                material.opacity = 0.3;
            }
            
            const line = new THREE.Line(geometry, material);
            line.userData = {
                isEvolutionPath: true,
                fromNode: fromNode,
                toNode: toNode,
                baseOpacity: path.dashed ? 0.3 : 0.4,
                type: "connection-line"
            };
            
            scene.add(line);
            evolutionLines.push(line);
            createPathParticles(curve, path.color);
        }
    });
    
    console.log('✅ Created', evolutionLines.length, 'evolution paths');
}

// --- PATH PARTICLES ---
let pathParticles = [];

function createPathParticles(curve, color) {
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8
    });
    
    for (let i = 0; i < 3; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.userData = {
            curve: curve,
            progress: i / 3,
            speed: 0.001 + Math.random() * 0.001
        };
        scene.add(particle);
        pathParticles.push(particle);
    }
}

// --- MOUSE INTERACTION ---
let hoveredPrism = false;

function onMouseMove(event) {
    // Calculate mouse coordinates relative to the container
    const containerRect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - containerRect.left) / containerRect.width) * 2 - 1;
    mouse.y = -((event.clientY - containerRect.top) / containerRect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    let closestNode = null;
    let closestDistance = Infinity;
    
    // Only check for node interactions if we have valid mouse coordinates
    if (Math.abs(mouse.x) <= 1 && Math.abs(mouse.y) <= 1) {
        projectNodes.forEach(node => {
            const nodeScreenPos = node.position.clone().project(camera);
            const dx = nodeScreenPos.x - mouse.x;
            const dy = nodeScreenPos.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.25 && distance < closestDistance) {
                closestDistance = distance;
                closestNode = node;
            }
        });
        
        skillNodes.forEach(node => {
            const nodeScreenPos = node.position.clone().project(camera);
            const dx = nodeScreenPos.x - mouse.x;
            const dy = nodeScreenPos.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.20 && distance < closestDistance) {
                closestDistance = distance;
                closestNode = node;
            }
        });
    }
    
    if (!closestNode) {
        const prismIntersects = raycaster.intersectObject(prism, true);
        if (prismIntersects.length > 0) {
            hoveredPrism = true;
            container.classList.add('hovering');
            showTooltip('💬 Ask me anything!', event.clientX, event.clientY);
        } else if (hoveredPrism) {
            hoveredPrism = false;
            container.classList.remove('hovering');
            hideTooltip();
        }
    } else {
        hoveredPrism = false;
    }
    
    if (hoveredNode && hoveredNode !== closestNode) {
        hoveredNode.material.opacity = 0.8;
        hoveredNode.scale.set(1, 1, 1);
        if (hoveredNode.userData.outline) {
            hoveredNode.userData.outline.material.opacity = 0.6;
        }
        hoveredNode = null;
        if (!hoveredPrism) hideTooltip();
    }
    
    if (closestNode && !selectedNode) {
        hoveredNode = closestNode;
        hoveredNode.material.opacity = 1.0;
        hoveredNode.scale.set(1.5, 1.5, 1.5);
        if (hoveredNode.userData.outline) {
            hoveredNode.userData.outline.material.opacity = 1.0;
        }
        container.classList.add('hovering');
        
        if (hoveredNode.userData.isSkill) {
            showTooltip(`💎 ${hoveredNode.userData.name} (${hoveredNode.userData.category})`, event.clientX, event.clientY);
            
            skillConnectionLines.forEach(line => {
                if (line.userData.skillNode === hoveredNode) {
                    line.material.opacity = 0.6;
                    line.userData.projectNode.material.opacity = 1.0;
                }
            });
        } else {
            showTooltip(hoveredNode.userData.project.label, event.clientX, event.clientY);
            
            skillConnectionLines.forEach(line => {
                if (line.userData.projectNode === hoveredNode) {
                    line.material.opacity = 0.6;
                    line.userData.skillNode.material.opacity = 1.0;
                }
            });
        }
    } else if (!hoveredPrism && !closestNode) {
        container.classList.remove('hovering');
        
        skillConnectionLines.forEach(line => {
            line.material.opacity = line.userData.baseOpacity;
        });
    }
}

function onMouseClick() {
    if (hoveredPrism) {
        console.log('🤖 Prism clicked! Opening chatbot...');
        openChatbot();
    } else if (hoveredNode && !selectedNode) {
        selectedNode = hoveredNode;
        showProjectDetails(hoveredNode.userData.project);
        zoomToNode(hoveredNode);
        
        if (typeof updateCarouselToProject === 'function') {
            updateCarouselToProject(hoveredNode.userData.project.id);
        }
    }
}

// --- UI FUNCTIONS ---
function showTooltip(text, x, y) {
    let tooltip = document.getElementById('graph-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'graph-tooltip';
        tooltip.style.cssText = `
            position: fixed; background: rgba(0,0,0,0.9); color: white;
            padding: 8px 12px; border-radius: 4px; font-size: 14px;
            pointer-events: none; z-index: 1000; font-family: 'Poppins', sans-serif;
            border: 1px solid rgba(131,9,213,0.5);
        `;
        document.body.appendChild(tooltip);
    }
    tooltip.textContent = text;
    tooltip.style.left = x + 15 + 'px';
    tooltip.style.top = y + 15 + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.getElementById('graph-tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

function showProjectDetails(project) {
    const modal = document.getElementById('graph-modal');
    const overlay = document.getElementById('graph-modal-overlay');
    
    document.getElementById('modal-title').textContent = project.label;
    document.getElementById('modal-category').textContent = project.group;
    document.getElementById('modal-description').textContent = project.description || 'No description available.';
    
    const linksContainer = document.getElementById('modal-links');
    linksContainer.innerHTML = '';
    
    if (project.links && project.links.length > 0) {
        project.links.forEach(link => {
            const linkEl = document.createElement('a');
            linkEl.href = link.url;
            linkEl.target = '_blank';
            linkEl.rel = 'noopener noreferrer';
            linkEl.className = 'modal-link';
            
            const icon = link.type === 'github' ? 'fab fa-github' : 
                        link.type === 'demo' ? 'fas fa-external-link-alt' : 
                        link.type === 'video' ? 'fas fa-video' :
                        'fas fa-info-circle';
            const label = link.type === 'github' ? 'GitHub' : 
                         link.type === 'demo' ? 'Live Demo' : 
                         link.type === 'video' ? 'Video Demo' : 'More Info';
            
            linkEl.innerHTML = `<i class="${icon}"></i> ${label}`;
            linksContainer.appendChild(linkEl);
        });
    }
    
    overlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('graph-modal-overlay').classList.remove('active');
    document.getElementById('graph-modal').classList.remove('active');
    if (selectedNode) {
        zoomOut();
        selectedNode = null;
    }
}

function openChatbot() {
    console.log('🤖 Chatbot activated!');
    if (window.portfolioChatbot) {
        window.portfolioChatbot.open();
    } else {
        console.error('Chatbot not initialized yet');
    }
}

window.zoomToProjectNode = function(projectId) {
    console.log('🔍 Looking for project:', projectId);
    const node = projectNodes.find(n => n.userData.project.id === projectId);
    
    if (node) {
        console.log('✅ Found node, zooming...');
        selectedNode = node;
        showProjectDetails(node.userData.project);
        zoomToNode(node);
        
        document.getElementById('graph-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        console.log('❌ Node not found for:', projectId);
    }
};

function zoomToNode(node) {
    const targetPos = node.position.clone();
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(targetPos.x * 0.5, targetPos.y * 0.5, targetPos.z + 5);
    
    let progress = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    function animateZoom() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.lerpVectors(startPos, endPos, eased);
        camera.lookAt(targetPos);
        
        if (progress < 1) requestAnimationFrame(animateZoom);
    }
    animateZoom();
}

function zoomOut() {
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(0, 0, 15);
    
    let progress = 0;
    const duration = 800;
    const startTime = Date.now();
    
    function animateZoomOut() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.lerpVectors(startPos, endPos, eased);
        camera.lookAt(0, 0, 0);
        
        if (progress < 1) requestAnimationFrame(animateZoomOut);
    }
    animateZoomOut();
}

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        const bassValue = (dataArray[2] + dataArray[3]) / 2 / 255;
        const trebleValue = (dataArray[50] + dataArray[60]) / 2 / 255;
        
        const bassScale = 1 + bassValue * 1.5;
        prism.scale.set(bassScale, bassScale, bassScale);
        
        const colorCycleSpeed = elapsedTime * 0.3;
        const colorIndex = Math.floor(colorCycleSpeed) % prismColors.length;
        const nextColorIndex = (colorIndex + 1) % prismColors.length;
        const colorMix = (colorCycleSpeed % 1);
        
        const currentColor = prismColors[colorIndex].clone();
        const nextColor = prismColors[nextColorIndex];
        currentColor.lerp(nextColor, colorMix);
        
        prismMaterial.color.copy(currentColor);
        if (prism.userData.innerPrism) {
            prism.userData.innerPrism.material.color.copy(currentColor).multiplyScalar(0.8);
        }
        if (prism.userData.edges) {
            prism.userData.edges.material.color.copy(nextColor);
            prism.userData.edges.material.opacity = 0.6 + trebleValue * 0.4;
        }
        
        projectNodes.forEach(node => {
            const nodePulse = 1 + bassValue * 0.3;
            node.scale.set(nodePulse, nodePulse, nodePulse);
            
            if (node.userData.outline) {
                node.userData.outline.material.opacity = 0.6 + trebleValue * 0.4;
            }
        });
    }
    
    prism.rotation.x = elapsedTime * 0.1;
    prism.rotation.y = elapsedTime * 0.15;
    
    skillNodes.forEach((node, index) => {
        node.rotation.x = elapsedTime * 0.5 + index;
        node.rotation.y = elapsedTime * 0.3 + index;
        
        const floatOffset = Math.sin(elapsedTime * 2 + index) * 0.2;
        node.position.y = node.userData.originalPosition.y + floatOffset;
        
        if (analyser) {
            const pulse = 1 + (dataArray[10 + index] || 0) / 255 * 0.3;
            node.scale.set(pulse, pulse, pulse);
        }
    });
    
    skillConnectionLines.forEach(line => {
        const points = [line.userData.projectNode.position, line.userData.skillNode.position];
        line.geometry.setFromPoints(points);
        
        line.material.opacity = line.userData.baseOpacity + Math.sin(elapsedTime) * 0.05;
    });
    
    pathParticles.forEach(particle => {
        particle.userData.progress += particle.userData.speed;
        if (particle.userData.progress > 1) {
            particle.userData.progress = 0;
        }
        
        const point = particle.userData.curve.getPoint(particle.userData.progress);
        particle.position.copy(point);
        
        const pulse = 1 + Math.sin(elapsedTime * 3 + particle.userData.progress * Math.PI * 2) * 0.3;
        particle.scale.set(pulse, pulse, pulse);
    });
    
    evolutionLines.forEach(line => {
        const fromPos = line.userData.fromNode.position;
        const toPos = line.userData.toNode.position;
        
        const curve = new THREE.QuadraticBezierCurve3(
            fromPos,
            new THREE.Vector3(
                (fromPos.x + toPos.x) / 2,
                (fromPos.y + toPos.y) / 2 + 2,
                (fromPos.z + toPos.z) / 2
            ),
            toPos
        );
        
        const points = curve.getPoints(50);
        line.geometry.setFromPoints(points);
        
        line.material.opacity = line.userData.baseOpacity + Math.sin(elapsedTime * 2) * 0.1;
    });
    
    projectNodes.forEach((node, index) => {
        if (!selectedNode || selectedNode !== node) {
            const orbitSpeed = 0.1;
            const angle = (elapsedTime * orbitSpeed) + (index * (Math.PI * 2 / projectNodes.length));
            const radius = 8;
            
            node.position.x = Math.cos(angle) * radius;
            node.position.z = Math.sin(angle) * radius;
            node.position.y = node.userData.originalPosition.y + Math.sin(elapsedTime + index) * 0.3;
        }
    });
    
    renderer.render(scene, camera);
}

// --- EVENT LISTENERS ---
container.addEventListener('mousemove', onMouseMove);
container.addEventListener('click', onMouseClick);
container.addEventListener('mouseleave', () => {
    // Clean up hover states when mouse leaves the graph container
    if (hoveredNode) {
        hoveredNode.material.opacity = 0.8;
        hoveredNode.scale.set(1, 1, 1);
        if (hoveredNode.userData.outline) {
            hoveredNode.userData.outline.material.opacity = 0.6;
        }
        hoveredNode = null;
    }
    if (hoveredPrism) {
        hoveredPrism = false;
        container.classList.remove('hovering');
    }
    hideTooltip();
    skillConnectionLines.forEach(line => {
        line.material.opacity = line.userData.baseOpacity;
    });
});
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.getElementById('graph-modal-overlay').addEventListener('click', closeModal);
document.getElementById('graph-modal').addEventListener('click', (e) => e.stopPropagation());

// --- INITIALIZE ---
console.log('🎬 Starting animation...');
animate();

console.log('📞 Calling loadProjects...');
loadProjects().then(() => {
    console.log('✅ Projects loaded!');
}).catch(err => {
    console.error('❌ Error loading projects:', err);
});

console.log('✅ Knowledge Graph Initialized!');
