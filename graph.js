// --- 1. SETUP ---
const container = document.getElementById('graph-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10; // Moved camera back to better see the pulsing effect
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
const clock = new THREE.Clock();

// --- 2. AUDIO ANALYSIS SETUP ---
let analyser;
let dataArray;

// This function sets up the Web Audio API
function initAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.getElementById('background-music');
    const source = audioContext.createMediaElementSource(audioElement);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Fast Fourier Transform size

    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Ensure the audio element is playing
    audioElement.play();
}

// --- 3. CREATE THE OBJECT & MATERIALS ---
const geometry = new THREE.BoxGeometry(2, 2, 2);

// We'll use a single material and change its color dynamically
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Define our base color (white) and glow color (purple from your scheme)
const baseColor = new THREE.Color(0xffffff);
const glowColor = new THREE.Color(0x8309D5);

// --- 4. ANIMATE ---
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // --- Audio-Reactive Logic ---
    if (analyser) {
        // Get the frequency data from the audio
        analyser.getByteFrequencyData(dataArray);

        // --- BASS ---
        // Bass frequencies are the first few elements in the array
        const bassValue = (dataArray[2] + dataArray[3]) / 2 / 255; // Average a few bins and normalize (0-1)
        const bassScale = 1 + bassValue * 1.5; // Pulse between 1x and 2.5x size
        cube.scale.set(bassScale, bassScale, bassScale);

        // --- TREBLE ---
        // Treble frequencies are further down the array
        const trebleValue = (dataArray[50] + dataArray[60]) / 2 / 255; // Average a few bins and normalize (0-1)
        // Interpolate between white and purple based on treble intensity
        material.color.copy(baseColor).lerp(glowColor, trebleValue);
    }


    // --- Rotation Logic ---
    cube.rotation.x = elapsedTime * 0.1;
    cube.rotation.y = elapsedTime * 0.15;

    renderer.render(scene, camera);
}

animate();