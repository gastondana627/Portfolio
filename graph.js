// --- 1. SETUP ---
// Find the container we created in our HTML
const container = document.getElementById('graph-container');

// Scene: The 3D world that will hold all our objects
const scene = new THREE.Scene();

// Camera: The viewer's perspective or "eye"
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Move the camera back a bit so we can see the cube

// Renderer: This draws the scene onto the screen
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true makes the background transparent
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement); // Add the renderer's canvas to our HTML container

// --- 2. CREATE THE OBJECT ---
// Geometry: The shape of the object (a box)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material: The "skin" of the object (a green wireframe)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
// Mesh: The final object, combining the shape and the skin
const cube = new THREE.Mesh(geometry, material);
scene.add(cube); // Add the cube to our 3D world

// --- 3. ANIMATE ---
// This function runs about 60 times per second to create motion
function animate() {
    requestAnimationFrame(animate); // Schedule the next frame

    // Rotate the cube on its X and Y axes
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Tell the renderer to draw the scene from the camera's perspective
    renderer.render(scene, camera);
}

// Start the animation loop!
animate();