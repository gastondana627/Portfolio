/**
 * Static Code Verification for Knowledge Graph Rendering
 * This script verifies the implementation without running a browser
 */

const fs = require('fs');

console.log('🔍 Verifying Knowledge Graph Implementation...\n');

// Read the graph.js file
const graphCode = fs.readFileSync('graph.js', 'utf8');
const backendCode = fs.readFileSync('backend/app.py', 'utf8');

const results = {
    passed: 0,
    failed: 0,
    tests: []
};

function test(name, condition, message) {
    const passed = condition;
    results.tests.push({ name, passed, message });
    
    if (passed) {
        results.passed++;
        console.log(`✅ ${name}`);
    } else {
        results.failed++;
        console.log(`❌ ${name}`);
        console.log(`   ${message}`);
    }
}

console.log('═'.repeat(60));
console.log('Task 6.1: Node Positioning and Distribution');
console.log('═'.repeat(60) + '\n');

// Test 6.1.1: Check for 8 project nodes
const projectDataMatches = backendCode.match(/"id":\s*"[^"]+"/g) || [];
const projectCount = projectDataMatches.filter(match => 
    match.includes('stargate') || 
    match.includes('peata') || 
    match.includes('relic') ||
    match.includes('sesa') ||
    match.includes('astro_archive') ||
    match.includes('nasa_kg') ||
    match.includes('planetrics') ||
    match.includes('ai-room-designer')
).length;

test(
    '6.1.1 - Backend has 8 project definitions',
    projectCount >= 8,
    `Found ${projectCount} projects in backend`
);

// Test 6.1.2: Check outer ring radius
const radiusMatch = graphCode.match(/const radius = (\d+);/);
const outerRadius = radiusMatch ? parseInt(radiusMatch[1]) : 0;
test(
    '6.1.2 - Outer ring radius set to 8',
    outerRadius === 8,
    `Radius is ${outerRadius}`
);

// Test 6.1.3: Check angle distribution
const angleStepMatch = graphCode.match(/const angleStep = \(Math\.PI \* 2\) \/ projectData\.length;/);
test(
    '6.1.3 - Even distribution formula (360° / node count)',
    !!angleStepMatch,
    angleStepMatch ? 'Formula found' : 'Formula not found'
);

// Test 6.1.4: Check for collision prevention
const hitboxMatch = graphCode.match(/SphereGeometry\(1\.[0-9]+/);
test(
    '6.1.4 - Hitbox/spacing implemented for collision prevention',
    !!hitboxMatch,
    hitboxMatch ? 'Hitbox geometry found' : 'No hitbox found'
);

console.log('\n' + '═'.repeat(60));
console.log('Task 6.2: Node Interactions');
console.log('═'.repeat(60) + '\n');

// Test 6.2.1 & 6.2.4: Check for Planetrics and AI Room Designer
const hasPlanetrics = backendCode.includes('"id": "planetrics"');
const hasAiRoom = backendCode.includes('"id": "ai-room-designer"');

test(
    '6.2.1 - Planetrics project defined in backend',
    hasPlanetrics,
    'Planetrics found in backend data'
);

test(
    '6.2.4 - AI Room Designer project defined in backend',
    hasAiRoom,
    'AI Room Designer found in backend data'
);

// Test 6.2.2 & 6.2.5: Check tooltips
const tooltipFunction = graphCode.includes('showTooltip');
const tooltipUsesLabel = graphCode.includes('hoveredNode.userData.project.label');

test(
    '6.2.2/6.2.5 - Tooltip shows project label on hover',
    tooltipFunction && tooltipUsesLabel,
    'Tooltip implementation found'
);

// Test 6.2.3 & 6.2.6: Check modal details
const modalFunction = graphCode.includes('showProjectDetails');
const modalShowsDescription = graphCode.includes('modal-description');
const modalShowsLinks = graphCode.includes('modal-links');

test(
    '6.2.3/6.2.6 - Modal displays project details on click',
    modalFunction && modalShowsDescription && modalShowsLinks,
    'Modal implementation found with description and links'
);

console.log('\n' + '═'.repeat(60));
console.log('Task 6.3: Skill Connections');
console.log('═'.repeat(60) + '\n');

// Test 6.3.1: Check for new skills
const hasDataViz = backendCode.includes('"id": "data_viz"');
const hasApi = backendCode.includes('"id": "api"');
const hasReact = backendCode.includes('"id": "react"');
const hasComputerVision = backendCode.includes('"id": "computer_vision"');

test(
    '6.3.1 - New skill nodes defined (Data Viz, API, React, Computer Vision)',
    hasDataViz && hasApi && hasReact && hasComputerVision,
    'All new skills found in backend'
);

// Test 6.3.2: Check inner ring radius
const innerRadiusMatch = graphCode.match(/const innerRadius = (\d+);/);
const innerRadius = innerRadiusMatch ? parseInt(innerRadiusMatch[1]) : 0;
test(
    '6.3.2 - Inner ring radius set to 4 for skills',
    innerRadius === 4,
    `Inner radius is ${innerRadius}`
);

// Test 6.3.3: Check Planetrics skill connections
const planetricsSkillLinks = [
    backendCode.includes('"project": "planetrics", "skill": "python"'),
    backendCode.includes('"project": "planetrics", "skill": "data_viz"'),
    backendCode.includes('"project": "planetrics", "skill": "api"')
];

test(
    '6.3.3 - Planetrics connected to Python, Data Viz, API',
    planetricsSkillLinks.every(link => link),
    `Found ${planetricsSkillLinks.filter(l => l).length}/3 connections`
);

// Test 6.3.4: Check AI Room Designer skill connections
const aiRoomSkillLinks = [
    backendCode.includes('"project": "ai-room-designer", "skill": "python"'),
    backendCode.includes('"project": "ai-room-designer", "skill": "react"'),
    backendCode.includes('"project": "ai-room-designer", "skill": "ai_agents"'),
    backendCode.includes('"project": "ai-room-designer", "skill": "computer_vision"')
];

test(
    '6.3.4 - AI Room Designer connected to Python, React, AI Agents, Computer Vision',
    aiRoomSkillLinks.every(link => link),
    `Found ${aiRoomSkillLinks.filter(l => l).length}/4 connections`
);

// Test 6.3.5: Check connection rendering
const connectionFunction = graphCode.includes('createSkillConnections');
const connectionLines = graphCode.includes('skillConnectionLines');

test(
    '6.3.5 - Skill connection lines implemented',
    connectionFunction && connectionLines,
    'Connection rendering code found'
);

console.log('\n' + '═'.repeat(60));
console.log('Task 6.4: Evolution Paths');
console.log('═'.repeat(60) + '\n');

// Test 6.4.1: Check evolution paths exist
const evolutionFunction = graphCode.includes('createEvolutionPaths');
const evolutionLinesArray = graphCode.includes('evolutionLines');

test(
    '6.4.1 - Evolution path system implemented',
    evolutionFunction && evolutionLinesArray,
    'Evolution path code found'
);

// Test 6.4.2: Check nasa_kg to ai-room-designer path
const nasaToAiRoom = graphCode.includes('from: "nasa_kg", to: "ai-room-designer"');

test(
    '6.4.2 - Evolution path from nasa_kg to ai-room-designer defined',
    nasaToAiRoom,
    nasaToAiRoom ? 'Path found in code' : 'Path not found'
);

// Test 6.4.3: Check path colors
const pathColors = graphCode.includes('color: 0x8309D5') || graphCode.includes('color: 0x09C1D5');

test(
    '6.4.3 - Evolution paths have colors defined',
    pathColors,
    'Color definitions found'
);

// Test 6.4.4: Check nasa_kg to planetrics path
const nasaToPlanetrics = graphCode.includes('from: "nasa_kg", to: "planetrics"');

test(
    '6.4.4 - Evolution path from nasa_kg to planetrics defined',
    nasaToPlanetrics,
    nasaToPlanetrics ? 'Path found in code' : 'Path not found'
);

// Test 6.4.5: Check dashed paths
const dashedPaths = graphCode.includes('dashed: true');

test(
    '6.4.5 - Dashed path styling implemented',
    dashedPaths,
    'Dashed path configuration found'
);

// Test 6.4.6: Check animated particles
const particleFunction = graphCode.includes('createPathParticles');
const particleAnimation = graphCode.includes('pathParticles');

test(
    '6.4.6 - Animated particles along paths implemented',
    particleFunction && particleAnimation,
    'Particle animation code found'
);

// Print summary
console.log('\n' + '═'.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('═'.repeat(60) + '\n');

console.log(`Total Checks: ${results.passed + results.failed}`);
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%\n`);

if (results.failed === 0) {
    console.log('🎉 ALL CHECKS PASSED! Implementation verified.\n');
    console.log('📝 Next Steps:');
    console.log('   1. Open test-graph.html in a browser to run live tests');
    console.log('   2. Or open index.html to test in the full portfolio\n');
} else {
    console.log('⚠️  Some checks failed. Review the implementation.\n');
    process.exit(1);
}
