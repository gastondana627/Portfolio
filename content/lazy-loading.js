// Lazy Loading Implementation for Content Portfolio
// Implements Intersection Observer for images and videos

(function() {
    'use strict';

    // Configuration
    const config = {
        rootMargin: '50px 0px',
        threshold: 0.01,
        loadingClass: 'lazy-loading',
        loadedClass: 'lazy-loaded',
        errorClass: 'lazy-error'
    };

    // Intersection Observer for lazy loading
    let imageObserver;
    let videoObserver;

    // Initialize lazy loading
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            initImageLazyLoading();
            initVideoLazyLoading();
            initBackgroundImageLazyLoading();
        } else {
            // Fallback for browsers without IntersectionObserver
            loadAllImages();
            loadAllVideos();
        }
    }

    // Image lazy loading with Intersection Observer
    function initImageLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        if (lazyImages.length === 0) return;

        imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: config.rootMargin,
            threshold: config.threshold
        });

        lazyImages.forEach(img => {
            // Add loading class
            img.classList.add(config.loadingClass);
            
            // Show skeleton loader
            showSkeletonLoader(img);
            
            // Observe the image
            imageObserver.observe(img);
        });
    }

    // Load individual image
    function loadImage(img) {
        const src = img.dataset.src || img.src;
        const srcset = img.dataset.srcset;

        if (!src) return;

        // Create a new image to preload
        const tempImg = new Image();
        
        tempImg.onload = function() {
            // Set the actual source
            img.src = src;
            if (srcset) {
                img.srcset = srcset;
            }
            
            // Remove loading class and add loaded class
            img.classList.remove(config.loadingClass);
            img.classList.add(config.loadedClass);
            
            // Remove skeleton loader
            removeSkeletonLoader(img);
            
            // Trigger fade-in animation
            img.style.opacity = '0';
            requestAnimationFrame(() => {
                img.style.transition = 'opacity 0.3s ease-in-out';
                img.style.opacity = '1';
            });
        };

        tempImg.onerror = function() {
            img.classList.remove(config.loadingClass);
            img.classList.add(config.errorClass);
            removeSkeletonLoader(img);
            console.error('Failed to load image:', src);
        };

        tempImg.src = src;
        if (srcset) {
            tempImg.srcset = srcset;
        }
    }

    // Video lazy loading
    function initVideoLazyLoading() {
        const lazyVideos = document.querySelectorAll('video[data-src]');
        
        if (lazyVideos.length === 0) return;

        videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    loadVideo(video);
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: config.rootMargin,
            threshold: config.threshold
        });

        lazyVideos.forEach(video => {
            video.classList.add(config.loadingClass);
            showSkeletonLoader(video);
            videoObserver.observe(video);
        });
    }

    // Load individual video
    function loadVideo(video) {
        const sources = video.querySelectorAll('source[data-src]');
        
        sources.forEach(source => {
            source.src = source.dataset.src;
        });

        const posterSrc = video.dataset.poster;
        if (posterSrc) {
            video.poster = posterSrc;
        }

        video.load();
        video.classList.remove(config.loadingClass);
        video.classList.add(config.loadedClass);
        removeSkeletonLoader(video);
    }

    // Background image lazy loading
    function initBackgroundImageLazyLoading() {
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        
        if (lazyBackgrounds.length === 0) return;

        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    loadBackgroundImage(element);
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: config.rootMargin,
            threshold: config.threshold
        });

        lazyBackgrounds.forEach(element => {
            element.classList.add(config.loadingClass);
            bgObserver.observe(element);
        });
    }

    // Load background image
    function loadBackgroundImage(element) {
        const bgUrl = element.dataset.bg;
        
        if (!bgUrl) return;

        const tempImg = new Image();
        
        tempImg.onload = function() {
            element.style.backgroundImage = `url('${bgUrl}')`;
            element.classList.remove(config.loadingClass);
            element.classList.add(config.loadedClass);
        };

        tempImg.onerror = function() {
            element.classList.remove(config.loadingClass);
            element.classList.add(config.errorClass);
            console.error('Failed to load background image:', bgUrl);
        };

        tempImg.src = bgUrl;
    }

    // Show skeleton loader
    function showSkeletonLoader(element) {
        // Check if skeleton already exists
        if (element.parentElement.querySelector('.skeleton-loader')) return;

        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-loader';
        
        // Match element dimensions
        const rect = element.getBoundingClientRect();
        skeleton.style.width = rect.width ? `${rect.width}px` : '100%';
        skeleton.style.height = rect.height ? `${rect.height}px` : '200px';
        skeleton.style.position = 'absolute';
        skeleton.style.top = '0';
        skeleton.style.left = '0';
        skeleton.style.borderRadius = window.getComputedStyle(element).borderRadius;
        
        // Position parent relatively if not already
        const parent = element.parentElement;
        if (window.getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        
        parent.insertBefore(skeleton, element);
    }

    // Remove skeleton loader
    function removeSkeletonLoader(element) {
        const skeleton = element.parentElement.querySelector('.skeleton-loader');
        if (skeleton) {
            skeleton.style.opacity = '0';
            setTimeout(() => skeleton.remove(), 300);
        }
    }

    // Fallback: Load all images immediately
    function loadAllImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }

    // Fallback: Load all videos immediately
    function loadAllVideos() {
        const videos = document.querySelectorAll('video[data-src]');
        videos.forEach(video => {
            const sources = video.querySelectorAll('source[data-src]');
            sources.forEach(source => {
                source.src = source.dataset.src;
            });
            video.load();
        });
    }

    // Defer video loading until user interaction
    function deferVideoLoading() {
        const videoContainers = document.querySelectorAll('.video-placeholder, .project-video-placeholder');
        
        videoContainers.forEach(container => {
            container.addEventListener('click', function() {
                const videoId = this.dataset.videoId || this.dataset.projectId;
                if (videoId) {
                    loadVideoOnDemand(videoId, this);
                }
            }, { once: true });
        });
    }

    // Load video on demand
    function loadVideoOnDemand(videoId, container) {
        // Add loading indicator
        container.classList.add('loading-video');
        
        // Simulate video loading (replace with actual video loading logic)
        setTimeout(() => {
            container.classList.remove('loading-video');
            container.classList.add('video-ready');
        }, 500);
    }

    // Create skeleton loading states for dynamic content
    function createSkeletonStates() {
        // Add skeleton styles if not already present
        if (!document.getElementById('skeleton-styles')) {
            const style = document.createElement('style');
            style.id = 'skeleton-styles';
            style.textContent = `
                .skeleton-loader {
                    background: linear-gradient(
                        90deg,
                        rgba(128, 128, 128, 0.1) 0%,
                        rgba(128, 128, 128, 0.2) 50%,
                        rgba(128, 128, 128, 0.1) 100%
                    );
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s ease-in-out infinite;
                    border-radius: 10px;
                    transition: opacity 0.3s ease;
                }

                @keyframes skeleton-loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                .lazy-loading {
                    opacity: 0.5;
                }

                .lazy-loaded {
                    opacity: 1;
                }

                .lazy-error {
                    opacity: 0.3;
                    filter: grayscale(100%);
                }

                .loading-video::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top-color: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[data-critical="true"]');
        
        criticalImages.forEach(img => {
            const src = img.dataset.src || img.src;
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createSkeletonStates();
            preloadCriticalImages();
            initLazyLoading();
            deferVideoLoading();
        });
    } else {
        createSkeletonStates();
        preloadCriticalImages();
        initLazyLoading();
        deferVideoLoading();
    }

    // Re-initialize lazy loading for dynamically added content
    window.reinitializeLazyLoading = function() {
        if (imageObserver) {
            const newImages = document.querySelectorAll('img[data-src]:not(.lazy-loaded):not(.lazy-loading)');
            newImages.forEach(img => {
                img.classList.add(config.loadingClass);
                showSkeletonLoader(img);
                imageObserver.observe(img);
            });
        }

        if (videoObserver) {
            const newVideos = document.querySelectorAll('video[data-src]:not(.lazy-loaded):not(.lazy-loading)');
            newVideos.forEach(video => {
                video.classList.add(config.loadingClass);
                showSkeletonLoader(video);
                videoObserver.observe(video);
            });
        }
    };

    // Expose API
    window.LazyLoader = {
        init: initLazyLoading,
        reinitialize: window.reinitializeLazyLoading,
        loadImage: loadImage,
        loadVideo: loadVideo
    };

})();
