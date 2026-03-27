/**
 * @fileoverview Reusable UI Components data and renderer (Mock Destroyer Integrated).
 * Fetches data defensively from the API module, handling loading, empty, and error states natively.
 */

import { API } from '../modules/api.js';

let config = { basePath: '' };

// === STATE TEMPLATES ===
const STATES = {
    error: (msg) => `
        <div class="col-span-full p-8 text-center text-error bg-error/10 rounded-2xl border border-error/20 my-4 w-full flex flex-col items-center justify-center">
            <i class="fa-solid fa-triangle-exclamation text-4xl mb-3 opacity-80"></i>
            <p class="font-bold text-lg">${msg}</p>
            <p class="text-sm opacity-70 mt-1">Nossos engenheiros já foram notificados.</p>
            <button class="btn btn-outline btn-sm mt-4 hover:bg-error hover:text-white" onclick="location.reload()"><i class="fa-solid fa-rotate-right"></i> Tentar Novamente</button>
        </div>
    `,
    empty: (msg) => `
        <div class="col-span-full p-8 text-center text-muted-foreground bg-base-200/50 rounded-2xl w-full flex flex-col items-center justify-center my-4 border border-border border-dashed">
            <i class="fa-solid fa-inbox text-4xl mb-3 opacity-50"></i>
            <p class="font-medium">${msg}</p>
        </div>
    `
};

// === RENDER FUNCTIONS ===

/**
 * Renders the services grid into the specified container.
 * @param {string} containerId - The selector for the container element.
 */
async function renderServices(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    // 1. Loading State (Skeleton)
    container.innerHTML = Array(6).fill(0).map(() => `
        <div class="flex flex-col p-8 rounded-3xl glass-panel animate-pulse bg-white/5 border border-white/5">
            <div class="w-16 h-16 rounded-2xl bg-base-300 mb-8 opacity-50"></div>
            <div class="h-6 bg-base-300 rounded mb-4 w-3/4 opacity-50"></div>
            <div class="h-4 bg-base-300 rounded mb-2 opacity-50"></div>
            <div class="h-4 bg-base-300 rounded mb-10 w-5/6 opacity-50"></div>
            <div class="h-10 bg-base-300 rounded w-full mt-auto opacity-50"></div>
        </div>
    `).join('');

    // 2. Fetch Data
    const data = await API.getServices();

    // 3. Error / Empty check
    if (data === null) {
        container.innerHTML = STATES.error('Não foi possível carregar os serviços no momento.');
        return;
    }
    if (data.length === 0) {
        container.innerHTML = STATES.empty('Nenhum serviço disponível no momento.');
        return;
    }

    // 4. Render Actual Data
    container.innerHTML = data.map((service, index) => {
        const isEmergency = service.isHighlight;
        const actionBtn = service.action.type === 'whatsapp'
            ? `<a href="${service.action.link}" class="btn ${isEmergency ? 'btn-primary shadow-lg shadow-primary/20' : 'btn-outline'} btn-sm w-full gap-2 mt-auto hover:-translate-y-0.5 transition-all">
                <i class="fa-brands fa-whatsapp"></i> ${service.action.text}
               </a>`
            : `<button class="btn btn-outline btn-sm w-full mt-auto hover:-translate-y-0.5 transition-all" 
                data-toggle="modal" data-target="generic-modal" 
                data-title="${service.action.modalTitle}" 
                data-form-id="${service.action.formId}">
                ${service.action.text}
               </button>`;

        return `
            <div class="group relative flex flex-col p-8 rounded-3xl glass-panel hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 animate-on-scroll reveal-up stagger-${(index % 3) + 1}">
                <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8">
                    <i class="${service.icon}"></i>
                </div>
                <div class="flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">${service.title}</h3>
                    <p class="text-muted-foreground text-base leading-relaxed mb-10">${service.text}</p>
                </div>
                ${actionBtn}
                ${isEmergency ? '<div class="absolute top-6 right-6"><span class="badge badge-success gap-2 py-4 px-4 text-white border-none shadow-lg shadow-success/20 animate-pulse">24H ONLINE</span></div>' : ''}
            </div>
        `;
    }).join('');
}

/**
 * Renders the features list into the specified container.
 * @param {string} containerId - The selector for the container element.
 */
async function renderFeatures(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    // Loading Skeletons
    container.innerHTML = Array(6).fill(0).map(() => `
        <div class="flex gap-5 items-start p-8 rounded-3xl glass-panel animate-pulse bg-white/5 border border-white/5">
            <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-base-300 opacity-50"></div>
            <div class="flex-grow">
                <div class="h-5 bg-base-300 rounded mb-3 w-1/2 opacity-50"></div>
                <div class="h-3 bg-base-300 rounded mb-2 opacity-50 w-full"></div>
                <div class="h-3 bg-base-300 rounded opacity-50 w-3/4"></div>
            </div>
        </div>
    `).join('');

    const data = await API.getFeatures();

    if (data === null) {
        container.innerHTML = STATES.error('Erro de conexão com o painel de vantagens.');
        return;
    }
    if (data.length === 0) return; // Silent hide or use STATES.empty if preferred

    container.innerHTML = data.map((feature, index) => `
        <div class="flex gap-5 items-start p-8 rounded-3xl glass-panel hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out border border-white/5 group animate-on-scroll reveal-up stagger-${(index % 3) + 1}">
            <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <i class="${feature.icon}"></i>
            </div>
            <div>
                <h3 class="font-bold text-xl mb-3 group-hover:text-primary transition-colors">${feature.title}</h3>
                <p class="text-muted-foreground text-sm leading-relaxed">${feature.text}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Renders the list of covered cities as buttons.
 * @param {string} containerId - The selector for the container element.
 */
async function renderCoverageCities(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    // Small pill skeletons
    container.innerHTML = Array(8).fill(0).map(() => `
        <div class="h-8 w-24 bg-base-300 rounded-full animate-pulse opacity-50"></div>
    `).join('');

    const data = await API.getCoverageCities();

    if (data === null || data.length === 0) {
        container.innerHTML = '<span class="text-muted-foreground text-sm w-full text-center">Áreas de cobertura indisponíveis no momento.</span>';
        return;
    }

    container.innerHTML = data.map(city => `
        <button class="btn btn-outline btn-sm rounded-full animate-on-scroll hover:bg-primary hover:text-white hover:border-primary transition-all">
            ${city.name}
        </button>
    `).join('');
}

/**
 * Renders testimonials/case studies into the specified container.
 * @param {string} containerId - The selector for the container element.
 */
async function renderTestimonials(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    // Testimonial Skeleton Slide
    container.innerHTML = `
        <div class="slideshow__slide w-full flex-shrink-0 animate-pulse">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 testimonials__list">
                ${Array(3).fill(0).map(() => `
                <div class="card card--case-study bg-card border border-border h-[350px] relative overflow-hidden">
                    <div class="absolute inset-0 bg-base-300 opacity-30"></div>
                    <div class="absolute bottom-6 left-6 right-6">
                        <div class="h-5 bg-base-300 rounded mb-2 w-3/4 opacity-50"></div>
                        <div class="h-3 bg-base-300 rounded mb-2 w-full opacity-50"></div>
                        <div class="h-3 bg-base-300 rounded mb-4 w-5/6 opacity-50"></div>
                        <div class="h-4 w-20 bg-base-300 rounded-full opacity-50"></div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    `;

    const data = await API.getTestimonials();

    if (data === null) {
        container.innerHTML = STATES.error('Não foi possível carregar os últimos resgates.');
        return;
    }
    if (data.length === 0) {
        container.innerHTML = STATES.empty('Nenhum estudo de caso cadastrado.');
        return;
    }

    const chunkSize = 3;
    const slides = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        slides.push(data.slice(i, i + chunkSize));
    }

    container.innerHTML = slides.map((chunk, slideIndex) => `
        <div class="slideshow__slide w-full flex-shrink-0">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 testimonials__list">
                ${chunk.map((item, index) => {
        return `
                    <div class="card card--case-study bg-card border border-border overflow-hidden h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-in-out group animate-on-scroll stagger-${(index % 3) + 1}">
                        <div class="card__image-wrapper">
                            <div class="absolute inset-0">
                                <img src="${config.basePath}${item.image}" alt="${item.alt}" width="400" height="250" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                            </div>
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div class="card-body p-6 relative flex flex-col flex-grow items-start text-left">
                            <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors relative z-10 w-full">${item.title}</h3>
                            <p class="text-muted-foreground text-sm leading-relaxed mb-4 relative z-10 w-full">${item.text}</p>
                            <div class="mt-auto pt-4 border-t border-border flex items-center gap-3 relative z-10 w-full">
                                <span class="badge badge-primary/10 text-primary border-none font-bold text-xs uppercase tracking-wider">${item.tag}</span>
                            </div>
                        </div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>
    `).join('');
}

/**
 * Initializes the UI components by fetching and rendering them.
 * Resolves when all critical UI fetching is done.
 * @param {object} options - Configuration options (basePath).
 */
async function init(options = {}) {
    config = { ...config, ...options };

    // Run all fetches in parallel for performance
    await Promise.all([
        renderServices('.services__grid'),
        renderFeatures('.features__list'),
        renderCoverageCities('.coverage__cities'),
        renderTestimonials('#cases-track')
    ]);
}

export const UI = {
    init,
    renderServices,
    renderFeatures,
    renderCoverageCities,
    renderTestimonials
};
