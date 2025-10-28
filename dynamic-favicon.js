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
        
        canvas.width = size;
        canvas.height = size;
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#1A1A2E');
        gradient.addColorStop(1, '#16213E');
        
        // Draw background circle
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2 - 1, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw border
        const borderGradient = ctx.createLinearGradient(0, 0, size, size);
        borderGradient.addColorStop(0, '#8309D5');
        borderGradient.addColorStop(1, '#09C1D5');
        
        ctx.strokeStyle = borderGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2 - 1, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draw text with selected font
        const font = this.fonts[this.currentFontIndex];
        ctx.fillStyle = borderGradient;
        ctx.font = `bold 14px ${font.fallback}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add glow effect
        ctx.shadowColor = '#8309D5';
        ctx.shadowBlur = 3;
        
        ctx.fillText('GD', size/2, size/2 + 1);
        
        // Convert to favicon
        const dataURL = canvas.toDataURL('image/png');
        this.updateFavicon(dataURL);
        
        console.log(`🎨 Dynamic favicon loaded with ${font.name} font`);
    }

    updateFavicon(dataURL) {
        // Remove existing favicon
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
            existingFavicon.remove();
        }
        
        // Add new dynamic favicon
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = dataURL;
        
        document.head.appendChild(favicon);
    }

    // Method to manually cycle through fonts (for testing)
    cycleFavicon() {
        this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
        this.generateFavicon();
    }
}

// Initialize dynamic favicon when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load Google Fonts for better rendering
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Exo+2:wght@800&family=Rajdhani:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Wait a bit for fonts to load, then generate favicon
    setTimeout(() => {
        window.dynamicFavicon = new DynamicFavicon();
    }, 500);
});

// Export for testing
window.DynamicFavicon = DynamicFavicon;