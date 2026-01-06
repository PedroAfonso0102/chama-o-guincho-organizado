/**
 * Modals Module.
 * Manages the opening, closing, and content injection for modals.
 * Supports dynamic content via <template> tags or hidden DOM elements.
 */
import { UI } from './ui.js';
import { initInputMasks } from './forms.js';
import autoAnimate from '@formkit/auto-animate';

/**
 * Initializes modal interactions.
 * Sets up global event listeners for triggers, close buttons, background clicks, and the ESC key.
 * Also configures the Generic Modal logic.
 */
export function initModals() {
    // 1. Generic Modal Specific Logic (Animation & Submit)
    const genericModal = document.getElementById('generic-modal');
    if (genericModal) {
        const modalContent = genericModal.querySelector('.modal-box .content-area');
        if (modalContent) autoAnimate(modalContent);

        // Submit Action (Specific to Generic Modal's external submit button)
        const submitBtn = genericModal.querySelector('#generic-modal-submit');
        if (submitBtn && modalContent) {
            submitBtn.addEventListener('click', () => {
                const currentForm = modalContent.querySelector('form');
                if (currentForm) {
                    // Trigger form submission programmatically
                    currentForm.requestSubmit ? currentForm.requestSubmit() : currentForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            });
        }
    }

    // 2. Global Event Delegation (Triggers, Closing & Background)
    // Uses delegation to handle static and dynamic elements robustly
    document.body.addEventListener('click', (e) => {
        const target = e.target;

        // A. Data Toggle Triggers
        const trigger = target.closest('[data-toggle="modal"]');
        if (trigger) {
            e.preventDefault();
            const targetId = trigger.dataset.target;
            const formId = trigger.dataset.formId;
            const title = trigger.dataset.title;

            // If target is generic-modal but we have a specific form, use the form as content
            const contentId = formId || targetId;

            const modal = document.getElementById(targetId) || document.getElementById('generic-modal');
            const content = modal?.querySelector('.modal-box .content-area');

            if (modal && content) {
                openModal(modal, content, contentId, title);
            }
            return;
        }

        // B. Close Button (.modal-close)
        const closeBtn = target.closest('.modal-close');
        if (closeBtn) {
            e.preventDefault();
            const modal = closeBtn.closest('.modal');
            if (modal) closeModal(modal);
            return;
        }

        // C. Click Outside (Background)
        // Checks if the click target is the modal container itself (overlay)
        if (target.classList.contains('modal')) {
            closeModal(target);
        }
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
 * Opens a modal and populates it with dynamic content.
 * Clones content from a template or hidden element into the modal's content area.
 *
 * @param {HTMLElement} modal - The modal DOM element.
 * @param {HTMLElement} container - The container within the modal where content will be injected.
 * @param {string} contentId - The ID of the template or DOM element to clone content from.
 * @param {string} title - The title to be displayed in the modal header.
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

    // Re-initialize masks for any new inputs in the modal
    initInputMasks(container);

    modal.classList.add('modal-open');
    document.body.classList.add('overflow-hidden'); // Prevent background scrolling
}

/**
 * Closes the specified modal.
 * Removes the open class and restores body scrolling.
 *
 * @param {HTMLElement} modal - The modal DOM element to close.
 */
function closeModal(modal) {
    modal.classList.remove('modal-open');
    document.body.classList.remove('overflow-hidden');

    // Optional: clear content after animation to reset state
    setTimeout(() => {
        const container = modal.querySelector('.modal-box .content-area');
        if (container) container.innerHTML = '';
    }, 300);
}
