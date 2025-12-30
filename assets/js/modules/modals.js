import { UI } from './ui.js';
import { initInputMasks } from './forms.js';
import autoAnimate from '@formkit/auto-animate';

/**
 * Initializes modal interactions.
 * Sets up triggers, close handlers, and dynamic content injection.
 */
export function initModals() {
    // 1. Generic Modal Specific Logic (Triggers & Submit)
    const genericModal = document.getElementById('generic-modal');
    if (genericModal) {
        const modalContent = genericModal.querySelector('.modal-box .content-area');
        if (modalContent) autoAnimate(modalContent);

        // Bind data-toggle triggers
        document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.dataset.target;
                const title = trigger.dataset.title;
                openModal(genericModal, modalContent, targetId, title);
            });
        });

        // Submit Action
        const submitBtn = genericModal.querySelector('#generic-modal-submit');
        if (submitBtn && modalContent) {
            submitBtn.addEventListener('click', () => {
                const currentForm = modalContent.querySelector('form');
                if (currentForm) {
                    currentForm.requestSubmit ? currentForm.requestSubmit() : currentForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            });
        }
    }

    // 2. Global Modal Closing Logic (Handles generic-modal, modal-success, and any future modals)
    document.querySelectorAll('.modal').forEach(modal => {
        // Close Button (.modal-close)
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }

        // Click Outside (Background)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // 3. Global ESC Key Handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.modal-open');
            if (openModal) {
                closeModal(openModal);
            }
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
