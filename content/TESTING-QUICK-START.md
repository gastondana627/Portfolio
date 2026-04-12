# Content Portfolio - Testing Quick Start Guide

## Overview

This guide provides quick instructions for running all tests for the Content Portfolio redesign.

## Test Files

### 1. Cross-Browser Testing
**File**: `test-cross-browser-content.html`

**Purpose**: Test browser compatibility and feature support

**How to Run**:
```bash
# Open in different browsers
open test-cross-browser-content.html  # macOS
start test-cross-browser-content.html # Windows
```

**What it Tests**:
- Browser detection (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support
- JavaScript ES6 features
- Touch events
- Media playback
- WebP image support
- Modal functionality
- Responsive breakpoints

**Expected Results**:
- All tests should pass in modern browsers
- Browser info displayed at top
- Green checkmarks for passing tests

---

### 2. Performance Testing
**File**: `test-performance-comprehensive.html`

**Purpose**: Measure page load times and performance metrics

**How to Run**:
```bash
# Open in browser
open test-performance-comprehensive.html
```

**What it Tests**:
- Core Web Vitals (LCP, FID, CLS, FCP, TTI)
- Page load metrics
- Lazy loading effectiveness
- Memory usage
- Network performance

**Expected Results**:
- Overall performance score > 85
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- No memory leaks

**Additional Tools**:
```bash
# Run Lighthouse audit
lighthouse https://your-domain.com/content/ --view

# Or use Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Click "Generate report"
```

---

### 3. Accessibility Testing
**File**: `test-accessibility-comprehensive.html`

**Purpose**: Verify WCAG 2.1 Level AA compliance

**How to Run**:
```bash
# Open in browser
open test-accessibility-comprehensive.html
```

**What it Tests**:
- Keyboard navigation
- ARIA attributes
- Semantic HTML
- Color contrast ratios
- Image alt text
- Form accessibility
- Screen reader support

**Expected Results**:
- Accessibility score > 90
- All keyboard navigation works
- Color contrast meets WCAG AA (4.5:1)
- All images have alt text
- No critical accessibility issues

**Additional Tools**:
```bash
# Install and run axe-core
npm install -g @axe-core/cli
axe https://your-domain.com/content/

# Or use browser extensions
# - axe DevTools (Chrome/Firefox)
# - WAVE (Chrome/Firefox)
```

**Manual Testing**:
1. Navigate entire page with keyboard only (Tab, Arrow keys, Enter, ESC)
2. Test with screen reader (NVDA on Windows, VoiceOver on Mac)
3. Zoom to 200% and verify readability
4. Check focus indicators are visible

---

### 4. User Acceptance Testing
**File**: `test-user-acceptance.html`

**Purpose**: Validate features work with real content

**How to Run**:
```bash
# Open in browser
open test-user-acceptance.html
```

**What it Tests**:
- Content data loading
- External links
- Video playback
- Carousel navigation
- Image gallery
- Mobile experience
- Responsive design
- Performance

**How to Use**:
1. Each test has Pass/Fail buttons
2. Click "Auto Test" for automated tests
3. Manually test features and mark results
4. Add notes for failed tests
5. Click "Export Test Results" to save report

**Expected Results**:
- All automated tests pass
- Manual tests verified and marked
- No critical issues found
- Export report for documentation

---

## Quick Test Commands

### Run All Tests Locally
```bash
# Start local server
cd content
python3 -m http.server 8000

# Open test files in browser
open http://localhost:8000/test-cross-browser-content.html
open http://localhost:8000/test-performance-comprehensive.html
open http://localhost:8000/test-accessibility-comprehensive.html
open http://localhost:8000/test-user-acceptance.html
```

### Run Lighthouse Audits
```bash
# Performance audit
lighthouse http://localhost:8000/content/ --only-categories=performance --view

# Accessibility audit
lighthouse http://localhost:8000/content/ --only-categories=accessibility --view

# Full audit
lighthouse http://localhost:8000/content/ --view
```

### Check for Errors
```bash
# Validate HTML
# Visit: https://validator.w3.org/
# Or use CLI tool
npm install -g html-validator-cli
html-validator --file=index.html

# Check JavaScript errors
# Open browser console (F12) and look for errors
```

## Test Reports

After running tests, review the detailed reports:

1. **Cross-Browser Testing**: `CROSS-BROWSER-TEST-REPORT.md`
2. **Performance Testing**: `PERFORMANCE-TEST-REPORT.md`
3. **Accessibility Testing**: `ACCESSIBILITY-TEST-REPORT.md`
4. **User Acceptance Testing**: `USER-ACCEPTANCE-TEST-REPORT.md`
5. **Overall Summary**: `TESTING-SUMMARY.md`

## Testing Checklist

### Before Testing
- [ ] Clear browser cache
- [ ] Close unnecessary browser tabs
- [ ] Disable browser extensions (for accurate results)
- [ ] Ensure stable internet connection
- [ ] Have test data ready

### During Testing
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on real mobile devices (iOS, Android)
- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Document any issues found

### After Testing
- [ ] Review all test results
- [ ] Document issues in reports
- [ ] Prioritize issues (P0, P1, P2, P3)
- [ ] Create fix plan for issues
- [ ] Re-test after fixes

## Common Issues and Solutions

### Issue: Tests not loading
**Solution**: Make sure you're running a local server, not opening files directly

### Issue: Performance score low
**Solution**: 
- Check network throttling is off
- Clear cache and reload
- Verify lazy loading is working
- Check for console errors

### Issue: Accessibility tests failing
**Solution**:
- Verify all images have alt text
- Check color contrast ratios
- Ensure keyboard navigation works
- Add missing ARIA labels

### Issue: Videos not playing
**Solution**:
- Check video URLs are valid
- Verify network connection
- Test in different browser
- Check browser console for errors

## Mobile Testing

### iOS Testing
```bash
# Use Safari on iPhone/iPad
# Or use iOS Simulator (requires Xcode)
open -a Simulator

# Then open Safari and navigate to:
http://your-computer-ip:8000/content/test-user-acceptance.html
```

### Android Testing
```bash
# Use Chrome on Android device
# Enable USB debugging
# Use Chrome DevTools remote debugging

# Or use Android Emulator
emulator -avd Pixel_4_API_30
```

## Continuous Testing

### Set up automated testing
```bash
# Add to package.json
{
  "scripts": {
    "test:performance": "lighthouse http://localhost:8000/content/ --output=json --output-path=./test-results/performance.json",
    "test:accessibility": "axe http://localhost:8000/content/ --save ./test-results/accessibility.json",
    "test:all": "npm run test:performance && npm run test:accessibility"
  }
}
```

## Getting Help

### Resources
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebPageTest](https://www.webpagetest.org/)

### Support
- Check test reports for detailed information
- Review browser console for errors
- Use browser DevTools for debugging
- Consult TESTING-SUMMARY.md for overview

---

**Last Updated**: November 7, 2025
**Version**: 1.0
