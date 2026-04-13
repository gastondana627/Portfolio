/**
 * Performance Optimization System
 * Handles lazy loading, bundle splitting, and progressive loading
 */

class PerformanceOptimizer {
    constructor() {
        this.lazyImages = [];
        this.lazyScripts = [];
        this.portfolioAssets = {
            tech: [],
            gaming: [],
            content: []
        };
        this.loadedAssets = new Set();
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupIntersectionObserver();
        this.preloadCriticalAssets();
        this.setupProgressiveLoading();
    }

    /**
     * Set up lazy loading for images and media
     */
    setupLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            this.lazyImages.push(img);
        });

        // Lazy load background images
        const bgImages = document.querySelectorAll('[data-bg]');
        bgImages.forEach(element => {
            this.lazyImages.push(element);
        });

        // Lazy load videos
        const videos = document.querySelectorAll('video[data-src]');
        videos.forEach(video => {
            this.lazyImages.push(video);
        });
    }

    /**
     * Set up Intersection Observer for lazy loading
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadAsset(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            this.lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            this.loadAllAssets();
        }
    }

    /**
     * Load individual asset
     */
    loadAsset(element) {
        if (element.tagName === 'IMG') {
            if (element.dataset.src) {
                element.src = element.dataset.src;
                element.classList.add('loaded');
            }
        } else if (element.tagName === 'VIDEO') {
            if (element.dataset.src) {
                element.src = element.dataset.src;
                element.load();
            }
        } else if (element.dataset.bg) {
            element.style.backgroundImage = `url(${element.dataset.bg})`;
            element.classList.add('loaded');
        }

        // Add fade-in animation
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.3s ease-in-out';
        
        const handleLoad = () => {
            element.style.opacity = '1';
            element.removeEventListener('load', handleLoad);
        };
        
        element.addEventListener('load', handleLoad);
        
        // Fallback for elements that might not trigger load event
        setTimeout(() => {
            if (element.style.opacity === '0') {
                element.style.opacity = '1';
            }
        }, 500);
    }

    /**
     * Preload critical assets for current portfolio
     */
    preloadCriticalAssets() {
        const currentPortfolio = this.detectCurrentPortfolio();
        const criticalAssets = this.getCriticalAssets(currentPortfolio);

        criticalAssets.forEach(asset => {
            this.preloadAsset(asset);
        });
    }

    /**
     * Detect current portfolio based on URL and body class
     */
    detectCurrentPortfolio() {
        const path = window.location.pathname;
        const body = document.body;

        if (path.includes('/gaming') || body.classList.contains('gaming-portfolio')) {
            return 'gaming';
        } else if (path.includes('/content') || body.classList.contains('content-portfolio')) {
            return 'content';
        } else {
            return 'tech';
        }
    }

    /**
     * Get critical assets for specific portfolio
     */
    getCriticalAssets(portfolio) {
        const assets = {
            tech: [
                '/assets/Space Meditation.jpg',
                '/assets/Image 2-2-25 at 9.19 PM.jpg',
                'graph.js',
                'project-carousel.js'
            ],
            gaming: [
                'gaming/gaming-data.js',
                'gaming/gaming-scripts.js',
                'gaming/gaming-styles.css'
            ],
            content: [
                'content/content-data.js',
                'content/content-scripts.js',
                'content/content-styles.css'
            ]
        };

        return assets[portfolio] || [];
    }

    /**
     * Preload specific asset
     */
    preloadAsset(assetPath) {
        if (this.loadedAssets.has(assetPath)) {
            return;
        }

        const fileExtension = assetPath.split('.').pop().toLowerCase();
        
        if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(fileExtension)) {
            const img = new Image();
            img.src = assetPath;
            this.loadedAssets.add(assetPath);
        } else if (['js'].includes(fileExtension)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = assetPath;
            document.head.appendChild(link);
            this.loadedAssets.add(assetPath);
        } else if (['css'].includes(fileExtension)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = assetPath;
            document.head.appendChild(link);
            this.loadedAssets.add(assetPath);
        }
    }

    /**
     * Load portfolio-specific assets on demand
     */
    loadPortfolioAssets(portfolioType) {
        return new Promise((resolve, reject) => {
            const assets = this.portfolioAssets[portfolioType];
            const loadPromises = [];

            assets.forEach(asset => {
                if (!this.loadedAssets.has(asset.path)) {
                    loadPromises.push(this.loadAssetAsync(asset));
                }
            });

            Promise.all(loadPromises)
                .then(() => {
                    console.log(`${portfolioType} portfolio assets loaded`);
                    resolve();
                })
                .catch(error => {
                    console.error(`Error loading ${portfolioType} assets:`, error);
                    reject(error);
                });
        });
    }

    /**
     * Load asset asynchronously
     */
    loadAssetAsync(asset) {
        return new Promise((resolve, reject) => {
            if (asset.type === 'script') {
                const script = document.createElement('script');
                script.src = asset.path;
                script.onload = () => {
                    this.loadedAssets.add(asset.path);
                    resolve();
                };
                script.onerror = reject;
                document.head.appendChild(script);
            } else if (asset.type === 'style') {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = asset.path;
                link.onload = () => {
                    this.loadedAssets.add(asset.path);
                    resolve();
                };
                link.onerror = reject;
                document.head.appendChild(link);
            } else if (asset.type === 'image') {
                const img = new Image();
                img.onload = () => {
                    this.loadedAssets.add(asset.path);
                    resolve();
                };
                img.onerror = reject;
                img.src = asset.path;
            }
        });
    }

    /**
     * Setup progressive loading with smooth fallbacks
     */
    setupProgressiveLoading() {
        // Show loading indicators
        this.showLoadingIndicators();

        // Progressive enhancement
        this.enhanceProgressively();

        // Handle slow connections
        this.handleSlowConnections();
    }

    /**
     * Show loading indicators for better UX
     */
    showLoadingIndicators() {
        const placeholders = document.querySelectorAll('.loading-placeholder');
        placeholders.forEach(placeholder => {
            placeholder.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
        });
    }

    /**
     * Progressive enhancement for better performance
     */
    enhanceProgressively() {
        // Load non-critical features after main content
        setTimeout(() => {
            this.loadNonCriticalFeatures();
        }, 1000);
    }

    /**
     * Load non-critical features
     */
    loadNonCriticalFeatures() {
        // Load analytics
        if (typeof Analytics !== 'undefined') {
            new Analytics();
        }

        // Load additional animations
        this.loadAnimations();

        // Load social media widgets
        this.loadSocialWidgets();
    }

    /**
     * Load animations after critical content
     */
    loadAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(element => {
            const animationType = element.dataset.animate;
            element.classList.add(`animate-${animationType}`);
        });
    }

    /**
     * Load social media widgets
     */
    loadSocialWidgets() {
        // Placeholder for social media widget loading
        console.log('Loading social media widgets...');
    }

    /**
     * Handle slow connections
     */
    handleSlowConnections() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.enableLowBandwidthMode();
            }
        }
    }

    /**
     * Enable low bandwidth mode
     */
    enableLowBandwidthMode() {
        document.body.classList.add('low-bandwidth');
        
        // Reduce image quality
        const images = document.querySelectorAll('img[data-src-low]');
        images.forEach(img => {
            if (img.dataset.srcLow) {
                img.dataset.src = img.dataset.srcLow;
            }
        });

        // Disable non-essential animations
        const style = document.createElement('style');
        style.textContent = `
            .low-bandwidth * {
                animation-duration: 0.01ms !important;
                animation-delay: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Load all assets (fallback)
     */
    loadAllAssets() {
        this.lazyImages.forEach(element => {
            this.loadAsset(element);
        });
    }

    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            return {
                loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
                assetsLoaded: this.loadedAssets.size
            };
        }
        return null;
    }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}