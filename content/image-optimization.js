// Image Optimization for Content Portfolio
// Implements WebP with fallbacks, responsive images, and compression

(function() {
    'use strict';

    // Configuration
    const config = {
        webpSupported: null,
        thumbnailSizes: {
            small: 300,
            medium: 600,
            large: 1200
        },
        compressionQuality: 85,
        responsiveBreakpoints: [320, 640, 768, 1024, 1366, 1920]
    };

    // Check WebP support
    function checkWebPSupport() {
        return new Promise((resolve) => {
            if (config.webpSupported !== null) {
                resolve(config.webpSupported);
                return;
            }

            const webP = new Image();
            webP.onload = webP.onerror = function() {
                config.webpSupported = (webP.height === 2);
                resolve(config.webpSupported);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // Initialize image optimization
    async function initImageOptimization() {
        await checkWebPSupport();
        
        // Add WebP class to body for CSS targeting
        if (config.webpSupported) {
            document.body.classList.add('webp-supported');
        } else {
            document.body.classList.add('webp-not-supported');
        }

        optimizeExistingImages();
        setupResponsiveImages();
        setupPictureElements();
    }

    // Optimize existing images
    function optimizeExistingImages() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            optimizeImage(img);
        });
    }

    // Optimize individual image
    function optimizeImage(img) {
        const originalSrc = img.src || img.dataset.src;
        
        if (!originalSrc) return;

        // Mark as optimized
        img.dataset.optimized = 'true';

        // Add responsive srcset if not present
        if (!img.srcset && !img.dataset.srcset) {
            const srcset = generateResponsiveSrcset(originalSrc);
            if (img.dataset.src) {
                img.dataset.srcset = srcset;
            } else {
                img.srcset = srcset;
            }
        }

        // Add sizes attribute if not present
        if (!img.sizes) {
            img.sizes = generateSizesAttribute(img);
        }

        // Add WebP source if supported
        if (config.webpSupported && !img.dataset.webpAdded) {
            addWebPSource(img);
        }

        // Add loading attribute for below-fold images
        if (!img.loading && !isAboveFold(img)) {
            img.loading = 'lazy';
        }

        // Add decoding attribute
        if (!img.decoding) {
            img.decoding = 'async';
        }
    }

    // Generate responsive srcset
    function generateResponsiveSrcset(originalSrc) {
        const srcsetArray = [];
        const basePath = getBasePath(originalSrc);
        const extension = getExtension(originalSrc);
        const filename = getFilename(originalSrc);

        config.responsiveBreakpoints.forEach(width => {
            // Generate optimized filename
            const optimizedSrc = `${basePath}${filename}-${width}w.${extension}`;
            srcsetArray.push(`${optimizedSrc} ${width}w`);
        });

        // Add original as largest size
        srcsetArray.push(`${originalSrc} ${config.responsiveBreakpoints[config.responsiveBreakpoints.length - 1] * 2}w`);

        return srcsetArray.join(', ');
    }

    // Generate sizes attribute based on image context
    function generateSizesAttribute(img) {
        const parent = img.closest('.segment-card, .carousel-post-card, .event-card, .design-card, .partnership-card');
        
        if (parent) {
            // Card images
            return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
        }

        const gallery = img.closest('.video-gallery-grid, .carousel-posts-grid, .events-grid');
        if (gallery) {
            // Gallery images
            return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
        }

        const hero = img.closest('.hero-section, .content-hero-image');
        if (hero) {
            // Hero images
            return '(max-width: 768px) 100vw, 50vw';
        }

        // Default
        return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px';
    }

    // Add WebP source using picture element
    function addWebPSource(img) {
        if (img.parentElement.tagName === 'PICTURE') {
            // Already in picture element
            return;
        }

        const originalSrc = img.src || img.dataset.src;
        const webpSrc = convertToWebP(originalSrc);

        // Create picture element
        const picture = document.createElement('picture');
        
        // Create WebP source
        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = webpSrc;
        if (img.sizes) {
            webpSource.sizes = img.sizes;
        }

        // Create fallback source
        const fallbackSource = document.createElement('source');
        fallbackSource.type = `image/${getExtension(originalSrc)}`;
        fallbackSource.srcset = img.srcset || originalSrc;
        if (img.sizes) {
            fallbackSource.sizes = img.sizes;
        }

        // Wrap image in picture element
        img.parentNode.insertBefore(picture, img);
        picture.appendChild(webpSource);
        picture.appendChild(fallbackSource);
        picture.appendChild(img);

        img.dataset.webpAdded = 'true';
    }

    // Setup picture elements for manual WebP implementation
    function setupPictureElements() {
        const pictures = document.querySelectorAll('picture[data-optimize]');
        
        pictures.forEach(picture => {
            const img = picture.querySelector('img');
            if (img) {
                optimizeImage(img);
            }
        });
    }

    // Setup responsive images for dynamically loaded content
    function setupResponsiveImages() {
        // Observe DOM for new images
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG' && !node.dataset.optimized) {
                            optimizeImage(node);
                        }
                        
                        const images = node.querySelectorAll && node.querySelectorAll('img:not([data-optimized])');
                        if (images) {
                            images.forEach(img => optimizeImage(img));
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Convert image path to WebP
    function convertToWebP(src) {
        const basePath = getBasePath(src);
        const filename = getFilename(src);
        return `${basePath}${filename}.webp`;
    }

    // Get base path from URL
    function getBasePath(url) {
        const lastSlash = url.lastIndexOf('/');
        return lastSlash !== -1 ? url.substring(0, lastSlash + 1) : '';
    }

    // Get filename without extension
    function getFilename(url) {
        const lastSlash = url.lastIndexOf('/');
        const lastDot = url.lastIndexOf('.');
        const start = lastSlash !== -1 ? lastSlash + 1 : 0;
        const end = lastDot !== -1 ? lastDot : url.length;
        return url.substring(start, end);
    }

    // Get file extension
    function getExtension(url) {
        const lastDot = url.lastIndexOf('.');
        return lastDot !== -1 ? url.substring(lastDot + 1) : 'jpg';
    }

    // Check if element is above the fold
    function isAboveFold(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Generate thumbnail URL
    function getThumbnailUrl(originalUrl, size = 'medium') {
        const width = config.thumbnailSizes[size];
        const basePath = getBasePath(originalUrl);
        const extension = getExtension(originalUrl);
        const filename = getFilename(originalUrl);
        
        return `${basePath}${filename}-${width}w.${extension}`;
    }

    // Compress image quality (for canvas-based compression)
    function compressImage(imageElement, quality = config.compressionQuality) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = imageElement.naturalWidth;
            canvas.height = imageElement.naturalHeight;
            
            ctx.drawImage(imageElement, 0, 0);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(URL.createObjectURL(blob));
                } else {
                    reject(new Error('Failed to compress image'));
                }
            }, 'image/jpeg', quality / 100);
        });
    }

    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('[data-preload="true"]');
        
        criticalImages.forEach(img => {
            const src = img.dataset.src || img.src;
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                
                // Add WebP version if supported
                if (config.webpSupported) {
                    link.type = 'image/webp';
                    link.href = convertToWebP(src);
                }
                
                document.head.appendChild(link);
            }
        });
    }

    // Create optimized image element
    function createOptimizedImage(src, alt, options = {}) {
        const picture = document.createElement('picture');
        
        // WebP source
        if (config.webpSupported) {
            const webpSource = document.createElement('source');
            webpSource.type = 'image/webp';
            webpSource.srcset = convertToWebP(src);
            picture.appendChild(webpSource);
        }
        
        // Fallback source
        const fallbackSource = document.createElement('source');
        fallbackSource.type = `image/${getExtension(src)}`;
        fallbackSource.srcset = src;
        picture.appendChild(fallbackSource);
        
        // Image element
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        img.loading = options.loading || 'lazy';
        img.decoding = 'async';
        
        if (options.sizes) {
            img.sizes = options.sizes;
        }
        
        if (options.className) {
            img.className = options.className;
        }
        
        picture.appendChild(img);
        
        return picture;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initImageOptimization();
            preloadCriticalImages();
        });
    } else {
        initImageOptimization();
        preloadCriticalImages();
    }

    // Expose API
    window.ImageOptimizer = {
        init: initImageOptimization,
        optimizeImage: optimizeImage,
        getThumbnailUrl: getThumbnailUrl,
        compressImage: compressImage,
        createOptimizedImage: createOptimizedImage,
        checkWebPSupport: checkWebPSupport,
        isWebPSupported: () => config.webpSupported
    };

})();
