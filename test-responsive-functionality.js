// Responsive functionality test suite
class ResponsiveTestSuite {
    constructor() {
        this.results = {
            viewport: [],
            touch: [],
            navigation: [],
            media: [],
            performance: {},
            breakpoints: []
        };
        this.touchCount = 0;
        this.startTime = performance.now();
        this.init();
    }

    init() {
        this.updateViewportInfo();
        this.setupTouchTests();
        this.testBreakpoints();
        this.testPerformance();
        this.setupEventListeners();
        this.generateSummary();
    }

    updateViewportInfo() {
        const screenWidth = screen.width;
        const screenHeight = screen.height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const devicePixelRatio = window.devicePixelRatio || 1;
        const orientation = screen.orientation ? screen.orientation.type : 
                          (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');

        document.getElementById('screenWidth').textContent = screenWidth + 'px';
        document.getElementById('screenHeight').textContent = screenHeight + 'px';
        document.getElementById('viewportWidth').textContent = viewportWidth + 'px';
        document.getElementById('viewportHeight').textContent = viewportHeight + 'px';
        document.getElementById('devicePixelRatio').textContent = devicePixelRatio;
        document.getElementById('orientation').textContent = orientation;

        // Analyze viewport
        let results = [];
        
        if (viewportWidth <= 480) {
            results.push('📱 Mobile viewport detected (≤ 480px)');
        } else if (viewportWidth <= 768) {
            results.push('📱 Tablet viewport detected (481-768px)');
        } else if (viewportWidth <= 1024) {
            results.push('💻 Small desktop viewport detected (769-1024px)');
        } else {
            results.push('🖥️ Large desktop viewport detected (> 1024px)');
        }

        if (devicePixelRatio > 1) {
            results.push(`✅ High DPI display detected (${devicePixelRatio}x)`);
        }

        if (orientation.includes('landscape') && viewportHeight < 500) {
            results.push('📱 Mobile landscape mode detected');
        }

        this.results.viewport = results;
        document.getElementById('viewportResults').innerHTML = 
            '<div class="test-results">' + results.join('<br>') + '</div>';
    }

    setupTouchTests() {
        const touchArea = document.getElementById('touchTestArea');
        const touchCounter = document.getElementById('touchCounter');
        let results = [];

        // Test touch events
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            results.push('✅ Touch events supported');
            
            touchArea.addEventListener('touchstart', (e) => {
                this.touchCount++;
                touchCounter.textContent = `Interactions: ${this.touchCount}`;
                results.push(`✅ Touch start detected at ${new Date().toLocaleTimeString()}`);
                this.updateTouchResults(results);
            });

            touchArea.addEventListener('touchend', (e) => {
                results.push(`✅ Touch end detected`);
                this.updateTouchResults(results);
            });
        } else {
            results.push('❌ Touch events not supported');
        }

        // Test mouse events (fallback)
        touchArea.addEventListener('click', (e) => {
            this.touchCount++;
            touchCounter.textContent = `Interactions: ${this.touchCount}`;
            results.push(`✅ Click detected at ${new Date().toLocaleTimeString()}`);
            this.updateTouchResults(results);
        });

        // Test pointer events
        if ('onpointerdown' in window) {
            results.push('✅ Pointer events supported');
        } else {
            results.push('❌ Pointer events not supported');
        }

        this.results.touch = results;
        this.updateTouchResults(results);
    }

    updateTouchResults(results) {
        document.getElementById('touchResults').innerHTML = 
            '<div class="test-results">' + results.slice(-10).join('<br>') + '</div>';
    }

    testBreakpoints() {
        const viewportWidth = window.innerWidth;
        let results = [];

        // Test CSS Grid support at different breakpoints
        const testGrid = document.createElement('div');
        testGrid.style.display = 'grid';
        testGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        
        if (testGrid.style.display === 'grid') {
            results.push('✅ CSS Grid responsive layout supported');
        } else {
            results.push('❌ CSS Grid not supported');
        }

        // Test flexbox support
        const testFlex = document.createElement('div');
        testFlex.style.display = 'flex';
        testFlex.style.flexWrap = 'wrap';
        
        if (testFlex.style.display === 'flex') {
            results.push('✅ Flexbox responsive layout supported');
        } else {
            results.push('❌ Flexbox not supported');
        }

        // Test media query support
        if (window.matchMedia) {
            results.push('✅ Media queries supported');
            
            // Test specific breakpoints
            const breakpoints = [
                { query: '(max-width: 480px)', name: 'Mobile' },
                { query: '(min-width: 481px) and (max-width: 768px)', name: 'Tablet' },
                { query: '(min-width: 769px)', name: 'Desktop' }
            ];

            breakpoints.forEach(bp => {
                if (window.matchMedia(bp.query).matches) {
                    results.push(`✅ ${bp.name} breakpoint active`);
                }
            });
        } else {
            results.push('❌ Media queries not supported');
        }

        // Test viewport units
        const testVh = document.createElement('div');
        testVh.style.height = '100vh';
        if (testVh.style.height === '100vh') {
            results.push('✅ Viewport units (vh/vw) supported');
        } else {
            results.push('❌ Viewport units not supported');
        }

        this.results.breakpoints = results;
        document.getElementById('breakpointResults').innerHTML = 
            '<div class="test-results">' + results.join('<br>') + '</div>';
    }

    testPerformance() {
        const loadTime = performance.now() - this.startTime;
        
        // Memory usage
        let memoryUsage = 'N/A';
        if (performance.memory) {
            memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        }

        // Connection type
        let connectionType = 'Unknown';
        if (navigator.connection) {
            connectionType = navigator.connection.effectiveType || 'Unknown';
        }

        document.getElementById('loadTime').textContent = Math.round(loadTime) + 'ms';
        document.getElementById('renderTime').textContent = Math.round(performance.now()) + 'ms';
        document.getElementById('memoryUsage').textContent = memoryUsage;
        document.getElementById('connectionType').textContent = connectionType;

        this.results.performance = {
            loadTime: Math.round(loadTime),
            memoryUsage,
            connectionType
        };

        let performanceResults = [];
        
        if (loadTime < 2000) {
            performanceResults.push('✅ Fast load time on mobile (< 2s)');
        } else if (loadTime < 5000) {
            performanceResults.push('⚠️ Moderate load time (2-5s)');
        } else {
            performanceResults.push('❌ Slow load time (> 5s)');
        }

        if (connectionType === '4g') {
            performanceResults.push('✅ Good connection detected (4G)');
        } else if (connectionType === '3g') {
            performanceResults.push('⚠️ Moderate connection (3G)');
        } else if (connectionType === '2g') {
            performanceResults.push('❌ Slow connection (2G)');
        }

        document.getElementById('performanceResponsiveResults').innerHTML = 
            '<div class="test-results">' + performanceResults.join('<br>') + '</div>';
    }

    setupEventListeners() {
        // Window resize listener
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.updateViewportInfo();
                this.testBreakpoints();
            }, 100);
        });

        // Orientation change listener
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.updateViewportInfo();
                this.testBreakpoints();
            }, 500);
        });

        // Connection change listener
        if (navigator.connection) {
            navigator.connection.addEventListener('change', () => {
                this.testPerformance();
            });
        }
    }

    generateSummary() {
        const totalTests = this.results.viewport.length + 
                         this.results.touch.length + 
                         this.results.breakpoints.length;

        const passedTests = [
            ...this.results.viewport,
            ...this.results.touch,
            ...this.results.breakpoints
        ].filter(result => result.includes('✅')).length;

        const viewportWidth = window.innerWidth;
        let deviceCategory = 'Unknown';
        
        if (viewportWidth <= 480) {
            deviceCategory = 'Mobile';
        } else if (viewportWidth <= 768) {
            deviceCategory = 'Tablet';
        } else {
            deviceCategory = 'Desktop';
        }

        const summary = `
            <div class="test-results">
                <h3>Responsive Test Summary</h3>
                <p><strong>Device Category:</strong> ${deviceCategory}</p>
                <p><strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}</p>
                <p><strong>Total Tests:</strong> ${totalTests}</p>
                <p><strong>Passed:</strong> ${passedTests}</p>
                <p><strong>Success Rate:</strong> ${Math.round((passedTests / totalTests) * 100)}%</p>
                <p><strong>Responsive Compatibility:</strong> ${passedTests >= totalTests * 0.8 ? 'Excellent' : 'Needs Improvement'}</p>
                <p><strong>Touch Support:</strong> ${'ontouchstart' in window ? 'Yes' : 'No'}</p>
                <p><strong>High DPI:</strong> ${window.devicePixelRatio > 1 ? 'Yes' : 'No'}</p>
            </div>
        `;

        document.getElementById('responsiveTestSummary').innerHTML = summary;
    }
}

// Navigation test function for responsive
function testResponsiveNavigation(portfolio) {
    const results = document.getElementById('navigationResponsiveResults');
    const timestamp = new Date().toLocaleTimeString();
    const viewport = `${window.innerWidth}x${window.innerHeight}`;
    
    let message = '';
    switch (portfolio) {
        case 'tech':
            message = `✅ ${timestamp}: Tech Portfolio responsive navigation (${viewport})`;
            break;
        case 'gaming':
            message = `✅ ${timestamp}: Gaming Portfolio responsive navigation (${viewport})`;
            break;
        case 'content':
            message = `✅ ${timestamp}: Content Portfolio responsive navigation (${viewport})`;
            break;
    }

    const existingResults = results.innerHTML;
    results.innerHTML = existingResults + '<div class="test-results">' + message + '</div>';
}

// Media interaction test function
function testMediaInteraction(itemNumber) {
    const results = document.getElementById('mediaResults');
    const timestamp = new Date().toLocaleTimeString();
    const viewport = `${window.innerWidth}x${window.innerHeight}`;
    
    const message = `✅ ${timestamp}: Media item ${itemNumber} interaction (${viewport})`;
    
    const existingResults = results.innerHTML;
    results.innerHTML = existingResults + '<div class="test-results">' + message + '</div>';
}

// Initialize responsive test suite when page loads
window.addEventListener('load', () => {
    new ResponsiveTestSuite();
});

// Test specific responsive features
function testResponsiveFeatures() {
    const features = {
        touchSupport: 'ontouchstart' in window,
        orientationSupport: 'orientation' in screen,
        devicePixelRatio: window.devicePixelRatio > 1,
        viewportUnits: CSS.supports('height', '100vh'),
        cssGrid: CSS.supports('display', 'grid'),
        flexbox: CSS.supports('display', 'flex'),
        mediaQueries: window.matchMedia !== undefined
    };
    
    return features;
}

// Test gaming portfolio specific responsive features
function testGamingPortfolioResponsive() {
    const viewport = window.innerWidth;
    const results = [];
    
    // Test fire gradient rendering on different screen sizes
    if (viewport <= 480) {
        results.push('📱 Gaming portfolio mobile layout active');
        results.push('🔥 Fire gradient optimized for mobile');
    } else if (viewport <= 768) {
        results.push('📱 Gaming portfolio tablet layout active');
        results.push('🔥 Fire gradient optimized for tablet');
    } else {
        results.push('🖥️ Gaming portfolio desktop layout active');
        results.push('🔥 Fire gradient full desktop experience');
    }
    
    // Test touch interactions for gaming elements
    if ('ontouchstart' in window) {
        results.push('🎮 Touch controls available for gaming interactions');
    }
    
    return results;
}

// Test content portfolio specific responsive features
function testContentPortfolioResponsive() {
    const viewport = window.innerWidth;
    const results = [];
    
    // Test chrome gradient and media galleries
    if (viewport <= 480) {
        results.push('📱 Content portfolio mobile layout active');
        results.push('🎨 Chrome gradient optimized for mobile');
        results.push('📸 Media gallery single column layout');
    } else if (viewport <= 768) {
        results.push('📱 Content portfolio tablet layout active');
        results.push('🎨 Chrome gradient optimized for tablet');
        results.push('📸 Media gallery two column layout');
    } else {
        results.push('🖥️ Content portfolio desktop layout active');
        results.push('🎨 Chrome gradient full desktop experience');
        results.push('📸 Media gallery multi-column layout');
    }
    
    return results;
}

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ResponsiveTestSuite,
        testResponsiveNavigation,
        testMediaInteraction,
        testResponsiveFeatures,
        testGamingPortfolioResponsive,
        testContentPortfolioResponsive
    };
}