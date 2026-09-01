/**
 * Scroll Reveal Animations via Intersection Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // If reduced motion is enabled, we immediately show all elements
        // and exit early to avoid attaching observers.
        const elements = document.querySelectorAll('.reveal-up');
        elements.forEach(el => el.classList.add('active'));
        return;
    }

    const revealElements = document.querySelectorAll('.reveal-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Once revealed, unobserve to avoid animating again on scroll up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
