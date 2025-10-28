// Chatbot functionality for Gaston's Portfolio
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.loadWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-overlay" class="chatbot-overlay">
                <div class="chatbot-container">
                    <div class="chatbot-header">
                        <h3 class="chatbot-title">
                            <i class="fas fa-robot"></i>
                            Ask me about Gaston's work
                        </h3>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="welcome-message">
                            <p>👋 Hi! I'm Gaston's AI assistant. I can help you learn about his projects, skills, and experience.</p>
                            <div class="suggested-questions">
                                <div class="suggested-question" data-question="What are Gaston's main AI projects?">
                                    🤖 AI Projects
                                </div>
                                <div class="suggested-question" data-question="Tell me about his RAG systems experience">
                                    🔍 RAG Systems
                                </div>
                                <div class="suggested-question" data-question="What hackathons has he participated in?">
                                    🏆 Hackathons
                                </div>
                                <div class="suggested-question" data-question="How can I contact Gaston?">
                                    📧 Contact Info
                                </div>
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

    open() {
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
        // Try backend first, fallback to local responses
        try {
            const apiUrl = window.location.hostname === 'localhost' 
                ? 'http://localhost:3001/api/chat'
                : '/api/chat';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.log('Backend unavailable, using local responses');
            return this.getLocalResponse(message);
        }
    }

    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
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
            return "🚀 Gaston has worked on several NASA-related projects! His NASA Knowledge Graph maps biological/omics data into Neo4j for contextual health reasoning for astronauts. He also built Astro Archive with memory-aware agents for space data, and Planetrics - an interactive dashboard visualizing NASA's 6,000+ exoplanet catalog. His SESA proposal even got submitted to NASA!";
        }
        
        if (lowerMessage.includes('ai room designer') || lowerMessage.includes('room designer')) {
            return "🏠 The AI Room Designer is Gaston's latest multi-modal AI platform! It features dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Built with React, Python, Gemini 2.5 Flash, Fal.ai for 3D reconstruction, and ElevenLabs for voice narration. It even includes a local gpt-oss agent for offline AI consultation!";
        }

        // Skills-based responses
        if (lowerMessage.includes('rag') || lowerMessage.includes('retrieval')) {
            return "🔍 Gaston is an expert in RAG (Retrieval-Augmented Generation) systems! He's implemented RAG in multiple projects like Peata (pet recovery), Relic (archaeological research), and others. His RAG systems combine document retrieval with generative AI to create context-aware, intelligent assistants that can provide accurate, source-backed responses.";
        }
        
        if (lowerMessage.includes('python')) {
            return "🐍 Python is Gaston's primary programming language! He's used it extensively across all his AI projects - from building RAG systems and multi-agent architectures to data processing and API development. His Python expertise spans Flask, Django, Streamlit, and various AI/ML libraries.";
        }
        
        if (lowerMessage.includes('neo4j') || lowerMessage.includes('knowledge graph')) {
            return "🕸️ Gaston has advanced expertise in Neo4j and knowledge graphs! His NASA Knowledge Graph project mapped complex biological data into Neo4j for astronaut health reasoning. He understands how to structure, query, and leverage graph databases for contextual AI applications.";
        }

        // General questions
        if (lowerMessage.includes('hackathon')) {
            return "🏆 Gaston is an active hackathon participant with 7+ competitions under his belt! He's achieved multiple placements and uses hackathons to rapidly prototype innovative AI solutions. His hackathon projects often evolve into larger portfolio pieces, showing his ability to quickly build and iterate on ideas.";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
            return "📧 You can reach Gaston through several channels:\n\n• LinkedIn: https://www.linkedin.com/in/gaston-d-859653184/\n• GitHub: https://github.com/gastondana627\n• Email: Use the contact form on this website\n\nHe's always open to discussing AI projects, collaboration opportunities, or mentorship!";
        }
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
            return "💼 Gaston is a Full-Stack Developer & AI Engineer with experience at Reality AI Lab and AdvancingX. He specializes in building production-ready AI/ML systems, particularly RAG-backed applications and multi-agent systems. He's also active in mentorship through Ambition in Motion (NSCS partnership) and ALPFA community engagement.";
        }
        
        if (lowerMessage.includes('project') && (lowerMessage.includes('main') || lowerMessage.includes('top') || lowerMessage.includes('best'))) {
            return "🚀 Gaston's main AI projects include:\n\n• **Peata** - RAG-backed pet recovery assistant\n• **Relic** - AI archaeological research tool\n• **NASA Knowledge Graph** - Biological data mapping for astronaut health\n• **AI Room Designer** - Multi-modal interior design platform\n• **Astro Archive** - Memory-aware coaching agents\n• **Planetrics** - NASA exoplanet visualization dashboard\n\nEach project showcases different aspects of his AI expertise!";
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "🛠️ Gaston's core technical skills include:\n\n**AI/ML:** RAG Systems (Expert), Multi-Agent Systems (Expert), Computer Vision (Advanced)\n**Languages:** Python (Expert), JavaScript (Advanced), React (Advanced)\n**Databases:** Neo4j (Expert), MongoDB (Advanced)\n**Cloud:** GCP/AWS (Advanced), Docker/DevOps (Intermediate)\n\nHe specializes in building intelligent systems that bridge human creativity and machine precision!";
        }

        // Default responses
        const defaultResponses = [
            "That's an interesting question! Gaston has worked on many AI projects involving RAG systems, multi-agent architectures, and knowledge graphs. Could you be more specific about what you'd like to know?",
            "I'd love to help you learn more about Gaston's work! He specializes in AI/ML engineering with projects ranging from pet recovery systems to NASA space data analysis. What specific area interests you?",
            "Gaston's portfolio spans gaming AI, archaeological research tools, space data systems, and more! Feel free to ask about any specific project, skill, or experience you're curious about.",
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
        
        // Disable send button
        document.getElementById('chatbot-send').disabled = true;
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        // Re-enable send button
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