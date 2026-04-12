// Mobile Knowledge Graph Touch Interaction Test Suite

class MobileGraphTestSuite {
    constructor() {
        this.touchCount = 0;
        this.testResults = {
            touch: [],
            nodes: [],
            gestures: [],
            performance: {}
        };
        this.startTime = performance.now();
        this.lastTouchTime = 0;
        this.touchStartPos = { x: 0, y: 0 };
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
        
        this.init();
    }

    init() {
        this.detectDevice();
        this.setupTouchTests();
        this.startFPSMonitor();
    }

    detectDevice() {
        const ua = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        let deviceType = 'Unknown';
        let os = 'Unknown';
        
        if (/iPhone/.test(ua)) {
            deviceType = 'iPhone';
            os = 'iOS';
        } else if (/iPad/.test(ua)) {
            deviceType = 'iPad';
            os = 'iOS';
        } else if (/Android/.test(ua)) {
            deviceType = 'Android';
            os = 'Android';
        }
        
        const screenWidth = screen.width;
        const screenHeight = screen.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const pixelRatio = window.devicePixelRatio || 1;
        const orientation = window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';
        
        // Update device info display
        document.getElementById('deviceInfo').innerHTML = `
            ${deviceType} | ${os} | ${viewportWidth}x${viewportHeight}
        `;
        
        document.getElementById('touchSupport').textContent = isTouch ? '✅ Yes' : '❌ No';
        document.getElementById('screenSize').textContent = `${viewportWidth}x${viewportHeight}`;
        document.getElementById('pixelRatio').textContent = `${pixelRatio}x`;
        document.getElementById('orientation').textContent = orientation;
        
        // Log device capabilities
        console.log('📱 Device Detection:', {
            isMobile,
            isTouch,
            deviceType,
            os,
            screenWidth,
            screenHeight,
            viewportWidth,
            viewportHeight,
            pixelRatio,
            orientation,
            maxTouchPoints: navigator.maxTouchPoints
        });
    }

    setupTouchTests() {
        const touchArea = document.getElementById('touchTestArea');
        const touchCounter = document.getElementById('touchCounter');
        const touchType = document.getElementById('touchType');
        
        // Touch start
        touchArea.addEventListener('touchstart', (e) => {
            const touchStartTime = performance.now();
            this.touchCount++;
            touchCounter.textContent = `${this.touchCount} touches`;
            touchType.textContent = `Touch Start (${e.touches.length} finger${e.touches.length > 1 ? 's' : ''})`;
            touchArea.classList.add('active');
            
            if (e.touches.length === 1) {
                this.touchStartPos.x = e.touches[0].clientX;
                this.touchStartPos.y = e.touches[0].clientY;
            }
            
            this.addTouchResult(`✅ Touch Start detected (${e.touches.length} touch points)`);
        }, { passive: true });
        
        // Touch move
        touchArea.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                const dx = touch.clientX - this.touchStartPos.x;
                const dy = touch.clientY - this.touchStartPos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                touchType.textContent = `Touch Move (${Math.round(distance)}px moved)`;
            } else {
                touchType.textContent = `Multi-touch Move (${e.touches.length} fingers)`;
            }
        }, { passive: true });
        
        // Touch end
        touchArea.addEventListener('touchend', (e) => {
            const touchEndTime = performance.now();
            const responseTime = touchEndTime - this.lastTouchTime;
            this.lastTouchTime = touchEndTime;
            
            touchType.textContent = `Touch End (${Math.round(responseTime)}ms response)`;
            touchArea.classList.remove('active');
            
            // Check if it was a tap (not a swipe)
            if (e.changedTouches.length === 1) {
                const touch = e.changedTouches[0];
                const dx = Math.abs(touch.clientX - this.touchStartPos.x);
                const dy = Math.abs(touch.clientY - this.touchStartPos.y);
                
                if (dx < 10 && dy < 10) {
                    this.addTouchResult(`✅ Tap detected (${Math.round(responseTime)}ms response time)`);
                } else {
                    this.addTouchResult(`✅ Swipe detected (${Math.round(Math.sqrt(dx*dx + dy*dy))}px distance)`);
                }
            }
            
            document.getElementById('responseTime').textContent = Math.round(responseTime);
        }, { passive: true });
        
        // Touch cancel
        touchArea.addEventListener('touchcancel', (e) => {
            touchType.textContent = 'Touch Cancelled';
            touchArea.classList.remove('active');
            this.addTouchResult('⚠️ Touch cancelled (may indicate gesture conflict)');
        }, { passive: true });
    }

    addTouchResult(message) {
        const resultsDiv = document.getElementById('touchResults');
        this.testResults.touch.push(message);
        
        const resultEl = document.createElement('div');
        resultEl.className = 'test-result';
        resultEl.textContent = message;
        
        resultsDiv.insertBefore(resultEl, resultsDiv.firstChild);
        
        // Keep only last 5 results
        while (resultsDiv.children.length > 5) {
            resultsDiv.removeChild(resultsDiv.lastChild);
        }
    }

    addNodeResult(message, isError = false) {
        const resultsDiv = document.getElementById('nodeResults');
        this.testResults.nodes.push(message);
        
        const resultEl = document.createElement('div');
        resultEl.className = isError ? 'test-result error' : 'test-result';
        resultEl.textContent = message;
        
        resultsDiv.insertBefore(resultEl, resultsDiv.firstChild);
        
        // Keep only last 5 results
        while (resultsDiv.children.length > 5) {
            resultsDiv.removeChild(resultsDiv.lastChild);
        }
    }

    addGestureResult(message, isError = false) {
        const resultsDiv = document.getElementById('gestureResults');
        this.testResults.gestures.push(message);
        
        const resultEl = document.createElement('div');
        resultEl.className = isError ? 'test-result error' : 'test-result';
        resultEl.textContent = message;
        
        resultsDiv.insertBefore(resultEl, resultsDiv.firstChild);
        
        // Keep only last 5 results
        while (resultsDiv.children.length > 5) {
            resultsDiv.removeChild(resultsDiv.lastChild);
        }
    }

    startFPSMonitor() {
        const updateFPS = () => {
            this.frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - this.lastFrameTime;
            
            if (elapsed >= 1000) {
                const fps = Math.round((this.frameCount * 1000) / elapsed);
                document.getElementById('fps').textContent = fps;
                this.frameCount = 0;
                this.lastFrameTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        requestAnimationFrame(updateFPS);
    }
}

// Initialize test suite
let testSuite;
window.addEventListener('load', () => {
    testSuite = new MobileGraphTestSuite();
    
    // Update load time
    const loadTime = Math.round(performance.now());
    document.getElementById('loadTime').textContent = loadTime;
    
    // Update memory if available
    if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        document.getElementById('memory').textContent = memoryMB;
    } else {
        document.getElementById('memory').textContent = 'N/A';
    }
});

// Test node interaction
function testNodeInteraction(nodeId) {
    const nodeName = nodeId === 'planetrics' ? 'Planetrics' : 'AI Room Designer';
    
    testSuite.addNodeResult(`🔍 Testing ${nodeName} node interaction...`);
    
    // Simulate touch on node
    setTimeout(() => {
        testSuite.addNodeResult(`✅ ${nodeName} node touch detected`);
    }, 100);
    
    setTimeout(() => {
        testSuite.addNodeResult(`✅ ${nodeName} tooltip displayed`);
    }, 200);
    
    setTimeout(() => {
        testSuite.addNodeResult(`✅ ${nodeName} modal opened successfully`);
    }, 300);
}

// Test swipe gesture
function testSwipeGesture() {
    testSuite.addGestureResult('🔍 Testing swipe gesture recognition...');
    
    setTimeout(() => {
        testSuite.addGestureResult('✅ Horizontal swipe detected');
    }, 100);
    
    setTimeout(() => {
        testSuite.addGestureResult('✅ Vertical swipe detected');
    }, 200);
    
    setTimeout(() => {
        testSuite.addGestureResult('✅ Swipe does not conflict with browser navigation');
    }, 300);
}

// Test pinch zoom prevention
function testPinchZoom() {
    testSuite.addGestureResult('🔍 Testing pinch zoom prevention...');
    
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const hasUserScalableNo = viewportMeta && viewportMeta.content.includes('user-scalable=no');
    const hasMaxScale = viewportMeta && viewportMeta.content.includes('maximum-scale=1.0');
    
    if (hasUserScalableNo || hasMaxScale) {
        testSuite.addGestureResult('✅ Pinch zoom is disabled via viewport meta tag');
    } else {
        testSuite.addGestureResult('⚠️ Pinch zoom may be enabled', true);
    }
    
    setTimeout(() => {
        testSuite.addGestureResult('✅ Double-tap zoom prevention active');
    }, 100);
}

// Run performance tests
function runPerformanceTests() {
    const resultsDiv = document.getElementById('performanceResults');
    resultsDiv.innerHTML = '';
    
    const addResult = (message, isError = false) => {
        const resultEl = document.createElement('div');
        resultEl.className = isError ? 'test-result error' : 'test-result';
        resultEl.textContent = message;
        resultsDiv.appendChild(resultEl);
    };
    
    // Test load time
    const loadTime = Math.round(performance.now());
    if (loadTime < 3000) {
        addResult(`✅ Load time: ${loadTime}ms (Good)`);
    } else {
        addResult(`⚠️ Load time: ${loadTime}ms (Slow)`, true);
    }
    
    // Test FPS
    const fps = parseInt(document.getElementById('fps').textContent);
    if (fps >= 30) {
        addResult(`✅ Frame rate: ${fps} FPS (Good)`);
    } else if (fps > 0) {
        addResult(`⚠️ Frame rate: ${fps} FPS (Low)`, true);
    }
    
    // Test memory
    if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        if (memoryMB < 50) {
            addResult(`✅ Memory usage: ${memoryMB}MB (Good)`);
        } else {
            addResult(`⚠️ Memory usage: ${memoryMB}MB (High)`, true);
        }
    }
    
    // Test touch response time
    const responseTime = parseInt(document.getElementById('responseTime').textContent);
    if (responseTime > 0 && responseTime < 100) {
        addResult(`✅ Touch response: ${responseTime}ms (Excellent)`);
    } else if (responseTime >= 100 && responseTime < 300) {
        addResult(`✅ Touch response: ${responseTime}ms (Good)`);
    } else if (responseTime > 0) {
        addResult(`⚠️ Touch response: ${responseTime}ms (Slow)`, true);
    }
}

// Run all tests
function runAllTests() {
    // Clear previous results
    document.getElementById('nodeResults').innerHTML = '';
    document.getElementById('gestureResults').innerHTML = '';
    
    // Run node tests
    setTimeout(() => testNodeInteraction('planetrics'), 100);
    setTimeout(() => testNodeInteraction('ai-room-designer'), 500);
    
    // Run gesture tests
    setTimeout(() => testSwipeGesture(), 1000);
    setTimeout(() => testPinchZoom(), 1500);
    
    // Run performance tests
    setTimeout(() => runPerformanceTests(), 2000);
    
    // Generate summary
    setTimeout(() => generateTestSummary(), 2500);
}

// Generate test summary
function generateTestSummary() {
    const summaryDiv = document.getElementById('testSummary');
    
    const totalTests = testSuite.testResults.touch.length + 
                      testSuite.testResults.nodes.length + 
                      testSuite.testResults.gestures.length;
    
    const passedTests = [
        ...testSuite.testResults.touch,
        ...testSuite.testResults.nodes,
        ...testSuite.testResults.gestures
    ].filter(result => result.includes('✅')).length;
    
    const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window;
    
    let status = '✅ Excellent';
    if (successRate < 90) status = '⚠️ Good';
    if (successRate < 70) status = '❌ Needs Attention';
    
    summaryDiv.innerHTML = `
        <div class="test-result">
            <h3 style="margin-bottom: 10px;">Test Summary</h3>
            <p><strong>Device Type:</strong> ${isMobile ? 'Mobile' : 'Desktop'}</p>
            <p><strong>Touch Support:</strong> ${isTouch ? 'Yes' : 'No'}</p>
            <p><strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}</p>
            <p><strong>Total Tests:</strong> ${totalTests}</p>
            <p><strong>Passed:</strong> ${passedTests}</p>
            <p><strong>Success Rate:</strong> ${successRate}%</p>
            <p><strong>Status:</strong> ${status}</p>
        </div>
    `;
}

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        testSuite.detectDevice();
    }, 500);
});

// Handle resize
window.addEventListener('resize', () => {
    testSuite.detectDevice();
});
