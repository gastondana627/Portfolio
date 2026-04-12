# Section Reorganization Guide

## Current Structure (Line Numbers)

```
93:   <section id="hero">
164:  <section id="about" class="section">
204:  <section id="mentorship" class="section">
341:  <div id="graph-container">          ← Graph is here
382:  <section id="projects" class="section">
434:  <section id="data-science" class="section">  ← Data Science needs to move UP
684:  <section id="skills" class="section">
834:  <section id="portfolio-discovery" class="section">
868:  <section id="contact" class="section">
```

## Target Structure

```
<section id="hero">
<section id="about">
<section id="mentorship">
<section id="data-science">     ← MOVE HERE (before graph)
<div id="graph-container">
<section id="projects">
<section id="skills">
<section id="portfolio-discovery">
<section id="contact">
```

## Manual Steps

### Step 1: Find Data Science Section
In `index.html`, find line 434:
```html
<section id="data-science" class="section">
```

This section ends around line 631 (before the commented MERCH section or before skills section at line 684).

### Step 2: Cut the Entire Section
Select from:
```html
<section id="data-science" class="section data-science-section">
```

To (just before):
```html
<section id="skills" class="section">
```

OR if using the redesigned version, from `data-science-redesign.html`, copy the entire content.

### Step 3: Find Insert Point
Find line 341:
```html
<div id="graph-container">
```

### Step 4: Paste BEFORE Graph Container
Insert the Data Science section right before `<div id="graph-container">`.

The result should be:
```html
</section> <!-- End of Mentorship -->

<section id="data-science" class="section data-science-section">
    <!-- All Data Science content -->
</section>

<div id="graph-container">
    <!-- Graph content -->
</div>
```

## Verification

After moving, check:
1. Navigation still works: Click "Data Science" in nav menu
2. Section appears before the graph
3. No duplicate sections
4. No broken HTML tags

## Alternative: Use the Redesigned Version

If you want to use the new design from `data-science-redesign.html`:

1. Remove old Data Science section (lines 434-631)
2. Insert content from `data-science-redesign.html` before graph container (line 341)
3. Add `data-science-styles.css` to your HTML head
4. Add `data-science-filter.js` before closing body tag

This gives you the improved design with category filtering!
