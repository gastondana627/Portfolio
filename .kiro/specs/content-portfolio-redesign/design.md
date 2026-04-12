# Design Document

## Overview

The Content Portfolio Redesign transforms the existing generic content creation portfolio into a specialized, media-rich showcase featuring three distinct content areas: Content Creation Segment Themes (6 video-focused segments), AdvancingX Professional Work (carousel posts and social media management), and Event Content Creation (competition and event coverage). The design emphasizes visual storytelling, seamless media playback, and intuitive navigation while maintaining performance and mobile responsiveness.

## Architecture

### High-Level Architecture

```
Content Portfolio System
├── Page Structure Layer
│   ├── Hero Section (Content Creation Focus)
│   ├── Navigation Tabs (Segments | AdvancingX | Events)
│   └── Footer with Contact CTA
├── Content Sections Layer
│   ├── Segment Themes Section
│   │   ├── Segment Grid/Cards
│   │   └── Video Gallery Modal
│   ├── AdvancingX Section
│   │   ├── Carousel Viewer
│   │   ├── Video Gallery
│   │   └── Social Media Links
│   └── Events Section
│       ├── Event Cards
│       └── Image Gallery Modal
├── Component Layer
│   ├── VideoPlayer Component
│   ├── CarouselViewer Component
│   ├── ImageGallery Component
│   ├── MediaModal Component
│   └── SocialLinks Component
├── Data Layer
│   ├── content-portfolio-data.js (structured data)
│   └── Asset Management (images, videos, URLs)
└── Utility Layer
    ├── Lazy Loading
    ├── Performance Optimization
    └── Responsive Handlers
```

### File Structure

```
content/
├── index.html (updated with new sections)
├── content-styles.css (updated with new component styles)
├── content-scripts.js (updated with new functionality)
├── content-portfolio-data.js (NEW - comprehensive data structure)
├── assets/
│   ├── images/
│   │   ├── segments/
│   │   │   ├── promptofthemonth/
│   │   │   │   ├── video-1-thumbnail.jpg
│   │   │   │   ├── video-2-thumbnail.jpg
│   │   │   │   └── ...
│   │   │   ├── foodforthought/
│   │   │   ├── vitrinesteganos/
│   │   │   ├── datumscio/
│   │   │   ├── quarters/
│   │   │   │   ├── video-thumbnails/
│   │   │   │   └── supporting-images/ (optional)
│   │   │   └── ethicalhackathons/
│   │   │       ├── knowhax/
│   │   │       │   ├── video-thumbnails/
│   │   │       │   └── supporting-images/ (optional)
│   │   │       └── ...
│   │   ├── advancingx/
│   │   │   ├── X/                    (Twitter/X platform)
│   │   │   │   ├── week9/
│   │   │   │   │   ├── Week 9 X - 1 of 3.png
│   │   │   │   │   ├── Week 9 X - 2 of 3.png
│   │   │   │   │   └── Week 9 X - 3 of 3.png
│   │   │   │   └── ...
│   │   │   ├── linkedin/             (LinkedIn platform)
│   │   │   │   ├── week4/
│   │   │   │   │   ├── W4.jpeg
│   │   │   │   │   └── ...
│   │   │   │   └── ...
│   │   │   └── instagram/            (if applicable)
│   │   │       └── ...
│   │   └── events/
│   │       ├── competition-1/
│   │       ├── competition-2/
│   │       └── ...
│   └── videos/ (optional for self-hosted)
└── components/ (NEW - reusable UI components)
    ├── video-player.js
    ├── carousel-viewer.js
    ├── image-gallery.js
    └── media-modal.js
```

## Components and Interfaces

### 1. Content Portfolio Data Structure

**Purpose**: Centralized data management for all content creation work

**Data Schema**:

```javascript
const ContentPortfolioData = {
  segmentThemes: [
    {
      id: "promptofthemonth",
      name: "Prompt of the Month",
      description: "Video editing for explanational monthly prompt topics",
      icon: "fas fa-calendar-alt",
      color: "#FF6B6B",
      contentType: "video-primary",  // Indicates video-focused segment
      videos: [
        {
          id: "potm-1",
          title: "January 2024 Prompt",
          description: "...",
          thumbnail: "assets/images/segments/promptofthemonth/video-1-thumbnail.jpg",
          videoUrl: "https://youtube.com/watch?v=...", // or local path
          duration: "5:23",
          publishDate: "2024-01-15",
          views: 1200,
          tags: ["AI", "Creative Writing"]
        },
        // ... more videos (5+ per segment)
      ],
      images: []  // Optional supporting images (minimal)
    },
    {
      id: "quarters",
      name: "Quarters",
      description: "Video editing & picking the 10 most intriguing prompts for the past quarter (Q1-Q4)",
      icon: "fas fa-chart-line",
      color: "#4ECDC4",
      contentType: "video-primary",
      videos: [
        // 5+ videos
      ],
      images: []  // Optional supporting images
    },
    {
      id: "ethicalhackathons",
      name: "Ethical Hackathons",
      description: "Video editing for participating in hackathons and creating explanatory videos of findings, outcomes, placement",
      icon: "fas fa-code",
      color: "#95E1D3",
      contentType: "video-primary",
      subCategories: [
        {
          id: "knowhax",
          name: "KnowHax",
          videos: [
            // Videos from KnowHax hackathon
          ],
          images: []  // Optional supporting images
        }
        // ... more hackathons
      ]
    },
    // ... more segments (foodforthought, vitrinesteganos, datumscio)
  ],
  
  advancingX: {
    description: "Professional content creation during tenure at AdvancingX",
    tenure: {
      start: "2023-06",
      end: "2024-03"
    },
    socialMedia: [
      {
        platform: "LinkedIn",
        handle: "@advancingx",
        url: "https://linkedin.com/company/advancingx",
        icon: "fab fa-linkedin",
        role: "Managed company page, 50+ posts"
      },
      // ... more platforms
    ],
    carousels: [
      {
        id: "x-week-9",
        title: "Week 9 Image Carousel",
        description: "Team composition and leadership shared mental models",
        publishDate: "2024-02-28",
        platform: "X",  // Twitter/X
        postUrl: "https://x.com/advancingx/status/...",
        slides: [
          {
            id: "slide-1",
            image: "assets/images/advancingx/X/week9/Week 9 X - 1 of 3.png",
            alt: "AdvancingX Week 9 - Slide 1"
          },
          {
            id: "slide-2",
            image: "assets/images/advancingx/X/week9/Week 9 X - 2 of 3.png",
            alt: "AdvancingX Week 9 - Slide 2"
          },
          {
            id: "slide-3",
            image: "assets/images/advancingx/X/week9/Week 9 X - 3 of 3.png",
            alt: "AdvancingX Week 9 - Slide 3"
          }
        ],
        engagement: {
          likes: 450,
          comments: 23,
          shares: 67
        }
      },
      {
        id: "linkedin-week-4",
        title: "Week 4 LinkedIn Post",
        description: "...",
        publishDate: "2024-01-28",
        platform: "LinkedIn",
        postUrl: "https://linkedin.com/posts/...",
        slides: [
          {
            id: "slide-1",
            image: "assets/images/advancingx/linkedin/week4/W4.jpeg",
            alt: "AdvancingX Week 4 LinkedIn"
          }
          // ... more slides if multi-image
        ],
        engagement: {
          likes: 450,
          comments: 23,
          shares: 67
        }
      },
      // ... more carousels
    ],
    videos: [
      {
        id: "ax-video-1",
        title: "AdvancingX Product Demo",
        thumbnail: "assets/images/advancingx/video-1-thumb.jpg",
        videoUrl: "https://youtube.com/watch?v=...",
        duration: "3:45",
        description: "Product demonstration video for client presentation"
      },
      // ... more videos
    ]
  },
  
  events: [
    {
      id: "competition-2024-spring",
      name: "Spring Innovation Challenge 2024",
      date: "2024-03-15",
      location: "San Francisco, CA",
      role: "Content Creator & Documenter",
      description: "Captured event highlights and competition moments",
      outcome: "2nd Place - Best Documentation",
      images: [
        {
          id: "event-1",
          image: "assets/images/events/competition-2024-spring/img-1.jpg",
          caption: "Opening ceremony",
          timestamp: "2024-03-15T09:00:00"
        },
        // ... more images
      ],
      highlights: [
        "Live event coverage",
        "Team collaboration documentation",
        "Award ceremony photography"
      ]
    },
    // ... more events
  ]
};
```

### 2. Segment Themes Section Component

**Purpose**: Display and navigate through 6 content creation segment themes

**HTML Structure**:
```html
<section id="segment-themes" class="content-section">
  <div class="container">
    <h2 class="section-title">Content Creation Segment Themes</h2>
    <p class="section-description">
      Organized video content series exploring diverse topics through creative storytelling
    </p>
    
    <div class="segment-grid">
      <!-- Dynamically generated segment cards -->
      <div class="segment-card" data-segment-id="prompt-of-the-month">
        <div class="segment-icon" style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E)">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <h3 class="segment-name">Prompt of the Month</h3>
        <p class="segment-description">Video editing for explanational monthly prompt topics</p>
        <div class="segment-stats">
          <span class="video-count"><i class="fas fa-video"></i> 8 Videos</span>
          <span class="total-views"><i class="fas fa-eye"></i> 12.5K Views</span>
        </div>
        <button class="btn-view-segment">View Videos</button>
      </div>
      <!-- Repeat for 6 segments -->
    </div>
  </div>
</section>
```

**Styling Approach**:
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Each segment card has unique gradient color
- Hover effects with scale and shadow
- Icon animations on hover

**Interaction**:
- Click segment card → Opens video gallery modal
- Modal displays all videos for that segment
- Video thumbnails with play overlay
- Click thumbnail → Opens video player

### 3. Video Gallery Modal Component

**Purpose**: Display all videos from a selected segment with playback functionality

**HTML Structure**:
```html
<div id="video-gallery-modal" class="modal">
  <div class="modal-content video-gallery-content">
    <div class="modal-header">
      <h3 class="modal-title">Prompt of the Month Videos</h3>
      <button class="modal-close">&times;</button>
    </div>
    
    <div class="video-gallery-grid">
      <!-- Dynamically generated video items -->
      <div class="video-item" data-video-id="potm-1">
        <div class="video-thumbnail-wrapper">
          <img src="..." alt="..." class="video-thumbnail" loading="lazy">
          <div class="video-overlay">
            <i class="fas fa-play-circle"></i>
          </div>
          <span class="video-duration">5:23</span>
        </div>
        <div class="video-info">
          <h4 class="video-title">January 2024 Prompt</h4>
          <p class="video-meta">
            <span class="video-date">Jan 15, 2024</span>
            <span class="video-views">1.2K views</span>
          </p>
        </div>
      </div>
      <!-- Repeat for all videos in segment -->
    </div>
  </div>
</div>
```

**Video Player Integration**:
- For YouTube/Vimeo: Embed iframe player
- For self-hosted: HTML5 video element with custom controls
- Lightbox-style player overlay
- Keyboard navigation (arrow keys, ESC to close)

### 4. AdvancingX Section Component

**Purpose**: Showcase professional work including carousels, videos, and social media links

**HTML Structure**:
```html
<section id="advancingx-work" class="content-section advancingx-section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">AdvancingX Professional Work</h2>
      <p class="section-description">
        Content creation and social media management during professional tenure (June 2023 - March 2024)
      </p>
    </div>
    
    <!-- Social Media Links -->
    <div class="social-media-showcase">
      <h3 class="subsection-title">Managed Social Media Accounts</h3>
      <div class="social-links-grid">
        <a href="..." target="_blank" rel="noopener noreferrer" class="social-link-card">
          <i class="fab fa-linkedin"></i>
          <div class="social-info">
            <span class="social-platform">LinkedIn</span>
            <span class="social-handle">@advancingx</span>
            <span class="social-role">50+ posts managed</span>
          </div>
        </a>
        <!-- More social platforms -->
      </div>
    </div>
    
    <!-- Carousel Posts -->
    <div class="carousel-posts-section">
      <h3 class="subsection-title">Carousel Posts</h3>
      <div class="carousel-posts-grid">
        <div class="carousel-post-card" data-carousel-id="week-9">
          <img src="assets/images/advancingx/week-9/intro.jpg" alt="Week 9 Carousel" class="carousel-preview">
          <div class="carousel-post-info">
            <h4 class="carousel-title">Week 9 Image Carousel</h4>
            <p class="carousel-description">Team composition and leadership shared mental models</p>
            <div class="carousel-meta">
              <span class="carousel-date">Feb 28, 2024</span>
              <span class="carousel-slides"><i class="fas fa-images"></i> 5 slides</span>
            </div>
            <div class="carousel-engagement">
              <span><i class="fas fa-heart"></i> 450</span>
              <span><i class="fas fa-comment"></i> 23</span>
              <span><i class="fas fa-share"></i> 67</span>
            </div>
          </div>
          <button class="btn-view-carousel">View Carousel</button>
        </div>
        <!-- More carousel posts -->
      </div>
    </div>
    
    <!-- AdvancingX Videos -->
    <div class="advancingx-videos-section">
      <h3 class="subsection-title">Video Content</h3>
      <div class="video-gallery-grid">
        <!-- Similar to segment video gallery -->
      </div>
    </div>
  </div>
</section>
```

### 5. Carousel Viewer Component

**Purpose**: Interactive carousel viewer for multi-slide social media posts

**HTML Structure**:
```html
<div id="carousel-viewer-modal" class="modal">
  <div class="modal-content carousel-viewer-content">
    <button class="modal-close">&times;</button>
    
    <div class="carousel-viewer">
      <button class="carousel-nav carousel-prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <div class="carousel-slides-container">
        <div class="carousel-slide active">
          <img src="assets/images/advancingx/week-9/intro.jpg" alt="Intro slide">
        </div>
        <div class="carousel-slide">
          <img src="assets/images/advancingx/week-9/slide-1.jpg" alt="Slide 1">
          <div class="slide-caption">Team Composition and Selection</div>
        </div>
        <!-- More slides -->
      </div>
      
      <button class="carousel-nav carousel-next">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <div class="carousel-indicators">
      <span class="indicator active"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
    </div>
    
    <div class="carousel-info">
      <h3 class="carousel-title">Week 9 Image Carousel</h3>
      <p class="carousel-description">Team composition and leadership shared mental models</p>
      <div class="carousel-meta">
        <span>Slide <span class="current-slide">1</span> of <span class="total-slides">5</span></span>
        <a href="..." target="_blank" class="view-original-post">
          <i class="fas fa-external-link-alt"></i> View Original Post
        </a>
      </div>
    </div>
  </div>
</div>
```

**Interaction Features**:
- Click/tap navigation buttons
- Swipe gestures on mobile (touch events)
- Keyboard navigation (arrow keys)
- Indicator dots show current position
- Auto-advance option (optional)
- Zoom functionality for detailed viewing

### 6. Events Section Component

**Purpose**: Display event content creation work with image galleries

**HTML Structure**:
```html
<section id="events-content" class="content-section events-section">
  <div class="container">
    <h2 class="section-title">Event Content Creation</h2>
    <p class="section-description">
      Live event coverage, competition documentation, and event photography
    </p>
    
    <div class="events-grid">
      <div class="event-card" data-event-id="competition-2024-spring">
        <div class="event-image-preview">
          <img src="assets/images/events/competition-2024-spring/img-1.jpg" alt="Event preview">
          <div class="event-image-count">
            <i class="fas fa-images"></i> 24 Photos
          </div>
        </div>
        
        <div class="event-info">
          <h3 class="event-name">Spring Innovation Challenge 2024</h3>
          <div class="event-meta">
            <span class="event-date"><i class="fas fa-calendar"></i> March 15, 2024</span>
            <span class="event-location"><i class="fas fa-map-marker-alt"></i> San Francisco, CA</span>
          </div>
          <p class="event-description">
            Captured event highlights and competition moments
          </p>
          <div class="event-outcome">
            <i class="fas fa-trophy"></i> 2nd Place - Best Documentation
          </div>
          <button class="btn-view-event">View Gallery</button>
        </div>
      </div>
      <!-- More events -->
    </div>
  </div>
</section>
```

### 7. Image Gallery Modal Component

**Purpose**: Full-screen image gallery with navigation and zoom

**HTML Structure**:
```html
<div id="image-gallery-modal" class="modal">
  <div class="modal-content image-gallery-content">
    <button class="modal-close">&times;</button>
    
    <div class="image-gallery-viewer">
      <button class="gallery-nav gallery-prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <div class="gallery-main-image">
        <img src="..." alt="..." id="gallery-current-image">
        <div class="image-caption">Opening ceremony</div>
      </div>
      
      <button class="gallery-nav gallery-next">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <div class="gallery-thumbnails">
      <div class="thumbnail-strip">
        <img src="..." alt="..." class="gallery-thumbnail active">
        <img src="..." alt="..." class="gallery-thumbnail">
        <!-- More thumbnails -->
      </div>
    </div>
    
    <div class="gallery-controls">
      <button class="btn-zoom-in"><i class="fas fa-search-plus"></i></button>
      <button class="btn-zoom-out"><i class="fas fa-search-minus"></i></button>
      <button class="btn-fullscreen"><i class="fas fa-expand"></i></button>
      <span class="image-counter">1 / 24</span>
    </div>
  </div>
</div>
```

## Data Models

### Segment Theme Model
```javascript
{
  id: string,              // Unique identifier (kebab-case)
  name: string,            // Display name
  description: string,     // Brief description
  icon: string,            // Font Awesome icon class
  color: string,           // Hex color for theming
  videos: Video[]          // Array of video objects
}
```

### Video Model
```javascript
{
  id: string,              // Unique identifier
  title: string,           // Video title
  description: string,     // Video description
  thumbnail: string,       // Path to thumbnail image
  videoUrl: string,        // YouTube/Vimeo URL or local path
  duration: string,        // Format: "MM:SS"
  publishDate: string,     // ISO date string
  views: number,           // View count (optional)
  tags: string[]           // Array of tags
}
```

### Carousel Post Model
```javascript
{
  id: string,              // Unique identifier
  title: string,           // Carousel title
  description: string,     // Brief description
  publishDate: string,     // ISO date string
  platform: string,        // Social platform (LinkedIn, Instagram, etc.)
  postUrl: string,         // URL to original post
  slides: Slide[],         // Array of slide objects
  engagement: {            // Engagement metrics
    likes: number,
    comments: number,
    shares: number
  }
}
```

### Slide Model
```javascript
{
  id: string,              // Unique identifier
  image: string,           // Path to slide image
  alt: string,             // Alt text for accessibility
  caption: string          // Optional caption/description
}
```

### Event Model
```javascript
{
  id: string,              // Unique identifier
  name: string,            // Event name
  date: string,            // ISO date string
  location: string,        // Event location
  role: string,            // Your role at event
  description: string,     // Event description
  outcome: string,         // Result/achievement (optional)
  images: Image[],         // Array of image objects
  highlights: string[]     // Key highlights
}
```

### Image Model
```javascript
{
  id: string,              // Unique identifier
  image: string,           // Path to image file
  caption: string,         // Image caption
  timestamp: string        // ISO timestamp (optional)
}
```

## Error Handling

### Missing Media Assets
- Display placeholder image with "Image not available" message
- Log error to console for debugging
- Prevent broken image icons from showing

### Failed Video Loading
- Show error message: "Video unavailable. Please try again later."
- Provide fallback to thumbnail with link to external source
- Track failed loads for monitoring

### Invalid Data Structure
- Validate data on load with schema checker
- Provide default values for missing fields
- Display user-friendly error messages
- Gracefully degrade functionality

### Network Issues
- Implement retry logic for external resources
- Show loading states during fetch operations
- Cache loaded data where appropriate
- Provide offline-friendly fallbacks

## Testing Strategy

### Unit Testing
- Test data structure validation functions
- Test component rendering with mock data
- Test utility functions (lazy loading, image optimization)
- Test event handlers and user interactions

### Integration Testing
- Test modal opening/closing flows
- Test video player integration
- Test carousel navigation
- Test image gallery functionality
- Test responsive behavior across breakpoints

### Visual Regression Testing
- Capture screenshots of each section
- Test across different screen sizes
- Verify layout consistency
- Check component styling

### Performance Testing
- Measure page load time
- Test lazy loading effectiveness
- Monitor memory usage with large galleries
- Verify Lighthouse scores (target: 85+)

### Accessibility Testing
- Keyboard navigation for all interactive elements
- Screen reader compatibility
- ARIA labels and roles
- Color contrast ratios (WCAG AA)
- Focus indicators

### Cross-Browser Testing
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### User Acceptance Testing
- Test with actual content and media files
- Verify all links work correctly
- Check video playback on different devices
- Validate carousel navigation feels natural
- Ensure mobile experience is smooth

## Performance Optimization

### Image Optimization
- Use WebP format with JPEG/PNG fallbacks
- Implement responsive images with srcset
- Lazy load images below the fold
- Compress images to appropriate quality (80-85%)
- Use thumbnail versions for previews

### Video Optimization
- Defer video loading until user interaction
- Use poster images for video elements
- Implement progressive loading for self-hosted videos
- Leverage CDN for video delivery
- Provide multiple quality options

### Code Optimization
- Minify CSS and JavaScript
- Bundle and compress assets
- Implement code splitting for modals
- Use CSS containment for isolated components
- Debounce scroll and resize events

### Caching Strategy
- Cache static assets with service worker
- Implement browser caching headers
- Store viewed content in sessionStorage
- Preload critical resources

### Loading Strategy
- Critical CSS inline in head
- Defer non-critical JavaScript
- Preconnect to external domains (YouTube, Vimeo)
- Use intersection observer for lazy loading
- Implement skeleton screens for loading states

## Responsive Design Strategy

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px

### Mobile Optimizations
- Single column layouts
- Touch-friendly button sizes (min 44x44px)
- Swipe gestures for carousels and galleries
- Simplified navigation
- Optimized image sizes

### Tablet Optimizations
- Two-column grid layouts
- Hybrid touch/mouse interactions
- Adjusted spacing and typography
- Optimized modal sizes

### Desktop Optimizations
- Multi-column grid layouts
- Hover effects and transitions
- Keyboard shortcuts
- Larger preview images
- Side-by-side content viewing

## Accessibility Considerations

### Semantic HTML
- Use appropriate heading hierarchy
- Implement landmark regions (nav, main, section)
- Use button elements for interactive controls
- Provide alt text for all images

### Keyboard Navigation
- Tab order follows logical flow
- All interactive elements keyboard accessible
- Escape key closes modals
- Arrow keys navigate galleries/carousels
- Enter/Space activates buttons

### Screen Reader Support
- ARIA labels for icon buttons
- ARIA live regions for dynamic content
- ARIA expanded/collapsed states
- Descriptive link text
- Hidden text for context

### Visual Accessibility
- Minimum 4.5:1 contrast ratio for text
- Focus indicators visible and clear
- No information conveyed by color alone
- Sufficient spacing between interactive elements
- Scalable text (no fixed pixel sizes)

## Integration with Existing Portfolio

### Navigation Integration
- Add "Content Creation" to main portfolio navigation
- Implement smooth transitions between portfolio sections
- Maintain consistent header/footer
- Use existing gradient and color schemes

### Style Consistency
- Extend existing CSS variables
- Use established typography scale
- Match button and card styles
- Maintain consistent spacing system

### Component Reuse
- Leverage existing modal components where possible
- Use shared utility functions
- Extend existing animation library
- Integrate with analytics system

### Data Integration
- Connect to existing backend if applicable
- Use consistent data fetching patterns
- Integrate with contact form system
- Link to other portfolio sections where relevant
