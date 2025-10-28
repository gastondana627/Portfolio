document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll to Top Button
    const scrollToTopButton = document.getElementById('scroll-to-top-button');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.style.display = 'block';
            } else {
                scrollToTopButton.style.display = 'none';
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                    contactForm.reset();
                } else {
                    const result = await response.json();
                    if (result && result.errors && Array.isArray(result.errors)) {
                        formStatus.textContent = 'Error: ' + result.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your form';
                    }
                }
            } catch (error) {
                console.error('Fetch error:', error);
                formStatus.textContent = 'Oops! There was a problem submitting your form';
            }
        });
    }

    // Project Loading (Simulated)
    const loadMoreButton = document.getElementById('load-more-button');
    const projectsGrid = document.querySelector('.projects-grid');

    if (loadMoreButton && projectsGrid) {
        loadMoreButton.addEventListener('click', () => {
            const newProjects = `
              <div class="project">
                  <img src="assets/project3.jpg" alt="Project 3" class="project-image">
                  <h3>Project 3</h3>
                  <p>A description of the new project.</p>
                  <a href="#" class="button">View Project</a>
              </div>
              <div class="project">
                  <img src="assets/project4.jpg" alt="Project 4" class="project-image">
                  <h3>Project 4</h3>
                  <p>Another project to showcase.</p>
                  <a href="#" class="button">View Project</a>
              </div>
          `;
            projectsGrid.innerHTML += newProjects;
            loadMoreButton.style.display = 'none';
        });
    }

    // Music Controls
    const backgroundMusic = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-button');
    const volumeSlider = document.getElementById('volume-slider');

    if (backgroundMusic && playPauseButton && volumeSlider) {
        let isPlaying = false;
        let audioInitialized = false;

        // Play/Pause
        playPauseButton.addEventListener('click', () => {
            // Initialize audio analyzer on first interaction
            if (!audioInitialized && typeof initAudio === 'function') {
                try {
                    initAudio();
                    audioInitialized = true;
                } catch (error) {
                    console.log("Audio initialization error:", error);
                }
            }

            if (isPlaying) {
                backgroundMusic.pause();
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                playPauseButton.classList.remove('playing');
                playPauseButton.setAttribute('title', 'Play Music');
            } else {
                backgroundMusic.play().catch(error => {
                    console.log("Playback error:", error);
                });
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseButton.classList.add('playing');
                playPauseButton.setAttribute('title', 'Pause Music');
            }
            isPlaying = !isPlaying;
        });

        // Volume Control
        volumeSlider.addEventListener('input', () => {
            backgroundMusic.volume = volumeSlider.value;
        });

        // Initial volume setup
        backgroundMusic.volume = volumeSlider.value;

        // Try autoplay (will likely be blocked by browser)
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isPlaying = true;
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseButton.classList.add('playing');
                playPauseButton.setAttribute('title', 'Pause Music');
                // Initialize audio on successful autoplay
                if (!audioInitialized && typeof initAudio === 'function') {
                    try {
                        initAudio();
                        audioInitialized = true;
                    } catch (error) {
                        console.log("Audio initialization error:", error);
                    }
                }
            }).catch(error => {
                console.log("Autoplay prevented (expected):", error);
                isPlaying = false;
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
                playPauseButton.setAttribute('title', 'Play Music');
            });
        }
    }
});

// Add dark/light themes
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Graph Instructions Overlay
document.addEventListener('DOMContentLoaded', () => {
    const instructions = document.getElementById('graph-instructions');
    const gotItBtn = document.getElementById('got-it-btn');
    
    if (!instructions || !gotItBtn) return;
    
    // Check if user has seen instructions before
    const hasSeenInstructions = localStorage.getItem('hasSeenGraphInstructions');
    
    if (!hasSeenInstructions) {
        // Show instructions after a short delay
        setTimeout(() => {
            instructions.style.display = 'block';
            instructions.style.opacity = '1';
        }, 1000);
    } else {
        instructions.style.display = 'none';
    }
    
    // Hide instructions when button is clicked
    gotItBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Got it button clicked!');
        
        // Fade out animation
        instructions.style.opacity = '0';
        instructions.style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        setTimeout(() => {
            instructions.style.display = 'none';
            localStorage.setItem('hasSeenGraphInstructions', 'true');
        }, 300);
    });
});