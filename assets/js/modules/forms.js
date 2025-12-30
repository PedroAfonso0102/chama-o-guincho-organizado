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
 * @param {HTMLElement|Document} scope - The DOM element to search for inputs.
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
 * Initializes location detection functionality for inputs.
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

function animateButton(button) {
    button.classList.remove('animating');
    void button.offsetWidth; // force reflow
    button.classList.add('animating');
    button.addEventListener('animationend', () => {
        button.classList.remove('animating');
    }, { once: true });
}

/**
 * Handles the logic for retrieving and setting the current location.
 * @param {HTMLInputElement} input
 */
function handleLocationRequest(input) {
    if (!navigator.geolocation) {
        UI.showNotification('Geolocalização não suportada', 'error');
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
                input.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                UI.showNotification('Endereço não encontrado, usando coordenadas.', 'info');
            } finally {
                UI.setInputLoading(input, false);
            }
        },
        error => {
            UI.setInputLoading(input, false);
            UI.showNotification('Erro ao obter localização.', 'error');
        }
    );
}

/**
 * Sets up logic for multi-step forms (e.g., emergency form).
 */
function setupFormSteps() {
    const form = document.getElementById('emergency-form');
    if (!form) return;

    const step1 = form.querySelector('#form-step-1');
    const step2 = form.querySelector('#form-step-2');
    const btnNext = form.querySelector('#btn-next-step');
    const btnPrev = form.querySelector('#btn-prev-step');

    if (!step1 || !step2 || !btnNext) return;

    btnNext.addEventListener('click', () => {
        const location = form.querySelector('#emergency-location');
        const vehicle = form.querySelector('#emergency-vehicle');

        if (!location.value) { location.reportValidity(); return; }
        if (!vehicle.value) { vehicle.reportValidity(); return; }

        toggleStep(step1, step2, true);
    });

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            toggleStep(step2, step1, false);
        });
    }
}

function toggleStep(hideStep, showStep, forward) {
    hideStep.classList.add('hidden');
    showStep.classList.remove('hidden');

    // Manage disabled state for validation purposes
    showStep.querySelectorAll('input').forEach(input => input.disabled = false);
    if (forward) {
       // hideStep.querySelectorAll('input').forEach(input => input.disabled = true);
       // Careful: disabling inputs might remove them from FormData.
       // Better to just hide visually.
    }
}

/**
 * Handles form submissions globally.
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

        setTimeout(() => {
            UI.setButtonLoading(submitBtn, false);

            // Security: Control window opener
            const win = window.open(whatsappUrl, '_blank');
            if (win) win.opener = null;

            handleSuccessModal(whatsappUrl);
            form.reset();
            resetEmergencyFormSteps(form);

        }, 800);
    });
}

function handleSuccessModal(url) {
    const modalSuccess = document.getElementById('modal-success');
    if (modalSuccess) {
        const waBtn = modalSuccess.querySelector('#success-modal-whatsapp-btn');
        if (waBtn) waBtn.href = url;
        modalSuccess.classList.add('modal-open');
    }
}

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
