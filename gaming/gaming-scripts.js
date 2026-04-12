// Gaming Portfolio Specific JavaScript

// Global Modal Functions for Lunar Loot Embed
window.openLunarEmbed = function(url, title) {
    let overlay = document.getElementById('lunar-embed-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lunar-embed-overlay';
        overlay.className = 'lunar-modal-overlay';
        overlay.innerHTML = `
            <div class="lunar-modal-container">
                <div class="lunar-modal-header">
                    <h2 class="lunar-modal-title"><i class="fas fa-satellite"></i> ${title} Terminal</h2>
                    <button class="lunar-modal-close" onclick="window.closeLunarEmbed()" title="Close Terminal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <iframe id="lunar-embed-iframe" class="lunar-embed-iframe" allow="camera; microphone" allowfullscreen></iframe>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    const iframe = document.getElementById('lunar-embed-iframe');
    const embedUrl = url.includes('?') ? url + '&embed=true' : url + '/?embed=true';
    iframe.src = embedUrl;
    
    setTimeout(() => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
};

window.closeLunarEmbed = function() {
    const overlay = document.getElementById('lunar-embed-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            const iframe = document.getElementById('lunar-embed-iframe');
            if (iframe) iframe.src = 'about:blank';
        }, 400);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    
    // Gaming Portfolio Initialization
    console.log('Gaming Portfolio initialized');
    
    // Load gaming data
    loadGamingData();
    
    // Initialize modal functionality
    initializeGamingModals();
    
    // Initialize skill connections
    initializeSkillConnections();
    
    // Initialize achievements display
    initializeAchievements();
    
    // Initialize cross-portfolio connections
    initializeCrossPortfolioConnections();
    
    // Gaming-specific animations and interactions
    function initializeGamingAnimations() {
        // Add fire effect to gaming buttons
        const gamingButtons = document.querySelectorAll('.gaming-button');
        
        gamingButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(45deg, #D4AF37, #FF8C42, #D4AF37)';
                this.style.backgroundSize = '200% 200%';
                this.style.animation = 'fireGlow 2s ease infinite';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });

        // GasMan Cinematic Scroll Reveal
        setTimeout(() => {
            const revealElements = document.querySelectorAll('.scroll-reveal, .bento-card, .qa-card');
            
            revealElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
            
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            revealElements.forEach(el => revealObserver.observe(el));
        }, 500); // Slight delay to ensure elements render first
        
        // GasMan Magnetic Buttons
        const magneticElements = document.querySelectorAll('.magnetic-element, .nav-links a, .return-button');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 10;
                el.style.transform = `translate(${x / strength}px, ${y / strength}px) scale(1.05)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
    
    // Gaming project card interactions
    function initializeGamingProjectCards() {
        const projectCards = document.querySelectorAll('.gaming-project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add gaming-specific click effect
                this.style.transform = 'scale(0.98)';
                this.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.4)';
                
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1)';
                    this.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.2)';
                }, 150);
            });
        });
    }
    
    // QA Card hover effects
    function initializeQACards() {
        const qaCards = document.querySelectorAll('.qa-card');
        
        qaCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.qa-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.qa-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.boxShadow = 'none';
                }
            });
        });
    }
    
    // Gaming content card interactions
    function initializeGamingContentCards() {
        const contentCards = document.querySelectorAll('.content-card');
        
        contentCards.forEach(card => {
            const placeholder = card.querySelector('.content-image-placeholder');
            
            card.addEventListener('mouseenter', function() {
                if (placeholder) {
                    placeholder.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(255, 140, 66, 0.3))';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (placeholder) {
                    placeholder.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(255, 140, 66, 0.2))';
                }
            });
        });
    }
    
    // Gaming skills interaction with fire effect
    function initializeGamingSkills() {
        const skillItems = document.querySelectorAll('.gaming-portfolio .skill-item');
        
        skillItems.forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(212, 175, 55, 0.2)';
                this.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                this.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.3)';
            });
            
            skill.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(212, 175, 55, 0.1)';
                this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Gaming navigation enhancement
    function initializeGamingNavigation() {
        const navCards = document.querySelectorAll('.gaming-portfolio .nav-card');
        
        navCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add gaming-specific navigation effect
                this.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(255, 140, 66, 0.1))';
                
                setTimeout(() => {
                    this.style.background = 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(255, 140, 66, 0.05))';
                }, 300);
            });
        });
    }
    
    // Load gaming data and populate content
    function loadGamingData() {
        // Check if gaming data is available
        if (typeof gamingProjects === 'undefined' || typeof gamingSkills === 'undefined' || typeof gamingAchievements === 'undefined') {
            console.error('Gaming data not loaded. Make sure gaming-data.js is included before gaming-scripts.js');
            return;
        }
        
        // Load project data into cards
        populateProjectCards();
        populateQAShowcase();
        populateContentShowcase();
        populateSkillsSection();
        populateAchievements();
    }
    
    // Populate project cards with real data
    function populateProjectCards() {
        const projectsGrid = document.querySelector('#game-development .projects-grid');
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        gamingProjects.development.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Create project card element
    function createProjectCard(project, index) {
        const card = document.createElement('div');
        // If it's the first project (Lunar Loot), make it massive
        const bentoSize = index === 0 ? 'bento-card-large' : 'bento-card-medium';
        card.className = `project-card gaming-project-card bento-card ${bentoSize} scroll-reveal`;
        card.setAttribute('data-project-id', project.id);
        
        const hasImage = project.media && project.media.screenshots && project.media.screenshots.length > 0;
        
        card.innerHTML = `
            ${hasImage 
                ? `<div class="project-image" style="width: 100%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #141416;">
                     <img src="${project.media.screenshots[0]}" alt="${project.title}" style="width: 100%; height: auto; object-fit: cover;">
                   </div>`
                : `<div class="project-image-placeholder">
                     <i class="fas fa-gamepad"></i>
                     <p>${project.engine} Project</p>
                   </div>`
            }
            <div class="project-content">
                <h3 style="font-size: 1.8rem; margin-bottom: 5px;">${project.title}</h3>
                <p style="color: rgba(255,255,255,0.7); font-size: 1.1rem;">${project.description}</p>
                ${(project.media && project.media.videos && project.media.videos.length > 0) ? `
                <div class="project-video" style="margin: 20px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 1px solid rgba(212, 175, 55, 0.2);">
                    <video src="${project.media.videos[0]}" autoplay loop muted playsinline controls style="width: 100%; height: auto; background: #000; display: block;"></video>
                </div>
                ` : ''}
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-status">
                    <span class="status-badge status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <div style="display: flex; gap: 15px; margin-top: 25px;">
                    <button onclick="window.openLunarEmbed('${project.media.playableDemo}', '${project.title}')" class="gaming-button lunar-play-btn magnetic-element" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; padding: 15px;">
                        <i class="fas fa-play"></i> Play In Browser
                    </button>
                    <button class="gaming-button project-details-btn magnetic-element" data-project-id="${project.id}" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; padding: 15px;">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                    <a href="${project.media.playableDemo}" target="_blank" class="gaming-button magnetic-element" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center; width: 60px; border-radius: 8px;">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Populate QA showcase
    function populateQAShowcase() {
        const qaSection = document.getElementById('qa-testing');
        const qaShowcase = document.querySelector('#qa-testing .qa-showcase');
        
        if (!qaShowcase) return;
        
        if (!gamingProjects.testing || gamingProjects.testing.length === 0) {
            if (qaSection) qaSection.style.display = 'none';
            return;
        }
        
        if (qaSection) qaSection.style.display = 'block';
        qaShowcase.innerHTML = '';
        
        gamingProjects.testing.forEach(project => {
            const qaCard = createQACard(project);
            qaShowcase.appendChild(qaCard);
        });
    }
    
    // Create QA card element
    function createQACard(project) {
        const card = document.createElement('div');
        card.className = 'qa-card';
        card.setAttribute('data-project-id', project.id);
        
        card.innerHTML = `
            <div class="qa-icon">
                <i class="fas fa-clipboard-check"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="qa-metrics">
                <span class="metric">${project.metrics.bugsFound} Bugs Found</span>
                <span class="metric">${project.metrics.testCasesExecuted} Test Cases</span>
                <span class="metric">${project.metrics.platforms} Platforms</span>
            </div>
            <button class="qa-details-btn gaming-button" data-project-id="${project.id}">
                <i class="fas fa-search"></i> View Details
            </button>
        `;
        
        return card;
    }
    
    // Populate content showcase
    function populateContentShowcase() {
        const contentSection = document.getElementById('gaming-content');
        const contentShowcase = document.querySelector('#gaming-content .content-showcase');
        
        if (!contentShowcase) return;
        
        if (!gamingProjects.content || gamingProjects.content.length === 0) {
            if (contentSection) contentSection.style.display = 'none';
            return;
        }
        
        if (contentSection) contentSection.style.display = 'block';
        contentShowcase.innerHTML = '';
        
        gamingProjects.content.forEach(project => {
            const contentCard = createContentCard(project);
            contentShowcase.appendChild(contentCard);
        });
    }
    
    // Create content card element
    function createContentCard(project) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.setAttribute('data-project-id', project.id);
        
        card.innerHTML = `
            <div class="content-image-placeholder">
                <i class="fas fa-video"></i>
                <p>${project.type}</p>
            </div>
            <div class="content-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="content-metrics">
                    <span class="metric"><i class="fas fa-eye"></i> ${project.metrics.totalViews || project.metrics.totalHours || project.metrics.monthlyPosts}${project.metrics.totalViews ? '' : project.metrics.totalHours ? ' Hours' : ' Posts'}</span>
                    <span class="metric"><i class="fas fa-users"></i> ${project.metrics.subscribers || project.metrics.followers || project.metrics.discordMembers}</span>
                </div>
                <button class="content-details-btn gaming-button" data-project-id="${project.id}">
                    <i class="fas fa-play"></i> View Details
                </button>
            </div>
        `;
        
        return card;
    }
    
    // Populate skills section with interactive elements
    function populateSkillsSection() {
        const skillsSection = document.querySelector('#gaming-skills .container');
        if (!skillsSection) return;
        
        // Clear existing content except title
        const title = skillsSection.querySelector('.section-title');
        skillsSection.innerHTML = '';
        skillsSection.appendChild(title);
        
        // Add skills categories
        Object.keys(gamingSkills).forEach(category => {
            const categoryDiv = createSkillsCategory(category, gamingSkills[category]);
            skillsSection.appendChild(categoryDiv);
        });
    }
    
    // Create skills category
    function createSkillsCategory(categoryName, categoryData) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skills-category';
        
        const categoryTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        const categoryIcon = categoryName === 'development' ? 'fas fa-code' : 
                           categoryName === 'testing' ? 'fas fa-bug' : 'fas fa-video';
        
        categoryDiv.innerHTML = `
            <h3 class="skills-category-title">
                <i class="${categoryIcon}"></i> ${categoryTitle}
            </h3>
        `;
        
        Object.keys(categoryData).forEach(subcategory => {
            const subcategoryDiv = document.createElement('div');
            subcategoryDiv.className = 'skills-subcategory';
            
            const subcategoryTitle = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
            subcategoryDiv.innerHTML = `<h4 class="skills-subcategory-title">${subcategoryTitle}</h4>`;
            
            const skillsGrid = document.createElement('div');
            skillsGrid.className = 'skills-grid';
            
            categoryData[subcategory].forEach(skill => {
                const skillItem = createSkillItem(skill);
                skillsGrid.appendChild(skillItem);
            });
            
            subcategoryDiv.appendChild(skillsGrid);
            categoryDiv.appendChild(subcategoryDiv);
        });
        
        return categoryDiv;
    }
    
    // Create skill item with level indicator
    function createSkillItem(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item skill-item-detailed';
        skillDiv.setAttribute('data-skill', skill.name);
        skillDiv.setAttribute('data-level', skill.level);
        
        skillDiv.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <div class="skill-level-bar">
                    <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                </div>
                <span class="skill-level-text">${skill.level}%</span>
            </div>
            <div class="skill-experience">${skill.experience} • ${skill.projects} projects</div>
        `;
        
        return skillDiv;
    }
    
    // Populate achievements section
    function populateAchievements() {
        // Create achievements section if it doesn't exist
        let achievementsSection = document.querySelector('#gaming-achievements');
        if (!achievementsSection) {
            achievementsSection = document.createElement('section');
            achievementsSection.id = 'gaming-achievements';
            achievementsSection.className = 'section';
            
            const skillsSection = document.querySelector('#gaming-skills');
            skillsSection.parentNode.insertBefore(achievementsSection, skillsSection.nextSibling);
        }
        
        achievementsSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Gaming Achievements & Certifications</h2>
                <p class="section-description">
                    Recognition and certifications earned through gaming expertise and community contributions.
                </p>
                <div class="achievements-grid">
                    ${gamingAchievements.map(achievement => createAchievementCard(achievement)).join('')}
                </div>
            </div>
        `;
    }
    
    // Create achievement card
    function createAchievementCard(achievement) {
        return `
            <div class="achievement-card" data-achievement-id="${achievement.id}">
                <div class="achievement-icon" style="color: ${achievement.color}">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-content">
                    <h3>${achievement.title}</h3>
                    <p class="achievement-category">${achievement.category} • ${achievement.date}</p>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
            </div>
        `;
    }
    
    // Initialize modal functionality
    function initializeGamingModals() {
        // Create modal container if it doesn't exist
        if (!document.querySelector('.gaming-modal-overlay')) {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'gaming-modal-overlay';
            modalOverlay.innerHTML = `
                <div class="gaming-modal">
                    <div class="gaming-modal-header">
                        <h2 class="gaming-modal-title"></h2>
                        <button class="gaming-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="gaming-modal-content"></div>
                </div>
            `;
            document.body.appendChild(modalOverlay);
        }
        
        // Add event listeners for modal triggers
        document.addEventListener('click', function(e) {
            if (e.target.matches('.project-details-btn') || e.target.closest('.project-details-btn')) {
                const projectId = e.target.getAttribute('data-project-id') || e.target.closest('.project-details-btn').getAttribute('data-project-id');
                showProjectModal(projectId, 'development');
            }
            
            if (e.target.matches('.qa-details-btn') || e.target.closest('.qa-details-btn')) {
                const projectId = e.target.getAttribute('data-project-id') || e.target.closest('.qa-details-btn').getAttribute('data-project-id');
                showProjectModal(projectId, 'testing');
            }
            
            if (e.target.matches('.content-details-btn') || e.target.closest('.content-details-btn')) {
                const projectId = e.target.getAttribute('data-project-id') || e.target.closest('.content-details-btn').getAttribute('data-project-id');
                showProjectModal(projectId, 'content');
            }
            
            if (e.target.matches('.gaming-modal-close') || e.target.matches('.gaming-modal-overlay')) {
                if (e.target === e.currentTarget || e.target.matches('.gaming-modal-close')) {
                    closeGamingModal();
                }
            }
        });
    }
    
    // Show project modal
    function showProjectModal(projectId, category) {
        const project = gamingProjects[category].find(p => p.id === projectId);
        if (!project) return;
        
        const modal = document.querySelector('.gaming-modal');
        const modalTitle = document.querySelector('.gaming-modal-title');
        const modalContent = document.querySelector('.gaming-modal-content');
        
        modalTitle.textContent = project.title;
        modalContent.innerHTML = createModalContent(project, category);
        
        document.querySelector('.gaming-modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Create modal content based on project type
    function createModalContent(project, category) {
        switch (category) {
            case 'development':
                return createDevelopmentModalContent(project);
            case 'testing':
                return createTestingModalContent(project);
            case 'content':
                return createContentModalContent(project);
            default:
                return '<p>Project details not available.</p>';
        }
    }
    
    // Create development project modal content
    function createDevelopmentModalContent(project) {
        return `
            <div class="modal-project-header">
                <div class="project-meta">
                    <span class="project-engine">${project.engine}</span>
                    <span class="project-genre">${project.genre}</span>
                    <span class="status-badge status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <div class="project-timeline">
                    <span><i class="fas fa-clock"></i> ${project.developmentTime}</span>
                    <span><i class="fas fa-user"></i> ${project.teamSize}</span>
                </div>
            </div>
            
            <div class="modal-project-description">
                <h3>Project Overview</h3>
                <p>${project.detailedDescription}</p>
            </div>
            
            <div class="modal-project-features">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-tech">
                <h3>Technologies Used</h3>
                <div class="tech-tags">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-project-challenges">
                <h3>Development Challenges</h3>
                <ul>
                    ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-achievements">
                <h3>Achievements</h3>
                <div class="achievements-list">
                    ${project.achievements.map(achievement => `<span class="achievement-badge">${achievement}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-project-links">
                <h3>Project Links</h3>
                <div class="project-links">
                    ${project.media.playableDemo ? `<a href="${project.media.playableDemo}" target="_blank" class="gaming-button"><i class="fas fa-gamepad"></i> Play Demo</a>` : ''}
                    ${project.media.videos.length > 0 ? `<a href="${project.media.videos[0]}" target="_blank" class="gaming-button"><i class="fas fa-video"></i> Watch Video</a>` : ''}
                </div>
            </div>
        `;
    }
    
    // Create testing project modal content
    function createTestingModalContent(project) {
        return `
            <div class="modal-project-header">
                <div class="project-meta">
                    <span class="project-type">${project.type}</span>
                    <span class="project-platform">${project.platform}</span>
                </div>
                <div class="project-timeline">
                    <span><i class="fas fa-clock"></i> ${project.metrics.testingDuration}</span>
                </div>
            </div>
            
            <div class="modal-project-description">
                <h3>Project Overview</h3>
                <p>${project.detailedDescription}</p>
            </div>
            
            <div class="modal-project-responsibilities">
                <h3>Key Responsibilities</h3>
                <ul>
                    ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-tools">
                <h3>Tools & Technologies</h3>
                <div class="tech-tags">
                    ${project.tools.map(tool => `<span class="tech-tag">${tool}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-project-metrics">
                <h3>Testing Metrics</h3>
                <div class="metrics-grid">
                    <div class="metric-item">
                        <span class="metric-number">${project.metrics.bugsFound}</span>
                        <span class="metric-label">Bugs Found</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-number">${project.metrics.testCasesExecuted}</span>
                        <span class="metric-label">Test Cases</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-number">${project.metrics.platforms}</span>
                        <span class="metric-label">Platforms</span>
                    </div>
                    ${project.metrics.devicesTested ? `
                    <div class="metric-item">
                        <span class="metric-number">${project.metrics.devicesTested}</span>
                        <span class="metric-label">Devices Tested</span>
                    </div>` : ''}
                </div>
            </div>
            
            <div class="modal-project-deliverables">
                <h3>Deliverables</h3>
                <ul>
                    ${project.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-achievements">
                <h3>Key Achievements</h3>
                <div class="achievements-list">
                    ${project.achievements.map(achievement => `<span class="achievement-badge">${achievement}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-project-certifications">
                <h3>Related Certifications</h3>
                <div class="certifications-list">
                    ${project.certifications.map(cert => `<span class="certification-badge">${cert}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Create content project modal content
    function createContentModalContent(project) {
        return `
            <div class="modal-project-header">
                <div class="project-meta">
                    <span class="project-type">${project.type}</span>
                    <span class="project-platform">${project.platform}</span>
                </div>
            </div>
            
            <div class="modal-project-description">
                <h3>Content Overview</h3>
                <p>${project.detailedDescription}</p>
            </div>
            
            <div class="modal-project-content">
                <h3>Content Areas</h3>
                <ul>
                    ${project.content.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-tools">
                <h3>Tools & Platforms</h3>
                <div class="tech-tags">
                    ${project.tools.map(tool => `<span class="tech-tag">${tool}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-project-metrics">
                <h3>Performance Metrics</h3>
                <div class="metrics-grid">
                    ${Object.entries(project.metrics).map(([key, value]) => `
                        <div class="metric-item">
                            <span class="metric-number">${value}</span>
                            <span class="metric-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-project-highlights">
                <h3>Key Highlights</h3>
                <ul>
                    ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-project-achievements">
                <h3>Achievements</h3>
                <div class="achievements-list">
                    ${project.achievements.map(achievement => `<span class="achievement-badge">${achievement}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Close gaming modal
    function closeGamingModal() {
        document.querySelector('.gaming-modal-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Initialize skill connections
    function initializeSkillConnections() {
        const skillItems = document.querySelectorAll('.skill-item-detailed');
        
        skillItems.forEach(skill => {
            skill.addEventListener('click', function() {
                const skillName = this.getAttribute('data-skill');
                showSkillConnections(skillName);
            });
        });
    }
    
    // Show skill connections across projects
    function showSkillConnections(skillName) {
        const connections = findSkillConnections(skillName);
        
        if (connections.length === 0) return;
        
        // Highlight connected projects
        connections.forEach(connection => {
            const projectCard = document.querySelector(`[data-project-id="${connection.projectId}"]`);
            if (projectCard) {
                projectCard.classList.add('skill-connected');
                setTimeout(() => {
                    projectCard.classList.remove('skill-connected');
                }, 3000);
            }
        });
        
        // Show notification
        window.GamingPortfolio.showGamingNotification(`${skillName} is used in ${connections.length} project${connections.length > 1 ? 's' : ''}`);
    }
    
    // Find skill connections across all projects
    function findSkillConnections(skillName) {
        const connections = [];
        
        // Check development projects
        gamingProjects.development.forEach(project => {
            if (project.tech.includes(skillName)) {
                connections.push({
                    projectId: project.id,
                    projectTitle: project.title,
                    category: 'development'
                });
            }
        });
        
        // Check testing projects
        gamingProjects.testing.forEach(project => {
            if (project.tools.includes(skillName)) {
                connections.push({
                    projectId: project.id,
                    projectTitle: project.title,
                    category: 'testing'
                });
            }
        });
        
        // Check content projects
        gamingProjects.content.forEach(project => {
            if (project.tools.includes(skillName)) {
                connections.push({
                    projectId: project.id,
                    projectTitle: project.title,
                    category: 'content'
                });
            }
        });
        
        return connections;
    }
    
    // Initialize achievements display
    function initializeAchievements() {
        // Add click handlers for achievement cards
        document.addEventListener('click', function(e) {
            if (e.target.closest('.achievement-card')) {
                const achievementCard = e.target.closest('.achievement-card');
                const achievementId = achievementCard.getAttribute('data-achievement-id');
                showAchievementDetails(achievementId);
            }
        });
    }
    
    // Show achievement details
    function showAchievementDetails(achievementId) {
        const achievement = gamingAchievements.find(a => a.id === achievementId);
        if (!achievement) return;
        
        window.GamingPortfolio.showGamingNotification(`${achievement.title} - ${achievement.description}`);
    }

    // Initialize all gaming-specific features
    initializeGamingAnimations();
    initializeGamingProjectCards();
    initializeQACards();
    initializeGamingContentCards();
    initializeGamingSkills();
    initializeGamingNavigation();
    
    // Add gaming-specific CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fireGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .gaming-portfolio .hero-stats .hero-stat:hover {
            transform: scale(1.05);
            background: rgba(255, 68, 68, 0.1);
            border-radius: 10px;
            padding: 10px;
            transition: all 0.3s ease;
        }
        
        .gaming-portfolio .tech-tag:hover {
            background: rgba(255, 68, 68, 0.2);
            border-color: rgba(255, 68, 68, 0.4);
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});

// Gaming-specific utility functions
window.GamingPortfolio = {
    // Function to trigger gaming-themed notifications
    showGamingNotification: function(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF4444, #FF8800);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(255, 68, 68, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    // Function to add gaming particle effects (placeholder for future enhancement)
    addParticleEffect: function(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        // Placeholder for particle system
        console.log('Gaming particle effect added to:', element);
    }
};
// Initialize cross-portfolio connections for gaming portfolio
function initializeCrossPortfolioConnections() {
    // Add cross-portfolio connection containers to gaming projects
    const projectSections = document.querySelectorAll('.gaming-project-card, .qa-project-card, .content-project-card');
    
    projectSections.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            if (projectId && typeof crossPortfolioConnections !== 'undefined') {
                // Show cross-portfolio connections for this gaming project
                setTimeout(() => {
                    crossPortfolioConnections.renderConnectionCards('gaming-cross-portfolio-connections', projectId);
                }, 500);
            }
        });
    });
    
    // Track gaming project interactions
    if (typeof portfolioDiscovery !== 'undefined') {
        projectSections.forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project-id');
                const projectType = this.classList.contains('gaming-project-card') ? 'development' : 
                                  this.classList.contains('qa-project-card') ? 'testing' : 'content';
                
                portfolioDiscovery.trackInteraction('project_view', {
                    projectId: projectId,
                    category: 'Gaming',
                    type: projectType,
                    portfolio: 'gaming'
                });
            });
        });
    }
    
    // Add cross-portfolio connections container to gaming portfolio
    const gamingContainer = document.querySelector('.gaming-container') || document.querySelector('.container');
    if (gamingContainer && !document.getElementById('gaming-cross-portfolio-connections')) {
        const connectionsContainer = document.createElement('div');
        connectionsContainer.id = 'gaming-cross-portfolio-connections';
        connectionsContainer.className = 'cross-portfolio-section';
        connectionsContainer.style.display = 'none';
        gamingContainer.appendChild(connectionsContainer);
    }
    
    console.log('🎮 Gaming cross-portfolio connections initialized');
}