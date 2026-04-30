// Content Creation Portfolio Specific JavaScript

// Global Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Content Portfolio Initialization
    console.log('Content Creation Portfolio initialized');
    
    // Initialize analytics tracking for content portfolio
    if (typeof initializeAnalytics === 'function') {
        initializeAnalytics('content-portfolio');
        console.log('Analytics initialized for content portfolio');
    }
    
    // Track page view
    if (typeof trackPageView === 'function') {
        trackPageView('Content Creation Portfolio', '/content/');
    }
    
    // Load content data
    loadContentData();
    
    // Initialize cross-portfolio connections
    initializeCrossPortfolioConnections();
    
    // Content-specific animations and interactions
    function initializeContentAnimations() {
        // Add chrome effect to content buttons
        const contentButtons = document.querySelectorAll('.content-button');
        
        contentButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(45deg, #1A1A1A, #404040, #808080, #C0C0C0, #F5F5F5)';
                this.style.backgroundSize = '200% 200%';
                this.style.animation = 'chromeShine 2s ease infinite';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });
    }
    
    // Content project card interactions
    function initializeContentProjectCards() {
        const projectCards = document.querySelectorAll('.content-project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add content-specific click effect
                this.style.transform = 'scale(0.98)';
                this.style.boxShadow = '0 5px 15px rgba(128, 128, 128, 0.4)';
                
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1)';
                    this.style.boxShadow = '0 15px 40px rgba(128, 128, 128, 0.2)';
                }, 150);
            });
        });
    }
    
    // Design card hover effects
    function initializeDesignCards() {
        const designCards = document.querySelectorAll('.design-card');
        
        designCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const placeholder = this.querySelector('.design-image-placeholder');
                if (placeholder) {
                    placeholder.style.background = 'linear-gradient(135deg, rgba(128, 128, 128, 0.3), rgba(232, 232, 232, 0.2))';
                    placeholder.style.transform = 'scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const placeholder = this.querySelector('.design-image-placeholder');
                if (placeholder) {
                    placeholder.style.background = 'linear-gradient(135deg, rgba(128, 128, 128, 0.2), rgba(232, 232, 232, 0.1))';
                    placeholder.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Partnership card interactions
    function initializePartnershipCards() {
        const partnershipCards = document.querySelectorAll('.partnership-card');
        
        partnershipCards.forEach(card => {
            const logo = card.querySelector('.partnership-logo-placeholder');
            
            card.addEventListener('mouseenter', function() {
                if (logo) {
                    logo.style.transform = 'scale(1.1) rotate(2deg)';
                    logo.style.boxShadow = '0 10px 25px rgba(128, 128, 128, 0.2)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (logo) {
                    logo.style.transform = 'scale(1) rotate(0deg)';
                    logo.style.boxShadow = 'none';
                }
            });
        });
    }
    
    // Process timeline interactions
    function initializeProcessTimeline() {
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach((step, index) => {
            step.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.process-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                    icon.style.background = 'linear-gradient(135deg, #C0C0C0, #F5F5F5)';
                }
            });
            
            step.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.process-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                    icon.style.background = 'linear-gradient(135deg, #808080, #E8E8E8)';
                }
            });
            
            // Add staggered animation on load
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Content skills interaction with chrome effect
    function initializeContentSkills() {
        const skillItems = document.querySelectorAll('.content-portfolio .skill-item');
        
        skillItems.forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(128, 128, 128, 0.2)';
                this.style.borderColor = 'rgba(128, 128, 128, 0.5)';
                this.style.boxShadow = '0 5px 15px rgba(128, 128, 128, 0.2)';
            });
            
            skill.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(128, 128, 128, 0.1)';
                this.style.borderColor = 'rgba(128, 128, 128, 0.3)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Content navigation enhancement
    function initializeContentNavigation() {
        const navCards = document.querySelectorAll('.content-portfolio .nav-card');
        
        navCards.forEach(card => {
            card.addEventListener('click', function() {
                // Track internal navigation
                const target = this.getAttribute('data-target');
                if (typeof trackEvent === 'function' && target) {
                    trackEvent('Content Portfolio', 'Internal Navigation', target);
                }
                
                // Add content-specific navigation effect
                this.style.background = 'linear-gradient(135deg, rgba(44, 44, 44, 0.15), rgba(128, 128, 128, 0.1))';
                
                setTimeout(() => {
                    this.style.background = 'linear-gradient(135deg, rgba(44, 44, 44, 0.1), rgba(128, 128, 128, 0.05))';
                }, 300);
            });
        });
    }
    
    // Video project placeholder interactions
    function initializeVideoProjects() {
        const videoPlaceholders = document.querySelectorAll('.project-video-placeholder');
        
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', function() {
                // Simulate video play effect
                const icon = this.querySelector('i');
                if (icon && icon.classList.contains('fa-play-circle')) {
                    icon.classList.remove('fa-play-circle');
                    icon.classList.add('fa-pause-circle');
                    this.style.background = 'linear-gradient(135deg, rgba(128, 128, 128, 0.3), rgba(232, 232, 232, 0.2))';
                    
                    setTimeout(() => {
                        icon.classList.remove('fa-pause-circle');
                        icon.classList.add('fa-play-circle');
                        this.style.background = 'linear-gradient(135deg, rgba(128, 128, 128, 0.2), rgba(232, 232, 232, 0.1))';
                    }, 2000);
                }
            });
        });
    }
    
    // Initialize all content-specific features
    initializeContentAnimations();
    initializeContentProjectCards();
    initializeDesignCards();
    initializePartnershipCards();
    initializeProcessTimeline();
    initializeContentSkills();
    initializeContentNavigation();
    initializeVideoProjects();
    initializeMediaGalleries();
    initializeReturnNavigation();
    initializeContentContactForm();
    
    // Load and populate content data
    function loadContentData() {
        if (typeof ContentPortfolioData !== 'undefined') {
            populateVideoProjects();
            populateDesignWork();
            populateBrandPartnerships();
            updateCurrentStatus();
            console.log('Content data loaded successfully');
        } else {
            console.warn('ContentPortfolioData not available');
        }
    }
    
    // Populate video projects section
    function populateVideoProjects() {
        const projectsGrid = document.querySelector('#video-projects .projects-grid');
        if (!projectsGrid || !ContentPortfolioData.videoProjects) return;
        
        // Clear existing placeholder content
        projectsGrid.innerHTML = '';
        
        ContentPortfolioData.videoProjects.forEach(project => {
            const projectCard = createVideoProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Create video project card
    function createVideoProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card content-project-card';
        card.innerHTML = `
            <div class="project-video-placeholder" data-project-id="${project.id}">
                <i class="fas fa-play-circle"></i>
                <p>${project.type}</p>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-metrics">
                    <span class="metric"><i class="fas fa-clock"></i> ${project.duration} Duration</span>
                </div>
                <div class="project-tech">
                    ${project.tools.slice(0, 3).map(tool => `<span class="tech-tag">${tool}</span>`).join('')}
                </div>
                <button class="project-details-btn" data-project-id="${project.id}">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            </div>
        `;
        
        // Add click handler for project details
        const detailsBtn = card.querySelector('.project-details-btn');
        detailsBtn.addEventListener('click', () => showProjectModal(project));
        
        return card;
    }
    
    // Populate design work section
    function populateDesignWork() {
        const designShowcase = document.querySelector('#design-work .design-showcase');
        if (!designShowcase || !ContentPortfolioData.designProjects) return;
        
        // Clear existing placeholder content
        designShowcase.innerHTML = '';
        
        ContentPortfolioData.designProjects.forEach(project => {
            const designCard = createDesignCard(project);
            designShowcase.appendChild(designCard);
        });
    }
    
    // Create design project card
    function createDesignCard(project) {
        const card = document.createElement('div');
        card.className = 'design-card';
        card.innerHTML = `
            <div class="design-image-placeholder">
                <i class="fas fa-palette"></i>
                <p>${project.type}</p>
            </div>
            <div class="design-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="design-tools">
                    ${project.tools.slice(0, 3).map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                </div>
                <button class="design-details-btn" data-project-id="${project.id}">
                    <i class="fas fa-external-link-alt"></i> View Case Study
                </button>
            </div>
        `;
        
        // Add click handler for design details
        const detailsBtn = card.querySelector('.design-details-btn');
        detailsBtn.addEventListener('click', () => showDesignModal(project));
        
        return card;
    }
    
    // Populate brand partnerships section
    function populateBrandPartnerships() {
        const partnershipsShowcase = document.querySelector('#brand-partnerships .partnerships-showcase');
        if (!partnershipsShowcase || !ContentPortfolioData.brandPartnerships) return;
        
        // Clear existing placeholder content
        partnershipsShowcase.innerHTML = '';
        
        ContentPortfolioData.brandPartnerships.forEach(partnership => {
            const partnershipCard = createPartnershipCard(partnership);
            partnershipsShowcase.appendChild(partnershipCard);
        });
    }
    
    // Create partnership card
    function createPartnershipCard(partnership) {
        const card = document.createElement('div');
        card.className = 'partnership-card';
        card.innerHTML = `
            <div class="partnership-logo-placeholder">
                <i class="fas fa-handshake"></i>
                <p>${partnership.industry}</p>
            </div>
            <div class="partnership-info">
                <h3>${partnership.title}</h3>
                <p>${partnership.description}</p>
                <div class="partnership-results">
                    <span class="result-metric">${partnership.duration}</span>
                </div>
                <button class="partnership-details-btn" data-partnership-id="${partnership.id}">
                    <i class="fas fa-chart-bar"></i> View Results
                </button>
            </div>
        `;
        
        // Add click handler for partnership details
        const detailsBtn = card.querySelector('.partnership-details-btn');
        detailsBtn.addEventListener('click', () => showPartnershipModal(partnership));
        
        return card;
    }
    
    // Update current status information
    function updateCurrentStatus() {
        if (!ContentPortfolioData.currentStatus) return;
        
        // Update hero stats with current data
        const heroStats = document.querySelectorAll('.hero-stat-number');
        if (heroStats.length >= 3) {
            heroStats[0].textContent = `${ContentPortfolioData.videoProjects.length}+`;
            heroStats[1].textContent = `${ContentPortfolioData.brandPartnerships.length}+`;
            
            // Calculate total views across all video projects
            const totalViews = ContentPortfolioData.videoProjects.reduce((sum, project) => 
                sum + project.metrics.views, 0);
            heroStats[2].textContent = formatNumber(totalViews) + '+';
        }
    }
    
    // Show project modal with detailed information
    function showProjectModal(project) {
        // Track modal view with analytics
        if (typeof trackEvent === 'function') {
            trackEvent('Content Portfolio', 'View Project Modal', project.title);
        }
        
        const modal = createModal('project-modal', `
            <div class="modal-header">
                <h2>${project.title}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-content">
                <div class="project-overview">
                    <div class="project-meta">
                        <span class="project-type">${project.type}</span>
                        <span class="project-client">Client: ${project.client}</span>
                        <span class="project-status">Status: ${project.status}</span>
                    </div>
                    <p class="project-description">${project.description}</p>
                </div>
                
                <div class="project-objectives">
                    <h3>Objectives</h3>
                    <ul>
                        ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-deliverables">
                    <h3>Deliverables</h3>
                    <ul>
                        ${project.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-metrics-detailed">
                    <h3>Results</h3>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <span class="metric-value">${formatNumber(project.metrics.views)}</span>
                            <span class="metric-label">Total Views</span>
                        </div>
                        <div class="metric-card">
                            <span class="metric-value">${project.metrics.engagementRate}</span>
                            <span class="metric-label">Engagement Rate</span>
                        </div>
                        <div class="metric-card">
                            <span class="metric-value">${formatNumber(project.metrics.conversions)}</span>
                            <span class="metric-label">Conversions</span>
                        </div>
                        <div class="metric-card">
                            <span class="metric-value">${project.metrics.clientSatisfaction || 'N/A'}</span>
                            <span class="metric-label">Client Satisfaction</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-tools-detailed">
                    <h3>Tools & Technologies</h3>
                    <div class="tools-grid">
                        ${project.tools.map(tool => `<span class="tool-badge-large">${tool}</span>`).join('')}
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
    
    // Show design modal with case study information
    function showDesignModal(project) {
        // Track modal view with analytics
        if (typeof trackEvent === 'function') {
            trackEvent('Content Portfolio', 'View Design Modal', project.title);
        }
        
        const modal = createModal('design-modal', `
            <div class="modal-header">
                <h2>${project.title}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-content">
                <div class="design-overview">
                    <div class="design-meta">
                        <span class="design-type">${project.type}</span>
                        <span class="design-client">Client: ${project.client}</span>
                        <span class="design-status">Status: ${project.status}</span>
                    </div>
                </div>
                
                <div class="design-challenge">
                    <h3>Challenge</h3>
                    <p>${project.challenge}</p>
                </div>
                
                <div class="design-solution">
                    <h3>Solution</h3>
                    <p>${project.solution}</p>
                </div>
                
                <div class="design-deliverables">
                    <h3>Deliverables</h3>
                    <ul>
                        ${project.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="design-results">
                    <h3>Results</h3>
                    <div class="results-grid">
                        ${Object.entries(project.results).map(([key, value]) => `
                            <div class="result-item">
                                <span class="result-value">${value}</span>
                                <span class="result-label">${formatResultLabel(key)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
    
    // Show partnership modal with campaign details
    function showPartnershipModal(partnership) {
        // Track modal view with analytics
        if (typeof trackEvent === 'function') {
            trackEvent('Content Portfolio', 'View Partnership Modal', partnership.title);
        }
        
        const modal = createModal('partnership-modal', `
            <div class="modal-header">
                <h2>${partnership.title}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-content">
                <div class="partnership-overview">
                    <div class="partnership-meta">
                        <span class="partnership-type">${partnership.type}</span>
                        <span class="partnership-partner">Partner: ${partnership.partner}</span>
                        <span class="partnership-duration">Duration: ${partnership.duration}</span>
                    </div>
                    <p class="partnership-description">${partnership.description}</p>
                </div>
                
                <div class="partnership-scope">
                    <h3>Partnership Scope</h3>
                    <ul>
                        ${partnership.partnershipScope.map(scope => `<li>${scope}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="partnership-deliverables">
                    <h3>Content Deliverables</h3>
                    <ul>
                        ${partnership.contentDeliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="partnership-results-detailed">
                    <h3>Campaign Results</h3>
                    <div class="results-grid">
                        ${Object.entries(partnership.results).map(([key, value]) => `
                            <div class="result-item">
                                <span class="result-value">${typeof value === 'number' ? formatNumber(value) : value}</span>
                                <span class="result-label">${formatResultLabel(key)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
            </div>
        `);
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
    
    // Utility function to create modal
    function createModal(className, content) {
        const modal = document.createElement('div');
        modal.className = `modal ${className}`;
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-dialog">
                ${content}
            </div>
        `;
        
        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        [closeBtn, backdrop].forEach(element => {
            if (element) {
                element.addEventListener('click', () => {
                    modal.remove();
                });
            }
        });
        
        return modal;
    }
    
    // Utility function to format numbers
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
    
    // Utility function to format result labels
    function formatResultLabel(key) {
        return key.replace(/([A-Z])/g, ' $1')
                 .replace(/^./, str => str.toUpperCase())
                 .replace(/increase/gi, 'Increase')
                 .replace(/rate/gi, 'Rate');
    }
    
    // Initialize media galleries for content projects
    function initializeMediaGalleries() {
        const videoPlaceholders = document.querySelectorAll('.project-video-placeholder');
        
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', function() {
                const projectId = this.dataset.projectId;
                if (projectId && ContentPortfolioData.videoProjects) {
                    const project = ContentPortfolioData.videoProjects.find(p => p.id === projectId);
                    if (project) {
                        showVideoGallery(project);
                    }
                }
            });
        });
        
        // Add gallery functionality to design images
        const designPlaceholders = document.querySelectorAll('.design-image-placeholder');
        designPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', function() {
                const card = this.closest('.design-card');
                const detailsBtn = card.querySelector('.design-details-btn');
                if (detailsBtn) {
                    detailsBtn.click();
                }
            });
        });
    }
    
    // Show video gallery modal
    function showVideoGallery(project) {
        const modal = createModal('video-gallery-modal', `
            <div class="modal-header">
                <h2>${project.title} - Media Gallery</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-content">
                <div class="video-player-container">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Video Player Placeholder</p>
                        <span class="video-duration">${project.duration}</span>
                    </div>
                </div>
                
                <div class="video-info">
                    <h3>Project Overview</h3>
                    <p>${project.description}</p>
                    

                </div>
                
                <div class="video-gallery">
                    <h3>Project Gallery</h3>
                    <div class="gallery-grid">
                        <div class="gallery-item">
                            <div class="gallery-placeholder">
                                <i class="fas fa-image"></i>
                                <p>Behind the Scenes</p>
                            </div>
                        </div>
                        <div class="gallery-item">
                            <div class="gallery-placeholder">
                                <i class="fas fa-film"></i>
                                <p>Production Stills</p>
                            </div>
                        </div>
                        <div class="gallery-item">
                            <div class="gallery-placeholder">
                                <i class="fas fa-camera"></i>
                                <p>Final Shots</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
    
    
    
    // Initialize return navigation with branded transitions
    function initializeReturnNavigation() {
        const returnButton = document.querySelector('.return-button');
        if (returnButton) {
            returnButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Track navigation event
                if (typeof trackEvent === 'function') {
                    trackEvent('Content Portfolio', 'Return to Tech Portfolio', 'Navigation');
                }
                
                // Add chrome transition effect
                const transition = document.createElement('div');
                transition.className = 'portfolio-transition content-transition';
                transition.innerHTML = `
                    <div class="transition-content">
                        <div class="transition-icon">
                            <i class="fas fa-laptop-code"></i>
                        </div>
                        <h3>Returning to Tech Portfolio</h3>
                        <div class="transition-loader">
                            <div class="loader-bar"></div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(transition);
                
                // Animate transition
                setTimeout(() => {
                    transition.classList.add('active');
                }, 100);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            });
        }
    }
    
    // Enhanced case study modal functionality
    function showCaseStudyModal(caseStudy) {
        const modal = createModal('case-study-modal', `
            <div class="modal-header">
                <h2>${caseStudy.title}</h2>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-content case-study-content">
                <div class="case-study-navigation">
                    <button class="case-nav-btn active" data-section="overview">Overview</button>
                    <button class="case-nav-btn" data-section="process">Process</button>
                    <button class="case-nav-btn" data-section="results">Results</button>
                </div>
                
                <div class="case-study-sections">
                    <div class="case-section active" data-section="overview">
                        <h3>Project Overview</h3>
                        <p>${caseStudy.description}</p>
                        
                        <div class="case-challenge">
                            <h4><i class="fas fa-exclamation-triangle"></i> Challenge</h4>
                            <p>${caseStudy.challenge}</p>
                        </div>
                        
                        <div class="case-solution">
                            <h4><i class="fas fa-lightbulb"></i> Solution</h4>
                            <p>${caseStudy.solution}</p>
                        </div>
                    </div>
                    
                    <div class="case-section" data-section="process">
                        <h3>Development Process</h3>
                        <div class="process-timeline-detailed">
                            ${caseStudy.process ? caseStudy.process.map((step, index) => `
                                <div class="process-step-detailed">
                                    <div class="step-number">${index + 1}</div>
                                    <div class="step-content">
                                        <h4>${step.title || `Step ${index + 1}`}</h4>
                                        <p>${step.description || step}</p>
                                    </div>
                                </div>
                            `).join('') : '<p>Process details will be added with actual project content.</p>'}
                        </div>
                    </div>
                    
                    <div class="case-section" data-section="results">
                        <h3>Results & Impact</h3>
                        <div class="results-showcase">
                            ${Object.entries(caseStudy.results || {}).map(([key, value]) => `
                                <div class="result-showcase-item">
                                    <span class="result-value-large">${value}</span>
                                    <span class="result-label-large">${formatResultLabel(key)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        // Add navigation functionality
        const navButtons = modal.querySelectorAll('.case-nav-btn');
        const sections = modal.querySelectorAll('.case-section');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetSection = btn.dataset.section;
                
                // Update active states
                navButtons.forEach(b => b.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                btn.classList.add('active');
                modal.querySelector(`[data-section="${targetSection}"]`).classList.add('active');
            });
        });
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
    
    // ========================================
    // SEGMENT THEMES FUNCTIONALITY
    // ========================================
    
    // Initialize segment themes section
    function initializeSegmentThemes() {
        if (!ContentPortfolioData || !ContentPortfolioData.segmentThemes) {
            console.warn('Segment themes data not available');
            return;
        }
        
        populateSegmentThemes();
        initializeSegmentThemesInteractions();
        initializeSegmentAnimations();
        initializeLazyLoading();
    }
    
    // Populate segment themes grid
    function populateSegmentThemes() {
        const segmentGrid = document.getElementById('segment-themes-grid');
        if (!segmentGrid) return;
        
        segmentGrid.innerHTML = '';
        
        ContentPortfolioData.segmentThemes.forEach(segment => {
            const segmentCard = createSegmentCard(segment);
            segmentGrid.appendChild(segmentCard);
        });
    }
    
    // Create segment card element
    function createSegmentCard(segment) {
        const card = document.createElement('div');
        card.className = 'segment-card segment-theme-card';
        card.setAttribute('data-segment-id', segment.id);
        
        // Use stats from segment data
        const videoCount = segment.stats.totalVideos || 0;
        const totalViews = segment.stats.totalViews || '0';
        
        // Pick a random starting thumbnail from the array
        const randomIndex = segment.thumbnails && segment.thumbnails.length > 1 
            ? Math.floor(Math.random() * segment.thumbnails.length) 
            : 0;
        const initialThumbnail = (segment.thumbnails && segment.thumbnails[randomIndex]) || segment.thumbnail;
        
        card.innerHTML = `
            <div class="segment-thumbnail" style="background: ${segment.gradient}">
                <img src="${initialThumbnail}" alt="${segment.name}" loading="lazy" onerror="this.style.display='none'" class="segment-thumbnail-img">
            </div>
            <h3 class="segment-name">${segment.name}</h3>
            <p class="segment-description">${segment.description}</p>
            <div class="segment-stats">
                <span class="video-count">
                    <i class="fas fa-video"></i> ${videoCount} Video${videoCount !== 1 ? 's' : ''}
                </span>
            </div>
            <button class="btn-view-segment">
                <i class="fas fa-play-circle"></i> View Content
            </button>
        `;
        
        // Start thumbnail rotation if multiple thumbnails exist
        if (segment.thumbnails && segment.thumbnails.length > 1) {
            startThumbnailRotation(card, segment.thumbnails, randomIndex);
        }
        
        return card;
    }
    
    // Rotate thumbnails with a random starting index
    function startThumbnailRotation(card, thumbnails, startIndex) {
        let currentIndex = startIndex || 0;
        const img = card.querySelector('.segment-thumbnail-img');
        
        if (!img) return;
        
        // Add smooth CSS transition for the fade effect
        img.style.transition = 'opacity 0.4s ease-in-out';
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            const newSrc = thumbnails[currentIndex];
            
            // Fade out
            img.style.opacity = '0';
            
            setTimeout(() => {
                img.src = newSrc;
                // Fade in
                img.style.opacity = '1';
            }, 400);
        }, 5000); // 5 seconds between rotations
    }
    
    // Initialize segment themes interactions
    function initializeSegmentThemesInteractions() {
        const segmentCards = document.querySelectorAll('.segment-card');
        
        segmentCards.forEach(card => {
            const viewBtn = card.querySelector('.btn-view-segment');
            
            // Click handler for entire card
            card.addEventListener('click', function(e) {
                if (e.target.closest('.btn-view-segment')) return;
                
                // Scroll to segments section
                const segmentsSection = document.getElementById('content-segments');
                if (segmentsSection) {
                    segmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            
            // Click handler for button
            if (viewBtn) {
                viewBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    // Scroll to segments section
                    const segmentsSection = document.getElementById('content-segments');
                    if (segmentsSection) {
                        segmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.segment-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.segment-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Initialize segment animations
    function initializeSegmentAnimations() {
        const segmentCards = document.querySelectorAll('.segment-card');
        
        // Staggered entrance animation
        segmentCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        segmentCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Initialize lazy loading for video thumbnails
    function initializeLazyLoading() {
        const lazyLoadOptions = {
            threshold: 0,
            rootMargin: '50px'
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading state
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    // Load image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, lazyLoadOptions);
        
        // Observe all lazy-loadable images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add smooth modal transitions
    function addModalTransitions() {
        const modals = document.querySelectorAll('.video-gallery-modal, .video-player-modal');
        
        modals.forEach(modal => {
            modal.addEventListener('transitionend', function(e) {
                if (e.propertyName === 'opacity' && !this.classList.contains('active')) {
                    this.style.display = 'none';
                }
            });
        });
    }
    
    // Initialize modal transitions
    addModalTransitions();
    
    // Open video gallery modal
    function openVideoGallery(segmentId) {
        const segment = ContentPortfolioData.segmentThemes.find(s => s.id === segmentId);
        if (!segment) return;
        
        const modal = document.getElementById('video-gallery-modal');
        const modalTitle = document.getElementById('gallery-modal-title');
        const videoGrid = document.getElementById('video-gallery-grid');
        
        if (!modal || !modalTitle || !videoGrid) return;
        
        // Set modal title
        modalTitle.textContent = `${segment.name} - Video Gallery`;
        
        // Clear and populate video grid
        videoGrid.innerHTML = '';
        
        // Handle subcategories (like ethical hackathons)
        let videos = [];
        if (segment.subCategories && segment.subCategories.length > 0) {
            // Flatten videos from all subcategories
            segment.subCategories.forEach(subCat => {
                if (subCat.videos) {
                    videos = videos.concat(subCat.videos.map(v => ({...v, subCategory: subCat.name})));
                }
            });
        } else {
            videos = segment.videos || [];
        }
        
        videos.forEach((video, index) => {
            const videoItem = createVideoItem(video, index, segmentId);
            videoGrid.appendChild(videoItem);
        });
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Store current segment for video navigation
        modal.setAttribute('data-current-segment', segmentId);
    }
    
    // Create video item element
    function createVideoItem(video, index, segmentId) {
        const item = document.createElement('div');
        item.className = 'video-item';
        item.setAttribute('data-video-id', video.id);
        item.setAttribute('data-video-index', index);
        
        item.innerHTML = `
            <div class="video-thumbnail-wrapper">
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" loading="lazy" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22225%22%3E%3Crect fill=%22%23808080%22 width=%22400%22 height=%22225%22/%3E%3Ctext fill=%22%23fff%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EVideo Thumbnail%3C/text%3E%3C/svg%3E'">
                <div class="video-overlay">
                    <i class="fas fa-play-circle"></i>
                </div>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                ${video.subCategory ? `<p style="color: var(--content-chrome-mid); font-size: 0.85rem; margin: 5px 0;">${video.subCategory}</p>` : ''}
                <div class="video-meta">
                    <span class="video-date">
                        <i class="fas fa-calendar"></i> ${formatDate(video.publishDate)}
                    </span>
                </div>
                ${video.tags && video.tags.length > 0 ? `
                    <div class="video-tags">
                        ${video.tags.slice(0, 3).map(tag => `<span class="video-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        // Add click handler to open video player
        item.addEventListener('click', function() {
            const videoIndex = parseInt(this.getAttribute('data-video-index'));
            openVideoPlayer(segmentId, videoIndex);
        });
        
        return item;
    }
    
    // Close video gallery modal
    function closeVideoGallery() {
        const modal = document.getElementById('video-gallery-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Initialize video gallery modal close handlers
    const galleryCloseBtn = document.getElementById('gallery-modal-close');
    const galleryModal = document.getElementById('video-gallery-modal');
    
    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', closeVideoGallery);
    }
    
    if (galleryModal) {
        const backdrop = galleryModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeVideoGallery);
        }
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
                closeVideoGallery();
            }
        });
    }
    
    // Format date helper
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // ========================================
    // VIDEO PLAYER FUNCTIONALITY
    // ========================================
    
    // Open video player modal
    function openVideoPlayer(segmentId, videoIndex) {
        const segment = ContentPortfolioData.segmentThemes.find(s => s.id === segmentId);
        if (!segment) return;
        
        // Get all videos (including from subcategories)
        let videos = [];
        if (segment.subCategories && segment.subCategories.length > 0) {
            segment.subCategories.forEach(subCat => {
                if (subCat.videos) {
                    videos = videos.concat(subCat.videos);
                }
            });
        } else {
            videos = segment.videos || [];
        }
        
        if (videoIndex < 0 || videoIndex >= videos.length) return;
        
        const video = videos[videoIndex];
        const modal = document.getElementById('video-player-modal');
        const playerWrapper = document.getElementById('video-player-wrapper');
        const playerTitle = document.getElementById('video-player-title');
        const playerDescription = document.getElementById('video-player-description');
        const prevBtn = document.getElementById('video-prev-btn');
        const nextBtn = document.getElementById('video-next-btn');
        
        if (!modal || !playerWrapper || !playerTitle || !playerDescription) return;
        
        // Set video info
        playerTitle.textContent = video.title;
        playerDescription.textContent = video.description;
        
        // Load video player
        loadVideoPlayer(playerWrapper, video);
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = videoIndex === 0;
            prevBtn.onclick = () => {
                if (videoIndex > 0) {
                    openVideoPlayer(segmentId, videoIndex - 1);
                }
            };
        }
        
        if (nextBtn) {
            nextBtn.disabled = videoIndex === videos.length - 1;
            nextBtn.onclick = () => {
                if (videoIndex < videos.length - 1) {
                    openVideoPlayer(segmentId, videoIndex + 1);
                }
            };
        }
        
        // Store current state
        modal.setAttribute('data-current-segment', segmentId);
        modal.setAttribute('data-current-video-index', videoIndex);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Load video player (YouTube/Vimeo embed or HTML5)
    function loadVideoPlayer(container, video) {
        container.innerHTML = '';
        
        const videoUrl = video.videoUrl;
        
        // Check if it's a YouTube URL
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            const videoId = extractYouTubeId(videoUrl);
            if (videoId) {
                container.innerHTML = `
                    <iframe 
                        class="video-player-iframe"
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                `;
                return;
            }
        }
        
        // Check if it's a Vimeo URL
        if (videoUrl.includes('vimeo.com')) {
            const videoId = extractVimeoId(videoUrl);
            if (videoId) {
                container.innerHTML = `
                    <iframe 
                        class="video-player-iframe"
                        src="https://player.vimeo.com/video/${videoId}?autoplay=1"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                `;
                return;
            }
        }
        
        // Check if it's a direct video file
        if (videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
            container.innerHTML = `
                <video class="video-player-iframe" controls autoplay>
                    <source src="${videoUrl}" type="video/${videoUrl.split('.').pop()}">
                    Your browser does not support the video tag.
                </video>
            `;
            return;
        }
        
        // Fallback: show placeholder with link
        container.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(44, 44, 44, 0.8); color: white; text-align: center; padding: 40px;">
                <i class="fas fa-video" style="font-size: 4rem; margin-bottom: 20px; color: var(--content-chrome-mid);"></i>
                <h3 style="margin: 0 0 15px 0;">Video Player</h3>
                <p style="margin: 0 0 25px 0; color: rgba(255, 255, 255, 0.8);">Click below to watch this video</p>
                <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" 
                   style="padding: 12px 30px; background: var(--content-chrome-gradient); color: white; text-decoration: none; border-radius: 25px; font-weight: 600;">
                    <i class="fas fa-external-link-alt"></i> Open Video
                </a>
            </div>
        `;
    }
    
    // Extract YouTube video ID
    function extractYouTubeId(url) {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return null;
    }
    
    // Extract Vimeo video ID
    function extractVimeoId(url) {
        const pattern = /vimeo\.com\/(?:video\/)?(\d+)/;
        const match = url.match(pattern);
        return match ? match[1] : null;
    }
    
    // Close video player modal
    function closeVideoPlayer() {
        const modal = document.getElementById('video-player-modal');
        const playerWrapper = document.getElementById('video-player-wrapper');
        
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Stop video playback
        if (playerWrapper) {
            playerWrapper.innerHTML = '';
        }
    }
    
    // Initialize video player modal close handlers
    const playerCloseBtn = document.getElementById('video-player-close');
    const playerModal = document.getElementById('video-player-modal');
    
    if (playerCloseBtn) {
        playerCloseBtn.addEventListener('click', closeVideoPlayer);
    }
    
    if (playerModal) {
        const backdrop = playerModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeVideoPlayer);
        }
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && playerModal.classList.contains('active')) {
                closeVideoPlayer();
            }
        });
        
        // Arrow key navigation
        document.addEventListener('keydown', function(e) {
            if (!playerModal.classList.contains('active')) return;
            
            const segmentId = playerModal.getAttribute('data-current-segment');
            const currentIndex = parseInt(playerModal.getAttribute('data-current-video-index'));
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                openVideoPlayer(segmentId, currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const segment = ContentPortfolioData.segmentThemes.find(s => s.id === segmentId);
                if (segment) {
                    let videos = [];
                    if (segment.subCategories && segment.subCategories.length > 0) {
                        segment.subCategories.forEach(subCat => {
                            if (subCat.videos) {
                                videos = videos.concat(subCat.videos);
                            }
                        });
                    } else {
                        videos = segment.videos || [];
                    }
                    
                    if (currentIndex < videos.length - 1) {
                        openVideoPlayer(segmentId, currentIndex + 1);
                    }
                }
            }
        });
    }
    
    function displayClientMetrics() {
        if (!ContentPortfolioData.achievements) return;
        
        const metricsContainer = document.createElement('div');
        metricsContainer.className = 'client-metrics-display';
        metricsContainer.innerHTML = `
            <h3>Recognition & Achievements</h3>
            <div class="achievements-grid">
                ${ContentPortfolioData.achievements.map(achievement => `
                    <div class="achievement-card">
                        <div class="achievement-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h4>${achievement.title}</h4>
                        <p class="achievement-org">${achievement.organization}</p>
                        <p class="achievement-year">${achievement.year}</p>
                        <p class="achievement-desc">${achievement.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Insert before contact form
        const contactSection = document.querySelector('#content-contact .container');
        if (contactSection) {
            const formWrapper = contactSection.querySelector('.contact-wrapper');
            if (formWrapper) {
                contactSection.insertBefore(metricsContainer, formWrapper);
            }
        }
    }
    
    // Initialize client metrics display
    displayClientMetrics();
    
    // Initialize segment themes section
    initializeSegmentThemes();

    // Add content-specific CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes chromeShine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .content-portfolio .hero-stats .hero-stat:hover {
            transform: scale(1.05);
            background: rgba(128, 128, 128, 0.1);
            border-radius: 10px;
            padding: 10px;
            transition: all 0.3s ease;
        }
        
        .content-portfolio .tool-tag:hover {
            background: rgba(128, 128, 128, 0.3);
            border-color: rgba(128, 128, 128, 0.5);
            transform: scale(1.05);
        }
        
        .process-step {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});

// Content-specific utility functions
window.ContentPortfolio = {
    // Function to trigger content-themed notifications
    showContentNotification: function(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #808080, #E8E8E8);
            color: #2C2C2C;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(128, 128, 128, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    // Function to simulate video playback
    simulateVideoPlay: function(element) {
        element.style.position = 'relative';
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            border-radius: 15px;
        `;
        overlay.innerHTML = '<i class="fas fa-play"></i>';
        
        element.appendChild(overlay);
        
        setTimeout(() => {
            overlay.remove();
        }, 2000);
    }
};

// Initialize cross-portfolio connections for content portfolio
function initializeCrossPortfolioConnections() {
    // Add cross-portfolio connection containers to content projects
    const projectCards = document.querySelectorAll('.content-project-card, .design-card, .partnership-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            if (projectId && typeof crossPortfolioConnections !== 'undefined') {
                // Show cross-portfolio connections for this content project
                setTimeout(() => {
                    crossPortfolioConnections.renderConnectionCards('content-cross-portfolio-connections', projectId);
                }, 500);
            }
        });
    });
    
    // Track content project interactions
    if (typeof portfolioDiscovery !== 'undefined') {
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project-id');
                const projectType = this.classList.contains('content-project-card') ? 'video' : 
                                  this.classList.contains('design-card') ? 'design' : 'partnership';
                
                portfolioDiscovery.trackInteraction('project_view', {
                    projectId: projectId,
                    category: 'Content Creation',
                    type: projectType,
                    portfolio: 'content'
                });
            });
        });
    }
    
    // Add cross-portfolio connections container to content portfolio
    const contentContainer = document.querySelector('.content-container') || document.querySelector('.container');
    if (contentContainer && !document.getElementById('content-cross-portfolio-connections')) {
        const connectionsContainer = document.createElement('div');
        connectionsContainer.id = 'content-cross-portfolio-connections';
        connectionsContainer.className = 'cross-portfolio-section';
        connectionsContainer.style.display = 'none';
        contentContainer.appendChild(connectionsContainer);
    }
    
    console.log('🎨 Content cross-portfolio connections initialized');
}

// ========================================
// ADVANCINGX SECTION FUNCTIONALITY
// ========================================

// Initialize AdvancingX section
function initializeAdvancingXSection() {
    if (!ContentPortfolioData || !ContentPortfolioData.advancingX) {
        console.warn('AdvancingX data not available');
        return;
    }
    
    populateAdvancingXSocialLinks();
    populateAdvancingXCarousels();
    populateAdvancingXVideos();
    initializeCarouselFilters();
    initializeCarouselViewerModal();
}

// Populate social media links
function populateAdvancingXSocialLinks() {
    const socialLinksGrid = document.getElementById('advancingx-social-links');
    if (!socialLinksGrid) return;
    
    const socialMedia = ContentPortfolioData.advancingX.socialMedia;
    if (!socialMedia || socialMedia.length === 0) return;
    
    socialLinksGrid.innerHTML = '';
    
    socialMedia.forEach(platform => {
        const linkCard = createSocialLinkCard(platform);
        socialLinksGrid.appendChild(linkCard);
    });
}

// Create social link card
function createSocialLinkCard(platform) {
    const card = document.createElement('a');
    card.href = platform.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'social-link-card';
    
    // Determine platform class for icon styling
    let platformClass = '';
    if (platform.platform.toLowerCase().includes('linkedin')) {
        platformClass = 'linkedin';
    } else if (platform.platform.toLowerCase().includes('x') || platform.platform.toLowerCase().includes('twitter')) {
        platformClass = 'twitter';
    } else if (platform.platform.toLowerCase().includes('instagram')) {
        platformClass = 'instagram';
    }
    
    card.innerHTML = `
        <div class="social-platform-icon ${platformClass}">
            <i class="${platform.icon}"></i>
        </div>
        <div class="social-info">
            <span class="social-platform">${platform.platform}</span>
            <span class="social-handle">${platform.handle}</span>
            <span class="social-role">${platform.role}</span>
            <div class="social-stats">
                <span class="social-stat">${platform.stats.posts} posts</span>
                <span class="social-stat">${platform.stats.followers} followers</span>
                <span class="social-stat">${platform.stats.engagement} engagement</span>
            </div>
        </div>
    `;
    
    return card;
}

// Populate carousel posts
function populateAdvancingXCarousels() {
    const carouselGrid = document.getElementById('advancingx-carousel-posts');
    if (!carouselGrid) return;
    
    const carousels = ContentPortfolioData.advancingX.carousels;
    if (!carousels || carousels.length === 0) return;
    
    carouselGrid.innerHTML = '';
    
    carousels.forEach(carousel => {
        const carouselCard = createCarouselPostCard(carousel);
        carouselGrid.appendChild(carouselCard);
    });
}

// Create carousel post card
function createCarouselPostCard(carousel) {
    const card = document.createElement('div');
    card.className = 'carousel-post-card';
    card.setAttribute('data-carousel-id', carousel.id);
    card.setAttribute('data-platform', carousel.platform);
    
    const platformBadgeClass = carousel.platform === 'X' ? 'platform-x' : 'platform-linkedin';
    const platformIcon = carousel.platform === 'X' ? 'fab fa-x-twitter' : 'fab fa-linkedin';
    
    card.innerHTML = `
        <img src="${carousel.thumbnail}" alt="${carousel.title}" class="carousel-preview" 
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23808080%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23fff%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ECarousel Preview%3C/text%3E%3C/svg%3E'">
        <div class="carousel-post-info">
            <div class="carousel-platform-badge ${platformBadgeClass}">
                <i class="${platformIcon}"></i> ${carousel.platform}
            </div>
            <h4 class="carousel-title">${carousel.title}</h4>
            <p class="carousel-description">${carousel.description}</p>
            <div class="carousel-meta">
                <span class="carousel-date">
                    <i class="fas fa-calendar"></i> ${formatDate(carousel.publishDate)}
                </span>
                <span class="carousel-slides">
                    <i class="fas fa-images"></i> ${carousel.slides.length} slides
                </span>
            </div>

            <button class="btn-view-carousel">
                <i class="fas fa-images"></i> View Carousel
            </button>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', function() {
        openCarouselViewer(carousel.id);
    });
    
    return card;
}

// Initialize carousel platform filters
function initializeCarouselFilters() {
    const filterTabs = document.querySelectorAll('.platform-tab');
    const carouselCards = document.querySelectorAll('.carousel-post-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter carousel cards
            carouselCards.forEach(card => {
                const cardPlatform = card.getAttribute('data-platform');
                
                if (platform === 'all' || cardPlatform === platform) {
                    card.style.display = 'block';
                    // Animate in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Populate AdvancingX videos
function populateAdvancingXVideos() {
    const videosGrid = document.getElementById('advancingx-videos');
    if (!videosGrid) return;
    
    const videos = ContentPortfolioData.advancingX.videos;
    if (!videos || videos.length === 0) return;
    
    videosGrid.innerHTML = '';
    
    videos.forEach((video, index) => {
        // Create video item element inline to avoid dependency issues
        const item = document.createElement('div');
        item.className = 'video-item';
        item.setAttribute('data-video-id', video.id);
        item.setAttribute('data-video-index', index);

        item.innerHTML = `
            <div class="video-thumbnail-wrapper">
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22225%22%3E%3Crect fill=%22%23808080%22 width=%22400%22 height=%22225%22/%3E%3Ctext fill=%22%23fff%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EVideo Thumbnail%3C/text%3E%3C/svg%3E'">
                <div class="video-overlay">
                    <i class="fas fa-play-circle"></i>
                </div>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <div class="video-meta">
                    <span class="video-date">
                        <i class="fas fa-calendar"></i> ${formatDate(video.publishDate)}
                    </span>
                </div>
            </div>
        `;

        videosGrid.appendChild(item);
    });
}

// Initialize carousel viewer modal
function initializeCarouselViewerModal() {
    const modal = document.getElementById('carousel-viewer-modal');
    const closeBtn = document.getElementById('carousel-viewer-close');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    
    if (!modal) return;
    
    // Close button handler
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCarouselViewer);
    }
    
    // Backdrop click handler
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeCarouselViewer);
    }
    
    // Navigation button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateCarousel(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateCarousel(1));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeCarouselViewer();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateCarousel(1);
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slidesContainer = document.getElementById('carousel-slides-container');
    if (slidesContainer) {
        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                navigateCarousel(1);
            } else {
                // Swipe right - previous slide
                navigateCarousel(-1);
            }
        }
    }
}

// Open carousel viewer
function openCarouselViewer(carouselId) {
    const carousel = ContentPortfolioData.advancingX.carousels.find(c => c.id === carouselId);
    if (!carousel) return;
    
    console.log('Opening carousel:', carouselId);
    console.log('Carousel data:', carousel);
    console.log('Number of slides:', carousel.slides ? carousel.slides.length : 0);
    
    const modal = document.getElementById('carousel-viewer-modal');
    const slidesContainer = document.getElementById('carousel-slides-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const carouselTitle = document.getElementById('carousel-title');
    const carouselDescription = document.getElementById('carousel-description');
    const viewOriginalLink = document.getElementById('view-original-post');

    if (!modal || !slidesContainer) return;
    
    // Set carousel info
    if (carouselTitle) carouselTitle.textContent = carousel.title;
    if (carouselDescription) carouselDescription.textContent = carousel.description;
    if (viewOriginalLink) viewOriginalLink.href = carousel.postUrl;
    
    // Clear and populate slides
    slidesContainer.innerHTML = '';
    carousel.slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slideDiv.innerHTML = `
            <img src="${slide.image}" alt="${slide.alt}" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23808080%22 width=%22800%22 height=%22600%22/%3E%3Ctext fill=%22%23fff%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ESlide ${index + 1}%3C/text%3E%3C/svg%3E'">
        `;
        slidesContainer.appendChild(slideDiv);
    });
    
    // Create indicators
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
        carousel.slides.forEach((slide, index) => {
            const indicator = document.createElement('span');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Update slide counter
    updateSlideCounter(1, carousel.slides.length);
    
    // Store current carousel data
    modal.setAttribute('data-current-carousel', carouselId);
    modal.setAttribute('data-current-slide', '0');
    modal.setAttribute('data-total-slides', carousel.slides.length);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Navigate carousel (direction: -1 for prev, 1 for next)
function navigateCarousel(direction) {
    console.log('Navigate carousel called with direction:', direction);
    const modal = document.getElementById('carousel-viewer-modal');
    if (!modal || !modal.classList.contains('active')) {
        console.log('Modal not found or not active');
        return;
    }
    
    const currentSlide = parseInt(modal.getAttribute('data-current-slide')) || 0;
    const totalSlides = parseInt(modal.getAttribute('data-total-slides')) || 0;
    
    console.log('Current slide:', currentSlide, 'Total slides:', totalSlides);
    
    let newSlide = currentSlide + direction;
    
    // Boundary checks
    if (newSlide < 0) newSlide = 0;
    if (newSlide >= totalSlides) newSlide = totalSlides - 1;
    
    console.log('New slide:', newSlide);
    
    if (newSlide !== currentSlide) {
        goToSlide(newSlide);
    }
}

// Go to specific slide
function goToSlide(slideIndex) {
    const modal = document.getElementById('carousel-viewer-modal');
    if (!modal) return;
    
    const slides = modal.querySelectorAll('.carousel-slide');
    const indicators = modal.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    
    if (slideIndex < 0 || slideIndex >= totalSlides) return;
    
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        if (index === slideIndex) {
            slide.classList.add('active');
        } else if (index < slideIndex) {
            slide.classList.add('prev');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    
    if (prevBtn) prevBtn.disabled = slideIndex === 0;
    if (nextBtn) nextBtn.disabled = slideIndex === totalSlides - 1;
    
    // Update slide counter
    updateSlideCounter(slideIndex + 1, totalSlides);
    
    // Store current slide
    modal.setAttribute('data-current-slide', slideIndex);
}

// Update slide counter
function updateSlideCounter(current, total) {
    const currentSlideNum = document.getElementById('current-slide-num');
    const totalSlidesNum = document.getElementById('total-slides-num');
    
    if (currentSlideNum) currentSlideNum.textContent = current;
    if (totalSlidesNum) totalSlidesNum.textContent = total;
}

// Close carousel viewer
function closeCarouselViewer() {
    console.log('Close carousel viewer called');
    const modal = document.getElementById('carousel-viewer-modal');
    if (modal) {
        console.log('Modal found, closing...');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    } else {
        console.log('Modal not found!');
    }
}

// Add ESC key handler for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('carousel-viewer-modal');
        if (modal && modal.classList.contains('active')) {
            closeCarouselViewer();
        }
    }
});

// Initialize AdvancingX section on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancingXSection();
});

    
    // ========================================
    // EVENTS CONTENT CREATION FUNCTIONALITY
    // ========================================
    
    // Initialize events section
    function initializeEventsSection() {
        if (!ContentPortfolioData || !ContentPortfolioData.events) {
            console.warn('Events data not available');
            return;
        }
        
        populateEventsGrid();
        initializeEventsInteractions();
        initializeEventsAnimations();
    }
    
    // Populate events grid
    function populateEventsGrid() {
        const eventsGrid = document.getElementById('events-grid');
        if (!eventsGrid) return;
        
        eventsGrid.innerHTML = '';
        
        ContentPortfolioData.events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsGrid.appendChild(eventCard);
        });
    }
    
    // Create event card element
    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-event-id', event.id);
        
        // Get first image for preview
        const previewImage = event.images && event.images.length > 0 
            ? event.images[0].image 
            : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22250%22%3E%3Crect fill=%22%23808080%22 width=%22400%22 height=%22250%22/%3E%3Ctext fill=%22%23fff%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EEvent Image%3C/text%3E%3C/svg%3E';
        
        card.innerHTML = `
            <div class="event-image-preview">
                <img src="${previewImage}" alt="${event.name}" loading="lazy">
                <div class="event-image-count">
                    <i class="fas fa-images"></i> ${event.images ? event.images.length : 0} Photos
                </div>
                <div class="event-category-badge">${event.category}</div>
            </div>
            <div class="event-info">
                <h3 class="event-name">${event.name}</h3>
                <div class="event-meta">
                    <span class="event-date">
                        <i class="fas fa-calendar"></i> ${formatDate(event.date)}${event.endDate ? ' - ' + formatDate(event.endDate) : ''}
                    </span>
                    <span class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </span>
                    <span class="event-role">
                        <i class="fas fa-user-tag"></i> ${event.role}
                    </span>
                </div>
                <p class="event-description">${event.description}</p>
                ${event.outcome ? `
                    <div class="event-outcome">
                        <i class="fas fa-trophy"></i> ${event.outcome}
                    </div>
                ` : ''}
                ${event.highlights && event.highlights.length > 0 ? `
                    <div class="event-highlights">
                        <ul class="event-highlights-list">
                            ${event.highlights.slice(0, 3).map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <button class="btn-view-event">
                    <i class="fas fa-images"></i> View Gallery
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Initialize events interactions
    function initializeEventsInteractions() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const viewBtn = card.querySelector('.btn-view-event');
            
            // Click handler for entire card
            card.addEventListener('click', function(e) {
                if (e.target.closest('.btn-view-event')) return;
                
                const eventId = this.getAttribute('data-event-id');
                openImageGallery(eventId);
            });
            
            // Click handler for button
            if (viewBtn) {
                viewBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const eventId = card.getAttribute('data-event-id');
                    openImageGallery(eventId);
                });
            }
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                const img = this.querySelector('.event-image-preview img');
                if (img) {
                    img.style.transform = 'scale(1.08)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const img = this.querySelector('.event-image-preview img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Initialize events animations
    function initializeEventsAnimations() {
        const eventCards = document.querySelectorAll('.event-card');
        
        // Staggered entrance animation
        eventCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        eventCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // ========================================
    // IMAGE GALLERY FUNCTIONALITY
    // ========================================
    
    let currentGalleryState = {
        eventId: null,
        currentIndex: 0,
        images: [],
        zoomLevel: 1
    };
    
    // Open image gallery modal
    function openImageGallery(eventId) {
        const event = ContentPortfolioData.events.find(e => e.id === eventId);
        if (!event || !event.images || event.images.length === 0) {
            console.warn('Event or images not found');
            return;
        }
        
        const modal = document.getElementById('image-gallery-modal');
        if (!modal) return;
        
        // Initialize gallery state
        currentGalleryState = {
            eventId: eventId,
            currentIndex: 0,
            images: event.images,
            zoomLevel: 1
        };
        
        // Update gallery info
        updateGalleryInfo(event);
        
        // Load thumbnails
        loadGalleryThumbnails(event.images);
        
        // Display first image
        displayGalleryImage(0);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update gallery info
    function updateGalleryInfo(event) {
        const titleEl = document.getElementById('gallery-event-title');
        const dateEl = document.getElementById('gallery-event-date');
        const locationEl = document.getElementById('gallery-event-location');
        
        if (titleEl) titleEl.textContent = event.name;
        if (dateEl) dateEl.textContent = formatDate(event.date);
        if (locationEl) locationEl.textContent = event.location;
    }
    
    // Load gallery thumbnails
    function loadGalleryThumbnails(images) {
        const thumbnailStrip = document.getElementById('thumbnail-strip');
        if (!thumbnailStrip) return;
        
        thumbnailStrip.innerHTML = '';
        
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.className = 'gallery-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            thumbnail.src = image.image;
            thumbnail.alt = image.caption || `Image ${index + 1}`;
            thumbnail.setAttribute('data-index', index);
            
            thumbnail.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-index'));
                displayGalleryImage(idx);
            });
            
            thumbnailStrip.appendChild(thumbnail);
        });
    }
    
    // Display gallery image
    function displayGalleryImage(index) {
        const images = currentGalleryState.images;
        if (index < 0 || index >= images.length) return;
        
        currentGalleryState.currentIndex = index;
        currentGalleryState.zoomLevel = 1;
        
        const image = images[index];
        const mainImage = document.getElementById('gallery-current-image');
        const caption = document.getElementById('image-caption');
        const counter = document.getElementById('image-counter');
        const prevBtn = document.getElementById('gallery-prev-btn');
        const nextBtn = document.getElementById('gallery-next-btn');
        
        // Update main image
        if (mainImage) {
            mainImage.src = image.image;
            mainImage.alt = image.caption || `Image ${index + 1}`;
            mainImage.style.transform = 'scale(1)';
            mainImage.classList.remove('zoomed');
        }
        
        // Update caption
        if (caption) {
            caption.textContent = image.caption || '';
        }
        
        // Update counter
        if (counter) {
            counter.textContent = `${index + 1} / ${images.length}`;
        }
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = index === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = index === images.length - 1;
        }
        
        // Update thumbnail active state
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, idx) => {
            if (idx === index) {
                thumb.classList.add('active');
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Navigate to previous image
    function navigatePrevImage() {
        const newIndex = currentGalleryState.currentIndex - 1;
        if (newIndex >= 0) {
            displayGalleryImage(newIndex);
        }
    }
    
    // Navigate to next image
    function navigateNextImage() {
        const newIndex = currentGalleryState.currentIndex + 1;
        if (newIndex < currentGalleryState.images.length) {
            displayGalleryImage(newIndex);
        }
    }
    
    // Zoom in
    function zoomIn() {
        const mainImage = document.getElementById('gallery-current-image');
        if (!mainImage) return;
        
        currentGalleryState.zoomLevel = Math.min(currentGalleryState.zoomLevel + 0.5, 3);
        mainImage.style.transform = `scale(${currentGalleryState.zoomLevel})`;
        mainImage.classList.add('zoomed');
    }
    
    // Zoom out
    function zoomOut() {
        const mainImage = document.getElementById('gallery-current-image');
        if (!mainImage) return;
        
        currentGalleryState.zoomLevel = Math.max(currentGalleryState.zoomLevel - 0.5, 1);
        mainImage.style.transform = `scale(${currentGalleryState.zoomLevel})`;
        
        if (currentGalleryState.zoomLevel === 1) {
            mainImage.classList.remove('zoomed');
        }
    }
    
    // Toggle fullscreen
    function toggleFullscreen() {
        const container = document.querySelector('.image-gallery-viewer');
        if (!container) return;
        
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.warn('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Close image gallery modal
    function closeImageGallery() {
        const modal = document.getElementById('image-gallery-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Reset zoom
        const mainImage = document.getElementById('gallery-current-image');
        if (mainImage) {
            mainImage.style.transform = 'scale(1)';
            mainImage.classList.remove('zoomed');
        }
        
        // Reset state
        currentGalleryState = {
            eventId: null,
            currentIndex: 0,
            images: [],
            zoomLevel: 1
        };
    }
    
    // Initialize image gallery modal controls
    const galleryCloseBtn = document.getElementById('image-gallery-close');
    const galleryModal = document.getElementById('image-gallery-modal');
    const galleryPrevBtn = document.getElementById('gallery-prev-btn');
    const galleryNextBtn = document.getElementById('gallery-next-btn');
    const zoomInBtn = document.getElementById('btn-zoom-in');
    const zoomOutBtn = document.getElementById('btn-zoom-out');
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    const galleryMainImage = document.getElementById('gallery-current-image');
    
    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', closeImageGallery);
    }
    
    if (galleryModal) {
        const backdrop = galleryModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', closeImageGallery);
        }
    }
    
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', navigatePrevImage);
    }
    
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', navigateNextImage);
    }
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', zoomIn);
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', zoomOut);
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Click on main image to toggle zoom
    if (galleryMainImage) {
        galleryMainImage.addEventListener('click', function() {
            if (currentGalleryState.zoomLevel === 1) {
                zoomIn();
            } else {
                currentGalleryState.zoomLevel = 1;
                this.style.transform = 'scale(1)';
                this.classList.remove('zoomed');
            }
        });
    }
    
    // Keyboard navigation for image gallery
    document.addEventListener('keydown', function(e) {
        if (!galleryModal || !galleryModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeImageGallery();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigatePrevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateNextImage();
                break;
            case '+':
            case '=':
                e.preventDefault();
                zoomIn();
                break;
            case '-':
            case '_':
                e.preventDefault();
                zoomOut();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
        }
    });
    
    // Touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let initialPinchDistance = 0;
    
    if (galleryModal) {
        const imageContainer = galleryModal.querySelector('.gallery-main-image-container');
        
        if (imageContainer) {
            // Swipe gestures
            imageContainer.addEventListener('touchstart', function(e) {
                if (e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                } else if (e.touches.length === 2) {
                    // Pinch zoom start
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
                }
            }, { passive: true });
            
            imageContainer.addEventListener('touchmove', function(e) {
                if (e.touches.length === 2 && initialPinchDistance > 0) {
                    // Pinch zoom
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    const currentDistance = Math.sqrt(dx * dx + dy * dy);
                    const scale = currentDistance / initialPinchDistance;
                    
                    if (scale > 1.1) {
                        zoomIn();
                        initialPinchDistance = currentDistance;
                    } else if (scale < 0.9) {
                        zoomOut();
                        initialPinchDistance = currentDistance;
                    }
                }
            }, { passive: true });
            
            imageContainer.addEventListener('touchend', function(e) {
                if (e.changedTouches.length === 1) {
                    touchEndX = e.changedTouches[0].clientX;
                    touchEndY = e.changedTouches[0].clientY;
                    
                    const deltaX = touchEndX - touchStartX;
                    const deltaY = touchEndY - touchStartY;
                    
                    // Horizontal swipe
                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                        if (deltaX > 0) {
                            // Swipe right - previous image
                            navigatePrevImage();
                        } else {
                            // Swipe left - next image
                            navigateNextImage();
                        }
                    }
                }
                
                initialPinchDistance = 0;
            }, { passive: true });
        }
    }
    
    // Initialize events section
    initializeEventsSection();


// ========================================
// MOBILE INTERACTION ENHANCEMENTS
// ========================================

// Initialize mobile-specific interactions
function initializeMobileInteractions() {
    if (!isMobileDevice()) return;
    
    console.log('Initializing mobile interactions');
    
    // Add mobile-specific classes
    document.body.classList.add('mobile-device');
    
    // Initialize touch feedback
    initializeTouchFeedback();
    
    // Initialize mobile-optimized modals
    initializeMobileModals();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Optimize images for mobile
    optimizeImagesForMobile();
    
    // Add pull-to-refresh prevention
    preventPullToRefresh();
}

// Detect mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768);
}

// Initialize touch feedback for all interactive elements
function initializeTouchFeedback() {
    const interactiveElements = document.querySelectorAll(`
        .segment-card,
        .video-item,
        .carousel-post-card,
        .event-card,
        .social-link-card,
        button,
        .btn,
        .btn-view-segment,
        .btn-view-carousel,
        .btn-view-event
    `);
    
    interactiveElements.forEach(element => {
        // Add touch start feedback
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.9';
        }, { passive: true });
        
        // Remove feedback on touch end
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 150);
        }, { passive: true });
        
        // Remove feedback if touch is cancelled
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.opacity = '';
        }, { passive: true });
    });
}

// Initialize mobile-optimized modals
function initializeMobileModals() {
    const modals = document.querySelectorAll('.modal, .video-gallery-modal, .carousel-viewer-modal, .image-gallery-modal');
    
    modals.forEach(modal => {
        // Prevent body scroll when modal is open
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (modal.classList.contains('active')) {
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.position = '';
                        document.body.style.width = '';
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true });
        
        // Add swipe-down to close gesture for modals
        let touchStartY = 0;
        let touchEndY = 0;
        
        const modalContent = modal.querySelector('.modal-content, .modal-dialog, .carousel-viewer-container, .image-gallery-container');
        if (modalContent) {
            modalContent.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            modalContent.addEventListener('touchmove', function(e) {
                touchEndY = e.touches[0].clientY;
                const diff = touchEndY - touchStartY;
                
                // Only allow swipe down from top of modal
                if (diff > 0 && this.scrollTop === 0) {
                    e.preventDefault();
                    // Add visual feedback
                    this.style.transform = `translateY(${Math.min(diff, 100)}px)`;
                    this.style.opacity = Math.max(1 - (diff / 300), 0.5);
                }
            }, { passive: false });
            
            modalContent.addEventListener('touchend', function() {
                const diff = touchEndY - touchStartY;
                
                // Close modal if swiped down more than 100px
                if (diff > 100) {
                    const closeBtn = modal.querySelector('.modal-close');
                    if (closeBtn) {
                        closeBtn.click();
                    }
                }
                
                // Reset transform
                this.style.transform = '';
                this.style.opacity = '';
                touchStartY = 0;
                touchEndY = 0;
            }, { passive: true });
        }
    });
}

// Initialize mobile navigation enhancements
function initializeMobileNavigation() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add haptic feedback for buttons (if supported)
    if ('vibrate' in navigator) {
        document.querySelectorAll('button, .btn').forEach(button => {
            button.addEventListener('click', function() {
                navigator.vibrate(10); // Short vibration
            });
        });
    }
}

// Optimize images for mobile
function optimizeImagesForMobile() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" if not already set
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling for failed image loads
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, rgba(128, 128, 128, 0.2), rgba(232, 232, 232, 0.1))';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Image unavailable';
        });
    });
    
    // Implement responsive image sizes for mobile
    if (window.innerWidth <= 768) {
        images.forEach(img => {
            // Reduce image quality for mobile to save bandwidth
            if (img.src && !img.dataset.originalSrc) {
                img.dataset.originalSrc = img.src;
                // This would work with a server-side image optimization service
                // For now, we just ensure lazy loading is enabled
            }
        });
    }
}

// Prevent pull-to-refresh on mobile browsers
function preventPullToRefresh() {
    let lastTouchY = 0;
    let preventPullToRefresh = false;
    
    document.body.addEventListener('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        lastTouchY = e.touches[0].clientY;
        preventPullToRefresh = window.pageYOffset === 0;
    }, { passive: true });
    
    document.body.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;
        
        if (preventPullToRefresh) {
            // Prevent pull-to-refresh if at top and pulling down
            if (touchYDelta > 0) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}

// Enhanced swipe gesture handler for video gallery
function enhanceVideoGallerySwipes() {
    const videoGalleryModal = document.getElementById('video-gallery-modal');
    if (!videoGalleryModal) return;
    
    const videoGrid = document.getElementById('video-gallery-grid');
    if (!videoGrid) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    videoGrid.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    videoGrid.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Detect horizontal swipe (for potential future carousel view)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
            // Could implement horizontal scrolling or carousel navigation
            console.log('Horizontal swipe detected in video gallery');
        }
    }, { passive: true });
}

// Enhanced swipe gesture handler for carousel posts
function enhanceCarouselSwipes() {
    const carouselModal = document.querySelector('.carousel-viewer-modal');
    if (!carouselModal) return;
    
    // Additional swipe enhancements beyond existing implementation
    const carouselViewer = carouselModal.querySelector('.carousel-viewer');
    if (!carouselViewer) return;
    
    let touchStartTime = 0;
    
    carouselViewer.addEventListener('touchstart', function() {
        touchStartTime = Date.now();
    }, { passive: true });
    
    carouselViewer.addEventListener('touchend', function() {
        const touchDuration = Date.now() - touchStartTime;
        
        // Quick tap (< 200ms) could trigger additional actions
        if (touchDuration < 200) {
            // Could toggle info display or other quick actions
            console.log('Quick tap detected on carousel');
        }
    }, { passive: true });
}

// Enhanced swipe gesture handler for image gallery
function enhanceImageGallerySwipes() {
    const imageGalleryModal = document.querySelector('.image-gallery-modal');
    if (!imageGalleryModal) return;
    
    // Double-tap to zoom functionality
    const mainImageContainer = imageGalleryModal.querySelector('.gallery-main-image-container');
    if (!mainImageContainer) return;
    
    let lastTap = 0;
    
    mainImageContainer.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            // Double tap detected
            const mainImage = this.querySelector('.gallery-main-image');
            if (mainImage) {
                if (mainImage.classList.contains('zoomed')) {
                    mainImage.classList.remove('zoomed');
                } else {
                    mainImage.classList.add('zoomed');
                }
            }
            e.preventDefault();
        }
        
        lastTap = currentTime;
    });
}

// Add pinch-to-zoom for images in gallery
function addPinchToZoom() {
    const imageGalleryModal = document.querySelector('.image-gallery-modal');
    if (!imageGalleryModal) return;
    
    const mainImageContainer = imageGalleryModal.querySelector('.gallery-main-image-container');
    if (!mainImageContainer) return;
    
    let initialDistance = 0;
    let currentScale = 1;
    
    mainImageContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            initialDistance = getDistance(e.touches[0], e.touches[1]);
        }
    }, { passive: true });
    
    mainImageContainer.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            
            const currentDistance = getDistance(e.touches[0], e.touches[1]);
            const scale = currentDistance / initialDistance;
            currentScale = Math.min(Math.max(scale, 0.5), 3); // Limit scale between 0.5x and 3x
            
            const mainImage = this.querySelector('.gallery-main-image');
            if (mainImage) {
                mainImage.style.transform = `scale(${currentScale})`;
            }
        }
    }, { passive: false });
    
    mainImageContainer.addEventListener('touchend', function() {
        initialDistance = 0;
        
        // Reset scale if it's close to 1
        if (currentScale > 0.9 && currentScale < 1.1) {
            const mainImage = this.querySelector('.gallery-main-image');
            if (mainImage) {
                mainImage.style.transform = 'scale(1)';
            }
            currentScale = 1;
        }
    }, { passive: true });
    
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Optimize modal sizes for mobile screens
function optimizeModalSizesForMobile() {
    if (window.innerWidth > 768) return;
    
    const modals = document.querySelectorAll('.modal-content, .modal-dialog, .carousel-viewer-container, .image-gallery-container');
    
    modals.forEach(modal => {
        // Ensure modals take full width on mobile
        modal.style.width = '100%';
        modal.style.maxWidth = '100%';
        modal.style.margin = '0';
        modal.style.borderRadius = '0';
        
        // Adjust max height for mobile
        modal.style.maxHeight = '100vh';
    });
}

// Add mobile-specific image size optimization
function implementMobileImageSizes() {
    if (window.innerWidth > 768) return;
    
    // Reduce image dimensions for mobile
    const thumbnails = document.querySelectorAll('.video-thumbnail, .carousel-preview, .event-image-preview img, .gallery-thumbnail');
    
    thumbnails.forEach(img => {
        // Add mobile-optimized loading
        img.setAttribute('loading', 'lazy');
        
        // Set smaller dimensions for mobile
        if (img.naturalWidth > 800) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    });
}

// Initialize all mobile interactions when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeMobileInteractions();
        enhanceVideoGallerySwipes();
        enhanceCarouselSwipes();
        enhanceImageGallerySwipes();
        addPinchToZoom();
        optimizeModalSizesForMobile();
        implementMobileImageSizes();
    });
} else {
    // DOM already loaded
    initializeMobileInteractions();
    enhanceVideoGallerySwipes();
    enhanceCarouselSwipes();
    enhanceImageGallerySwipes();
    addPinchToZoom();
    optimizeModalSizesForMobile();
    implementMobileImageSizes();
}

// Re-optimize on window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (isMobileDevice()) {
            optimizeModalSizesForMobile();
            implementMobileImageSizes();
        }
    }, 250);
});

// Add viewport height fix for mobile browsers (address bar issue)
function fixMobileViewportHeight() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

fixMobileViewportHeight();

console.log('Mobile interaction enhancements loaded');


// Initialize content portfolio contact form with analytics tracking
function initializeContentContactForm() {
    const contactForm = document.getElementById('content-contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        // Track form submission attempt
        if (typeof trackEvent === 'function') {
            trackEvent('Content Portfolio', 'Contact Form Submit', 'Attempt');
        }
        
        // Let the form submit naturally to Formspree
        // The contact-system.js will handle the rest if loaded
    });
    
    // Track form field interactions
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            if (typeof trackEvent === 'function') {
                trackEvent('Content Portfolio', 'Contact Form Field Focus', this.name || this.id);
            }
        });
    });
}
