
import { UI } from './ui.js';
import autoAnimate from '@formkit/auto-animate';

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

    // Re-initialize forms or interactions inside modal if needed
    // dispatch event or call initForms() again restricted to modal scope if necessary

    modal.classList.add('modal-open');
    document.body.classList.add('overflow-hidden'); // Prevent background scrolling
}

function closeModal(modal) {
    modal.classList.remove('modal-open');
    document.body.classList.remove('overflow-hidden');

    // Optional: clear content after animation
    setTimeout(() => {
        const container = modal.querySelector('.modal-box .content-area');
        if (container) container.innerHTML = '';
    }, 300);
}
