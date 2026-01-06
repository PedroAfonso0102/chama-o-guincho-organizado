/**
 * UI Module.
 * Provides utility functions for user interface feedback, state management, and interaction.
 * Includes helpers for loading states, notifications, skeletons, carousels, and navigation.
 */
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

/**
 * Global UI utilities object.
 */
export const UI = {
    /**
     * Toggles a button's visual loading state.
     * Prevents multiple submissions by disabling the button.
     *
     * @param {HTMLButtonElement} btn - The button element to update.
     * @param {boolean} loading - True to show loading spinner, false to reset.
     * @param {string} [loadingText] - Optional text to display while loading (e.g., "Sending...").
     */
    setButtonLoading(btn, loading, loadingText) {
        if (!btn) return;

        if (loading) {
            btn._originalText = btn.innerHTML;
            btn._originalDisabled = btn.disabled;
            btn.classList.add('loading'); // Class for styling (e.g., via Tailwind/daisyUI)
            btn.disabled = true;
            if (loadingText) {
                btn.innerHTML = `<span class="loading loading-spinner"></span> ${loadingText}`;
            }
        } else {
            btn.classList.remove('loading');
            btn.disabled = btn._originalDisabled || false;
            if (btn._originalText) {
                btn.innerHTML = btn._originalText;
            }
        }
    },

    /**
     * Toggles an input's disabled/readonly state to prevent editing during processes.
     *
     * @param {HTMLInputElement} input - The input element.
     * @param {boolean} loading - True to disable, false to enable.
     */
    setInputLoading(input, loading) {
        if (!input) return;

        if (loading) {
            input.classList.add('input-disabled'); // Custom utility class
            input.readOnly = true;
        } else {
            input.classList.remove('input-disabled');
            input.readOnly = false;
        }
    },

    /**
     * Displays a toast notification using Toastify.js.
     *
     * @param {string} message - The message text to display.
     * @param {string} [type='info'] - The notification type: 'success', 'error', or 'info'.
     * @param {number} [duration=5000] - Time in milliseconds before auto-closing.
     */
    showNotification(message, type = 'info', duration = 5000) {
        let backgroundColor;
        switch (type) {
            case 'success': backgroundColor = "hsl(var(--success))"; break;
            case 'error': backgroundColor = "hsl(var(--destructive))"; break;
            default: backgroundColor = "hsl(var(--primary))";
        }

        Toastify({
            text: message,
            duration: duration,
            close: true,
            gravity: "top", // Position: top or bottom
            position: "right", // Position: left, center, right
            backgroundColor: backgroundColor,
            stopOnFocus: true, // Prevents dismissing on hover
        }).showToast();
    },

    /**
     * Renders skeleton loading placeholders into a container.
     * Useful for indicating content is loading asynchronously.
     *
     * @param {HTMLElement} container - The container element to inject skeletons into.
     * @param {number} [count=3] - Number of skeleton items to render.
     * @param {string} [type='card'] - Type of skeleton (currently only 'card' is supported).
     */
    renderSkeletons(container, count = 3, type = 'card') {
        if (!container) return;

        const skeletonCard = `
            <div class="card bg-base-100 shadow-xl animate-pulse">
                <div class="card-body">
                    <div class="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div class="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
            </div>
        `;

        container.innerHTML = Array(count).fill(skeletonCard).join('');
    }
};

/**
 * Initializes the intersection observer for scroll-triggered animations.
 * Elements with class .animate-on-scroll will receive the .visible class when they enter the viewport.
 */
export function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/**
 * A custom Carousel class for handling image slideshows.
 * Supports auto-play, manual navigation, and pagination dots.
 */
export class Carousel {
    /**
     * @param {HTMLElement} element - The root carousel element containing track and slides.
     */
    constructor(element) {
        this.element = element;
        this.track = this.element.querySelector('.slideshow__track');
        this.slides = this.track ? Array.from(this.track.children) : [];
        if (!this.track || this.slides.length === 0) return;

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.isAnimating = false;

        this.setup();
    }

    /**
     * Sets up event listeners and starts the carousel.
     */
    setup() {
        this.goTo(0);
        this.startAutoplay();

        // Control buttons (scoped to parent to find siblings)
        const prevBtn = this.element.parentElement.querySelector('.carousel-arrow--prev');
        const nextBtn = this.element.parentElement.querySelector('.carousel-arrow--next');
        const dots = this.element.parentElement.querySelectorAll('.carousel-dot');

        if (prevBtn) prevBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.prev();
            this.startAutoplay();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            this.stopAutoplay();
            this.next();
            this.startAutoplay();
        });

        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    this.stopAutoplay();
                    this.goTo(i);
                    this.startAutoplay();
                });
            });
        }
    }

    /**
     * Transitions the carousel to a specific slide index.
     * @param {number} index - The target slide index.
     */
    goTo(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Circular navigation logic
        this.currentIndex = (index < 0) ? this.totalSlides - 1 : (index >= this.totalSlides) ? 0 : index;

        // CSS Transform for sliding effect
        this.track.style.transform = `translateX(${-this.currentIndex * 100}%)`;

        // Update active state of dots
        const dots = this.element.parentElement.querySelectorAll('.carousel-dot');
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                if (i === this.currentIndex) {
                    dot.classList.add('carousel-dot--active', 'w-8');
                    dot.classList.remove('w-2', 'bg-border');
                    dot.classList.add('bg-primary');
                } else {
                    dot.classList.remove('carousel-dot--active', 'w-8');
                    dot.classList.add('w-2', 'bg-border');
                    dot.classList.remove('bg-primary');
                }
            });
        }

        setTimeout(() => {
            this.isAnimating = false;
        }, 700); // Matches transition duration
    }

    next() { this.goTo(this.currentIndex + 1); }
    prev() { this.goTo(this.currentIndex - 1); }

    /**
     * Starts the auto-play timer.
     */
    startAutoplay() {
        this.stopAutoplay();
        // Skip autoplay for specific carousel types (e.g., cases)
        if (this.element.classList.contains('slideshow--cases')) return;
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoplay() { clearInterval(this.autoplayInterval); }
}

/**
 * Initializes global navigation logic.
 * Handles mobile menu toggling and the sticky header effect on scroll.
 */
export function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isHidden = navMenu.classList.contains('hidden');
            navMenu.classList.toggle('hidden');
        });
    }

    // Header scroll effect (Change background/shadow on scroll)
    window.addEventListener('scroll', throttle(() => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-md', 'bg-white/95');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('shadow-md', 'bg-white/95');
                header.classList.add('bg-transparent');
            }
        }
    }, 100));
}

/**
 * Throttles a function to limit its execution rate.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The time limit in milliseconds.
 * @returns {Function} - The throttled function.
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
