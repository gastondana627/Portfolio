document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a special link
            if (href === '#' || href.length <= 1) return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

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

// Portfolio Navigation System
document.addEventListener('DOMContentLoaded', () => {
    // Handle direct navigation on page load
    handleDirectNavigation();
    
    const portfolioCards = document.querySelectorAll('.portfolio-nav-card');
    const skillPortfolioLinks = document.querySelectorAll('.skill-portfolio-link');
    
    // Portfolio navigation cards
    portfolioCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioType = card.getAttribute('data-portfolio');
            navigateToPortfolio(portfolioType);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill portfolio links
    skillPortfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const skillCard = link.closest('.skill-enhanced');
            const portfolioType = skillCard.getAttribute('data-portfolio-link');
            if (portfolioType) {
                navigateToPortfolio(portfolioType);
            }
        });
    });
    
    // Handle navigation links to content portfolio
    const contentNavLinks = document.querySelectorAll('a[href="/content/"]');
    contentNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPortfolio('content');
        });
    });
});

// Portfolio Navigation Functions
function navigateToPortfolio(portfolioType) {
    // Add to browser history for proper back navigation
    const targetUrl = portfolioType === 'gaming' ? '/gaming/' : '/content/';
    
    // Update browser history
    if (window.history && window.history.pushState) {
        window.history.pushState(
            { portfolio: portfolioType }, 
            `Gaston Dana - ${portfolioType === 'gaming' ? 'Gaming Ecosystem' : 'Content Creation'}`,
            targetUrl
        );
    }
    
    // Show transition overlay
    showPortfolioTransition(portfolioType);
    
    // Navigate after transition animation
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 1000);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.portfolio) {
        // User navigated back/forward to a portfolio
        showPortfolioTransition(event.state.portfolio);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } else {
        // User navigated back to main portfolio
        window.location.href = '/';
    }
});

// URL routing handler for direct navigation
function handleDirectNavigation() {
    const currentPath = window.location.pathname;
    
    // Handle direct navigation to portfolio URLs
    if (currentPath.includes('/gaming')) {
        document.body.classList.add('gaming-portfolio');
        console.log('Direct navigation to Gaming Portfolio');
    } else if (currentPath.includes('/content')) {
        document.body.classList.add('content-portfolio');
        console.log('Direct navigation to Content Portfolio');
    }
}

function showPortfolioTransition(portfolioType) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-transition-overlay';
    
    const transitions = {
        gaming: {
            gradient: 'linear-gradient(135deg, #FF4444, #FF8800, #FFDD00)',
            icon: 'fas fa-gamepad',
            message: 'Loading Gaming Ecosystem...',
            particles: 'fire-particles'
        },
        content: {
            gradient: 'linear-gradient(135deg, #2C2C2C, #808080, #E8E8E8)',
            icon: 'fas fa-video',
            message: 'Loading Content Creation...',
            particles: 'chrome-particles'
        }
    };
    
    const config = transitions[portfolioType];
    
    overlay.innerHTML = `
        <div class="transition-content">
            <div class="transition-icon">
                <i class="${config.icon}"></i>
            </div>
            <div class="transition-message">${config.message}</div>
            <div class="transition-loader">
                <div class="loader-bar"></div>
            </div>
        </div>
        <div class="transition-particles ${config.particles}"></div>
    `;
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${config.gradient};
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Add transition styles
    addTransitionStyles();
}

function addTransitionStyles() {
    if (document.getElementById('portfolio-transition-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'portfolio-transition-styles';
    styles.textContent = `
        .portfolio-transition-overlay {
            font-family: 'Space Grotesk', sans-serif;
        }
        
        .transition-content {
            text-align: center;
            color: white;
            z-index: 2;
            position: relative;
        }
        
        .transition-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .transition-message {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 30px;
            letter-spacing: 1px;
        }
        
        .transition-loader {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .loader-bar {
            width: 0%;
            height: 100%;
            background: white;
            border-radius: 2px;
            animation: loadProgress 1s ease-out forwards;
        }
        
        .transition-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .fire-particles::before,
        .fire-particles::after {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: floatUp 3s ease-in-out infinite;
        }
        
        .fire-particles::before {
            top: 80%;
            left: 20%;
            animation-delay: 0s;
        }
        
        .fire-particles::after {
            top: 85%;
            right: 25%;
            animation-delay: 1.5s;
        }
        
        .chrome-particles::before,
        .chrome-particles::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: shimmer 2s ease-in-out infinite;
        }
        
        .chrome-particles::before {
            top: 30%;
            left: 15%;
            animation-delay: 0s;
        }
        
        .chrome-particles::after {
            top: 70%;
            right: 20%;
            animation-delay: 1s;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes loadProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        
        @keyframes shimmer {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
    
    document.head.appendChild(styles);
}