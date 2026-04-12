// Chatbot functionality for Gaston's Portfolio
// Chatbot functionality for Gaston's Portfolio
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.currentPortfolio = this.detectCurrentPortfolio();
        this.init();
    }

    // Detect which portfolio the user is currently viewing
    detectCurrentPortfolio() {
        const path = window.location.pathname;
        const hostname = window.location.hostname;
        
        // Check for gaming portfolio
        if (path.includes('/gaming/') || path.includes('gaming')) {
            return 'gaming';
        }
        
        // Check for content creation portfolio
        if (path.includes('/content/') || path.includes('content')) {
            return 'content';
        }
        
        // Default to main portfolio
        return 'main';
    }

    // Get portfolio-specific context and suggestions
    getPortfolioContext() {
        switch (this.currentPortfolio) {
            case 'gaming':
                return {
                    title: "Ask me about Gaston's gaming work",
                    welcome: "👋 Hi! I'm Gaston's AI assistant. I can help you learn about his gaming projects, game development experience, and QA testing expertise.",
                    suggestions: [
                        { text: "🎮 Game Development", question: "Tell me about Gaston's game development experience with Unity and Unreal Engine" },
                        { text: "🧪 QA Testing", question: "What QA testing experience does Gaston have?" },
                        { text: "📺 Gaming Content", question: "Tell me about Gaston's gaming content creation and streaming" },
                        { text: "🎯 Current Games", question: "What games is Gaston currently playing?" }
                    ]
                };
            case 'content':
                return {
                    title: "Ask me about Gaston's content creation",
                    welcome: "👋 Hi! I'm Gaston's AI assistant. I can help you learn about his content creation projects, brand partnerships, and educational content.",
                    suggestions: [
                        { text: "📹 Video Production", question: "Tell me about Gaston's video production and YouTube content" },
                        { text: "🤝 Brand Partnerships", question: "What brand partnerships and collaborations has Gaston worked on?" },
                        { text: "🎓 Educational Content", question: "Tell me about Gaston's educational tutorials and mentorship" },
                        { text: "📱 Social Media", question: "Tell me about Gaston's social media strategy and LinkedIn posts" }
                    ]
                };
            default:
                return {
                    title: "Ask me about Gaston's work",
                    welcome: "👋 Hi! I'm Gaston's AI assistant. I can help you learn about his projects, skills, and experience.",
                    suggestions: [
                        { text: "🤖 AI Projects", question: "What are Gaston's main AI projects?" },
                        { text: "🔍 RAG Systems", question: "Tell me about his RAG systems experience" },
                        { text: "🏆 Hackathons", question: "What hackathons has he participated in?" },
                        { text: "📧 Contact Info", question: "How can I contact Gaston?" }
                    ]
                };
        }
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.loadWelcomeMessage();
        this.startPortfolioMonitoring();
    }

    // Monitor for portfolio changes (e.g., when user navigates)
    startPortfolioMonitoring() {
        // Check for portfolio changes every 2 seconds
        setInterval(() => {
            this.updatePortfolioContext();
        }, 2000);
        
        // Also check on window focus (when user returns to tab)
        window.addEventListener('focus', () => {
            this.updatePortfolioContext();
        });
    }

    // Add centralized API URL helper
    getApiBaseUrl() {
        // Check for Vercel environment first
        if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_VERCEL_ENV) {
            if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
                return 'https://portfolio-production-b1b4.up.railway.app/api';
            }
        }
        
        // Fallback: detect from current window
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:5000/api';  // ✅ Fixed: was 3001
        }
        
        return 'https://portfolio-production-b1b4.up.railway.app/api';
    }

    createChatbotHTML() {
        const context = this.getPortfolioContext();
        const suggestionsHTML = context.suggestions.map(suggestion => 
            `<div class="suggested-question" data-question="${suggestion.question}">
                ${suggestion.text}
            </div>`
        ).join('');

        const chatbotHTML = `
            <div id="chatbot-overlay" class="chatbot-overlay">
                <div class="chatbot-container">
                    <div class="chatbot-header">
                        <h3 class="chatbot-title">
                            <i class="fas fa-robot"></i>
                            ${context.title}
                        </h3>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="welcome-message">
                            <p>${context.welcome}</p>
                            <div class="suggested-questions">
                                ${suggestionsHTML}
                            </div>
                        </div>
                    </div>
                    <div class="chatbot-input-area">
                        <div class="chatbot-input-container">
                            <textarea 
                                id="chatbot-input" 
                                class="chatbot-input" 
                                placeholder="Ask me anything about Gaston's work..."
                                rows="1"
                            ></textarea>
                            <button id="chatbot-send" class="chatbot-send">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const overlay = document.getElementById('chatbot-overlay');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        // Close chatbot
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        // Send message
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        });

        // Suggested questions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggested-question')) {
                const question = e.target.getAttribute('data-question');
                input.value = question;
                this.sendMessage();
            }
        });
    }

    loadWelcomeMessage() {
        // Welcome message is already in HTML
    }

    // Update portfolio context when user navigates
    updatePortfolioContext() {
        const newPortfolio = this.detectCurrentPortfolio();
        if (newPortfolio !== this.currentPortfolio) {
            console.log(`🔄 Portfolio context changed: ${this.currentPortfolio} → ${newPortfolio}`);
            this.currentPortfolio = newPortfolio;
            
            // Update chatbot UI if open
            if (this.isOpen) {
                this.refreshChatbotUI();
            }
        }
    }

    // Refresh chatbot UI with new portfolio context
    refreshChatbotUI() {
        const context = this.getPortfolioContext();
        
        // Update title
        const titleElement = document.querySelector('.chatbot-title');
        if (titleElement) {
            titleElement.innerHTML = `<i class="fas fa-robot"></i> ${context.title}`;
        }
        
        // Add context switch message
        this.addMessage(`🔄 Switched to ${this.currentPortfolio} portfolio context. ${context.welcome.replace('👋 Hi! I\'m Gaston\'s AI assistant. ', '')}`, 'bot');
    }

    open() {
        // Update portfolio context when opening
        this.updatePortfolioContext();
        
        const overlay = document.getElementById('chatbot-overlay');
        overlay.classList.add('active');
        this.isOpen = true;
        
        // Focus input after animation
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 300);
    }

    close() {
        const overlay = document.getElementById('chatbot-overlay');
        overlay.classList.remove('active');
        this.isOpen = false;
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        input.style.height = 'auto';

        // Show typing indicator
        this.showTyping();

        try {
            // Send to backend
            const response = await this.callChatbotAPI(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTyping();
            this.addMessage("I'm having trouble connecting right now. Please try again later or contact Gaston directly!", 'bot');
        }
    }

    async callChatbotAPI(message) {
        // Use centralized API URL
        try {
            const apiBaseUrl = this.getApiBaseUrl();
            const apiUrl = `${apiBaseUrl}/chat`;
            
            console.log('🤖 Calling chatbot API:', apiUrl);
            console.log('🎯 Current portfolio context:', this.currentPortfolio);
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: message,
                    portfolio_context: this.currentPortfolio
                })
            });

            console.log('📡 API Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error:', response.status, errorText);
                throw new Error('API request failed');
            }

            const data = await response.json();
            console.log('✅ API Success:', data);
            return data.response;
        } catch (error) {
            console.error('❌ Backend error details:', error);
            return this.getLocalResponse(message);
        }
    }

    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Portfolio-specific responses
        if (this.currentPortfolio === 'gaming') {
            if (lowerMessage.includes('gaming') || lowerMessage.includes('game development')) {
                return "🎮 Gaston has extensive game development experience! He's expert in Unity (C# scripting, 2D/3D, VR/AR), intermediate in Unreal Engine (Blueprint, VR), and works with Godot (GDScript). He's participated in 7+ game jams with multiple placements and specializes in procedural generation and game AI.";
            }
            if (lowerMessage.includes('current') || lowerMessage.includes('playing')) {
                return "🎮 Gaston is currently playing Raid Shadow Legends as an active daily player, focusing on team composition and strategy optimization. He's also highly excited about the upcoming Ghost of Yotei, following development updates closely!";
            }
        }
        
        if (this.currentPortfolio === 'content') {
            if (lowerMessage.includes('content') || lowerMessage.includes('video')) {
                return "📹 Gaston creates comprehensive technical content including YouTube tutorials, LinkedIn thought leadership posts, and educational videos. His recent work includes AI Room Designer campaign content, Planetrics dashboard showcases, and Unity development tutorials with thousands of views.";
            }
            if (lowerMessage.includes('recent') || lowerMessage.includes('latest')) {
                return "📺 Gaston's most recent content includes the 'Rooms Through Time - AI Interior Design Revolution' video, Planetrics data visualization showcase on LinkedIn, and comprehensive NASA project case studies. His content focuses on making complex AI/ML concepts accessible to developers.";
            }
        }
        
        // Project-specific responses
        if (lowerMessage.includes('peata')) {
            return "🐕 Peata is one of Gaston's flagship AI projects! It's a character-driven, RAG-backed virtual assistant designed for pet recovery. The system uses image-matching and conversational AI to help reunite lost pets with their families. Built with Python and advanced RAG systems, it showcases Gaston's ability to create emotionally intelligent AI solutions.";
        }
        
        if (lowerMessage.includes('relic')) {
            return "🏛️ Relic is a fascinating AI archaeological research assistant! It's a persona-driven, RAG-backed system that serves as an interactive digital field guide. The project uses SRTM, Sentinel-2, OpenTopography, and Google Earth data to help researchers explore archaeological sites. It demonstrates Gaston's expertise in combining AI with geospatial analysis.";
        }
        
        if (lowerMessage.includes('stargate')) {
            return "🎮 Project Stargate is all about gaming mentorship! Gaston created interactive digital personas for gaming coaching and player development. It's a unique blend of AI agents and gaming expertise, showing how AI can enhance human learning and development in gaming contexts.";
        }
        
        if (lowerMessage.includes('nasa') || lowerMessage.includes('space')) {
            return "🚀 Gaston has worked on several NASA-related projects! His NASA Knowledge Graph maps biological/omics data into Neo4j for contextual health reasoning for astronauts. He also built Astro Archive with memory-aware agents for space data, and Planetrics - an interactive dashboard visualizing NASA's 6,000+ exoplanet catalog. His SESA proposal was submitted to NASA!";
        }
        
        if (lowerMessage.includes('ai room designer') || lowerMessage.includes('room designer') || lowerMessage.includes('rooms through time')) {
            return "🏠 The AI Room Designer (Rooms Through Time) is Gaston's latest multi-modal AI platform! It features dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Built with React, Python, FastAPI, Gemini 2.5 Flash for redesign, Fal.ai for 3D reconstruction, ElevenLabs for voice narration, and includes a local gpt-oss agent for offline AI consultation!";
        }
        
        if (lowerMessage.includes('rag') || lowerMessage.includes('retrieval')) {
            return "🔍 Gaston is an expert in RAG (Retrieval-Augmented Generation) systems! He's implemented RAG in multiple projects like Peata (pet recovery), Relic (archaeological research), and others. His RAG systems combine document retrieval with generative AI to create context-aware, intelligent assistants.";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
            return "📧 You can reach Gaston through:\n\n• LinkedIn: https://www.linkedin.com/in/gaston-d-859653184/\n• GitHub: https://github.com/gastondana627\n• Email: Use the contact form on this website\n\nHe's always open to discussing AI projects, collaboration opportunities, or mentorship!";
        }
        
        if (lowerMessage.includes('project') && (lowerMessage.includes('main') || lowerMessage.includes('top'))) {
            return "🚀 Gaston's main projects include Peata (pet recovery), Relic (archaeological research), NASA Knowledge Graph, AI Room Designer, Planetrics (exoplanet dashboard), Astro Archive (space data agents), and Project Stargate (gaming mentorship). Each showcases different AI/ML capabilities!";
        }

        const defaultResponses = [
            "That's an interesting question! Gaston has worked on many AI projects involving RAG systems, multi-agent architectures, and knowledge graphs. Could you be more specific about what you'd like to know?",
            "I'd love to help you learn more about Gaston's work! He specializes in AI/ML engineering with projects ranging from pet recovery systems to NASA space data analysis. What specific area interests you?",
            "Gaston's portfolio spans gaming AI, archaeological research tools, space data systems, and more! Feel free to ask about any specific project, skill, or experience you're curious about."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatar = sender === 'user' ? '👤' : '🤖';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${content}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ content, sender, timestamp: new Date() });
    }

    showTyping() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <span>Thinking</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        document.getElementById('chatbot-send').disabled = true;
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        document.getElementById('chatbot-send').disabled = false;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioChatbot = new PortfolioChatbot();
});

// Global function to open chatbot (called from graph.js)
window.openChatbot = function() {
    if (window.portfolioChatbot) {
        window.portfolioChatbot.open();
    }
};
