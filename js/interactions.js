/**
 * Advanced Interactions: Custom Cursor & Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only initialize cursor on fine pointer devices (desktop)
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isDesktop && !prefersReducedMotion && cursorDot && cursorOutline) {
        
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth follow for outline using requestAnimationFrame
        function animateCursor() {
            // Easing factor (lower = slower)
            let easing = 0.15;
            
            outlineX += (mouseX - outlineX) * easing;
            outlineY += (mouseY - outlineY) * easing;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();

        // Hover states on interactables
        const interactables = document.querySelectorAll('a, button, .btn, .project-card, .nav-link');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // 2. Subtle 3D Tilt Effect on Cards (Project Card)
    if (isDesktop && !prefersReducedMotion) {
        const tiltCards = document.querySelectorAll('.tilt-effect');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate tilt angle (-5 to 5 degrees)
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
});
