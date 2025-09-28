// --- 1. SETUP ---
const container = document.getElementById('graph-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
const clock = new THREE.Clock(); // Use a clock to manage time

// --- 2. CREATE THE OBJECT & MATERIALS ---
const geometry = new THREE.BoxGeometry(2, 2, 2);

// Create two materials that we can switch between
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x191919, wireframe: true });

// Create the cube and start with the white material
const cube = new THREE.Mesh(geometry, whiteMaterial);
scene.add(cube);

// --- 3. ANIMATE ---
function animate() {
    requestAnimationFrame(animate);

    // Get the total time the animation has been running
    const elapsedTime = clock.getElapsedTime();

    // --- Flash Animation Logic ---
    // Every 15 seconds, this condition will be true for 1 second.
    // (Math.floor(elapsedTime) % 15) gives us a number that counts 0, 1, 2... up to 14, then repeats.
    // We check if that number is 0.
    if (Math.floor(elapsedTime) % 15 === 0) {
        cube.material = blackMaterial; // Use the black material for the "flash"
    } else {
        cube.material = whiteMaterial; // Use the default white material
    }

    // --- Rotation Logic ---
    // Use a sine wave for the smooth back-and-forth rotation
    const rotationTime = elapsedTime * 0.5; // Controls the speed of the rotation
    cube.rotation.y = ((Math.sin(rotationTime) + 1) / 2) * Math.PI;
    cube.rotation.x = elapsedTime * 0.2; // Keep a slow constant rotation on another axis

    renderer.render(scene, camera);
}

animate();