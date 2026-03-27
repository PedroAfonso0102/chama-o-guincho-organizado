/**
 * @fileoverview Global Layout Components (Header, Footer, Modals).
 * Handles the rendering of shared structural elements across all pages to ensure consistency.
 * Eliminates the need for duplicating HTML for Header and Footer in every file.
 */

/**
 * Global configuration state for the layout.
 * @type {{basePath: string, activePage: string}}
 */
let config = {
    basePath: './',
    activePage: 'home' // 'home' | 'services' | 'other'
};

/**
 * Resolves a navigation link based on the current page context.
 * Enables SPA-like behavior for anchor links on the home page while providing full URLs for subpages.
 *
 * @param {string} target - The target destination (e.g., '#contact', 'servicos.html').
 * @returns {string} - The fully resolved URL or anchor.
 */
function getLink(target) {
    // Handle anchor links
    if (target.startsWith('#')) {
        // If on home page, simple scroll to anchor
        if (config.activePage === 'home') {
            return target;
        } else {
            // If on subpage, redirect to home page with anchor
            return `${config.basePath}index.html${target}`;
        }
    }

    // Normalize internal page links
    if (target === 'index.html') return `${config.basePath}index.html`;
    if (target === 'servicos.html') return `${config.basePath}servicos.html`;

    // Handle relative paths that aren't external links or protocols
    if (!target.startsWith('http') && !target.startsWith('tel:') && !target.startsWith('mailto:')) {
        return `${config.basePath}${target}`;
    }

    return target;
}

/**
 * Renders the global header/navigation.
 * Injects it into #header-placeholder or prepends to body.
 */
function renderHeader() {
    const header = document.createElement('header');
    header.id = 'header';
    header.className = 'header fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur z-50 border-b border-white/10 shadow-2xl shadow-black/5 transition-all duration-300';

    const logoHref = config.activePage === 'home' ? '#' : `${config.basePath}index.html`;

    header.innerHTML = `
            <div class="container mx-auto px-4 h-full flex items-center justify-between">
                <a href="${logoHref}" class="flex items-center gap-3 transition-transform hover:scale-105 duration-500" aria-label="Chama o Guincho - Página Inicial">
                    <img src="${config.basePath}assets/images/logos/logo-laranja+texto-vertical.webp" alt="Chama o Guincho Logo" class="h-8 w-auto">
                </a>

                <nav class="hidden lg:flex items-center gap-8" aria-label="Menu Principal Desktop">
                    <ul class="flex gap-2">
                        <li><a href="${getLink('index.html')}" class="btn btn-ghost ${config.activePage === 'home' ? 'text-primary bg-primary/5' : ''}">Início</a></li>
                        <li><a href="${config.basePath}emergencia.html" class="btn btn-ghost text-red-500 font-bold">Emergência</a></li>
                        <li><a href="${getLink('servicos.html')}" class="btn btn-ghost ${config.activePage === 'services' ? 'text-primary bg-primary/5' : ''}">Serviços</a></li>
                        <li><a href="${getLink('#contact')}" class="btn btn-ghost">Contato</a></li>
                    </ul>
                    <button data-toggle="modal" data-target="tmpl-contact-options" data-title="Fale Conosco"
                        class="btn btn-primary gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Orçamento Rápido
                    </button>
                </nav>

                <button id="nav-toggle" class="lg:hidden text-2xl text-foreground p-2" aria-label="Abrir Menu Principal" aria-expanded="false" aria-controls="nav-menu">
                    <i class="fa-solid fa-bars" aria-hidden="true"></i>
                </button>
            </div>
        `;

    const placeholder = document.getElementById('header-placeholder');
    let headerEl;
    if (placeholder) {
        headerEl = header;
        placeholder.replaceWith(header);
    } else {
        headerEl = header;
        document.body.prepend(header);
    }

    // --- MOBILE MENU (Rendered outside header for stability) ---
    let navMenu = document.getElementById('nav-menu');
    if (!navMenu) {
        navMenu = document.createElement('div');
        navMenu.id = 'nav-menu';
        navMenu.className = 'mobile-nav-panel fixed inset-y-0 right-0 w-[280px] p-8 flex flex-col gap-4 transform translate-x-full transition-transform duration-500 ease-in-out shadow-2xl';
        navMenu.setAttribute('aria-label', 'Menu Principal Mobile');
        navMenu.innerHTML = `
            <div class="flex justify-between items-center mb-8 border-b border-border pb-4">
                <img src="${config.basePath}assets/images/logos/logo-laranja+texto-vertical.webp" alt="Logo" class="h-8 w-auto">
                <button id="nav-close" class="text-2xl text-foreground p-2" aria-label="Fechar Menu Principal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <a href="${getLink('index.html')}" class="btn btn-ghost w-full justify-start text-lg font-bold ${config.activePage === 'home' ? 'nav-mobile-link--active text-primary' : ''}" aria-label="Ir para a Página Inicial">Início</a>
            <a href="${config.basePath}emergencia.html" class="btn btn-ghost w-full justify-start text-lg font-bold text-red-500" aria-label="Ir para Pedido de Emergência">🚨 Emergência</a>
            <a href="${getLink('servicos.html')}" class="btn btn-ghost w-full justify-start text-lg font-bold ${config.activePage === 'services' ? 'nav-mobile-link--active text-primary' : ''}" aria-label="Ir para Página de Serviços">Serviços</a>
            <a href="${getLink('#contact')}" class="btn btn-ghost w-full justify-start text-lg font-bold" aria-label="Ir para Contato">Contato</a>
            <a href="https://wa.me/5519993502969" class="btn btn-primary w-full gap-2 mt-4 shadow-lg shadow-primary/30" aria-label="Chamar no WhatsApp">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Chamar no WhatsApp
            </a>
            <div class="mt-auto pt-8 border-t border-border">
                <p class="text-xs text-muted-foreground text-center">Atendimento 24h em Campinas e Região</p>
            </div>
        `;
        document.body.appendChild(navMenu);
    }

    // Toggle Logic
    const navToggle = headerEl.querySelector('#nav-toggle');
    const navClose = navMenu.querySelector('#nav-close');

    // Check if overlay already exists to avoid duplicates
    let navOverlay = document.querySelector('.nav-overlay-heavy');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay-heavy fixed inset-0 bg-black/70 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-500';
        document.body.appendChild(navOverlay);
    }

    const toggleMenu = (open) => {
        if (open) {
            navMenu.classList.remove('translate-x-full');
            navOverlay.classList.remove('opacity-0', 'pointer-events-none');
            navOverlay.classList.add('opacity-100');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('overflow-hidden');
        } else {
            navMenu.classList.add('translate-x-full');
            navOverlay.classList.remove('opacity-100');
            navOverlay.classList.add('opacity-0', 'pointer-events-none');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => toggleMenu(true));
        if (navClose) navClose.addEventListener('click', () => toggleMenu(false));
        navOverlay.addEventListener('click', () => toggleMenu(false));

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Smooth scroll for anchors
    headerEl.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href;
                const target = document.querySelector(targetId);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}

/**
 * Renders the global footer.
 * Injects it into #footer-placeholder or appends to body.
 */
function renderFooter() {
    const footer = document.createElement('footer');
    footer.id = 'contact';
    footer.className = 'bg-[#0A0A0B] text-white pt-24 pb-12 border-t border-white/5';

    const year = new Date().getFullYear();

    footer.innerHTML = `
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
                    <div class="md:col-span-12 lg:col-span-5">
                        <div class="flex items-center gap-3 mb-8">
                            <img src="${config.basePath}assets/images/logos/logo-laranja+texto-vertical.webp" alt="Chama o Guincho Logo" class="h-12 w-auto brightness-0 invert">
                        </div>
                        <p class="text-white/50 text-lg mb-8 max-w-md leading-relaxed">
                            Referência em assistência automotiva e transporte especializado. Tecnologia e agilidade para garantir sua tranquilidade em qualquer rodovia ou cidade.
                        </p>
                        <div class="flex gap-4">
                            <a href="https://wa.me/5519993502969" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-all duration-500 group">
                                <i class="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
                            </a>
                        </div>
                    </div>

                    <div class="md:col-span-4 lg:col-span-2">
                        <h6 class="text-white font-bold uppercase tracking-wider text-sm mb-6">Navegação</h6>
                        <ul class="space-y-4 text-white/80">
                            <li><a href="${getLink('#features')}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Diferenciais</a></li>
                            <li><a href="${getLink('#coverage')}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Cobertura</a></li>
                            <li><a href="${getLink('#testimonials')}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Atendimentos</a></li>
                        </ul>
                    </div>

                    <div class="md:col-span-4 lg:col-span-2">
                        <h6 class="text-white font-bold uppercase tracking-wider text-sm mb-6">Cidades</h6>
                        <ul class="space-y-4 text-white/80">
                            <li><a href="${config.basePath}guincho-sumare/" class="hover:text-white transition-colors">Sumaré</a></li>
                            <li><a href="${config.basePath}guincho-hortolandia/" class="hover:text-white transition-colors">Hortolândia</a></li>
                            <li><a href="${config.basePath}guincho-indaiatuba/" class="hover:text-white transition-colors">Indaiatuba</a></li>
                            <li><a href="${config.basePath}guincho-valinhos/" class="hover:text-white transition-colors">Valinhos</a></li>
                        </ul>
                    </div>

                    <div class="md:col-span-4 lg:col-span-3">
                        <h6 class="text-white font-bold uppercase tracking-wider text-sm mb-6">Central 24h</h6>
                        <div class="space-y-6">
                            <a href="tel:+5519993502969" class="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                                <span class="text-xs text-white/40 block mb-1">Emergência</span>
                                <span class="text-xl font-bold group-hover:text-primary transition-colors">(19) 99350-2969</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="pt-12 pb-6 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p class="text-white/30 text-xs text-center md:text-left">
                        &copy; ${year} Chama o Guincho. Todos os direitos reservados. <br class="md:hidden">
                        CNPJ: 54.676.258/0001-31
                    </p>
                    <div class="flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity">
                        <i class="fa-brands fa-cc-visa text-2xl"></i>
                        <i class="fa-brands fa-cc-mastercard text-2xl"></i>
                        <i class="fa-solid fa-barcode text-2xl"></i>
                        <i class="fa-solid fa-pix text-2xl"></i>
                    </div>
                </div>
                
                <div class="pt-6 pb-2 border-t border-white/5 flex justify-center text-center">
                    <p class="text-white/20 hover:text-white/40 transition-colors text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium">
                        Fotografia, Edição Gráfica &copy; Programação Estrutural por <span class="text-primary/70 hover:text-primary transition-colors font-bold cursor-pointer">Pedro Afonso Pinheiro de Paula</span>
                    </p>
                </div>
            </div>
        `;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.replaceWith(footer);
    } else {
        document.body.appendChild(footer);
    }
}


/**
 * Renders floating action buttons (WhatsApp, Scroll to Top) and notification containers.
 */
function renderFloatButtons() {
    const floatBtns = document.createElement('div');
    floatBtns.className = 'fixed bottom-4 right-4 flex flex-col gap-3 z-40';
    floatBtns.innerHTML = `
        <a href="https://wa.me/5519993502969"
           target="_blank"
           class="btn btn-circle btn-whatsapp shadow-xl w-14 h-14 text-2xl hover:scale-110 transition-transform duration-300"
           aria-label="Fale conosco no WhatsApp">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        </a>
    `;
    document.body.appendChild(floatBtns);

    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.id = 'scrollTop';
    scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.id = 'notification';
    notif.innerHTML = `
            <i class="notification__icon fa-solid fa-circle-info" aria-hidden="true"></i>
            <span class="notification__message text-sm font-medium">Mensagem de notificação</span>
        `;
    document.body.appendChild(notif);
}

/**
 * Renders the generic modal structure and hidden form templates.
 */
function renderModals() {
    const modalContainer = document.createElement('div');

    modalContainer.innerHTML = `
            <!-- Modals (Generic Container) -->
            <div class="modal" id="generic-modal">
                <div class="modal-box max-w-lg w-full rounded-[2rem] p-0 overflow-hidden bg-card border border-border transition-all duration-500 flex flex-col max-h-[90vh]">
                    <div class="modal__header flex-shrink-0 flex items-center justify-between p-8 border-b border-border">
                        <h3 class="modal-title text-2xl font-black m-0 tracking-tight" id="generic-modal-title">Solicitar Guincho</h3>
                        <button class="modal-close btn btn-circle btn-ghost btn-sm" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal__body p-8 content-area flex-grow overflow-y-auto">
                        <!-- Form content injected here -->
                    </div>
                    <div class="modal__footer p-8 pt-4 flex-shrink-0 flex gap-3 border-t border-border/50">
                        <button type="button" class="btn btn-ghost flex-1 modal-close">Cancelar</button>
                        <button type="button" id="generic-modal-submit" class="btn btn-primary flex-1 shadow-lg shadow-primary/20">
                            CONTINUAR <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Success Modal -->
            <div class="modal" id="modal-success">
                <div class="modal__content max-w-sm rounded-[2rem] overflow-hidden">
                    <div class="modal__header bg-success text-success-foreground p-8 flex flex-col items-center">
                        <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-4">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <h3 class="modal__title text-2xl font-black m-0 text-white text-center">Tudo Pronto!</h3>
                        <button class="modal-close absolute top-4 right-4 text-white/50 hover:text-white transition-colors" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal__body text-center p-8 bg-card">
                        <p class="text-muted-foreground mb-8">Sua solicitação foi processada. Clique no botão abaixo para iniciar o atendimento no WhatsApp.</p>
                        <a href="#" id="success-modal-whatsapp-btn" class="btn btn-whatsapp btn-lg w-full gap-3 shadow-xl shadow-whatsapp/20">
                            <i class="fa-brands fa-whatsapp text-xl"></i> ENVIAR SOLICITAÇÃO
                        </a>
                    </div>
                </div>
            </div>

            <!-- Hidden Forms Templates -->
            <div class="hidden">
                <!-- 1. Transporte para Outras Cidades -->
                <form id="form-transporte-cidades" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Onde o veículo está?</label>
                            <div class="relative">
                                <i class="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Origem" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Ex: Campinas, SP" required>
                            </div>
                        </div>
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Para onde vai?</label>
                            <div class="relative">
                                <i class="fa-solid fa-flag-checkered absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Destino" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Ex: São Paulo, SP" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Tipo de Veículo</label>
                        <div class="relative">
                            <i class="fa-solid fa-car absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <select name="Veículo" class="select select-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" required>
                                <option value="" disabled selected>Selecione...</option>
                                <option value="Carro Passeio">Carro de Passeio</option>
                                <option value="Moto">Moto</option>
                                <option value="SUV/Caminhonete">SUV / Caminhonete</option>
                                <option value="Van/Utilitário">Van / Utilitário</option>
                                <option value="Esportivo/Luxo">Esportivo / Luxo</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Data Preferencial (Opcional)</label>
                        <div class="relative">
                            <i class="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="date" name="Data Prevista" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary">
                        </div>
                    </div>
                </form>

                <!-- 2. Agendar Transporte -->
                <form id="form-agendamento" class="space-y-4">
                    <div class="alert alert-info shadow-sm py-2 text-sm bg-blue-50 text-blue-800 border-blue-100">
                        <i class="fa-solid fa-circle-info"></i> Para emergências agora, use o botão vermelho.
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Data do Agendamento</label>
                            <div class="relative">
                                <i class="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="date" name="Data Agendada" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" required>
                            </div>
                        </div>
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Horário Aproximado</label>
                            <div class="relative">
                                <i class="fa-regular fa-clock absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="time" name="Hora Agendada" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" required>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Local de Retirada</label>
                            <div class="relative">
                                <i class="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Origem" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Endereço ou Bairro" required>
                            </div>
                        </div>
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Local de Entrega</label>
                            <div class="relative">
                                <i class="fa-solid fa-flag-checkered absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Destino" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Endereço ou Bairro" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Veículo</label>
                        <div class="relative">
                            <i class="fa-solid fa-car absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <select name="Veículo" class="select select-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" required>
                                <option value="" disabled selected>Selecione...</option>
                                <option value="Carro Passeio">Carro de Passeio</option>
                                <option value="Moto">Moto</option>
                                <option value="SUV/Caminhonete">SUV / Caminhonete</option>
                                <option value="Clássico/Coleção">Clássico / Coleção</option>
                            </select>
                        </div>
                    </div>
                </form>

                <!-- 3. Leva e Traz para Oficinas -->
                <form id="form-oficinas" class="space-y-4">
                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Nome da Oficina</label>
                        <div class="relative">
                            <i class="fa-solid fa-wrench absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="text" name="Nome Oficina" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Nome da Oficina Parceira" required>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Endereço da Oficina</label>
                        <div class="relative">
                            <i class="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="text" name="Endereço Oficina" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Onde devemos entregar?" required>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Endereço de Retirada do Veículo</label>
                        <div class="relative">
                            <i class="fa-solid fa-car-side absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="text" name="Endereço Retirada" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Endereço do cliente" required>
                        </div>
                    </div>

                    <div class="form-control w-full">
                         <label class="label font-medium text-muted-foreground">Responsável / Contato</label>
                         <div class="relative">
                            <i class="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="text" name="Responsável" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Quem recebe/entrega" required>
                        </div>
                    </div>
                </form>

                <!-- 4. Transporte de Pequenas Máquinas -->
                <form id="form-maquinas" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Tipo de Máquina</label>
                            <div class="relative">
                                <i class="fa-solid fa-dolly absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Tipo Máquina" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Ex: Empilhadeira, Mini-escavadeira" required>
                            </div>
                        </div>
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Peso Estimado</label>
                            <div class="relative">
                                <i class="fa-solid fa-weight-hanging absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Peso" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Ex: 2.5 toneladas">
                            </div>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Origem</label>
                        <div class="relative">
                            <i class="fa-solid fa-map-pin absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="text" name="Origem" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Local de Retirada" required>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Destino</label>
                        <div class="relative">
                            <i class="fa-solid fa-flag absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <input type="text" name="Destino" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Local de Entrega" required>
                        </div>
                    </div>
                </form>

                <!-- 5. Soluções para Empresas -->
                <form id="form-empresas" class="space-y-4">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Nome da Empresa</label>
                            <div class="relative">
                                <i class="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="text" name="Empresa" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Nome Comercial" required>
                            </div>
                        </div>
                         <div class="form-control w-full">
                            <label class="label font-medium text-muted-foreground">Telefone / WhatsApp</label>
                            <div class="relative">
                                <i class="fa-brands fa-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                                <input type="tel" name="WhatsApp" class="input input-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Tamanho da Frota</label>
                        <div class="relative">
                            <i class="fa-solid fa-truck-fast absolute left-4 top-1/2 -translate-y-1/2 text-primary/60"></i>
                            <select name="Frota" class="select select-bordered w-full pl-12 h-12 bg-muted/20 focus:bg-white transition-all focus:border-primary">
                                <option value="" disabled selected>Selecione...</option>
                                <option value="1-5 veículos">1-5 veículos</option>
                                <option value="6-20 veículos">6-20 veículos</option>
                                <option value="20+ veículos">20+ veículos</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-control w-full">
                        <label class="label font-medium text-muted-foreground">Descreva sua necessidade</label>
                        <textarea name="Mensagem" class="textarea textarea-bordered w-full h-24 bg-muted/20 focus:bg-white transition-all focus:border-primary" placeholder="Precisa de pátio? Transporte recorrente? Gestão de sinistros?"></textarea>
                    </div>
                </form>
            </div>
        `;

    document.body.appendChild(modalContainer);
}

/**
 * Initializes the Layout components.
 * @param {object} options - Configuration options (basePath, activePage).
 */
function init(options = {}) {
    config = { ...config, ...options };
    renderHeader();
    renderFooter();
    renderFloatButtons();
    renderModals();
}

export const Layout = {
    init
};
