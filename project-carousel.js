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
        ]
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
        ]
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
        ]
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
        ]
    }
];

let currentProjectIndex = 0;
let autoRotateInterval;

function getCategoryColor(category) {
    const colors = {
        'AI Projects': 'linear-gradient(135deg, #8309D5, #09C1D5)',
        'Gaming': 'linear-gradient(135deg, #09C1D5, #8309D5)',
        'Ethical Hacking': 'linear-gradient(135deg, #A855F7, #8309D5)'
    };
    return colors[category] || colors['AI Projects'];
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
                <div class="project-carousel-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" class="button" target="_blank" rel="noopener noreferrer">
                            <i class="${link.icon}"></i> ${link.label}
                        </a>
                    `).join('')}
                </div>
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

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
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
    });
    
    // Start auto-rotate
    autoRotateInterval = setInterval(nextProject, 5000);
    
    // Pause on hover
    const card = document.getElementById('featured-project-card');
    card.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    card.addEventListener('mouseleave', resetAutoRotate);
    
    // Update total projects count
    document.getElementById('total-projects').textContent = featuredProjects.length;
});
