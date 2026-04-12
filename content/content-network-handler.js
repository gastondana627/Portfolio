/**
 * Content Portfolio Network Handler
 * Handles network issues, loading states, timeouts, and offline scenarios
 * Requirements: 4.5, 10.1
 */

const ContentNetworkHandler = {
  // Network state tracking
  isOnline: navigator.onLine,
  connectionType: null,
  slowConnection: false,
  
  // Timeout settings (in milliseconds)
  timeouts: {
    fetch: 10000,      // 10 seconds for fetch requests
    image: 15000,      // 15 seconds for images
    video: 20000,      // 20 seconds for videos
    external: 30000    // 30 seconds for external resources
  },

  // Loading state tracking
  activeRequests: new Map(),
  loadingElements: new Set(),

  /**
   * Initialize network handling
   */
  initialize() {
    console.log('[ContentNetworkHandler] Initializing network handling...');
    this.setupNetworkListeners();
    this.detectConnectionType();
    this.checkConnectionSpeed();
  },

  /**
   * Setup network event listeners
   */
  setupNetworkListeners() {
    // Online/offline detection
    window.addEventListener('online', () => {
      this.handleOnline();
    });

    window.addEventListener('offline', () => {
      this.handleOffline();
    });

    // Connection change detection (if supported)
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        connection.addEventListener('change', () => {
          this.handleConnectionChange();
        });
      }
    }
  },

  /**
   * Handle online event
   */
  handleOnline() {
    console.log('[ContentNetworkHandler] Connection restored');
    this.isOnline = true;
    this.hideOfflineMessage();
    this.retryFailedRequests();
    
    // Track in analytics
    if (typeof trackEvent === 'function') {
      trackEvent('Network', 'Connection Restored', 'Online');
    }
  },

  /**
   * Handle offline event
   */
  handleOffline() {
    console.warn('[ContentNetworkHandler] Connection lost');
    this.isOnline = false;
    this.showOfflineMessage();
    
    // Track in analytics
    if (typeof trackEvent === 'function') {
      trackEvent('Network', 'Connection Lost', 'Offline');
    }
  },

  /**
   * Handle connection change
   */
  handleConnectionChange() {
    this.detectConnectionType();
    this.checkConnectionSpeed();
    
    if (this.slowConnection) {
      this.showSlowConnectionWarning();
    }
  },

  /**
   * Detect connection type
   */
  detectConnectionType() {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        this.connectionType = connection.effectiveType;
        console.log(`[ContentNetworkHandler] Connection type: ${this.connectionType}`);
      }
    }
  },

  /**
   * Check connection speed
   */
  checkConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        // Consider 2g and slow-2g as slow connections
        this.slowConnection = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
        
        if (this.slowConnection) {
          console.warn('[ContentNetworkHandler] Slow connection detected');
        }
      }
    }
  },

  /**
   * Show offline message
   */
  showOfflineMessage() {
    // Check if message already exists
    if (document.getElementById('offline-message')) {
      return;
    }

    const message = document.createElement('div');
    message.id = 'offline-message';
    message.className = 'network-message offline-message';
    message.innerHTML = `
      <div class="network-message-content">
        <i class="fas fa-wifi-slash"></i>
        <div class="message-text">
          <strong>No Internet Connection</strong>
          <p>You're currently offline. Some content may not be available.</p>
        </div>
        <button class="btn-dismiss-message" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-show with animation
    setTimeout(() => {
      message.classList.add('show');
    }, 100);
  },

  /**
   * Hide offline message
   */
  hideOfflineMessage() {
    const message = document.getElementById('offline-message');
    if (message) {
      message.classList.remove('show');
      setTimeout(() => {
        message.remove();
      }, 300);
    }
  },

  /**
   * Show slow connection warning
   */
  showSlowConnectionWarning() {
    // Check if warning already exists
    if (document.getElementById('slow-connection-warning')) {
      return;
    }

    const warning = document.createElement('div');
    warning.id = 'slow-connection-warning';
    warning.className = 'network-message slow-connection-warning';
    warning.innerHTML = `
      <div class="network-message-content">
        <i class="fas fa-signal"></i>
        <div class="message-text">
          <strong>Slow Connection Detected</strong>
          <p>Content may take longer to load.</p>
        </div>
        <button class="btn-dismiss-message" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(warning);
    
    // Auto-show with animation
    setTimeout(() => {
      warning.classList.add('show');
    }, 100);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (warning.parentNode) {
        warning.classList.remove('show');
        setTimeout(() => {
          warning.remove();
        }, 300);
      }
    }, 5000);
  },

  /**
   * Fetch with timeout
   */
  async fetchWithTimeout(url, options = {}, timeout = this.timeouts.fetch) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const requestId = `fetch-${Date.now()}-${Math.random()}`;
    this.activeRequests.set(requestId, { url, startTime: Date.now() });

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      this.activeRequests.delete(requestId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      this.activeRequests.delete(requestId);
      
      if (error.name === 'AbortError') {
        console.error(`[ContentNetworkHandler] Request timeout: ${url}`);
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      
      console.error(`[ContentNetworkHandler] Fetch error: ${url}`, error);
      throw error;
    }
  },

  /**
   * Load image with timeout
   */
  loadImageWithTimeout(src, timeout = this.timeouts.image) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      let timeoutId;

      const cleanup = () => {
        clearTimeout(timeoutId);
        img.onload = null;
        img.onerror = null;
      };

      timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error(`Image load timeout: ${src}`));
      }, timeout);

      img.onload = () => {
        cleanup();
        resolve(img);
      };

      img.onerror = () => {
        cleanup();
        reject(new Error(`Image load error: ${src}`));
      };

      img.src = src;
    });
  },

  /**
   * Show loading state
   */
  showLoadingState(element, message = 'Loading...') {
    if (!element) return;

    // Add loading class
    element.classList.add('content-loading');
    this.loadingElements.add(element);

    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-message">${message}</p>
      </div>
    `;

    // Add overlay to element
    element.style.position = 'relative';
    element.appendChild(loadingOverlay);

    return loadingOverlay;
  },

  /**
   * Hide loading state
   */
  hideLoadingState(element) {
    if (!element) return;

    element.classList.remove('content-loading');
    this.loadingElements.delete(element);

    // Remove loading overlay
    const overlay = element.querySelector('.loading-overlay');
    if (overlay) {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  },

  /**
   * Show error message
   */
  showErrorMessage(container, message, options = {}) {
    if (!container) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'network-error-message';
    errorDiv.innerHTML = `
      <div class="error-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="error-content">
        <h4>${options.title || 'Error Loading Content'}</h4>
        <p>${message}</p>
        ${options.retry ? `
          <button class="btn-retry-load">
            <i class="fas fa-redo"></i> Try Again
          </button>
        ` : ''}
      </div>
    `;

    // Clear container and add error
    container.innerHTML = '';
    container.appendChild(errorDiv);

    // Add retry handler
    if (options.retry) {
      const retryBtn = errorDiv.querySelector('.btn-retry-load');
      retryBtn.addEventListener('click', options.retry);
    }
  },

  /**
   * Retry failed requests
   */
  retryFailedRequests() {
    console.log('[ContentNetworkHandler] Retrying failed requests...');
    
    // Trigger retry for failed images
    if (typeof ContentMediaErrorHandler !== 'undefined') {
      const failedImages = ContentMediaErrorHandler.getErrorStats().failedImages;
      failedImages.forEach(src => {
        const imgs = document.querySelectorAll(`img[src="${src}"]`);
        imgs.forEach(img => {
          // Reset retry count
          ContentMediaErrorHandler.retryAttempts.delete(src);
          // Reload image
          img.src = src;
        });
      });
    }
  },

  /**
   * Check if online
   */
  checkOnlineStatus() {
    return this.isOnline && navigator.onLine;
  },

  /**
   * Get offline fallback content
   */
  getOfflineFallback(type = 'general') {
    const fallbacks = {
      general: {
        title: 'Content Unavailable',
        message: 'This content requires an internet connection.',
        icon: 'fa-wifi-slash'
      },
      video: {
        title: 'Video Unavailable',
        message: 'Videos require an internet connection to play.',
        icon: 'fa-video-slash'
      },
      image: {
        title: 'Image Unavailable',
        message: 'Images require an internet connection to load.',
        icon: 'fa-image'
      },
      data: {
        title: 'Data Unavailable',
        message: 'Unable to load data. Please check your connection.',
        icon: 'fa-database'
      }
    };

    return fallbacks[type] || fallbacks.general;
  },

  /**
   * Create offline placeholder
   */
  createOfflinePlaceholder(type = 'general') {
    const fallback = this.getOfflineFallback(type);
    
    const placeholder = document.createElement('div');
    placeholder.className = 'offline-placeholder';
    placeholder.innerHTML = `
      <div class="offline-content">
        <i class="fas ${fallback.icon}"></i>
        <h4>${fallback.title}</h4>
        <p>${fallback.message}</p>
        <button class="btn-check-connection">
          <i class="fas fa-sync"></i> Check Connection
        </button>
      </div>
    `;

    // Add check connection handler
    const checkBtn = placeholder.querySelector('.btn-check-connection');
    checkBtn.addEventListener('click', () => {
      if (this.checkOnlineStatus()) {
        this.handleOnline();
        window.location.reload();
      } else {
        this.showOfflineMessage();
      }
    });

    return placeholder;
  },

  /**
   * Handle fetch error with user-friendly message
   */
  handleFetchError(error, context = '') {
    let userMessage = 'Unable to load content. ';

    if (!this.isOnline) {
      userMessage += 'Please check your internet connection.';
    } else if (error.message.includes('timeout')) {
      userMessage += 'The request took too long. Please try again.';
    } else if (error.message.includes('404')) {
      userMessage += 'The requested content was not found.';
    } else if (error.message.includes('500')) {
      userMessage += 'Server error. Please try again later.';
    } else {
      userMessage += 'Please try again later.';
    }

    console.error(`[ContentNetworkHandler] ${context}:`, error);
    
    return {
      userMessage,
      technicalMessage: error.message,
      canRetry: this.isOnline
    };
  },

  /**
   * Get active requests count
   */
  getActiveRequestsCount() {
    return this.activeRequests.size;
  },

  /**
   * Get loading elements count
   */
  getLoadingElementsCount() {
    return this.loadingElements.size;
  },

  /**
   * Clear all loading states
   */
  clearAllLoadingStates() {
    this.loadingElements.forEach(element => {
      this.hideLoadingState(element);
    });
    this.loadingElements.clear();
  },

  /**
   * Get network status
   */
  getNetworkStatus() {
    return {
      isOnline: this.isOnline,
      connectionType: this.connectionType,
      slowConnection: this.slowConnection,
      activeRequests: this.activeRequests.size,
      loadingElements: this.loadingElements.size
    };
  },

  /**
   * Log network status
   */
  logNetworkStatus() {
    const status = this.getNetworkStatus();
    console.group('[ContentNetworkHandler] Network Status');
    console.log('Online:', status.isOnline);
    console.log('Connection Type:', status.connectionType || 'Unknown');
    console.log('Slow Connection:', status.slowConnection);
    console.log('Active Requests:', status.activeRequests);
    console.log('Loading Elements:', status.loadingElements);
    console.groupEnd();
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ContentNetworkHandler.initialize();
  });
} else {
  ContentNetworkHandler.initialize();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentNetworkHandler;
}
