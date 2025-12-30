import IMask from 'imask';
import { CONFIG } from './config.js';
import { UI } from './ui.js';
import { fetchWithTimeout } from './utils.js';

export function initForms() {
    initInputMasks();
    initLocationDetection();
    setupFormSteps();
    setupFormSubmission();
}

function initInputMasks() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '(00) 00000-0000'
        });
    });
}

function initLocationDetection() {
    document.body.addEventListener('click', e => {
        const button = e.target.closest('.location-detect');
        if (button) {
            // Trigger animation
            button.classList.remove('animating');
            void button.offsetWidth; // force reflow
            button.classList.add('animating');
            button.addEventListener('animationend', () => {
                button.classList.remove('animating');
            }, { once: true });

            const wrapper = button.parentElement;
            const input = wrapper.querySelector('input');
            if (input) {
                getCurrentLocation(input);
            }
        }
    });
}

function getCurrentLocation(input) {
    if (!navigator.geolocation) {
        UI.showNotification('Geolocalização não suportada', 'error');
        return;
    }

    input.value = "";
    input.placeholder = "Detectando...";
    UI.setInputLoading(input, true);

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            fetchWithTimeout(url)
                .then(res => res.json())
                .then(data => {
                    if (data && data.display_name) {
                        input.value = data.display_name;
                        UI.showNotification('Localização encontrada!', 'success');
                    } else {
                        input.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                    }
                })
                .catch(() => {
                    input.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                    UI.showNotification('Endereço não encontrado, usando coordenadas.', 'info');
                })
                .finally(() => {
                    UI.setInputLoading(input, false);
                });
        },
        error => {
            UI.setInputLoading(input, false);
            UI.showNotification('Erro ao obter localização.', 'error');
        }
    );
}

function setupFormSteps() {
    const form = document.getElementById('emergency-form');
    if (!form) return;

    const step1 = form.querySelector('#form-step-1');
    const step2 = form.querySelector('#form-step-2');
    const btnNext = form.querySelector('#btn-next-step');
    const btnPrev = form.querySelector('#btn-prev-step');

    if (!step1 || !step2 || !btnNext) return;

    btnNext.addEventListener('click', () => {
        // Basic validation for Step 1
        const location = form.querySelector('#emergency-location');
        const vehicle = form.querySelector('#emergency-vehicle');

        if (!location.value) {
            location.reportValidity();
            return;
        }
        if (!vehicle.value) {
            vehicle.reportValidity();
            return;
        }

        // Transition to Step 2
        step1.classList.add('hidden');
        step2.classList.remove('hidden');

        // Enable Step 2 fields
        step2.querySelectorAll('input').forEach(input => input.disabled = false);
    });

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
            // Disable Step 2 fields to avoid submitting them if not visible (though they are required)
            step2.querySelectorAll('input').forEach(input => input.disabled = true);
        });
    }
}

function setupFormSubmission() {
    document.body.addEventListener('submit', function (e) {
        const form = e.target.closest('form');
        if (!form) return;

        e.preventDefault();

        // Validation logic
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        UI.setButtonLoading(submitBtn, true, 'Iniciando...');

        let title = "Solicitação de Orçamento";
        let extraData = {};

        if (form.id === 'emergency-form') {
            title = "Emergência 24h";
        } else if (form.id === 'price-estimator-form') {
            title = "Orçamento via Simulador";
            const priceDisplay = document.getElementById('price-estimate-display');
            if (priceDisplay) {
                extraData["Valor Estimado"] = priceDisplay.textContent;
            }
        }

        const whatsappUrl = generateWhatsAppUrl(form, title, extraData);

        setTimeout(() => {
            UI.setButtonLoading(submitBtn, false);
            window.open(whatsappUrl, '_blank');

            // Redirect to success or show success state
            const modalSuccess = document.getElementById('modal-success');
            if (modalSuccess) {
                const waBtn = modalSuccess.querySelector('#success-modal-whatsapp-btn');
                if (waBtn) waBtn.href = whatsappUrl;
                modalSuccess.classList.add('modal-open');
            }

            form.reset();
            // Reset steps if it's the emergency form
            if (form.id === 'emergency-form') {
                const step1 = form.querySelector('#form-step-1');
                const step2 = form.querySelector('#form-step-2');
                if (step1 && step2) {
                    step1.classList.remove('hidden');
                    step2.classList.add('hidden');
                }
            }
        }, 800);
    });
}

function generateWhatsAppUrl(form, title, extraData = {}) {
    let message = `*${title.toUpperCase()}*\n\n`;

    // Form data
    new FormData(form).forEach((value, key) => {
        if (value && value.trim()) {
            message += `*${key}:*\n${value.trim()}\n\n`;
        }
    });

    // Extra data (like calculated price)
    Object.entries(extraData).forEach(([key, value]) => {
        if (value) {
            message += `*${key}:*\n${value}\n\n`;
        }
    });

    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
