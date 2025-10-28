# Implementation Plan

- [x] 1. Prepare and add project assets
  - Add Planetrics project image to assets/ directory with appropriate filename
  - Add AI Room Designer project image to assets/ directory with appropriate filename
  - Optimize images for web performance (compress and resize if needed)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 2. Update backend API with new project data
  - [x] 2.1 Add Planetrics project definition to backend/app.py
    - Include all required fields: id, title, category, description, tech stack, image path, and links
    - Ensure proper JSON structure and data types
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 2.2 Add AI Room Designer project definition to backend/app.py
    - Include comprehensive details about dual-mode functionality, AI orchestration, and deployment links
    - Add all technology stack items (React, Python, FastAPI, Gemini, Fal.ai, ElevenLabs, etc.)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 2.3 Add new skill nodes to backend/app.py
    - Add "Data Visualization" skill node (category: Domain)
    - Add "API Integration" skill node (category: Domain)
    - Add "React" skill node (category: Language)
    - Add "Computer Vision" skill node (category: AI)
    - _Requirements: 3.4_
  
  - [x] 2.4 Add skill connections for new projects
    - Connect Planetrics to: python, data_viz, api skills
    - Connect AI Room Designer to: python, react, ai_agents, computer_vision skills
    - _Requirements: 3.1, 3.2_

- [x] 3. Update graph.js fallback data
  - [x] 3.1 Add Planetrics to fallback projectData array
    - Mirror backend structure exactly
    - Ensure id matches for carousel integration
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 3.2 Add AI Room Designer to fallback projectData array
    - Include all links (Railway, Vercel, GitHub, YouTube)
    - Match backend data structure
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 3.3 Add new skill nodes to fallback skillData array
    - Add all 4 new skill nodes with proper categories
    - _Requirements: 3.4_
  
  - [x] 3.4 Add skill connections to fallback skillLinks array
    - Add all project-skill connections for both new projects
    - _Requirements: 3.1, 3.2_
  
  - [x] 3.5 Update evolution paths in createEvolutionPaths function
    - Add evolution path from nasa_kg to ai-room-designer
    - Add evolution path from nasa_kg to planetrics (dashed)
    - _Requirements: 3.3_

- [x] 4. Update project carousel component
  - [x] 4.1 Add Planetrics to featuredProjects array in project-carousel.js
    - Include all metadata: title, category, description, tech array, image path, links
    - Verify image path matches assets directory
    - _Requirements: 1.4, 1.5_
  
  - [x] 4.2 Add AI Room Designer to featuredProjects array in project-carousel.js
    - Include comprehensive description highlighting key features
    - Add all 4 links (Railway, Vercel, GitHub, YouTube)
    - _Requirements: 2.4, 2.5_

- [x] 5. Update portfolio statistics and metadata
  - [x] 5.1 Update hero section statistics in index.html
    - Change "6+" to "8+" for AI Projects count
    - Change "5+" to "7+" for Hackathons count
    - _Requirements: 4.1, 4.3_
  
  - [x] 5.2 Update carousel stats panel in index.html
    - Change total projects count from "6" to "8"
    - _Requirements: 4.2_
  
  - [x] 5.3 Update README.md documentation
    - Document addition of two new 2025 hackathon projects
    - Update any project count references
    - _Requirements: 4.4_

- [x] 6. Verify knowledge graph rendering
  - [x] 6.1 Test node positioning and distribution
    - Verify all 8 project nodes appear in outer ring
    - Check that nodes are evenly distributed (45° apart)
    - Ensure no visual overlap or collision issues
    - _Requirements: 3.4_
  
  - [x] 6.2 Test node interactions
    - Hover over Planetrics node → verify tooltip shows "Planetrics"
    - Hover over AI Room Designer node → verify tooltip shows "AI Room Designer"
    - Click Planetrics node → verify modal opens with correct details
    - Click AI Room Designer node → verify modal opens with correct details
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3_
  
  - [x] 6.3 Verify skill connections render correctly
    - Check that new skill nodes appear in inner ring
    - Verify connection lines from new projects to skills
    - Test hover highlighting of connected skills
    - _Requirements: 3.1, 3.2, 3.4_
  
  - [x] 6.4 Verify evolution paths display properly
    - Check curved lines from nasa_kg to new projects
    - Verify path colors and opacity
    - Test animated particles along paths
    - _Requirements: 3.3_

- [ ] 7. Test carousel integration
  - [ ] 7.1 Test carousel navigation and display
    - Verify Planetrics appears in carousel rotation
    - Verify AI Room Designer appears in carousel rotation
    - Test prev/next buttons navigate to new projects
    - Check that project images load correctly
    - _Requirements: 1.4, 2.4_
  
  - [ ] 7.2 Test carousel-graph synchronization
    - Click Planetrics carousel card → verify graph zooms to Planetrics node
    - Click AI Room Designer carousel card → verify graph zooms to AI Room Designer node
    - Click Planetrics graph node → verify carousel updates to show Planetrics
    - Click AI Room Designer graph node → verify carousel updates to show AI Room Designer
    - _Requirements: 1.3, 1.4, 2.3, 2.4_
  
  - [ ] 7.3 Verify all external links work
    - Test Planetrics live dashboard link
    - Test AI Room Designer Railway deployment link
    - Test AI Room Designer Vercel deployment link
    - Test AI Room Designer GitHub repository link
    - Test AI Room Designer YouTube demo video link
    - _Requirements: 1.5, 2.5_

- [ ] 8. Cross-browser and responsive testing
  - [ ] 8.1 Test on desktop browsers
    - Test in Chrome (latest)
    - Test in Firefox (latest)
    - Test in Safari (latest)
    - Test in Edge (latest)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_
  
  - [ ] 8.2 Test on mobile devices
    - Test on mobile Chrome (Android/iOS)
    - Test on mobile Safari (iOS)
    - Verify touch interactions work for new nodes
    - Check that carousel swipe gestures work
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_
