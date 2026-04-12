// Test Carousel Integration
// Task 7: Test carousel integration for Planetrics and AI Room Designer

let testResults = {
    total: 0,
    passed: 0,
    failed: 0,
    pending: 0
};

// Helper function to update test summary
function updateTestSummary() {
    document.getElementById('total-tests').textContent = testResults.total;
    document.getElementById('passed-tests').textContent = testResults.passed;
    document.getElementById('failed-tests').textContent = testResults.failed;
    document.getElementById('pending-tests').textContent = testResults.pending;
}

// Helper function to show test result
function showResult(elementId, success, message) {
    const resultElement = document.getElementById(elementId);
    resultElement.className = `test-result ${success ? 'success' : 'error'}`;
    resultElement.innerHTML = `<i class="fas fa-${success ? 'check-circle' : 'times-circle'}"></i> ${message}`;
    
    if (success) {
        testResults.passed++;
    } else {
        testResults.failed++;
    }
    testResults.pending--;
    updateTestSummary();
}

// Helper function to show info result
function showInfo(elementId, message) {
    const resultElement = document.getElementById(elementId);
    resultElement.className = 'test-result info';
    resultElement.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
}

// Helper function to update section status
function updateSectionStatus(sectionId, status) {
    const statusBadge = document.getElementById(`status-${sectionId}`);
    statusBadge.className = `status-badge ${status}`;
    statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
}

// Initialize test counts
function initializeTests() {
    testResults.total = 13; // Total number of tests
    testResults.pending = 13;
    updateTestSummary();
}

// Wait for carousel to be ready
function waitForCarousel() {
    return new Promise((resolve) => {
        const checkCarousel = setInterval(() => {
            if (typeof featuredProjects !== 'undefined' && featuredProjects.length > 0) {
                clearInterval(checkCarousel);
                resolve();
            }
        }, 100);
    });
}

// Wait for graph to be ready
function waitForGraph() {
    return new Promise((resolve) => {
        const checkGraph = setInterval(() => {
            if (typeof projectNodes !== 'undefined' && projectNodes.length > 0) {
                clearInterval(checkGraph);
                resolve();
            }
        }, 100);
    });
}

// ===== SUBTASK 7.1: Carousel Navigation and Display =====

// Test 7.1.1: Planetrics in Carousel
async function testPlanetricsInCarousel() {
    updateSectionStatus('7-1', 'running');
    await waitForCarousel();
    
    const planetricsProject = featuredProjects.find(p => p.id === 'planetrics');
    
    if (planetricsProject) {
        showResult('result-7-1-1', true, 
            `✓ Planetrics found in carousel: "${planetricsProject.title}"`);
    } else {
        showResult('result-7-1-1', false, 
            '✗ Planetrics NOT found in carousel array');
    }
    
    checkSection71Complete();
}

// Test 7.1.2: AI Room Designer in Carousel
async function testAIRoomDesignerInCarousel() {
    updateSectionStatus('7-1', 'running');
    await waitForCarousel();
    
    const aiRoomProject = featuredProjects.find(p => p.id === 'ai-room-designer');
    
    if (aiRoomProject) {
        showResult('result-7-1-2', true, 
            `✓ AI Room Designer found in carousel: "${aiRoomProject.title}"`);
    } else {
        showResult('result-7-1-2', false, 
            '✗ AI Room Designer NOT found in carousel array');
    }
    
    checkSection71Complete();
}

// Test 7.1.3: Navigation Buttons
async function testNavigationButtons() {
    updateSectionStatus('7-1', 'running');
    await waitForCarousel();
    
    const initialIndex = currentProjectIndex;
    const nextButton = document.getElementById('next-project');
    const prevButton = document.getElementById('prev-project');
    
    if (!nextButton || !prevButton) {
        showResult('result-7-1-3', false, '✗ Navigation buttons not found');
        checkSection71Complete();
        return;
    }
    
    // Test next button
    nextButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    const afterNext = currentProjectIndex;
    
    // Test prev button
    prevButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    const afterPrev = currentProjectIndex;
    
    if (afterNext !== initialIndex && afterPrev === initialIndex) {
        showResult('result-7-1-3', true, 
            `✓ Navigation buttons work correctly (Initial: ${initialIndex}, After Next: ${afterNext}, After Prev: ${afterPrev})`);
    } else {
        showResult('result-7-1-3', false, 
            `✗ Navigation buttons not working as expected`);
    }
    
    checkSection71Complete();
}

// Test 7.1.4: Project Images Load
async function testProjectImages() {
    updateSectionStatus('7-1', 'running');
    await waitForCarousel();
    
    const planetricsProject = featuredProjects.find(p => p.id === 'planetrics');
    const aiRoomProject = featuredProjects.find(p => p.id === 'ai-room-designer');
    
    const results = [];
    
    if (planetricsProject && planetricsProject.image) {
        results.push(`Planetrics image: ${planetricsProject.image}`);
    } else {
        results.push('⚠ Planetrics image missing');
    }
    
    if (aiRoomProject && aiRoomProject.image) {
        results.push(`AI Room Designer image: ${aiRoomProject.image}`);
    } else {
        results.push('⚠ AI Room Designer image missing');
    }
    
    const allImagesPresent = planetricsProject?.image && aiRoomProject?.image;
    
    showResult('result-7-1-4', allImagesPresent, 
        allImagesPresent ? 
        `✓ Both project images configured: ${results.join(', ')}` : 
        `✗ Some images missing: ${results.join(', ')}`);
    
    checkSection71Complete();
}

function checkSection71Complete() {
    const results = ['result-7-1-1', 'result-7-1-2', 'result-7-1-3', 'result-7-1-4'];
    const allComplete = results.every(id => {
        const el = document.getElementById(id);
        return el && el.classList.contains('success') || el.classList.contains('error');
    });
    
    if (allComplete) {
        const allPassed = results.every(id => 
            document.getElementById(id).classList.contains('success')
        );
        updateSectionStatus('7-1', allPassed ? 'passed' : 'failed');
    }
}

// ===== SUBTASK 7.2: Carousel-Graph Synchronization =====

// Test 7.2.1: Planetrics Card → Graph
async function testPlanetricsCardToGraph() {
    updateSectionStatus('7-2', 'running');
    await waitForCarousel();
    await waitForGraph();
    
    // Find Planetrics in carousel
    const planetricsIndex = featuredProjects.findIndex(p => p.id === 'planetrics');
    
    if (planetricsIndex === -1) {
        showResult('result-7-2-1', false, '✗ Planetrics not found in carousel');
        checkSection72Complete();
        return;
    }
    
    // Navigate to Planetrics
    currentProjectIndex = planetricsIndex;
    renderProject(currentProjectIndex);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if zoomToProjectNode function exists
    if (typeof zoomToProjectNode === 'function') {
        showResult('result-7-2-1', true, 
            `✓ Carousel card click integration available. Click the carousel card to test zoom to Planetrics node.`);
    } else {
        showResult('result-7-2-1', false, 
            '✗ zoomToProjectNode function not found');
    }
    
    checkSection72Complete();
}

// Test 7.2.2: AI Room Designer Card → Graph
async function testAIRoomDesignerCardToGraph() {
    updateSectionStatus('7-2', 'running');
    await waitForCarousel();
    await waitForGraph();
    
    // Find AI Room Designer in carousel
    const aiRoomIndex = featuredProjects.findIndex(p => p.id === 'ai-room-designer');
    
    if (aiRoomIndex === -1) {
        showResult('result-7-2-2', false, '✗ AI Room Designer not found in carousel');
        checkSection72Complete();
        return;
    }
    
    // Navigate to AI Room Designer
    currentProjectIndex = aiRoomIndex;
    renderProject(currentProjectIndex);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if zoomToProjectNode function exists
    if (typeof zoomToProjectNode === 'function') {
        showResult('result-7-2-2', true, 
            `✓ Carousel card click integration available. Click the carousel card to test zoom to AI Room Designer node.`);
    } else {
        showResult('result-7-2-2', false, 
            '✗ zoomToProjectNode function not found');
    }
    
    checkSection72Complete();
}

// Test 7.2.3: Planetrics Graph → Carousel
async function testPlanetricsGraphToCarousel() {
    updateSectionStatus('7-2', 'running');
    await waitForGraph();
    await waitForCarousel();
    
    // Find Planetrics node in graph
    const planetricsNode = projectNodes.find(n => n.userData.id === 'planetrics');
    
    if (!planetricsNode) {
        showResult('result-7-2-3', false, '✗ Planetrics node not found in graph');
        checkSection72Complete();
        return;
    }
    
    // Check if updateCarouselToProject function exists
    if (typeof updateCarouselToProject === 'function') {
        // Test the function
        updateCarouselToProject('planetrics');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const currentProject = featuredProjects[currentProjectIndex];
        if (currentProject && currentProject.id === 'planetrics') {
            showResult('result-7-2-3', true, 
                `✓ Graph node click updates carousel to Planetrics`);
        } else {
            showResult('result-7-2-3', false, 
                `✗ Carousel did not update to Planetrics (current: ${currentProject?.id})`);
        }
    } else {
        showResult('result-7-2-3', false, 
            '✗ updateCarouselToProject function not found');
    }
    
    checkSection72Complete();
}

// Test 7.2.4: AI Room Designer Graph → Carousel
async function testAIRoomDesignerGraphToCarousel() {
    updateSectionStatus('7-2', 'running');
    await waitForGraph();
    await waitForCarousel();
    
    // Find AI Room Designer node in graph
    const aiRoomNode = projectNodes.find(n => n.userData.id === 'ai-room-designer');
    
    if (!aiRoomNode) {
        showResult('result-7-2-4', false, '✗ AI Room Designer node not found in graph');
        checkSection72Complete();
        return;
    }
    
    // Check if updateCarouselToProject function exists
    if (typeof updateCarouselToProject === 'function') {
        // Test the function
        updateCarouselToProject('ai-room-designer');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const currentProject = featuredProjects[currentProjectIndex];
        if (currentProject && currentProject.id === 'ai-room-designer') {
            showResult('result-7-2-4', true, 
                `✓ Graph node click updates carousel to AI Room Designer`);
        } else {
            showResult('result-7-2-4', false, 
                `✗ Carousel did not update to AI Room Designer (current: ${currentProject?.id})`);
        }
    } else {
        showResult('result-7-2-4', false, 
            '✗ updateCarouselToProject function not found');
    }
    
    checkSection72Complete();
}

function checkSection72Complete() {
    const results = ['result-7-2-1', 'result-7-2-2', 'result-7-2-3', 'result-7-2-4'];
    const allComplete = results.every(id => {
        const el = document.getElementById(id);
        return el && (el.classList.contains('success') || el.classList.contains('error'));
    });
    
    if (allComplete) {
        const allPassed = results.every(id => 
            document.getElementById(id).classList.contains('success')
        );
        updateSectionStatus('7-2', allPassed ? 'passed' : 'failed');
    }
}

// ===== SUBTASK 7.3: External Links Verification =====

// Test 7.3.1: Planetrics Links
async function testPlanetricsLinks() {
    updateSectionStatus('7-3', 'running');
    await waitForCarousel();
    
    const planetricsProject = featuredProjects.find(p => p.id === 'planetrics');
    
    if (!planetricsProject) {
        showResult('result-7-3-1', false, '✗ Planetrics project not found');
        checkSection73Complete();
        return;
    }
    
    if (!planetricsProject.links || planetricsProject.links.length === 0) {
        showResult('result-7-3-1', false, '✗ Planetrics has no links configured');
        checkSection73Complete();
        return;
    }
    
    const linkInfo = planetricsProject.links.map(link => 
        `${link.label}: ${link.url}`
    ).join(', ');
    
    showResult('result-7-3-1', true, 
        `✓ Planetrics has ${planetricsProject.links.length} link(s): ${linkInfo}`);
    
    checkSection73Complete();
}

// Test 7.3.2: AI Room Designer Railway
async function testAIRoomDesignerRailway() {
    updateSectionStatus('7-3', 'running');
    await waitForCarousel();
    
    const aiRoomProject = featuredProjects.find(p => p.id === 'ai-room-designer');
    
    if (!aiRoomProject) {
        showResult('result-7-3-2', false, '✗ AI Room Designer project not found');
        checkSection73Complete();
        return;
    }
    
    const railwayLink = aiRoomProject.links?.find(link => 
        link.url.includes('railway.app')
    );
    
    if (railwayLink) {
        showResult('result-7-3-2', true, 
            `✓ Railway link found: ${railwayLink.url}`);
    } else {
        showResult('result-7-3-2', false, 
            '✗ Railway deployment link not found');
    }
    
    checkSection73Complete();
}

// Test 7.3.3: AI Room Designer Vercel
async function testAIRoomDesignerVercel() {
    updateSectionStatus('7-3', 'running');
    await waitForCarousel();
    
    const aiRoomProject = featuredProjects.find(p => p.id === 'ai-room-designer');
    
    if (!aiRoomProject) {
        showResult('result-7-3-3', false, '✗ AI Room Designer project not found');
        checkSection73Complete();
        return;
    }
    
    const vercelLink = aiRoomProject.links?.find(link => 
        link.url.includes('vercel.app')
    );
    
    if (vercelLink) {
        showResult('result-7-3-3', true, 
            `✓ Vercel link found: ${vercelLink.url}`);
    } else {
        showResult('result-7-3-3', false, 
            '✗ Vercel deployment link not found');
    }
    
    checkSection73Complete();
}

// Test 7.3.4: AI Room Designer GitHub
async function testAIRoomDesignerGitHub() {
    updateSectionStatus('7-3', 'running');
    await waitForCarousel();
    
    const aiRoomProject = featuredProjects.find(p => p.id === 'ai-room-designer');
    
    if (!aiRoomProject) {
        showResult('result-7-3-4', false, '✗ AI Room Designer project not found');
        checkSection73Complete();
        return;
    }
    
    const githubLink = aiRoomProject.links?.find(link => 
        link.url.includes('github.com')
    );
    
    if (githubLink) {
        showResult('result-7-3-4', true, 
            `✓ GitHub link found: ${githubLink.url}`);
    } else {
        showResult('result-7-3-4', false, 
            '✗ GitHub repository link not found');
    }
    
    checkSection73Complete();
}

// Test 7.3.5: AI Room Designer YouTube
async function testAIRoomDesignerYouTube() {
    updateSectionStatus('7-3', 'running');
    await waitForCarousel();
    
    const aiRoomProject = featuredProjects.find(p => p.id === 'ai-room-designer');
    
    if (!aiRoomProject) {
        showResult('result-7-3-5', false, '✗ AI Room Designer project not found');
        checkSection73Complete();
        return;
    }
    
    const youtubeLink = aiRoomProject.links?.find(link => 
        link.url.includes('youtube.com') || link.url.includes('youtu.be')
    );
    
    if (youtubeLink) {
        showResult('result-7-3-5', true, 
            `✓ YouTube link found: ${youtubeLink.url}`);
    } else {
        showResult('result-7-3-5', false, 
            '✗ YouTube demo video link not found');
    }
    
    checkSection73Complete();
}

function checkSection73Complete() {
    const results = ['result-7-3-1', 'result-7-3-2', 'result-7-3-3', 'result-7-3-4', 'result-7-3-5'];
    const allComplete = results.every(id => {
        const el = document.getElementById(id);
        return el && (el.classList.contains('success') || el.classList.contains('error'));
    });
    
    if (allComplete) {
        const allPassed = results.every(id => 
            document.getElementById(id).classList.contains('success')
        );
        updateSectionStatus('7-3', allPassed ? 'passed' : 'failed');
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Running all carousel integration tests...');
    
    // Reset results
    testResults = {
        total: 13,
        passed: 0,
        failed: 0,
        pending: 13
    };
    updateTestSummary();
    
    // Clear previous results
    for (let i = 1; i <= 13; i++) {
        const sections = [
            ['7-1-1', '7-1-2', '7-1-3', '7-1-4'],
            ['7-2-1', '7-2-2', '7-2-3', '7-2-4'],
            ['7-3-1', '7-3-2', '7-3-3', '7-3-4', '7-3-5']
        ];
        
        sections.forEach(section => {
            section.forEach(id => {
                const el = document.getElementById(`result-${id}`);
                if (el) {
                    el.className = 'test-result';
                    el.style.display = 'none';
                }
            });
        });
    }
    
    // Run all tests in sequence
    await testPlanetricsInCarousel();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerInCarousel();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testNavigationButtons();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testProjectImages();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testPlanetricsCardToGraph();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerCardToGraph();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testPlanetricsGraphToCarousel();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerGraphToCarousel();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testPlanetricsLinks();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerRailway();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerVercel();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerGitHub();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await testAIRoomDesignerYouTube();
    
    console.log('✅ All tests completed!');
    console.log(`Results: ${testResults.passed} passed, ${testResults.failed} failed`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTests();
    console.log('📋 Test suite initialized. Click "Run All Tests" to begin.');
});
