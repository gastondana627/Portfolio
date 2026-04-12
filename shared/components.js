// Shared Components JavaScript
// This file contains reusable JavaScript functionality used across all portfolios

document.addEventListener('DOMContentLoaded', function() {
    
    // Portfolio Navigation Handler
    function initializePortfolioNavigation() {
        // Handle navigation card clicks for internal navigation
        const navCards = document.querySelectorAll('.nav-card[data-target]');
        navCards.forEach(card => {
            card.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Shared Contact Form Handler
    function initializeContactForm() {
        const contactForms = document.querySelectorAll('[id$="-contact-form"]');
        
        contactForms.forEach(form => {
            const formId = form.id;
            const statusId = formId.replace('-form', '-form-status');
            const formStatus = document.getElementById(statusId);
            
            if (form && formStatus) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    formStatus.textContent = 'Sending...';
                    formStatus.style.color = '#FFFFFF';

                    const formData = new FormData(form);
                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });

                        if (response.ok) {
                            formStatus.textContent = 'Message sent successfully!';
                            formStatus.style.color = '#4CAF50';
                            form.reset();
                        } else {
                            throw new Error('Network response was not ok');
                        }
                    } catch (error) {
                        formStatus.textContent = 'Error sending message. Please try again.';
                        formStatus.style.color = '#FF6B6B';
                    }
                });
            }
        });
    }

    // Portfolio-specific Button Animations
    function initializeButtonAnimations() {
        const portfolioButtons = document.querySelectorAll('.gaming-button, .content-button');
        
        portfolioButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Smooth Scroll for Portfolio Links
    function initializeSmoothScroll() {
        const portfolioLinks = document.querySelectorAll('a[href^="#"]');
        
        portfolioLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Portfolio Context Detection
    function getPortfolioContext() {
        if (document.body.classList.contains('gaming-portfolio')) {
            return 'gaming';
        } else if (document.body.classList.contains('content-portfolio')) {
            return 'content';
        } else {
            return 'tech';
        }
    }

    // Dynamic Portfolio Theming
    function applyPortfolioTheming() {
        const context = getPortfolioContext();
        const root = document.documentElement;
        
        switch (context) {
            case 'gaming':
                root.style.setProperty('--portfolio-primary', '#FF4444');
                root.style.setProperty('--portfolio-secondary', '#FF8800');
                root.style.setProperty('--portfolio-tertiary', '#FFDD00');
                break;
            case 'content':
                root.style.setProperty('--portfolio-primary', '#2C2C2C');
                root.style.setProperty('--portfolio-secondary', '#808080');
                root.style.setProperty('--portfolio-tertiary', '#E8E8E8');
                break;
            default:
                root.style.setProperty('--portfolio-primary', '#D4AF37');
                root.style.setProperty('--portfolio-secondary', '#FF8C42');
                root.style.setProperty('--portfolio-tertiary', '#FFFFFF');
        }
    }

    // Project Card Interactions
    function initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            });
        });
    }

    // Return Button Functionality with Enhanced Transitions
    function initializeReturnButton() {
        const returnButton = document.querySelector('.return-button');
        if (returnButton) {
            returnButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get current portfolio context for themed transition
                const portfolioContext = getPortfolioContext();
                
                // Create transition overlay
                const transitionOverlay = document.createElement('div');
                transitionOverlay.className = 'portfolio-transition-overlay';
                transitionOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                `;
                
                // Set transition theme based on current portfolio
                if (portfolioContext === 'gaming') {
                    transitionOverlay.style.background = 'linear-gradient(135deg, #FF4444, #FF8800, #FFDD00)';
                } else if (portfolioContext === 'content') {
                    transitionOverlay.style.background = 'linear-gradient(135deg, #2C2C2C, #808080, #E8E8E8)';
                } else {
                    transitionOverlay.style.background = 'linear-gradient(135deg, #D4AF37, #FF8C42)';
                }
                
                document.body.appendChild(transitionOverlay);
                
                // Add transition message
                const transitionMessage = document.createElement('div');
                transitionMessage.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-align: center;
                    opacity: 0;
                    transition: opacity 0.3s ease 0.2s;
                `;
                transitionMessage.innerHTML = `
                    <i class="fas fa-arrow-left" style="margin-right: 10px;"></i>
                    Returning to Tech Portfolio...
                `;
                transitionOverlay.appendChild(transitionMessage);
                
                // Start transition animation
                setTimeout(() => {
                    transitionOverlay.style.opacity = '0.9';
                    transitionMessage.style.opacity = '1';
                }, 50);
                
                // Navigate after transition
                setTimeout(() => {
                    // Check if we can use browser history
                    if (window.history && window.history.length > 1 && document.referrer.includes(window.location.origin)) {
                        window.history.back();
                    } else {
                        window.location.href = '/';
                    }
                }, 800);
            });
        }
    }

    // Portfolio Skills Interaction
    function initializeSkillsInteraction() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(skill => {
            skill.addEventListener('click', function() {
                // Add a subtle pulse effect when clicked
                this.style.animation = 'pulse 0.6s ease-in-out';
                
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
    }

    // Mobile Menu Enhancement for Portfolio Pages
    function enhanceMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuButton && navLinks) {
            mobileMenuButton.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                // Update button icon
                const icon = mobileMenuButton.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            // Close menu when clicking on a link
            const navItems = navLinks.querySelectorAll('a');
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.className = 'fas fa-bars';
                });
            });
        }
    }

    // Initialize all shared components
    initializePortfolioNavigation();
    initializeContactForm();
    initializeButtonAnimations();
    initializeSmoothScroll();
    applyPortfolioTheming();
    initializeProjectCards();
    initializeReturnButton();
    initializeSkillsInteraction();
    enhanceMobileMenu();

    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    console.log(`Portfolio components initialized for: ${getPortfolioContext()} portfolio`);
});

// Export functions for use in other scripts
window.PortfolioComponents = {
    getPortfolioContext: function() {
        if (document.body.classList.contains('gaming-portfolio')) {
            return 'gaming';
        } else if (document.body.classList.contains('content-portfolio')) {
            return 'content';
        } else {
            return 'tech';
        }
    }
};