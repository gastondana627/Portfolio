// Project Carousel with Graph Integration

const featuredProjects = [
    {
        id: "relic",
        title: "Relic - AI Archaeological Research",
        category: "AI Projects",
        description: "RAG-backed AI research assistant combining SRTM, Sentinel-2, and Google Earth data for archaeological field studies. Featured in OpenAI's O1 Challenge.",
        tech: ["Python", "RAG", "OpenAI", "Geospatial Analysis"],
        image: "assets/Relic_Logo_1 copy.jpg",
        links: [
            { url: "https://github.com/gastondana627/Team-Relic-Xingu-Challenge", label: "GitHub", icon: "fab fa-github" },
            { url: "https://relic-openai-to-z-challenge.tech", label: "Live Demo", icon: "fas fa-external-link-alt" }
        ],
        crossPortfolioTags: ["ai", "research"],
        relatedWork: {
            content: "Watch technical deep-dives and AI research presentations",
            gaming: "See how geospatial data enhances game world building"
        }
    },
    {
        id: "peata",
        title: "Peata - AI Pet Reunification",
        category: "AI Projects",
        description: "Character-driven virtual assistant using RAG and image-matching to help reunite lost pets with their families. Combines empathy with technical precision.",
        tech: ["Python", "RAG", "Computer Vision", "Streamlit"],
        image: "assets/Peata Intro Promo.png",
        links: [
            { url: "https://github.com/gastondana627/Peata", label: "GitHub", icon: "fab fa-github" },
            { url: "https://peata-sao.streamlit.app", label: "Live Demo", icon: "fas fa-external-link-alt" }
        ],
        crossPortfolioTags: ["ai", "social-impact"],
        relatedWork: {
            content: "See how I create empathetic AI storytelling and user experience content",
            gaming: "Explore character-driven game development and AI NPCs"
        }
    },
    {
        id: "nasa_kg",
        title: "NASA Knowledge Graph",
        category: "AI Projects",
        description: "Mapped biological and omics data into Neo4j for contextual health reasoning, supporting astronaut health research and space medicine applications.",
        tech: ["Neo4j", "Python", "Graph Databases", "Bioinformatics"],
        image: "assets/Space For Health Challenge.png",
        links: [
            { url: "https://github.com/gastondana627/spoke_genelab", label: "GitHub", icon: "fab fa-github" },
            { url: "https://www.linkedin.com/posts/gaston-d-859653184_spoke-nasa-team60-activity-7325938069293977601-T3ck", label: "Case Study", icon: "fas fa-info-circle" }
        ],
        crossPortfolioTags: ["ai", "research", "space"],
        relatedWork: {
            content: "Watch space technology presentations and research documentation",
            gaming: "See space-themed game development and simulation projects"
        }
    },
    {
        id: "stargate",
        title: "Project Stargate and Bobot",
        category: "Gaming",
        description: "Interactive digital personas for gaming mentorship and coaching, enhancing player development through AI-powered guidance and feedback systems.",
        tech: ["Python", "AI Personas", "Streamlit", "Game Design"],
        image: "assets/Stargate1.jpg",
        links: [
            { url: "https://github.com/gastondana627/Stargate-and-Bobot", label: "GitHub", icon: "fab fa-github" },
            { url: "https://moonrock-stargate-and-bobot-game.streamlit.app", label: "Play Game", icon: "fas fa-gamepad" }
        ],
        crossPortfolioTags: ["gaming", "ai"],
        relatedWork: {
            gaming: "Explore more game development projects in my Gaming Ecosystem",
            content: "See how I create gaming content and tutorials"
        }
    },
    {
        id: "planetrics",
        title: "Planetrics - NASA Exoplanet Dashboard",
        category: "AI Projects",
        description: "Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog. Built with Plotly Studio, featuring live data from NASA Exoplanet Archive API, discovery trends, and curated milestone content.",
        tech: ["Python", "Plotly", "Pandas", "NASA API", "Data Visualization"],
        image: "assets/planetrics-dashboard.jpg",
        links: [
            { url: "https://www.linkedin.com/posts/gaston-d-859653184_plotly-python-datascience-activity-7380386160432500736-P6OA?utm_source=share&utm_medium=member_desktop&rcm=ACoAACuFtgUBVdf9kFE9Wlxn2qi6FBP2M0VX6Ds", label: "Video Demo", icon: "fas fa-video" },
            { url: "https://docs.google.com/document/d/1234", label: "Documentation", icon: "fas fa-file-alt" }
        ],
        crossPortfolioTags: ["data-viz", "space", "interactive"],
        relatedWork: {
            content: "See data visualization tutorials and interactive content creation",
            gaming: "Explore space exploration games and procedural universe generation"
        }
    },
    {
        id: "ai-room-designer",
        title: "AI Room Designer - Rooms Through Time",
        category: "AI Projects",
        description: "Multi-modal AI interior design platform with dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Features Gemini 2.5 Flash for redesign, Fal.ai for 3D reconstruction, ElevenLabs voice narration, and local gpt-oss agent for offline AI consultation.",
        tech: ["React", "Python", "FastAPI", "Gemini 2.5", "Fal.ai", "ElevenLabs", "TypeScript", "Tailwind CSS"],
        image: "assets/ai-room-designer-promo.jpg",
        links: [
            { url: "https://rooms-through-time-production.up.railway.app", label: "Live Demo (Railway)", icon: "fas fa-external-link-alt" },
            { url: "https://rooms-through-time.vercel.app", label: "Live Demo (Vercel)", icon: "fas fa-external-link-alt" },
            { url: "https://github.com/gastondana627/Rooms-Through-Time", label: "GitHub", icon: "fab fa-github" },
            { url: "https://youtu.be/Gh2-ltEzjr0?si=J3W58BHmcdWNWA5k", label: "Demo Video", icon: "fab fa-youtube" }
        ],
        crossPortfolioTags: ["ai", "content"],
        relatedWork: {
            content: "See how I create AI innovation showcases and technical content",
            gaming: "Discover how AI enhances game development workflows"
        }
    }
];

let currentProjectIndex = 0;
let autoRotateInterval;

function getCategoryColor(category) {
    const colors = {
        'AI Projects': 'linear-gradient(135deg, #D4AF37, #FF8C42)',
        'Gaming': 'linear-gradient(135deg, #FF8C42, #D4AF37)',
        'Ethical Hacking': 'linear-gradient(135deg, #D4AF37, #FF8C42)'
    };
    return colors[category] || colors['AI Projects'];
}

function renderCrossPortfolioTags(tags) {
    if (!tags || tags.length === 0) return '';
    
    const tagColors = {
        'ai': '#D4AF37',
        'gaming': '#FF8C42',
        'content': '#B8860B',
        'research': '#E67E22',
        'space': '#DAA520',
        'social-impact': '#10B981',
        'data-viz': '#F59E0B',
        'interactive': '#D4AF37'
    };
    
    return `
        <div class="cross-portfolio-tags">
            ${tags.map(tag => `
                <span class="cross-portfolio-tag" style="background-color: ${tagColors[tag] || '#666'}">
                    ${tag.replace('-', ' ')}
                </span>
            `).join('')}
        </div>
    `;
}

function renderRelatedWork(relatedWork) {
    if (!relatedWork || Object.keys(relatedWork).length === 0) return '';
    
    const portfolioConfig = {
        gaming: {
            gradient: 'linear-gradient(135deg, #D4AF37, #FF8C42, #E67E22)',
            icon: 'fas fa-gamepad',
            title: 'Gaming Ecosystem'
        },
        content: {
            gradient: 'linear-gradient(135deg, #141416, #D4AF37, #FF8C42)',
            icon: 'fas fa-video',
            title: 'Content Creation'
        },
        tech: {
            gradient: 'linear-gradient(135deg, #D4AF37, #FF8C42)',
            icon: 'fas fa-code',
            title: 'Tech Portfolio'
        }
    };
    
    return `
        <div class="related-work-section">
            <h4 class="related-work-title">See Related Work</h4>
            <div class="related-work-cards">
                ${Object.entries(relatedWork).map(([portfolio, description]) => {
                    const config = portfolioConfig[portfolio];
                    if (!config) return '';
                    
                    return `
                        <div class="related-work-card" data-portfolio="${portfolio}">
                            <div class="related-work-header" style="background: ${config.gradient}">
                                <i class="${config.icon}"></i>
                                <span>${config.title}</span>
                            </div>
                            <p class="related-work-description">${description}</p>
                            <button class="related-work-button" onclick="navigateToRelatedPortfolio('${portfolio}')">
                                Explore ${config.title} <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderProject(index) {
    const project = featuredProjects[index];
    const card = document.getElementById('featured-project-card');
    
    // Fade out
    card.classList.add('fade-out');
    
    setTimeout(() => {
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-carousel-image">
            <div class="project-carousel-content">
                <div class="project-carousel-badge" style="background: ${getCategoryColor(project.category)}">
                    ${project.category}
                </div>
                <h3 class="project-carousel-title">${project.title}</h3>
                <p class="project-carousel-description">${project.description}</p>
                <div class="project-carousel-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.crossPortfolioTags ? renderCrossPortfolioTags(project.crossPortfolioTags) : ''}
                <div class="project-carousel-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" class="button" target="_blank" rel="noopener noreferrer">
                            <i class="${link.icon}"></i> ${link.label}
                        </a>
                    `).join('')}
                </div>
                ${project.relatedWork ? renderRelatedWork(project.relatedWork) : ''}
            </div>
        `;
        
        // Fade in
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
        
        // Update dots
        updateDots();
    }, 300);
}

function updateDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = featuredProjects.map((_, index) => 
        `<div class="carousel-dot ${index === currentProjectIndex ? 'active' : ''}" data-index="${index}"></div>`
    ).join('');
    
    // Add click handlers to dots
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentProjectIndex = parseInt(dot.dataset.index);
            renderProject(currentProjectIndex);
            resetAutoRotate();
        });
    });
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % featuredProjects.length;
    renderProject(currentProjectIndex);
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + featuredProjects.length) % featuredProjects.length;
    renderProject(currentProjectIndex);
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(nextProject, 5000); // Auto-rotate every 5 seconds
}

// Function to update carousel when a node is clicked in the graph
window.updateCarouselToProject = function(projectId) {
    console.log('🎠 Updating carousel to project:', projectId);
    const index = featuredProjects.findIndex(p => p.id === projectId);
    
    if (index !== -1) {
        currentProjectIndex = index;
        renderProject(currentProjectIndex);
        resetAutoRotate();
        
        // Scroll carousel into view
        setTimeout(() => {
            document.getElementById('featured-project-card').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 500);
    } else {
        console.log('⚠️ Project not in featured carousel:', projectId);
    }
};

// Navigate to related portfolio
function navigateToRelatedPortfolio(portfolioType) {
    const urls = {
        'tech': '/',
        'gaming': '/gaming/',
        'content': '/content/'
    };
    
    const targetUrl = urls[portfolioType];
    if (targetUrl) {
        // Use existing navigation system if available
        if (typeof navigateToPortfolio === 'function') {
            navigateToPortfolio(portfolioType);
        } else if (typeof showPortfolioTransition === 'function') {
            showPortfolioTransition(portfolioType);
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        } else {
            window.location.href = targetUrl;
        }
    }
}

// Add CSS styles for related work cards
function addRelatedWorkStyles() {
    if (document.getElementById('related-work-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'related-work-styles';
    styles.textContent = `
        .cross-portfolio-tags {
            margin: 1rem 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .cross-portfolio-tag {
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.9;
        }
        
        .related-work-section {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .related-work-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .related-work-cards {
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }
        
        .related-work-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            flex: 1;
        }
        
        .related-work-card:hover {
            transform: translateY(-2px);
            border-color: rgba(212, 175, 55, 0.4);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .related-work-header {
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            color: white;
            font-size: 0.9rem;
        }
        
        .related-work-header i {
            font-size: 1rem;
        }
        
        .related-work-description {
            padding: 1rem;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.85rem;
            line-height: 1.4;
            margin: 0;
        }
        
        .related-work-button {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(135deg, #D4AF37, #FF8C42);
            color: white;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.85rem;
        }
        
        .related-work-button:hover {
            background: linear-gradient(135deg, #FF8C42, #D4AF37);
            transform: translateY(-1px);
        }
        
        .related-work-button i {
            transition: transform 0.3s ease;
        }
        
        .related-work-button:hover i {
            transform: translateX(3px);
        }
        
        @media (max-width: 768px) {
            .related-work-cards {
                flex-direction: column;
            }
            
            .related-work-section {
                margin-top: 1.5rem;
                padding-top: 1rem;
            }
            
            .related-work-description {
                padding: 0.75rem;
                font-size: 0.8rem;
            }
            
            .related-work-button {
                padding: 0.6rem;
                font-size: 0.8rem;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    addRelatedWorkStyles();
    renderProject(currentProjectIndex);
    
    // Control buttons
    document.getElementById('next-project').addEventListener('click', () => {
        nextProject();
        resetAutoRotate();
    });
    
    document.getElementById('prev-project').addEventListener('click', () => {
        prevProject();
        resetAutoRotate();
    });
    
    // Click card to zoom to node in graph
    document.getElementById('featured-project-card').addEventListener('click', (e) => {
        // Don't trigger if clicking a link
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        
        const project = featuredProjects[currentProjectIndex];
        console.log('🎯 Zooming to project:', project.id);
        
        // Call graph function to zoom to this node
        if (typeof zoomToProjectNode === 'function') {
            zoomToProjectNode(project.id);
        }
        
        // Show cross-portfolio connections for this project
        if (typeof crossPortfolioConnections !== 'undefined') {
            crossPortfolioConnections.renderConnectionCards('cross-portfolio-connections', project.id);
        }
    });
    
    // Start auto-rotate
    autoRotateInterval = setInterval(nextProject, 5000);
    
    // Pause on hover
    const card = document.getElementById('featured-project-card');
    card.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    card.addEventListener('mouseleave', resetAutoRotate);
    
    // Update total projects count
    document.getElementById('total-projects').textContent = featuredProjects.length;
    
    // Initialize discovery features after a short delay
    setTimeout(() => {
        if (typeof portfolioDiscovery !== 'undefined') {
            // Render portfolio quiz
            portfolioDiscovery.renderPortfolioQuiz('portfolio-quiz-container');
            
            // Render skill explorer
            portfolioDiscovery.renderSkillExplorer('skill-explorer-container');
            
            // Render professional journey
            portfolioDiscovery.renderProfessionalJourney('professional-journey-container');
            
            // Track project view
            portfolioDiscovery.trackInteraction('project_view', {
                projectId: featuredProjects[currentProjectIndex].id,
                category: featuredProjects[currentProjectIndex].category,
                tech: featuredProjects[currentProjectIndex].tech
            });
        }
    }, 1000);
});
