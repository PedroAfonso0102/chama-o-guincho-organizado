/**
 * @fileoverview API Service Abstraction (The Mock Destroyer Layer)
 * 
 * This module handles all exterior data fetching. Currently configured
 * to simulate a real backend environment with artificial latency and
 * error handling. Once a real backend URL is provided, simply replace
 * the simulated fetch logic with native fetch() calls to the endpoint.
 */

// Simulated Database (Moved from UI components)
const db = {
    services: [
        {
            icon: 'fa-solid fa-truck-fast',
            title: 'Resgate Emergencial',
            text: 'Pane mecânica ou colisão? Atendimento ágil para resolver seu problema. Disponibilidade prioritária em toda Campinas e RMC.',
            isHighlight: true,
            action: { type: 'whatsapp', text: 'PEDIR SOCORRO AGORA', link: 'https://wa.me/5519993502969?text=SOS%20-%20Preciso%20de%20um%20guincho%20de%20emergência%20agora!' }
        },
        {
            icon: 'fa-solid fa-map-location-dot',
            title: 'Logística Intermunicipal',
            text: 'Vai comprar ou vender um carro em outra cidade? Levamos seu veículo com seguro total, hora marcada e monitoramento.',
            action: { type: 'modal', text: 'Cotar Viagem', modalId: 'generic', modalTitle: 'Orçamento: Viagem Intermunicipal', formId: 'form-transporte-cidades' }
        },
        {
            icon: 'fa-solid fa-calendar-check',
            title: 'Transporte Programado',
            text: 'Transporte para revisões, eventos ou transferências. Reserve o horário e evite esperas desnecessárias.',
            action: { type: 'modal', text: 'Agendar Horário', modalId: 'generic', modalTitle: 'Agendar Transporte Técnico', formId: 'form-agendamento' }
        },
        {
            icon: 'fa-solid fa-screwdriver-wrench',
            title: 'Gestão de Oficina',
            text: 'Buscamos o veículo do seu cliente e entregamos pronto. Parceria técnica que valoriza o seu pós-venda.',
            action: { type: 'modal', text: 'Seja um Parceiro', modalId: 'generic', modalTitle: 'Parceria: Leva e Traz para Oficinas', formId: 'form-oficinas' }
        },
        {
            icon: 'fa-solid fa-dolly',
            title: 'Maquinário Leve',
            text: 'Solução para empilhadeiras e mini-carregadeiras. Plataforma com capacidade de carga e fixação técnica certificada.',
            action: { type: 'modal', text: 'Orçamento Especial', modalId: 'generic', modalTitle: 'Orçamento: Transporte de Equipamentos', formId: 'form-maquinas' }
        },
        {
            icon: 'fa-solid fa-building-shield',
            title: 'Frotas Corporativas',
            text: 'Atendimento dedicado para empresas. Faturamento mensal, gestão de pátio e relatórios digitais de cada remoção.',
            action: { type: 'modal', text: 'Falar com Consultor', modalId: 'generic', modalTitle: 'Contato: Soluções Corporativas', formId: 'form-empresas' }
        }
    ],
    features: [
        { icon: 'fa-solid fa-user-shield', title: 'Direto com o Especialista', text: 'Sem call centers robóticos ou espera. Você fala diretamente com quem resolve o seu problema.' },
        { icon: 'fa-solid fa-file-invoice-dollar', title: 'Orçamento Garantido', text: 'Preço fechado via WhatsApp antes da saída. Sem taxas surpresas ou "adicionais" na hora H.' },
        { icon: 'fa-solid fa-truck-ramp-box', title: 'Tecnologia de Ponta', text: 'Caminhões monitorados e equipados com cintas de roda (zero contato com a lataria) e patins.' },
        { icon: 'fa-solid fa-route', title: 'Conhecimento Local', text: 'Conhecemos cada atalho da RMC. Fugimos do trânsito pesado para chegar mais rápido até você.' },
        { icon: 'fa-solid fa-car-on', title: 'Versatilidade Técnica', text: 'De carros esportivos baixos a utilitários pesados. Temos o equipamento certo para o seu caso.' },
        { icon: 'fa-solid fa-clock', title: 'Disponibilidade Real', text: 'Madrugada, feriado ou chuva. Se você chamar, nós vamos. Simples assim.' }
    ],
    coverageCities: [
        { id: 'city-campinas', name: 'Campinas' }, { id: 'city-indaiatuba', name: 'Indaiatuba' }, { id: 'city-hortolandia', name: 'Hortolândia' },
        { id: 'city-sumare', name: 'Sumaré' }, { id: 'city-americana', name: 'Americana' }, { id: 'city-paulinia', name: 'Paulínia' },
        { id: 'city-valinhos', name: 'Valinhos' }, { id: 'city-vinhedo', name: 'Vinhedo' }, { id: 'city-jaguariuna', name: 'Jaguariúna' },
        { id: 'city-monte-mor', name: 'Monte Mor' }, { id: 'city-nova-odessa', name: 'Nova Odessa' }, { id: 'city-limeira', name: 'Limeira' },
        { id: 'city-sao-paulo', name: 'São Paulo' }, { id: 'city-mogi-mirim', name: 'Mogi Mirim' }, { id: 'city-piracicaba', name: 'Piracicaba' }
    ],
    testimonials: [
        { title: 'Logística de Ativos de Alto Valor', text: 'Procedimentos técnicos dedicados a veículos de luxo e superesportivos. Utilização de guincho plataforma com ângulo de ataque reduzido.', tag: 'Transporte Premium', image: 'assets/images/case-01.jpg', alt: 'Transporte técnico de veículo importado com fixação em 4 pontos para máxima segurança.' },
        { title: 'Operações de Frota Corporativa', text: 'Parceria estratégica para locadoras e gestores de frota. Execução de logística de pátio e remanejamento de veículos em escala.', tag: 'Soluções B2B', image: 'assets/images/case-02.jpg', alt: 'Logística de pátio para frotas corporativas com sistema de rastreamento em tempo real.' },
        { title: 'Logística Governamental e Tática', text: 'Capacidade técnica para transporte de viaturas policiais e veículos de serviço público em conformidade com exigências estatais.', tag: 'Veículos Oficiais', image: 'assets/images/case-03.jpg', alt: 'Atendimento técnico especializado para órgãos públicos e frotas táticas.' },
        { title: 'Remoção de Sinistros Graves', text: 'Especialização no transporte de veículos com danos estruturais severos. Alta capacidade de tração para veículos travados.', tag: 'Alta Complexidade', image: 'assets/images/case-06.jpg', alt: 'Resgate de SUV blindado com uso de patins técnicos para evitar danos à transmissão.' },
        { title: 'Veículos de Prestígio', text: 'Transporte de alta precisão para automóveis importados. Amarração técnica (cintas de roda) sem contato com a lataria.', tag: 'Transporte VIP', image: 'assets/images/case-05.jpg', alt: 'Transporte de superesportivo utilizando cintas de roda e ganchos emborrachados.' },
        { title: 'Logística de Carga Múltipla', text: 'Otimização de frete através de transporte combinado. Movimentação simultânea de automóveis e motocicletas.', tag: 'Logística Integrada', image: 'assets/images/case-04.jpg', alt: 'Transporte compartilhado de motocicletas e carros otimizando custo logístico.' }
    ]
};

/**
 * Backend Simulator Core
 * Defensively processes requests to mimic real network latency and error rates.
 */
const simulateBackendRequest = async (resourceName, shouldFail = false) => {
    // Artificial Latency (300ms to 1200ms)
    const delay = Math.floor(Math.random() * 900) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));

    if (shouldFail) {
        throw new Error(`Failed to fetch resource: ${resourceName} [HTTP 500]`);
    }

    // Clone the data to prevent unintended mutations (like a real JSON.parse response)
    return JSON.parse(JSON.stringify(db[resourceName] || []));
};

export const API = {
    /**
     * Fetches the list of active services from the backend.
     * @returns {Promise<Array>} Array of service objects
     */
    async getServices() {
        try {
            const rawData = await simulateBackendRequest('services', false); // Set to true to test error boundary
            return rawData.map(item => ({
                ...item,
                // In a real API, `isHighlight` might be represented differently, mapping happens here:
                isHighlight: !!item.isHighlight
            }));
        } catch (error) {
            console.warn('[API Warning] getServices failed:', error.message);
            return null; // Return null on failure to allow UI to show graceful fallback
        }
    },

    /**
     * Fetches key features / differentiators.
     * @returns {Promise<Array>} Array of feature objects
     */
    async getFeatures() {
        try {
            return await simulateBackendRequest('features');
        } catch (error) {
            console.warn('[API Warning] getFeatures failed:', error.message);
            return null;
        }
    },

    /**
     * Fetches dynamic coverage areas (cities).
     * @returns {Promise<Array>} Array of city objects
     */
    async getCoverageCities() {
        try {
            return await simulateBackendRequest('coverageCities');
        } catch (error) {
            console.warn('[API Warning] getCoverageCities failed:', error.message);
            return null;
        }
    },

    /**
     * Fetches recent testimonials / cases.
     * @returns {Promise<Array>} Array of testimonial objects
     */
    async getTestimonials() {
        try {
            const rawData = await simulateBackendRequest('testimonials');
            return rawData;
        } catch (error) {
            console.warn('[API Warning] getTestimonials failed:', error.message);
            return null;
        }
    }
};
