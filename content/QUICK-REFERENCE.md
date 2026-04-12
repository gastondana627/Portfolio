# Content Segments - Quick Reference Card

## 📍 Where Everything Lives

### Thumbnails (Images)
```
content/assets/thumbnails/segments/
├── quarters/quarter1/          → Q1 2024 images
├── quarters/quarter2/          → Q2 2024 images
├── quarters/quarter3/          → Q3 2024 images
└── promptofthemonth/[Month]/  → Monthly prompt images
```

### Videos
```
content/assets/videos/segments/vitrinesteganos/
├── Ally&Ivan_Podcast/          → Podcast episodes
└── Intergalactic_BurgerShack/  → Commercial videos
```

### Data & Code
```
content/
├── content-segments-data.js     → All segment data (EDIT THIS)
├── content-segments-ui.js       → UI component (don't edit)
├── content-segments-styles.css  → Styling (don't edit)
└── index.html                   → Main page (already integrated)
```

## ⚡ Quick Add New Content

### 1. Upload File
- Images → `content/assets/thumbnails/segments/[type]/[folder]/`
- Videos → `content/assets/videos/segments/vitrinesteganos/[series]/`

### 2. Edit Data File
Open: `content/content-segments-data.js`

**For Quarterly:**
```javascript
// Find: quarters → items → add:
{
    id: "q4-2024",
    title: "Q4 2024 Highlights",
    period: "October - December 2024",
    thumbnailPath: "assets/thumbnails/segments/quarters/quarter4/thumb.png",
    images: ["assets/thumbnails/segments/quarters/quarter4/image1.png"],
    description: "Your description"
}
```

**For Monthly Prompt:**
```javascript
// Find: promptOfTheMonth → items → add:
{
    id: "potm-november",
    title: "November 2024",
    month: "November",
    year: 2024,
    thumbnailPath: "assets/thumbnails/segments/promptofthemonth/November/thumb.png",
    images: ["assets/thumbnails/segments/promptofthemonth/November/thumb.png"],
    prompt: "Your prompt text",
    description: "Your description"
}
```

**For Video:**
```javascript
// Find: vitrineSteganos → items → add:
{
    id: "vs-podcast-ep6",
    title: "Episode 6 - Title",
    series: "Ally & Ivan Podcast",
    thumbnailPath: "assets/images/segments/vitrinesteganos/Ally&Ivan_Podcast/thumb.jpg",
    videoPath: "assets/videos/segments/vitrinesteganos/Ally&Ivan_Podcast/ep6.mp4",
    duration: "45:30",
    description: "Your description"
}
```

### 3. Save & Refresh
- Save the file
- Refresh browser
- Done! ✅

## 🎯 Current Content

| Segment | Type | Count | Status |
|---------|------|-------|--------|
| Quarters | Images | 12 images (3 quarters) | ✅ Active |
| Prompt of Month | Images | 8 months | ✅ Active |
| Vitrine Steganos | Videos | 8 videos | ✅ Active |

## 🚫 Common Mistakes

❌ Absolute paths: `/Users/you/file.png`
✅ Relative paths: `assets/thumbnails/segments/...`

❌ Missing extension: `video`
✅ With extension: `video.mp4`

❌ Duplicate ID: `id: "q1-2024"` (already exists)
✅ Unique ID: `id: "q1-2025"`

## 📚 Full Documentation

- **Adding Content:** `HOW-TO-ADD-SEGMENTS.md`
- **Technical Details:** `SEGMENTS-REORGANIZATION.md`
- **Complete Summary:** `REORGANIZATION-SUMMARY.md`

## 🆘 Troubleshooting

**Content not showing?**
1. Check file path is correct
2. Check file uploaded to right folder
3. Check browser console (F12) for errors
4. Verify ID is unique

**Video not playing?**
1. Check format is MP4
2. Check file size (under 100MB recommended)
3. Check path includes filename and extension
4. Test video plays locally first

## 💡 Pro Tips

1. **Compress images** before uploading (use TinyPNG, ImageOptim)
2. **Optimize videos** for web (H.264 codec, 720p or 1080p)
3. **Use descriptive IDs** (easier to find later)
4. **Test on mobile** after adding content
5. **Keep backups** of your data file before major edits

---

**Need Help?** Check the full guides or browser console for errors!
