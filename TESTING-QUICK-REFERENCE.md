# Testing Quick Reference Guide
## Planetrics & AI Room Designer Integration

**Quick access guide for running tests**

---

## 🖥️ Desktop Browser Testing

### Chrome
1. Open portfolio in Chrome
2. Open DevTools (F12)
3. Navigate to knowledge graph
4. Test Planetrics node (hover, click)
5. Test AI Room Designer node (hover, click)
6. Check console for errors

### Firefox / Safari / Edge
Repeat same steps as Chrome

### Automated Desktop Tests
```bash
# Open in browser
open test-new-projects-integration.html
# or
open test-cross-browser-compatibility.html
```

---

## 📱 Mobile Device Testing

### Real Device Testing
1. Open portfolio on mobile device
2. Tap Planetrics node
3. Tap AI Room Designer node
4. Swipe carousel
5. Check touch responsiveness

### Mobile Test Suite
```bash
# Open on mobile device or use DevTools device emulation
open test-mobile-graph-interactions.html
```

### DevTools Device Emulation
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device (iPhone, iPad, Android)
4. Test touch interactions
5. Test different orientations

---

## ⚡ Quick Test Commands

### Run All Automated Tests
1. Open `test-new-projects-integration.html`
2. Click "Run All Tests" button
3. Review results

### Test Mobile Touch
1. Open `test-mobile-graph-interactions.html` on mobile
2. Click "Run All Tests" button
3. Review touch interaction results

### Check Graph Touch Support
```javascript
// In browser console
console.log('Touch support:', 'ontouchstart' in window);
console.log('Max touch points:', navigator.maxTouchPoints);
```

---

## 📊 Expected Results

### Desktop
- ✅ All nodes visible
- ✅ Hover shows tooltips
- ✅ Click opens modals
- ✅ 60 FPS animations
- ✅ No console errors

### Mobile
- ✅ All nodes tappable
- ✅ Touch shows tooltips
- ✅ Tap opens modals
- ✅ Swipe gestures work
- ✅ 30-60 FPS animations
- ✅ Touch response <100ms

---

## 🐛 Troubleshooting

### Graph doesn't load
- Check WebGL support
- Enable hardware acceleration
- Clear browser cache

### Touch not working
- Verify viewport meta tag
- Check touch event listeners in graph.js
- Test on actual device (not just emulator)

### Poor performance
- Check FPS in test suite
- Monitor memory usage
- Reduce pixel ratio on mobile

---

## 📁 Test Files Location

```
portfolio/
├── test-new-projects-integration.html       # Main test suite
├── test-new-projects-integration.js         # Test logic
├── test-mobile-graph-interactions.html      # Mobile tests
├── test-mobile-graph-interactions.js        # Mobile test logic
├── test-cross-browser-compatibility.html    # Browser tests
├── test-cross-browser-compatibility.js      # Browser test logic
├── test-responsive-functionality.html       # Responsive tests
├── test-responsive-functionality.js         # Responsive test logic
├── CROSS-BROWSER-TEST-GUIDE.md             # Detailed guide
├── NEW-PROJECTS-TEST-RESULTS.md            # Test results
├── MOBILE-TOUCH-IMPROVEMENTS.md            # Touch implementation
└── TASK-8-COMPLETION-SUMMARY.md            # Task summary
```

---

## ✅ Quick Checklist

### Before Testing
- [ ] Clear browser cache
- [ ] Disable browser extensions
- [ ] Check internet connection
- [ ] Have test devices ready

### Desktop Testing
- [ ] Chrome tested
- [ ] Firefox tested
- [ ] Safari tested
- [ ] Edge tested
- [ ] No console errors

### Mobile Testing
- [ ] Chrome Android tested
- [ ] Chrome iOS tested
- [ ] Safari iOS tested
- [ ] Touch interactions work
- [ ] Swipe gestures work

### Performance
- [ ] Load time <3s
- [ ] FPS 30+
- [ ] Touch response <100ms
- [ ] No memory leaks

---

## 🎯 Success Criteria

**All tests pass when:**
- All 8 project nodes visible
- Planetrics node interactive
- AI Room Designer node interactive
- Touch events work on mobile
- Carousel swipe works
- No console errors
- Performance targets met

---

**Last Updated:** November 7, 2025  
**Status:** All tests passing ✅
