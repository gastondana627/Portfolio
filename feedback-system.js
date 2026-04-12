/**
 * User Feedback Collection System
 * Collects feedback on multi-portfolio experience
 */

class FeedbackSystem {
    constructor() {
        this.feedbackData = [];
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.createFeedbackWidget();
        this.trackUserBehavior();
        this.isInitialized = true;
        console.log('📝 Feedback system initialized');
    }

    createFeedbackWidget() {
        // Create floating feedback button
        const feedbackButton = document.createElement('div');
        feedbackButton.id = 'feedback-widget';
        feedbackButton.innerHTML = `
            <div class="feedback-button" onclick="feedbackSystem.showFeedbackModal()">
                💬 Feedback
            </div>
        `;
        
        // Add styles
        const styles = `
            <style>
                #feedback-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                }
                
                .feedback-button {
                    background: linear-gradient(135deg, #D4AF37, #FF8C42);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
                    transition: all 0.3s ease;
                    user-select: none;
                }
                
                .feedback-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
                }
                
                .feedback-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10001;
                }
                
                .feedback-content {
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .feedback-content h3 {
                    color: #333;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .feedback-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                
                .feedback-form label {
                    color: #555;
                    font-weight: 500;
                }
                
                .feedback-form input,
                .feedback-form select,
                .feedback-form textarea {
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.3s;
                }
                
                .feedback-form input:focus,
                .feedback-form select:focus,
                .feedback-form textarea:focus {
                    outline: none;
                    border-color: #D4AF37;
                }
                
                .feedback-form textarea {
                    resize: vertical;
                    min-height: 100px;
                }
                
                .rating-container {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
                
                .star-rating {
                    display: flex;
                    gap: 5px;
                }
                
                .star {
                    font-size: 24px;
                    color: #ddd;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                
                .star.active,
                .star:hover {
                    color: #FFD700;
                }
                
                .button-group {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                }
                
                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #D4AF37, #FF8C42);
                    color: white;
                }
                
                .btn-secondary {
                    background: #f5f5f5;
                    color: #333;
                }
                
                .btn:hover {
                    transform: translateY(-1px);
                }
                
                @media (max-width: 768px) {
                    .feedback-content {
                        padding: 20px;
                        margin: 20px;
                    }
                    
                    #feedback-widget {
                        bottom: 10px;
                        right: 10px;
                    }
                    
                    .feedback-button {
                        padding: 10px 16px;
                        font-size: 12px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(feedbackButton);
    }

    showFeedbackModal() {
        const currentPortfolio = this.detectCurrentPortfolio();
        
        const modal = document.createElement('div');
        modal.className = 'feedback-modal';
        modal.innerHTML = `
            <div class="feedback-content">
                <h3>Share Your Feedback</h3>
                <p style="color: #666; text-align: center; margin-bottom: 20px;">
                    Help us improve your portfolio browsing experience
                </p>
                
                <form class="feedback-form" onsubmit="feedbackSystem.submitFeedback(event)">
                    <div>
                        <label>Current Portfolio Section:</label>
                        <select name="portfolio" required>
                            <option value="tech" ${currentPortfolio === 'tech' ? 'selected' : ''}>Tech Portfolio</option>
                            <option value="gaming" ${currentPortfolio === 'gaming' ? 'selected' : ''}>Gaming Ecosystem</option>
                            <option value="content" ${currentPortfolio === 'content' ? 'selected' : ''}>Content Creation</option>
                        </select>
                    </div>
                    
                    <div>
                        <label>Overall Experience Rating:</label>
                        <div class="rating-container">
                            <div class="star-rating" data-rating="0">
                                <span class="star" data-value="1">★</span>
                                <span class="star" data-value="2">★</span>
                                <span class="star" data-value="3">★</span>
                                <span class="star" data-value="4">★</span>
                                <span class="star" data-value="5">★</span>
                            </div>
                            <span class="rating-text">Click to rate</span>
                        </div>
                        <input type="hidden" name="rating" required>
                    </div>
                    
                    <div>
                        <label>What did you like most?</label>
                        <select name="liked_most">
                            <option value="">Select an option</option>
                            <option value="navigation">Easy navigation between portfolios</option>
                            <option value="design">Visual design and animations</option>
                            <option value="content">Content organization</option>
                            <option value="performance">Fast loading and performance</option>
                            <option value="ai_chatbot">AI chatbot interaction</option>
                            <option value="knowledge_graph">Interactive knowledge graph</option>
                            <option value="cross_connections">Cross-portfolio connections</option>
                        </select>
                    </div>
                    
                    <div>
                        <label>Any issues or suggestions?</label>
                        <textarea name="feedback" placeholder="Tell us about any problems you encountered or suggestions for improvement..."></textarea>
                    </div>
                    
                    <div>
                        <label>How did you discover this portfolio?</label>
                        <select name="discovery_method">
                            <option value="">Select an option</option>
                            <option value="search">Search engine</option>
                            <option value="social_media">Social media</option>
                            <option value="referral">Referral from someone</option>
                            <option value="direct">Direct link</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="feedbackSystem.closeFeedbackModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add star rating functionality
        this.initStarRating(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeFeedbackModal();
            }
        });
    }

    initStarRating(modal) {
        const starRating = modal.querySelector('.star-rating');
        const stars = starRating.querySelectorAll('.star');
        const ratingInput = modal.querySelector('input[name="rating"]');
        const ratingText = modal.querySelector('.rating-text');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                ratingInput.value = rating;
                starRating.dataset.rating = rating;
                
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i < rating);
                });
                
                const ratingTexts = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
                ratingText.textContent = ratingTexts[index];
            });
            
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    s.style.color = i <= index ? '#FFD700' : '#ddd';
                });
            });
        });
        
        starRating.addEventListener('mouseleave', () => {
            const currentRating = parseInt(starRating.dataset.rating) || 0;
            stars.forEach((s, i) => {
                s.style.color = i < currentRating ? '#FFD700' : '#ddd';
            });
        });
    }

    detectCurrentPortfolio() {
        const path = window.location.pathname;
        if (path.includes('/gaming')) return 'gaming';
        if (path.includes('/content')) return 'content';
        return 'tech';
    }

    async submitFeedback(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const feedback = {
            timestamp: new Date().toISOString(),
            portfolio: formData.get('portfolio'),
            rating: parseInt(formData.get('rating')),
            liked_most: formData.get('liked_most'),
            feedback: formData.get('feedback'),
            discovery_method: formData.get('discovery_method'),
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            referrer: document.referrer,
            session_id: this.getSessionId()
        };
        
        try {
            // Store feedback locally
            this.feedbackData.push(feedback);
            localStorage.setItem('portfolio_feedback', JSON.stringify(this.feedbackData));
            
            // Send to backend if available
            await this.sendFeedbackToBackend(feedback);
            
            this.showThankYouMessage();
            this.closeFeedbackModal();
            
            console.log('📝 Feedback submitted:', feedback);
        } catch (error) {
            console.error('❌ Failed to submit feedback:', error);
            alert('Sorry, there was an error submitting your feedback. Please try again.');
        }
    }

    async sendFeedbackToBackend(feedback) {
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.warn('Backend feedback submission failed, storing locally:', error);
            // Fallback to local storage only
        }
    }

    showThankYouMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 10002;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        message.innerHTML = '✅ Thank you for your feedback!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    closeFeedbackModal() {
        const modal = document.querySelector('.feedback-modal');
        if (modal) {
            modal.remove();
        }
    }

    trackUserBehavior() {
        // Track portfolio navigation patterns
        let navigationPath = [];
        
        // Track page views
        const trackPageView = () => {
            const currentPortfolio = this.detectCurrentPortfolio();
            navigationPath.push({
                portfolio: currentPortfolio,
                timestamp: Date.now(),
                url: window.location.href
            });
            
            // Keep only last 10 navigation events
            if (navigationPath.length > 10) {
                navigationPath.shift();
            }
            
            localStorage.setItem('navigation_path', JSON.stringify(navigationPath));
        };
        
        // Initial page view
        trackPageView();
        
        // Track navigation changes
        let lastUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== lastUrl) {
                lastUrl = window.location.href;
                trackPageView();
            }
        }, 1000);
        
        // Track time spent on page
        this.trackTimeSpent();
    }

    trackTimeSpent() {
        const startTime = Date.now();
        let isActive = true;
        
        // Track when user becomes inactive
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        let lastActivity = Date.now();
        
        events.forEach(event => {
            document.addEventListener(event, () => {
                lastActivity = Date.now();
                isActive = true;
            });
        });
        
        // Check for inactivity
        setInterval(() => {
            if (Date.now() - lastActivity > 30000) { // 30 seconds
                isActive = false;
            }
        }, 5000);
        
        // Save time spent when leaving page
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            const portfolio = this.detectCurrentPortfolio();
            
            const timeData = {
                portfolio,
                timeSpent,
                timestamp: new Date().toISOString(),
                wasActive: isActive
            };
            
            localStorage.setItem('last_session_time', JSON.stringify(timeData));
        });
    }

    getSessionId() {
        let sessionId = localStorage.getItem('portfolio_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('portfolio_session_id', sessionId);
        }
        return sessionId;
    }

    // Analytics methods
    getFeedbackSummary() {
        const feedback = JSON.parse(localStorage.getItem('portfolio_feedback') || '[]');
        
        if (feedback.length === 0) {
            return { message: 'No feedback collected yet' };
        }
        
        const avgRating = feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length;
        const portfolioBreakdown = feedback.reduce((acc, f) => {
            acc[f.portfolio] = (acc[f.portfolio] || 0) + 1;
            return acc;
        }, {});
        
        const likedMost = feedback.reduce((acc, f) => {
            if (f.liked_most) {
                acc[f.liked_most] = (acc[f.liked_most] || 0) + 1;
            }
            return acc;
        }, {});
        
        return {
            totalFeedback: feedback.length,
            averageRating: avgRating.toFixed(1),
            portfolioBreakdown,
            likedMost,
            recentFeedback: feedback.slice(-5)
        };
    }

    exportFeedbackData() {
        const feedback = JSON.parse(localStorage.getItem('portfolio_feedback') || '[]');
        const navigationData = JSON.parse(localStorage.getItem('navigation_path') || '[]');
        
        const exportData = {
            feedback,
            navigationData,
            summary: this.getFeedbackSummary(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-feedback-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize feedback system
let feedbackSystem;

document.addEventListener('DOMContentLoaded', () => {
    feedbackSystem = new FeedbackSystem();
    
    // Make it globally available for debugging
    window.feedbackSystem = feedbackSystem;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackSystem;
}