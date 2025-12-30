/**
 * @fileoverview Global Layout Components (Header, Footer, Modals)
 */

export const Layout = (function () {

    let config = {
        basePath: './',
        activePage: 'home' // 'home' | 'services' | 'other'
    };

    function getLink(target) {
        if (target.startsWith('#')) {
            if (config.activePage === 'home') {
                return target;
            } else {
                return `${config.basePath}index.html${target}`;
            }
        }
        if (target === 'index.html') return `${config.basePath}index.html`;
        if (target === 'servicos.html') return `${config.basePath}servicos.html`;
        if (!target.startsWith('http') && !target.startsWith('tel:') && !target.startsWith('mailto:')) {
            return `${config.basePath}${target}`;
        }
        return target;
    }

    function renderHeader() {
        const header = document.createElement('header');
        header.id = 'header';
        header.className = 'header fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur z-50 border-b border-white/10 shadow-2xl shadow-black/5 transition-all duration-300';

        const logoHref = config.activePage === 'home' ? '#' : `${config.basePath}index.html`;

        header.innerHTML = `
            <div class="container mx-auto px-4 h-full flex items-center justify-between">
                <a href="${logoHref}" class="flex items-center gap-3 transition-transform hover:scale-105 duration-500">
                    <img src="${config.basePath}assets/images/logos/logo-laranja+texto-vertical.webp" alt="Chama o Guincho Logo" class="h-8 w-auto">
                </a>

                <nav class="hidden lg:flex items-center gap-8">
                    <ul class="flex gap-2">
                        <li><a href="${getLink('#urgent-request')}" class="btn btn-ghost btn-sm">Emergência</a></li>
                        <li><a href="${getLink('servicos.html')}" class="btn btn-ghost btn-sm ${config.activePage === 'services' ? 'text-primary bg-primary/5' : ''}">Serviços</a></li>
                        <li><a href="${getLink('#contact')}" class="btn btn-ghost btn-sm">Contato</a></li>
                    </ul>
                    <button data-toggle="modal" data-target="tmpl-contact-options" data-title="Fale Conosco"
                        class="btn btn-primary btn-sm gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                        <i class="fa-brands fa-whatsapp"></i> Chamar Agora
                    </button>
                </nav>

                <button id="nav-toggle" class="lg:hidden text-2xl text-foreground p-2">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>

            <div id="nav-menu" class="hidden fixed inset-0 top-16 bg-background border-t border-border p-8 flex-col gap-4 z-40">
                <a href="${getLink('#urgent-request')}" class="btn btn-ghost w-full justify-start text-lg">Emergência</a>
                <a href="${getLink('servicos.html')}" class="btn btn-ghost w-full justify-start text-lg">Serviços</a>
                <a href="${getLink('#contact')}" class="btn btn-ghost w-full justify-start text-lg">Contato</a>
                <a href="https://wa.me/5519993502969" class="btn btn-primary w-full gap-2 mt-4">
                    <i class="fa-brands fa-whatsapp"></i> Chamar no WhatsApp
                </a>
            </div>
        `;

        const placeholder = document.getElementById('header-placeholder');
        if (placeholder) {
            placeholder.replaceWith(header);
        } else {
            document.body.prepend(header);
        }

        // Re-attach nav toggle logic since we replaced the HTML
        const navToggle = header.querySelector('#nav-toggle');
        const navMenu = header.querySelector('#nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('hidden');
            });
        }
    }

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
                            <a href="#" class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-500 group">
                                <i class="fa-brands fa-instagram text-xl group-hover:scale-110 transition-transform"></i>
                            </a>
                            <a href="#" class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-500 group">
                                <i class="fa-brands fa-facebook text-xl group-hover:scale-110 transition-transform"></i>
                            </a>
                            <a href="#" class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-all duration-500 group">
                                <i class="fa-brands fa-whatsapp text-xl group-hover:scale-110 transition-transform"></i>
                            </a>
                        </div>
                    </div>

                    <div class="md:col-span-4 lg:col-span-2">
                        <h6 class="text-white font-bold uppercase tracking-wider text-sm mb-6">Navegação</h6>
                        <ul class="space-y-4 text-white/60">
                            <li><a href="${getLink('#features')}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Diferenciais</a></li>
                            <li><a href="${getLink('#coverage')}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Cobertura</a></li>
                            <li><a href="${getLink('#testimonials')}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Atendimentos</a></li>
                        </ul>
                    </div>

                    <div class="md:col-span-4 lg:col-span-2">
                        <h6 class="text-white font-bold uppercase tracking-wider text-sm mb-6">Cidades</h6>
                        <ul class="space-y-4 text-white/60">
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

                <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
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
            </div>
        `;

        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.replaceWith(footer);
        } else {
            document.body.appendChild(footer);
        }
    }


    function renderFloatButtons() {
        const div = document.createElement('div');
        div.className = 'float-buttons';
        div.innerHTML = `
            <a href="https://wa.me/5519993502969" target="_blank" rel="noopener noreferrer" class="float-button float-button--whatsapp" aria-label="WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="tel:+5519993502969" class="float-button float-button--phone" aria-label="Ligar">
                <i class="fa-solid fa-phone"></i>
            </a>
        `;
        document.body.appendChild(div);

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

    function renderModals() {
        const modalContainer = document.createElement('div');

        modalContainer.innerHTML = `
            <!-- Modals (Generic Container) -->
            <div class="modal" id="modal-generic">
                <div class="modal__content">
                    <div class="modal__header">
                        <h3 class="modal__title h5 m-0" id="generic-modal-title">Título</h3>
                        <button class="modal__close btn btn--ghost p-2" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal__body" id="generic-modal-body">
                        <!-- Form content injected here -->
                    </div>
                    <div class="modal__footer">
                        <button type="button" class="btn btn--ghost modal-close">Cancelar</button>
                        <button type="submit" id="generic-modal-submit" class="btn btn--primary">Enviar</button>
                    </div>
                </div>
            </div>

            <!-- Success Modal -->
            <div class="modal" id="modal-success">
                <div class="modal__content">
                    <div class="modal__header" style="background-color: hsl(var(--success)); color: white;">
                        <h3 class="modal__title h5 m-0 text-white">Sucesso!</h3>
                        <button class="modal__close btn btn--ghost p-2 text-white" style="color: white"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal__body text-center py-8">
                        <div style="font-size: 4rem; color: hsl(var(--success)); margin-bottom: 1.5rem;"><i class="fa-solid fa-circle-check"></i></div>
                        <h4 class="h5 mb-2">Solicitação Recebida</h4>
                        <p class="mb-6">Clique abaixo para finalizar no WhatsApp.</p>
                        <a href="#" id="success-modal-whatsapp-btn" class="btn btn--whatsapp btn--lg w-full">
                            <i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <!-- Hidden Forms Templates -->
            <div class="d-none">
                <form id="form-transporte-cidades">
                    <div class="form-group">
                        <label class="form-label" for="transporte-cidades-nome">Nome</label>
                        <input type="text" name="Nome" class="form-control" id="transporte-cidades-nome" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="transporte-cidades-telefone">Telefone</label>
                        <input type="tel" name="Telefone" class="form-control" id="transporte-cidades-telefone" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="transporte-cidades-origem">Origem</label>
                        <input type="text" name="Cidade de Origem" class="form-control" id="transporte-cidades-origem" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="transporte-cidades-destino">Destino</label>
                        <input type="text" name="Cidade de Destino" class="form-control" id="transporte-cidades-destino" required>
                    </div>
                </form>

                <form id="form-agendamento">
                    <div class="form-group">
                        <label class="form-label" for="agendamento-nome">Nome</label>
                        <input type="text" name="Nome" class="form-control" id="agendamento-nome" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="agendamento-telefone">Telefone</label>
                        <input type="tel" name="Telefone" class="form-control" id="agendamento-telefone" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="agendamento-data">Data</label>
                        <input type="date" name="Data" class="form-control" id="agendamento-data" required>
                    </div>
                </form>

                <form id="form-oficinas">
                    <div class="form-group">
                        <label class="form-label">Nome</label>
                        <input type="text" name="Nome" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="tel" name="Telefone" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Endereço da Oficina</label>
                        <input type="text" name="Oficina" class="form-control" required>
                    </div>
                </form>

                <form id="form-maquinas">
                    <div class="form-group">
                        <label class="form-label">Nome</label>
                        <input type="text" name="Nome" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="tel" name="Telefone" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tipo de Máquina</label>
                        <input type="text" name="Maquina" class="form-control" required>
                    </div>
                </form>

                <form id="form-empresas">
                    <div class="form-group">
                        <label class="form-label">Nome da Empresa</label>
                        <input type="text" name="Empresa" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="tel" name="Telefone" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mensagem</label>
                        <textarea name="Mensagem" class="form-control" rows="4" required></textarea>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modalContainer);
    }

    function init(options = {}) {
        config = { ...config, ...options };
        renderHeader();
        renderFooter();
        renderFloatButtons();
        renderModals();
    }

    return {
        init
    };

})();
