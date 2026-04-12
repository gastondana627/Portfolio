/**
 * Content Portfolio Media Error Handler
 * Handles media loading errors, provides placeholders, and implements retry logic
 * Requirements: 4.5, 9.5
 */

const ContentMediaErrorHandler = {
  // Track failed media loads
  failedImages: new Set(),
  failedVideos: new Set(),
  retryAttempts: new Map(),
  maxRetries: 2,

  // Placeholder images
  placeholders: {
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Not Available%3C/text%3E%3C/svg%3E',
    video: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23222" width="400" height="300"/%3E%3Ctext fill="%23888" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EVideo Not Available%3C/text%3E%3C/svg%3E',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect fill="%23444" width="200" height="150"/%3E%3Ctext fill="%23aaa" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EThumbnail%3C/text%3E%3C/svg%3E'
  },

  /**
   * Initialize media error handling
   */
  initialize() {
    console.log('[ContentMediaErrorHandler] Initializing media error handling...');
    this.setupGlobalImageErrorHandler();
    this.setupGlobalVideoErrorHandler();
  },

  /**
   * Setup global image error handler
   */
  setupGlobalImageErrorHandler() {
    // Use event delegation for dynamically loaded images
    document.addEventListener('error', (event) => {
      if (event.target.tagName === 'IMG') {
        this.handleImageError(event.target);
      }
    }, true);
  },

  /**
   * Setup global video error handler
   */
  setupGlobalVideoErrorHandler() {
    // Use event delegation for dynamically loaded videos
    document.addEventListener('error', (event) => {
      if (event.target.tagName === 'VIDEO') {
        this.handleVideoError(event.target);
      }
    }, true);
  },

  /**
   * Handle image loading error
   */
  handleImageError(imgElement) {
    const src = imgElement.src;
    
    // Skip if already using placeholder
    if (src.startsWith('data:image/svg+xml')) {
      return;
    }

    console.warn(`[ContentMediaErrorHandler] Image failed to load: ${src}`);
    this.failedImages.add(src);

    // Check if we should retry
    const retryCount = this.retryAttempts.get(src) || 0;
    
    if (retryCount < this.maxRetries) {
      // Attempt retry
      this.retryImageLoad(imgElement, src, retryCount);
    } else {
      // Max retries reached, show placeholder
      this.showImagePlaceholder(imgElement, src);
    }
  },

  /**
   * Retry image loading
   */
  retryImageLoad(imgElement, originalSrc, retryCount) {
    console.log(`[ContentMediaErrorHandler] Retrying image load (attempt ${retryCount + 1}/${this.maxRetries}): ${originalSrc}`);
    
    this.retryAttempts.set(originalSrc, retryCount + 1);

    // Wait before retrying (exponential backoff)
    const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s...
    
    setTimeout(() => {
      // Add cache-busting parameter
      const separator = originalSrc.includes('?') ? '&' : '?';
      const newSrc = `${originalSrc}${separator}_retry=${retryCount + 1}&_t=${Date.now()}`;
      imgElement.src = newSrc;
    }, delay);
  },

  /**
   * Show image placeholder
   */
  showImagePlaceholder(imgElement, originalSrc) {
    console.error(`[ContentMediaErrorHandler] Max retries reached for image: ${originalSrc}`);
    
    // Determine placeholder type based on context
    let placeholderType = 'image';
    if (imgElement.classList.contains('video-thumbnail') || 
        imgElement.closest('.video-thumbnail-wrapper')) {
      placeholderType = 'thumbnail';
    }

    // Set placeholder
    imgElement.src = this.placeholders[placeholderType];
    imgElement.alt = 'Image not available';
    
    // Add error class for styling
    imgElement.classList.add('media-error');
    
    // Add error indicator
    this.addErrorIndicator(imgElement, 'Image failed to load');

    // Track in analytics if available
    if (typeof trackEvent === 'function') {
      trackEvent('Media Error', 'Image Load Failed', originalSrc);
    }
  },

  /**
   * Handle video loading error
   */
  handleVideoError(videoElement) {
    const src = videoElement.src || videoElement.currentSrc;
    
    console.warn(`[ContentMediaErrorHandler] Video failed to load: ${src}`);
    this.failedVideos.add(src);

    // Check if we should retry
    const retryCount = this.retryAttempts.get(src) || 0;
    
    if (retryCount < this.maxRetries) {
      // Attempt retry
      this.retryVideoLoad(videoElement, src, retryCount);
    } else {
      // Max retries reached, show error message
      this.showVideoError(videoElement, src);
    }
  },

  /**
   * Retry video loading
   */
  retryVideoLoad(videoElement, originalSrc, retryCount) {
    console.log(`[ContentMediaErrorHandler] Retrying video load (attempt ${retryCount + 1}/${this.maxRetries}): ${originalSrc}`);
    
    this.retryAttempts.set(originalSrc, retryCount + 1);

    // Wait before retrying
    const delay = Math.pow(2, retryCount) * 1000;
    
    setTimeout(() => {
      videoElement.load();
    }, delay);
  },

  /**
   * Show video error message
   */
  showVideoError(videoElement, originalSrc) {
    console.error(`[ContentMediaErrorHandler] Max retries reached for video: ${originalSrc}`);
    
    // Hide video element
    videoElement.style.display = 'none';
    
    // Create error message container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'video-error-container';
    errorContainer.innerHTML = `
      <div class="video-error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Video unavailable</p>
        <small>Please try again later</small>
        ${originalSrc && originalSrc !== '' ? `
          <button class="btn-retry-video" data-src="${originalSrc}">
            <i class="fas fa-redo"></i> Retry
          </button>
        ` : ''}
      </div>
    `;
    
    // Insert error container after video
    videoElement.parentNode.insertBefore(errorContainer, videoElement.nextSibling);
    
    // Add retry button handler
    const retryBtn = errorContainer.querySelector('.btn-retry-video');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.manualRetryVideo(videoElement, originalSrc, errorContainer);
      });
    }

    // Track in analytics if available
    if (typeof trackEvent === 'function') {
      trackEvent('Media Error', 'Video Load Failed', originalSrc);
    }
  },

  /**
   * Manual retry for video
   */
  manualRetryVideo(videoElement, src, errorContainer) {
    console.log(`[ContentMediaErrorHandler] Manual retry for video: ${src}`);
    
    // Reset retry count for manual retry
    this.retryAttempts.delete(src);
    
    // Remove error container
    errorContainer.remove();
    
    // Show video element
    videoElement.style.display = '';
    
    // Reload video
    videoElement.load();
  },

  /**
   * Add error indicator to element
   */
  addErrorIndicator(element, message) {
    // Check if indicator already exists
    if (element.parentNode.querySelector('.media-error-indicator')) {
      return;
    }

    const indicator = document.createElement('div');
    indicator.className = 'media-error-indicator';
    indicator.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
    
    // Position indicator
    const parent = element.parentNode;
    if (parent) {
      parent.style.position = 'relative';
      parent.appendChild(indicator);
    }
  },

  /**
   * Handle external resource errors (YouTube, Vimeo, etc.)
   */
  handleExternalResourceError(type, url, container) {
    console.error(`[ContentMediaErrorHandler] External ${type} failed to load: ${url}`);
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'external-resource-error';
    errorMessage.innerHTML = `
      <div class="error-content">
        <i class="fas fa-unlink"></i>
        <h4>${type} Unavailable</h4>
        <p>Unable to load external content</p>
        ${url && url !== '#' ? `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-view-external">
            <i class="fas fa-external-link-alt"></i> View on ${type}
          </a>
        ` : ''}
      </div>
    `;
    
    // Clear container and add error message
    if (container) {
      container.innerHTML = '';
      container.appendChild(errorMessage);
    }

    // Track in analytics
    if (typeof trackEvent === 'function') {
      trackEvent('Media Error', `External ${type} Failed`, url);
    }
  },

  /**
   * Preload image with error handling
   */
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        console.log(`[ContentMediaErrorHandler] Image preloaded successfully: ${src}`);
        resolve(src);
      };
      
      img.onerror = () => {
        console.warn(`[ContentMediaErrorHandler] Image preload failed: ${src}`);
        this.failedImages.add(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  },

  /**
   * Preload multiple images
   */
  async preloadImages(srcArray) {
    console.log(`[ContentMediaErrorHandler] Preloading ${srcArray.length} images...`);
    
    const results = await Promise.allSettled(
      srcArray.map(src => this.preloadImage(src))
    );
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    console.log(`[ContentMediaErrorHandler] Preload complete: ${successful} successful, ${failed} failed`);
    
    return {
      successful,
      failed,
      results
    };
  },

  /**
   * Check if image exists
   */
  async checkImageExists(src) {
    try {
      await this.preloadImage(src);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get fallback content for missing media
   */
  getFallbackContent(type, context = {}) {
    const fallbacks = {
      video: {
        html: `
          <div class="fallback-content video-fallback">
            <i class="fas fa-video-slash"></i>
            <h4>Video Content Unavailable</h4>
            <p>${context.title || 'This video is currently unavailable'}</p>
            ${context.description ? `<small>${context.description}</small>` : ''}
          </div>
        `
      },
      image: {
        html: `
          <div class="fallback-content image-fallback">
            <i class="fas fa-image"></i>
            <p>Image not available</p>
          </div>
        `
      },
      carousel: {
        html: `
          <div class="fallback-content carousel-fallback">
            <i class="fas fa-images"></i>
            <h4>Carousel Unavailable</h4>
            <p>${context.title || 'This carousel is currently unavailable'}</p>
          </div>
        `
      },
      gallery: {
        html: `
          <div class="fallback-content gallery-fallback">
            <i class="fas fa-photo-video"></i>
            <h4>Gallery Unavailable</h4>
            <p>Unable to load gallery images</p>
          </div>
        `
      }
    };

    return fallbacks[type] || fallbacks.image;
  },

  /**
   * Get error statistics
   */
  getErrorStats() {
    return {
      failedImages: Array.from(this.failedImages),
      failedVideos: Array.from(this.failedVideos),
      totalFailedImages: this.failedImages.size,
      totalFailedVideos: this.failedVideos.size,
      retryAttempts: Object.fromEntries(this.retryAttempts)
    };
  },

  /**
   * Clear error tracking
   */
  clearErrorTracking() {
    this.failedImages.clear();
    this.failedVideos.clear();
    this.retryAttempts.clear();
    console.log('[ContentMediaErrorHandler] Error tracking cleared');
  },

  /**
   * Log error summary
   */
  logErrorSummary() {
    const stats = this.getErrorStats();
    console.group('[ContentMediaErrorHandler] Error Summary');
    console.log(`Failed Images: ${stats.totalFailedImages}`);
    console.log(`Failed Videos: ${stats.totalFailedVideos}`);
    if (stats.totalFailedImages > 0) {
      console.log('Failed Image URLs:', stats.failedImages);
    }
    if (stats.totalFailedVideos > 0) {
      console.log('Failed Video URLs:', stats.failedVideos);
    }
    console.groupEnd();
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ContentMediaErrorHandler.initialize();
  });
} else {
  ContentMediaErrorHandler.initialize();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentMediaErrorHandler;
}
