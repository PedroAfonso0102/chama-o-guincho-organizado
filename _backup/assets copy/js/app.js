/**
 * @fileoverview Main application entry point (Bundle Entry).
 * Imports styles, core logic, and initializes the application state.
 */
import '../css/input.css';
import { initNavigation, initScrollAnimation, Carousel, UI } from './modules/ui.js';
import { initForms } from './modules/forms.js';
import { initPriceCalculator } from './modules/calculator.js';
import { initCoverageMap } from './modules/map.js';
import { initModals } from './modules/modals.js';
import autoAnimate from '@formkit/auto-animate';

import { Layout } from './components/layout.js';
import { UI as Components } from './components/ui-components.js';

/**
 * Main application initializer.
 * Orchestrates the setup of layout, UI components, and all functional modules once the DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Context Detection
    // Determine the current active page to highlight navigation and adjust paths
    const path = window.location.pathname;
    const activePage = path.includes('servicos') ? 'services' : 'home';

    // 2. Structural Initialization (Layout)
    // Renders the global Header and Footer dynamically
    Layout.init({
        basePath: './',
        activePage: activePage
    });

    // 3. Content Initialization (Components)
    // Renders dynamic content areas like Services Grid, Features, and Testimonials
    Components.init({
        basePath: './'
    });

    // 4. Core UI Behaviors
    // Sets up navigation toggles, scroll animations, and sticky headers
    initNavigation();
    initScrollAnimation();

    // 5. Functional Modules Initialization
    initForms();            // Form handling and validations
    initPriceCalculator();  // Dynamic pricing logic
    initCoverageMap();      // Interactive map
    initModals();           // Modal system

    // 6. Interactive Widgets
    // Initialize Carousels/Slideshows
    document.querySelectorAll('.slideshow').forEach(el => new Carousel(el));

    // 7. Visual Effects
    // Initialize AutoAnimate for smooth list transitions (FAQ, Features)
    const faqContainer = document.querySelector('.faq__container');
    if (faqContainer) autoAnimate(faqContainer);

    const lists = document.querySelectorAll('.features__list, .services__grid');
    lists.forEach(list => autoAnimate(list));

    // 8. Animated Counters (Stats Bar)
    // Count up from 0 to data-target when element enters viewport
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target, 10);
                    if (isNaN(target)) return;
                    const duration = 2000;
                    const startTime = performance.now();
                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic for natural feel
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(target * eased).toLocaleString('pt-BR');
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    // 9. Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });

    // 10. Debug / Global Access
    // Expose UI helpers to the global scope for debugging or edge-case inline scripts
    window.UI = UI;
});
