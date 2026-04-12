// Performance Monitoring for Content Portfolio
// Tracks and reports performance metrics

(function() {
    'use strict';

    // Configuration
    const config = {
        enabled: true,
        reportToConsole: true,
        reportToAnalytics: false,
        thresholds: {
            fcp: 1800, // First Contentful Paint (ms)
            lcp: 2500, // Largest Contentful Paint (ms)
            fid: 100,  // First Input Delay (ms)
            cls: 0.1,  // Cumulative Layout Shift
            ttfb: 600  // Time to First Byte (ms)
        }
    };

    // Performance metrics storage
    const metrics = {
        navigationTiming: {},
        resourceTiming: {},
        webVitals: {},
        customMetrics: {}
    };

    // Initialize performance monitoring
    function initPerformanceMonitoring() {
        if (!config.enabled) return;

        // Wait for page load
        if (document.readyState === 'complete') {
            collectMetrics();
        } else {
            window.addEventListener('load', collectMetrics);
        }

        // Monitor Web Vitals
        monitorWebVitals();

        // Monitor resource loading
        monitorResourceTiming();

        // Monitor long tasks
        monitorLongTasks();
    }

    // Collect navigation timing metrics
    function collectMetrics() {
        if (!window.performance || !window.performance.timing) {
            console.warn('Performance API not supported');
            return;
        }

        const timing = window.performance.timing;
        const navigation = window.performance.navigation;

        // Calculate key metrics
        metrics.navigationTiming = {
            // DNS lookup time
            dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
            
            // TCP connection time
            tcpConnection: timing.connectEnd - timing.connectStart,
            
            // Time to first byte
            ttfb: timing.responseStart - timing.navigationStart,
            
            // Response time
            responseTime: timing.responseEnd - timing.responseStart,
            
            // DOM processing time
            domProcessing: timing.domComplete - timing.domLoading,
            
            // DOM content loaded
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            
            // Page load time
            pageLoad: timing.loadEventEnd - timing.navigationStart,
            
            // Navigation type
            navigationType: getNavigationType(navigation.type)
        };

        // Report metrics
        reportMetrics();
    }

    // Monitor Web Vitals
    function monitorWebVitals() {
        // First Contentful Paint (FCP)
        if ('PerformanceObserver' in window) {
            try {
                const fcpObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            metrics.webVitals.fcp = entry.startTime;
                            checkThreshold('fcp', entry.startTime);
                        }
                    }
                });
                fcpObserver.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.warn('FCP monitoring not supported');
            }

            // Largest Contentful Paint (LCP)
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    metrics.webVitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
                    checkThreshold('lcp', metrics.webVitals.lcp);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP monitoring not supported');
            }

            // First Input Delay (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        metrics.webVitals.fid = entry.processingStart - entry.startTime;
                        checkThreshold('fid', metrics.webVitals.fid);
                    }
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID monitoring not supported');
            }

            // Cumulative Layout Shift (CLS)
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                            metrics.webVitals.cls = clsValue;
                            checkThreshold('cls', clsValue);
                        }
                    }
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('CLS monitoring not supported');
            }
        }
    }

    // Monitor resource timing
    function monitorResourceTiming() {
        if (!window.performance || !window.performance.getEntriesByType) return;

        const resources = window.performance.getEntriesByType('resource');
        
        metrics.resourceTiming = {
            total: resources.length,
            byType: {},
            slowResources: []
        };

        resources.forEach(resource => {
            const type = getResourceType(resource.name);
            
            if (!metrics.resourceTiming.byType[type]) {
                metrics.resourceTiming.byType[type] = {
                    count: 0,
                    totalDuration: 0,
                    avgDuration: 0
                };
            }

            metrics.resourceTiming.byType[type].count++;
            metrics.resourceTiming.byType[type].totalDuration += resource.duration;

            // Track slow resources (> 1 second)
            if (resource.duration > 1000) {
                metrics.resourceTiming.slowResources.push({
                    name: resource.name,
                    type: type,
                    duration: resource.duration
                });
            }
        });

        // Calculate averages
        Object.keys(metrics.resourceTiming.byType).forEach(type => {
            const typeData = metrics.resourceTiming.byType[type];
            typeData.avgDuration = typeData.totalDuration / typeData.count;
        });
    }

    // Monitor long tasks
    function monitorLongTasks() {
        if (!('PerformanceObserver' in window)) return;

        try {
            const longTaskObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        if (!metrics.customMetrics.longTasks) {
                            metrics.customMetrics.longTasks = [];
                        }
                        
                        metrics.customMetrics.longTasks.push({
                            duration: entry.duration,
                            startTime: entry.startTime,
                            name: entry.name
                        });

                        console.warn('Long task detected:', {
                            duration: entry.duration,
                            startTime: entry.startTime
                        });
                    }
                }
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // Long task API not supported
        }
    }

    // Check if metric exceeds threshold
    function checkThreshold(metric, value) {
        const threshold = config.thresholds[metric];
        
        if (threshold && value > threshold) {
            console.warn(`Performance threshold exceeded for ${metric}:`, {
                value: value,
                threshold: threshold,
                difference: value - threshold
            });
        }
    }

    // Get navigation type
    function getNavigationType(type) {
        const types = {
            0: 'navigate',
            1: 'reload',
            2: 'back_forward',
            255: 'reserved'
        };
        return types[type] || 'unknown';
    }

    // Get resource type from URL
    function getResourceType(url) {
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) return 'image';
        if (url.match(/\.(css)$/i)) return 'stylesheet';
        if (url.match(/\.(js)$/i)) return 'script';
        if (url.match(/\.(woff2|woff|ttf|otf)$/i)) return 'font';
        if (url.match(/\.(mp4|webm)$/i)) return 'video';
        return 'other';
    }

    // Report metrics
    function reportMetrics() {
        if (config.reportToConsole) {
            console.group('📊 Performance Metrics');
            
            console.group('Navigation Timing');
            console.table(metrics.navigationTiming);
            console.groupEnd();

            if (Object.keys(metrics.webVitals).length > 0) {
                console.group('Web Vitals');
                console.table(metrics.webVitals);
                console.groupEnd();
            }

            if (metrics.resourceTiming.byType) {
                console.group('Resource Timing');
                console.table(metrics.resourceTiming.byType);
                if (metrics.resourceTiming.slowResources.length > 0) {
                    console.warn('Slow Resources:', metrics.resourceTiming.slowResources);
                }
                console.groupEnd();
            }

            if (metrics.customMetrics.longTasks && metrics.customMetrics.longTasks.length > 0) {
                console.group('Long Tasks');
                console.table(metrics.customMetrics.longTasks);
                console.groupEnd();
            }

            // Performance score
            const score = calculatePerformanceScore();
            console.log(`Overall Performance Score: ${score}/100`);
            
            console.groupEnd();
        }

        if (config.reportToAnalytics && typeof window.gtag === 'function') {
            // Report to Google Analytics
            reportToAnalytics();
        }
    }

    // Calculate performance score
    function calculatePerformanceScore() {
        let score = 100;

        // Deduct points for slow metrics
        if (metrics.navigationTiming.ttfb > config.thresholds.ttfb) {
            score -= 10;
        }

        if (metrics.webVitals.fcp > config.thresholds.fcp) {
            score -= 15;
        }

        if (metrics.webVitals.lcp > config.thresholds.lcp) {
            score -= 20;
        }

        if (metrics.webVitals.fid > config.thresholds.fid) {
            score -= 15;
        }

        if (metrics.webVitals.cls > config.thresholds.cls) {
            score -= 20;
        }

        if (metrics.customMetrics.longTasks && metrics.customMetrics.longTasks.length > 0) {
            score -= 10;
        }

        if (metrics.resourceTiming.slowResources && metrics.resourceTiming.slowResources.length > 5) {
            score -= 10;
        }

        return Math.max(0, score);
    }

    // Report to analytics
    function reportToAnalytics() {
        // Report navigation timing
        if (metrics.navigationTiming.pageLoad) {
            window.gtag('event', 'timing_complete', {
                name: 'page_load',
                value: Math.round(metrics.navigationTiming.pageLoad),
                event_category: 'Performance'
            });
        }

        // Report Web Vitals
        if (metrics.webVitals.lcp) {
            window.gtag('event', 'web_vitals', {
                name: 'LCP',
                value: Math.round(metrics.webVitals.lcp),
                event_category: 'Performance'
            });
        }

        if (metrics.webVitals.fid) {
            window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(metrics.webVitals.fid),
                event_category: 'Performance'
            });
        }

        if (metrics.webVitals.cls) {
            window.gtag('event', 'web_vitals', {
                name: 'CLS',
                value: Math.round(metrics.webVitals.cls * 1000) / 1000,
                event_category: 'Performance'
            });
        }
    }

    // Get current metrics
    function getMetrics() {
        return metrics;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);
    } else {
        initPerformanceMonitoring();
    }

    // Expose API
    window.PerformanceMonitor = {
        getMetrics: getMetrics,
        reportMetrics: reportMetrics,
        calculateScore: calculatePerformanceScore
    };

})();
