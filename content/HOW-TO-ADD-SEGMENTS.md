# How to Add New Content Segments

## Quick Start Guide

This guide shows you how to easily add new content to your segments without confusion.

## Step 1: Choose Your Segment Type

### Option A: Quarterly Showcase (Images)
Use this for: Project highlights, milestone achievements, quarterly reviews

### Option B: Prompt of the Month (Images)
Use this for: Monthly creative prompts, AI-generated art, themed content

### Option C: Vitrine Steganos (Videos)
Use this for: Podcast episodes, video series, commercials, branded content

## Step 2: Prepare Your Files

### For Images (Quarters or Prompt of the Month):
1. Save your images as PNG or JPG
2. Recommended size: 1920x1080 or 1280x720
3. Name them descriptively (e.g., "Q4-2024-Highlight.png")

### For Videos (Vitrine Steganos):
1. Export as MP4 format
2. Recommended: H.264 codec, 1080p or 720p
3. Keep file size reasonable (under 100MB if possible)
4. Name descriptively (e.g., "Episode-6-AI-Ethics.mp4")

## Step 3: Upload Your Files

### For Quarterly Images:
```
Upload to: content/assets/thumbnails/segments/quarters/quarter[X]/
Example: content/assets/thumbnails/segments/quarters/quarter4/project1.png
```

### For Prompt of the Month Images:
```
Upload to: content/assets/thumbnails/segments/promptofthemonth/[Month]/
Example: content/assets/thumbnails/segments/promptofthemonth/November/prompt.png
```

### For Videos:
```
Upload to: content/assets/videos/segments/vitrinesteganos/[Series Name]/
Example: content/assets/videos/segments/vitrinesteganos/Ally&Ivan_Podcast/Episode-6.mp4
```

## Step 4: Update the Data File

Open: `content/content-segments-data.js`

### Adding a Quarterly Item:

Find the `quarters` section and add to the `items` array:

```javascript
{
    id: "q4-2024",  // Unique ID
    title: "Q4 2024 Highlights",
    period: "October - December 2024",
    thumbnailPath: "assets/thumbnails/segments/quarters/quarter4/thumbnail.png",
    images: [
        "assets/thumbnails/segments/quarters/quarter4/image1.png",
        "assets/thumbnails/segments/quarters/quarter4/image2.png",
        "assets/thumbnails/segments/quarters/quarter4/image3.png"
    ],
    description: "Major achievements from Q4 2024"
}
```

### Adding a Prompt of the Month:

Find the `promptOfTheMonth` section and add to the `items` array:

```javascript
{
    id: "potm-november",  // Unique ID
    title: "November 2024",
    month: "November",
    year: 2024,
    thumbnailPath: "assets/thumbnails/segments/promptofthemonth/November/thumbnail.png",
    images: ["assets/thumbnails/segments/promptofthemonth/November/thumbnail.png"],
    prompt: "Your Creative Prompt Here",
    description: "Description of the prompt and creative exploration"
}
```

### Adding a Video:

Find the `vitrineSteganos` section and add to the `items` array:

```javascript
{
    id: "vs-podcast-ep6",  // Unique ID
    title: "Episode 6 - Your Title",
    series: "Ally & Ivan Podcast",  // or "Intergalactic Burger Shack"
    thumbnailPath: "assets/images/segments/vitrinesteganos/Ally&Ivan_Podcast/ep6-thumb.jpg",
    videoPath: "assets/videos/segments/vitrinesteganos/Ally&Ivan_Podcast/Episode-6.mp4",
    duration: "45:30",  // Format: MM:SS or HH:MM:SS
    description: "Brief description of the episode content"
}
```

## Step 5: Save and Test

1. Save the `content-segments-data.js` file
2. Refresh your browser
3. Navigate to the Content Segments section
4. Your new content should appear!

## Common Mistakes to Avoid

❌ **Wrong:** Using absolute paths
```javascript
thumbnailPath: "/Users/you/Desktop/image.png"  // DON'T DO THIS
```

✅ **Right:** Using relative paths
```javascript
thumbnailPath: "assets/thumbnails/segments/quarters/quarter4/image.png"
```

❌ **Wrong:** Forgetting the file extension
```javascript
videoPath: "assets/videos/segments/vitrinesteganos/episode"
```

✅ **Right:** Including the full filename
```javascript
videoPath: "assets/videos/segments/vitrinesteganos/Ally&Ivan_Podcast/episode.mp4"
```

❌ **Wrong:** Duplicate IDs
```javascript
id: "potm-january"  // Already exists!
```

✅ **Right:** Unique IDs
```javascript
id: "potm-january-2025"  // Unique
```

## Tips for Success

1. **Keep IDs Unique:** Use descriptive IDs like "q4-2024" or "potm-november-2024"
2. **Use Descriptive Titles:** Help users understand what they're viewing
3. **Write Clear Descriptions:** Explain what the content is about
4. **Optimize Images:** Compress images before uploading to improve load times
5. **Test Videos:** Make sure videos play correctly before adding them
6. **Consistent Naming:** Use a consistent naming convention for files

## Need Help?

If you run into issues:
1. Check the browser console for errors (F12 → Console tab)
2. Verify file paths are correct
3. Make sure files are uploaded to the right folders
4. Check that the data file syntax is correct (commas, brackets, quotes)

## Quick Reference

### File Locations:
- **Quarterly Images:** `content/assets/thumbnails/segments/quarters/`
- **Monthly Prompts:** `content/assets/thumbnails/segments/promptofthemonth/`
- **Videos:** `content/assets/videos/segments/vitrinesteganos/`
- **Data File:** `content/content-segments-data.js`

### Supported Formats:
- **Images:** PNG, JPG, WebP
- **Videos:** MP4 (H.264 codec recommended)

### Recommended Sizes:
- **Images:** 1920x1080 or 1280x720
- **Videos:** 1080p or 720p, under 100MB
