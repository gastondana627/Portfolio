// Gaming Portfolio Data Structure - Reset for Lunar Loot

const gamingProjects = {
    development: [
        {
            id: 'lunar-loot',
            title: 'Lunar Loot',
            engine: 'Python / Streamlit',
            genre: 'Interactive / Hand-Tracking',
            status: 'Stable',
            description: 'An interactive game built with advanced hand-tracking movements.',
            detailedDescription: 'Lunar Loot is an innovative interactive experience demonstrating real-time hand-tracking capabilities. Players navigate and interact with the game environment entirely through gesture controls, providing an immersive, controller-free gameplay experience.',
            tech: ['Python', 'Streamlit', 'OpenCV', 'MediaPipe Hand Tracking'],
            features: [
                'Real-time hand tracking and gesture recognition',
                'Controller-free interactive gameplay',
                'Built entirely in Python relying on Streamlit for the web layer',
                'Responsive layout and physics-based interactions'
            ],
            media: {
                screenshots: [
                    '../assets/Lunar_Loot/Lunar_Loot_Logo copy.png'
                ],
                videos: [
                    '../assets/Lunar_Loot/Lunar_Loot_v1_3_25-2.mp4'
                ],
                playableDemo: 'https://lunar-loot.streamlit.app'
            },
            achievements: ['Stable Release', 'Innovative Input Implementation'],
            developmentTime: 'Completed',
            teamSize: 'Solo Developer',
            challenges: [
                'Calibrating strict real-time hand tracking parameters',
                'Optimizing a low-latency video feed stream via Streamlit',
                'Designing intuitive gesture mappings for general users'
            ],
            currentProgress: '100% - Fully Stable Game'
        }
    ],
    testing: [],
    content: []
};

// Clear out old gaming skills but retain structure so iteration doesn't crash on front-end
const gamingSkills = {
    development: [
        { name: 'Python', level: 95, experience: '3 Years', projects: 5 },
        { name: 'Streamlit', level: 90, experience: '2 Years', projects: 3 },
        { name: 'Computer Vision', level: 85, experience: '2 Years', projects: 2 }
    ],
    testing: [],
    content: []
};

// Clear achievements
const gamingAchievements = [];

// Expose to window explicitly just in case modules interact differently
if (typeof window !== 'undefined') {
    window.gamingProjects = gamingProjects;
    window.gamingSkills = gamingSkills;
    window.gamingAchievements = gamingAchievements;
}