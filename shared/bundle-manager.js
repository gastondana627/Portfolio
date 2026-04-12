/**
 * Bundle Manager for Portfolio-Specific Asset Loading
 * Handles dynamic loading of portfolio-specific resources
 */

class BundleManager {
    constructor() {
        this.bundles = {
            tech: {
                scripts: [
                    'graph.js',
                    'project-carousel.js',
                    'cursor.js'
                ],
                styles: [
                    'graph-modal.css',
                    'project-carousel.css'
                ],
                assets: [
                    'assets/Space Meditation.jpg',
                    'assets/Image 2-2-25 at 9.19 PM.jpg'
                ]
            },
            gaming: {
                scripts: [
                    'gaming/gaming-data.js',
                    'gaming/gaming-scripts.js'
                ],
                styles: [
                    'gaming/gaming-styles.css'
                ],
                assets: []
            },
            content: {
                scripts: [
                    'content/content-data.js',
                    'content/content-scripts.js'
                ],
                styles: [
                    'content/content-styles.css'
                ],
                assets: []
            },
            shared: {
                scripts: [
                    'shared/components.js',
                    'shared/cross-portfolio-connections.js',
                    'shared/portfolio-discovery.js',
                    'shared/analytics.js',
                    'shared/contact-system.js'
                ],
                styles: [
                    'shared/components.css',
                    'shared/discovery-styles.css'
                ],
                assets: []
            }
        };
        
        this.loadedBundles = new Set();
        this.loadingPromises = new Map();
        this.init();
    }

    init() {
        this.detectCurrentPortfolio();
        this.preloadSharedBundle();
    }

    /**
     * Detect current portfolio and load appropriate bundle
     */
    detectCurrentPortfolio() {
        const path = window.location.pathname;
        const body = document.body;

        let portfolio = 'tech'; // default

        if (path.includes('/gaming') || body.classList.contains('gaming-portfolio')) {
            portfolio = 'gaming';
        } else if (path.includes('/content') || body.classList.contains('content-portfolio')) {
            portfolio = 'content';
        }

        this.loadBundle(portfolio);
        return portfolio;
    }

    /**
     * Load specific bundle
     */
    async loadBundle(bundleName) {
        if (this.loadedBundles.has(bundleName)) {
            return Promise.resolve();
        }

        if (this.loadingPromises.has(bundleName)) {
            return this.loadingPromises.get(bundleName);
        }

        const bundle = this.bundles[bundleName];
        if (!bundle) {
            console.warn(`Bundle ${bundleName} not found`);
            return Promise.resolve();
        }

        const loadPromise = this.loadBundleAssets(bundle, bundleName);
        this.loadingPromises.set(bundleName, loadPromise);

        try {
            await loadPromise;
            this.loadedBundles.add(bundleName);
            this.loadingPromises.delete(bundleName);
            console.log(`Bundle ${bundleName} loaded successfully`);
        } catch (error) {
            console.error(`Error loading bundle ${bundleName}:`, error);
            this.loadingPromises.delete(bundleName);
        }

        return loadPromise;
    }

    /**
     * Load all assets in a bundle
     */
    async loadBundleAssets(bundle, bundleName) {
        const loadPromises = [];

        // Load styles first (non-blocking)
        bundle.styles.forEach(stylePath => {
            loadPromises.push(this.loadStylesheet(stylePath));
        });

        // Load scripts
        bundle.scripts.forEach(scriptPath => {
            loadPromises.push(this.loadScript(scriptPath));
        });

        // Preload assets
        bundle.assets.forEach(assetPath => {
            loadPromises.push(this.preloadAsset(assetPath));
        });

        return Promise.all(loadPromises);
    }

    /**
     * Load stylesheet dynamically
     */
    loadStylesheet(href) {
        return new Promise((resolve, reject) => {
            const absoluteHref = href.startsWith('/') ? href : '/' + href;

            // Check if already loaded
            if (document.querySelector(`link[href="${absoluteHref}"]`) || document.querySelector(`link[href$="${href}"]`)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = absoluteHref;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    /**
     * Load script dynamically
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const absoluteSrc = src.startsWith('/') ? src : '/' + src;

            // Check if already loaded
            if (document.querySelector(`script[src="${absoluteSrc}"]`) || document.querySelector(`script[src$="${src}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = absoluteSrc;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Preload asset
     */
    preloadAsset(href) {
        return new Promise((resolve) => {
            const absoluteHref = href.startsWith('/') ? href : '/' + href;
            
            const link = document.createElement('link');
            link.rel = 'preload';
            
            // Determine asset type
            const extension = absoluteHref.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(extension)) {
                link.as = 'image';
            } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
                link.as = 'video';
            } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
                link.as = 'audio';
            } else {
                link.as = 'fetch';
                link.crossOrigin = 'anonymous';
            }
            
            link.href = absoluteHref;
            link.onload = resolve;
            link.onerror = resolve; // Don't fail the bundle for missing assets
            document.head.appendChild(link);
        });
    }

    /**
     * Preload shared bundle (always needed)
     */
    async preloadSharedBundle() {
        await this.loadBundle('shared');
    }

    /**
     * Load bundle on demand (for navigation)
     */
    async loadBundleOnDemand(portfolioType) {
        if (!this.bundles[portfolioType]) {
            console.warn(`Portfolio type ${portfolioType} not found`);
            return;
        }

        try {
            await this.loadBundle(portfolioType);
            
            // Trigger portfolio-specific initialization
            this.initializePortfolio(portfolioType);
            
        } catch (error) {
            console.error(`Failed to load ${portfolioType} bundle:`, error);
        }
    }

    /**
     * Initialize portfolio-specific functionality
     */
    initializePortfolio(portfolioType) {
        // Dispatch custom event for portfolio initialization
        const event = new CustomEvent('portfolioLoaded', {
            detail: { portfolio: portfolioType }
        });
        document.dispatchEvent(event);

        // Portfolio-specific initialization
        switch (portfolioType) {
            case 'gaming':
                if (typeof initializeGamingPortfolio === 'function') {
                    initializeGamingPortfolio();
                }
                break;
            case 'content':
                if (typeof initializeContentPortfolio === 'function') {
                    initializeContentPortfolio();
                }
                break;
            case 'tech':
                if (typeof initializeTechPortfolio === 'function') {
                    initializeTechPortfolio();
                }
                break;
        }
    }

    /**
     * Unload bundle to free memory
     */
    unloadBundle(bundleName) {
        if (!this.loadedBundles.has(bundleName)) {
            return;
        }

        const bundle = this.bundles[bundleName];
        if (!bundle) return;

        // Remove stylesheets
        bundle.styles.forEach(stylePath => {
            const link = document.querySelector(`link[href="${stylePath}"]`);
            if (link) {
                link.remove();
            }
        });

        // Note: Scripts can't be easily unloaded, but we can mark bundle as unloaded
        this.loadedBundles.delete(bundleName);
        console.log(`Bundle ${bundleName} unloaded`);
    }

    /**
     * Get bundle loading status
     */
    getBundleStatus() {
        const status = {};
        Object.keys(this.bundles).forEach(bundleName => {
            status[bundleName] = {
                loaded: this.loadedBundles.has(bundleName),
                loading: this.loadingPromises.has(bundleName)
            };
        });
        return status;
    }

    /**
     * Prefetch bundle for faster navigation
     */
    prefetchBundle(bundleName) {
        if (this.loadedBundles.has(bundleName) || this.loadingPromises.has(bundleName)) {
            return;
        }

        const bundle = this.bundles[bundleName];
        if (!bundle) return;

        // Prefetch with low priority
        bundle.scripts.forEach(scriptPath => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = scriptPath;
            document.head.appendChild(link);
        });

        bundle.styles.forEach(stylePath => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = stylePath;
            document.head.appendChild(link);
        });
    }

    /**
     * Setup navigation-based bundle loading
     */
    setupNavigationLoading() {
        // Listen for portfolio navigation
        document.addEventListener('click', (e) => {
            const portfolioLink = e.target.closest('[data-portfolio]');
            if (portfolioLink) {
                const portfolioType = portfolioLink.dataset.portfolio;
                this.prefetchBundle(portfolioType);
            }
        });

        // Listen for hover to prefetch
        document.addEventListener('mouseenter', (e) => {
            const portfolioLink = e.target.closest('[data-portfolio]');
            if (portfolioLink) {
                const portfolioType = portfolioLink.dataset.portfolio;
                setTimeout(() => {
                    this.prefetchBundle(portfolioType);
                }, 100); // Small delay to avoid unnecessary prefetching
            }
        }, true);
    }
}

// Initialize bundle manager
document.addEventListener('DOMContentLoaded', () => {
    window.bundleManager = new BundleManager();
    window.bundleManager.setupNavigationLoading();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BundleManager;
}