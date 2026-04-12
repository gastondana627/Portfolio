# Content Creation Assets

This folder contains all media assets for the content creation portfolio, organized by content type and category.

## Folder Structure Overview

```
content/assets/
├── images/
│   ├── segments/           # Content Creation Segment Themes
│   ├── advancingx/         # AdvancingX Professional Work
│   └── events/             # Event Content Creation
├── videos/                 # Self-hosted videos (optional)
├── thumbnails/             # Video and content thumbnails
└── docs/                   # Documentation and case studies
```

---

## 1. Segment Themes (`/images/segments/`)

Video-focused content series organized by theme. Each segment contains video thumbnails and supporting images.

### Structure
```
segments/
├── promptofthemonth/       # Monthly prompt exploration videos
├── foodforthought/         # Thought-provoking tech content
├── vitrinesteganos/        # Steganography and hidden messages
├── datumscio/              # Data science insights
├── quarters/               # Quarterly reviews (Q1-Q4)
└── ethicalhackathons/      # Hackathon documentation
    ├── knowhax/
    ├── devpost/
    └── kaggle/
```

### Naming Conventions
- **Video thumbnails:** `segment-topic-thumb.jpg` or `segment-date-thumb.jpg`
- **Supporting images:** `segment-topic-description.jpg`

### Examples
```
promptofthemonth/jan-2024-thumb.jpg
foodforthought/tech-society-thumb.jpg
quarters/q1-2024-thumb.jpg
ethicalhackathons/knowhax/spring-2024-thumb.jpg
```

### Image Specifications
- **Format:** JPG, PNG, or WebP
- **Thumbnail size:** 1280x720px (16:9 ratio) recommended
- **Quality:** 80-85% compression
- **File size:** Keep under 500KB for thumbnails

---

## 2. AdvancingX Professional Work (`/images/advancingx/`)

Content created during professional tenure at AdvancingX, organized by platform and week.

### Structure
```
advancingx/
├── X/                      # Twitter/X platform carousels
│   ├── week9/
│   ├── week10/
│   ├── week11/
│   └── ...
├── linkedin/               # LinkedIn platform carousels
│   ├── week4/
│   ├── week5/
│   ├── week6/
│   └── ...
├── instagram/              # Instagram content (if applicable)
└── videos/                 # AdvancingX video content
```

### Naming Conventions for Carousel Posts

**X/Twitter Platform:**
- Format: `Week [N] X - [Page] of [Total].png`
- Thumbnail: `Week [N] X Thumby.png`

**LinkedIn Platform:**
- Format: `W[N]_[Page].jpeg` or `Li Week [N] Post Pg [Page] of [Total].png`
- Thumbnail: `Li Week [N] Post Thumby.png`

### Examples
```
X/week9/Week 9 X - 1 of 3.png
X/week9/Week 9 X - 2 of 3.png
X/week9/Week 9 X - 3 of 3.png
X/week9/Week 9 X Thumby.png

linkedin/week4/W4.jpeg
linkedin/week5/W5_1.jpeg
linkedin/week5/W5_2.jpeg
```

### Image Specifications
- **Format:** PNG for X/Twitter, JPEG for LinkedIn
- **Size:** Original social media dimensions (maintain aspect ratio)
- **Quality:** High quality (90-95%) for carousel slides
- **File size:** 1-3MB per slide acceptable

### Adding New Carousel Posts

1. Create a new folder: `advancingx/[platform]/week[N]/`
2. Add all carousel slides in order
3. Add thumbnail image
4. Update `content-portfolio-data.js` with carousel metadata:
   ```javascript
   {
     id: "platform-week-N",
     title: "Week N: Topic",
     description: "Brief description",
     publishDate: "YYYY-MM-DD",
     platform: "X" or "LinkedIn",
     postUrl: "https://...",
     slides: [
       { id: "slide-1", image: "path/to/slide1.png", alt: "Description", order: 1 },
       // ... more slides
     ],
     thumbnail: "path/to/thumbnail.png",
     engagement: { likes: 0, comments: 0, shares: 0, impressions: 0 }
   }
   ```

---

## 3. Event Content Creation (`/images/events/`)

Photography and documentation from competitions, conferences, and events.

### Structure
```
events/
├── spring-innovation-2024/
├── ai-healthcare-summit-2024/
├── sustainability-hackathon-2023/
├── tech-conference-2023/
└── startup-pitch-night-2024/
```

### Naming Conventions
- **Event folder:** `event-name-year/`
- **Images:** `descriptive-name.jpg` or `event-moment-description.jpg`

### Examples
```
spring-innovation-2024/opening-ceremony.jpg
spring-innovation-2024/team-brainstorm.jpg
spring-innovation-2024/award-ceremony.jpg
ai-healthcare-summit-2024/keynote-ai.jpg
```

### Image Specifications
- **Format:** JPG or WebP
- **Size:** 1920x1080px or higher for gallery images
- **Quality:** 85-90% compression
- **File size:** Keep under 1MB per image

### Adding New Event Content

1. Create event folder: `events/event-name-year/`
2. Add all event images with descriptive names
3. Update `content-portfolio-data.js` with event metadata:
   ```javascript
   {
     id: "event-id",
     name: "Event Name",
     date: "YYYY-MM-DD",
     location: "City, State",
     role: "Your Role",
     description: "Event description",
     outcome: "Achievement or result",
     images: [
       { id: "img-1", image: "path/to/image.jpg", caption: "Description", timestamp: "ISO-date" },
       // ... more images
     ],
     highlights: ["Highlight 1", "Highlight 2"]
   }
   ```

---

## 4. Videos (`/videos/`)

Self-hosted video files (optional - prefer external hosting for large files).

### Naming Conventions
- Format: `segment-or-project-name-type.mp4`
- Examples: `promptofthemonth-jan-2024.mp4`, `advancingx-product-demo.mp4`

### Video Specifications
- **Format:** MP4 (H.264 codec) or WebM
- **Resolution:** 1920x1080px (1080p) or 1280x720px (720p)
- **Bitrate:** 5-8 Mbps for 1080p, 2.5-4 Mbps for 720p
- **File size:** Keep under 50MB when possible
- **Hosting:** Prefer YouTube/Vimeo for videos over 50MB

### External Video Hosting
For videos hosted externally, reference them in `content-portfolio-data.js`:
```javascript
videoUrl: "https://youtube.com/watch?v=VIDEO_ID"
// or
videoUrl: "https://vimeo.com/VIDEO_ID"
```

---

## 5. Thumbnails (`/thumbnails/`)

Dedicated thumbnail images for videos and content previews.

### Specifications
- **Size:** 1280x720px (16:9 ratio)
- **Format:** JPG or WebP
- **Quality:** 80-85% compression
- **File size:** 100-300KB

---

## 6. Documentation (`/docs/`)

Project documentation, case studies, and supporting materials.

### Naming Conventions
- Format: `project-or-segment-name-document-type.pdf`
- Examples: `advancingx-case-study.pdf`, `hackathon-findings.pdf`

---

## Performance Optimization Guidelines

### Image Optimization
1. **Compress all images** before uploading:
   - Use TinyPNG, ImageOptim, or Squoosh
   - Target 80-85% quality for JPG
   - Use WebP format with JPG fallback for best results

2. **Responsive images:**
   - Provide multiple sizes for different devices
   - Use `srcset` attribute in HTML
   - Implement lazy loading for below-the-fold images

3. **File size targets:**
   - Thumbnails: < 300KB
   - Carousel slides: < 1MB
   - Event photos: < 1MB
   - Hero images: < 500KB

### Video Optimization
1. **Prefer external hosting** (YouTube, Vimeo) for videos over 50MB
2. **Use poster images** for video elements
3. **Implement lazy loading** for video embeds
4. **Provide multiple quality options** when self-hosting

### Loading Strategy
- Use `loading="lazy"` attribute for images below the fold
- Implement Intersection Observer for advanced lazy loading
- Preload critical above-the-fold images
- Defer loading of non-critical assets

---

## Content Management Workflow

### Adding New Content

1. **Prepare assets:**
   - Optimize images/videos
   - Follow naming conventions
   - Organize in appropriate folders

2. **Upload assets:**
   - Place files in correct directory structure
   - Verify file paths are correct

3. **Update data file:**
   - Edit `content-portfolio-data.js`
   - Add metadata for new content
   - Include all required fields (title, description, dates, URLs, etc.)

4. **Test locally:**
   - Verify images load correctly
   - Check responsive behavior
   - Test on multiple devices

### Updating Existing Content

1. Replace asset files (keep same filename)
2. Update metadata in `content-portfolio-data.js` if needed
3. Clear browser cache and test

### Removing Content

1. Delete asset files from folders
2. Remove or comment out entries in `content-portfolio-data.js`
3. Verify no broken links remain

---

## Best Practices

### Accessibility
- Always provide descriptive `alt` text for images
- Use meaningful file names
- Ensure sufficient color contrast in graphics
- Provide captions for videos when possible

### SEO
- Use descriptive, keyword-rich file names
- Include relevant metadata in data structure
- Optimize image file sizes for fast loading
- Use semantic HTML when displaying content

### Organization
- Keep folder structure consistent
- Use clear, descriptive naming
- Document any deviations from conventions
- Maintain backup copies of original assets

### Version Control
- Don't commit large binary files to git if possible
- Use Git LFS for large assets if needed
- Consider external asset hosting for very large files
- Keep a changelog of major asset updates

---

## Quick Reference

| Content Type | Location | Recommended Size | Format |
|-------------|----------|------------------|--------|
| Segment video thumbnails | `images/segments/[segment]/` | 1280x720px | JPG, WebP |
| Carousel slides (X) | `images/advancingx/X/week[N]/` | Original size | PNG |
| Carousel slides (LinkedIn) | `images/advancingx/linkedin/week[N]/` | Original size | JPEG |
| Event photos | `images/events/[event-name]/` | 1920x1080px+ | JPG, WebP |
| Video thumbnails | `thumbnails/` | 1280x720px | JPG, WebP |
| Self-hosted videos | `videos/` | 1920x1080px | MP4, WebM |

---

## Support

For questions about asset management or content updates, refer to:
- `content-portfolio-data.js` - Main data structure
- Design document: `.kiro/specs/content-portfolio-redesign/design.md`
- Requirements: `.kiro/specs/content-portfolio-redesign/requirements.md`
