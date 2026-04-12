# Requirements Document

## Introduction

This document defines the requirements for integrating two new hackathon projects (Planetrics and AI Room Designer) into Gaston Dana's existing portfolio website. The integration will add these projects to the interactive knowledge graph, project carousel, and ensure they are properly displayed with their technical details, achievements, and links.

## Glossary

- **Portfolio System**: The existing web-based portfolio application consisting of HTML, CSS, JavaScript, and Three.js components
- **Knowledge Graph**: The interactive 3D visualization built with Three.js that displays projects and skills as interconnected nodes
- **Project Carousel**: The rotating featured project display component that showcases project details
- **Graph Node**: A visual element in the Knowledge Graph representing either a project (sphere) or skill (diamond)
- **Featured Project**: A project displayed in the Project Carousel with full details, images, and links
- **Project Data Structure**: The JavaScript object containing project metadata (title, description, tech stack, links, etc.)

## Requirements

### Requirement 1: Add Planetrics Project to Portfolio

**User Story:** As a portfolio visitor, I want to see the Planetrics NASA exoplanet visualization project, so that I can understand Gaston's data visualization and scientific computing capabilities.

#### Acceptance Criteria

1. WHEN the Portfolio System loads, THE Knowledge Graph SHALL display a new node for the Planetrics project
2. WHEN a user hovers over the Planetrics node, THE Knowledge Graph SHALL display "Planetrics - NASA Exoplanet Dashboard" as the tooltip
3. WHEN a user clicks the Planetrics node, THE Portfolio System SHALL display a modal with project details including description, tech stack, and external links
4. WHERE the Project Carousel is active, THE Portfolio System SHALL include Planetrics as a featured project with image, description, and navigation controls
5. THE Project Data Structure SHALL include the following fields for Planetrics: id, title, category, description, tech array, image path, and links array

### Requirement 2: Add AI Room Designer Project to Portfolio

**User Story:** As a portfolio visitor, I want to see the AI Room Designer project, so that I can understand Gaston's expertise in multi-modal AI, computer vision, and full-stack development.

#### Acceptance Criteria

1. WHEN the Portfolio System loads, THE Knowledge Graph SHALL display a new node for the AI Room Designer project
2. WHEN a user hovers over the AI Room Designer node, THE Knowledge Graph SHALL display "AI Room Designer - Generative Interior Design" as the tooltip
3. WHEN a user clicks the AI Room Designer node, THE Portfolio System SHALL display a modal with comprehensive project details including dual-mode functionality, 3D capabilities, and AI orchestration architecture
4. WHERE the Project Carousel is active, THE Portfolio System SHALL include AI Room Designer as a featured project with promotional image and complete feature description
5. THE Project Data Structure SHALL include fields for AI Room Designer highlighting: Gemini 2.5 Flash integration, Fal.ai services, ElevenLabs voice, local gpt-oss agent, and Railway/Vercel deployments

### Requirement 3: Update Knowledge Graph Connections

**User Story:** As a portfolio visitor, I want to see how the new projects relate to existing skills and technologies, so that I can understand the evolution of Gaston's technical expertise.

#### Acceptance Criteria

1. WHEN the Knowledge Graph renders, THE Portfolio System SHALL create connection lines between Planetrics and relevant skill nodes (Python, Data Visualization, APIs)
2. WHEN the Knowledge Graph renders, THE Portfolio System SHALL create connection lines between AI Room Designer and relevant skill nodes (Python, React, AI/ML, Computer Vision, Full-Stack)
3. WHERE evolution paths exist, THE Portfolio System SHALL display curved lines showing the learning progression from earlier projects to the new projects
4. THE Knowledge Graph SHALL maintain visual consistency with existing node colors, sizes, and connection styles
5. THE Portfolio System SHALL ensure new connections do not create visual clutter or overlap issues in the graph layout

### Requirement 4: Update Project Statistics and Metadata

**User Story:** As a portfolio visitor, I want to see updated project counts and statistics, so that I have accurate information about Gaston's portfolio scope.

#### Acceptance Criteria

1. WHEN the Portfolio System loads, THE hero section statistics SHALL display "8+" as the total AI Projects count (increased from 6+)
2. WHEN the Project Carousel initializes, THE stats panel SHALL display "8" as the total featured projects count (increased from 6)
3. WHEN the Portfolio System loads, THE hero section statistics SHALL display "7+" as the total Hackathons count (increased from 5+)
4. THE Portfolio System SHALL update the README.md file to reflect the addition of two new 2025 hackathon projects
5. THE Portfolio System SHALL maintain accurate categorization with both new projects in the "AI Projects" category

### Requirement 5: Add Project Assets and Media

**User Story:** As a portfolio visitor, I want to see visual representations of the new projects, so that I can quickly understand what each project looks like.

#### Acceptance Criteria

1. THE Portfolio System SHALL include a project image for Planetrics in the assets directory
2. THE Portfolio System SHALL include a project image for AI Room Designer in the assets directory
3. WHEN the Project Carousel displays Planetrics, THE Portfolio System SHALL render the Planetrics dashboard screenshot or logo
4. WHEN the Project Carousel displays AI Room Designer, THE Portfolio System SHALL render the AI Room Designer promotional image
5. THE Portfolio System SHALL ensure all images are optimized for web performance (appropriate file size and format)
