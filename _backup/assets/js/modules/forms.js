/**
 * Forms Module.
 * Manages form interactions, validation, geolocation integration, and WhatsApp submission.
 */
import IMask from 'imask';
import { UI } from './ui.js';
import { fetchWithTimeout } from './utils.js';
import { GeoService } from '../services/geo.service.js';
import { WhatsAppService } from '../services/whatsapp.service.js';

/**
 * Initializes form-related functionality.
 * Sets up input masks, location detection, multi-step forms, and submission handling.
 */
export function initForms() {
    initInputMasks();
    initLocationDetection();
    setupFormSteps();
    setupFormSubmission();
}

/**
 * Applies input masks (e.g., phone number) to inputs within a given scope.
 * Uses IMask library.
 *
 * @param {HTMLElement|Document} scope - The DOM element to search for inputs. Defaults to document.
 */
export function initInputMasks(scope = document) {
    const phoneInputs = scope.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '(00) 00000-0000'
        });
    });
}

/**
 * Initializes location detection functionality for inputs with the .location-detect class.
 * Uses Event Delegation.
 */
function initLocationDetection() {
    document.body.addEventListener('click', e => {
        const button = e.target.closest('.location-detect');
        if (button) {
            animateButton(button);
            const wrapper = button.parentElement;
            const input = wrapper.querySelector('input');
            if (input) {
                handleLocationRequest(input);
            }
        }
    });
}

/**
 * Adds a visual feedback animation to the clicked button.
 * @param {HTMLElement} button - The button to animate.
 */
function animateButton(button) {
    button.classList.remove('animating');
    void button.offsetWidth; // force reflow
    button.classList.add('animating');
    button.addEventListener('animationend', () => {
        button.classList.remove('animating');
    }, { once: true });
}

/**
 * Handles the logic for retrieving and setting the current location via Geolocation API.
 * Updates the input with the resolved address or coordinates.
 *
 * @param {HTMLInputElement} input - The input element to populate.
 */
function handleLocationRequest(input) {
    if (!navigator.geolocation) {
        UI.showNotification('Seu navegador não permite localização automática.', 'error');
        return;
    }

    input.value = "";
    input.placeholder = "Detectando...";
    UI.setInputLoading(input, true);

    navigator.geolocation.getCurrentPosition(
        async position => {
            const { latitude, longitude } = position.coords;
            try {
                const address = await GeoService.getAddressFromCoords(latitude, longitude);
                input.value = address;
                UI.showNotification('Localização encontrada!', 'success');
            } catch (error) {
                // Fallback to coordinates if reverse geocoding fails
                input.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                UI.showNotification('Endereço não encontrado, usando coordenadas.', 'info');
            } finally {
                UI.setInputLoading(input, false);
            }
        },
        error => {
            UI.setInputLoading(input, false);
            UI.showNotification('Não conseguimos acessar sua localização. Digite o endereço.', 'error');
        }
    );
}

/**
 * Sets up logic for multi-step forms (specifically the #emergency-form).
 * Handles visibility toggling between steps.
 */
function setupFormSteps() {
    const form = document.getElementById('emergency-form');
    if (!form) return;

    const step1 = form.querySelector('#form-step-1');
    const step2 = form.querySelector('#form-step-2');
    const btnNext = form.querySelector('#btn-next-step');
    const btnPrev = form.querySelector('#btn-prev-step');

    if (!step1 || !step2 || !btnNext) return;

    // Next Step Logic
    btnNext.addEventListener('click', () => {
        const location = form.querySelector('#emergency-location');
        const vehicle = form.querySelector('#emergency-vehicle');

        // Basic validation before proceeding
        if (!location.value) { location.reportValidity(); return; }
        if (!vehicle.value) { vehicle.reportValidity(); return; }

        toggleStep(step1, step2, true);
    });

    // Previous Step Logic
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            toggleStep(step2, step1, false);
        });
    }
}

/**
 * Toggles visibility between two form steps.
 *
 * @param {HTMLElement} hideStep - The step to hide.
 * @param {HTMLElement} showStep - The step to show.
 * @param {boolean} forward - Direction of navigation (true = next, false = prev).
 */
function toggleStep(hideStep, showStep, forward) {
    hideStep.classList.add('hidden');
    showStep.classList.remove('hidden');

    // Manage disabled state for validation purposes
    showStep.querySelectorAll('input').forEach(input => input.disabled = false);
    if (forward) {
        // Note: We don't disable hidden inputs here to ensure they are included in FormData
    }
}

/**
 * Handles form submissions globally.
 * Intercepts submit events, gathers data, generates a WhatsApp link, and redirects the user.
 */
function setupFormSubmission() {
    document.body.addEventListener('submit', function (e) {
        const form = e.target.closest('form');
        if (!form) return;

        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        UI.setButtonLoading(submitBtn, true, 'Iniciando...');

        // Gather Data
        let title = "Solicitação de Orçamento";
        const extraData = {};

        // Custom logic based on form ID
        if (form.id === 'emergency-form') {
            title = "Emergência 24h";
        } else if (form.id === 'price-estimator-form') {
            title = "Orçamento via Simulador";
            const priceDisplay = document.getElementById('price-estimate-display');
            if (priceDisplay) {
                extraData["Valor Estimado"] = priceDisplay.textContent;
            }
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const combinedData = { ...data, ...extraData };

        const whatsappUrl = WhatsAppService.generateUrl(title, combinedData);

        // Reset UI state
        UI.setButtonLoading(submitBtn, false);

        // Security: Control window opener to prevent malicious redirects
        const win = window.open(whatsappUrl, '_blank');

        if (!win || win.closed || typeof win.closed == 'undefined') {
            // Fallback for pop-up blockers: standard redirection
            window.location.href = whatsappUrl;
        } else {
            win.opener = null;
        }

        // Show success modal to user (in case they come back to the tab)
        handleSuccessModal(whatsappUrl);
        form.reset();
        resetEmergencyFormSteps(form);
    });
}

/**
 * Displays the success modal with a link to reopen WhatsApp.
 * @param {string} url - The WhatsApp URL.
 */
function handleSuccessModal(url) {
    const modalSuccess = document.getElementById('modal-success');
    if (modalSuccess) {
        const waBtn = modalSuccess.querySelector('#success-modal-whatsapp-btn');
        if (waBtn) waBtn.href = url;
        modalSuccess.classList.add('modal-open');
    }
}

/**
 * Resets the multi-step emergency form to its initial state.
 * @param {HTMLFormElement} form - The form element.
 */
function resetEmergencyFormSteps(form) {
    if (form.id === 'emergency-form') {
        const step1 = form.querySelector('#form-step-1');
        const step2 = form.querySelector('#form-step-2');
        if (step1 && step2) {
            step1.classList.remove('hidden');
            step2.classList.add('hidden');
        }
    }
}
