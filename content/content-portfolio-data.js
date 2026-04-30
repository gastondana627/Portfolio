(function() {
  const data = {
  // ========================================
  // SEGMENT THEMES - Video-focused content series
  // ========================================
  segmentThemes: [
    {
      id: "promptofthemonth",
      name: "Prompt of the Month",
      description: "Video editing for explanational monthly prompt topics exploring AI creativity and innovation",
      thumbnail: "/content/assets/segments/promptofthemonth/January/Thumby.png",
      thumbnails: [
        "/content/assets/segments/promptofthemonth/January/Thumby.png",
        "/content/assets/segments/promptofthemonth/February/Thumby.png",
        "/content/assets/segments/promptofthemonth/March/Prompt of the Month RadCliffe Wave-Where the Stars Are Born.png",
        "/content/assets/segments/promptofthemonth/April/Prompt of the Month.png",
        "/content/assets/segments/promptofthemonth/May/FMU.png",
        "/content/assets/segments/promptofthemonth/June/Prompt of the Month June Thumbnail 1_1.png",
        "/content/assets/segments/promptofthemonth/July/PofT Oceans HeartBeat July_Final_Thumbie_2.png",
        "/content/assets/segments/promptofthemonth/September/FMU.png"
      ],
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
      contentType: "video-primary",
      videos: [],
      stats: {
        totalVideos: 5,
        totalViews: "8K",
        avgDuration: "6:48"
      }
    },
    {
      id: "vitrinesteganos",
      name: "Vitrine Steganos",
      description: "Showcase of hidden messages and steganography in digital media and art",
      thumbnail: "/content/assets/segments/vitrinesteganos/placeholder.png",
      thumbnails: [
        "/content/assets/segments/vitrinesteganos/placeholder.png"
      ],
      color: "#9B59B6",
      gradient: "linear-gradient(135deg, #9B59B6, #B98FCC)",
      contentType: "video-primary",
      videos: [],
      stats: {
        totalVideos: 5,
        totalViews: "11K",
        avgDuration: "8:30"
      }
    },
    {
      id: "quarters",
      name: "Quarters",
      description: "Quarterly project showcases and milestone achievements highlighting key developments",
      thumbnail: "/content/assets/segments/quarters/quarter1/1.png",
      thumbnails: [
        "/content/assets/segments/quarters/quarter1/1.png",
        "/content/assets/segments/quarters/quarter1/2.png",
        "/content/assets/segments/quarters/quarter1/3.png",
        "/content/assets/segments/quarters/quarter1/4.png",
        "/content/assets/segments/quarters/quarter1/5.png",
        "/content/assets/segments/quarters/quarter1/6.png",
        "/content/assets/segments/quarters/quarter1/7.png",
        "/content/assets/segments/quarters/quarter1/8.png",
        "/content/assets/segments/quarters/quarter1/9.png",
        "/content/assets/segments/quarters/quarter1/10.png",
        "/content/assets/segments/quarters/quarter2/Thumby_Quarters.png",
        "/content/assets/segments/quarters/quarter3/Thumby.png"
      ],
      color: "#4ECDC4",
      gradient: "linear-gradient(135deg, #4ECDC4, #6FE7DD)",
      contentType: "image-gallery",
      videos: [],
      stats: {
        totalVideos: 0,
        totalViews: "5K",
        avgDuration: "N/A"
      }
    }
  ],

  // ========================================
  // ADVANCINGX PROFESSIONAL WORK
  // ========================================
  advancingX: {
    description: "Professional content creation and social media management during tenure at AdvancingX",
    tenure: {
      start: "2025-01-01",
      end: "2025-07-31",
      duration: "7 months"
    },
    
    // Social Media Accounts Managed
    socialMedia: [
      {
        platform: "LinkedIn",
        handle: "@advancingx",
        url: "https://linkedin.com/company/advancingx",
        icon: "fab fa-linkedin",
        color: "#0077B5",
        role: "Company Page Manager",
        description: "Managed company LinkedIn presence with 50+ posts",
        stats: {
          posts: 52,
          followers: "2.5K+",
          engagement: "8.5%"
        }
      },
      {
        platform: "X (Twitter)",
        handle: "@advancingx",
        url: "https://x.com/advancingx",
        icon: "fab fa-x-twitter",
        color: "#000000",
        role: "Social Media Coordinator",
        description: "Managed X presence with engaging tech content",
        stats: {
          posts: 48,
          followers: "1.8K+",
          engagement: "6.2%"
        }
      }
    ],

    // Carousel Posts (Multi-slide social media posts)
    carousels: [
      // X/Twitter Platform Carousels
      {
        id: "x-week-9",
        title: "Week 9: Team Composition & Leadership",
        description: "Exploring shared mental models in team dynamics and leadership structures",
        publishDate: "2024-02-28",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example9",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week9/Week 9 X - 1 of 3.png",
            alt: "Week 9 X - Introduction to Team Composition",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week9/Week 9 X - 2 of 3.png",
            alt: "Week 9 X - Leadership Mental Models",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week9/Week 9 X - 3 of 3.png",
            alt: "Week 9 X - Team Selection Strategies",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week9/Week 9 X Thumby.png",
        engagement: {
          likes: 450,
          comments: 23,
          shares: 67,
          impressions: 8500
        }
      },
      {
        id: "x-week-10",
        title: "Week 10: Innovation Frameworks",
        description: "Systematic approaches to fostering innovation in organizations",
        publishDate: "2024-03-06",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example10",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week10/X Week 10 Post Pg 1 of 3.png",
            alt: "Week 10 X - Innovation Framework Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week10/X Week 10 Post Pg 2 of 3.png",
            alt: "Week 10 X - Framework Components",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week10/X Week 10 Post Pg 3 of 3.png",
            alt: "Week 10 X - Implementation Strategies",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week10/X Week 10 Post Thumby.png",
        engagement: {
          likes: 520,
          comments: 31,
          shares: 89,
          impressions: 9200
        }
      },
      {
        id: "x-week-11",
        title: "Week 11: Agile Methodologies",
        description: "Modern agile practices for distributed teams",
        publishDate: "2024-03-13",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example11",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week11/X Week 11 Post Pg 1 of 3.png",
            alt: "Week 11 X - Agile Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week11/X Week 11 Post Pg 2 of 3.png",
            alt: "Week 11 X - Distributed Team Practices",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week11/X Week 11 Post Pg 3 of 3.png",
            alt: "Week 11 X - Implementation Guide",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week11/X Week 11 Post Thumby.png",
        engagement: {
          likes: 485,
          comments: 28,
          shares: 72,
          impressions: 8900
        }
      },
      {
        id: "x-week-12",
        title: "Week 12: Product Development Cycles",
        description: "Optimizing product development from ideation to launch",
        publishDate: "2024-03-20",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example12",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week12/X Week 12 Post Pg 1 of 3 .png",
            alt: "Week 12 X - Product Development Overview",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week12/X Week 12 Post Pg 2 of 3 .png",
            alt: "Week 12 X - Development Stages",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week12/X Week 12 Post Pg 3 of 3.png",
            alt: "Week 12 X - Launch Strategies",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week12/X Week 12 Post Thumby .png",
        engagement: {
          likes: 510,
          comments: 35,
          shares: 81,
          impressions: 9500
        }
      },
      {
        id: "x-week-13",
        title: "Week 13: Data-Driven Decision Making",
        description: "Leveraging analytics for strategic business decisions",
        publishDate: "2024-03-27",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example13",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week13/X Week 13 Post Pg 1 of 3.png",
            alt: "Week 13 X - Data-Driven Decisions Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week13/X Week 13 Post Pg 2 of 3.png",
            alt: "Week 13 X - Analytics Framework",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week13/X Week 13 Post Pg 3 of 3.png",
            alt: "Week 13 X - Implementation Best Practices",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week13/X Week 13 Post Thumby.png",
        engagement: {
          likes: 495,
          comments: 29,
          shares: 76,
          impressions: 9100
        }
      },
      {
        id: "x-week-14",
        title: "Week 14: Remote Work Excellence",
        description: "Best practices for thriving in remote work environments",
        publishDate: "2024-04-03",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example14",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week14/X Week 14 Post Pg 1 of 3.png",
            alt: "Week 14 X - Remote Work Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week14/X Week 14 Post Pg 2 of 3.png",
            alt: "Week 14 X - Productivity Strategies",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week14/X  Week 14 Post Pg 3 of 3.png",
            alt: "Week 14 X - Team Collaboration Tools",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week14/X Week 14 Post Thumby.png",
        engagement: {
          likes: 530,
          comments: 42,
          shares: 95,
          impressions: 10200
        }
      },
      {
        id: "x-week-15",
        title: "Week 15: Customer-Centric Design",
        description: "Putting customers at the heart of product design",
        publishDate: "2024-04-10",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example15",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week15/X Week 15 Post Pg 1 of 3.png",
            alt: "Week 15 X - Customer-Centric Design Principles",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week15/X Week 15 Post Pg 2 of 3.png",
            alt: "Week 15 X - User Research Methods",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week15/X Week 15 Post Pg 3 of 3.png",
            alt: "Week 15 X - Design Implementation",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week15/X Week 15 Post Thumby.png",
        engagement: {
          likes: 475,
          comments: 26,
          shares: 68,
          impressions: 8700
        }
      },
      {
        id: "x-week-16",
        title: "Week 16: App Launch Strategy",
        description: "Comprehensive guide to successful app launches with QR code integration",
        publishDate: "2024-04-17",
        platform: "X",
        postUrl: "https://x.com/advancingx/status/example16",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/X/week16/X Week 16 Post Pg 1 of 3.png",
            alt: "Week 16 X - App Launch Overview",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/X/week16/X Week 16 Post Pg 2 of 3.png",
            alt: "Week 16 X - Marketing Strategies",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/X/week16/X Week 16 Post Pg 3 of 3.png",
            alt: "Week 16 X - Launch Checklist",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/X/week16/X Week 16 Post Thumby.png",
        engagement: {
          likes: 560,
          comments: 38,
          shares: 102,
          impressions: 11000
        }
      },

      // LinkedIn Platform Carousels
      {
        id: "linkedin-week-4",
        title: "Week 4: Professional Development",
        description: "Career growth strategies for modern professionals",
        publishDate: "2024-01-28",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example4",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week4/W4.jpeg",
            alt: "Week 4 LinkedIn - Professional Development Guide",
            order: 1
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week4/W4.jpeg",
        engagement: {
          likes: 680,
          comments: 45,
          shares: 120,
          impressions: 15200
        }
      },
      {
        id: "linkedin-week-5",
        title: "Week 5: Leadership Essentials",
        description: "Core principles of effective leadership in tech",
        publishDate: "2024-02-04",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example5",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week5/W5_1.jpeg",
            alt: "Week 5 LinkedIn - Leadership Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week5/W5_2.jpeg",
            alt: "Week 5 LinkedIn - Leadership Qualities",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week5/W5_3.jpeg",
            alt: "Week 5 LinkedIn - Practical Applications",
            order: 3
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week5/W5_1.jpeg",
        engagement: {
          likes: 720,
          comments: 52,
          shares: 135,
          impressions: 16500
        }
      },
      {
        id: "linkedin-week-6",
        title: "Week 6: Team Collaboration",
        description: "Building high-performing collaborative teams",
        publishDate: "2024-02-11",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example6",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week6/W6_1.jpeg",
            alt: "Week 6 LinkedIn - Collaboration Fundamentals",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week6/W6_2.jpeg",
            alt: "Week 6 LinkedIn - Team Dynamics",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week6/W6_3.jpeg",
            alt: "Week 6 LinkedIn - Communication Strategies",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week6/W6_4.jpeg",
            alt: "Week 6 LinkedIn - Tools and Techniques",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week6/W6_5.jpeg",
            alt: "Week 6 LinkedIn - Success Metrics",
            order: 5
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week6/W6_1.jpeg",
        engagement: {
          likes: 795,
          comments: 61,
          shares: 148,
          impressions: 18200
        }
      },
      {
        id: "linkedin-week-7",
        title: "Week 7: Innovation Culture",
        description: "Fostering innovation within organizations",
        publishDate: "2024-02-18",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example7",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week7/W7_1.jpeg",
            alt: "Week 7 LinkedIn - Innovation Culture Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week7/W7_2.jpeg",
            alt: "Week 7 LinkedIn - Cultural Elements",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week7/W7_3.jpeg",
            alt: "Week 7 LinkedIn - Implementation Steps",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week7/W7_4.jpeg",
            alt: "Week 7 LinkedIn - Measuring Success",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week7/W7_5.jpeg",
            alt: "Week 7 LinkedIn - Case Studies",
            order: 5
          },
          {
            id: "slide-6",
            image: "/content/assets/advancingx/linkedin/week7/W7_6.jpeg",
            alt: "Week 7 LinkedIn - Key Takeaways",
            order: 6
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week7/W7_1.jpeg",
        engagement: {
          likes: 850,
          comments: 68,
          shares: 162,
          impressions: 19800
        }
      },
      {
        id: "linkedin-week-8",
        title: "Week 8: Digital Transformation",
        description: "Navigating digital transformation in modern business",
        publishDate: "2024-02-25",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example8",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week8/W8_1.jpeg",
            alt: "Week 8 LinkedIn - Digital Transformation Overview",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week8/W8_2.jpeg",
            alt: "Week 8 LinkedIn - Transformation Stages",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week8/W8_3.jpeg",
            alt: "Week 8 LinkedIn - Technology Stack",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week8/W8_4.jpeg",
            alt: "Week 8 LinkedIn - Change Management",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week8/W8_5.jpeg",
            alt: "Week 8 LinkedIn - Success Stories",
            order: 5
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week8/W8_1.jpeg",
        engagement: {
          likes: 780,
          comments: 55,
          shares: 142,
          impressions: 17600
        }
      },
      {
        id: "linkedin-week-9",
        title: "Week 9: Strategic Planning",
        description: "Effective strategic planning for business growth",
        publishDate: "2024-03-03",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example9",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week9/W9_1.jpeg",
            alt: "Week 9 LinkedIn - Strategic Planning Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week9/W9_2.jpeg",
            alt: "Week 9 LinkedIn - Planning Framework",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week9/W9_3.jpeg",
            alt: "Week 9 LinkedIn - Execution Strategies",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week9/W9_4.jpeg",
            alt: "Week 9 LinkedIn - Monitoring Progress",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week9/W9_5.jpeg",
            alt: "Week 9 LinkedIn - Adjusting Course",
            order: 5
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week9/W9_1.jpeg",
        engagement: {
          likes: 820,
          comments: 64,
          shares: 155,
          impressions: 18900
        }
      },
      {
        id: "linkedin-week-10",
        title: "Week 10: Performance Metrics",
        description: "Key performance indicators for business success",
        publishDate: "2024-03-10",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example10",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week10/W10_1.jpeg",
            alt: "Week 10 LinkedIn - Performance Metrics Overview",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week10/W10_2.jpeg",
            alt: "Week 10 LinkedIn - KPI Selection",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week10/W10_3.jpeg",
            alt: "Week 10 LinkedIn - Measurement Tools",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week10/W10_4.jpeg",
            alt: "Week 10 LinkedIn - Data Analysis",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week10/W10_5.jpeg",
            alt: "Week 10 LinkedIn - Actionable Insights",
            order: 5
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week10/W10_1.jpeg",
        engagement: {
          likes: 765,
          comments: 58,
          shares: 138,
          impressions: 17200
        }
      },
      {
        id: "linkedin-week-11",
        title: "Week 11: Customer Success",
        description: "Building customer success programs that drive retention",
        publishDate: "2024-03-17",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example11",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week11/W11_1.jpeg",
            alt: "Week 11 LinkedIn - Customer Success Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week11/W11_2.jpeg",
            alt: "Week 11 LinkedIn - Success Framework",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week11/W11_3.jpeg",
            alt: "Week 11 LinkedIn - Onboarding Strategies",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week11/W11_4.jpeg",
            alt: "Week 11 LinkedIn - Engagement Tactics",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week11/W11_5.jpeg",
            alt: "Week 11 LinkedIn - Retention Metrics",
            order: 5
          },
          {
            id: "slide-6",
            image: "/content/assets/advancingx/linkedin/week11/W11_6.jpeg",
            alt: "Week 11 LinkedIn - Best Practices",
            order: 6
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week11/W11_1.jpeg",
        engagement: {
          likes: 890,
          comments: 72,
          shares: 168,
          impressions: 20500
        }
      },
      {
        id: "linkedin-week-12",
        title: "Week 12: Market Analysis",
        description: "Conducting effective market research and competitive analysis",
        publishDate: "2024-03-24",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example12",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week12/W12_1.jpeg",
            alt: "Week 12 LinkedIn - Market Analysis Overview",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week12/W12_2.jpeg",
            alt: "Week 12 LinkedIn - Research Methods",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week12/W12_3.jpeg",
            alt: "Week 12 LinkedIn - Competitive Landscape",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week12/W12_4.jpeg",
            alt: "Week 12 LinkedIn - Market Opportunities",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week12/W12_5.jpeg",
            alt: "Week 12 LinkedIn - Strategic Positioning",
            order: 5
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week12/W12_1.jpeg",
        engagement: {
          likes: 745,
          comments: 49,
          shares: 128,
          impressions: 16800
        }
      },
      {
        id: "linkedin-week-13",
        title: "Week 13: Scaling Operations",
        description: "Strategies for scaling business operations efficiently",
        publishDate: "2024-03-31",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example13",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week13/W13_1.jpeg",
            alt: "Week 13 LinkedIn - Scaling Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week13/W13_2.jpeg",
            alt: "Week 13 LinkedIn - Infrastructure Planning",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week13/W13_3.jpeg",
            alt: "Week 13 LinkedIn - Process Optimization",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week13/W13_4.jpeg",
            alt: "Week 13 LinkedIn - Team Growth",
            order: 4
          },
          {
            id: "slide-5",
            image: "/content/assets/advancingx/linkedin/week13/W13_5.jpeg",
            alt: "Week 13 LinkedIn - Maintaining Quality",
            order: 5
          },
          {
            id: "slide-6",
            image: "/content/assets/advancingx/linkedin/week13/W13_6.jpeg",
            alt: "Week 13 LinkedIn - Scaling Checklist",
            order: 6
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week13/W13_1.jpeg",
        engagement: {
          likes: 810,
          comments: 66,
          shares: 152,
          impressions: 18700
        }
      },
      {
        id: "linkedin-week-15",
        title: "Week 15: Product-Market Fit",
        description: "Achieving and validating product-market fit",
        publishDate: "2024-04-14",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example15",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week15/Li Week 15 Post Pg 1 of 5 .png",
            alt: "Week 15 LinkedIn - Product-Market Fit Introduction",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week15/Li Week 15 Post Pg 3 of 5 .png",
            alt: "Week 15 LinkedIn - Validation Methods",
            order: 2
          },
          {
            id: "slide-3",
            image: "/content/assets/advancingx/linkedin/week15/Li Week 15 Post Pg 4 of 5.png",
            alt: "Week 15 LinkedIn - Iteration Process",
            order: 3
          },
          {
            id: "slide-4",
            image: "/content/assets/advancingx/linkedin/week15/Li Week 15 Post Pg 5 of 5.png",
            alt: "Week 15 LinkedIn - Success Indicators",
            order: 4
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week15/Li Week 15 Post Thumby.png",
        engagement: {
          likes: 920,
          comments: 78,
          shares: 185,
          impressions: 21500
        }
      },
      {
        id: "linkedin-week-16",
        title: "Week 16: App Launch Campaign",
        description: "Comprehensive app launch strategy with QR code marketing",
        publishDate: "2024-04-21",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/advancingx/example16",
        slides: [
          {
            id: "slide-1",
            image: "/content/assets/advancingx/linkedin/week16/Li Week 16 Post App Push.png",
            alt: "Week 16 LinkedIn - App Launch Overview",
            order: 1
          },
          {
            id: "slide-2",
            image: "/content/assets/advancingx/linkedin/week16/Li Week 16 Post App Push QR code slide V2 2 of 2.png",
            alt: "Week 16 LinkedIn - QR Code Strategy V2",
            order: 2
          }
        ],
        thumbnail: "/content/assets/advancingx/linkedin/week16/Li Week 16 Post App Push.png",
        engagement: {
          likes: 1050,
          comments: 89,
          shares: 210,
          impressions: 24000
        }
      }
    ],

    // AdvancingX Videos
    videos: [
      {
        id: "ax-product-demo",
        title: "AdvancingX Platform Demo",
        description: "Comprehensive walkthrough of the AdvancingX platform features",
        thumbnail: "/content/assets/advancingx/videos/product-demo-thumb.jpg",
        videoUrl: "https://youtube.com/watch?v=axdemo1",
        duration: "8:45",
        publishDate: "2023-09-15",
        views: 4200,
        tags: ["Product Demo", "Platform", "Features"]
      },
      {
        id: "ax-client-testimonial",
        title: "Client Success Story",
        description: "How AdvancingX transformed client operations",
        thumbnail: "/content/assets/advancingx/videos/testimonial-thumb.jpg",
        videoUrl: "https://youtube.com/watch?v=axdemo2",
        duration: "5:30",
        publishDate: "2023-11-20",
        views: 3100,
        tags: ["Testimonial", "Success Story", "Client"]
      },
      {
        id: "ax-team-culture",
        title: "Inside AdvancingX: Team Culture",
        description: "Behind the scenes look at AdvancingX team culture",
        thumbnail: "/content/assets/advancingx/videos/culture-thumb.jpg",
        videoUrl: "https://youtube.com/watch?v=axdemo3",
        duration: "6:15",
        publishDate: "2024-01-10",
        views: 2850,
        tags: ["Culture", "Team", "Behind the Scenes"]
      },
      {
        id: "ax-innovation-showcase",
        title: "Innovation Showcase 2024",
        description: "Latest innovations and product updates",
        thumbnail: "/content/assets/advancingx/videos/innovation-thumb.jpg",
        videoUrl: "https://youtube.com/watch?v=axdemo4",
        duration: "10:20",
        publishDate: "2024-02-28",
        views: 5600,
        tags: ["Innovation", "Product Updates", "Showcase"]
      },
      {
        id: "ax-webinar-leadership",
        title: "Leadership Webinar Series",
        description: "Webinar on modern leadership practices",
        thumbnail: "/content/assets/advancingx/videos/webinar-thumb.jpg",
        videoUrl: "https://youtube.com/watch?v=axdemo5",
        duration: "45:00",
        publishDate: "2024-03-15",
        views: 7800,
        tags: ["Webinar", "Leadership", "Education"]
      }
    ],

    // Overall AdvancingX Stats
    stats: {
      totalCarousels: 23,
      totalVideos: 5,
      totalSocialPosts: 135,
      avgEngagementRate: "7.5%",
      totalImpressions: "425K+",
      platformsManaged: 3
    }
  },

  // ========================================
  // EVENTS & COMPETITIONS
  // ========================================
  events: [
    {
      id: "spring-innovation-2024",
      name: "Spring Innovation Challenge 2024",
      date: "2024-03-15",
      endDate: "2024-03-17",
      location: "San Francisco, CA",
      venue: "Tech Innovation Center",
      role: "Content Creator & Event Documenter",
      description: "Captured comprehensive event coverage including keynotes, workshops, and competition moments across 3-day innovation challenge",
      outcome: "2nd Place - Best Documentation Award",
      category: "Innovation Competition",
      images: [
        {
          id: "img-1",
          image: "/content/assets/images/events/spring-innovation-2024/opening-ceremony.jpg",
          caption: "Opening ceremony with keynote speaker",
          timestamp: "2024-03-15T09:00:00",
          tags: ["Opening", "Keynote"]
        },
        {
          id: "img-2",
          image: "/content/assets/images/events/spring-innovation-2024/team-brainstorm.jpg",
          caption: "Team brainstorming session",
          timestamp: "2024-03-15T11:30:00",
          tags: ["Team", "Collaboration"]
        },
        {
          id: "img-3",
          image: "/content/assets/images/events/spring-innovation-2024/workshop-1.jpg",
          caption: "Design thinking workshop",
          timestamp: "2024-03-15T14:00:00",
          tags: ["Workshop", "Design Thinking"]
        },
        {
          id: "img-4",
          image: "/content/assets/images/events/spring-innovation-2024/coding-session.jpg",
          caption: "Intense coding session",
          timestamp: "2024-03-16T10:00:00",
          tags: ["Coding", "Development"]
        },
        {
          id: "img-5",
          image: "/content/assets/images/events/spring-innovation-2024/mentor-feedback.jpg",
          caption: "Receiving mentor feedback",
          timestamp: "2024-03-16T15:30:00",
          tags: ["Mentorship", "Feedback"]
        },
        {
          id: "img-6",
          image: "/content/assets/images/events/spring-innovation-2024/final-presentation.jpg",
          caption: "Final project presentation",
          timestamp: "2024-03-17T13:00:00",
          tags: ["Presentation", "Demo"]
        },
        {
          id: "img-7",
          image: "/content/assets/images/events/spring-innovation-2024/award-ceremony.jpg",
          caption: "Award ceremony - 2nd place win",
          timestamp: "2024-03-17T17:00:00",
          tags: ["Awards", "Winner"]
        }
      ],
      highlights: [
        "Live event coverage across 3 days",
        "Documented 12+ team presentations",
        "Captured 200+ event photos",
        "Created highlight reel video",
        "Won Best Documentation Award"
      ],
      stats: {
        totalImages: 7,
        durationDays: 3,
        teamsDocumented: 12,
        attendees: 150
      }
    },
    {
      id: "ai-healthcare-summit-2024",
      name: "AI in Healthcare Summit 2024",
      date: "2024-02-10",
      endDate: "2024-02-11",
      location: "Boston, MA",
      venue: "Medical Innovation Hub",
      role: "Event Photographer & Content Creator",
      description: "Documented cutting-edge AI healthcare applications and networking sessions",
      outcome: "Featured in official event recap video",
      category: "Conference",
      images: [
        {
          id: "img-1",
          image: "/content/assets/images/events/ai-healthcare-2024/summit-entrance.jpg",
          caption: "Summit entrance and registration",
          timestamp: "2024-02-10T08:00:00",
          tags: ["Entrance", "Registration"]
        },
        {
          id: "img-2",
          image: "/content/assets/images/events/ai-healthcare-2024/keynote-ai.jpg",
          caption: "AI in diagnostics keynote",
          timestamp: "2024-02-10T10:00:00",
          tags: ["Keynote", "AI", "Diagnostics"]
        },
        {
          id: "img-3",
          image: "/content/assets/images/events/ai-healthcare-2024/demo-booth.jpg",
          caption: "Interactive AI demo booth",
          timestamp: "2024-02-10T13:30:00",
          tags: ["Demo", "Interactive"]
        },
        {
          id: "img-4",
          image: "/content/assets/images/events/ai-healthcare-2024/panel-discussion.jpg",
          caption: "Expert panel on AI ethics",
          timestamp: "2024-02-10T15:00:00",
          tags: ["Panel", "Ethics"]
        },
        {
          id: "img-5",
          image: "/content/assets/images/events/ai-healthcare-2024/networking.jpg",
          caption: "Networking session",
          timestamp: "2024-02-11T11:00:00",
          tags: ["Networking", "Community"]
        }
      ],
      highlights: [
        "Covered 15+ speaker sessions",
        "Documented AI demo booths",
        "Captured networking moments",
        "Created social media content",
        "Featured in official recap"
      ],
      stats: {
        totalImages: 5,
        durationDays: 2,
        sessionsDocumented: 15,
        attendees: 500
      }
    },
    {
      id: "sustainability-hackathon-2023",
      name: "Sustainability Tech Hackathon 2023",
      date: "2023-09-22",
      endDate: "2023-09-24",
      location: "Seattle, WA",
      venue: "Green Tech Campus",
      role: "Team Documenter & Content Creator",
      description: "Documented team's journey building climate action technology solution",
      outcome: "2nd Place - Climate Impact Category",
      category: "Hackathon",
      images: [
        {
          id: "img-1",
          image: "/content/assets/images/events/sustainability-hack-2023/kickoff.jpg",
          caption: "Hackathon kickoff and team formation",
          timestamp: "2023-09-22T09:00:00",
          tags: ["Kickoff", "Team"]
        },
        {
          id: "img-2",
          image: "/content/assets/images/events/sustainability-hack-2023/ideation.jpg",
          caption: "Ideation and planning phase",
          timestamp: "2023-09-22T11:00:00",
          tags: ["Ideation", "Planning"]
        },
        {
          id: "img-3",
          image: "/content/assets/images/events/sustainability-hack-2023/development.jpg",
          caption: "Development in progress",
          timestamp: "2023-09-23T02:00:00",
          tags: ["Development", "Coding"]
        },
        {
          id: "img-4",
          image: "/content/assets/images/events/sustainability-hack-2023/testing.jpg",
          caption: "Testing and refinement",
          timestamp: "2023-09-23T18:00:00",
          tags: ["Testing", "QA"]
        },
        {
          id: "img-5",
          image: "/content/assets/images/events/sustainability-hack-2023/pitch.jpg",
          caption: "Final pitch presentation",
          timestamp: "2023-09-24T14:00:00",
          tags: ["Pitch", "Presentation"]
        },
        {
          id: "img-6",
          image: "/content/assets/images/events/sustainability-hack-2023/winners.jpg",
          caption: "2nd place celebration",
          timestamp: "2023-09-24T18:00:00",
          tags: ["Winners", "Celebration"]
        }
      ],
      highlights: [
        "Built climate action platform",
        "Documented 48-hour journey",
        "Created pitch deck visuals",
        "Won 2nd place in category",
        "Generated social media buzz"
      ],
      stats: {
        totalImages: 6,
        durationDays: 3,
        teamSize: 4,
        attendees: 200
      }
    },
    {
      id: "tech-conference-2023",
      name: "Future of Tech Conference 2023",
      date: "2023-11-08",
      endDate: "2023-11-10",
      location: "Austin, TX",
      venue: "Convention Center",
      role: "Freelance Event Photographer",
      description: "Professional photography coverage of major tech conference",
      outcome: "Photos used in official conference materials",
      category: "Conference",
      images: [
        {
          id: "img-1",
          image: "/content/assets/images/events/tech-conf-2023/main-stage.jpg",
          caption: "Main stage setup",
          timestamp: "2023-11-08T08:00:00",
          tags: ["Stage", "Setup"]
        },
        {
          id: "img-2",
          image: "/content/assets/images/events/tech-conf-2023/speaker-1.jpg",
          caption: "Opening keynote speaker",
          timestamp: "2023-11-08T10:00:00",
          tags: ["Keynote", "Speaker"]
        },
        {
          id: "img-3",
          image: "/content/assets/images/events/tech-conf-2023/expo-hall.jpg",
          caption: "Bustling expo hall",
          timestamp: "2023-11-08T14:00:00",
          tags: ["Expo", "Vendors"]
        },
        {
          id: "img-4",
          image: "/content/assets/images/events/tech-conf-2023/workshop.jpg",
          caption: "Hands-on workshop session",
          timestamp: "2023-11-09T11:00:00",
          tags: ["Workshop", "Hands-on"]
        },
        {
          id: "img-5",
          image: "/content/assets/images/events/tech-conf-2023/networking-party.jpg",
          caption: "Evening networking event",
          timestamp: "2023-11-09T19:00:00",
          tags: ["Networking", "Social"]
        },
        {
          id: "img-6",
          image: "/content/assets/images/events/tech-conf-2023/closing.jpg",
          caption: "Closing remarks",
          timestamp: "2023-11-10T16:00:00",
          tags: ["Closing", "Finale"]
        }
      ],
      highlights: [
        "Covered 3-day conference",
        "Photographed 30+ speakers",
        "Documented expo hall",
        "Captured networking events",
        "Photos in official materials"
      ],
      stats: {
        totalImages: 6,
        durationDays: 3,
        speakersCovered: 30,
        attendees: 2000
      }
    },
    {
      id: "startup-pitch-night-2024",
      name: "Startup Pitch Night 2024",
      date: "2024-01-25",
      location: "New York, NY",
      venue: "Innovation Loft",
      role: "Event Videographer & Photographer",
      description: "Captured startup pitches and investor interactions",
      outcome: "Created highlight reel for organizers",
      category: "Pitch Event",
      images: [
        {
          id: "img-1",
          image: "/content/assets/images/events/pitch-night-2024/venue-setup.jpg",
          caption: "Venue setup before event",
          timestamp: "2024-01-25T17:00:00",
          tags: ["Venue", "Setup"]
        },
        {
          id: "img-2",
          image: "/content/assets/images/events/pitch-night-2024/pitch-1.jpg",
          caption: "First startup pitch",
          timestamp: "2024-01-25T19:00:00",
          tags: ["Pitch", "Startup"]
        },
        {
          id: "img-3",
          image: "/content/assets/images/events/pitch-night-2024/qa-session.jpg",
          caption: "Investor Q&A session",
          timestamp: "2024-01-25T19:30:00",
          tags: ["Q&A", "Investors"]
        },
        {
          id: "img-4",
          image: "/content/assets/images/events/pitch-night-2024/networking.jpg",
          caption: "Post-pitch networking",
          timestamp: "2024-01-25T21:00:00",
          tags: ["Networking", "Connections"]
        }
      ],
      highlights: [
        "Documented 10 startup pitches",
        "Captured investor reactions",
        "Created 3-minute highlight reel",
        "Photographed networking",
        "Delivered same-day content"
      ],
      stats: {
        totalImages: 4,
        durationHours: 5,
        pitchesDocumented: 10,
        attendees: 80
      }
    }
  ]
};
  window.ContentPortfolioData = Object.assign(window.ContentPortfolioData || {}, data);
})();
