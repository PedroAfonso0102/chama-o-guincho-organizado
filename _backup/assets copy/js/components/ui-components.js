/**
 * @fileoverview Reusable UI Components data and renderer.
 * Centralizes the content and markup generation for dynamic UI sections like Services, Features, and Testimonials.
 * Makes it easy to update content without touching the HTML structure.
 */

// === DATA DEFINITIONS ===

/**
 * Data definitions for the Service Cards.
 * @type {Array<{icon: string, title: string, text: string, isHighlight?: boolean, action: object}>}
 */
const servicesData = [
    {
        icon: 'fa-solid fa-truck-fast',
        title: 'Resgate Emergencial',
        text: 'Pane mecânica ou colisão? Atendimento ágil para resolver seu problema. Disponibilidade prioritária em toda Campinas e RMC.',
        isHighlight: true,
        action: {
            type: 'whatsapp',
            text: 'PEDIR SOCORRO AGORA',
            link: 'https://wa.me/5519993502969?text=SOS%20-%20Preciso%20de%20um%20guincho%20de%20emergência%20agora!'
        }
    },
    {
        icon: 'fa-solid fa-map-location-dot',
        title: 'Logística Intermunicipal',
        text: 'Vai comprar ou vender um carro em outra cidade? Levamos seu veículo com seguro total, hora marcada e monitoramento.',
        action: {
            type: 'modal',
            text: 'Cotar Viagem',
            modalId: 'generic',
            modalTitle: 'Orçamento: Viagem Intermunicipal',
            formId: 'form-transporte-cidades'
        }
    },
    {
        icon: 'fa-solid fa-calendar-check',
        title: 'Transporte Programado',
        text: 'Transporte para revisões, eventos ou transferências. Reserve o horário e evite esperas desnecessárias.',
        action: {
            type: 'modal',
            text: 'Agendar Horário',
            modalId: 'generic',
            modalTitle: 'Agendar Transporte Técnico',
            formId: 'form-agendamento'
        }
    },
    {
        icon: 'fa-solid fa-screwdriver-wrench',
        title: 'Gestão de Oficina',
        text: 'Buscamos o veículo do seu cliente e entregamos pronto. Parceria técnica que valoriza o seu pós-venda.',
        action: {
            type: 'modal',
            text: 'Seja um Parceiro',
            modalId: 'generic',
            modalTitle: 'Parceria: Leva e Traz para Oficinas',
            formId: 'form-oficinas'
        }
    },
    {
        icon: 'fa-solid fa-dolly',
        title: 'Maquinário Leve',
        text: 'Solução para empilhadeiras e mini-carregadeiras. Plataforma com capacidade de carga e fixação técnica certificada.',
        action: {
            type: 'modal',
            text: 'Orçamento Especial',
            modalId: 'generic',
            modalTitle: 'Orçamento: Transporte de Equipamentos',
            formId: 'form-maquinas'
        }
    },
    {
        icon: 'fa-solid fa-building-shield',
        title: 'Frotas Corporativas',
        text: 'Atendimento dedicado para empresas. Faturamento mensal, gestão de pátio e relatórios digitais de cada remoção.',
        action: {
            type: 'modal',
            text: 'Falar com Consultor',
            modalId: 'generic',
            modalTitle: 'Contato: Soluções Corporativas',
            formId: 'form-empresas'
        }
    }
];

const featuresData = [
    {
        icon: 'fa-solid fa-user-shield',
        title: 'Direto com o Especialista',
        text: 'Sem call centers robóticos ou espera. Você fala diretamente com quem resolve o seu problema.'
    },
    {
        icon: 'fa-solid fa-file-invoice-dollar',
        title: 'Orçamento Garantido',
        text: 'Preço fechado via WhatsApp antes da saída. Sem taxas surpresas ou "adicionais" na hora H.'
    },
    {
        icon: 'fa-solid fa-truck-ramp-box',
        title: 'Tecnologia de Ponta',
        text: 'Caminhões monitorados e equipados com cintas de roda (zero contato com a lataria) e patins.'
    },
    {
        icon: 'fa-solid fa-route',
        title: 'Conhecimento Local',
        text: 'Conhecemos cada atalho da RMC. Fugimos do trânsito pesado para chegar mais rápido até você.'
    },
    {
        icon: 'fa-solid fa-car-on',
        title: 'Versatilidade Técnica',
        text: 'De carros esportivos baixos a utilitários pesados. Temos o equipamento certo para o seu caso.'
    },
    {
        icon: 'fa-solid fa-clock',
        title: 'Disponibilidade Real',
        text: 'Madrugada, feriado ou chuva. Se você chamar, nós vamos. Simples assim.'
    }
];

const coverageCitiesData = [
    { id: 'city-campinas', name: 'Campinas' },
    { id: 'city-indaiatuba', name: 'Indaiatuba' },
    { id: 'city-hortolandia', name: 'Hortolândia' },
    { id: 'city-sumare', name: 'Sumaré' },
    { id: 'city-americana', name: 'Americana' },
    { id: 'city-paulinia', name: 'Paulínia' },
    { id: 'city-valinhos', name: 'Valinhos' },
    { id: 'city-vinhedo', name: 'Vinhedo' },
    { id: 'city-jaguariuna', name: 'Jaguariúna' },
    { id: 'city-monte-mor', name: 'Monte Mor' },
    { id: 'city-nova-odessa', name: 'Nova Odessa' },
    { id: 'city-limeira', name: 'Limeira' },
    { id: 'city-sao-paulo', name: 'São Paulo' },
    { id: 'city-mogi-mirim', name: 'Mogi Mirim' },
    { id: 'city-piracicaba', name: 'Piracicaba' }
];

const testimonialsData = [
    {
        title: 'Logística de Ativos de Alto Valor',
        text: 'Procedimentos técnicos dedicados a veículos de luxo e superesportivos. Utilização de guincho plataforma com ângulo de ataque reduzido.',
        tag: 'Transporte Premium',
        image: 'assets/images/case-01.jpg',
        alt: 'Transporte técnico de veículo importado com fixação em 4 pontos para máxima segurança.'
    },
    {
        title: 'Operações de Frota Corporativa',
        text: 'Parceria estratégica para locadoras e gestores de frota. Execução de logística de pátio e remanejamento de veículos em escala.',
        tag: 'Soluções B2B',
        image: 'assets/images/case-02.jpg',
        alt: 'Logística de pátio para frotas corporativas com sistema de rastreamento em tempo real.'
    },
    {
        title: 'Logística Governamental e Tática',
        text: 'Capacidade técnica para transporte de viaturas policiais e veículos de serviço público em conformidade com exigências estatais.',
        tag: 'Veículos Oficiais',
        image: 'assets/images/case-03.jpg',
        alt: 'Atendimento técnico especializado para órgãos públicos e frotas táticas.'
    },
    {
        title: 'Remoção de Sinistros Graves',
        text: 'Especialização no transporte de veículos com danos estruturais severos. Alta capacidade de tração para veículos travados.',
        tag: 'Alta Complexidade',
        image: 'assets/images/case-06.jpg',
        alt: 'Resgate de SUV blindado com uso de patins técnicos para evitar danos à transmissão.'
    },
    {
        title: 'Veículos de Prestígio',
        text: 'Transporte de alta precisão para automóveis importados. Amarração técnica (cintas de roda) sem contato com a lataria.',
        tag: 'Transporte VIP',
        image: 'assets/images/case-05.jpg',
        alt: 'Transporte de superesportivo utilizando cintas de roda e ganchos emborrachados.'
    },
    {
        title: 'Logística de Carga Múltipla',
        text: 'Otimização de frete através de transporte combinado. Movimentação simultânea de automóveis e motocicletas.',
        tag: 'Logística Integrada',
        image: 'assets/images/case-04.jpg',
        alt: 'Transporte compartilhado de motocicletas e carros otimizando custo logístico.'
    }
];

// === RENDER FUNCTIONS ===

let config = { basePath: '' };

/**
 * Renders the services grid into the specified container.
 * @param {string} containerId - The selector for the container element.
 */
function renderServices(containerId) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.warn(`UI Component: Container ${containerId} not found.`);
        return;
    }

    container.innerHTML = servicesData.map((service, index) => {
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
function renderFeatures(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    container.innerHTML = featuresData.map((feature, index) => `
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
function renderCoverageCities(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    container.innerHTML = coverageCitiesData.map(city => `
        <button class="btn btn-outline btn-sm rounded-full animate-on-scroll hover:bg-primary hover:text-white hover:border-primary transition-all">
            ${city.name}
        </button>
    `).join('');
}

/**
 * Renders testimonials/case studies into the specified container.
 * @param {string} containerId - The selector for the container element.
 */
function renderTestimonials(containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    const chunkSize = 3;
    const slides = [];
    for (let i = 0; i < testimonialsData.length; i += chunkSize) {
        slides.push(testimonialsData.slice(i, i + chunkSize));
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
                        <div class="card-body p-6 relative flex flex-col flex-grow">
                            <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">${item.title}</h3>
                            <p class="text-muted-foreground text-sm leading-relaxed mb-4">${item.text}</p>
                            <div class="mt-auto pt-4 border-t border-border flex items-center gap-3">
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
 * Initializes the UI components by rendering them into their default containers.
 * @param {object} options - Configuration options (basePath).
 */
function init(options = {}) {
    config = { ...config, ...options };

    renderServices('.services__grid');
    renderFeatures('.features__list');
    renderCoverageCities('.coverage__cities');
    renderTestimonials('#cases-track');
}

export const UI = {
    init,
    renderServices,
    renderFeatures,
    renderCoverageCities,
    renderTestimonials
};
