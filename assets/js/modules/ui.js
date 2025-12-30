// UI and Feedback logic
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

/**
 * Global UI utilities for user feedback and state management.
 */
export const UI = {
    /**
     * Toggles a button's loading state.
     * @param {HTMLButtonElement} btn - The button to update.
     * @param {boolean} loading - Whether to show the loading state.
     * @param {string} [loadingText] - Optional text to display while loading.
     */
    setButtonLoading(btn, loading, loadingText) {
        if (!btn) return;

        if (loading) {
            btn._originalText = btn.innerHTML;
            btn._originalDisabled = btn.disabled;
            btn.classList.add('loading'); // DaisyUI/Tailwind class
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
     * Toggles an input's loading/disabled state.
     * @param {HTMLInputElement} input - The input element.
     * @param {boolean} loading - Whether to disable/show loading.
     */
    setInputLoading(input, loading) {
        if (!input) return;

        if (loading) {
            input.classList.add('input-disabled'); // Tailwind style
            input.readOnly = true;
            // Maybe add a spinner icon sibling if structure allows
        } else {
            input.classList.remove('input-disabled');
            input.readOnly = false;
        }
    },

    /**
     * Displays a toast notification.
     * @param {string} message - The message text.
     * @param {string} [type='info'] - The type ('success', 'error', 'info').
     * @param {number} [duration=5000] - Duration in ms.
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
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: backgroundColor,
            stopOnFocus: true, // Prevents dismissing of toast on hover
        }).showToast();
    },

    /**
     * Renders skeleton loading states into a container.
     * @param {HTMLElement} container - The container element.
     * @param {number} [count=3] - Number of skeletons to render.
     * @param {string} [type='card'] - Type of skeleton (currently only 'card').
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
 * Elements with class .animate-on-scroll will receive the .visible class when in view.
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
 * A simple Carousel class for handling slideshows.
 * Supports autoplay, navigation buttons, and dots.
 */
export class Carousel {
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

    setup() {
        this.goTo(0);
        this.startAutoplay();

        // Control buttons
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

    goTo(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentIndex = (index < 0) ? this.totalSlides - 1 : (index >= this.totalSlides) ? 0 : index;
        this.track.style.transform = `translateX(${-this.currentIndex * 100}%)`;

        // Update dots
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

    startAutoplay() {
        this.stopAutoplay();
        // Only autoplay if it's the hero slideshow (no controls found in parent usually)
        if (this.element.classList.contains('slideshow--cases')) return;
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoplay() { clearInterval(this.autoplayInterval); }
}

/**
 * Initializes global navigation logic (mobile menu toggle, sticky header).
 */
export function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isHidden = navMenu.classList.contains('hidden');
            navMenu.classList.toggle('hidden');
            // Animate transition if desired
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
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
    });
}
