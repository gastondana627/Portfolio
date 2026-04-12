// Cross-Portfolio Analytics Tracking System
// Privacy-compliant user behavior analytics for the multi-portfolio ecosystem

class PortfolioAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.currentPortfolio = this.detectCurrentPortfolio();
        this.startTime = Date.now();
        this.events = [];
        this.privacyConsent = this.checkPrivacyConsent();
        this.isEnabled = this.privacyConsent && !this.isDoNotTrack();
        
        if (this.isEnabled) {
            this.init();
        }
    }

    // Generate unique session identifier
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get or create anonymous user identifier
    getUserId() {
        let userId = localStorage.getItem('portfolio_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('portfolio_user_id', userId);
        }
        return userId;
    }

    // Detect current portfolio context
    detectCurrentPortfolio() {
        const path = window.location.pathname;
        if (path.includes('/gaming')) return 'gaming';
        if (path.includes('/content')) return 'content';
        return 'tech';
    }

    // Check privacy consent
    checkPrivacyConsent() {
        const consent = localStorage.getItem('analytics_consent');
        return consent === 'true';
    }

    // Check Do Not Track header
    isDoNotTrack() {
        return navigator.doNotTrack === '1' || 
               navigator.doNotTrack === 'yes' || 
               navigator.msDoNotTrack === '1';
    }

    // Initialize analytics tracking
    init() {
        this.trackPageView();
        this.setupEventListeners();
        this.startSessionTracking();
        
        console.log('📊 Portfolio Analytics initialized for:', this.currentPortfolio);
    }

    // Track page view
    trackPageView() {
        this.trackEvent('page_view', {
            portfolio: this.currentPortfolio,
            path: window.location.pathname,
            referrer: document.referrer,
            timestamp: Date.now(),
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`
        });
    }

    // Set up event listeners for user interactions
    setupEventListeners() {
        // Portfolio navigation tracking
        this.trackPortfolioNavigation();
        
        // Project interaction tracking
        this.trackProjectInteractions();
        
        // Contact form tracking
        this.trackContactFormInteractions();
        
        // Cross-portfolio connection tracking
        this.trackCrossPortfolioConnections();
        
        // Scroll depth tracking
        this.trackScrollDepth();
        
        // Time on page tracking
        this.trackTimeOnPage();
        
        // Exit intent tracking
        this.trackExitIntent();
    }

    // Track portfolio navigation patterns
    trackPortfolioNavigation() {
        // Track navigation button clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.portfolio-nav-card, .return-button, .footer-link');
            if (target) {
                let targetPortfolio = 'unknown';
                let navigationType = 'unknown';
                
                if (target.classList.contains('portfolio-nav-card')) {
                    targetPortfolio = target.getAttribute('data-portfolio') || 'unknown';
                    navigationType = 'portfolio_card';
                } else if (target.classList.contains('return-button')) {
                    targetPortfolio = 'tech';
                    navigationType = 'return_button';
                } else if (target.classList.contains('footer-link')) {
                    const href = target.getAttribute('href');
                    if (href === '/') targetPortfolio = 'tech';
                    else if (href === '/gaming') targetPortfolio = 'gaming';
                    else if (href === '/content') targetPortfolio = 'content';
                    navigationType = 'footer_link';
                }
                
                this.trackEvent('portfolio_navigation', {
                    from_portfolio: this.currentPortfolio,
                    to_portfolio: targetPortfolio,
                    navigation_type: navigationType,
                    element_class: target.className,
                    timestamp: Date.now()
                });
            }
        });

        // Track skill portfolio links
        document.addEventListener('click', (e) => {
            const skillLink = e.target.closest('.skill-portfolio-link');
            if (skillLink) {
                const skillCard = skillLink.closest('.skill-enhanced');
                const targetPortfolio = skillCard ? skillCard.getAttribute('data-portfolio-link') : 'unknown';
                
                this.trackEvent('skill_portfolio_navigation', {
                    from_portfolio: this.currentPortfolio,
                    to_portfolio: targetPortfolio,
                    skill_name: skillCard ? skillCard.textContent.trim() : 'unknown',
                    timestamp: Date.now()
                });
            }
        });
    }

    // Track project interactions
    trackProjectInteractions() {
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card, .featured-project-card');
            if (projectCard) {
                const projectTitle = projectCard.querySelector('h3')?.textContent || 'unknown';
                
                this.trackEvent('project_interaction', {
                    portfolio: this.currentPortfolio,
                    project_title: projectTitle,
                    interaction_type: 'click',
                    timestamp: Date.now()
                });
            }
        });

        // Track carousel interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.carousel-btn, .carousel-dot')) {
                this.trackEvent('carousel_interaction', {
                    portfolio: this.currentPortfolio,
                    interaction_type: e.target.closest('.carousel-btn') ? 'navigation' : 'dot',
                    direction: e.target.id === 'next-project' ? 'next' : 'previous',
                    timestamp: Date.now()
                });
            }
        });
    }

    // Track contact form interactions
    trackContactFormInteractions() {
        // Track form starts
        document.addEventListener('focus', (e) => {
            if (e.target.closest('form[id$="-contact-form"]')) {
                const form = e.target.closest('form');
                const portfolioContext = form.querySelector('input[name="portfolio_context"]')?.value || this.currentPortfolio;
                
                this.trackEvent('contact_form_start', {
                    portfolio: this.currentPortfolio,
                    form_context: portfolioContext,
                    timestamp: Date.now()
                });
            }
        }, { once: true });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form[id$="-contact-form"]')) {
                const form = e.target;
                const portfolioContext = form.querySelector('input[name="portfolio_context"]')?.value || this.currentPortfolio;
                const interestType = form.querySelector('select[name$="_interest"]')?.value || 'general';
                
                this.trackEvent('contact_form_submit', {
                    portfolio: this.currentPortfolio,
                    form_context: portfolioContext,
                    interest_type: interestType,
                    timestamp: Date.now()
                });
            }
        });
    }

    // Track cross-portfolio connection interactions
    trackCrossPortfolioConnections() {
        document.addEventListener('click', (e) => {
            const connectionButton = e.target.closest('.connection-button');
            if (connectionButton) {
                const connectionCard = connectionButton.closest('.connection-card');
                const targetPortfolio = connectionCard ? connectionCard.getAttribute('data-portfolio') : 'unknown';
                
                this.trackEvent('cross_portfolio_connection', {
                    from_portfolio: this.currentPortfolio,
                    to_portfolio: targetPortfolio,
                    connection_type: 'related_work',
                    timestamp: Date.now()
                });
            }
        });
    }

    // Track scroll depth
    trackScrollDepth() {
        let maxScrollDepth = 0;
        const scrollDepthThresholds = [25, 50, 75, 90, 100];
        const trackedThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);
            
            scrollDepthThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    this.trackEvent('scroll_depth', {
                        portfolio: this.currentPortfolio,
                        depth_percent: threshold,
                        timestamp: Date.now()
                    });
                }
            });
        });

        // Track final scroll depth on page unload
        window.addEventListener('beforeunload', () => {
            this.trackEvent('final_scroll_depth', {
                portfolio: this.currentPortfolio,
                max_depth_percent: maxScrollDepth,
                timestamp: Date.now()
            });
        });
    }

    // Track time on page
    trackTimeOnPage() {
        let timeSpent = 0;
        let isActive = true;
        let lastActiveTime = Date.now();

        // Track active/inactive states
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                timeSpent += Date.now() - lastActiveTime;
                isActive = false;
            } else {
                lastActiveTime = Date.now();
                isActive = true;
            }
        });

        // Track time milestones
        const timeThresholds = [30, 60, 120, 300, 600]; // seconds
        const trackedTimeThresholds = new Set();

        setInterval(() => {
            if (isActive) {
                const currentTimeSpent = timeSpent + (Date.now() - lastActiveTime);
                const timeSpentSeconds = Math.floor(currentTimeSpent / 1000);
                
                timeThresholds.forEach(threshold => {
                    if (timeSpentSeconds >= threshold && !trackedTimeThresholds.has(threshold)) {
                        trackedTimeThresholds.add(threshold);
                        this.trackEvent('time_milestone', {
                            portfolio: this.currentPortfolio,
                            time_seconds: threshold,
                            timestamp: Date.now()
                        });
                    }
                });
            }
        }, 5000); // Check every 5 seconds

        // Track final time on page unload
        window.addEventListener('beforeunload', () => {
            const finalTimeSpent = timeSpent + (isActive ? Date.now() - lastActiveTime : 0);
            this.trackEvent('session_end', {
                portfolio: this.currentPortfolio,
                total_time_seconds: Math.floor(finalTimeSpent / 1000),
                timestamp: Date.now()
            });
        });
    }

    // Track exit intent
    trackExitIntent() {
        let exitIntentTracked = false;

        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentTracked) {
                exitIntentTracked = true;
                this.trackEvent('exit_intent', {
                    portfolio: this.currentPortfolio,
                    timestamp: Date.now()
                });
            }
        });
    }

    // Start session tracking
    startSessionTracking() {
        this.trackEvent('session_start', {
            portfolio: this.currentPortfolio,
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: Date.now(),
            referrer: document.referrer,
            utm_source: this.getUrlParameter('utm_source'),
            utm_medium: this.getUrlParameter('utm_medium'),
            utm_campaign: this.getUrlParameter('utm_campaign')
        });
    }

    // Get URL parameter
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Core event tracking method
    trackEvent(eventName, eventData) {
        if (!this.isEnabled) return;

        const event = {
            event_name: eventName,
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: Date.now(),
            portfolio: this.currentPortfolio,
            url: window.location.href,
            ...eventData
        };

        // Store event locally
        this.events.push(event);
        
        // Send to analytics endpoint (if available)
        this.sendEvent(event);
        
        // Store in localStorage for offline capability
        this.storeEventLocally(event);
        
        console.log('📊 Analytics Event:', eventName, eventData);
    }

    // Send event to analytics endpoint
    async sendEvent(event) {
        try {
            // Check if backend analytics endpoint exists
            const response = await fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) {
                throw new Error('Analytics endpoint not available');
            }
        } catch (error) {
            // Fallback: store locally if endpoint is not available
            console.log('Analytics endpoint not available, storing locally');
        }
    }

    // Store event locally for offline capability
    storeEventLocally(event) {
        try {
            const storedEvents = JSON.parse(localStorage.getItem('portfolio_analytics_events') || '[]');
            storedEvents.push(event);
            
            // Keep only last 100 events to prevent storage overflow
            if (storedEvents.length > 100) {
                storedEvents.splice(0, storedEvents.length - 100);
            }
            
            localStorage.setItem('portfolio_analytics_events', JSON.stringify(storedEvents));
        } catch (error) {
            console.warn('Failed to store analytics event locally:', error);
        }
    }

    // Get analytics summary
    getAnalyticsSummary() {
        const storedEvents = JSON.parse(localStorage.getItem('portfolio_analytics_events') || '[]');
        
        const summary = {
            totalEvents: storedEvents.length,
            portfolioViews: {},
            navigationPatterns: [],
            projectInteractions: [],
            contactFormSubmissions: 0,
            crossPortfolioConnections: 0,
            averageTimeOnPage: 0,
            scrollDepthData: []
        };

        storedEvents.forEach(event => {
            // Count portfolio views
            if (event.event_name === 'page_view') {
                summary.portfolioViews[event.portfolio] = (summary.portfolioViews[event.portfolio] || 0) + 1;
            }
            
            // Track navigation patterns
            if (event.event_name === 'portfolio_navigation') {
                summary.navigationPatterns.push({
                    from: event.from_portfolio,
                    to: event.to_portfolio,
                    type: event.navigation_type
                });
            }
            
            // Count project interactions
            if (event.event_name === 'project_interaction') {
                summary.projectInteractions.push({
                    portfolio: event.portfolio,
                    project: event.project_title
                });
            }
            
            // Count contact form submissions
            if (event.event_name === 'contact_form_submit') {
                summary.contactFormSubmissions++;
            }
            
            // Count cross-portfolio connections
            if (event.event_name === 'cross_portfolio_connection') {
                summary.crossPortfolioConnections++;
            }
            
            // Collect scroll depth data
            if (event.event_name === 'scroll_depth') {
                summary.scrollDepthData.push({
                    portfolio: event.portfolio,
                    depth: event.depth_percent
                });
            }
        });

        return summary;
    }

    // Privacy controls
    enableAnalytics() {
        localStorage.setItem('analytics_consent', 'true');
        this.privacyConsent = true;
        this.isEnabled = true;
        this.init();
    }

    disableAnalytics() {
        localStorage.setItem('analytics_consent', 'false');
        this.privacyConsent = false;
        this.isEnabled = false;
        
        // Clear stored events
        localStorage.removeItem('portfolio_analytics_events');
        localStorage.removeItem('portfolio_user_id');
    }

    // Export analytics data (for GDPR compliance)
    exportUserData() {
        return {
            userId: this.userId,
            events: JSON.parse(localStorage.getItem('portfolio_analytics_events') || '[]'),
            consent: this.privacyConsent,
            summary: this.getAnalyticsSummary()
        };
    }

    // Delete user data (for GDPR compliance)
    deleteUserData() {
        localStorage.removeItem('portfolio_analytics_events');
        localStorage.removeItem('portfolio_user_id');
        localStorage.removeItem('analytics_consent');
        this.isEnabled = false;
    }
}

// Privacy consent banner
class PrivacyConsentBanner {
    constructor() {
        this.hasShownBanner = localStorage.getItem('privacy_banner_shown') === 'true';
        this.init();
    }

    init() {
        if (!this.hasShownBanner && !this.hasConsent()) {
            this.showBanner();
        }
    }

    hasConsent() {
        return localStorage.getItem('analytics_consent') !== null;
    }

    showBanner() {
        const banner = document.createElement('div');
        banner.id = 'privacy-consent-banner';
        banner.innerHTML = `
            <div class="privacy-banner-content">
                <div class="privacy-banner-text">
                    <h4>🍪 Privacy & Analytics</h4>
                    <p>We use privacy-compliant analytics to improve your portfolio experience. Your data stays anonymous and secure.</p>
                </div>
                <div class="privacy-banner-actions">
                    <button id="accept-analytics" class="privacy-btn privacy-btn-accept">Accept</button>
                    <button id="decline-analytics" class="privacy-btn privacy-btn-decline">Decline</button>
                    <button id="privacy-settings" class="privacy-btn privacy-btn-settings">Settings</button>
                </div>
            </div>
        `;

        this.addBannerStyles();
        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('accept-analytics').addEventListener('click', () => {
            this.acceptAnalytics();
            this.hideBanner();
        });

        document.getElementById('decline-analytics').addEventListener('click', () => {
            this.declineAnalytics();
            this.hideBanner();
        });

        document.getElementById('privacy-settings').addEventListener('click', () => {
            this.showPrivacySettings();
        });
    }

    acceptAnalytics() {
        localStorage.setItem('analytics_consent', 'true');
        localStorage.setItem('privacy_banner_shown', 'true');
        
        // Initialize analytics
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.enableAnalytics();
        }
    }

    declineAnalytics() {
        localStorage.setItem('analytics_consent', 'false');
        localStorage.setItem('privacy_banner_shown', 'true');
        
        // Disable analytics
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.disableAnalytics();
        }
    }

    hideBanner() {
        const banner = document.getElementById('privacy-consent-banner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => banner.remove(), 300);
        }
    }

    showPrivacySettings() {
        // This would open a detailed privacy settings modal
        alert('Privacy settings would open here. For now, you can accept or decline analytics tracking.');
    }

    addBannerStyles() {
        if (document.getElementById('privacy-banner-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'privacy-banner-styles';
        styles.textContent = `
            #privacy-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(20, 20, 22, 0.98);
                backdrop-filter: blur(25px);
                border-top: 1px solid rgba(212, 175, 55, 0.2);
                z-index: 10000;
                padding: 1.2rem;
                transform: translateY(0);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                font-family: 'Inter', sans-serif;
            }

            .privacy-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
            }

            .privacy-banner-text h4 {
                color: #D4AF37;
                margin: 0 0 0.5rem 0;
                font-size: 1.1rem;
                font-weight: 700;
                font-family: 'Outfit', sans-serif;
            }

            .privacy-banner-text p {
                color: rgba(255, 255, 255, 0.8);
                margin: 0;
                font-size: 0.9rem;
                line-height: 1.4;
            }

            .privacy-banner-actions {
                display: flex;
                gap: 0.75rem;
                flex-shrink: 0;
            }

            .privacy-btn {
                padding: 0.6rem 1.2rem;
                border: none;
                border-radius: 30px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                font-family: 'Inter', sans-serif;
            }

            .privacy-btn-accept {
                background: linear-gradient(135deg, #D4AF37, #FF8C42);
                color: #141416;
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }

            .privacy-btn-accept:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(212, 175, 55, 0.5);
            }

            .privacy-btn-decline {
                background: rgba(255, 255, 255, 0.05);
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .privacy-btn-decline:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.4);
            }

            .privacy-btn-settings {
                background: rgba(212, 175, 55, 0.1);
                color: #D4AF37;
                border: 1px solid rgba(212, 175, 55, 0.3);
            }

            .privacy-btn-settings:hover {
                background: rgba(212, 175, 55, 0.2);
                border-color: rgba(212, 175, 55, 0.5);
            }

            @media (max-width: 768px) {
                .privacy-banner-content {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }

                .privacy-banner-actions {
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .privacy-btn {
                    padding: 0.6rem 1.2rem;
                }
            }
        `;

        document.head.appendChild(styles);
    }
}

// Initialize analytics system
let portfolioAnalytics;
let privacyConsentBanner;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize privacy consent banner first
    privacyConsentBanner = new PrivacyConsentBanner();
    
    // Initialize analytics (will check consent internally)
    portfolioAnalytics = new PortfolioAnalytics();
    
    // Make available globally
    window.portfolioAnalytics = portfolioAnalytics;
    window.privacyConsentBanner = privacyConsentBanner;
});

// Export for use in other modules
window.PortfolioAnalytics = PortfolioAnalytics;
window.PrivacyConsentBanner = PrivacyConsentBanner;