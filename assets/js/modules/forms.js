import IMask from 'imask';
import { CONFIG } from './config.js';
import { UI } from './ui.js';
import { fetchWithTimeout } from './utils.js';

export function initForms() {
    initInputMasks();
    initLocationDetection();
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

function setupFormSubmission() {
    document.body.addEventListener('submit', function (e) {
        const form = e.target.closest('form');
        if (!form) return;
        e.preventDefault();

        // Validation logic can be enhanced here
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        UI.setButtonLoading(submitBtn, true, 'Enviando...');

        const title = "Solicitação de Serviço"; // Logic to get specific title
        const whatsappUrl = generateWhatsAppUrl(form, title);

        setTimeout(() => {
            UI.setButtonLoading(submitBtn, false);
            window.open(whatsappUrl, '_blank');
            form.reset();
            UI.showNotification('Solicitação preparada! Abra o WhatsApp para enviar.', 'success');
        }, 1000);
    });
}

function generateWhatsAppUrl(form, title) {
    let message = `*${title.toUpperCase()}*\n\n`;
    new FormData(form).forEach((value, key) => {
        if (value && value.trim()) {
            message += `*${key}:*\n${value.trim()}\n\n`;
        }
    });
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
