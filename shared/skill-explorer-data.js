// Centralized Skill Explorer Data Registry
// Flat structure — one column per domain, each with its own projects list.
// No nested sub-categories. Each column routes to its own portfolio.

const SkillExplorerData = {
    'Game Development': {
        description: 'Creating immersive game experiences',
        icon: 'fas fa-gamepad',
        route: '/gaming/',
        projects: [
            {
                title: 'Lunar Loot',
                type: 'game',
                link: '/gaming/',
                image: '../assets/Lunar_Loot/Lunar_Loot_Logo copy.png'
            },
            {
                title: 'Project Stargate',
                type: 'project',
                link: '/gaming/',
                image: '../assets/Stargate1.jpg'
            }
        ]
    },
    'Creative Content': {
        description: 'Visual storytelling, video production, and creative AI',
        icon: 'fas fa-video',
        route: '/content/',
        projects: [
            {
                title: 'Prompt of the Month',
                type: 'video',
                link: '/content/',
                image: '../assets/Gen Image to 3D Construct Showcase 1.png'
            },
            {
                title: 'Vitrine Steganos Podcast',
                type: 'video',
                link: '/content/',
                image: '../assets/Thumbnail Google DM_OpenAI Dual Event.jpeg'
            }
        ]
    },
    'AI & Engineering': {
        description: 'Machine learning, full-stack dev, and tool creation',
        icon: 'fas fa-brain',
        route: '/#graph-container',
        projects: [
            {
                title: 'AI Room Designer',
                type: 'project',
                link: '#graph-container',
                image: '../assets/ai-room-designer-promo.jpg'
            },
            {
                title: 'Relic / Peata',
                type: 'project',
                link: '#graph-container',
                image: '../assets/Peata Intro Promo.png'
            }
        ]
    }
};

// Make available globally if in browser
if (typeof window !== 'undefined') {
    window.SkillExplorerData = SkillExplorerData;
}
