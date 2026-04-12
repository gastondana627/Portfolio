// Analytics Dashboard for Portfolio Ecosystem Insights
// Provides visualization and insights for cross-portfolio analytics data

class AnalyticsDashboard {
    constructor() {
        this.isVisible = false;
        this.analytics = window.portfolioAnalytics;
        this.init();
    }

    init() {
        this.createDashboardButton();
        this.addDashboardStyles();
    }

    // Create floating dashboard button (only visible in development or for admin)
    createDashboardButton() {
        // Only show in development or if admin flag is set
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isAdmin = localStorage.getItem('portfolio_admin') === 'true';
        
        if (!isDev && !isAdmin) return;

        const button = document.createElement('button');
        button.id = 'analytics-dashboard-toggle';
        button.innerHTML = '<i class="fas fa-chart-bar"></i>';
        button.title = 'Analytics Dashboard';
        
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #D4AF37, #FF8C42);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 9998;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;

        button.addEventListener('click', () => {
            this.toggleDashboard();
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });

        document.body.appendChild(button);
    }

    // Toggle dashboard visibility
    toggleDashboard() {
        if (this.isVisible) {
            this.hideDashboard();
        } else {
            this.showDashboard();
        }
    }

    // Show analytics dashboard
    showDashboard() {
        if (document.getElementById('analytics-dashboard')) return;

        const dashboard = document.createElement('div');
        dashboard.id = 'analytics-dashboard';
        dashboard.innerHTML = this.generateDashboardHTML();
        
        document.body.appendChild(dashboard);
        
        // Animate in
        setTimeout(() => {
            dashboard.style.opacity = '1';
            dashboard.style.transform = 'translateX(0)';
        }, 10);

        this.isVisible = true;
        this.populateDashboardData();
        this.setupDashboardEvents();
    }

    // Hide analytics dashboard
    hideDashboard() {
        const dashboard = document.getElementById('analytics-dashboard');
        if (dashboard) {
            dashboard.style.opacity = '0';
            dashboard.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                dashboard.remove();
            }, 300);
        }
        this.isVisible = false;
    }

    // Generate dashboard HTML
    generateDashboardHTML() {
        return `
            <div class="dashboard-header">
                <h3><i class="fas fa-chart-bar"></i> Portfolio Analytics</h3>
                <button class="dashboard-close" onclick="window.analyticsDashboard.hideDashboard()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="dashboard-content">
                <!-- Overview Stats -->
                <div class="dashboard-section">
                    <h4>Overview</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number" id="total-events">0</div>
                            <div class="stat-label">Total Events</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="portfolio-views">0</div>
                            <div class="stat-label">Portfolio Views</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="cross-connections">0</div>
                            <div class="stat-label">Cross-Portfolio</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="contact-submissions">0</div>
                            <div class="stat-label">Contact Forms</div>
                        </div>
                    </div>
                </div>

                <!-- Portfolio Distribution -->
                <div class="dashboard-section">
                    <h4>Portfolio Distribution</h4>
                    <div class="portfolio-distribution" id="portfolio-distribution">
                        <!-- Will be populated dynamically -->
                    </div>
                </div>

                <!-- Navigation Patterns -->
                <div class="dashboard-section">
                    <h4>Navigation Patterns</h4>
                    <div class="navigation-flow" id="navigation-flow">
                        <!-- Will be populated dynamically -->
                    </div>
                </div>

                <!-- Popular Projects -->
                <div class="dashboard-section">
                    <h4>Project Interactions</h4>
                    <div class="project-interactions" id="project-interactions">
                        <!-- Will be populated dynamically -->
                    </div>
                </div>

                <!-- User Engagement -->
                <div class="dashboard-section">
                    <h4>User Engagement</h4>
                    <div class="engagement-metrics" id="engagement-metrics">
                        <!-- Will be populated dynamically -->
                    </div>
                </div>

                <!-- Privacy Controls -->
                <div class="dashboard-section">
                    <h4>Privacy & Data</h4>
                    <div class="privacy-controls">
                        <button class="dashboard-btn" onclick="window.analyticsDashboard.exportData()">
                            <i class="fas fa-download"></i> Export Data
                        </button>
                        <button class="dashboard-btn dashboard-btn-danger" onclick="window.analyticsDashboard.clearData()">
                            <i class="fas fa-trash"></i> Clear Data
                        </button>
                        <button class="dashboard-btn" onclick="window.analyticsDashboard.refreshData()">
                            <i class="fas fa-sync"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Populate dashboard with actual data
    populateDashboardData() {
        if (!this.analytics) return;

        const summary = this.analytics.getAnalyticsSummary();
        
        // Update overview stats
        document.getElementById('total-events').textContent = summary.totalEvents;
        document.getElementById('portfolio-views').textContent = Object.values(summary.portfolioViews).reduce((a, b) => a + b, 0);
        document.getElementById('cross-connections').textContent = summary.crossPortfolioConnections;
        document.getElementById('contact-submissions').textContent = summary.contactFormSubmissions;

        // Update portfolio distribution
        this.updatePortfolioDistribution(summary.portfolioViews);
        
        // Update navigation patterns
        this.updateNavigationFlow(summary.navigationPatterns);
        
        // Update project interactions
        this.updateProjectInteractions(summary.projectInteractions);
        
        // Update engagement metrics
        this.updateEngagementMetrics(summary);
    }

    // Update portfolio distribution visualization
    updatePortfolioDistribution(portfolioViews) {
        const container = document.getElementById('portfolio-distribution');
        const total = Object.values(portfolioViews).reduce((a, b) => a + b, 0);
        
        if (total === 0) {
            container.innerHTML = '<p class="no-data">No portfolio views recorded yet</p>';
            return;
        }

        const portfolioColors = {
            tech: '#D4AF37',
            gaming: '#FF4444',
            content: '#808080'
        };

        const portfolioNames = {
            tech: 'Tech Portfolio',
            gaming: 'Gaming Ecosystem',
            content: 'Content Creation'
        };

        container.innerHTML = Object.entries(portfolioViews).map(([portfolio, views]) => {
            const percentage = Math.round((views / total) * 100);
            return `
                <div class="portfolio-bar">
                    <div class="portfolio-label">
                        <span class="portfolio-name">${portfolioNames[portfolio] || portfolio}</span>
                        <span class="portfolio-count">${views} views (${percentage}%)</span>
                    </div>
                    <div class="portfolio-progress">
                        <div class="portfolio-progress-bar" 
                             style="width: ${percentage}%; background: ${portfolioColors[portfolio] || '#666'}">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update navigation flow visualization
    updateNavigationFlow(navigationPatterns) {
        const container = document.getElementById('navigation-flow');
        
        if (navigationPatterns.length === 0) {
            container.innerHTML = '<p class="no-data">No navigation patterns recorded yet</p>';
            return;
        }

        // Count navigation flows
        const flows = {};
        navigationPatterns.forEach(pattern => {
            const key = `${pattern.from} → ${pattern.to}`;
            flows[key] = (flows[key] || 0) + 1;
        });

        // Sort by frequency
        const sortedFlows = Object.entries(flows)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10); // Top 10 flows

        container.innerHTML = sortedFlows.map(([flow, count]) => `
            <div class="flow-item">
                <span class="flow-path">${flow}</span>
                <span class="flow-count">${count}</span>
            </div>
        `).join('');
    }

    // Update project interactions
    updateProjectInteractions(projectInteractions) {
        const container = document.getElementById('project-interactions');
        
        if (projectInteractions.length === 0) {
            container.innerHTML = '<p class="no-data">No project interactions recorded yet</p>';
            return;
        }

        // Count project clicks
        const projectCounts = {};
        projectInteractions.forEach(interaction => {
            const key = `${interaction.portfolio}: ${interaction.project}`;
            projectCounts[key] = (projectCounts[key] || 0) + 1;
        });

        // Sort by frequency
        const sortedProjects = Object.entries(projectCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8); // Top 8 projects

        container.innerHTML = sortedProjects.map(([project, count]) => `
            <div class="project-item">
                <span class="project-name">${project}</span>
                <span class="project-count">${count} clicks</span>
            </div>
        `).join('');
    }

    // Update engagement metrics
    updateEngagementMetrics(summary) {
        const container = document.getElementById('engagement-metrics');
        
        // Calculate average scroll depth
        const avgScrollDepth = summary.scrollDepthData.length > 0 
            ? Math.round(summary.scrollDepthData.reduce((sum, item) => sum + item.depth, 0) / summary.scrollDepthData.length)
            : 0;

        container.innerHTML = `
            <div class="engagement-grid">
                <div class="engagement-item">
                    <div class="engagement-icon"><i class="fas fa-scroll"></i></div>
                    <div class="engagement-data">
                        <div class="engagement-number">${avgScrollDepth}%</div>
                        <div class="engagement-label">Avg Scroll Depth</div>
                    </div>
                </div>
                <div class="engagement-item">
                    <div class="engagement-icon"><i class="fas fa-mouse-pointer"></i></div>
                    <div class="engagement-data">
                        <div class="engagement-number">${summary.projectInteractions.length}</div>
                        <div class="engagement-label">Project Clicks</div>
                    </div>
                </div>
                <div class="engagement-item">
                    <div class="engagement-icon"><i class="fas fa-route"></i></div>
                    <div class="engagement-data">
                        <div class="engagement-number">${summary.navigationPatterns.length}</div>
                        <div class="engagement-label">Navigation Events</div>
                    </div>
                </div>
                <div class="engagement-item">
                    <div class="engagement-icon"><i class="fas fa-link"></i></div>
                    <div class="engagement-data">
                        <div class="engagement-number">${summary.crossPortfolioConnections}</div>
                        <div class="engagement-label">Cross-Portfolio</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Setup dashboard event listeners
    setupDashboardEvents() {
        // Auto-refresh every 30 seconds
        this.refreshInterval = setInterval(() => {
            if (this.isVisible) {
                this.populateDashboardData();
            }
        }, 30000);
    }

    // Export analytics data
    exportData() {
        if (!this.analytics) return;
        
        const data = this.analytics.exportUserData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Clear analytics data
    clearData() {
        if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
            if (this.analytics) {
                this.analytics.deleteUserData();
            }
            this.populateDashboardData();
        }
    }

    // Refresh dashboard data
    refreshData() {
        this.populateDashboardData();
        
        // Show refresh feedback
        const refreshBtn = document.querySelector('.dashboard-btn i.fa-sync');
        if (refreshBtn) {
            refreshBtn.style.animation = 'spin 1s linear';
            setTimeout(() => {
                refreshBtn.style.animation = '';
            }, 1000);
        }
    }

    // Add dashboard styles
    addDashboardStyles() {
        if (document.getElementById('analytics-dashboard-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'analytics-dashboard-styles';
        styles.textContent = `
            #analytics-dashboard {
                position: fixed;
                top: 0;
                right: 0;
                width: 400px;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 9999;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                overflow-y: auto;
                font-family: 'Space Grotesk', sans-serif;
            }

            .dashboard-header {
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(212, 175, 55, 0.1);
            }

            .dashboard-header h3 {
                color: #ffffff;
                margin: 0;
                font-size: 1.2rem;
                font-weight: 600;
            }

            .dashboard-close {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background 0.3s ease;
            }

            .dashboard-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .dashboard-content {
                padding: 1rem;
            }

            .dashboard-section {
                margin-bottom: 2rem;
            }

            .dashboard-section h4 {
                color: #ffffff;
                margin: 0 0 1rem 0;
                font-size: 1rem;
                font-weight: 600;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
            }

            .stat-card {
                background: rgba(255, 255, 255, 0.05);
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .stat-number {
                font-size: 1.5rem;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 0.25rem;
            }

            .stat-label {
                font-size: 0.8rem;
                color: #cccccc;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .portfolio-bar {
                margin-bottom: 1rem;
            }

            .portfolio-label {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }

            .portfolio-name {
                color: #ffffff;
                font-weight: 500;
            }

            .portfolio-count {
                color: #cccccc;
            }

            .portfolio-progress {
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
            }

            .portfolio-progress-bar {
                height: 100%;
                transition: width 0.3s ease;
            }

            .flow-item, .project-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                font-size: 0.9rem;
            }

            .flow-path, .project-name {
                color: #ffffff;
            }

            .flow-count, .project-count {
                color: #cccccc;
                font-weight: 600;
            }

            .engagement-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
            }

            .engagement-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .engagement-icon {
                color: #D4AF37;
                font-size: 1.2rem;
            }

            .engagement-number {
                font-size: 1.1rem;
                font-weight: 700;
                color: #ffffff;
            }

            .engagement-label {
                font-size: 0.75rem;
                color: #cccccc;
            }

            .privacy-controls {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }

            .dashboard-btn {
                padding: 0.5rem 0.75rem;
                background: rgba(212, 175, 55, 0.2);
                color: #ffffff;
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .dashboard-btn:hover {
                background: rgba(212, 175, 55, 0.3);
            }

            .dashboard-btn-danger {
                background: rgba(255, 68, 68, 0.2);
                border-color: rgba(255, 68, 68, 0.3);
            }

            .dashboard-btn-danger:hover {
                background: rgba(255, 68, 68, 0.3);
            }

            .no-data {
                color: #888888;
                font-style: italic;
                text-align: center;
                padding: 1rem;
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @media (max-width: 768px) {
                #analytics-dashboard {
                    width: 100%;
                    left: 0;
                }

                .stats-grid, .engagement-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Cleanup
    destroy() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        this.hideDashboard();
        
        const button = document.getElementById('analytics-dashboard-toggle');
        if (button) button.remove();
    }
}

// Initialize analytics dashboard
let analyticsDashboard;

document.addEventListener('DOMContentLoaded', () => {
    analyticsDashboard = new AnalyticsDashboard();
    window.analyticsDashboard = analyticsDashboard;
});

// Export for use in other modules
window.AnalyticsDashboard = AnalyticsDashboard;