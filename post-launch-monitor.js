/**
 * Post-Launch Monitoring System
 * Automated monitoring for the first 24-48 hours after launch
 */

class PostLaunchMonitor {
    constructor() {
        this.launchTime = new Date();
        this.monitoringInterval = 5 * 60 * 1000; // 5 minutes
        this.criticalInterval = 1 * 60 * 1000; // 1 minute for first hour
        this.alerts = [];
        this.metrics = {
            uptime: 100,
            responseTime: [],
            errorCount: 0,
            userSessions: 0,
            portfolioSwitches: 0
        };
        
        this.init();
    }

    init() {
        console.log('🚀 Post-launch monitoring started at:', this.launchTime.toISOString());
        this.startMonitoring();
        this.setupAlertSystem();
        this.trackUserEngagement();
    }

    startMonitoring() {
        // Critical monitoring for first hour (every minute)
        const criticalMonitoring = setInterval(() => {
            this.runHealthChecks();
            
            // Switch to normal monitoring after 1 hour
            if (Date.now() - this.launchTime.getTime() > 60 * 60 * 1000) {
                clearInterval(criticalMonitoring);
                this.startNormalMonitoring();
            }
        }, this.criticalInterval);
    }

    startNormalMonitoring() {
        console.log('📊 Switching to normal monitoring interval (5 minutes)');
        
        setInterval(() => {
            this.runHealthChecks();
        }, this.monitoringInterval);
    }

    async runHealthChecks() {
        const timestamp = new Date().toISOString();
        console.log(`🔍 Running health check at ${timestamp}`);
        
        try {
            // Check all portfolio endpoints
            const endpoints = [
                { name: 'main', url: '/' },
                { name: 'gaming', url: '/gaming/' },
                { name: 'content', url: '/content/' },
                { name: 'backend', url: 'https://portfolio-production-b1b4.up.railway.app/api/health' }
            ];
            
            const results = await Promise.all(
                endpoints.map(endpoint => this.checkEndpoint(endpoint))
            );
            
            // Analyze results
            this.analyzeHealthResults(results, timestamp);
            
            // Update metrics
            this.updateMetrics(results);
            
            // Check for alerts
            this.checkAlertConditions(results);
            
        } catch (error) {
            console.error('❌ Health check failed:', error);
            this.createAlert('critical', 'Health check system failure', error.message);
        }
    }

    async checkEndpoint(endpoint) {
        const startTime = Date.now();
        
        try {
            const response = await fetch(endpoint.url, {
                method: 'HEAD',
                mode: 'cors',
                cache: 'no-cache',
                timeout: 10000
            });
            
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            return {
                name: endpoint.name,
                url: endpoint.url,
                status: response.status,
                ok: response.ok,
                responseTime,
                timestamp: new Date().toISOString(),
                headers: Object.fromEntries(response.headers.entries())
            };
        } catch (error) {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            return {
                name: endpoint.name,
                url: endpoint.url,
                status: 0,
                ok: false,
                responseTime,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    analyzeHealthResults(results, timestamp) {
        const healthyEndpoints = results.filter(r => r.ok).length;
        const totalEndpoints = results.length;
        const healthPercentage = (healthyEndpoints / totalEndpoints) * 100;
        
        console.log(`📈 Health Status: ${healthyEndpoints}/${totalEndpoints} endpoints healthy (${healthPercentage.toFixed(1)}%)`);
        
        // Log individual endpoint status
        results.forEach(result => {
            const status = result.ok ? '✅' : '❌';
            const responseTime = result.responseTime ? `${result.responseTime}ms` : 'N/A';
            console.log(`${status} ${result.name.toUpperCase()}: ${result.status} (${responseTime})`);
            
            if (!result.ok) {
                console.error(`   Error: ${result.error || 'Unknown error'}`);
            }
        });
        
        // Store results for trending
        this.storeHealthData({
            timestamp,
            healthPercentage,
            results
        });
    }

    updateMetrics(results) {
        // Update uptime calculation
        const healthyEndpoints = results.filter(r => r.ok).length;
        const totalEndpoints = results.length;
        const currentUptime = (healthyEndpoints / totalEndpoints) * 100;
        
        // Running average of uptime
        this.metrics.uptime = (this.metrics.uptime + currentUptime) / 2;
        
        // Track response times
        const responseTimes = results.filter(r => r.responseTime).map(r => r.responseTime);
        this.metrics.responseTime.push(...responseTimes);
        
        // Keep only last 100 response time measurements
        if (this.metrics.responseTime.length > 100) {
            this.metrics.responseTime = this.metrics.responseTime.slice(-100);
        }
        
        // Count errors
        const errors = results.filter(r => !r.ok).length;
        this.metrics.errorCount += errors;
    }

    checkAlertConditions(results) {
        const now = Date.now();
        const timeSinceLaunch = now - this.launchTime.getTime();
        
        // Critical alerts for first 4 hours
        if (timeSinceLaunch < 4 * 60 * 60 * 1000) {
            // Any endpoint down is critical
            const downEndpoints = results.filter(r => !r.ok);
            if (downEndpoints.length > 0) {
                downEndpoints.forEach(endpoint => {
                    this.createAlert('critical', `Endpoint Down: ${endpoint.name}`, 
                        `${endpoint.url} is returning ${endpoint.status} - ${endpoint.error || 'Unknown error'}`);
                });
            }
            
            // Slow response times
            const slowEndpoints = results.filter(r => r.responseTime > 5000);
            if (slowEndpoints.length > 0) {
                slowEndpoints.forEach(endpoint => {
                    this.createAlert('warning', `Slow Response: ${endpoint.name}`, 
                        `${endpoint.url} took ${endpoint.responseTime}ms to respond`);
                });
            }
        }
        
        // Calculate average response time
        const avgResponseTime = this.metrics.responseTime.length > 0 
            ? this.metrics.responseTime.reduce((sum, time) => sum + time, 0) / this.metrics.responseTime.length 
            : 0;
        
        // Performance degradation alert
        if (avgResponseTime > 3000) {
            this.createAlert('warning', 'Performance Degradation', 
                `Average response time is ${avgResponseTime.toFixed(0)}ms (threshold: 3000ms)`);
        }
        
        // Uptime alert
        if (this.metrics.uptime < 99) {
            this.createAlert('critical', 'Low Uptime', 
                `System uptime is ${this.metrics.uptime.toFixed(2)}% (threshold: 99%)`);
        }
    }

    createAlert(severity, title, message) {
        const alert = {
            id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            severity,
            title,
            message,
            timestamp: new Date().toISOString(),
            acknowledged: false
        };
        
        this.alerts.push(alert);
        
        // Log alert
        const emoji = severity === 'critical' ? '🚨' : '⚠️';
        console.log(`${emoji} ALERT [${severity.toUpperCase()}]: ${title}`);
        console.log(`   ${message}`);
        
        // Store alert
        this.storeAlert(alert);
        
        // Trigger notification (if implemented)
        this.triggerNotification(alert);
        
        return alert;
    }

    triggerNotification(alert) {
        // Browser notification (if permission granted)
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(`Portfolio Alert: ${alert.title}`, {
                body: alert.message,
                icon: '/assets/favicon.svg',
                tag: alert.id
            });
        }
        
        // Console notification for server-side
        if (alert.severity === 'critical') {
            console.error(`🚨 CRITICAL ALERT: ${alert.title} - ${alert.message}`);
        }
    }

    trackUserEngagement() {
        if (typeof window === 'undefined') return;
        
        // Track page views and portfolio switches
        let lastPortfolio = this.detectCurrentPortfolio();
        let sessionStart = Date.now();
        
        // Check for portfolio changes
        setInterval(() => {
            const currentPortfolio = this.detectCurrentPortfolio();
            if (currentPortfolio !== lastPortfolio) {
                this.metrics.portfolioSwitches++;
                console.log(`📱 Portfolio switch: ${lastPortfolio} → ${currentPortfolio}`);
                lastPortfolio = currentPortfolio;
                
                // Store navigation event
                this.storeNavigationEvent({
                    from: lastPortfolio,
                    to: currentPortfolio,
                    timestamp: new Date().toISOString()
                });
            }
        }, 1000);
        
        // Track session duration
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - sessionStart;
            this.storeSessionData({
                duration: sessionDuration,
                portfolioSwitches: this.metrics.portfolioSwitches,
                timestamp: new Date().toISOString()
            });
        });
    }

    detectCurrentPortfolio() {
        if (typeof window === 'undefined') return 'unknown';
        
        const path = window.location.pathname;
        if (path.includes('/gaming')) return 'gaming';
        if (path.includes('/content')) return 'content';
        return 'tech';
    }

    storeHealthData(data) {
        const key = 'post_launch_health_data';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(data);
        
        // Keep only last 100 entries
        if (existing.length > 100) {
            existing.shift();
        }
        
        localStorage.setItem(key, JSON.stringify(existing));
    }

    storeAlert(alert) {
        const key = 'post_launch_alerts';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(alert);
        localStorage.setItem(key, JSON.stringify(existing));
    }

    storeNavigationEvent(event) {
        const key = 'post_launch_navigation';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(event);
        
        // Keep only last 50 navigation events
        if (existing.length > 50) {
            existing.shift();
        }
        
        localStorage.setItem(key, JSON.stringify(existing));
    }

    storeSessionData(data) {
        const key = 'post_launch_sessions';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(data);
        localStorage.setItem(key, JSON.stringify(existing));
    }

    generateLaunchReport() {
        const timeSinceLaunch = Date.now() - this.launchTime.getTime();
        const hoursLive = (timeSinceLaunch / (1000 * 60 * 60)).toFixed(1);
        
        const avgResponseTime = this.metrics.responseTime.length > 0 
            ? this.metrics.responseTime.reduce((sum, time) => sum + time, 0) / this.metrics.responseTime.length 
            : 0;
        
        const criticalAlerts = this.alerts.filter(a => a.severity === 'critical').length;
        const warningAlerts = this.alerts.filter(a => a.severity === 'warning').length;
        
        const report = {
            launchTime: this.launchTime.toISOString(),
            hoursLive,
            metrics: {
                uptime: this.metrics.uptime.toFixed(2) + '%',
                averageResponseTime: avgResponseTime.toFixed(0) + 'ms',
                totalErrors: this.metrics.errorCount,
                portfolioSwitches: this.metrics.portfolioSwitches
            },
            alerts: {
                critical: criticalAlerts,
                warning: warningAlerts,
                total: this.alerts.length
            },
            status: criticalAlerts === 0 ? 'HEALTHY' : 'ISSUES_DETECTED',
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.metrics.uptime < 99.5) {
            recommendations.push('Investigate uptime issues - consider infrastructure scaling');
        }
        
        const avgResponseTime = this.metrics.responseTime.length > 0 
            ? this.metrics.responseTime.reduce((sum, time) => sum + time, 0) / this.metrics.responseTime.length 
            : 0;
        
        if (avgResponseTime > 2000) {
            recommendations.push('Optimize performance - response times are above target');
        }
        
        if (this.metrics.errorCount > 5) {
            recommendations.push('Review error logs - multiple errors detected');
        }
        
        if (this.metrics.portfolioSwitches < 10) {
            recommendations.push('Monitor user engagement - low portfolio switching activity');
        }
        
        const criticalAlerts = this.alerts.filter(a => a.severity === 'critical').length;
        if (criticalAlerts > 0) {
            recommendations.push('Address critical alerts immediately');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('System is performing well - continue monitoring');
        }
        
        return recommendations;
    }

    displayLaunchReport() {
        const report = this.generateLaunchReport();
        
        console.log('\n🚀 POST-LAUNCH MONITORING REPORT');
        console.log('================================');
        console.log(`Launch Time: ${report.launchTime}`);
        console.log(`Hours Live: ${report.hoursLive}`);
        console.log(`Status: ${report.status}`);
        console.log('\nMetrics:');
        console.log(`  Uptime: ${report.metrics.uptime}`);
        console.log(`  Avg Response Time: ${report.metrics.averageResponseTime}`);
        console.log(`  Total Errors: ${report.metrics.totalErrors}`);
        console.log(`  Portfolio Switches: ${report.metrics.portfolioSwitches}`);
        console.log('\nAlerts:');
        console.log(`  Critical: ${report.alerts.critical}`);
        console.log(`  Warning: ${report.alerts.warning}`);
        console.log(`  Total: ${report.alerts.total}`);
        console.log('\nRecommendations:');
        report.recommendations.forEach(rec => console.log(`  - ${rec}`));
        console.log('================================\n');
        
        return report;
    }

    // Method to stop monitoring (for cleanup)
    stopMonitoring() {
        console.log('🛑 Stopping post-launch monitoring');
        const finalReport = this.generateLaunchReport();
        console.log('📊 Final launch report:', finalReport);
        return finalReport;
    }
}

// Initialize post-launch monitoring
let postLaunchMonitor;

// Auto-start if in browser environment
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        postLaunchMonitor = new PostLaunchMonitor();
        window.postLaunchMonitor = postLaunchMonitor;
        
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PostLaunchMonitor;
}