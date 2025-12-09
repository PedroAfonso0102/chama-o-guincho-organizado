/**
 * @fileoverview Reusable UI Components data and renderer
 * Updated for Sophisticated Standard Design System (Shadcn/MagicUI Style)
 */

const UI = (function() {

    let config = {
        basePath: ''
    };

    // === DATA DEFINITIONS ===

    const servicesData = [
        {
            icon: 'fa-solid fa-car-burst',
            title: 'Reboque de Emergência',
            text: 'Pane ou colisão? Chegamos rápido com guincho plataforma para transporte seguro.',
            isHighlight: true,
            action: {
                type: 'whatsapp',
                text: 'Chamar Agora',
                link: 'https://wa.me/5519993502969?text=Olá!%20Preciso%20de%20um%20guincho%20de%20emergência.'
            }
        },
        {
            icon: 'fa-solid fa-route',
            title: 'Transporte Intermunicipal',
            text: 'Levamos seu veículo para qualquer cidade com segurança e preço transparente.',
            action: {
                type: 'modal',
                text: 'Orçamento',
                modalId: 'generic',
                modalTitle: 'Orçamento: Viagem',
                formId: 'form-transporte-cidades'
            }
        },
        {
            icon: 'fa-solid fa-calendar-days',
            title: 'Agendamento',
            text: 'Planeje o transporte do seu veículo para revisões ou eventos com antecedência.',
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
            title: 'Leva e Traz Oficina',
            text: 'Coletamos e entregamos seu veículo na oficina de sua confiança.',
            action: {
                type: 'modal',
                text: 'Solicitar',
                modalId: 'generic',
                modalTitle: 'Orçamento: Oficina',
                formId: 'form-oficinas'
            }
        },
        {
            icon: 'fa-solid fa-boxes-packing',
            title: 'Máquinas Leves',
            text: 'Transporte especializado de empilhadeiras e equipamentos até 3 ton.',
            action: {
                type: 'modal',
                text: 'Orçamento',
                modalId: 'generic',
                modalTitle: 'Orçamento: Máquinas',
                formId: 'form-maquinas'
            }
        },
        {
            icon: 'fa-solid fa-handshake',
            title: 'Para Empresas',
            text: 'Parcerias para frotas, seguradoras e oficinas com condições especiais.',
            action: {
                type: 'modal',
                text: 'Fale Conosco',
                modalId: 'generic',
                modalTitle: 'Contato Corporativo',
                formId: 'form-empresas'
            }
        }
    ];

    const featuresData = [
        {
            icon: 'fa-solid fa-user-shield',
            title: 'Segurança Total',
            text: 'Motoristas verificados e seguro de carga incluso em todos os transportes.'
        },
        {
            icon: 'fa-solid fa-stopwatch',
            title: 'Chegada Rápida',
            text: 'Bases estratégicas em Campinas para atendimento em até 30 minutos.'
        },
        {
            icon: 'fa-solid fa-wallet',
            title: 'Preço Justo',
            text: 'Valor combinado antecipadamente. Sem surpresas na hora de pagar.'
        },
        {
            icon: 'fa-solid fa-truck-fast',
            title: 'Frota Moderna',
            text: 'Caminhões plataforma revisados para garantir a integridade do seu bem.'
        },
        {
            icon: 'fa-solid fa-map-location-dot',
            title: 'Conhecimento Local',
            text: 'Rotas otimizadas para fugir do trânsito e chegar mais rápido até você.'
        },
        {
            icon: 'fa-solid fa-star',
            title: 'Excelência',
            text: 'Centenas de avaliações 5 estrelas. Foco total na satisfação do cliente.'
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
        { id: 'city-jaguariuna', name: 'Jaguariúna' }
    ];

    const testimonialsData = [
        {
            title: 'Impecável',
            text: 'Transporte de carro de coleção. Cuidado extremo do motorista. Recomendo!',
            tag: 'Luxo',
            stars: 5,
            image: 'assets/images/img-17.jpg',
            alt: 'BMW sendo transportada'
        },
        {
            title: 'Salvação na madrugada',
            text: 'O único que atendeu às 3 da manhã na Anhanguera. Chegou super rápido.',
            tag: 'Emergência',
            stars: 5,
            image: 'assets/images/img-18.jpg',
            alt: 'Resgate noturno'
        },
        {
            title: 'Garagem difícil',
            text: 'Tirou meu carro travado no subsolo do prédio com muita perícia.',
            tag: 'Difícil Acesso',
            stars: 5,
            image: 'assets/images/img-19.jpg',
            alt: 'Resgate em subsolo'
        }
    ];

    // === RENDER FUNCTIONS ===

    function renderServices(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.className = 'd-grid gap-6'; // Ensure grid layout
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';

        container.innerHTML = servicesData.map(service => {
            const highlightClass = service.isHighlight ? 'card--highlight' : '';

            const actionBtn = service.action.type === 'whatsapp'
                ? `<a href="${service.action.link}" class="btn btn--whatsapp w-full"><i class="fa-brands fa-whatsapp"></i> ${service.action.text}</a>`
                : `<button class="btn btn--outline w-full" data-modal="${service.action.modalId}" data-title="${service.action.modalTitle}" data-form-id="${service.action.formId}">${service.action.text}</button>`;

            return `
                <div class="card card--service ${highlightClass} animate-on-scroll">
                    <div class="card__header">
                        <div class="card__icon">
                            <i class="${service.icon}" aria-hidden="true"></i>
                        </div>
                        <h3 class="h4 mb-2">${service.title}</h3>
                        <p class="text-sm text-muted">${service.text}</p>
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

        container.className = 'd-grid gap-6';
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';

        container.innerHTML = featuresData.map(feature => `
            <div class="feature-item animate-on-scroll">
                <div class="feature-item__icon">
                    <i class="${feature.icon}" aria-hidden="true"></i>
                </div>
                <div class="feature-item__content">
                    <h3 class="feature-item__title">${feature.title}</h3>
                    <p class="feature-item__text">${feature.text}</p>
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

        container.className = 'd-grid gap-6';
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';

        container.innerHTML = testimonialsData.map(item => {
            const stars = Array(item.stars).fill('<i class="fa-solid fa-star text-warning"></i>').join('');
            return `
            <div class="card card--case-study animate-on-scroll">
                <div class="card__image-wrapper">
                    <img src="${config.basePath}${item.image}" alt="${item.alt}" loading="lazy">
                    <div class="card__overlay" style="position: absolute; bottom: 10px; left: 10px;">
                        <span class="badge badge--light">${item.tag}</span>
                    </div>
                </div>
                <div class="card__content">
                    <div class="d-flex gap-1 mb-2" style="color: #fbbf24; font-size: 0.8rem;">${stars}</div>
                    <h3 class="h5 mb-2">${item.title}</h3>
                    <p class="text-sm text-muted">${item.text}</p>
                </div>
            </div>
        `}).join('');
    }

    function init(options = {}) {
        config = { ...config, ...options };
        renderServices('.services__grid');
        renderFeatures('.features__list');
        renderCoverageCities('.coverage__cities');
        renderTestimonials('.testimonials__list');
    }

    return {
        init
    };

})();
