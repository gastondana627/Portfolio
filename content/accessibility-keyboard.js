// Accessibility Keyboard Navigation Enhancement
// Implements comprehensive keyboard navigation for the content portfolio

(function() {
    'use strict';
    
    // ========================================
    // KEYBOARD NAVIGATION INITIALIZATION
    // ========================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initializeKeyboardNavigation();
        initializeFocusManagement();
        initializeSkipLinks();
        initializeModalKeyboardSupport();
        initializeTabTrapping();
        initializeKeyboardShortcuts();
    });
    
    // ========================================
    // GENERAL KEYBOARD NAVIGATION
    // ========================================
    
    function initializeKeyboardNavigation() {
        // Make all interactive elements keyboard accessible
        const interactiveElements = document.querySelectorAll(
            '.segment-card, .nav-card, .carousel-post-card, .event-card, ' +
            '.video-item, .design-card, .partnership-card, .case-study-card'
        );
        
        interactiveElements.forEach(element => {
            // Add tabindex if not already present
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            
            // Add keyboard event listeners
            element.addEventListener('keydown', handleCardKeydown);
        });
        
        // Platform filter tabs keyboard navigation
        const platformTabs = document.querySelectorAll('.platform-tab');
        platformTabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (e) => handleTabKeydown(e, platformTabs, index));
        });
        
        // Navigation cards keyboard support
        const navCards = document.querySelectorAll('.nav-card');
        navCards.forEach(card => {
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const target = this.getAttribute('data-target');
                    if (target) {
                        const targetElement = document.getElementById(target);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            // Focus on the section heading
                            const heading = targetElement.querySelector('h2, h3');
                            if (heading) {
                                heading.setAttribute('tabindex', '-1');
                                heading.focus();
                            }
                        }
                    }
                }
            });
        });
    }
    
    // Handle keyboard events for interactive cards
    function handleCardKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    }
    
    // Handle tab navigation with arrow keys
    function handleTabKeydown(e, tabs, currentIndex) {
        let newIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = tabs.length - 1;
                break;
            default:
                return;
        }
        
        // Update tab selection
        tabs[currentIndex].setAttribute('aria-selected', 'false');
        tabs[currentIndex].setAttribute('tabindex', '-1');
        tabs[newIndex].setAttribute('aria-selected', 'true');
        tabs[newIndex].setAttribute('tabindex', '0');
        tabs[newIndex].focus();
        tabs[newIndex].click();
    }
    
    // ========================================
    // FOCUS MANAGEMENT
    // ========================================
    
    function initializeFocusManagement() {
        // Add visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced focus indicators */
            *:focus {
                outline: 3px solid #4A90E2;
                outline-offset: 2px;
            }
            
            /* High contrast focus for buttons */
            button:focus,
            a:focus,
            input:focus,
            textarea:focus,
            select:focus {
                outline: 3px solid #4A90E2;
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.2);
            }
            
            /* Focus for cards and interactive elements */
            .segment-card:focus,
            .nav-card:focus,
            .carousel-post-card:focus,
            .event-card:focus,
            .video-item:focus,
            .design-card:focus,
            .partnership-card:focus,
            .case-study-card:focus {
                outline: 3px solid #4A90E2;
                outline-offset: 3px;
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(74, 144, 226, 0.3);
            }
            
            /* Focus for modal close buttons */
            .modal-close:focus {
                outline: 3px solid #4A90E2;
                outline-offset: 2px;
                background: rgba(255, 255, 255, 0.2);
            }
            
            /* Skip link styling */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 0;
                background: #4A90E2;
                color: white;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 0 0 4px 0;
                z-index: 100000;
                font-weight: 600;
            }
            
            .skip-link:focus {
                top: 0;
                outline: 3px solid white;
                outline-offset: -3px;
            }
        `;
        document.head.appendChild(style);
        
        // Track focus for better UX
        let lastFocusedElement = null;
        
        document.addEventListener('focusin', function(e) {
            lastFocusedElement = e.target;
        });
        
        // Store last focused element for modal restoration
        window.lastFocusedElement = lastFocusedElement;
    }
    
    // ========================================
    // SKIP LINKS
    // ========================================
    
    function initializeSkipLinks() {
        // Create skip links for better keyboard navigation
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#content-hero" class="skip-link">Skip to main content</a>
            <a href="#content-navigation" class="skip-link">Skip to navigation</a>
            <a href="#content-contact" class="skip-link">Skip to contact</a>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    // ========================================
    // MODAL KEYBOARD SUPPORT
    // ========================================
    
    function initializeModalKeyboardSupport() {
        // Video Gallery Modal
        const videoGalleryModal = document.getElementById('video-gallery-modal');
        if (videoGalleryModal) {
            setupModalKeyboardSupport(videoGalleryModal, 'video-gallery');
        }
        
        // Video Player Modal
        const videoPlayerModal = document.getElementById('video-player-modal');
        if (videoPlayerModal) {
            setupModalKeyboardSupport(videoPlayerModal, 'video-player');
        }
        
        // Carousel Viewer Modal
        const carouselModal = document.getElementById('carousel-viewer-modal');
        if (carouselModal) {
            setupModalKeyboardSupport(carouselModal, 'carousel');
        }
        
        // Image Gallery Modal
        const imageGalleryModal = document.getElementById('image-gallery-modal');
        if (imageGalleryModal) {
            setupModalKeyboardSupport(imageGalleryModal, 'image-gallery');
        }
    }
    
    function setupModalKeyboardSupport(modal, type) {
        // Store the element that opened the modal
        let modalOpener = null;
        
        // Observe when modal becomes visible
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'aria-hidden') {
                    const isHidden = modal.getAttribute('aria-hidden') === 'true';
                    
                    if (!isHidden) {
                        // Modal opened
                        modalOpener = document.activeElement;
                        trapFocusInModal(modal);
                        
                        // Focus on first focusable element or close button
                        const firstFocusable = getFirstFocusableElement(modal);
                        if (firstFocusable) {
                            setTimeout(() => firstFocusable.focus(), 100);
                        }
                    } else {
                        // Modal closed - restore focus
                        if (modalOpener && modalOpener.focus) {
                            modalOpener.focus();
                        }
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true });
        
        // ESC key to close modal
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeModal(modal, type);
            }
        });
        
        // Arrow key navigation for galleries
        if (type === 'carousel' || type === 'image-gallery' || type === 'video-player') {
            modal.addEventListener('keydown', function(e) {
                handleGalleryNavigation(e, modal, type);
            });
        }
    }
    
    function closeModal(modal, type) {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Type-specific close handlers
        const closeBtn = modal.querySelector('.modal-close, #' + type.replace('-', '_') + '_close');
        if (closeBtn) {
            closeBtn.click();
        }
    }
    
    function handleGalleryNavigation(e, modal, type) {
        const isActive = modal.classList.contains('active') || modal.getAttribute('aria-hidden') === 'false';
        if (!isActive) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                const prevBtn = modal.querySelector('.carousel-prev, .gallery-prev, #video-prev-btn');
                if (prevBtn && !prevBtn.disabled) {
                    prevBtn.click();
                }
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                const nextBtn = modal.querySelector('.carousel-next, .gallery-next, #video-next-btn');
                if (nextBtn && !nextBtn.disabled) {
                    nextBtn.click();
                }
                break;
                
            case 'Home':
                e.preventDefault();
                // Go to first item
                navigateToItem(modal, type, 0);
                break;
                
            case 'End':
                e.preventDefault();
                // Go to last item
                navigateToItem(modal, type, -1);
                break;
        }
    }
    
    function navigateToItem(modal, type, index) {
        // Implementation depends on the specific modal type
        // This is a placeholder for the navigation logic
        console.log(`Navigate to item ${index} in ${type}`);
    }
    
    // ========================================
    // FOCUS TRAPPING
    // ========================================
    
    function initializeTabTrapping() {
        // Tab trapping will be handled per modal when it opens
    }
    
    function trapFocusInModal(modal) {
        const focusableElements = getFocusableElements(modal);
        
        if (focusableElements.length === 0) return;
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        // Remove any existing trap listeners
        modal.removeEventListener('keydown', modal._trapFocusHandler);
        
        // Create new trap handler
        modal._trapFocusHandler = function(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };
        
        modal.addEventListener('keydown', modal._trapFocusHandler);
    }
    
    function getFocusableElements(container) {
        const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), ' +
                        'input:not([disabled]), select:not([disabled]), ' +
                        '[tabindex]:not([tabindex="-1"])';
        
        return Array.from(container.querySelectorAll(selector))
            .filter(el => {
                return el.offsetParent !== null && // Element is visible
                       getComputedStyle(el).visibility !== 'hidden' &&
                       getComputedStyle(el).display !== 'none';
            });
    }
    
    function getFirstFocusableElement(container) {
        const focusable = getFocusableElements(container);
        return focusable.length > 0 ? focusable[0] : null;
    }
    
    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================
    
    function initializeKeyboardShortcuts() {
        const shortcuts = {
            'h': () => scrollToSection('content-hero'),
            's': () => scrollToSection('segment-themes'),
            'v': () => scrollToSection('video-projects'),
            'd': () => scrollToSection('design-work'),
            'p': () => scrollToSection('brand-partnerships'),
            'c': () => scrollToSection('case-studies'),
            't': () => scrollToSection('content-contact'),
            '?': () => showKeyboardShortcutsHelp()
        };
        
        document.addEventListener('keydown', function(e) {
            // Don't trigger shortcuts when typing in form fields
            if (e.target.matches('input, textarea, select')) return;
            
            // Don't trigger when modifiers are pressed (except for ?)
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            
            const handler = shortcuts[e.key.toLowerCase()];
            if (handler) {
                e.preventDefault();
                handler();
            }
        });
    }
    
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Focus on section heading
            const heading = section.querySelector('h1, h2, h3');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                setTimeout(() => heading.focus(), 500);
            }
        }
    }
    
    function showKeyboardShortcutsHelp() {
        const helpModal = document.createElement('div');
        helpModal.className = 'keyboard-shortcuts-modal';
        helpModal.setAttribute('role', 'dialog');
        helpModal.setAttribute('aria-modal', 'true');
        helpModal.setAttribute('aria-labelledby', 'shortcuts-title');
        
        helpModal.innerHTML = `
            <div class="modal-backdrop" aria-hidden="true"></div>
            <div class="modal-content" role="document" style="max-width: 600px; background: rgba(44, 44, 44, 0.95); backdrop-filter: blur(10px); border-radius: 20px; padding: 30px; color: white;">
                <div class="modal-header" style="border-bottom: 1px solid rgba(128, 128, 128, 0.3); padding-bottom: 20px; margin-bottom: 20px;">
                    <h2 id="shortcuts-title" style="margin: 0; color: white;">Keyboard Shortcuts</h2>
                    <button class="modal-close" aria-label="Close keyboard shortcuts help" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="shortcuts-list" style="display: grid; gap: 15px;">
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Overview</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">H</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Segment Themes</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">S</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Video Projects</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">V</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Design Work</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">D</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Partnerships</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">P</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Case Studies</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">C</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Go to Contact</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">T</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(128, 128, 128, 0.3); padding-top: 15px; margin-top: 10px;">
                        <span>Close Modal</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">ESC</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Navigate Gallery</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">← →</kbd>
                    </div>
                    <div class="shortcut-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>Show this help</span>
                        <kbd style="background: rgba(128, 128, 128, 0.3); padding: 5px 10px; border-radius: 5px; font-family: monospace;">?</kbd>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(helpModal);
        
        // Close handlers
        const closeBtn = helpModal.querySelector('.modal-close');
        const backdrop = helpModal.querySelector('.modal-backdrop');
        
        const closeHelp = () => {
            helpModal.remove();
        };
        
        closeBtn.addEventListener('click', closeHelp);
        backdrop.addEventListener('click', closeHelp);
        helpModal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeHelp();
            }
        });
        
        // Focus on close button
        setTimeout(() => closeBtn.focus(), 100);
        
        // Trap focus
        trapFocusInModal(helpModal);
    }
    
    // ========================================
    // MOBILE MENU KEYBOARD SUPPORT
    // ========================================
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // ========================================
    // ANNOUNCE DYNAMIC CONTENT CHANGES
    // ========================================
    
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(liveRegion);
    
    // Function to announce content changes
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
    
    console.log('Accessibility keyboard navigation initialized');
})();
