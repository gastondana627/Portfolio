/**
 * Multi-Portfolio Ecosystem Health Check System
 * Monitors all portfolio sections and backend connectivity
 */

class PortfolioHealthChecker {
    constructor() {
        this.endpoints = {
            main: '/',
            gaming: '/gaming/',
            content: '/content/',
            backend: 'https://portfolio-production-b1b4.up.railway.app/api/health',
            sitemap: '/sitemap.xml',
            robots: '/robots.txt'
        };
        
        this.results = {};
        this.startTime = Date.now();
    }

    async checkEndpoint(name, url) {
        const startTime = Date.now();
        
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                mode: 'cors',
                cache: 'no-cache'
            });
            
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            return {
                name,
                url,
                status: response.status,
                ok: response.ok,
                responseTime,
                headers: Object.fromEntries(response.headers.entries()),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            return {
                name,
                url,
                status: 0,
                ok: false,
                responseTime,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    async checkAllEndpoints() {
        console.log('🔍 Starting Multi-Portfolio Health Check...');
        
        const checks = Object.entries(this.endpoints).map(([name, url]) => 
            this.checkEndpoint(name, url)
        );
        
        const results = await Promise.all(checks);
        
        results.forEach(result => {
            this.results[result.name] = result;
        });
        
        return this.results;
    }

    generateReport() {
        const totalTime = Date.now() - this.startTime;
        const healthyEndpoints = Object.values(this.results).filter(r => r.ok).length;
        const totalEndpoints = Object.keys(this.results).length;
        
        const report = {
            timestamp: new Date().toISOString(),
            totalCheckTime: totalTime,
            overallHealth: healthyEndpoints === totalEndpoints ? 'HEALTHY' : 'DEGRADED',
            healthyEndpoints,
            totalEndpoints,
            endpoints: this.results,
            summary: {
                portfolios: {
                    main: this.results.main?.ok || false,
                    gaming: this.results.gaming?.ok || false,
                    content: this.results.content?.ok || false
                },
                backend: this.results.backend?.ok || false,
                seo: {
                    sitemap: this.results.sitemap?.ok || false,
                    robots: this.results.robots?.ok || false
                }
            }
        };
        
        return report;
    }

    displayResults() {
        const report = this.generateReport();
        
        console.log('\n📊 Multi-Portfolio Health Check Results');
        console.log('==========================================');
        console.log(`Overall Status: ${report.overallHealth}`);
        console.log(`Healthy Endpoints: ${report.healthyEndpoints}/${report.totalEndpoints}`);
        console.log(`Total Check Time: ${report.totalCheckTime}ms`);
        console.log('\nEndpoint Details:');
        
        Object.entries(report.endpoints).forEach(([name, result]) => {
            const status = result.ok ? '✅' : '❌';
            const responseTime = result.responseTime ? `${result.responseTime}ms` : 'N/A';
            console.log(`${status} ${name.toUpperCase()}: ${result.status} (${responseTime})`);
            
            if (!result.ok && result.error) {
                console.log(`   Error: ${result.error}`);
            }
        });
        
        console.log('\nPortfolio Summary:');
        console.log(`📱 Main Portfolio: ${report.summary.portfolios.main ? '✅' : '❌'}`);
        console.log(`🎮 Gaming Portfolio: ${report.summary.portfolios.gaming ? '✅' : '❌'}`);
        console.log(`🎨 Content Portfolio: ${report.summary.portfolios.content ? '✅' : '❌'}`);
        console.log(`🔧 Backend API: ${report.summary.backend ? '✅' : '❌'}`);
        console.log(`🔍 SEO Files: ${report.summary.seo.sitemap && report.summary.seo.robots ? '✅' : '❌'}`);
        
        return report;
    }

    async runHealthCheck() {
        await this.checkAllEndpoints();
        return this.displayResults();
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    measurePageLoad() {
        if (typeof window !== 'undefined' && window.performance) {
            const navigation = performance.getEntriesByType('navigation')[0];
            
            return {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                totalTime: navigation.loadEventEnd - navigation.fetchStart,
                dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcpConnect: navigation.connectEnd - navigation.connectStart,
                serverResponse: navigation.responseEnd - navigation.requestStart,
                domProcessing: navigation.domComplete - navigation.domLoading,
                timestamp: new Date().toISOString()
            };
        }
        
        return null;
    }

    measureResourceLoading() {
        if (typeof window !== 'undefined' && window.performance) {
            const resources = performance.getEntriesByType('resource');
            
            return resources.map(resource => ({
                name: resource.name,
                type: resource.initiatorType,
                size: resource.transferSize || 0,
                duration: resource.duration,
                startTime: resource.startTime
            }));
        }
        
        return [];
    }

    generatePerformanceReport() {
        const pageLoad = this.measurePageLoad();
        const resources = this.measureResourceLoading();
        
        return {
            timestamp: new Date().toISOString(),
            pageLoad,
            resources: {
                total: resources.length,
                totalSize: resources.reduce((sum, r) => sum + r.size, 0),
                byType: resources.reduce((acc, r) => {
                    acc[r.type] = (acc[r.type] || 0) + 1;
                    return acc;
                }, {}),
                slowest: resources.sort((a, b) => b.duration - a.duration).slice(0, 5)
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioHealthChecker, PerformanceMonitor };
}

// Auto-run health check if in browser
if (typeof window !== 'undefined') {
    window.PortfolioHealthChecker = PortfolioHealthChecker;
    window.PerformanceMonitor = PerformanceMonitor;
    
    // Run health check on page load
    document.addEventListener('DOMContentLoaded', () => {
        const healthChecker = new PortfolioHealthChecker();
        healthChecker.runHealthCheck().then(report => {
            console.log('Health check completed:', report);
        });
        
        const perfMonitor = new PerformanceMonitor();
        setTimeout(() => {
            const perfReport = perfMonitor.generatePerformanceReport();
            console.log('Performance report:', perfReport);
        }, 2000);
    });
}