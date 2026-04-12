// Portfolio Discovery Features
// Recommendation system, skill explorer, professional journey timeline, and portfolio quiz

class PortfolioDiscovery {
    constructor() {
        this.userInterests = this.loadUserInterests();
        this.viewingHistory = this.loadViewingHistory();
        this.currentPortfolio = this.detectCurrentPortfolio();
        this.init();
    }

    detectCurrentPortfolio() {
        const path = window.location.pathname;
        if (path.includes('/gaming')) return 'gaming';
        if (path.includes('/content')) return 'content';
        return 'tech';
    }

    loadUserInterests() {
        return JSON.parse(localStorage.getItem('portfolioInterests') || '{}');
    }

    saveUserInterests() {
        localStorage.setItem('portfolioInterests', JSON.stringify(this.userInterests));
    }

    loadViewingHistory() {
        return JSON.parse(localStorage.getItem('portfolioViewingHistory') || '[]');
    }

    saveViewingHistory() {
        localStorage.setItem('portfolioViewingHistory', JSON.stringify(this.viewingHistory));
    }

    // Track user interactions for recommendations
    trackInteraction(type, data) {
        const interaction = {
            type,
            data,
            timestamp: Date.now(),
            portfolio: this.currentPortfolio
        };

        this.viewingHistory.push(interaction);
        
        // Keep only last 50 interactions
        if (this.viewingHistory.length > 50) {
            this.viewingHistory = this.viewingHistory.slice(-50);
        }

        this.saveViewingHistory();
        this.updateRecommendations();
    }

    // Portfolio recommendation system
    generateRecommendations() {
        const recommendations = [];
        const interests = this.analyzeUserInterests();

        // AI/Tech interest recommendations
        if (interests.ai || interests.tech) {
            if (this.currentPortfolio !== 'tech') {
                recommendations.push({
                    portfolio: 'tech',
                    title: 'AI & Development Projects',
                    description: 'Explore cutting-edge AI/ML projects and technical innovations',
                    confidence: interests.ai ? 0.9 : 0.7,
                    reasons: ['AI/ML interest detected', 'Technical project engagement'],
                    url: '/',
                    gradient: 'linear-gradient(135deg, #D4AF37, #FF8C42)',
                    icon: 'fas fa-brain'
                });
            }
        }

        // Gaming interest recommendations
        if (interests.gaming || interests.development) {
            if (this.currentPortfolio !== 'gaming') {
                recommendations.push({
                    portfolio: 'gaming',
                    title: 'Gaming Ecosystem',
                    description: 'Discover game development, testing, and gaming content creation',
                    confidence: interests.gaming ? 0.9 : 0.6,
                    reasons: ['Gaming content engagement', 'Development interest'],
                    url: '/gaming/',
                    gradient: 'linear-gradient(135deg, #FF4444, #FF8800, #FFDD00)',
                    icon: 'fas fa-gamepad'
                });
            }
        }

        // Content/Creative interest recommendations
        if (interests.content || interests.creative) {
            if (this.currentPortfolio !== 'content') {
                recommendations.push({
                    portfolio: 'content',
                    title: 'Content Creation',
                    description: 'Explore video production, design work, and creative campaigns',
                    confidence: interests.content ? 0.9 : 0.6,
                    reasons: ['Creative content interest', 'Video/design engagement'],
                    url: '/content/',
                    gradient: 'linear-gradient(135deg, #2C2C2C, #808080, #E8E8E8)',
                    icon: 'fas fa-video'
                });
            }
        }

        return recommendations.sort((a, b) => b.confidence - a.confidence);
    }

    analyzeUserInterests() {
        const interests = {
            ai: 0,
            tech: 0,
            gaming: 0,
            development: 0,
            content: 0,
            creative: 0
        };

        this.viewingHistory.forEach(interaction => {
            const { type, data, portfolio } = interaction;
            
            // Portfolio visits
            if (type === 'portfolio_visit') {
                interests[portfolio] += 0.3;
            }
            
            // Project views
            if (type === 'project_view') {
                if (data.category === 'AI Projects') interests.ai += 0.5;
                if (data.tech && data.tech.includes('Unity')) interests.gaming += 0.4;
                if (data.tech && data.tech.includes('Python')) interests.tech += 0.3;
                if (data.type === 'Video Production') interests.content += 0.5;
            }
            
            // Skill interactions
            if (type === 'skill_view') {
                if (data.skill.toLowerCase().includes('ai')) interests.ai += 0.2;
                if (data.skill.toLowerCase().includes('game')) interests.gaming += 0.2;
                if (data.skill.toLowerCase().includes('video')) interests.content += 0.2;
            }
        });

        return interests;
    }

    // Skill explorer showing connections across portfolios
    createSkillExplorer() {
        if (typeof window !== 'undefined' && window.SkillExplorerData) {
            return window.SkillExplorerData;
        }
        return {};
    }

    renderSkillExplorer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const skillConnections = this.createSkillExplorer();

        container.innerHTML = `
            <div class="skill-explorer">
                <h3 class="explorer-title">Skill Explorer</h3>
                <p class="explorer-description">Discover how skills connect across different portfolios</p>
                <div class="skill-connections-grid">
                    ${Object.entries(skillConnections).map(([skill, data]) => `
                        <div class="skill-connection-card">
                            <h4 class="skill-name"><i class="${data.icon}"></i> ${skill}</h4>
                            <p class="skill-description">${data.description}</p>
                            <div class="portfolio-connections">
                                ${['tech', 'gaming', 'content'].map(portfolio => `
                                    <div class="portfolio-connection ${portfolio === 'content' ? 'skill-col-content' : portfolio}">
                                        <div class="connection-header">
                                            <i class="${portfolio === 'tech' ? 'fas fa-code' : portfolio === 'gaming' ? 'fas fa-gamepad' : 'fas fa-video'}"></i>
                                            <span>${portfolio.charAt(0).toUpperCase() + portfolio.slice(1)}</span>
                                        </div>
                                        <div class="connection-media-list">
                                            ${(data[portfolio] || []).map(item => `
                                                <a href="${item.link}" class="media-card" ${item.externalLink ? 'target="_blank"' : ''}>
                                                    <div class="media-thumbnail">
                                                        ${item.image ? `<img src="${item.image}" alt="${item.title}" onerror="this.src='../assets/placeholder.jpg'" />` : '<div class="media-placeholder"></div>'}
                                                        ${item.type === 'video' ? '<div class="play-overlay"><i class="fas fa-play"></i></div>' : ''}
                                                    </div>
                                                    <div class="media-info">
                                                        <span class="media-title">${item.title}</span>
                                                    </div>
                                                </a>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        /* Styles come from shared/discovery-styles.css, plus dynamic media styling appended below */
        this.addSkillExplorerStyles();
    }

    // Professional journey timeline
    createProfessionalJourney() {
        return [
            {
                period: '2020-2022',
                title: 'Technical Foundation',
                portfolio: 'tech',
                description: 'Built expertise in AI/ML, full-stack development, and data science',
                highlights: [
                    'Developed AI-powered applications',
                    'Mastered Python and modern web technologies',
                    'Created data visualization and analysis tools'
                ],
                gradient: 'linear-gradient(135deg, #D4AF37, #FF8C42)',
                icon: 'fas fa-code'
            },
            {
                period: '2022-2024',
                title: 'Gaming Integration',
                portfolio: 'gaming',
                description: 'Applied technical skills to game development, testing, and gaming content',
                highlights: [
                    'Developed games in Unity and Unreal Engine',
                    'Specialized in QA testing methodologies',
                    'Created gaming educational content'
                ],
                gradient: 'linear-gradient(135deg, #FF4444, #FF8800, #FFDD00)',
                icon: 'fas fa-gamepad'
            },
            {
                period: '2024-Present',
                title: 'Creative Expansion',
                portfolio: 'content',
                description: 'Leveraged technical and gaming expertise for comprehensive content creation',
                highlights: [
                    'Produced brand videos and marketing campaigns',
                    'Developed creative processes and methodologies',
                    'Built partnerships across tech and gaming industries'
                ],
                gradient: 'linear-gradient(135deg, #2C2C2C, #808080, #E8E8E8)',
                icon: 'fas fa-video'
            }
        ];
    }

    renderProfessionalJourney(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const journey = this.createProfessionalJourney();

        container.innerHTML = `
            <div class="professional-journey">
                <h3 class="journey-title">Professional Journey</h3>
                <p class="journey-description">Explore the evolution of expertise across different domains</p>
                <div class="journey-timeline">
                    ${journey.map((phase, index) => `
                        <div class="journey-phase ${phase.portfolio}" onclick="portfolioDiscovery.navigateToPortfolio('${phase.portfolio}')">
                            <div class="phase-marker">
                                <div class="phase-icon" style="background: ${phase.gradient}">
                                    <i class="${phase.icon}"></i>
                                </div>
                                <div class="phase-line ${index < journey.length - 1 ? 'active' : ''}"></div>
                            </div>
                            <div class="phase-content">
                                <div class="phase-header">
                                    <span class="phase-period">${phase.period}</span>
                                    <h4 class="phase-title">${phase.title}</h4>
                                </div>
                                <p class="phase-description">${phase.description}</p>
                                <ul class="phase-highlights">
                                    ${phase.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                                </ul>
                                <button class="phase-explore-btn" style="background: ${phase.gradient}">
                                    Explore ${phase.title}
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.addJourneyStyles();
    }

    // Portfolio quiz to guide users
    createPortfolioQuiz() {
        return {
            title: "Discover Your Interest Area",
            description: "Take this quick quiz to find the most relevant portfolio section for you",
            questions: [
                {
                    id: 'interest',
                    question: "What type of projects interest you most?",
                    answers: [
                        { text: "AI/ML and innovative tech solutions", weight: { tech: 3, gaming: 1, content: 1 } },
                        { text: "Game development and interactive experiences", weight: { tech: 1, gaming: 3, content: 1 } },
                        { text: "Creative content and visual storytelling", weight: { tech: 1, gaming: 1, content: 3 } },
                        { text: "All of the above - I'm curious about everything!", weight: { tech: 2, gaming: 2, content: 2 } }
                    ]
                },
                {
                    id: 'role',
                    question: "Which role best describes your background or interests?",
                    answers: [
                        { text: "Developer, Engineer, or Data Scientist", weight: { tech: 3, gaming: 1, content: 0 } },
                        { text: "Game Developer, Designer, or QA Tester", weight: { tech: 1, gaming: 3, content: 1 } },
                        { text: "Content Creator, Marketer, or Creative Professional", weight: { tech: 0, gaming: 1, content: 3 } },
                        { text: "Business Professional or Decision Maker", weight: { tech: 2, gaming: 1, content: 2 } }
                    ]
                },
                {
                    id: 'goal',
                    question: "What are you hoping to find?",
                    answers: [
                        { text: "Technical expertise and innovative solutions", weight: { tech: 3, gaming: 0, content: 1 } },
                        { text: "Gaming projects and interactive entertainment", weight: { tech: 0, gaming: 3, content: 1 } },
                        { text: "Creative work and content examples", weight: { tech: 0, gaming: 1, content: 3 } },
                        { text: "Comprehensive professional capabilities", weight: { tech: 2, gaming: 2, content: 2 } }
                    ]
                }
            ]
        };
    }

    renderPortfolioQuiz(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const quiz = this.createPortfolioQuiz();
        let currentQuestion = 0;
        let answers = {};

        const renderQuestion = () => {
            const question = quiz.questions[currentQuestion];
            container.innerHTML = `
                <div class="portfolio-quiz">
                    <div class="quiz-header">
                        <h3 class="quiz-title">${quiz.title}</h3>
                        <p class="quiz-description">${quiz.description}</p>
                        <div class="quiz-progress">
                            <div class="progress-bar" style="width: ${((currentQuestion + 1) / quiz.questions.length) * 100}%"></div>
                        </div>
                    </div>
                    <div class="quiz-question">
                        <h4 class="question-text">${question.question}</h4>
                        <div class="question-answers">
                            ${question.answers.map((answer, index) => `
                                <button class="quiz-answer" onclick="portfolioDiscovery.selectQuizAnswer('${question.id}', ${index})">
                                    ${answer.text}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="quiz-navigation">
                        ${currentQuestion > 0 ? `<button class="quiz-nav-btn prev" onclick="portfolioDiscovery.prevQuizQuestion()">Previous</button>` : ''}
                        <span class="question-counter">${currentQuestion + 1} of ${quiz.questions.length}</span>
                    </div>
                </div>
            `;
        };

        this.quizData = { quiz, currentQuestion, answers, renderQuestion };
        renderQuestion();
        this.addQuizStyles();
    }

    selectQuizAnswer(questionId, answerIndex) {
        const { quiz, answers } = this.quizData;
        const question = quiz.questions.find(q => q.id === questionId);
        const selectedAnswer = question.answers[answerIndex];
        
        answers[questionId] = selectedAnswer;
        
        if (this.quizData.currentQuestion < quiz.questions.length - 1) {
            this.quizData.currentQuestion++;
            this.quizData.renderQuestion();
        } else {
            this.showQuizResults();
        }
    }

    prevQuizQuestion() {
        if (this.quizData.currentQuestion > 0) {
            this.quizData.currentQuestion--;
            this.quizData.renderQuestion();
        }
    }

    showQuizResults() {
        const { answers } = this.quizData;
        const scores = { tech: 0, gaming: 0, content: 0 };
        
        Object.values(answers).forEach(answer => {
            Object.entries(answer.weight).forEach(([portfolio, weight]) => {
                scores[portfolio] += weight;
            });
        });
        
        const sortedResults = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .map(([portfolio, score]) => ({ portfolio, score }));
        
        const topResult = sortedResults[0];
        const recommendations = this.getQuizRecommendations(topResult.portfolio, sortedResults);
        
        const container = document.getElementById('portfolio-quiz-container');
        container.innerHTML = `
            <div class="quiz-results">
                <div class="results-header">
                    <h3 class="results-title">Your Recommended Starting Point</h3>
                    <div class="top-recommendation">
                        <div class="recommendation-card ${topResult.portfolio}">
                            <div class="recommendation-icon">
                                <i class="${recommendations.primary.icon}"></i>
                            </div>
                            <h4 class="recommendation-title">${recommendations.primary.title}</h4>
                            <p class="recommendation-description">${recommendations.primary.description}</p>
                            <button class="recommendation-button" onclick="portfolioDiscovery.navigateToPortfolio('${topResult.portfolio}')" style="background: ${recommendations.primary.gradient}">
                                Explore ${recommendations.primary.title}
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="other-recommendations">
                    <h4 class="other-title">You might also be interested in:</h4>
                    <div class="other-grid">
                        ${recommendations.secondary.map(rec => `
                            <div class="other-recommendation" onclick="portfolioDiscovery.navigateToPortfolio('${rec.portfolio}')">
                                <i class="${rec.icon}"></i>
                                <span>${rec.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="quiz-actions">
                    <button class="quiz-restart" onclick="portfolioDiscovery.restartQuiz()">
                        <i class="fas fa-redo"></i> Take Quiz Again
                    </button>
                    <button class="quiz-explore-all" onclick="portfolioDiscovery.navigateToPortfolio('tech')">
                        <i class="fas fa-th"></i> Explore All Portfolios
                    </button>
                </div>
            </div>
        `;
    }

    getQuizRecommendations(primaryPortfolio, allResults) {
        const portfolioInfo = {
            tech: {
                title: 'Tech Portfolio',
                description: 'Perfect for exploring AI/ML projects, technical innovations, and development work',
                gradient: 'linear-gradient(135deg, #D4AF37, #FF8C42)',
                icon: 'fas fa-brain'
            },
            gaming: {
                title: 'Gaming Ecosystem',
                description: 'Ideal for discovering game development, testing expertise, and gaming content',
                gradient: 'linear-gradient(135deg, #FF4444, #FF8800, #FFDD00)',
                icon: 'fas fa-gamepad'
            },
            content: {
                title: 'Content Creation',
                description: 'Great for viewing creative work, video production, and brand partnerships',
                gradient: 'linear-gradient(135deg, #2C2C2C, #808080, #E8E8E8)',
                icon: 'fas fa-video'
            }
        };

        const primary = portfolioInfo[primaryPortfolio];
        const secondary = allResults.slice(1).map(result => ({
            portfolio: result.portfolio,
            ...portfolioInfo[result.portfolio]
        }));

        return { primary, secondary };
    }

    restartQuiz() {
        this.renderPortfolioQuiz('portfolio-quiz-container');
    }

    // Navigation helper
    navigateToPortfolio(portfolioType) {
        const urls = {
            'tech': '/',
            'gaming': '/gaming/',
            'content': '/content/'
        };

        const targetUrl = urls[portfolioType];
        if (targetUrl) {
            // Track the navigation
            this.trackInteraction('portfolio_navigation', { 
                from: this.currentPortfolio, 
                to: portfolioType,
                source: 'discovery_feature'
            });

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

    // Update recommendations based on user behavior
    updateRecommendations() {
        const recommendationContainer = document.getElementById('portfolio-recommendations');
        if (recommendationContainer) {
            this.renderRecommendations('portfolio-recommendations');
        }
    }

    renderRecommendations(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const recommendations = this.generateRecommendations();
        
        if (recommendations.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = `
            <div class="portfolio-recommendations">
                <h3 class="recommendations-title">Recommended for You</h3>
                <div class="recommendations-grid">
                    ${recommendations.map(rec => `
                        <div class="recommendation-card" onclick="portfolioDiscovery.navigateToPortfolio('${rec.portfolio}')">
                            <div class="rec-header" style="background: ${rec.gradient}">
                                <i class="${rec.icon}"></i>
                                <span class="rec-confidence">${Math.round(rec.confidence * 100)}% match</span>
                            </div>
                            <div class="rec-content">
                                <h4 class="rec-title">${rec.title}</h4>
                                <p class="rec-description">${rec.description}</p>
                                <div class="rec-reasons">
                                    ${rec.reasons.map(reason => `<span class="rec-reason">${reason}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.style.display = 'block';
        this.addRecommendationStyles();
    }

    // Add all necessary styles
    addSkillExplorerStyles() {
        if (document.getElementById('skill-explorer-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'skill-explorer-styles';
        styles.textContent = `
            .skill-explorer {
                padding: 2rem;
                background: rgba(15, 15, 25, 0.98);
                border-radius: 15px;
                margin: 2rem 0;
                border: 1px solid rgba(255, 255, 255, 0.12);
                overflow: hidden;
                isolation: isolate;
            }

            .explorer-title {
                font-size: 1.8rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                text-align: center;
                color: var(--text-primary, #ffffff);
            }

            .explorer-description {
                text-align: center;
                color: var(--text-secondary, #cccccc);
                margin-bottom: 2rem;
            }

            .skill-connections-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 2rem;
            }

            .skill-connection-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 1.5rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .skill-name {
                font-size: 1.3rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: var(--text-primary, #ffffff);
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .skill-description {
                font-size: 0.9rem;
                color: var(--text-secondary, #cccccc);
                text-align: center;
                margin-bottom: 1.5rem;
            }

            .portfolio-connections {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 1rem;
            }

            .portfolio-connection {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 1rem;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.1);
                min-width: 0;
            }

            .portfolio-connection:hover {
                background: rgba(255, 255, 255, 0.08);
            }

            .connection-header {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
                font-weight: 600;
                color: var(--text-primary, #ffffff);
            }

            .connection-media-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .media-card {
                display: flex;
                flex-direction: column;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
                overflow: hidden;
                text-decoration: none;
                transition: transform 0.2s, box-shadow 0.2s;
                border: 1px solid rgba(255, 255, 255, 0.05);
                min-width: 0;
            }

            .media-card:hover {
                transform: scale(1.02);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                border-color: rgba(255, 255, 255, 0.2);
            }

            .media-thumbnail {
                position: relative;
                width: 100%;
                height: 70px;
                background: #1a1a24;
            }

            .media-thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            .media-card:hover .media-thumbnail img {
                opacity: 1;
            }

            .media-placeholder {
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #2a2a35, #1a1a24);
            }

            .play-overlay {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.3);
                opacity: 0;
                transition: opacity 0.2s;
            }

            .play-overlay i {
                font-size: 1.5rem;
                color: white;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }

            .media-card:hover .play-overlay {
                opacity: 1;
            }

            .media-info {
                padding: 0.5rem;
            }

            .media-title {
                font-size: 0.8rem;
                color: #e0e0e0;
                font-weight: 500;
                line-height: 1.3;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                word-wrap: break-word; /* Prevents overflow blow-out */
            }

            @media (max-width: 992px) {
                .portfolio-connections {
                    grid-template-columns: 1fr;
                }

                .skill-connections-grid {
                    grid-template-columns: 1fr;
                }
                
                .portfolio-connection {
                    margin-bottom: 0.5rem;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    addJourneyStyles() {
        if (document.getElementById('journey-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'journey-styles';
        styles.textContent = `
            .professional-journey {
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                margin: 2rem 0;
            }

            .journey-title {
                font-size: 1.8rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                text-align: center;
                color: var(--text-primary, #ffffff);
            }

            .journey-description {
                text-align: center;
                color: var(--text-secondary, #cccccc);
                margin-bottom: 2rem;
            }

            .journey-timeline {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            .journey-phase {
                display: flex;
                gap: 2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 1rem;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .journey-phase:hover {
                background: rgba(255, 255, 255, 0.05);
                transform: translateX(10px);
            }

            .phase-marker {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-shrink: 0;
            }

            .phase-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }

            .phase-line {
                width: 2px;
                height: 100px;
                background: rgba(255, 255, 255, 0.2);
            }

            .phase-line.active {
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1));
            }

            .phase-content {
                flex: 1;
            }

            .phase-header {
                margin-bottom: 1rem;
            }

            .phase-period {
                font-size: 0.9rem;
                color: var(--text-secondary, #cccccc);
                font-weight: 500;
            }

            .phase-title {
                font-size: 1.3rem;
                font-weight: 600;
                color: var(--text-primary, #ffffff);
                margin: 0.25rem 0;
            }

            .phase-description {
                color: var(--text-secondary, #cccccc);
                margin-bottom: 1rem;
                line-height: 1.6;
            }

            .phase-highlights {
                list-style: none;
                padding: 0;
                margin: 0 0 1.5rem 0;
            }

            .phase-highlights li {
                color: var(--text-secondary, #cccccc);
                margin-bottom: 0.5rem;
                padding-left: 1rem;
                position: relative;
            }

            .phase-highlights li::before {
                content: '▸';
                position: absolute;
                left: 0;
                color: var(--accent-color, #D4AF37);
            }

            .phase-explore-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .phase-explore-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }

            @media (max-width: 768px) {
                .journey-phase {
                    flex-direction: column;
                    text-align: center;
                }
                
                .phase-line {
                    display: none;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    addQuizStyles() {
        if (document.getElementById('quiz-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'quiz-styles';
        styles.textContent = `
            .portfolio-quiz {
                max-width: 600px;
                margin: 0 auto;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .quiz-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .quiz-title {
                font-size: 1.8rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: var(--text-primary, #ffffff);
            }

            .quiz-description {
                color: var(--text-secondary, #cccccc);
                margin-bottom: 1.5rem;
            }

            .quiz-progress {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(135deg, #D4AF37, #FF8C42);
                transition: width 0.3s ease;
            }

            .quiz-question {
                margin-bottom: 2rem;
            }

            .question-text {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                color: var(--text-primary, #ffffff);
            }

            .question-answers {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .quiz-answer {
                padding: 1rem 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                color: var(--text-primary, #ffffff);
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
                font-size: 1rem;
            }

            .quiz-answer:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(5px);
            }

            .quiz-navigation {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .quiz-nav-btn {
                padding: 0.75rem 1.5rem;
                background: linear-gradient(135deg, #D4AF37, #FF8C42);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .quiz-nav-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
            }

            .question-counter {
                color: var(--text-secondary, #cccccc);
                font-weight: 500;
            }

            .quiz-results {
                text-align: center;
                padding: 2rem;
            }

            .results-title {
                font-size: 1.8rem;
                font-weight: 600;
                margin-bottom: 2rem;
                color: var(--text-primary, #ffffff);
            }

            .top-recommendation {
                margin-bottom: 2rem;
            }

            .recommendation-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 400px;
                margin: 0 auto;
            }

            .recommendation-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: var(--text-primary, #ffffff);
            }

            .recommendation-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: var(--text-primary, #ffffff);
            }

            .recommendation-description {
                color: var(--text-secondary, #cccccc);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }

            .recommendation-button {
                padding: 1rem 2rem;
                border: none;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }

            .recommendation-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }

            .other-recommendations {
                margin-bottom: 2rem;
            }

            .other-title {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 1rem;
                color: var(--text-primary, #ffffff);
            }

            .other-grid {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .other-recommendation {
                padding: 0.75rem 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-primary, #ffffff);
            }

            .other-recommendation:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }

            .quiz-actions {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .quiz-restart,
            .quiz-explore-all {
                padding: 0.75rem 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary, #ffffff);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .quiz-restart:hover,
            .quiz-explore-all:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            @media (max-width: 768px) {
                .portfolio-quiz {
                    padding: 1rem;
                }
                
                .quiz-actions {
                    flex-direction: column;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    addRecommendationStyles() {
        if (document.getElementById('recommendation-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'recommendation-styles';
        styles.textContent = `
            .portfolio-recommendations {
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                margin: 2rem 0;
            }

            .recommendations-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                text-align: center;
                color: var(--text-primary, #ffffff);
            }

            .recommendations-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            }

            .recommendation-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .recommendation-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }

            .rec-header {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: white;
            }

            .rec-confidence {
                font-size: 0.8rem;
                font-weight: 600;
                background: rgba(255, 255, 255, 0.2);
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
            }

            .rec-content {
                padding: 1.5rem;
            }

            .rec-title {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: var(--text-primary, #ffffff);
            }

            .rec-description {
                color: var(--text-secondary, #cccccc);
                margin-bottom: 1rem;
                line-height: 1.5;
            }

            .rec-reasons {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }

            .rec-reason {
                font-size: 0.8rem;
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-secondary, #cccccc);
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
            }
        `;

        document.head.appendChild(styles);
    }

    // Initialize discovery features
    init() {
        // Track portfolio visit
        this.trackInteraction('portfolio_visit', { portfolio: this.currentPortfolio });
        
        console.log('🔍 Portfolio Discovery initialized for:', this.currentPortfolio);
    }
}

// Initialize portfolio discovery
let portfolioDiscovery;

document.addEventListener('DOMContentLoaded', () => {
    portfolioDiscovery = new PortfolioDiscovery();
});

// Make available globally
window.PortfolioDiscovery = PortfolioDiscovery;
window.portfolioDiscovery = portfolioDiscovery;