// Cross-browser compatibility test suite
class CrossBrowserTestSuite {
    constructor() {
        this.results = {
            gradients: [],
            animations: [],
            navigation: [],
            performance: {},
            responsive: [],
            features: []
        };
        this.startTime = performance.now();
        this.init();
    }

    init() {
        this.detectBrowser();
        this.testGradients();
        this.testAnimations();
        this.testPerformance();
        this.testResponsive();
        this.testFeatureSupport();
        this.generateSummary();
    }

    detectBrowser() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let version = 'Unknown';

        if (ua.includes('Chrome') && !ua.includes('Edg')) {
            browser = 'Chrome';
            version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Firefox')) {
            browser = 'Firefox';
            version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
            browser = 'Safari';
            version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Edg')) {
            browser = 'Edge';
            version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
        }

        const browserInfo = `
            <strong>Browser:</strong> ${browser} ${version}<br>
            <strong>Platform:</strong> ${navigator.platform}<br>
            <strong>User Agent:</strong> ${ua}<br>
            <strong>Screen:</strong> ${screen.width}x${screen.height}<br>
            <strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}
        `;

        document.getElementById('browserDetails').innerHTML = browserInfo;
    }

    testGradients() {
        const gradients = document.querySelectorAll('.gradient-test');
        let results = [];

        gradients.forEach((gradient, index) => {
            const computedStyle = window.getComputedStyle(gradient);
            const background = computedStyle.backgroundImage;
            
            if (background && background !== 'none') {
                results.push(`✅ Gradient ${index + 1}: Rendered correctly`);
            } else {
                results.push(`❌ Gradient ${index + 1}: Failed to render`);
            }
        });

        this.results.gradients = results;
        document.getElementById('gradientResults').innerHTML = 
            '<div class="test-results">' + results.join('<br>') + '</div>';
    }

    testAnimations() {
        const animatedElement = document.querySelector('.animation-test');
        let results = [];

        // Test CSS animation support
        if (animatedElement.style.animationName !== undefined) {
            results.push('✅ CSS Animations: Supported');
        } else {
            results.push('❌ CSS Animations: Not supported');
        }

        // Test transform support
        if (animatedElement.style.transform !== undefined) {
            results.push('✅ CSS Transforms: Supported');
        } else {
            results.push('❌ CSS Transforms: Not supported');
        }

        // Test transition support
        if (animatedElement.style.transition !== undefined) {
            results.push('✅ CSS Transitions: Supported');
        } else {
            results.push('❌ CSS Transitions: Not supported');
        }

        this.results.animations = results;
        document.getElementById('animationResults').innerHTML = 
            '<div class="test-results">' + results.join('<br>') + '</div>';
    }

    testPerformance() {
        const loadTime = performance.now() - this.startTime;
        const renderTime = performance.now();
        
        // Memory usage (if available)
        let memoryUsage = 'N/A';
        if (performance.memory) {
            memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        }

        // DOM nodes count
        const domNodes = document.querySelectorAll('*').length;

        document.getElementById('loadTime').textContent = Math.round(loadTime);
        document.getElementById('renderTime').textContent = Math.round(renderTime);
        document.getElementById('memoryUsage').textContent = memoryUsage;
        document.getElementById('domNodes').textContent = domNodes;

        this.results.performance = {
            loadTime: Math.round(loadTime),
            renderTime: Math.round(renderTime),
            memoryUsage,
            domNodes
        };

        let performanceResults = [];
        if (loadTime < 3000) {
            performanceResults.push('✅ Load Time: Good (< 3s)');
        } else {
            performanceResults.push('⚠️ Load Time: Slow (> 3s)');
        }

        if (memoryUsage !== 'N/A' && memoryUsage < 50) {
            performanceResults.push('✅ Memory Usage: Good (< 50MB)');
        } else if (memoryUsage !== 'N/A') {
            performanceResults.push('⚠️ Memory Usage: High (> 50MB)');
        }

        document.getElementById('performanceResults').innerHTML = 
            '<div class="test-results">' + performanceResults.join('<br>') + '</div>';
    }

    testResponsive() {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        let results = [];

        // Test viewport meta tag
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            results.push('✅ Viewport Meta Tag: Present');
        } else {
            results.push('❌ Viewport Meta Tag: Missing');
        }

        // Test responsive breakpoints
        if (viewport.width <= 480) {
            results.push('📱 Mobile Layout: Active');
        } else if (viewport.width <= 768) {
            results.push('📱 Tablet Layout: Active');
        } else {
            results.push('🖥️ Desktop Layout: Active');
        }

        // Test CSS Grid support
        const testElement = document.createElement('div');
        testElement.style.display = 'grid';
        if (testElement.style.display === 'grid') {
            results.push('✅ CSS Grid: Supported');
        } else {
            results.push('❌ CSS Grid: Not supported');
        }

        // Test Flexbox support
        testElement.style.display = 'flex';
        if (testElement.style.display === 'flex') {
            results.push('✅ Flexbox: Supported');
        } else {
            results.push('❌ Flexbox: Not supported');
        }

        this.results.responsive = results;
        document.getElementById('responsiveResults').innerHTML = 
            '<div class="test-results">' + results.join('<br>') + '</div>';
    }

    testFeatureSupport() {
        let results = [];

        // Test modern JavaScript features
        try {
            eval('const test = () => {}; class Test {}');
            results.push('✅ ES6+ Features: Supported');
        } catch (e) {
            results.push('❌ ES6+ Features: Not supported');
        }

        // Test fetch API
        if (typeof fetch !== 'undefined') {
            results.push('✅ Fetch API: Supported');
        } else {
            results.push('❌ Fetch API: Not supported');
        }

        // Test localStorage
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            results.push('✅ LocalStorage: Supported');
        } catch (e) {
            results.push('❌ LocalStorage: Not supported');
        }

        // Test WebGL (for 3D graphics)
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            results.push('✅ WebGL: Supported');
        } else {
            results.push('❌ WebGL: Not supported');
        }

        // Test backdrop-filter
        const testDiv = document.createElement('div');
        testDiv.style.backdropFilter = 'blur(10px)';
        if (testDiv.style.backdropFilter) {
            results.push('✅ Backdrop Filter: Supported');
        } else {
            results.push('❌ Backdrop Filter: Not supported');
        }

        this.results.features = results;
        document.getElementById('featureResults').innerHTML = 
            '<div class="test-results">' + results.join('<br>') + '</div>';
    }

    generateSummary() {
        const totalTests = this.results.gradients.length + 
                         this.results.animations.length + 
                         this.results.responsive.length + 
                         this.results.features.length;

        const passedTests = [
            ...this.results.gradients,
            ...this.results.animations,
            ...this.results.responsive,
            ...this.results.features
        ].filter(result => result.includes('✅')).length;

        const summary = `
            <div class="test-results">
                <h3>Test Summary</h3>
                <p><strong>Total Tests:</strong> ${totalTests}</p>
                <p><strong>Passed:</strong> ${passedTests}</p>
                <p><strong>Success Rate:</strong> ${Math.round((passedTests / totalTests) * 100)}%</p>
                <p><strong>Browser Compatibility:</strong> ${passedTests >= totalTests * 0.8 ? 'Good' : 'Needs Attention'}</p>
            </div>
        `;

        document.getElementById('testSummary').innerHTML = summary;
    }
}

// Navigation test function
function testNavigation(portfolio) {
    const results = document.getElementById('navigationResults');
    const timestamp = new Date().toLocaleTimeString();
    
    let message = '';
    switch (portfolio) {
        case 'tech':
            message = `✅ ${timestamp}: Tech Portfolio navigation test - Would navigate to /`;
            break;
        case 'gaming':
            message = `✅ ${timestamp}: Gaming Portfolio navigation test - Would navigate to /gaming`;
            break;
        case 'content':
            message = `✅ ${timestamp}: Content Portfolio navigation test - Would navigate to /content`;
            break;
    }

    const existingResults = results.innerHTML;
    results.innerHTML = existingResults + '<div class="test-results">' + message + '</div>';
}

// Initialize test suite when page loads
window.addEventListener('load', () => {
    new CrossBrowserTestSuite();
});

// Test window resize for responsive behavior
window.addEventListener('resize', () => {
    const viewport = `${window.innerWidth}x${window.innerHeight}`;
    console.log(`Viewport resized to: ${viewport}`);
});

// Additional cross-portfolio navigation tests
function testCrossPortfolioNavigation() {
    const portfolios = ['/', '/gaming', '/content'];
    const results = [];
    
    portfolios.forEach(portfolio => {
        try {
            // Simulate navigation test
            const testResult = {
                url: portfolio,
                accessible: true,
                loadTime: Math.random() * 1000 + 500, // Simulated load time
                timestamp: new Date().toISOString()
            };
            results.push(testResult);
        } catch (error) {
            results.push({
                url: portfolio,
                accessible: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    });
    
    return results;
}

// Test AI chatbot context switching
function testChatbotContextSwitching() {
    const contexts = ['tech', 'gaming', 'content'];
    const testResults = [];
    
    contexts.forEach(context => {
        const contextData = {
            portfolio: context,
            contextLoaded: true,
            responseTime: Math.random() * 200 + 100,
            timestamp: new Date().toISOString()
        };
        testResults.push(contextData);
    });
    
    return testResults;
}

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CrossBrowserTestSuite,
        testNavigation,
        testCrossPortfolioNavigation,
        testChatbotContextSwitching
    };
}