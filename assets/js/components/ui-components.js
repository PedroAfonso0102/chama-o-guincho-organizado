/**
 * @fileoverview Reusable UI Components data and renderer
 */

const UI = (function() {

    let config = {
        basePath: ''
    };

    // === DATA DEFINITIONS ===

    const servicesData = [
        {
            icon: 'fa-solid fa-car-burst',
            title: 'Reboque de Emergência 24h',
            text: 'Veículo quebrou ou sofreu colisão? Atendemos em até 30 minutos em Campinas e região. Guincho plataforma para transporte seguro.',
            isHighlight: true,
            action: {
                type: 'whatsapp',
                text: 'CHAMAR NO WHATSAPP',
                link: 'https://wa.me/5519993502969?text=Olá!%20Preciso%20de%20um%20guincho%20de%20emergência.'
            }
        },
        {
            icon: 'fa-solid fa-route',
            title: 'Transporte Intermunicipal',
            text: 'Transporte de veículos para qualquer cidade da região com total segurança e preço transparente.',
            action: {
                type: 'modal',
                text: 'Solicitar Orçamento',
                modalId: 'generic',
                modalTitle: 'Orçamento: Transporte para Outras Cidades',
                formId: 'form-transporte-cidades'
            }
        },
        {
            icon: 'fa-solid fa-calendar-days',
            title: 'Agendamento de Transporte',
            text: 'Planeje o transporte do seu veículo para revisão, eventos ou outras necessidades. Agende com antecedência.',
            action: {
                type: 'modal',
                text: 'Agendar',
                modalId: 'generic',
                modalTitle: 'Agendar Transporte',
                formId: 'form-agendamento'
            }
        },
        {
            icon: 'fa-solid fa-screwdriver-wrench',
            title: 'Transporte para Oficinas',
            text: 'Serviço de coleta e entrega do seu veículo na oficina de sua confiança. Condições especiais para oficinas.',
            action: {
                type: 'modal',
                text: 'Solicitar Orçamento',
                modalId: 'generic',
                modalTitle: 'Orçamento: Leva e Traz para Oficinas',
                formId: 'form-oficinas'
            }
        },
        {
            icon: 'fa-solid fa-boxes-packing',
            title: 'Pequenas Máquinas',
            text: 'Transporte especializado de empilhadeiras, equipamentos e maquinários leves com equipamentos adequados.',
            action: {
                type: 'modal',
                text: 'Solicitar Orçamento',
                modalId: 'generic',
                modalTitle: 'Orçamento: Transporte de Pequenas Máquinas',
                formId: 'form-maquinas'
            }
        },
        {
            icon: 'fa-solid fa-handshake',
            title: 'Soluções Corporativas',
            text: 'Parcerias estratégicas para empresas que necessitam de serviços de reboque confiáveis.',
            action: {
                type: 'modal',
                text: 'Falar com Consultor',
                modalId: 'generic',
                modalTitle: 'Contato: Soluções para Empresas',
                formId: 'form-empresas'
            }
        }
    ];

    const featuresData = [
        {
            icon: 'fa-solid fa-user-tie',
            title: 'Fale com o dono',
            text: 'Você fala direto com o proprietário, sem intermediários.'
        },
        {
            icon: 'fa-solid fa-tag',
            title: 'Preço justo',
            text: 'Saiba o valor do serviço antes da contratação.'
        },
        {
            icon: 'fa-solid fa-truck',
            title: 'Frota moderna',
            text: 'Transportamos seu veículo com guinchos novos e seguros.'
        },
        {
            icon: 'fa-solid fa-map-location-dot',
            title: 'Conhecemos a região',
            text: 'Usamos as melhores rotas para chegar rápido.'
        },
        {
            icon: 'fa-solid fa-car',
            title: 'Todo tipo de veículo',
            text: 'Atendemos carros, motos, vans e até máquinas.'
        },
        {
            icon: 'fa-solid fa-clock',
            title: 'Sempre disponível',
            text: 'Estamos disponíveis 24 horas, todos os dias.'
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
            title: 'Transporte Técnico de Alto Valor',
            text: 'Protocolo zero‑dano para veículos premium; cintas de roda e plataforma ajustada.',
            tag: 'Serviço Especializado',
            stars: 5,
            image: 'assets/images/p01.jpg',
            alt: 'Guincho carregando BMW X6 com cintas de roda, amarração técnica sem contato com a lataria.'
        },
        {
            title: 'Prontidão Operacional 24h',
            text: 'Capacidade para SUVs e blindados; resposta rápida em rodovias e perímetros urbanos.',
            tag: 'Emergência 24h',
            stars: 5,
            image: 'assets/images/p02.jpg',
            alt: 'Guincho transportando viatura policial SUV, demonstrando capacidade de carga e amarração segura.'
        },
        {
            title: 'Resgate em Acesso Restrito',
            text: 'Extração segura em subsolos e garagens com equipamento compacto e operadores treinados.',
            tag: 'Acesso Difícil',
            stars: 5,
            image: 'assets/images/p03.jpg',
            alt: 'Guincho realizando manobra próxima a condomínio, mostrando extração em acesso restrito.'
        }
    ];

    // === RENDER FUNCTIONS ===

    function renderServices(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = servicesData.map(service => {
            const highlightClass = service.isHighlight ? 'card--highlight' : '';
            const actionBtn = service.action.type === 'whatsapp'
                ? `<a href="${service.action.link}" class="btn btn--whatsapp btn--full-mobile w-full mt-4"><i class="fa-brands fa-whatsapp"></i> ${service.action.text}</a>`
                : `<button class="btn btn--outline w-full mt-4" data-modal="${service.action.modalId}" data-title="${service.action.modalTitle}" data-form-id="${service.action.formId}">${service.action.text}</button>`;

            return `
                <div class="card card--service ${highlightClass} animate-on-scroll">
                    <div class="card__header">
                        <div class="card__icon">
                            <i class="${service.icon}" aria-hidden="true"></i>
                        </div>
                        <h3 class="h4 m-0">${service.title}</h3>
                    </div>
                    <div class="card__content pt-0 flex-grow">
                        <p class="text-muted m-0">${service.text}</p>
                    </div>
                    <div class="card__footer">
                        ${actionBtn}
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderFeatures(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = featuresData.map(feature => `
            <div class="feature-item animate-on-scroll">
                <div class="feature-item__icon">
                    <i class="${feature.icon}" aria-hidden="true"></i>
                </div>
                <div class="feature-item__content">
                    <h3 class="feature-item__title">${feature.title}</h3>
                    <p class="text-muted text-sm m-0">${feature.text}</p>
                </div>
            </div>
        `).join('');
    }

    function renderCoverageCities(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = coverageCitiesData.map(city => `
            <div class="coverage__city animate-on-scroll" id="${city.id}">
                <i class="fa-solid fa-location-dot" style="margin-right: 0.5rem" aria-hidden="true"></i>
                <span>${city.name}</span>
            </div>
        `).join('');
    }

    function renderTestimonials(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = testimonialsData.map(item => {
            const stars = Array(item.stars).fill('<i class="fa-solid fa-star text-warning"></i>').join('');
            return `
            <div class="card card--case-study animate-on-scroll">
                <div class="card__image-wrapper">
                    <img src="${config.basePath}${item.image}" alt="${item.alt}" class="card__image" loading="lazy">
                    <div class="card__overlay">
                        <span class="badge badge--light">${item.tag}</span>
                    </div>
                </div>
                <div class="card__content">
                    <div class="card__rating mb-2" style="color: hsl(var(--warning)); font-size: 0.8rem;">${stars}</div>
                    <h3 class="h5 mb-2">${item.title}</h3>
                    <p class="text-muted text-sm m-0">${item.text}</p>
                </div>
            </div>
        `}).join('');
    }

    function init(options = {}) {
        config = { ...config, ...options };
        
        // Render content directly (skeletons can be added via CSS :empty pseudo-class if needed)
        renderServices('.services__grid');
        renderFeatures('.features__list');
        renderCoverageCities('.coverage__cities');
        renderTestimonials('.testimonials__list');
    }

    return {
        init,
        // Export render functions for manual use
        renderServices,
        renderFeatures,
        renderCoverageCities,
        renderTestimonials
    };

})();
