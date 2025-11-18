// Main JavaScript file for Chama o Guincho

// === CONFIG ===
/**
 * @fileoverview Arquivo de configuração para o site "Chama o Guincho"
 * Armazena constantes e configurações globais
 */
const CONFIG = {
    WHATSAPP_NUMBER: '5519993502969',
    PRICING: {
        ADICIONAL_FDS: 1.20, // +20%
        TIPO_VEICULO: {
            'leves': {
                base: 160.00,
                kmAdicional: 3.50
            },
            'utilitario': {
                base: 240.00,
                kmAdicional: 4.00
            },
            'moto_ate_250': {
                base: 160.00,
                kmAdicional: 3.50
            },
            'moto_acima_250': {
                base: 240.00,
                kmAdicional: 4.00
            },
            'bongo_hr_vans': {
                base: 350.00,
                kmAdicional: 4.00
            }
        }
    }
};

// === CAROUSEL ===
/**
 * @fileoverview Módulo de carrossel simples, modular e reutilizável.
 */
class Carousel {
    constructor(element) {
        this.element = element;
        this.track = this.element.querySelector('.slideshow__track');
        this.slides = this.track ? Array.from(this.track.children) : [];
        this.dotsContainer = this.element.querySelector('.slideshow__dots');
        this.prevBtn = this.element.querySelector('.slideshow__arrow--prev');
        this.nextBtn = this.element.querySelector('.slideshow__arrow--next');
        if (!this.track || this.slides.length === 0) return;
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.startX = 0;
        this.startY = 0;
        this.setup();
    }
    setup() {
        this.addEventListeners();
        this.updateDots();
        this.goTo(0);
        this.startAutoplay();
    }
    addEventListeners() {
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.dotsContainer) this.dotsContainer.addEventListener('click', (e) => this.handleDotClick(e));
        this.element.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.element.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        this.element.addEventListener('mouseenter', () => this.stopAutoplay());
        this.element.addEventListener('mouseleave', () => this.startAutoplay());
    }
    goTo(index) {
        this.currentIndex = (index < 0) ? this.totalSlides - 1 : (index >= this.totalSlides) ? 0 : index;
        this.track.style.transform = `translateX(${-this.currentIndex * 100}%)`;
        this.updateDots();
    }
    next() { this.goTo(this.currentIndex + 1); }
    prev() { this.goTo(this.currentIndex - 1); }
    handleDotClick(e) {
        const dot = e.target.closest('.slideshow__dot');
        if (dot && this.dotsContainer) {
            const index = Array.from(this.dotsContainer.children).indexOf(dot);
            if (index !== -1) this.goTo(index);
        }
    }
    updateDots() {
        if (!this.dotsContainer) return;
        Array.from(this.dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('slideshow__dot--active', i === this.currentIndex);
        });
    }
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.next(), 4000);
    }
    stopAutoplay() { clearInterval(this.autoplayInterval); }
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.stopAutoplay();
    }
    handleTouchEnd(e) {
        const diffX = this.startX - e.changedTouches[0].clientX;
        const diffY = Math.abs(this.startY - e.changedTouches[0].clientY);
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
            if (diffX > 0) this.next(); else this.prev();
        }
        this.startAutoplay();
    }
}
function initCarousel() {
    document.querySelectorAll('.slideshow').forEach(element => new Carousel(element));
}


// === COVERAGE MAP ===
function initCoverageMap() {
    const mapFrame = document.getElementById('coverage-map');
    const cityButtonsContainer = document.querySelector('.coverage__cities');
    if (!mapFrame || !cityButtonsContainer) return;

    const mapContainer = mapFrame.parentElement;
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    mapContainer.appendChild(loadingSpinner);

    mapFrame.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
    });

    cityButtonsContainer.addEventListener('click', function(e) {
        const button = e.target.closest('.coverage__city');
        if (!button) return;

        loadingSpinner.style.display = 'block';

        this.querySelectorAll('.coverage__city').forEach(btn => btn.classList.remove('coverage__city--active'));
        button.classList.add('coverage__city--active');
        const cityName = button.querySelector('span').textContent;
        if (cityName) {
            mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(cityName)}&hl=pt&z=12&amp&output=embed`;
        }
    });
    const campinasButton = document.getElementById('city-campinas');
    if (campinasButton) campinasButton.classList.add('coverage__city--active');
}

// === FORMS ===
function initForms() {
    initInputMasks();
    initLocationDetection();
    setupFormSubmission();
    setupSchedulingForm();
    setupFormTabNavigation();
}
function setupFormSubmission() {
    document.body.addEventListener('submit', function(e) {
        const form = e.target.closest('form');
        if (!form) return;
        e.preventDefault();
        if (validateForm(form)) {
            const title = getFormTitle(form);
            sendWhatsAppMessage(form, title);
            showNotification('Sua solicitação foi enviada! Abrindo o WhatsApp...', 'success');

            const formId = form.id.replace('-clone', '');
            if (formId === 'form-emergency-panic' || formId === 'emergency-form') {
                localStorage.setItem('emergencyRequestTime', Date.now().toString());
            }

            setTimeout(() => {
                form.reset();
                form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
                if (form.closest('.modal')) closeAllModals();
            }, 1500);
        } else {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}
function getFormTitle(form) {
    const modal = form.closest('.modal--visible');
    if (modal && modal.querySelector('.modal__title')) {
        return modal.querySelector('.modal__title').textContent;
    }
    const titles = {
        'emergency-form': 'Pedido de Emergência Urgente', 'form-reboque': 'Solicitação de Reboque',
        'form-agendamento': 'Agendamento de Transporte', 'form-transporte-cidades': 'Orçamento: Transporte para Outras Cidades',
        'form-oficinas': 'Orçamento: Leva e Traz para Oficinas', 'form-maquinas': 'Orçamento: Transporte de Pequenas Máquinas',
        'form-empresas': 'Contato: Soluções para Empresas', 'form-emergency-panic': 'Emergência - Preciso de Guincho AGORA'
    };
    return titles[form.id.replace('-clone', '')] || 'Solicitação de Serviço';
}
function sendWhatsAppMessage(form, title) {
    let message = `*${title.toUpperCase()}*\n\n`;
    new FormData(form).forEach((value, key) => {
        if (value && value.trim()) {
            const fieldName = form.querySelector(`[name="${key}"]`)?.previousElementSibling?.textContent || key;
            message += `*${fieldName.trim()}:*\n${value.trim()}\n\n`;
        }
    });
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}
function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('[required]').forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.add('is-valid');
        }
    });
    return isValid;
}
function initInputMasks() {
    document.body.addEventListener('input', e => {
        if (e.target.matches('input[type="tel"]')) {
            let v = e.target.value.replace(/\D/g, '');
            v = v.substring(0, 11);
            if (v.length > 2) {
                v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
            }
            if (v.length > 9) {
                v = `${v.substring(0, 9)}-${v.substring(9)}`;
            }
            e.target.value = v;
        }
    });
}
function initLocationDetection() {
    document.body.addEventListener('click', e => {
        const button = e.target.closest('.location-detect, #price-detect-origin, #panic-detect-location, #reboque-detect-location');
        if (button) {
            const wrapper = button.closest('.input-location-wrapper, .input-icon-wrapper, .location-group');
            const input = wrapper ? wrapper.querySelector('input[id*="location"], input[id*="origin"]') : null;
            if (input) {
                getCurrentLocation(input);
            }
        }
    });
}

function getCurrentLocation(input) {
    if (!navigator.geolocation) {
        showNotification('Geolocalização não é suportada pelo seu navegador.', 'error');
        return;
    }

    input.value = "Detectando...";
    input.disabled = true;

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    if (data && data.display_name) {
                        input.value = data.display_name;
                        showNotification('Localização encontrada!', 'success');
                    } else {
                        input.value = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
                        showNotification('Endereço não encontrado, usando coordenadas.', 'info');
                    }
                })
                .catch(() => {
                    showNotification('Erro ao buscar o endereço. Verifique sua conexão.', 'error');
                    input.value = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
                })
                .finally(() => {
                    input.disabled = false;
                });
        },
        error => {
            input.value = "";
            input.disabled = false;
            let message = 'Não foi possível obter sua localização.';
            if (error.code === error.PERMISSION_DENIED) {
                message = 'Você negou o acesso à localização.';
            }
            showNotification(message, 'error');
        }
    );
}
function setupSchedulingForm() {
    document.body.addEventListener('change', e => {
        const select = e.target.closest('#agendamento-periodo');
        if (select) {
            const form = select.closest('form');
            const specificTime = form.querySelector('#horario-especifico');
            if (specificTime) {
                specificTime.style.display = select.value === 'Horário específico' ? 'block' : 'none';
                form.querySelector('#agendamento-hora').required = select.value === 'Horário específico';
            }
        }
    });
}
function setupFormTabNavigation() {
    document.body.addEventListener('click', e => {
        const tab = e.target.closest('.option-tab');
        if (tab) {
            const tabContainer = tab.parentElement;
            const contentContainer = tab.closest('.modal__body');
            const targetId = tab.dataset.tab;
            tabContainer.querySelectorAll('.option-tab').forEach(t => t.classList.remove('option-tab--active'));
            tab.classList.add('option-tab--active');
            contentContainer.querySelectorAll('.step-content').forEach(c => c.classList.remove('step-content--active'));
            contentContainer.querySelector(`#${targetId}`).classList.add('step-content--active');
            const footer = tab.closest('.modal__content').querySelector('.modal__footer');
            if(footer) footer.style.display = targetId === 'tab-ligar' ? 'none' : 'flex';
        }
    });
}

// === MODALS ===
function initModals() {
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal]');
        if (trigger) {
            e.preventDefault();
            openModal(trigger.dataset.modal, trigger.dataset.title, trigger.dataset.formId);
        }
        if (e.target.closest('.modal__close, .modal-close') || e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
        const activeModal = document.querySelector('.modal.modal--visible');
        if (activeModal && e.key === 'Tab') trapTabInModal(e, activeModal);
    });
}
function trapTabInModal(e, modal) {
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { last.focus(); e.preventDefault(); } }
    else { if (document.activeElement === last) { first.focus(); e.preventDefault(); } }
}
function openModal(modalId, title, formId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (!modal) return;

    if (modalId === 'status') {
        const requestTime = localStorage.getItem('emergencyRequestTime');
        const form = modal.querySelector('#form-consulta-status');
        const simulatedResult = modal.querySelector('#status-result-simulated');

        if (requestTime) {
            const minutesSinceRequest = (Date.now() - parseInt(requestTime)) / 1000 / 60;
            if (minutesSinceRequest < 30) {
                if (form) form.style.display = 'none';
                if (simulatedResult) simulatedResult.style.display = 'block';
            } else {
                if (form) form.style.display = 'block';
                if (simulatedResult) simulatedResult.style.display = 'none';
            }
        } else {
            if (form) form.style.display = 'block';
            if (simulatedResult) simulatedResult.style.display = 'none';
        }
    }

    if (title) modal.querySelector('.modal__title').textContent = title;
    if (formId) {
        const formTemplate = document.getElementById(formId);
        const modalBody = modal.querySelector('.modal__body');
        if (formTemplate && modalBody) {
            modalBody.innerHTML = '';
            const formClone = formTemplate.cloneNode(true);
            formClone.id = `${formId}-clone`;
            modalBody.appendChild(formClone);
            modal.querySelector('#generic-modal-submit')?.setAttribute('form', formClone.id);
        }
    }
    closeAllModals(true);
    modal.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('input, select, textarea, button:not(.modal__close)')?.focus(), 100);
}
function closeAllModals(keepBodyOverflowHidden = false) {
    document.querySelectorAll('.modal.modal--visible').forEach(modal => {
        modal.classList.add('modal--closing');
        setTimeout(() => {
            modal.classList.remove('modal--visible', 'modal--closing');
            if (!keepBodyOverflowHidden && !document.querySelector('.modal.modal--visible')) {
                document.body.style.overflow = '';
            }
        }, 300);
    });
}

// === NAVIGATION ===
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle'), navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => toggleMobileMenu(navMenu, navToggle));
        document.addEventListener('click', e => {
            if (navMenu.classList.contains('nav__menu--active') && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                toggleMobileMenu(navMenu, navToggle, false);
            }
        });
        navMenu.addEventListener('click', e => {
            if (e.target.classList.contains('nav__link')) toggleMobileMenu(navMenu, navToggle, false);
        });
    }
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        const scrollTopBtn = document.getElementById('scrollTop');
        const scrolled = window.scrollY > 50;
        if(header) header.classList.toggle('header--scrolled', scrolled);
        if(scrollTopBtn) scrollTopBtn.classList.toggle('scroll-top--visible', window.scrollY > 300);
    }, { passive: true });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.hash !== '' && !this.dataset.modal) {
                e.preventDefault();
                document.querySelector(this.hash)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    document.getElementById('scrollTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
function toggleMobileMenu(menu, toggle, force) {
    const show = force !== undefined ? force : !menu.classList.contains('nav__menu--active');
    menu.classList.toggle('nav__menu--active', show);
    toggle.setAttribute('aria-expanded', show);
    toggle.querySelector('i').classList.toggle('fa-bars', !show);
    toggle.querySelector('i').classList.toggle('fa-xmark', show);
    document.body.style.overflow = show ? 'hidden' : '';
}

// === PRICE CALCULATOR ===
function initPriceCalculator() {
    const estimator = document.getElementById('price-estimator');
    if (!estimator) return;

    const originInput = document.getElementById('price-origin');
    const destinationInput = document.getElementById('price-destination');
    const distanceInput = document.getElementById('price-distance');
    const vehicleSelect = document.getElementById('price-vehicle');
    const priceOutput = estimator.querySelector('.price-estimator__price');
    const requestButton = estimator.querySelector('.price-estimator__result .btn');

    const calculate = () => calculatePrice(distanceInput, vehicleSelect, priceOutput);
    const update = () => updateDistance(originInput, destinationInput, distanceInput, calculate);

    [originInput, destinationInput].forEach(el => el.addEventListener('blur', update));

    [distanceInput, vehicleSelect].forEach(el => el.addEventListener('input', calculate));

    if (requestButton) {
        requestButton.addEventListener('click', () => {
            const vehicleText = vehicleSelect.selectedOptions[0].text;
            const distance = distanceInput.value;
            const price = priceOutput.textContent;
            const origin = originInput.value.trim() || 'N/A';
            const destination = destinationInput.value.trim() || 'N/A';

            const msg = `Olá, fiz a simulação no site.\n\n*De:* ${origin}\n*Para:* ${destination}\n*Distância est:* ${distance}km\n*Veículo:* ${vehicleText}\n*Valor estimado:* ${price}\n\nPodem confirmar?`;

            window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    calculate();
}

async function updateDistance(originInput, destinationInput, distanceInput, callback) {
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    if (origin.length < 3 || destination.length < 3) {
        distanceInput.value = 0;
        callback();
        return;
    }

    try {
        const [originCoords, destCoords] = await Promise.all([
            getCoordinates(origin),
            getCoordinates(destination)
        ]);

        if (!originCoords || !destCoords) {
            showNotification('Não foi possível encontrar um ou ambos os endereços.', 'error');
            return;
        }

        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`;
        const response = await fetch(osrmUrl);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distanceInKm = (data.routes[0].distance / 1000).toFixed(0);
            distanceInput.value = distanceInKm;
            showNotification(`Distância calculada: ${distanceInKm} km`, 'success');
        } else {
            showNotification('Não foi possível calcular a rota. Verifique os endereços.', 'error');
        }
    } catch (error) {
        console.error('Erro ao calcular distância:', error);
        showNotification('Ocorreu um erro ao conectar com o serviço de rotas.', 'error');
    } finally {
        if (callback) callback();
    }
}

async function getCoordinates(address) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=br`;
    try {
        const response = await fetch(nominatimUrl);
        const data = await response.json();
        if (data && data.length > 0) {
            return { lat: data[0].lat, lon: data[0].lon };
        }
        return null;
    } catch (error) {
        console.error('Erro na geocodificação:', error);
        return null;
    }
}

function calculatePrice(distanceInput, vehicleSelect, priceOutput) {
    let distance = parseInt(distanceInput.value, 10) || 0;
    if (distance < 0) distance = 0;

    const vehicleType = vehicleSelect.value;
    const vehicleInfo = CONFIG.PRICING.TIPO_VEICULO[vehicleType];

    if (!vehicleInfo) {
        priceOutput.textContent = 'R$ 0,00';
        return;
    }

    let total = vehicleInfo.base;

    if (distance > 40) {
        total += (distance - 40) * vehicleInfo.kmAdicional;
    }

    const now = new Date();
    const day = now.getDay(); // 0 = Domingo

    const isWeekend = day === 0;

    if (isWeekend) {
        total *= CONFIG.PRICING.ADICIONAL_FDS;
    }

    priceOutput.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// === UI EFFECTS ===
let notificationTimeout;
function initUiEffects() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (elementsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elementsToAnimate.forEach(el => observer.observe(el));
    }
    document.querySelector('.notification__close')?.addEventListener('click', () => {
        clearTimeout(notificationTimeout);
        hideNotification();
    });

    // Sticky bar logic
    const stickyBar = document.getElementById('emergency-sticky');
    const closeButton = document.getElementById('emergency-sticky-close');

    if (stickyBar && closeButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                stickyBar.classList.add('show');
            } else {
                stickyBar.classList.remove('show');
            }
        });

        closeButton.addEventListener('click', () => {
            stickyBar.classList.remove('show');
        });
    }
}
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    clearTimeout(notificationTimeout);
    notification.querySelector('.notification__message').textContent = message;
    notification.className = `notification notification--${type}`;
    const icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    notification.querySelector('.notification__icon').className = `notification__icon fa-solid ${icons[type] || icons.info}`;
    notification.classList.add('notification--visible');
    if (duration > 0) {
        notificationTimeout = setTimeout(hideNotification, duration);
    }
}
function hideNotification() {
    document.getElementById('notification')?.classList.remove('notification--visible');
}


// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCarousel();
    initModals();
    initForms();
    initPriceCalculator();
    initCoverageMap();
    initUiEffects();
});
