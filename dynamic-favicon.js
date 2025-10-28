// Dynamic Favicon Generator - Rotates between 3 creative fonts
class DynamicFavicon {
    constructor() {
        this.fonts = [
            {
                name: 'Orbitron',
                style: 'font-family: "Orbitron", monospace; font-weight: 900; letter-spacing: 2px;',
                fallback: 'Arial Black, sans-serif'
            },
            {
                name: 'Exo2',
                style: 'font-family: "Exo 2", sans-serif; font-weight: 800; letter-spacing: 1px;',
                fallback: 'Arial Black, sans-serif'
            },
            {
                name: 'Rajdhani',
                style: 'font-family: "Rajdhani", sans-serif; font-weight: 700; letter-spacing: 3px;',
                fallback: 'Arial Black, sans-serif'
            }
        ];
        
        this.currentFontIndex = this.selectFont();
        this.generateFavicon();
    }

    selectFont() {
        // Use a combination of factors to pseudo-randomly select font
        const factors = [
            new Date().getDate(),
            new Date().getHours(),
            window.location.href.length,
            navigator.userAgent.length % 7
        ];
        
        const seed = factors.reduce((acc, val) => acc + val, 0);
        return seed % this.fonts.length;
    }

    generateFavicon() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 32;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        canvas.width = size;
        canvas.height = size;
        
        // Clear canvas
        ctx.clearRect(0, 0, size, size);
        
        // Safari prefers simpler rendering
        if (isSafari) {
            // Solid background for Safari
            ctx.fillStyle = '#1A1A2E';
            ctx.fillRect(0, 0, size, size);
            
            // Simple border
            ctx.strokeStyle = '#8309D5';
            ctx.lineWidth = 2;
            ctx.strokeRect(2, 2, size-4, size-4);
            
            // Text without shadow for Safari
            const font = this.fonts[this.currentFontIndex];
            ctx.fillStyle = '#09C1D5';
            ctx.font = `bold 14px ${font.fallback}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('GD', size/2, size/2);
            
        } else {
            // Enhanced rendering for other browsers
            // Draw solid background circle
            ctx.fillStyle = '#1A1A2E';
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2 - 1, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw border circle
            ctx.strokeStyle = '#8309D5';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2 - 1, 0, 2 * Math.PI);
            ctx.stroke();
            
            // Draw text with selected font
            const font = this.fonts[this.currentFontIndex];
            ctx.fillStyle = '#09C1D5';
            ctx.font = `bold 16px ${font.fallback}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Add subtle shadow
            ctx.shadowColor = '#8309D5';
            ctx.shadowBlur = 1;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            ctx.fillText('GD', size/2, size/2);
        }
        
        // Convert to favicon
        const dataURL = canvas.toDataURL('image/png');
        this.updateFavicon(dataURL);
        
        const font = this.fonts[this.currentFontIndex];
        console.log(`🎨 Dynamic favicon loaded with ${font.name} font ${isSafari ? '(Safari mode)' : ''}`);
        
        // Debug: log the data URL to see if it's generating
        console.log('Favicon data URL:', dataURL.substring(0, 50) + '...');
    }

    updateFavicon(dataURL) {
        // Remove all existing favicons
        const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
        existingFavicons.forEach(favicon => favicon.remove());
        
        const timestamp = Date.now();
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        // Primary favicon
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = dataURL + '?v=' + timestamp;
        document.head.appendChild(favicon);
        
        // Safari-specific fixes
        if (isSafari) {
            // Safari prefers shortcut icon
            const shortcutIcon = document.createElement('link');
            shortcutIcon.rel = 'shortcut icon';
            shortcutIcon.type = 'image/png';
            shortcutIcon.href = dataURL + '?v=' + timestamp;
            document.head.appendChild(shortcutIcon);
            
            // Safari also likes apple-touch-icon
            const appleIcon = document.createElement('link');
            appleIcon.rel = 'apple-touch-icon';
            appleIcon.href = dataURL + '?v=' + timestamp;
            document.head.appendChild(appleIcon);
            
            // Force Safari to refresh by manipulating the href
            setTimeout(() => {
                favicon.href = dataURL + '?v=' + (timestamp + 1);
                if (shortcutIcon) shortcutIcon.href = dataURL + '?v=' + (timestamp + 1);
            }, 100);
            
            console.log('🦁 Safari-specific favicon handling applied');
        } else {
            // Standard shortcut icon for other browsers
            const shortcutIcon = document.createElement('link');
            shortcutIcon.rel = 'shortcut icon';
            shortcutIcon.type = 'image/png';
            shortcutIcon.href = dataURL + '?v=' + timestamp;
            document.head.appendChild(shortcutIcon);
        }
        
        console.log('✅ Favicon updated in DOM');
    }

    // Method to manually cycle through fonts (for testing)
    cycleFavicon() {
        this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
        this.generateFavicon();
    }
}

// Initialize dynamic favicon when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing dynamic favicon system...');
    
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Load Google Fonts for better rendering
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Exo+2:wght@800&family=Rajdhani:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Safari needs a longer delay
    const delay = isSafari ? 1000 : 0;
    
    setTimeout(() => {
        try {
            window.dynamicFavicon = new DynamicFavicon();
            console.log(`✅ Dynamic favicon initialized successfully ${isSafari ? '(Safari)' : ''}`);
            
            // Safari sometimes needs a second attempt
            if (isSafari) {
                setTimeout(() => {
                    window.dynamicFavicon.generateFavicon();
                    console.log('🦁 Safari favicon refresh attempt');
                }, 500);
            }
        } catch (error) {
            console.error('❌ Error initializing dynamic favicon:', error);
            // Fallback to a simple static favicon
            createFallbackFavicon();
        }
    }, delay);
});

// Fallback function if dynamic favicon fails
function createFallbackFavicon() {
    console.log('🔄 Creating fallback favicon...');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    
    // Simple purple circle with GD
    ctx.fillStyle = '#8309D5';
    ctx.beginPath();
    ctx.arc(16, 16, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GD', 16, 16);
    
    const dataURL = canvas.toDataURL('image/png');
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = dataURL;
    document.head.appendChild(favicon);
    
    console.log('✅ Fallback favicon created');
}

// Safari-specific favicon refresh function
window.refreshSafariFavicon = function() {
    if (window.dynamicFavicon) {
        console.log('🦁 Forcing Safari favicon refresh...');
        window.dynamicFavicon.generateFavicon();
        
        // Try multiple approaches for Safari
        setTimeout(() => {
            const favicons = document.querySelectorAll('link[rel*="icon"]');
            favicons.forEach(favicon => {
                const href = favicon.href;
                favicon.href = '';
                setTimeout(() => favicon.href = href, 50);
            });
        }, 100);
    }
};

// Export for testing
window.DynamicFavicon = DynamicFavicon;