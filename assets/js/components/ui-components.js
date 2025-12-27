/**
 * @fileoverview Reusable UI Components data and renderer
 */

export const UI = (function () {

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
                <div class="group relative flex flex-col p-8 rounded-3xl bg-card border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 animate-on-scroll stagger-${(index % 3) + 1}">
                    <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6">
                        <i class="${service.icon}"></i>
                    </div>
                    <div class="flex flex-col flex-grow">
                        <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">${service.title}</h3>
                        <p class="text-muted-foreground text-sm leading-relaxed mb-8">${service.text}</p>
                    </div>
                    ${actionBtn}
                    ${isEmergency ? '<div class="absolute top-4 right-4"><span class="badge badge-success badge-sm py-3 px-3 text-white">24h</span></div>' : ''}
                </div>
            `;
        }).join('');
    }

    function renderFeatures(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = featuresData.map((feature, index) => `
            <div class="flex gap-4 items-start p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-in-out border border-transparent hover:border-primary/10 group animate-on-scroll stagger-${(index % 3) + 1}">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <i class="${feature.icon}"></i>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">${feature.title}</h3>
                    <p class="text-muted-foreground text-sm leading-tight">${feature.text}</p>
                </div>
            </div>
        `).join('');
    }

    function renderCoverageCities(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = coverageCitiesData.map(city => `
            <button class="btn btn-outline btn-sm rounded-full animate-on-scroll hover:bg-primary hover:text-white hover:border-primary transition-all">
                ${city.name}
            </button>
        `).join('');
    }

    function renderTestimonials(containerId) {
        const container = document.querySelector(containerId);
        if (!container) return;

        container.innerHTML = testimonialsData.map((item, index) => {
            const stars = Array(item.stars).fill('<i class="fa-solid fa-star"></i>').join('');
            return `
            <div class="card card--case-study bg-card border border-border overflow-hidden h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-in-out group animate-on-scroll stagger-${(index % 3) + 1}">
                <div class="relative h-48 overflow-hidden">
                    <img src="${config.basePath}${item.image}" alt="${item.alt}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div class="card-body p-6 relative">
                    <div class="flex gap-1 text-warning text-sm mb-3">${stars}</div>
                    <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">${item.title}</h3>
                    <p class="text-muted-foreground text-sm leading-relaxed">${item.text}</p>
                    <div class="mt-4 pt-4 border-t border-border flex items-center gap-3">
                        <span class="badge badge-primary/10 text-primary border-none font-bold text-xs uppercase tracking-wider">${item.tag}</span>
                    </div>
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
