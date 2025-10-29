console.log('🚀 TEST FILE LOADED!');
console.log('THREE available?', typeof THREE);

const container = document.getElementById('graph-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Big red test sphere
const testSphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(testSphere);

console.log('🔴 Red sphere added!');

function animate() {
    requestAnimationFrame(animate);
    testSphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
console.log('✅ Animation started!');
