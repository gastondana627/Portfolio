# Design Document

## Overview

This design outlines the integration of two new hackathon projects (Planetrics and AI Room Designer) into the existing portfolio website. The integration will extend the current Three.js-based knowledge graph, update the project carousel component, and ensure all project metadata is properly synchronized across the system.

The portfolio currently features 6 projects displayed in an interactive 3D knowledge graph with skill nodes, evolution paths, and a synchronized project carousel. We will add 2 new projects, bringing the total to 8 projects.

## Architecture

### Current System Components

1. **Knowledge Graph (graph.js)**
   - Three.js-based 3D visualization
   - Project nodes (spheres) positioned in outer ring (radius: 8)
   - Skill nodes (octahedrons) positioned in inner ring (radius: 4)
   - Central prism with audio-reactive effects
   - Evolution paths showing project progression
   - Skill connection lines linking projects to technologies

2. **Project Carousel (project-carousel.js)**
   - Featured projects array with detailed metadata
   - Auto-rotating display (5-second intervals)
   - Synchronized with knowledge graph clicks
   - Navigation controls and dot indicators

3. **Backend API (backend/app.py)**
   - Flask server providing project data
   - Fallback data structure in graph.js for offline mode

### Integration Points

The new projects will be integrated at three levels:

1. **Data Layer**: Add project definitions to both backend API and fallback data
2. **Visualization Layer**: Create new nodes in knowledge graph with appropriate connections
3. **UI Layer**: Add projects to carousel with images and metadata

## Components and Interfaces

### 1. Project Data Structure

Each project follows this schema:

```javascript
{
    id: string,              // Unique identifier (kebab-case)
    title: string,           // Display name
    category: string,        // "AI Projects" | "Gaming" | "Ethical Hacking"
    group: string,           // Same as category (for graph.js compatibility)
    label: string,           // Short name for graph tooltip
    description: string,     // Full description for carousel and modal
    tech: string[],          // Technology stack array
    image: string,           // Path to project image in assets/
    links: Array<{
        url: string,
        label: string,
        icon: string,        // Font Awesome class
        type?: string        // "github" | "demo" | "info"
    }>
}
```

### 2. New Project Definitions

#### Planetrics

```javascript
{
    id: "planetrics",
    title: "Planetrics - NASA Exoplanet Dashboard",
    category: "AI Projects",
    group: "AI Projects",
    label: "Planetrics",
    description: "Interactive web dashboard visualizing NASA's 6,000+ exoplanet catalog. Built with Plotly Studio, featuring live data from NASA Exoplanet Archive API, discovery trends, and curated milestone content.",
    tech: ["Python", "Plotly", "Pandas", "NASA API", "Data Visualization"],
    image: "assets/planetrics-dashboard.jpg",
    links: [
        {
            url: "https://d3db0003-331f-4875-8af8-7bb0fb3acc6c.plotly.app",
            label: "Live Dashboard",
            icon: "fas fa-chart-line",
            type: "demo"
        },
        {
            url: "https://docs.google.com/document/d/1234", // Update with actual link
            label: "Documentation",
            icon: "fas fa-file-alt",
            type: "info"
        }
    ]
}
```

#### AI Room Designer

```javascript
{
    id: "ai-room-designer",
    title: "AI Room Designer - Rooms Through Time",
    category: "AI Projects",
    group: "AI Projects",
    label: "AI Room Designer",
    description: "Multi-modal AI interior design platform with dual modes: Generate New (text-to-image) and Redesign My Room (image transformation). Features Gemini 2.5 Flash for redesign, Fal.ai for 3D reconstruction, ElevenLabs voice narration, and local gpt-oss agent for offline AI consultation.",
    tech: ["React", "Python", "FastAPI", "Gemini 2.5", "Fal.ai", "ElevenLabs", "TypeScript", "Tailwind CSS"],
    image: "assets/ai-room-designer-promo.jpg",
    links: [
        {
            url: "https://rooms-through-time-production.up.railway.app",
            label: "Live Demo (Railway)",
            icon: "fas fa-external-link-alt",
            type: "demo"
        },
        {
            url: "https://rooms-through-time.vercel.app",
            label: "Live Demo (Vercel)",
            icon: "fas fa-external-link-alt",
            type: "demo"
        },
        {
            url: "https://github.com/gastondana627/Rooms-Through-Time",
            label: "GitHub",
            icon: "fab fa-github",
            type: "github"
        },
        {
            url: "https://youtu.be/Gh2-ltEzjr0?si=J3W58BHmcdWNWA5k",
            label: "Demo Video",
            icon: "fab fa-youtube",
            type: "info"
        }
    ]
}
```

### 3. Skill Connections

New skill connections to be added:

```javascript
// Planetrics connections
{ project: "planetrics", skill: "python" },
{ project: "planetrics", skill: "data_viz" },  // New skill node needed
{ project: "planetrics", skill: "api" },       // New skill node needed

// AI Room Designer connections
{ project: "ai-room-designer", skill: "python" },
{ project: "ai-room-designer", skill: "react" },     // New skill node needed
{ project: "ai-room-designer", skill: "ai_agents" },
{ project: "ai-room-designer", skill: "computer_vision" }  // New skill node needed
```

### 4. New Skill Nodes

Add these skill nodes to support the new projects:

```javascript
[
    {
        id: "data_viz",
        name: "Data Visualization",
        category: "Domain",
        level: "Advanced"
    },
    {
        id: "api",
        name: "API Integration",
        category: "Domain",
        level: "Expert"
    },
    {
        id: "react",
        name: "React",
        category: "Language",
        level: "Advanced"
    },
    {
        id: "computer_vision",
        name: "Computer Vision",
        category: "AI",
        level: "Advanced"
    }
]
```

### 5. Evolution Paths

Add evolution connections showing project progression:

```javascript
// Connect AI Room Designer to existing AI projects
{ from: "nasa_kg", to: "ai-room-designer", color: 0x8309D5 },

// Connect Planetrics to data-focused projects
{ from: "nasa_kg", to: "planetrics", color: 0x09C1D5, dashed: true }
```

## Data Models

### Backend API Response Format

The Flask backend should return:

```python
{
    "projects": [
        # All 8 projects including new ones
    ],
    "skills": [
        # All skill nodes including new ones
    ],
    "skill_links": [
        # All project-skill connections
    ],
    "evolution_paths": [
        # Optional: evolution relationships
    ]
}
```

### Fallback Data Structure

The `graph.js` file maintains a fallback data structure for offline mode. This must be updated to include the new projects in the same format.

## Implementation Strategy

### Phase 1: Asset Preparation
1. Add project images to `assets/` directory
   - `planetrics-dashboard.jpg` (or .png)
   - `ai-room-designer-promo.jpg` (or .png)
2. Optimize images for web (max 800px width, compressed)

### Phase 2: Data Layer Updates
1. Update `backend/app.py`:
   - Add new projects to projects array
   - Add new skills to skills array
   - Add skill connections
   - Add evolution paths
2. Update `graph.js` fallback data:
   - Mirror backend changes in fallback arrays
   - Ensure consistency between backend and fallback

### Phase 3: Carousel Integration
1. Update `project-carousel.js`:
   - Add Planetrics to `featuredProjects` array
   - Add AI Room Designer to `featuredProjects` array
   - Verify image paths are correct
   - Test carousel navigation

### Phase 4: Statistics Updates
1. Update `index.html`:
   - Change hero stats: "6+" → "8+" AI Projects
   - Change hero stats: "5+" → "7+" Hackathons
   - Update carousel stats panel: "6" → "8" Projects
2. Update `README.md`:
   - Document new projects
   - Update project count

### Phase 5: Knowledge Graph Positioning
1. Recalculate node positions:
   - Current: 6 projects at radius 8
   - New: 8 projects at radius 8
   - Angle step: `(Math.PI * 2) / 8` = 0.785 radians (45°)
2. Ensure even distribution around prism
3. Test hover detection and click interactions

## Error Handling

### Image Loading Failures
- Provide fallback placeholder images
- Log errors to console for debugging
- Ensure carousel doesn't break if image missing

### Backend API Failures
- Fallback data in `graph.js` ensures graph always renders
- Console warnings for debugging
- No user-facing errors

### Node Positioning Conflicts
- Maintain minimum distance between nodes
- Adjust Y-axis positioning if nodes overlap
- Test on various screen sizes

## Testing Strategy

### Visual Testing
1. Verify all 8 nodes appear in knowledge graph
2. Check node colors match category (AI Projects = purple)
3. Confirm skill connections render correctly
4. Test evolution paths display properly
5. Verify carousel shows all 8 projects

### Interaction Testing
1. Hover over new project nodes → tooltip appears
2. Click new project nodes → modal opens with correct data
3. Click carousel card → zooms to correct node in graph
4. Navigate carousel → new projects appear in rotation
5. Test on mobile devices for responsiveness

### Integration Testing
1. Backend API returns new projects
2. Fallback data works when backend unavailable
3. Carousel and graph stay synchronized
4. Statistics update correctly
5. All external links work

### Performance Testing
1. Graph renders smoothly with 8 nodes
2. No frame rate drops during animation
3. Image loading doesn't block rendering
4. Audio reactivity still works properly

## Accessibility Considerations

- Ensure all project links have proper `aria-label` attributes
- Maintain keyboard navigation support
- Provide alt text for project images
- Ensure sufficient color contrast for text overlays

## Browser Compatibility

- Test in Chrome, Firefox, Safari, Edge
- Verify Three.js rendering works across browsers
- Check mobile browser compatibility
- Ensure touch interactions work on tablets

## Future Enhancements

1. **Dynamic Project Loading**: Move all project data to backend API
2. **Project Filtering**: Add category filters to carousel
3. **Search Functionality**: Allow users to search projects
4. **Project Tags**: Add technology tags for better discovery
5. **Analytics**: Track which projects get the most engagement
