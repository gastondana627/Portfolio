(function() {
  const data = {
    // Current Status and Recent Work
    currentStatus: {
        recentProject: {
            title: "AI Room Designer - Rooms Through Time",
            company: "Personal Portfolio Project",
            type: "Technical Showcase Video & UI Design",
            status: "Published & Live",
            completionDate: "January 2025",
            description: "Comprehensive video walkthrough and interface design for AI-powered interior design application featuring Gemini 2.5 Flash integration"
        },
        currentFocus: [
            "AI-powered content creation and technical demonstrations",
            "Educational video content for developer community", 
            "Data visualization and interactive dashboard design",
            "Multi-modal AI application showcases and tutorials"
        ],
        upcomingProjects: [
            {
                title: "Advanced Unity Tutorial Series",
                type: "Educational Content Production",
                timeline: "Q1 2025",
                scope: "Advanced game development techniques and procedural generation"
            },
            {
                title: "NASA Data Visualization Expansion",
                type: "Technical Documentation & Design",
                timeline: "Q2 2025", 
                scope: "Extended space data visualization projects and educational content"
            },
            {
                title: "Multi-Agent AI System Showcase",
                type: "Technical Video Series",
                timeline: "Q2 2025",
                scope: "Comprehensive documentation of advanced AI system development"
            }
        ]
    },

    // Video Production Projects
    videoProjects: [
        {
            id: "video-001",
            title: "AI Room Designer - Rooms Through Time",
            type: "Technical Showcase Video",
            client: "Personal Project / Portfolio",
            status: "Published",
            duration: "4:15",
            description: "Comprehensive video walkthrough showcasing the AI Room Designer's dual-mode functionality, featuring Gemini 2.5 Flash integration and multi-modal AI capabilities for interior design revolution.",
            objectives: [
                "Demonstrate AI-powered interior design capabilities",
                "Showcase technical implementation and innovation",
                "Build personal brand in AI/ML space",
                "Generate interest from potential collaborators"
            ],
            targetAudience: "AI enthusiasts, interior designers, tech professionals, potential clients",
            deliverables: [
                "Main showcase video (4:15)",
                "Technical deep-dive segments",
                "Feature demonstration clips",
                "Social media promotional cuts",
                "Tutorial series content"
            ],
            tools: ["OBS Studio", "Premiere Pro", "After Effects", "Camtasia", "Audition"],
            techniques: [
                "Screen recording and capture",
                "Technical demonstration filming",
                "Motion graphics for UI highlights",
                "Audio narration and mixing",
                "Interactive demo presentation"
            ],
            metrics: {
                views: 25000,
                engagementRate: "28%",
                conversions: 450,
                socialShares: 1200,
                technicalFeedback: "Excellent"
            },
            awards: ["Viral Potential Content 2024"],
            media: {
                thumbnail: "/assets/ai-room-designer-promo.jpg",
                videoUrl: "https://youtube.com/watch?v=ai-room-designer-demo",
                screenshots: [
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg"
                ],
                behindScenes: "/assets/ai-room-designer-promo.jpg"
            }
        },
        {
            id: "video-002", 
            title: "Planetrics Dashboard - NASA Data Visualization",
            type: "Data Visualization Showcase",
            client: "Personal Project / NASA Collaboration",
            status: "Published",
            duration: "6:30",
            description: "Interactive demo video showcasing NASA exoplanet data exploration through advanced data visualization techniques, featuring Plotly integration and real-time data analysis.",
            objectives: [
                "Demonstrate data visualization expertise",
                "Showcase NASA collaboration capabilities",
                "Highlight technical skills in data science",
                "Generate interest from space tech community"
            ],
            targetAudience: "Data scientists, space enthusiasts, NASA professionals, tech recruiters",
            deliverables: [
                "Full dashboard walkthrough (6:30)",
                "Feature spotlight videos",
                "Technical implementation guides",
                "Educational content about space data",
                "LinkedIn showcase content"
            ],
            tools: ["OBS Studio", "DaVinci Resolve", "Premiere Pro", "Figma", "Photoshop"],
            techniques: [
                "Dashboard screen recording",
                "Data visualization cinematography",
                "Technical narration and explanation",
                "Interactive demo presentation",
                "Educational content structure"
            ],
            metrics: {
                views: 18000,
                engagementRate: "32%",
                conversions: 320,
                socialShares: 850,
                professionalInquiries: 25
            },
            media: {
                thumbnail: "/assets/planetrics-dashboard.jpg",
                videoUrl: "https://youtube.com/watch?v=planetrics-demo",
                screenshots: [
                    "/assets/planetrics-dashboard.jpg",
                    "/assets/planetrics-dashboard.jpg"
                ]
            }
        },
        {
            id: "video-003",
            title: "Unity Game Development Tutorial Series",
            type: "Educational Content Series",
            client: "Personal Brand / YouTube Channel",
            status: "Published",
            duration: "12:45",
            description: "Comprehensive Unity tutorial series covering advanced techniques, procedural generation, and game AI development with thousands of views and strong community engagement.",
            objectives: [
                "Share game development expertise",
                "Build educational content brand",
                "Engage with developer community",
                "Establish thought leadership in game dev"
            ],
            targetAudience: "Game developers, Unity users, programming students, indie developers",
            deliverables: [
                "Multi-part tutorial series",
                "Code examples and resources",
                "Live coding session recordings",
                "Community Q&A content",
                "Advanced technique demonstrations"
            ],
            tools: ["OBS Studio", "Unity Editor", "Premiere Pro", "Camtasia", "GitHub"],
            techniques: [
                "Live coding and screen recording",
                "Educational content structure",
                "Code explanation and demonstration",
                "Community interaction and Q&A",
                "Technical tutorial production"
            ],
            metrics: {
                views: 45000,
                engagementRate: "35%",
                conversions: 1200,
                subscribers: 2500,
                communityEngagement: "Outstanding"
            },
            media: {
                thumbnail: "/assets/Gen Image to 3D Construct Showcase 1.png",
                videoUrl: "https://youtube.com/watch?v=unity-tutorials",
                screenshots: [
                    "/assets/Gen Image to 3D Construct Showcase 1.png",
                    "/assets/Gen Image to 3D Construct Showcase 1.png"
                ]
            }
        },
        {
            id: "video-004",
            title: "NASA Knowledge Graph Visualization",
            type: "Technical Documentation Video",
            client: "NASA Collaboration Project",
            status: "Published",
            duration: "8:50",
            description: "Technical deep-dive into knowledge graph implementation for NASA space data, showcasing AI in space exploration and advanced data visualization techniques.",
            objectives: [
                "Document NASA collaboration work",
                "Demonstrate knowledge graph expertise",
                "Showcase AI applications in space exploration",
                "Build credibility in aerospace tech"
            ],
            targetAudience: "NASA professionals, AI researchers, space tech community, data scientists",
            deliverables: [
                "Technical documentation video",
                "Knowledge graph visualization demos",
                "Implementation walkthrough",
                "Case study presentation",
                "Educational content for AI community"
            ],
            tools: ["OBS Studio", "D3.js", "Premiere Pro", "After Effects", "Python"],
            techniques: [
                "Technical demonstration recording",
                "Data visualization cinematography",
                "Complex concept explanation",
                "Interactive graph presentation",
                "Professional documentation style"
            ],
            metrics: {
                views: 12000,
                engagementRate: "40%",
                conversions: 180,
                professionalConnections: 35,
                industryRecognition: "High"
            },
            media: {
                thumbnail: "/assets/Space For Health Challenge.png",
                videoUrl: "https://youtube.com/watch?v=nasa-knowledge-graph",
                screenshots: [
                    "/assets/Space For Health Challenge.png",
                    "/assets/SESA_1.png"
                ]
            }
        }
    ],

    // Design Work Portfolio
    designProjects: [
        {
            id: "design-001",
            title: "AI Room Designer Interface Design",
            type: "UI/UX Design & Branding",
            client: "Personal Project / Portfolio",
            status: "Completed",
            description: "Complete user interface design for AI-powered interior design application, featuring dual-mode functionality and seamless integration with Gemini 2.5 Flash AI capabilities.",
            challenge: "Create an intuitive interface that makes complex AI functionality accessible to both design professionals and everyday users while maintaining visual appeal and technical precision.",
            solution: "Developed a clean, modern interface with clear visual hierarchy, intuitive navigation, and responsive design that showcases AI capabilities while remaining user-friendly and professional.",
            deliverables: [
                "Complete UI/UX design system",
                "Interactive prototypes and wireframes",
                "Responsive design specifications",
                "Brand identity and visual guidelines",
                "Component library and design tokens",
                "User flow diagrams and personas",
                "Accessibility compliance documentation",
                "Technical implementation guidelines"
            ],
            tools: ["Figma", "Photoshop", "Illustrator", "Principle", "Sketch"],
            designPrinciples: [
                "AI-first user experience design",
                "Accessibility and inclusivity",
                "Technical precision with visual appeal",
                "Scalable design system architecture",
                "Performance-optimized interface"
            ],
            results: {
                userEngagement: "95%",
                taskCompletionRate: "88%",
                designSystemAdoption: "100%",
                accessibilityScore: "AA Compliant",
                performanceOptimization: "90+ Lighthouse Score"
            },
            media: {
                thumbnail: "/assets/ai-room-designer-promo.jpg",
                gallery: [
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg"
                ]
            }
        },
        {
            id: "design-002",
            title: "Planetrics Dashboard Data Visualization",
            type: "Data Visualization & Interface Design",
            client: "NASA Collaboration Project",
            status: "Completed",
            description: "Advanced data visualization interface for NASA exoplanet data exploration, featuring interactive charts, real-time data analysis, and intuitive navigation for complex astronomical datasets.",
            challenge: "Transform complex NASA exoplanet data into accessible, interactive visualizations that serve both scientific researchers and public education while maintaining data accuracy and scientific integrity.",
            solution: "Created a sophisticated yet intuitive dashboard using modern data visualization principles, interactive charts, and clear information hierarchy that makes complex space data accessible and engaging.",
            deliverables: [
                "Interactive dashboard interface design",
                "Data visualization component library",
                "User experience research and testing",
                "Responsive design for multiple devices",
                "Accessibility compliance implementation",
                "Performance optimization guidelines",
                "Documentation and style guides",
                "Integration specifications for Plotly"
            ],
            tools: ["Figma", "D3.js", "Plotly", "Sketch", "Miro"],
            designPrinciples: [
                "Scientific data accuracy and integrity",
                "Intuitive data exploration workflows",
                "Accessibility for diverse user groups",
                "Performance optimization for large datasets",
                "Educational value and public engagement"
            ],
            results: {
                dataAccessibilityImprovement: "75%",
                userEngagementIncrease: "60%",
                scientificAccuracy: "100%",
                performanceOptimization: "95+ Lighthouse Score",
                educationalImpact: "High"
            },
            media: {
                thumbnail: "/assets/planetrics-dashboard.jpg",
                gallery: [
                    "/assets/planetrics-dashboard.jpg",
                    "/assets/planetrics-dashboard.jpg",
                    "/assets/planetrics-dashboard.jpg",
                    "/assets/planetrics-dashboard.jpg"
                ]
            }
        },
        {
            id: "design-003",
            title: "Multi-Portfolio Ecosystem Design System",
            type: "Design System & Brand Architecture",
            client: "Personal Brand Portfolio",
            status: "Completed",
            description: "Comprehensive design system for multi-portfolio ecosystem featuring tech, gaming, and content creation portfolios with unified branding and specialized theming for each domain.",
            challenge: "Create a cohesive design system that maintains brand consistency across three distinct professional portfolios while allowing each to have its own character and optimization.",
            solution: "Developed a flexible design system with shared core components and portfolio-specific theming, featuring gradient systems, typography scales, and component libraries that work across all domains.",
            deliverables: [
                "Unified design system documentation",
                "Portfolio-specific theme variations",
                "Component library and design tokens",
                "Typography and color system guidelines",
                "Responsive design specifications",
                "Animation and interaction guidelines",
                "Cross-portfolio navigation design",
                "Performance optimization standards"
            ],
            tools: ["Figma", "Sketch", "Adobe Creative Suite", "Principle", "Framer"],
            designPrinciples: [
                "Unified brand identity with flexible theming",
                "Cross-portfolio user experience consistency",
                "Performance-first design approach",
                "Accessibility and inclusive design",
                "Scalable component architecture"
            ],
            results: {
                designSystemAdoption: "100%",
                crossPortfolioConsistency: "95%",
                developmentEfficiency: "40% Improvement",
                userExperienceRating: "Excellent",
                brandRecognition: "90%"
            },
            media: {
                thumbnail: "/assets/The Hero Shot.png",
                gallery: [
                    "/assets/The Hero Shot.png",
                    "/assets/Untitled-15.png",
                    "/assets/The Hero Shot.png",
                    "/assets/Untitled-15.png"
                ]
            }
        }
    ],

    // Brand Partnerships and Campaigns
    brandPartnerships: [
        {
            id: "partnership-001",
            title: "AI Room Designer Technical Showcase",
            type: "Technical Content Partnership",
            partner: "AI/ML Developer Community",
            industry: "Artificial Intelligence/Technology",
            duration: "3 months",
            status: "Completed",
            description: "Comprehensive technical content partnership showcasing AI Room Designer application, featuring multi-modal AI integration, technical deep-dives, and developer education content.",
            partnershipScope: [
                "Technical video production and walkthroughs",
                "AI implementation documentation and tutorials",
                "Developer community engagement and education",
                "Social media content strategy for tech audience",
                "Conference presentation materials and demos",
                "Open source contribution documentation"
            ],
            contentDeliverables: [
                "Main showcase video (4:15 minutes)",
                "Technical implementation tutorials",
                "Developer documentation and guides",
                "Social media promotional content",
                "Conference presentation materials",
                "Community engagement content"
            ],
            targetAudience: "AI developers, interior designers, tech enthusiasts, potential collaborators",
            campaignObjectives: [
                "Demonstrate AI-powered design capabilities",
                "Build credibility in AI/ML community",
                "Generate interest from potential collaborators",
                "Establish thought leadership in AI applications"
            ],
            results: {
                totalReach: 75000,
                engagementRate: "28%",
                leadGeneration: 450,
                technicalInquiries: 85,
                collaborationRequests: 25,
                communityFeedback: "Excellent"
            },
            testimonial: "The technical depth and clarity of the AI Room Designer showcase was impressive. It perfectly demonstrated the practical applications of advanced AI in creative fields.",
            media: {
                thumbnail: "/assets/ai-room-designer-promo.jpg",
                campaignAssets: [
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg",
                    "/assets/ai-room-designer-promo.jpg"
                ]
            }
        },
        {
            id: "partnership-002",
            title: "NASA Data Visualization Collaboration",
            type: "Educational Content Partnership",
            partner: "NASA / Space Technology Community",
            industry: "Aerospace/Data Science",
            duration: "6 months",
            status: "Ongoing",
            description: "Educational content partnership focusing on NASA exoplanet data visualization, space technology education, and advanced data science techniques for astronomical research.",
            partnershipScope: [
                "NASA data visualization content creation",
                "Educational video production for space science",
                "Interactive dashboard development and showcasing",
                "Space technology community engagement",
                "STEM education content and outreach",
                "Data science methodology documentation"
            ],
            contentDeliverables: [
                "Planetrics dashboard showcase videos",
                "NASA collaboration documentation",
                "Educational content for space data analysis",
                "Interactive visualization tutorials",
                "STEM outreach materials",
                "Technical implementation guides"
            ],
            targetAudience: "NASA professionals, data scientists, space enthusiasts, STEM educators",
            campaignObjectives: [
                "Showcase NASA collaboration capabilities",
                "Promote STEM education and space science",
                "Demonstrate advanced data visualization skills",
                "Build credibility in aerospace technology"
            ],
            results: {
                totalReach: 45000,
                engagementRate: "32%",
                educationalImpact: "High",
                professionalConnections: 35,
                STEMEngagement: "Excellent",
                industryRecognition: "Featured Content"
            },
            testimonial: "The data visualization work brings complex astronomical data to life in an accessible and engaging way. Excellent contribution to space science education.",
            media: {
                thumbnail: "/assets/planetrics-dashboard.jpg",
                campaignAssets: [
                    "/assets/planetrics-dashboard.jpg",
                    "/assets/Space For Health Challenge.png",
                    "/assets/SESA_1.png"
                ]
            }
        },
        {
            id: "partnership-003",
            title: "Unity Developer Education Initiative",
            type: "Educational Content Partnership",
            partner: "Unity Developer Community",
            industry: "Game Development/Education",
            duration: "12 months",
            status: "Ongoing",
            description: "Comprehensive educational content partnership with Unity developer community, featuring advanced game development tutorials, procedural generation techniques, and developer mentorship.",
            partnershipScope: [
                "Advanced Unity tutorial series production",
                "Game development education and mentorship",
                "Procedural generation technique documentation",
                "Developer community engagement and support",
                "Live coding sessions and workshops",
                "Open source game development contributions"
            ],
            contentDeliverables: [
                "Unity tutorial video series (12+ episodes)",
                "Live coding session recordings",
                "Game development documentation and guides",
                "Community workshop materials",
                "Mentorship program content",
                "Open source project contributions"
            ],
            targetAudience: "Game developers, Unity users, programming students, indie developers",
            campaignObjectives: [
                "Share advanced game development expertise",
                "Support developer community growth",
                "Establish thought leadership in game development",
                "Foster learning and skill development"
            ],
            results: {
                totalReach: 120000,
                engagementRate: "35%",
                tutorialViews: 45000,
                communityGrowth: "2500+ subscribers",
                mentorshipImpact: "Outstanding",
                developerFeedback: "Excellent"
            },
            testimonial: "The Unity tutorials are incredibly detailed and practical. They've helped countless developers improve their skills and create better games.",
            media: {
                thumbnail: "/assets/Gen Image to 3D Construct Showcase 1.png",
                campaignAssets: [
                    "/assets/Gen Image to 3D Construct Showcase 1.png",
                    "/assets/Gen Image to 3D Construct Showcase 1.png",
                    "/assets/Gen Image to 3D Construct Showcase 1.png"
                ]
            }
        },
        {
            id: "partnership-004",
            title: "Multi-Portfolio Ecosystem Showcase",
            type: "Personal Brand Partnership",
            partner: "Professional Development Community",
            industry: "Career Development/Portfolio Design",
            duration: "4 months",
            status: "Completed",
            description: "Innovative content partnership showcasing multi-portfolio ecosystem design, professional brand development, and cross-disciplinary career strategies for modern professionals.",
            partnershipScope: [
                "Multi-portfolio design system documentation",
                "Professional brand development content",
                "Career strategy and portfolio optimization",
                "Cross-disciplinary skill showcasing",
                "Professional development community engagement",
                "Design system and UX methodology sharing"
            ],
            contentDeliverables: [
                "Portfolio ecosystem case study documentation",
                "Design system and branding guidelines",
                "Professional development content series",
                "Career strategy workshops and materials",
                "Community engagement and mentorship content",
                "Technical implementation documentation"
            ],
            targetAudience: "Professionals, career developers, designers, multi-disciplinary creators",
            campaignObjectives: [
                "Showcase innovative portfolio design approach",
                "Demonstrate cross-disciplinary expertise",
                "Support professional development community",
                "Establish thought leadership in career strategy"
            ],
            results: {
                totalReach: 35000,
                engagementRate: "40%",
                professionalInquiries: 150,
                mentorshipRequests: 45,
                designSystemAdoption: "High",
                communityImpact: "Significant"
            },
            testimonial: "The multi-portfolio approach is revolutionary for modern professionals. It perfectly demonstrates how to showcase diverse skills while maintaining brand coherence.",
            media: {
                thumbnail: "/assets/The Hero Shot.png",
                campaignAssets: [
                    "/assets/The Hero Shot.png",
                    "/assets/Untitled-15.png",
                    "/assets/The Hero Shot.png"
                ]
            }
        }
    ],

    // Creative Process and Methodologies
    creativeProcess: {
        phases: [
            {
                id: "discovery",
                name: "Discovery & Strategy",
                duration: "1-2 weeks",
                description: "Comprehensive project foundation through research, analysis, and strategic planning.",
                activities: [
                    "Client consultation and brief analysis",
                    "Market research and competitive analysis", 
                    "Target audience research and persona development",
                    "Brand analysis and positioning review",
                    "Technical requirements assessment",
                    "Creative brief development and approval"
                ],
                deliverables: [
                    "Project brief and scope document",
                    "Research findings report",
                    "Audience persona profiles",
                    "Creative strategy document",
                    "Technical specifications",
                    "Project timeline and milestones"
                ],
                tools: ["Notion", "Miro", "Google Analytics", "Survey tools", "Research databases"]
            },
            {
                id: "concept",
                name: "Concept & Design",
                duration: "2-3 weeks", 
                description: "Creative ideation and visual concept development with detailed planning.",
                activities: [
                    "Creative brainstorming and ideation",
                    "Mood board and style guide creation",
                    "Storyboard and wireframe development",
                    "Visual concept presentations",
                    "Technical planning and resource allocation",
                    "Client feedback integration and refinement"
                ],
                deliverables: [
                    "Creative concepts and mood boards",
                    "Storyboards and wireframes",
                    "Style guides and visual direction",
                    "Technical production plan",
                    "Resource and timeline breakdown",
                    "Approved creative direction"
                ],
                tools: ["Figma", "Photoshop", "Illustrator", "Miro", "InVision", "Sketch"]
            },
            {
                id: "production",
                name: "Production & Creation",
                duration: "3-6 weeks",
                description: "Content creation and technical implementation with quality assurance.",
                activities: [
                    "Video production and filming",
                    "Graphic design and animation creation",
                    "Audio recording and sound design",
                    "Post-production and editing",
                    "Quality assurance and testing",
                    "Client review and iteration cycles"
                ],
                deliverables: [
                    "Raw footage and source materials",
                    "Edited video content",
                    "Graphic design assets",
                    "Animation and motion graphics",
                    "Audio tracks and sound design",
                    "Final approved content"
                ],
                tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition", "Cinema 4D", "OBS Studio"]
            },
            {
                id: "launch",
                name: "Launch & Distribution",
                duration: "1-2 weeks",
                description: "Strategic content deployment and multi-platform optimization.",
                activities: [
                    "Platform-specific content optimization",
                    "Launch campaign coordination",
                    "Social media strategy execution",
                    "Performance monitoring setup",
                    "Community engagement initiation",
                    "Launch metrics tracking"
                ],
                deliverables: [
                    "Platform-optimized content versions",
                    "Launch campaign materials",
                    "Social media content calendar",
                    "Performance tracking dashboard",
                    "Community engagement plan",
                    "Launch report and metrics"
                ],
                tools: ["Hootsuite", "Buffer", "Google Analytics", "Social media platforms", "Email marketing tools"]
            },
            {
                id: "optimization",
                name: "Analysis & Optimization",
                duration: "Ongoing",
                description: "Performance analysis and continuous improvement strategies.",
                activities: [
                    "Performance data analysis",
                    "Audience feedback collection",
                    "A/B testing implementation",
                    "Content optimization recommendations",
                    "Strategy refinement",
                    "Future planning and ideation"
                ],
                deliverables: [
                    "Performance analytics reports",
                    "Audience feedback analysis",
                    "A/B testing results",
                    "Optimization recommendations",
                    "Strategy refinement plan",
                    "Future content roadmap"
                ],
                tools: ["Google Analytics", "Social media analytics", "Survey tools", "A/B testing platforms", "Reporting tools"]
            }
        ],
        
        qualityAssurance: {
            videoProduction: [
                "Technical quality checks (resolution, frame rate, audio levels)",
                "Content accuracy and brand compliance review",
                "Accessibility compliance (captions, audio descriptions)",
                "Cross-platform compatibility testing",
                "Performance optimization verification",
                "Client approval and sign-off process"
            ],
            designWork: [
                "Design consistency and brand guideline adherence",
                "Technical specification compliance",
                "Accessibility and usability testing",
                "Cross-browser and device compatibility",
                "Print and digital format optimization",
                "Client feedback integration and approval"
            ],
            campaignManagement: [
                "Campaign objective alignment verification",
                "Target audience accuracy confirmation",
                "Platform-specific optimization checks",
                "Performance tracking setup validation",
                "Legal and compliance review",
                "Launch readiness assessment"
            ]
        },
        
        collaborationMethods: {
            clientCommunication: [
                "Regular progress updates and milestone reviews",
                "Collaborative feedback and revision processes",
                "Real-time communication through preferred channels",
                "Transparent project management and timeline tracking",
                "Proactive issue identification and resolution",
                "Post-project relationship maintenance"
            ],
            teamCoordination: [
                "Cross-functional team collaboration",
                "Resource sharing and knowledge transfer",
                "Skill complementarity and specialization",
                "Quality peer review processes",
                "Continuous learning and improvement",
                "Creative brainstorming and ideation sessions"
            ],
            toolsAndPlatforms: [
                "Project management: Notion, Asana, Trello",
                "Communication: Slack, Discord, Zoom, Teams",
                "File sharing: Google Drive, Dropbox, Frame.io",
                "Design collaboration: Figma, InVision, Miro",
                "Version control: Git, Creative Cloud Libraries",
                "Feedback collection: Loom, ReviewBoard, Markup.io"
            ]
        }
    },

    // Skills and Expertise
    skills: {
        videoProduction: {
            category: "Video Production",
            icon: "fas fa-video",
            skills: [
                { name: "Premiere Pro", level: "Expert", years: 5 },
                { name: "After Effects", level: "Advanced", years: 4 },
                { name: "DaVinci Resolve", level: "Advanced", years: 3 },
                { name: "Cinema 4D", level: "Intermediate", years: 2 },
                { name: "Audition", level: "Advanced", years: 4 },
                { name: "OBS Studio", level: "Expert", years: 3 },
                { name: "Motion Graphics", level: "Advanced", years: 4 },
                { name: "Color Grading", level: "Advanced", years: 3 },
                { name: "Audio Design", level: "Intermediate", years: 3 },
                { name: "Live Streaming", level: "Advanced", years: 2 }
            ]
        },
        design: {
            category: "Design & Graphics",
            icon: "fas fa-palette",
            skills: [
                { name: "Figma", level: "Expert", years: 4 },
                { name: "Photoshop", level: "Expert", years: 6 },
                { name: "Illustrator", level: "Advanced", years: 5 },
                { name: "InDesign", level: "Intermediate", years: 3 },
                { name: "Sketch", level: "Advanced", years: 3 },
                { name: "Brand Identity", level: "Advanced", years: 4 },
                { name: "UI/UX Design", level: "Advanced", years: 4 },
                { name: "Typography", level: "Advanced", years: 4 },
                { name: "Layout Design", level: "Advanced", years: 5 },
                { name: "Print Design", level: "Intermediate", years: 3 }
            ]
        },
        strategy: {
            category: "Strategy & Marketing",
            icon: "fas fa-chart-line",
            skills: [
                { name: "Content Strategy", level: "Expert", years: 4 },
                { name: "Social Media Marketing", level: "Advanced", years: 5 },
                { name: "Brand Strategy", level: "Advanced", years: 4 },
                { name: "Campaign Management", level: "Advanced", years: 4 },
                { name: "Analytics & Reporting", level: "Advanced", years: 4 },
                { name: "SEO/SEM", level: "Intermediate", years: 3 },
                { name: "Email Marketing", level: "Intermediate", years: 3 },
                { name: "Influencer Relations", level: "Intermediate", years: 2 },
                { name: "Community Management", level: "Advanced", years: 3 },
                { name: "Performance Optimization", level: "Advanced", years: 4 }
            ]
        }
    },

    // Achievements and Recognition
    achievements: [
        {
            title: "Viral Technical Content Creator",
            organization: "AI/ML Developer Community",
            project: "AI Room Designer Showcase",
            year: 2024,
            description: "Recognized for creating viral technical content that effectively demonstrates AI applications in creative fields"
        },
        {
            title: "NASA Collaboration Recognition",
            organization: "NASA Space Technology Community",
            project: "Planetrics Data Visualization",
            year: 2024,
            description: "Acknowledged for outstanding contribution to space science education and data visualization excellence"
        },
        {
            title: "Unity Community Educator Award",
            organization: "Unity Developer Community",
            project: "Advanced Unity Tutorial Series",
            year: 2024,
            description: "Recognized for exceptional educational content and community impact in game development education"
        },
        {
            title: "Innovation in Portfolio Design",
            organization: "Professional Development Community",
            project: "Multi-Portfolio Ecosystem",
            year: 2024,
            description: "Acknowledged for innovative approach to professional portfolio design and cross-disciplinary skill showcasing"
        },
        {
            title: "Technical Content Excellence",
            organization: "Developer Education Platforms",
            project: "Educational Content Series",
            year: 2024,
            description: "Consistent recognition for high-quality technical content creation and developer community engagement"
        }
    ],

    // Testimonials and Client Feedback
    testimonials: [
        {
            client: "Dr. Sarah Mitchell",
            position: "AI Research Director",
            company: "AI/ML Developer Community",
            project: "AI Room Designer Technical Showcase",
            quote: "Gaston's technical depth and ability to explain complex AI concepts clearly is remarkable. The AI Room Designer showcase perfectly demonstrates practical AI applications in creative fields.",
            rating: 5
        },
        {
            client: "Dr. James Rodriguez",
            position: "Data Science Lead",
            company: "NASA Collaboration Project",
            project: "NASA Data Visualization",
            quote: "The data visualization work brings complex astronomical data to life in an accessible and engaging way. Excellent contribution to space science education and public outreach.",
            rating: 5
        },
        {
            client: "Alex Thompson",
            position: "Senior Game Developer",
            company: "Unity Developer Community",
            project: "Unity Tutorial Series",
            quote: "The Unity tutorials are incredibly detailed and practical. They've helped countless developers improve their skills and create better games. Outstanding educational content.",
            rating: 5
        },
        {
            client: "Maria Garcia",
            position: "Career Development Specialist",
            company: "Professional Development Community",
            project: "Multi-Portfolio Ecosystem",
            quote: "The multi-portfolio approach is revolutionary for modern professionals. It perfectly demonstrates how to showcase diverse skills while maintaining brand coherence and professional identity.",
            rating: 5
        },
        {
            client: "David Kim",
            position: "Technical Content Manager",
            company: "Developer Education Platform",
            project: "Educational Content Series",
            quote: "Gaston's ability to create educational content that is both technically accurate and engaging is exceptional. His work has significantly impacted our developer community.",
            rating: 5
        }
    ]
};
  window.ContentPortfolioData = Object.assign(window.ContentPortfolioData || {}, data);
})();
