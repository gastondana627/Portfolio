/**
 * Image Optimization Utility
 * Handles responsive images, WebP conversion, and lazy loading
 */

class ImageOptimizer {
    constructor() {
        this.supportedFormats = this.detectSupportedFormats();
        this.init();
    }

    init() {
        this.setupResponsiveImages();
        this.setupWebPSupport();
        this.setupImagePlaceholders();
    }

    /**
     * Detect supported image formats
     */
    detectSupportedFormats() {
        const formats = {
            webp: false,
            avif: false,
            jpeg2000: false
        };

        // Test WebP support
        const webpCanvas = document.createElement('canvas');
        webpCanvas.width = 1;
        webpCanvas.height = 1;
        formats.webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

        // Test AVIF support (modern browsers)
        const avifImg = new Image();
        avifImg.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        avifImg.onload = () => {
            formats.avif = true;
        };

        return formats;
    }

    /**
     * Setup responsive images with srcset
     */
    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        
        images.forEach(img => {
            const basePath = img.dataset.responsive;
            const alt = img.alt || '';
            
            // Generate srcset for different screen sizes
            const srcset = this.generateSrcSet(basePath);
            const sizes = this.generateSizes();
            
            img.srcset = srcset;
            img.sizes = sizes;
            
            // Set default src for fallback
            if (!img.src) {
                img.src = `${basePath}-800w.jpg`;
            }
        });
    }

    /**
     * Generate srcset for responsive images
     */
    generateSrcSet(basePath) {
        const widths = [400, 800, 1200, 1600, 2000];
        const formats = this.supportedFormats.webp ? ['webp', 'jpg'] : ['jpg'];
        
        let srcset = [];
        
        formats.forEach(format => {
            widths.forEach(width => {
                srcset.push(`${basePath}-${width}w.${format} ${width}w`);
            });
        });
        
        return srcset.join(', ');
    }

    /**
     * Generate sizes attribute for responsive images
     */
    generateSizes() {
        return [
            '(max-width: 480px) 100vw',
            '(max-width: 768px) 90vw',
            '(max-width: 1024px) 80vw',
            '(max-width: 1200px) 70vw',
            '60vw'
        ].join(', ');
    }

    /**
     * Setup WebP support with fallbacks
     */
    setupWebPSupport() {
        if (this.supportedFormats.webp) {
            document.body.classList.add('webp-support');
            
            // Replace image sources with WebP versions
            const images = document.querySelectorAll('img[data-webp]');
            images.forEach(img => {
                if (img.dataset.webp) {
                    img.src = img.dataset.webp;
                }
            });
        } else {
            document.body.classList.add('no-webp-support');
        }
    }

    /**
     * Setup image placeholders and loading states
     */
    setupImagePlaceholders() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            // Create placeholder
            const placeholder = this.createPlaceholder(img);
            img.parentNode.insertBefore(placeholder, img);
            
            // Hide original image until loaded
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            
            // Setup load handler
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    if (placeholder.parentNode) {
                        placeholder.parentNode.removeChild(placeholder);
                    }
                }, 300);
            });
            
            // Setup error handler
            img.addEventListener('error', () => {
                placeholder.innerHTML = `
                    <div class="image-error">
                        <i class="fas fa-image"></i>
                        <p>Image unavailable</p>
                    </div>
                `;
            });
        });
    }

    /**
     * Create image placeholder
     */
    createPlaceholder(img) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            width: ${img.width || '100%'};
            height: ${img.height || '200px'};
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: 14px;
            border-radius: 8px;
        `;
        
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-image" style="font-size: 24px; margin-bottom: 8px;"></i>
                <p>Loading...</p>
            </div>
        `;
        
        return placeholder;
    }

    /**
     * Optimize image for specific use case
     */
    optimizeImage(imagePath, options = {}) {
        const {
            width = 800,
            quality = 80,
            format = 'auto'
        } = options;
        
        // In a real implementation, this would call an image optimization service
        // For now, we'll return the optimized path structure
        const extension = format === 'auto' 
            ? (this.supportedFormats.webp ? 'webp' : 'jpg')
            : format;
            
        const basePath = imagePath.replace(/\.[^/.]+$/, '');
        return `${basePath}-${width}w-q${quality}.${extension}`;
    }

    /**
     * Preload critical images
     */
    preloadCriticalImages(imagePaths) {
        imagePaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = path;
            document.head.appendChild(link);
        });
    }

    /**
     * Setup progressive JPEG loading
     */
    setupProgressiveLoading() {
        const images = document.querySelectorAll('img[data-progressive]');
        
        images.forEach(img => {
            const lowQualityPath = img.dataset.progressive;
            const highQualityPath = img.dataset.src;
            
            // Load low quality first
            img.src = lowQualityPath;
            img.style.filter = 'blur(2px)';
            
            // Load high quality in background
            const highQualityImg = new Image();
            highQualityImg.onload = () => {
                img.src = highQualityPath;
                img.style.filter = 'none';
            };
            highQualityImg.src = highQualityPath;
        });
    }

    /**
     * Get image optimization recommendations
     */
    getOptimizationRecommendations() {
        const images = document.querySelectorAll('img');
        const recommendations = [];
        
        images.forEach((img, index) => {
            const recommendation = {
                element: img,
                index: index,
                issues: []
            };
            
            // Check for missing alt text
            if (!img.alt) {
                recommendation.issues.push('Missing alt text for accessibility');
            }
            
            // Check for oversized images
            if (img.naturalWidth > img.clientWidth * 2) {
                recommendation.issues.push('Image is larger than needed for display size');
            }
            
            // Check for missing lazy loading
            if (!img.loading && !img.dataset.src) {
                recommendation.issues.push('Consider adding lazy loading');
            }
            
            // Check for missing responsive attributes
            if (!img.srcset && !img.dataset.responsive) {
                recommendation.issues.push('Consider adding responsive images');
            }
            
            if (recommendation.issues.length > 0) {
                recommendations.push(recommendation);
            }
        });
        
        return recommendations;
    }
}

// Add shimmer animation CSS
const shimmerCSS = `
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
    
    .image-placeholder {
        position: relative;
        overflow: hidden;
    }
    
    .image-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #999;
        background: #f5f5f5;
    }
    
    .image-error i {
        font-size: 24px;
        margin-bottom: 8px;
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = shimmerCSS;
document.head.appendChild(style);

// Initialize image optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}