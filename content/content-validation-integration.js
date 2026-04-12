/**
 * Content Portfolio Validation Integration
 * Integrates data validation, error handling, and network management
 * This file should be loaded after content-portfolio-data.js and before content-scripts.js
 */

(function() {
  'use strict';

  console.log('[ContentValidationIntegration] Initializing validation and error handling...');

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeValidation);
  } else {
    initializeValidation();
  }

  function initializeValidation() {
    // Step 1: Validate ContentPortfolioData
    if (typeof ContentPortfolioData !== 'undefined' && typeof ContentDataValidator !== 'undefined') {
      console.log('[ContentValidationIntegration] Validating ContentPortfolioData...');
      
      // Store original data
      const originalData = ContentPortfolioData;
      
      // Validate and get cleaned data
      const validatedData = ContentDataValidator.validateContentData(originalData);
      
      // Replace global ContentPortfolioData with validated version
      window.ContentPortfolioData = validatedData;
      
      // Get validation report
      const report = ContentDataValidator.getValidationReport();
      
      if (report.hasErrors) {
        console.error('[ContentValidationIntegration] Data validation found errors:', report.errors);
      }
      
      if (report.hasWarnings) {
        console.warn('[ContentValidationIntegration] Data validation found warnings:', report.warnings.length, 'warnings');
      }
      
      console.log('[ContentValidationIntegration] Data validation complete');
    } else {
      console.warn('[ContentValidationIntegration] ContentPortfolioData or ContentDataValidator not available');
    }

    // Step 2: Initialize media error handling
    if (typeof ContentMediaErrorHandler !== 'undefined') {
      console.log('[ContentValidationIntegration] Media error handler already initialized');
    } else {
      console.warn('[ContentValidationIntegration] ContentMediaErrorHandler not available');
    }

    // Step 3: Initialize network handling
    if (typeof ContentNetworkHandler !== 'undefined') {
      console.log('[ContentValidationIntegration] Network handler already initialized');
    } else {
      console.warn('[ContentValidationIntegration] ContentNetworkHandler not available');
    }

    // Step 4: Add global error handler for uncaught errors
    setupGlobalErrorHandler();

    // Step 5: Preload critical images if online
    if (ContentNetworkHandler && ContentNetworkHandler.checkOnlineStatus()) {
      preloadCriticalAssets();
    }

    console.log('[ContentValidationIntegration] Initialization complete');
  }

  /**
   * Setup global error handler
   */
  function setupGlobalErrorHandler() {
    window.addEventListener('error', function(event) {
      // Log error
      console.error('[ContentValidationIntegration] Uncaught error:', event.error);
      
      // Track in analytics if available
      if (typeof trackEvent === 'function') {
        trackEvent('JavaScript Error', event.message, event.filename + ':' + event.lineno);
      }
    });

    window.addEventListener('unhandledrejection', function(event) {
      // Log promise rejection
      console.error('[ContentValidationIntegration] Unhandled promise rejection:', event.reason);
      
      // Track in analytics if available
      if (typeof trackEvent === 'function') {
        trackEvent('Promise Rejection', event.reason?.message || 'Unknown', event.reason?.stack || '');
      }
    });
  }

  /**
   * Preload critical assets
   */
  function preloadCriticalAssets() {
    if (!ContentPortfolioData || !ContentMediaErrorHandler) {
      return;
    }

    console.log('[ContentValidationIntegration] Preloading critical assets...');

    const criticalImages = [];

    // Collect segment theme thumbnails (first 3 segments)
    if (ContentPortfolioData.segmentThemes && Array.isArray(ContentPortfolioData.segmentThemes)) {
      ContentPortfolioData.segmentThemes.slice(0, 3).forEach(segment => {
        if (segment.videos && Array.isArray(segment.videos)) {
          segment.videos.slice(0, 2).forEach(video => {
            if (video.thumbnail) {
              criticalImages.push(video.thumbnail);
            }
          });
        }
      });
    }

    // Collect AdvancingX carousel thumbnails (first 3)
    if (ContentPortfolioData.advancingX && ContentPortfolioData.advancingX.carousels) {
      ContentPortfolioData.advancingX.carousels.slice(0, 3).forEach(carousel => {
        if (carousel.thumbnail) {
          criticalImages.push(carousel.thumbnail);
        }
      });
    }

    // Collect event preview images (first 2)
    if (ContentPortfolioData.events && Array.isArray(ContentPortfolioData.events)) {
      ContentPortfolioData.events.slice(0, 2).forEach(event => {
        if (event.images && Array.isArray(event.images) && event.images.length > 0) {
          if (event.images[0].image) {
            criticalImages.push(event.images[0].image);
          }
        }
      });
    }

    // Preload images
    if (criticalImages.length > 0) {
      ContentMediaErrorHandler.preloadImages(criticalImages)
        .then(results => {
          console.log(`[ContentValidationIntegration] Preloaded ${results.successful} critical images`);
          if (results.failed > 0) {
            console.warn(`[ContentValidationIntegration] Failed to preload ${results.failed} images`);
          }
        })
        .catch(error => {
          console.error('[ContentValidationIntegration] Error preloading images:', error);
        });
    }
  }

  /**
   * Expose validation utilities globally
   */
  window.ContentValidationUtils = {
    /**
     * Get validation report
     */
    getValidationReport() {
      if (typeof ContentDataValidator !== 'undefined') {
        return ContentDataValidator.getValidationReport();
      }
      return null;
    },

    /**
     * Get media error stats
     */
    getMediaErrorStats() {
      if (typeof ContentMediaErrorHandler !== 'undefined') {
        return ContentMediaErrorHandler.getErrorStats();
      }
      return null;
    },

    /**
     * Get network status
     */
    getNetworkStatus() {
      if (typeof ContentNetworkHandler !== 'undefined') {
        return ContentNetworkHandler.getNetworkStatus();
      }
      return null;
    },

    /**
     * Get comprehensive status
     */
    getStatus() {
      return {
        validation: this.getValidationReport(),
        mediaErrors: this.getMediaErrorStats(),
        network: this.getNetworkStatus(),
        timestamp: new Date().toISOString()
      };
    },

    /**
     * Log comprehensive status
     */
    logStatus() {
      const status = this.getStatus();
      console.group('[ContentValidationUtils] System Status');
      console.log('Timestamp:', status.timestamp);
      console.log('Validation:', status.validation);
      console.log('Media Errors:', status.mediaErrors);
      console.log('Network:', status.network);
      console.groupEnd();
    },

    /**
     * Clear all error tracking
     */
    clearErrors() {
      if (typeof ContentMediaErrorHandler !== 'undefined') {
        ContentMediaErrorHandler.clearErrorTracking();
      }
      console.log('[ContentValidationUtils] Error tracking cleared');
    }
  };

  // Expose to console for debugging
  console.log('[ContentValidationIntegration] Validation utilities available at window.ContentValidationUtils');
  console.log('[ContentValidationIntegration] Use ContentValidationUtils.logStatus() to see system status');

})();
