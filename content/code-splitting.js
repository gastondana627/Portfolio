// Code Splitting and Dynamic Loading for Content Portfolio
// Implements lazy loading for modal components and non-critical JavaScript

(function() {
    'use strict';

    // Configuration
    const config = {
        modalComponents: {
            videoGallery: {
                loaded: false,
                loading: false,
                module: null
            },
            carouselViewer: {
                loaded: false,
                loading: false,
                module: null
            },
            imageGallery: {
                loaded: false,
                loading: false,
                module: null
            }
        },
        deferredScripts: []
    };

    // Load modal component on demand
    function loadModalComponent(componentName) {
        return new Promise((resolve, reject) => {
            const component = config.modalComponents[componentName];
            
            if (!component) {
                reject(new Error(`Unknown component: ${componentName}`));
                return;
            }

            // Return cached module if already loaded
            if (component.loaded && component.module) {
                resolve(component.module);
                return;
            }

            // Wait if currently loading
            if (component.loading) {
                const checkInterval = setInterval(() => {
                    if (component.loaded) {
                        clearInterval(checkInterval);
                        resolve(component.module);
                    }
                }, 100);
                return;
            }

            // Start loading
            component.loading = true;

            // Dynamically load component script
            const script = document.createElement('script');
            script.src = `components/${componentName}.js`;
            script.async = true;
            
            script.onload = () => {
                component.loaded = true;
                component.loading = false;
                component.module = window[`${componentName}Module`] || {};
                resolve(component.module);
            };

            script.onerror = () => {
                component.loading = false;
                reject(new Error(`Failed to load component: ${componentName}`));
            };

            document.head.appendChild(script);
        });
    }

    // Initialize modal lazy loading
    function initModalLazyLoading() {
        // Video gallery modal triggers
        document.addEventListener('click', function(e) {
            const segmentCard = e.target.closest('.segment-card');
            const videoItem = e.target.closest('.video-item');
            
            if (segmentCard || videoItem) {
                e.preventDefault();
                loadModalComponent('videoGallery').then(module => {
                    if (module.open) {
                        module.open(segmentCard || videoItem);
                    }
                }).catch(err => console.error(err));
            }
        });

        // Carousel viewer modal triggers - handled by content-scripts.js
        // Carousel functionality is already initialized in content-scripts.js
        // No need for code splitting here

        // Image gallery modal triggers
        document.addEventListener('click', function(e) {
            const eventCard = e.target.closest('.event-card');
            const viewGalleryBtn = e.target.closest('.btn-view-event');
            
            if (eventCard || viewGalleryBtn) {
                e.preventDefault();
                loadModalComponent('imageGallery').then(module => {
                    if (module.open) {
                        module.open(eventCard || viewGalleryBtn.closest('.event-card'));
                    }
                }).catch(err => console.error(err));
            }
        });
    }

    // Defer non-critical JavaScript
    function deferNonCriticalScripts() {
        const deferredScripts = [
            '../shared/analytics-dashboard.js',
            '../shared/seo-optimizer.js'
        ];

        // Load after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                deferredScripts.forEach(src => {
                    loadScript(src);
                });
            }, 1000);
        });
    }

    // Load script dynamically
    function loadScript(src, options = {}) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = options.async !== false;
            script.defer = options.defer || false;
            
            if (options.module) {
                script.type = 'module';
            }

            script.onload = () => {
                config.deferredScripts.push(src);
                resolve();
            };

            script.onerror = () => {
                reject(new Error(`Failed to load script: ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    // Minify inline styles (for critical CSS)
    function minifyInlineStyles() {
        const styleElements = document.querySelectorAll('style:not([data-minified])');
        
        styleElements.forEach(style => {
            if (style.textContent) {
                // Basic minification: remove comments and extra whitespace
                style.textContent = style.textContent
                    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                    .replace(/\s+/g, ' ') // Collapse whitespace
                    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove whitespace around punctuation
                    .trim();
                
                style.dataset.minified = 'true';
            }
        });
    }

    // Implement code splitting for large data files
    function splitDataFiles() {
        // Check if content data is too large
        if (typeof ContentPortfolioData !== 'undefined') {
            const dataSize = JSON.stringify(ContentPortfolioData).length;
            
            // If data is larger than 100KB, consider splitting
            if (dataSize > 100000) {
                console.log('Large data file detected. Consider splitting into separate files.');
                // Could implement dynamic loading of data chunks here
            }
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            { href: '../style.css', as: 'style' },
            { href: 'content-styles.css', as: 'style' },
            { href: '../shared/components.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            
            if (resource.as === 'style') {
                link.onload = function() {
                    this.onload = null;
                    this.rel = 'stylesheet';
                };
            }
            
            document.head.appendChild(link);
        });
    }

    // Implement resource hints
    function addResourceHints() {
        // Already added in HTML, but can add more dynamically
        const hints = [
            { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://formspree.io' }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            
            if (hint.crossorigin) {
                link.crossOrigin = hint.crossorigin;
            }
            
            document.head.appendChild(link);
        });
    }

    // Bundle critical CSS inline
    function inlineCriticalCSS() {
        // This would typically be done during build process
        // Here we can identify critical CSS and inline it
        const criticalSelectors = [
            '.hero-section',
            '.section-title',
            '.nav-links',
            'header',
            'footer'
        ];

        // In production, extract and inline these styles
        console.log('Critical CSS selectors identified:', criticalSelectors);
    }

    // Implement module preloading
    function preloadModules() {
        // Preload likely-to-be-used modules
        const likelyModules = ['videoGallery']; // Most common interaction
        
        // Preload on idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                likelyModules.forEach(moduleName => {
                    loadModalComponent(moduleName).catch(() => {
                        // Silent fail for preloading
                    });
                });
            });
        } else {
            setTimeout(() => {
                likelyModules.forEach(moduleName => {
                    loadModalComponent(moduleName).catch(() => {
                        // Silent fail for preloading
                    });
                });
            }, 2000);
        }
    }

    // Optimize third-party scripts
    function optimizeThirdPartyScripts() {
        // Defer Font Awesome loading
        const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
        if (fontAwesomeLink) {
            fontAwesomeLink.media = 'print';
            fontAwesomeLink.onload = function() {
                this.media = 'all';
            };
        }

        // Lazy load analytics
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (typeof initAnalytics === 'function') {
                    initAnalytics();
                }
            }, 2000);
        });
    }

    // Monitor performance
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor long tasks
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 50) {
                            console.warn('Long task detected:', entry.duration, 'ms');
                        }
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // Long task API not supported
            }

            // Monitor resource timing
            try {
                const resourceObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 1000) {
                            console.warn('Slow resource:', entry.name, entry.duration, 'ms');
                        }
                    }
                });
                resourceObserver.observe({ entryTypes: ['resource'] });
            } catch (e) {
                // Resource timing not supported
            }
        }
    }

    // Initialize code splitting
    function initCodeSplitting() {
        initModalLazyLoading();
        deferNonCriticalScripts();
        minifyInlineStyles();
        splitDataFiles();
        addResourceHints();
        inlineCriticalCSS();
        preloadModules();
        optimizeThirdPartyScripts();
        monitorPerformance();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeSplitting);
    } else {
        initCodeSplitting();
    }

    // Expose API
    window.CodeSplitter = {
        loadModalComponent: loadModalComponent,
        loadScript: loadScript,
        preloadCriticalResources: preloadCriticalResources
    };

})();
