/**
 * Knowledge Graph Rendering Test Suite
 * Tests for verifying the integration of Planetrics and AI Room Designer projects
 */

// Test configuration
const EXPECTED_PROJECT_COUNT = 8;
const EXPECTED_SKILL_COUNT = 13;
const OUTER_RING_RADIUS = 8;
const INNER_RING_RADIUS = 4;
const ANGLE_STEP = (Math.PI * 2) / EXPECTED_PROJECT_COUNT; // 45 degrees

// Test results storage
const testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

// Helper function to log test results
function logTest(testName, passed, message) {
    const result = {
        name: testName,
        passed: passed,
        message: message
    };
    testResults.tests.push(result);
    
    if (passed) {
        testResults.passed++;
        console.log(`✅ PASS: ${testName}`);
    } else {
        testResults.failed++;
        console.error(`❌ FAIL: ${testName} - ${message}`);
    }
}

// Wait for graph to load
function waitForGraphLoad() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (typeof projectNodes !== 'undefined' && projectNodes.length > 0) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 10000);
    });
}

// Test Suite 6.1: Node Positioning and Distribution
async function testNodePositioning() {
    console.log('\n🧪 Test Suite 6.1: Node Positioning and Distribution\n');
    
    // Test 1: Verify all 8 project nodes exist
    const projectCount = projectNodes.length;
    logTest(
        '6.1.1 - All 8 project nodes appear',
        projectCount === EXPECTED_PROJECT_COUNT,
        `Expected ${EXPECTED_PROJECT_COUNT} nodes, found ${projectCount}`
    );
    
    // Test 2: Verify nodes are in outer ring
    let nodesInOuterRing = 0;
    projectNodes.forEach((node, index) => {
        const distance = Math.sqrt(
            node.userData.originalPosition.x ** 2 + 
            node.userData.originalPosition.z ** 2
        );
        if (Math.abs(distance - OUTER_RING_RADIUS) < 0.1) {
            nodesInOuterRing++;
        }
    });
    logTest(
        '6.1.2 - All nodes positioned in outer ring (radius 8)',
        nodesInOuterRing === EXPECTED_PROJECT_COUNT,
        `Expected ${EXPECTED_PROJECT_COUNT} nodes at radius ${OUTER_RING_RADIUS}, found ${nodesInOuterRing}`
    );
    
    // Test 3: Verify even distribution (45° apart)
    const angles = projectNodes.map((node, index) => {
        return Math.atan2(
            node.userData.originalPosition.z,
            node.userData.originalPosition.x
        );
    });
    
    // Sort angles and check spacing
    angles.sort((a, b) => a - b);
    let evenlyDistributed = true;
    for (let i = 0; i < angles.length - 1; i++) {
        const angleDiff = angles[i + 1] - angles[i];
        if (Math.abs(angleDiff - ANGLE_STEP) > 0.1) {
            evenlyDistributed = false;
            break;
        }
    }
    logTest(
        '6.1.3 - Nodes evenly distributed (45° apart)',
        evenlyDistributed,
        evenlyDistributed ? 'All nodes properly spaced' : 'Some nodes have irregular spacing'
    );
    
    // Test 4: Check for visual overlap
    let hasOverlap = false;
    for (let i = 0; i < projectNodes.length; i++) {
        for (let j = i + 1; j < projectNodes.length; j++) {
            const node1 = projectNodes[i];
            const node2 = projectNodes[j];
            const distance = node1.position.distanceTo(node2.position);
            
            // Minimum safe distance (considering node size of ~1.0)
            if (distance < 2.0) {
                hasOverlap = true;
                break;
            }
        }
        if (hasOverlap) break;
    }
    logTest(
        '6.1.4 - No visual overlap or collision issues',
        !hasOverlap,
        hasOverlap ? 'Some nodes are too close together' : 'All nodes have safe spacing'
    );
}

// Test Suite 6.2: Node Interactions
async function testNodeInteractions() {
    console.log('\n🧪 Test Suite 6.2: Node Interactions\n');
    
    // Test 1: Find Planetrics node
    const planetricsNode = projectNodes.find(n => n.userData.project.id === 'planetrics');
    logTest(
        '6.2.1 - Planetrics node exists',
        !!planetricsNode,
        planetricsNode ? 'Planetrics node found' : 'Planetrics node not found'
    );
    
    // Test 2: Verify Planetrics label
    if (planetricsNode) {
        const label = planetricsNode.userData.project.label;
        logTest(
            '6.2.2 - Planetrics tooltip shows correct label',
            label === 'Planetrics',
            `Expected "Planetrics", got "${label}"`
        );
    }
    
    // Test 3: Verify Planetrics has required data
    if (planetricsNode) {
        const project = planetricsNode.userData.project;
        const hasRequiredFields = !!(
            project.id &&
            project.label &&
            project.description &&
            project.group &&
            project.links
        );
        logTest(
            '6.2.3 - Planetrics has all required data fields',
            hasRequiredFields,
            hasRequiredFields ? 'All fields present' : 'Missing required fields'
        );
    }
    
    // Test 4: Find AI Room Designer node
    const aiRoomNode = projectNodes.find(n => n.userData.project.id === 'ai-room-designer');
    logTest(
        '6.2.4 - AI Room Designer node exists',
        !!aiRoomNode,
        aiRoomNode ? 'AI Room Designer node found' : 'AI Room Designer node not found'
    );
    
    // Test 5: Verify AI Room Designer label
    if (aiRoomNode) {
        const label = aiRoomNode.userData.project.label;
        logTest(
            '6.2.5 - AI Room Designer tooltip shows correct label',
            label === 'AI Room Designer',
            `Expected "AI Room Designer", got "${label}"`
        );
    }
    
    // Test 6: Verify AI Room Designer has required data
    if (aiRoomNode) {
        const project = aiRoomNode.userData.project;
        const hasRequiredFields = !!(
            project.id &&
            project.label &&
            project.description &&
            project.group &&
            project.links &&
            project.links.length >= 4
        );
        logTest(
            '6.2.6 - AI Room Designer has all required data fields',
            hasRequiredFields,
            hasRequiredFields ? 'All fields present including 4+ links' : 'Missing required fields or links'
        );
    }
}

// Test Suite 6.3: Skill Connections
async function testSkillConnections() {
    console.log('\n🧪 Test Suite 6.3: Skill Connections\n');
    
    // Test 1: Verify new skill nodes exist
    const requiredSkills = ['data_viz', 'api', 'react', 'computer_vision'];
    const foundSkills = requiredSkills.map(skillId => {
        return skillNodes.find(n => n.userData.id === skillId);
    });
    
    const allSkillsFound = foundSkills.every(skill => !!skill);
    logTest(
        '6.3.1 - New skill nodes exist (Data Viz, API, React, Computer Vision)',
        allSkillsFound,
        allSkillsFound ? 'All new skills found' : `Missing skills: ${requiredSkills.filter((_, i) => !foundSkills[i]).join(', ')}`
    );
    
    // Test 2: Verify skills are in inner ring
    let skillsInInnerRing = 0;
    skillNodes.forEach(node => {
        const distance = Math.sqrt(
            node.userData.originalPosition.x ** 2 + 
            node.userData.originalPosition.z ** 2
        );
        if (Math.abs(distance - INNER_RING_RADIUS) < 0.1) {
            skillsInInnerRing++;
        }
    });
    logTest(
        '6.3.2 - Skill nodes positioned in inner ring (radius 4)',
        skillsInInnerRing === skillNodes.length,
        `Expected ${skillNodes.length} skills at radius ${INNER_RING_RADIUS}, found ${skillsInInnerRing}`
    );
    
    // Test 3: Verify Planetrics connections
    const planetricsConnections = skillConnectionLines.filter(line => 
        line.userData.projectNode.userData.project.id === 'planetrics'
    );
    const planetricsSkills = planetricsConnections.map(line => line.userData.skillNode.userData.id);
    const expectedPlanetrics = ['python', 'data_viz', 'api'];
    const hasPlanetrics = expectedPlanetrics.every(skill => planetricsSkills.includes(skill));
    
    logTest(
        '6.3.3 - Planetrics connected to correct skills (Python, Data Viz, API)',
        hasPlanetrics,
        hasPlanetrics ? 'All connections present' : `Missing: ${expectedPlanetrics.filter(s => !planetricsSkills.includes(s)).join(', ')}`
    );
    
    // Test 4: Verify AI Room Designer connections
    const aiRoomConnections = skillConnectionLines.filter(line => 
        line.userData.projectNode.userData.project.id === 'ai-room-designer'
    );
    const aiRoomSkills = aiRoomConnections.map(line => line.userData.skillNode.userData.id);
    const expectedAiRoom = ['python', 'react', 'ai_agents', 'computer_vision'];
    const hasAiRoom = expectedAiRoom.every(skill => aiRoomSkills.includes(skill));
    
    logTest(
        '6.3.4 - AI Room Designer connected to correct skills',
        hasAiRoom,
        hasAiRoom ? 'All connections present' : `Missing: ${expectedAiRoom.filter(s => !aiRoomSkills.includes(s)).join(', ')}`
    );
    
    // Test 5: Verify connection lines render
    logTest(
        '6.3.5 - Connection lines created and added to scene',
        skillConnectionLines.length > 0,
        `Found ${skillConnectionLines.length} skill connection lines`
    );
}

// Test Suite 6.4: Evolution Paths
async function testEvolutionPaths() {
    console.log('\n🧪 Test Suite 6.4: Evolution Paths\n');
    
    // Test 1: Verify evolution lines exist
    logTest(
        '6.4.1 - Evolution path lines created',
        evolutionLines.length > 0,
        `Found ${evolutionLines.length} evolution paths`
    );
    
    // Test 2: Find nasa_kg to ai-room-designer path
    const nasaToAiRoom = evolutionLines.find(line => 
        line.userData.fromNode.userData.project.id === 'nasa_kg' &&
        line.userData.toNode.userData.project.id === 'ai-room-designer'
    );
    logTest(
        '6.4.2 - Evolution path from nasa_kg to ai-room-designer exists',
        !!nasaToAiRoom,
        nasaToAiRoom ? 'Path found' : 'Path not found'
    );
    
    // Test 3: Verify path color
    if (nasaToAiRoom) {
        const expectedColor = 0x8309D5; // Purple
        logTest(
            '6.4.3 - nasa_kg → ai-room-designer path has correct color',
            nasaToAiRoom.material.color.getHex() === expectedColor,
            `Expected ${expectedColor.toString(16)}, got ${nasaToAiRoom.material.color.getHex().toString(16)}`
        );
    }
    
    // Test 4: Find nasa_kg to planetrics path
    const nasaToPlanetrics = evolutionLines.find(line => 
        line.userData.fromNode.userData.project.id === 'nasa_kg' &&
        line.userData.toNode.userData.project.id === 'planetrics'
    );
    logTest(
        '6.4.4 - Evolution path from nasa_kg to planetrics exists (dashed)',
        !!nasaToPlanetrics,
        nasaToPlanetrics ? 'Path found' : 'Path not found'
    );
    
    // Test 5: Verify dashed path has lower opacity
    if (nasaToPlanetrics) {
        const isDashed = nasaToPlanetrics.userData.baseOpacity === 0.3;
        logTest(
            '6.4.5 - Planetrics path is dashed (lower opacity)',
            isDashed,
            isDashed ? 'Correct opacity (0.3)' : `Wrong opacity: ${nasaToPlanetrics.userData.baseOpacity}`
        );
    }
    
    // Test 6: Verify path particles exist
    logTest(
        '6.4.6 - Animated particles along paths exist',
        pathParticles.length > 0,
        `Found ${pathParticles.length} path particles`
    );
}

// Main test runner
async function runAllTests() {
    console.log('🚀 Starting Knowledge Graph Rendering Tests...\n');
    console.log('⏳ Waiting for graph to load...\n');
    
    await waitForGraphLoad();
    
    if (projectNodes.length === 0) {
        console.error('❌ CRITICAL: Graph failed to load. Cannot run tests.');
        return;
    }
    
    console.log('✅ Graph loaded successfully!\n');
    console.log('═'.repeat(60));
    
    // Run all test suites
    await testNodePositioning();
    await testNodeInteractions();
    await testSkillConnections();
    await testEvolutionPaths();
    
    // Print summary
    console.log('\n' + '═'.repeat(60));
    console.log('\n📊 TEST SUMMARY\n');
    console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
    
    if (testResults.failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Knowledge graph rendering is working correctly.\n');
    } else {
        console.log('\n⚠️  Some tests failed. Review the details above.\n');
    }
    
    // Return results for programmatic access
    return testResults;
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(runAllTests, 2000); // Wait 2 seconds for graph to initialize
    });
}

// Export for manual testing
if (typeof window !== 'undefined') {
    window.runGraphTests = runAllTests;
}
