// Cross-Portfolio Integration System
// Intelligent project connections and portfolio discovery features

class CrossPortfolioConnections {
    constructor() {
        this.connections = this.initializeConnections();
        this.currentPortfolio = this.detectCurrentPortfolio();
        this.init();
    }

    detectCurrentPortfolio() {
        const path = window.location.pathname;
        if (path.includes('/gaming')) return 'gaming';
        if (path.includes('/content')) return 'content';
        return 'tech';
    }

    initializeConnections() {
        return {
            // Tech projects with gaming connections
            'stargate': {
                type: 'tech-to-gaming',
                gamingConnections: [
                    {
                        id: 'unity-space-explorer',
                        reason: 'Both involve game development and interactive experiences',
                        connectionType: 'technical-overlap'
                    }
                ],
                contentConnections: []
            },
            'ai-room-designer': {
                type: 'tech-to-content',
                gamingConnections: [],
                contentConnections: [
                    {
                        id: 'video-001',
                        reason: 'AI Innovation Showcase features similar AI-powered solutions',
                        connectionType: 'technical-showcase'
                    }
                ]
            },
            'relic': {
                type: 'tech-to-content',
                gamingConnections: [],
                contentConnections: [
                    {
                        id: 'video-001',
                        reason: 'Both showcase AI/ML technical capabilities',
                        connectionType: 'technical-demonstration'
                    }
                ]
            },
            'peata': {
                type: 'tech-to-content',
                gamingConnections: [],
                contentConnections: [
                    {
                        id: 'video-001',
                        reason: 'AI-powered solutions with user-focused design',
                        connectionType: 'ai-application'
                    }
                ]
            },

            // Gaming projects with tech connections
            'unity-space-explorer': {
                type: 'gaming-to-tech',
                techConnections: [
                    {
                        id: 'stargate',
                        reason: 'Both involve interactive digital experiences and game development',
                        connectionType: 'development-overlap'
                    },
                    {
                        id: 'nasa_kg',
                        reason: 'Space exploration theme connects with NASA research projects',
                        connectionType: 'thematic-connection'
                    }
                ],
                contentConnections: [
                    {
                        id: 'gaming-tutorial-series',
                        reason: 'Unity development tutorials showcase similar techniques',
                        connectionType: 'educational-content'
                    }
                ]
            },
            'cyberpunk-runner': {
                type: 'gaming-to-content',
                techConnections: [],
                contentConnections: [
                    {
                        id: 'gaming-tutorial-series',
                        reason: 'Unreal Engine development showcased in tutorials',
                        connectionType: 'technical-education'
                    },
                    {
                        id: 'gaming-livestreams',
                        reason: 'Game development process featured in live streams',
                        connectionType: 'development-showcase'
                    }
                ]
            },

            // Content projects with tech/gaming connections
            'video-001': {
                type: 'content-to-tech',
                techConnections: [
                    {
                        id: 'ai-room-designer',
                        reason: 'Both showcase AI innovation and technical capabilities',
                        connectionType: 'ai-showcase'
                    },
                    {
                        id: 'relic',
                        reason: 'AI/ML technical demonstrations',
                        connectionType: 'technical-overlap'
                    }
                ],
                gamingConnections: []
            },
            'gaming-tutorial-series': {
                type: 'content-to-gaming',
                techConnections: [
                    {
                        id: 'stargate',
                        reason: 'Game development techniques and interactive experiences',
                        connectionType: 'development-education'
                    }
                ],
                gamingConnections: [
                    {
                        id: 'unity-space-explorer',
                        reason: 'Unity development techniques demonstrated',
                        connectionType: 'educational-showcase'
                    },
                    {
                        id: 'quantum-shift',
                        reason: 'Game development tutorials cover similar mechanics',
                        connectionType: 'technical-education'
                    }
                ]
            }
        };
    }

    // Get connections for a specific project
    getProjectConnections(projectId) {
        return this.connections[projectId] || { techConnections: [], gamingConnections: [], contentConnections: [] };
    }

    // Get all projects that connect to a specific portfolio
    getPortfolioConnections(targetPortfolio) {
        const connections = [];
        
        Object.entries(this.connections).forEach(([projectId, projectConnections]) => {
            const relevantConnections = projectConnections[`${targetPortfolio}Connections`] || [];
            if (relevantConnections.length > 0) {
                connections.push({
                    sourceProject: projectId,
                    connections: relevantConnections
                });
            }
        });
        
        return connections;
    }

    // Create contextual navigation suggestions
    createNavigationSuggestions(currentProjectId) {
        const connections = this.getProjectConnections(currentProjectId);
        const suggestions = [];

        // Add gaming suggestions
        if (connections.gamingConnections && connections.gamingConnections.length > 0) {
            suggestions.push({
                portfolio: 'gaming',
                title: 'Explore Gaming Work',
                description: 'See related game development and gaming content',
                connections: connections.gamingConnections,
                url: '/gaming/',
                gradient: 'linear-gradient(135deg, #FF4444, #FF8800, #FFDD00)',
                icon: 'fas fa-gamepad'
            });
        }

        // Add content suggestions
        if (connections.contentConnections && connections.contentConnections.length > 0) {
            suggestions.push({
                portfolio: 'content',
                title: 'View Content Creation',
                description: 'Discover related creative and content work',
                connections: connections.contentConnections,
                url: '/content/',
                gradient: 'linear-gradient(135deg, #2C2C2C, #808080, #E8E8E8)',
                icon: 'fas fa-video'
            });
        }

        // Add tech suggestions (when viewing gaming/content)
        if (connections.techConnections && connections.techConnections.length > 0) {
            suggestions.push({
                portfolio: 'tech',
                title: 'See Technical Work',
                description: 'Explore related AI/ML and development projects',
                connections: connections.techConnections,
                url: '/',
                gradient: 'linear-gradient(135deg, #D4AF37, #FF8C42)',
                icon: 'fas fa-code'
            });
        }

        return suggestions;
    }

    // Render cross-portfolio connection cards
    renderConnectionCards(containerId, projectId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const suggestions = this.createNavigationSuggestions(projectId);
        
        if (suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = `
            <div class="cross-portfolio-connections">
                <h3 class="connections-title">Related Work</h3>
                <div class="connections-grid">
                    ${suggestions.map(suggestion => `
                        <div class="connection-card" data-portfolio="${suggestion.portfolio}">
                            <div class="connection-header" style="background: ${suggestion.gradient}">
                                <i class="${suggestion.icon}"></i>
                                <span>${suggestion.title}</span>
                            </div>
                            <div class="connection-content">
                                <p class="connection-description">${suggestion.description}</p>
                                <div class="connection-items">
                                    ${suggestion.connections.slice(0, 2).map(conn => `
                                        <div class="connection-item">
                                            <span class="connection-reason">${conn.reason}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <button class="connection-button" onclick="crossPortfolioConnections.navigateToPortfolio('${suggestion.portfolio}')">
                                    Explore ${suggestion.portfolio === 'tech' ? 'Tech Portfolio' : suggestion.title}
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.style.display = 'block';
        this.addConnectionStyles();
    }

    // Navigate to related portfolio
    navigateToPortfolio(portfolioType) {
        const urls = {
            'tech': '/',
            'gaming': '/gaming/',
            'content': '/content/'
        };

        const targetUrl = urls[portfolioType];
        if (targetUrl) {
            // Add transition effect if available
            if (typeof showPortfolioTransition === 'function') {
                showPortfolioTransition(portfolioType);
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 1000);
            } else {
                window.location.href = targetUrl;
            }
        }
    }

    // Add CSS styles for connection cards
    addConnectionStyles() {
        if (document.getElementById('cross-portfolio-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'cross-portfolio-styles';
        styles.textContent = `
            .cross-portfolio-connections {
                margin: 2rem 0;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .connections-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                color: var(--text-primary, #ffffff);
                text-align: center;
            }

            .connections-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            }

            .connection-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .connection-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                border-color: rgba(255, 255, 255, 0.2);
            }

            .connection-header {
                padding: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 600;
                color: white;
            }

            .connection-header i {
                font-size: 1.2rem;
            }

            .connection-content {
                padding: 1.5rem;
            }

            .connection-description {
                color: var(--text-secondary, #cccccc);
                margin-bottom: 1rem;
                font-size: 0.9rem;
                line-height: 1.5;
            }

            .connection-items {
                margin-bottom: 1.5rem;
            }

            .connection-item {
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .connection-item:last-child {
                border-bottom: none;
            }

            .connection-reason {
                font-size: 0.85rem;
                color: var(--text-secondary, #cccccc);
                font-style: italic;
            }

            .connection-button {
                width: 100%;
                padding: 0.75rem 1rem;
                background: linear-gradient(135deg, #D4AF37, #FF8C42);
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .connection-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
            }

            .connection-button i {
                transition: transform 0.3s ease;
            }

            .connection-button:hover i {
                transform: translateX(3px);
            }

            @media (max-width: 768px) {
                .cross-portfolio-connections {
                    padding: 1rem;
                    margin: 1rem 0;
                }

                .connections-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .connection-content {
                    padding: 1rem;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Initialize cross-portfolio features
    init() {
        // Add connection cards to project modals/details
        this.enhanceProjectDisplays();
        
        // Add portfolio navigation hints
        this.addNavigationHints();
        
        console.log('🔗 Cross-Portfolio Connections initialized for:', this.currentPortfolio);
    }

    // Enhance existing project displays with connection information
    enhanceProjectDisplays() {
        // This will be called by individual portfolio scripts
        // to add connection cards to their project displays
    }

    // Add subtle navigation hints throughout the portfolio
    addNavigationHints() {
        // Add contextual hints based on current portfolio and viewed content
        if (this.currentPortfolio === 'tech') {
            this.addTechPortfolioHints();
        } else if (this.currentPortfolio === 'gaming') {
            this.addGamingPortfolioHints();
        } else if (this.currentPortfolio === 'content') {
            this.addContentPortfolioHints();
        }
    }

    addTechPortfolioHints() {
        // Add hints in tech portfolio pointing to gaming/content work
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            // Add gaming/content skill connections
            this.enhanceSkillsWithConnections();
        }
    }

    addGamingPortfolioHints() {
        // Add hints in gaming portfolio pointing to tech work
        const projectsSection = document.querySelector('.gaming-projects');
        if (projectsSection) {
            // Add tech connections to gaming projects
            this.enhanceGamingProjectsWithConnections();
        }
    }

    addContentPortfolioHints() {
        // Add hints in content portfolio pointing to tech/gaming work
        const portfolioSection = document.querySelector('.content-projects');
        if (portfolioSection) {
            // Add tech/gaming connections to content projects
            this.enhanceContentProjectsWithConnections();
        }
    }

    enhanceSkillsWithConnections() {
        // Add portfolio links to relevant skills
        const skillCards = document.querySelectorAll('.skill-card, .skill');
        
        skillCards.forEach(card => {
            const skillName = card.textContent.toLowerCase();
            
            // Gaming-related skills
            if (skillName.includes('unity') || skillName.includes('game') || skillName.includes('unreal')) {
                this.addSkillPortfolioLink(card, 'gaming', 'See Gaming Work');
            }
            
            // Content-related skills
            if (skillName.includes('video') || skillName.includes('design') || skillName.includes('content')) {
                this.addSkillPortfolioLink(card, 'content', 'View Creative Work');
            }
        });
    }

    addSkillPortfolioLink(skillElement, portfolioType, linkText) {
        if (skillElement.querySelector('.skill-portfolio-link')) return; // Already enhanced
        
        const link = document.createElement('div');
        link.className = 'skill-portfolio-link';
        link.innerHTML = `<i class="fas fa-external-link-alt"></i> ${linkText}`;
        link.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.navigateToPortfolio(portfolioType);
        };
        
        skillElement.appendChild(link);
        skillElement.classList.add('skill-enhanced');
        skillElement.setAttribute('data-portfolio-link', portfolioType);
    }

    enhanceGamingProjectsWithConnections() {
        // This will be implemented by the gaming portfolio script
    }

    enhanceContentProjectsWithConnections() {
        // This will be implemented by the content portfolio script
    }
}

// Initialize cross-portfolio connections
let crossPortfolioConnections;

document.addEventListener('DOMContentLoaded', () => {
    crossPortfolioConnections = new CrossPortfolioConnections();
});

// Make available globally
window.CrossPortfolioConnections = CrossPortfolioConnections;
window.crossPortfolioConnections = crossPortfolioConnections;