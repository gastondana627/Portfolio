/**
 * Content Portfolio Data Validator
 * Validates data structure, provides defaults, and logs errors
 * Requirements: 4.5, 8.5
 */

const ContentDataValidator = {
  // Validation error log
  validationErrors: [],
  validationWarnings: [],

  /**
   * Main validation function for ContentPortfolioData
   */
  validateContentData(data) {
    console.log('[ContentDataValidator] Starting data validation...');
    this.validationErrors = [];
    this.validationWarnings = [];

    if (!data || typeof data !== 'object') {
      this.logError('CRITICAL', 'ContentPortfolioData is not defined or not an object');
      return this.createEmptyDataStructure();
    }

    // Validate each major section
    const validatedData = {
      segmentThemes: this.validateSegmentThemes(data.segmentThemes),
      advancingX: this.validateAdvancingX(data.advancingX),
      events: this.validateEvents(data.events)
    };

    // Log validation summary
    this.logValidationSummary();

    return validatedData;
  },

  /**
   * Validate Segment Themes section
   */
  validateSegmentThemes(segmentThemes) {
    if (!Array.isArray(segmentThemes)) {
      this.logError('ERROR', 'segmentThemes is not an array');
      return [];
    }

    return segmentThemes.map((segment, index) => {
      const validatedSegment = {
        id: this.validateString(segment.id, `segmentThemes[${index}].id`, `segment-${index}`),
        name: this.validateString(segment.name, `segmentThemes[${index}].name`, 'Unnamed Segment'),
        description: this.validateString(segment.description, `segmentThemes[${index}].description`, ''),
        icon: this.validateString(segment.icon, `segmentThemes[${index}].icon`, 'fas fa-folder'),
        color: this.validateColor(segment.color, `segmentThemes[${index}].color`),
        gradient: this.validateString(segment.gradient, `segmentThemes[${index}].gradient`, 'linear-gradient(135deg, #666, #999)'),
        contentType: this.validateString(segment.contentType, `segmentThemes[${index}].contentType`, 'video-primary'),
        videos: this.validateVideos(segment.videos, `segmentThemes[${index}].videos`),
        stats: this.validateStats(segment.stats, `segmentThemes[${index}].stats`)
      };

      // Handle subCategories for segments like ethicalhackathons
      if (segment.subCategories && Array.isArray(segment.subCategories)) {
        validatedSegment.subCategories = segment.subCategories.map((subCat, subIndex) => ({
          id: this.validateString(subCat.id, `segmentThemes[${index}].subCategories[${subIndex}].id`, `subcat-${subIndex}`),
          name: this.validateString(subCat.name, `segmentThemes[${index}].subCategories[${subIndex}].name`, 'Unnamed Subcategory'),
          description: this.validateString(subCat.description, `segmentThemes[${index}].subCategories[${subIndex}].description`, ''),
          videos: this.validateVideos(subCat.videos, `segmentThemes[${index}].subCategories[${subIndex}].videos`)
        }));
      }

      return validatedSegment;
    });
  },

  /**
   * Validate Videos array
   */
  validateVideos(videos, path) {
    if (!Array.isArray(videos)) {
      this.logWarning(`${path} is not an array, defaulting to empty array`);
      return [];
    }

    return videos.map((video, index) => ({
      id: this.validateString(video.id, `${path}[${index}].id`, `video-${index}`),
      title: this.validateString(video.title, `${path}[${index}].title`, 'Untitled Video'),
      description: this.validateString(video.description, `${path}[${index}].description`, ''),
      thumbnail: this.validateFilePath(video.thumbnail, `${path}[${index}].thumbnail`),
      videoUrl: this.validateUrl(video.videoUrl, `${path}[${index}].videoUrl`),
      duration: this.validateString(video.duration, `${path}[${index}].duration`, '0:00'),
      publishDate: this.validateDate(video.publishDate, `${path}[${index}].publishDate`),
      views: this.validateNumber(video.views, `${path}[${index}].views`, 0),
      tags: this.validateArray(video.tags, `${path}[${index}].tags`, []),
      placement: video.placement || undefined,
      teamSize: video.teamSize || undefined
    }));
  },

  /**
   * Validate AdvancingX section
   */
  validateAdvancingX(advancingX) {
    if (!advancingX || typeof advancingX !== 'object') {
      this.logError('ERROR', 'advancingX section is missing or invalid');
      return this.createEmptyAdvancingX();
    }

    return {
      description: this.validateString(advancingX.description, 'advancingX.description', ''),
      tenure: this.validateTenure(advancingX.tenure),
      socialMedia: this.validateSocialMedia(advancingX.socialMedia),
      carousels: this.validateCarousels(advancingX.carousels),
      videos: this.validateVideos(advancingX.videos, 'advancingX.videos'),
      stats: this.validateStats(advancingX.stats, 'advancingX.stats')
    };
  },

  /**
   * Validate Tenure object
   */
  validateTenure(tenure) {
    if (!tenure || typeof tenure !== 'object') {
      this.logWarning('advancingX.tenure is missing, using defaults');
      return { start: '', end: '', duration: '' };
    }

    return {
      start: this.validateDate(tenure.start, 'advancingX.tenure.start'),
      end: this.validateDate(tenure.end, 'advancingX.tenure.end'),
      duration: this.validateString(tenure.duration, 'advancingX.tenure.duration', '')
    };
  },

  /**
   * Validate Social Media array
   */
  validateSocialMedia(socialMedia) {
    if (!Array.isArray(socialMedia)) {
      this.logWarning('advancingX.socialMedia is not an array, defaulting to empty array');
      return [];
    }

    return socialMedia.map((social, index) => ({
      platform: this.validateString(social.platform, `advancingX.socialMedia[${index}].platform`, 'Unknown Platform'),
      handle: this.validateString(social.handle, `advancingX.socialMedia[${index}].handle`, ''),
      url: this.validateUrl(social.url, `advancingX.socialMedia[${index}].url`),
      icon: this.validateString(social.icon, `advancingX.socialMedia[${index}].icon`, 'fas fa-link'),
      color: this.validateColor(social.color, `advancingX.socialMedia[${index}].color`),
      role: this.validateString(social.role, `advancingX.socialMedia[${index}].role`, ''),
      description: this.validateString(social.description, `advancingX.socialMedia[${index}].description`, ''),
      stats: social.stats || {}
    }));
  },

  /**
   * Validate Carousels array
   */
  validateCarousels(carousels) {
    if (!Array.isArray(carousels)) {
      this.logWarning('advancingX.carousels is not an array, defaulting to empty array');
      return [];
    }

    return carousels.map((carousel, index) => ({
      id: this.validateString(carousel.id, `advancingX.carousels[${index}].id`, `carousel-${index}`),
      title: this.validateString(carousel.title, `advancingX.carousels[${index}].title`, 'Untitled Carousel'),
      description: this.validateString(carousel.description, `advancingX.carousels[${index}].description`, ''),
      publishDate: this.validateDate(carousel.publishDate, `advancingX.carousels[${index}].publishDate`),
      platform: this.validateString(carousel.platform, `advancingX.carousels[${index}].platform`, 'Unknown'),
      postUrl: this.validateUrl(carousel.postUrl, `advancingX.carousels[${index}].postUrl`),
      slides: this.validateSlides(carousel.slides, `advancingX.carousels[${index}].slides`),
      thumbnail: this.validateFilePath(carousel.thumbnail, `advancingX.carousels[${index}].thumbnail`),
      engagement: this.validateEngagement(carousel.engagement, `advancingX.carousels[${index}].engagement`)
    }));
  },

  /**
   * Validate Slides array
   */
  validateSlides(slides, path) {
    if (!Array.isArray(slides)) {
      this.logWarning(`${path} is not an array, defaulting to empty array`);
      return [];
    }

    if (slides.length === 0) {
      this.logWarning(`${path} is empty, carousel should have at least one slide`);
    }

    return slides.map((slide, index) => ({
      id: this.validateString(slide.id, `${path}[${index}].id`, `slide-${index}`),
      image: this.validateFilePath(slide.image, `${path}[${index}].image`),
      alt: this.validateString(slide.alt, `${path}[${index}].alt`, 'Carousel slide'),
      order: this.validateNumber(slide.order, `${path}[${index}].order`, index + 1)
    }));
  },

  /**
   * Validate Engagement object
   */
  validateEngagement(engagement, path) {
    if (!engagement || typeof engagement !== 'object') {
      this.logWarning(`${path} is missing, using defaults`);
      return { likes: 0, comments: 0, shares: 0, impressions: 0 };
    }

    return {
      likes: this.validateNumber(engagement.likes, `${path}.likes`, 0),
      comments: this.validateNumber(engagement.comments, `${path}.comments`, 0),
      shares: this.validateNumber(engagement.shares, `${path}.shares`, 0),
      impressions: this.validateNumber(engagement.impressions, `${path}.impressions`, 0)
    };
  },

  /**
   * Validate Events array
   */
  validateEvents(events) {
    if (!Array.isArray(events)) {
      this.logError('ERROR', 'events is not an array');
      return [];
    }

    return events.map((event, index) => ({
      id: this.validateString(event.id, `events[${index}].id`, `event-${index}`),
      name: this.validateString(event.name, `events[${index}].name`, 'Unnamed Event'),
      date: this.validateDate(event.date, `events[${index}].date`),
      endDate: event.endDate ? this.validateDate(event.endDate, `events[${index}].endDate`) : undefined,
      location: this.validateString(event.location, `events[${index}].location`, ''),
      venue: this.validateString(event.venue, `events[${index}].venue`, ''),
      role: this.validateString(event.role, `events[${index}].role`, ''),
      description: this.validateString(event.description, `events[${index}].description`, ''),
      outcome: this.validateString(event.outcome, `events[${index}].outcome`, ''),
      category: this.validateString(event.category, `events[${index}].category`, 'Event'),
      images: this.validateEventImages(event.images, `events[${index}].images`),
      highlights: this.validateArray(event.highlights, `events[${index}].highlights`, []),
      stats: event.stats || {}
    }));
  },

  /**
   * Validate Event Images array
   */
  validateEventImages(images, path) {
    if (!Array.isArray(images)) {
      this.logWarning(`${path} is not an array, defaulting to empty array`);
      return [];
    }

    return images.map((img, index) => ({
      id: this.validateString(img.id, `${path}[${index}].id`, `img-${index}`),
      image: this.validateFilePath(img.image, `${path}[${index}].image`),
      caption: this.validateString(img.caption, `${path}[${index}].caption`, ''),
      timestamp: img.timestamp ? this.validateDate(img.timestamp, `${path}[${index}].timestamp`) : undefined,
      tags: this.validateArray(img.tags, `${path}[${index}].tags`, [])
    }));
  },

  /**
   * Validate Stats object
   */
  validateStats(stats, path) {
    if (!stats || typeof stats !== 'object') {
      return {};
    }
    // Stats can have various properties, just return as-is if it's an object
    return stats;
  },

  // ========================================
  // PRIMITIVE VALIDATORS
  // ========================================

  /**
   * Validate string field
   */
  validateString(value, path, defaultValue = '') {
    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    }
    if (value !== undefined && value !== null && value !== '') {
      this.logWarning(`${path} is not a valid string, using default: "${defaultValue}"`);
    }
    return defaultValue;
  },

  /**
   * Validate number field
   */
  validateNumber(value, path, defaultValue = 0) {
    if (typeof value === 'number' && !isNaN(value)) {
      return value;
    }
    if (value !== undefined && value !== null) {
      this.logWarning(`${path} is not a valid number, using default: ${defaultValue}`);
    }
    return defaultValue;
  },

  /**
   * Validate array field
   */
  validateArray(value, path, defaultValue = []) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value !== undefined && value !== null) {
      this.logWarning(`${path} is not an array, using default: []`);
    }
    return defaultValue;
  },

  /**
   * Validate color (hex or named color)
   */
  validateColor(value, path) {
    const defaultColor = '#666666';
    
    if (typeof value !== 'string') {
      this.logWarning(`${path} is not a string, using default color`);
      return defaultColor;
    }

    // Check for hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      return value;
    }

    // Check for rgb/rgba
    if (/^rgba?\(/.test(value)) {
      return value;
    }

    // If it's a named color or other format, accept it
    if (value.trim() !== '') {
      return value;
    }

    this.logWarning(`${path} is not a valid color, using default`);
    return defaultColor;
  },

  /**
   * Validate URL
   */
  validateUrl(value, path) {
    if (typeof value !== 'string' || value.trim() === '') {
      this.logWarning(`${path} is empty or invalid URL`);
      return '#';
    }

    // Check if it's a valid URL format
    try {
      // Allow relative URLs and absolute URLs
      if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/') || value.startsWith('#')) {
        return value;
      }
      
      // Try to parse as URL
      new URL(value);
      return value;
    } catch (e) {
      this.logWarning(`${path} is not a valid URL: ${value}`);
      return '#';
    }
  },

  /**
   * Validate file path
   */
  validateFilePath(value, path) {
    if (typeof value !== 'string' || value.trim() === '') {
      this.logWarning(`${path} is empty or invalid file path`);
      return 'content/assets/images/placeholder.jpg';
    }

    // Check if path looks reasonable
    if (value.includes('..') || value.startsWith('/')) {
      this.logWarning(`${path} contains suspicious path: ${value}`);
    }

    return value;
  },

  /**
   * Validate date string
   */
  validateDate(value, path) {
    if (typeof value !== 'string' || value.trim() === '') {
      this.logWarning(`${path} is empty or invalid date`);
      return new Date().toISOString().split('T')[0];
    }

    // Try to parse the date
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      this.logWarning(`${path} is not a valid date: ${value}`);
      return new Date().toISOString().split('T')[0];
    }

    return value;
  },

  // ========================================
  // ERROR LOGGING
  // ========================================

  /**
   * Log validation error
   */
  logError(level, message) {
    const error = { level, message, timestamp: new Date().toISOString() };
    this.validationErrors.push(error);
    console.error(`[ContentDataValidator] ${level}: ${message}`);
  },

  /**
   * Log validation warning
   */
  logWarning(message) {
    const warning = { message, timestamp: new Date().toISOString() };
    this.validationWarnings.push(warning);
    console.warn(`[ContentDataValidator] WARNING: ${message}`);
  },

  /**
   * Log validation summary
   */
  logValidationSummary() {
    console.log('[ContentDataValidator] Validation complete');
    console.log(`[ContentDataValidator] Errors: ${this.validationErrors.length}`);
    console.log(`[ContentDataValidator] Warnings: ${this.validationWarnings.length}`);

    if (this.validationErrors.length > 0) {
      console.group('[ContentDataValidator] Errors:');
      this.validationErrors.forEach(error => {
        console.error(`${error.level}: ${error.message}`);
      });
      console.groupEnd();
    }

    if (this.validationWarnings.length > 0 && this.validationWarnings.length <= 10) {
      console.group('[ContentDataValidator] Warnings (showing first 10):');
      this.validationWarnings.slice(0, 10).forEach(warning => {
        console.warn(warning.message);
      });
      if (this.validationWarnings.length > 10) {
        console.warn(`... and ${this.validationWarnings.length - 10} more warnings`);
      }
      console.groupEnd();
    }
  },

  /**
   * Get validation report
   */
  getValidationReport() {
    return {
      errors: this.validationErrors,
      warnings: this.validationWarnings,
      hasErrors: this.validationErrors.length > 0,
      hasWarnings: this.validationWarnings.length > 0
    };
  },

  // ========================================
  // DEFAULT DATA STRUCTURES
  // ========================================

  /**
   * Create empty data structure
   */
  createEmptyDataStructure() {
    return {
      segmentThemes: [],
      advancingX: this.createEmptyAdvancingX(),
      events: []
    };
  },

  /**
   * Create empty AdvancingX structure
   */
  createEmptyAdvancingX() {
    return {
      description: '',
      tenure: { start: '', end: '', duration: '' },
      socialMedia: [],
      carousels: [],
      videos: [],
      stats: {}
    };
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentDataValidator;
}
