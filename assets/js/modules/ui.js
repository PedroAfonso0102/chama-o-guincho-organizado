// UI and Feedback logic
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const UI = {
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

// Carousel Logic
export class Carousel {
    constructor(element) {
        this.element = element;
        this.track = this.element.querySelector('.slideshow__track');
        this.slides = this.track ? Array.from(this.track.children) : [];
        if (!this.track || this.slides.length === 0) return;
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.setup();
    }

    setup() {
        this.goTo(0);
        this.startAutoplay();
        // Add events if needed (touch, click)
        // Since we are refactoring, we might use a library or keep this simple logic.
        // Keeping simple logic for now but adapting to potentially new class names if structure changes.
    }

    goTo(index) {
        this.currentIndex = (index < 0) ? this.totalSlides - 1 : (index >= this.totalSlides) ? 0 : index;
        this.track.style.transform = `translateX(${-this.currentIndex * 100}%)`;
    }

    next() { this.goTo(this.currentIndex + 1); }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.next(), 4000);
    }

    stopAutoplay() { clearInterval(this.autoplayInterval); }
}

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
