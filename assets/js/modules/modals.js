import { UI } from './ui.js';
import { initInputMasks } from './forms.js';
import autoAnimate from '@formkit/auto-animate';

/**
 * Initializes modal interactions.
 * Sets up triggers, close handlers, and dynamic content injection.
 */
export function initModals() {
    const modal = document.getElementById('generic-modal');
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-box .content-area');
    const closeBtn = modal.querySelector('.modal-close');

    // Auto-animate modal content for smooth height changes
    autoAnimate(modalContent);

    // Open Modal Triggers
    document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.dataset.target; // ID of the template/hidden content
            const title = trigger.dataset.title;

            openModal(modal, modalContent, targetId, title);
        });
    });

    // Close Modal Events
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal));
    }

    // Modal Footer Submit Button Handler
    const submitBtn = modal.querySelector('#generic-modal-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const currentForm = modalContent.querySelector('form');
            if (currentForm) {
                // Manually trigger submit event so forms.js catches it
                currentForm.requestSubmit ? currentForm.requestSubmit() : currentForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        });
    }

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
            closeModal(modal);
        }
    });
}

/**
 * Opens a modal with specific content.
 *
 * @param {HTMLElement} modal - The modal element.
 * @param {HTMLElement} container - The container within the modal to inject content.
 * @param {string} contentId - The ID of the template or element to clone content from.
 * @param {string} title - The title to set for the modal.
 */
function openModal(modal, container, contentId, title) {
    const contentTemplate = document.getElementById(contentId);
    if (!contentTemplate) {
        console.error(`Modal content template #${contentId} not found.`);
        return;
    }

    // Set Title
    const titleEl = modal.querySelector('.modal-title');
    if (titleEl && title) titleEl.textContent = title;

    // Clear previous content
    container.innerHTML = '';

    // Clone Content (support <template> or hidden <div>)
    let clone;
    if (contentTemplate.tagName === 'TEMPLATE') {
        clone = contentTemplate.content.cloneNode(true);
    } else {
        clone = contentTemplate.cloneNode(true);
        clone.classList.remove('hidden');
        clone.removeAttribute('id'); // Avoid duplicate IDs in DOM
    }

    container.appendChild(clone);

    // Re-initialize masks for dynamic content
    initInputMasks(container);

    modal.classList.add('modal-open');
    document.body.classList.add('overflow-hidden'); // Prevent background scrolling
}

/**
 * Closes the modal.
 * @param {HTMLElement} modal - The modal element.
 */
function closeModal(modal) {
    modal.classList.remove('modal-open');
    document.body.classList.remove('overflow-hidden');

    // Optional: clear content after animation
    setTimeout(() => {
        const container = modal.querySelector('.modal-box .content-area');
        if (container) container.innerHTML = '';
    }, 300);
}
