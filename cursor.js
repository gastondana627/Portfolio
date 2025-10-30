// Custom Cosmic Cursor
document.addEventListener('DOMContentLoaded', () => {
    // Check if device supports hover (desktop)
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (!isDesktop) {
        document.body.style.cursor = 'auto';
        return; // Exit if mobile/touch device
    }

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'custom-cursor-trail';
    document.body.appendChild(cursorTrail);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse with slight delay
        cursorX += (mouseX - cursorX) * 0.6;  // Changed from 0.3
        cursorY += (mouseY - cursorY) * 0.6;  // Changed from 0.3

        // Trail follows with more delay
        trailX += (mouseX - trailX) * 0.4;   // Changed from 0.15
        trailY += (mouseY - trailY) * 0.4;   // Changed from 0.15

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(animateCursor);
    }

    
    animateCursor();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .button, [role="button"], .project, .skill-enhanced, .mentorship-card, .carousel-btn, .featured-project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorTrail.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorTrail.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '1';
    });

    // Optional: Add sparkle particles on click
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 6; i++) {
            createSparkle(e.clientX, e.clientY, i);  // ✅ FIXED: Added , i
        }
    });

    function createSparkle(x, y, i) {  // ✅ FIXED: Added , i parameter
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.background = 'linear-gradient(135deg, #8309D5, #09C1D5)';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9997';
        sparkle.style.boxShadow = '0 0 8px rgba(131, 9, 213, 0.8)';
        
        const angle = (Math.PI * 2 * i) / 6;  // ✅ Now i is defined!
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(sparkle);
        
        let opacity = 1;
        let posX = 0;
        let posY = 0;
        
        function animateSparkle() {
            opacity -= 0.02;
            posX += vx;
            posY += vy;
            
            sparkle.style.opacity = opacity;
            sparkle.style.transform = `translate(${posX}px, ${posY}px)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animateSparkle);
            } else {
                sparkle.remove();
            }
        }
        
        animateSparkle();
    }
});