// Caching and Preloading Strategy for Content Portfolio
// Implements sessionStorage caching and resource preloading

(function() {
    'use strict';

    // Configuration
    const config = {
        cachePrefix: 'content_portfolio_',
        cacheVersion: '1.0.0',
        cacheDuration: 3600000, // 1 hour in milliseconds
        sessionStorageEnabled: true,
        preloadEnabled: true
    };

    // Cache manager
    const CacheManager = {
        // Set item in cache with expiration
        set: function(key, value, duration = config.cacheDuration) {
            if (!config.sessionStorageEnabled) return false;

            try {
                const cacheKey = config.cachePrefix + key;
                const cacheData = {
                    value: value,
                    timestamp: Date.now(),
                    expiration: Date.now() + duration,
                    version: config.cacheVersion
                };

                sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
                return true;
            } catch (e) {
                console.warn('Failed to cache data:', e);
                return false;
            }
        },

        // Get item from cache
        get: function(key) {
            if (!config.sessionStorageEnabled) return null;

            try {
                const cacheKey = config.cachePrefix + key;
                const cached = sessionStorage.getItem(cacheKey);

                if (!cached) return null;

                const cacheData = JSON.parse(cached);

                // Check version
                if (cacheData.version !== config.cacheVersion) {
                    this.remove(key);
                    return null;
                }

                // Check expiration
                if (Date.now() > cacheData.expiration) {
                    this.remove(key);
                    return null;
                }

                return cacheData.value;
            } catch (e) {
                console.warn('Failed to retrieve cached data:', e);
                return null;
            }
        },

        // Remove item from cache
        remove: function(key) {
            try {
                const cacheKey = config.cachePrefix + key;
                sessionStorage.removeItem(cacheKey);
                return true;
            } catch (e) {
                console.warn('Failed to remove cached data:', e);
                return false;
            }
        },

        // Clear all cache
        clear: function() {
            try {
                const keys = Object.keys(sessionStorage);
                keys.forEach(key => {
                    if (key.startsWith(config.cachePrefix)) {
                        sessionStorage.removeItem(key);
                    }
                });
                return true;
            } catch (e) {
                console.warn('Failed to clear cache:', e);
                return false;
            }
        },

        // Get cache size
        getSize: function() {
            try {
                let size = 0;
                const keys = Object.keys(sessionStorage);
                keys.forEach(key => {
                    if (key.startsWith(config.cachePrefix)) {
                        size += sessionStorage.getItem(key).length;
                    }
                });
                return size;
            } catch (e) {
                return 0;
            }
        }
    };

    // Preload manager
    const PreloadManager = {
        preloadedResources: new Set(),

        // Preload critical resources
        preloadCritical: function() {
            const criticalResources = [
                // Hero images
                { href: 'assets/images/hero-content.jpg', as: 'image', type: 'image/jpeg' },
                
                // Critical fonts (if self-hosted)
                // { href: 'fonts/space-grotesk.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
            ];

            criticalResources.forEach(resource => {
                this.preloadResource(resource);
            });
        },

        // Preload resource
        preloadResource: function(resource) {
            if (this.preloadedResources.has(resource.href)) return;

            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;

            if (resource.type) {
                link.type = resource.type;
            }

            if (resource.crossorigin) {
                link.crossOrigin = resource.crossorigin;
            }

            link.onload = () => {
                this.preloadedResources.add(resource.href);
            };

            link.onerror = () => {
                console.warn('Failed to preload resource:', resource.href);
            };

            document.head.appendChild(link);
        },

        // Prefetch resources for next navigation
        prefetchNextPage: function(url) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        },

        // Preconnect to external domains
        preconnectDomains: function() {
            const domains = [
                'https://www.youtube.com',
                'https://player.vimeo.com',
                'https://formspree.io'
            ];

            domains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }
    };

    // Content caching
    const ContentCache = {
        // Cache viewed segment data
        cacheSegmentData: function(segmentId, data) {
            CacheManager.set(`segment_${segmentId}`, data);
        },

        // Get cached segment data
        getSegmentData: function(segmentId) {
            return CacheManager.get(`segment_${segmentId}`);
        },

        // Cache carousel data
        cacheCarouselData: function(carouselId, data) {
            CacheManager.set(`carousel_${carouselId}`, data);
        },

        // Get cached carousel data
        getCarouselData: function(carouselId) {
            return CacheManager.get(`carousel_${carouselId}`);
        },

        // Cache event data
        cacheEventData: function(eventId, data) {
            CacheManager.set(`event_${eventId}`, data);
        },

        // Get cached event data
        getEventData: function(eventId) {
            return CacheManager.get(`event_${eventId}`);
        },

        // Cache user preferences
        cachePreferences: function(preferences) {
            CacheManager.set('user_preferences', preferences, 86400000); // 24 hours
        },

        // Get cached preferences
        getPreferences: function() {
            return CacheManager.get('user_preferences');
        },

        // Track viewed content
        trackViewedContent: function(contentType, contentId) {
            const viewedKey = 'viewed_content';
            let viewed = CacheManager.get(viewedKey) || {};
            
            if (!viewed[contentType]) {
                viewed[contentType] = [];
            }
            
            if (!viewed[contentType].includes(contentId)) {
                viewed[contentType].push(contentId);
                CacheManager.set(viewedKey, viewed, 86400000); // 24 hours
            }
        },

        // Get viewed content
        getViewedContent: function(contentType) {
            const viewed = CacheManager.get('viewed_content') || {};
            return viewed[contentType] || [];
        }
    };

    // Browser caching headers helper (for server configuration)
    const CacheHeaders = {
        // Generate cache control recommendations
        getRecommendations: function() {
            return {
                staticAssets: {
                    images: 'public, max-age=31536000, immutable', // 1 year
                    css: 'public, max-age=31536000, immutable',
                    js: 'public, max-age=31536000, immutable',
                    fonts: 'public, max-age=31536000, immutable'
                },
                dynamicContent: {
                    html: 'no-cache, must-revalidate',
                    api: 'no-cache, must-revalidate'
                },
                media: {
                    videos: 'public, max-age=604800', // 1 week
                    thumbnails: 'public, max-age=2592000' // 30 days
                }
            };
        },

        // Generate .htaccess rules
        generateHtaccess: function() {
            return `
# Browser Caching Configuration
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Images
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    
    # CSS and JavaScript
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    
    # Fonts
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/ttf "access plus 1 year"
    
    # Videos
    ExpiresByType video/mp4 "access plus 1 week"
    ExpiresByType video/webm "access plus 1 week"
    
    # HTML
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Cache-Control Headers
<IfModule mod_headers.c>
    # Static assets with versioning
    <FilesMatch "\\.(jpg|jpeg|png|gif|webp|svg|css|js|woff2|woff|ttf)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    # HTML files
    <FilesMatch "\\.html$">
        Header set Cache-Control "no-cache, must-revalidate"
    </FilesMatch>
</IfModule>
            `.trim();
        },

        // Generate Netlify headers
        generateNetlifyHeaders: function() {
            return `
# Browser Caching Configuration for Netlify
/assets/images/*
  Cache-Control: public, max-age=31536000, immutable

/assets/videos/*
  Cache-Control: public, max-age=604800

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: no-cache, must-revalidate
            `.trim();
        }
    };

    // Service Worker registration (optional)
    const ServiceWorkerManager = {
        register: function() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('Service Worker registered:', registration);
                        })
                        .catch(error => {
                            console.log('Service Worker registration failed:', error);
                        });
                });
            }
        },

        unregister: function() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => {
                        registration.unregister();
                    });
                });
            }
        }
    };

    // Initialize caching strategy
    function initCachingStrategy() {
        // Preload critical resources
        if (config.preloadEnabled) {
            PreloadManager.preloadCritical();
            PreloadManager.preconnectDomains();
        }

        // Initialize content caching
        setupContentCaching();

        // Setup cache cleanup on page unload
        window.addEventListener('beforeunload', () => {
            cleanupExpiredCache();
        });

        // Monitor cache size
        monitorCacheSize();

        // Log cache recommendations
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Cache Headers Recommendations:', CacheHeaders.getRecommendations());
        }
    }

    // Setup content caching
    function setupContentCaching() {
        // Cache segment data when viewed
        document.addEventListener('click', function(e) {
            const segmentCard = e.target.closest('.segment-card');
            if (segmentCard && segmentCard.dataset.segmentId) {
                ContentCache.trackViewedContent('segment', segmentCard.dataset.segmentId);
            }

            const carouselCard = e.target.closest('.carousel-post-card');
            if (carouselCard && carouselCard.dataset.carouselId) {
                ContentCache.trackViewedContent('carousel', carouselCard.dataset.carouselId);
            }

            const eventCard = e.target.closest('.event-card');
            if (eventCard && eventCard.dataset.eventId) {
                ContentCache.trackViewedContent('event', eventCard.dataset.eventId);
            }
        });
    }

    // Cleanup expired cache
    function cleanupExpiredCache() {
        try {
            const keys = Object.keys(sessionStorage);
            keys.forEach(key => {
                if (key.startsWith(config.cachePrefix)) {
                    const cached = sessionStorage.getItem(key);
                    if (cached) {
                        const cacheData = JSON.parse(cached);
                        if (Date.now() > cacheData.expiration) {
                            sessionStorage.removeItem(key);
                        }
                    }
                }
            });
        } catch (e) {
            console.warn('Failed to cleanup cache:', e);
        }
    }

    // Monitor cache size
    function monitorCacheSize() {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const currentSize = CacheManager.getSize();

        if (currentSize > maxSize) {
            console.warn('Cache size exceeds limit. Clearing old entries...');
            CacheManager.clear();
        }
    }

    // Prefetch likely next pages
    function prefetchLikelyPages() {
        // Prefetch other portfolio sections
        const portfolioLinks = [
            '/',
            '/gaming'
        ];

        // Use Intersection Observer to prefetch when links are visible
        const linkObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const href = entry.target.getAttribute('href');
                    if (href && portfolioLinks.includes(href)) {
                        PreloadManager.prefetchNextPage(href);
                        linkObserver.unobserve(entry.target);
                    }
                }
            });
        });

        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && portfolioLinks.includes(href)) {
                linkObserver.observe(link);
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initCachingStrategy();
            prefetchLikelyPages();
        });
    } else {
        initCachingStrategy();
        prefetchLikelyPages();
    }

    // Expose API
    window.CachingStrategy = {
        CacheManager: CacheManager,
        PreloadManager: PreloadManager,
        ContentCache: ContentCache,
        CacheHeaders: CacheHeaders,
        ServiceWorkerManager: ServiceWorkerManager
    };

})();
