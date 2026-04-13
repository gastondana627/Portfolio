// Centralized Skill Explorer Data Registry
// Defines the cross-portfolio capabilities and related projects with rich media

const SkillExplorerData = {
    'Game Development': {
        description: 'Creating immersive game experiences',
        icon: 'fas fa-gamepad',
        gaming: [
            {
                title: 'Lunar Loot',
                type: 'game',
                link: 'https://lunar-loot.streamlit.app',
                image: '/assets/Lunar_Loot/Lunar_Loot_Logo copy.png',
                externalLink: 'https://lunar-loot.streamlit.app'
            },
            {
                title: 'Procedural RPG Framework',
                type: 'game',
                link: '/gaming/#unity-rpg-procedural',
                image: '/assets/SESA_1.png'
            }
        ],
        content: [
            {
                title: 'Live Game Development Sessions',
                type: 'video',
                link: '/content/#live-development-streams',
                image: '/assets/The Hero Shot.png'
            }
        ],
        tech: [
            {
                title: 'Project Stargate',
                type: 'project',
                link: '/#project-stargate',
                image: '/assets/Stargate1.jpg'
            }
        ]
    },
    'Creative Content': {
        description: 'Visual storytelling, video production, and creative AI',
        icon: 'fas fa-video',
        gaming: [
            {
                title: 'Indie Game Showcase',
                type: 'video',
                link: '/gaming/#indie-game-showcase',
                image: '/assets/Space Meditation.jpg'
            }
        ],
        content: [
            {
                title: 'Prompt of the Month',
                type: 'video',
                link: '/content/#prompt-of-the-month',
                image: '/assets/Gen Image to 3D Construct Showcase 1.png'
            },
            {
                title: 'Advanced Unity Tutorial Series',
                type: 'video',
                link: '/content/#unity-advanced-tutorials',
                image: '/assets/Image 2-2-25 at 9.19 PM.jpg'
            }
        ],
        tech: [
            {
                title: 'AI Room Designer',
                type: 'project',
                link: '/#ai-room-designer',
                image: '/assets/ai-room-designer-promo.jpg'
            }
        ]
    },
    'AI & Engineering': {
        description: 'Machine learning, full-stack dev, and tool creation',
        icon: 'fas fa-brain',
        gaming: [
            {
                title: 'Collaborative Builder Prototype',
                type: 'game',
                link: '/gaming/#unity-multiplayer-prototype',
                image: '/assets/Untitled-15.png'
            }
        ],
        content: [
            {
                title: 'Vitrine Steganos Podcast',
                type: 'video',
                link: '/content/#vitrine-steganos',
                image: '/assets/Thumbnail Google DM_OpenAI Dual Event.jpeg'
            }
        ],
        tech: [
            {
                title: 'Relic / Peata',
                type: 'project',
                link: '/#ai-projects',
                image: '/assets/Peata Intro Promo.png'
            }
        ]
    }
};

// Make available globally if in browser
if (typeof window !== 'undefined') {
    window.SkillExplorerData = SkillExplorerData;
}
