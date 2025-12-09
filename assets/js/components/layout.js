/**
 * @fileoverview Global Layout Components (Header, Footer, Modals)
 * Updated for Sophisticated Standard Design System
 */

const Layout = (function() {

    let config = {
        basePath: './',
        activePage: 'home'
    };

    function getLink(target) {
        if (target.startsWith('#')) {
            return config.activePage === 'home' ? target : `${config.basePath}index.html${target}`;
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
        header.className = 'header';
        header.id = 'header';

        const logoHref = config.activePage === 'home' ? '#' : `${config.basePath}index.html`;

        header.innerHTML = `
            <div class="container header__container">
                <a href="${logoHref}" class="logo">
                    <img src="${config.basePath}assets/images/logo.svg" alt="Chama o Guincho" class="logo__svg" />
                    <span class="d-none d-md-block">Chama o <span class="logo__highlight">Guincho</span></span>
                </a>

                <nav class="nav">
                    <button class="nav__toggle" id="nav-toggle" aria-label="Menu de navegação">
                        <i class="fa-solid fa-bars" aria-hidden="true"></i>
                    </button>

                    <ul class="nav__menu" id="nav-menu">
                        <li><a href="${getLink('index.html')}" class="nav__link ${config.activePage === 'home' ? 'nav__link--active' : ''}">Início</a></li>
                        <li><a href="${getLink('servicos.html')}" class="nav__link ${config.activePage === 'services' ? 'nav__link--active' : ''}">Serviços</a></li>
                        <li><a href="${getLink('#features')}" class="nav__link">Diferenciais</a></li>
                        <li><a href="${getLink('#coverage')}" class="nav__link">Cobertura</a></li>
                        <li><a href="${getLink('#testimonials')}" class="nav__link">Clientes</a></li>
                        <li><a href="${getLink('#price-estimator')}" class="nav__link">Preço</a></li>
                        <li class="d-md-none mt-4 w-full">
                            <a href="tel:+5519993502969" class="btn btn--primary w-full">
                                <i class="fa-solid fa-phone"></i> Ligar Agora
                            </a>
                        </li>
                        <li class="d-none-md">
                            <a href="https://wa.me/5519993502969" class="btn btn--sm btn--primary">
                                <i class="fa-brands fa-whatsapp"></i> Chamar
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        `;

        const placeholder = document.getElementById('header-placeholder');
        if (placeholder) placeholder.replaceWith(header);
        else document.body.prepend(header);
    }

    function renderFooter() {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.id = 'footer';
        const year = new Date().getFullYear();

        footer.innerHTML = `
            <div class="container">
                <div class="footer__grid">
                    <!-- Brand Column -->
                    <div class="d-flex flex-col items-start gap-4">
                        <div class="logo">
                            <span class="logo__highlight">Chama o Guincho</span>
                        </div>
                        <p class="text-sm text-muted">
                            Guincho e reboque 24h em Campinas e região.
                            Segurança, preço justo e atendimento humanizado.
                        </p>
                        <div class="d-flex gap-2">
                            <a href="#" class="footer__social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="#" class="footer__social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>

                    <!-- Contact Column -->
                    <div class="d-flex flex-col gap-4">
                        <h4 class="h5">Contato Rápido</h4>
                        <ul class="d-flex flex-col gap-2 text-sm text-muted">
                            <li class="d-flex items-center gap-2">
                                <i class="fa-solid fa-phone text-primary"></i> (19) 99350-2969
                            </li>
                            <li class="d-flex items-center gap-2">
                                <i class="fa-brands fa-whatsapp text-primary"></i> (19) 99350-2969
                            </li>
                            <li class="d-flex items-center gap-2">
                                <i class="fa-solid fa-envelope text-primary"></i> contato@chamaoguincho.com.br
                            </li>
                        </ul>
                    </div>

                    <!-- Coverage Column -->
                    <div class="d-flex flex-col gap-4">
                        <h4 class="h5">Área de Atuação</h4>
                        <ul class="d-flex flex-col gap-2 text-sm text-muted">
                            <li><a href="${config.basePath}guincho-campinas/" class="hover:text-primary">Guincho em Campinas</a></li>
                            <li><a href="${config.basePath}guincho-sumare/" class="hover:text-primary">Guincho em Sumaré</a></li>
                            <li><a href="${config.basePath}guincho-hortolandia/" class="hover:text-primary">Guincho em Hortolândia</a></li>
                            <li><a href="${config.basePath}guincho-valinhos/" class="hover:text-primary">Guincho em Valinhos</a></li>
                        </ul>
                    </div>
                </div>

                <div class="mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted">
                    &copy; <span id="current-year">${year}</span> Chama o Guincho. Todos os direitos reservados.
                </div>
            </div>
        `;

        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) placeholder.replaceWith(footer);
        else document.body.appendChild(footer);
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
            <span class="notification__message">Mensagem de notificação</span>
            <button class="notification__close" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
        `;
        document.body.appendChild(notif);
    }

    function renderModals() {
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
            <!-- Generic Form Modal -->
            <div class="modal" id="modal-generic">
                <div class="modal__content">
                    <div class="modal__header">
                        <h3 class="modal__title" id="generic-modal-title">Título</h3>
                        <button class="modal__close" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal__body" id="generic-modal-body"></div>
                    <div class="modal__footer">
                        <button type="button" class="btn btn--ghost modal-close">Cancelar</button>
                        <button type="submit" id="generic-modal-submit" class="btn btn--primary">Enviar via WhatsApp</button>
                    </div>
                </div>
            </div>

            <!-- Success Modal -->
            <div class="modal" id="modal-success">
                <div class="modal__content text-center">
                    <div class="modal__header justify-center border-0 pb-0">
                        <div style="width: 4rem; height: 4rem; background: hsl(var(--success-bg)); color: hsl(var(--success)); border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div class="modal__body pt-4">
                        <h3 class="h4 mb-2">Tudo certo!</h3>
                        <p class="text-muted">Sua solicitação está pronta para ser enviada. Finalize o envio no WhatsApp.</p>
                        <a href="#" id="success-modal-whatsapp-btn" class="btn btn--whatsapp w-full mt-4">
                            <i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp
                        </a>
                    </div>
                    <div class="modal__footer justify-center border-0 pt-0 pb-6">
                        <button class="btn btn--ghost btn--sm modal-close">Fechar</button>
                    </div>
                </div>
            </div>

            <!-- Hidden Form Templates -->
            <div class="d-none">
                <form id="form-transporte-cidades">
                    <div class="form-group">
                        <label class="form-label">Nome</label>
                        <input type="text" name="Nome" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="tel" name="Telefone" class="form-control" required>
                    </div>
                    <div class="d-flex gap-4">
                        <div class="form-group w-full">
                            <label class="form-label">Origem</label>
                            <input type="text" name="Origem" class="form-control" required>
                        </div>
                        <div class="form-group w-full">
                            <label class="form-label">Destino</label>
                            <input type="text" name="Destino" class="form-control" required>
                        </div>
                    </div>
                </form>

                <form id="form-agendamento">
                    <div class="form-group">
                        <label class="form-label">Nome</label>
                        <input type="text" name="Nome" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" name="Data" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Veículo</label>
                        <input type="text" name="Veiculo" class="form-control" placeholder="Modelo / Marca" required>
                    </div>
                </form>

                <form id="form-oficinas">
                     <div class="form-group">
                        <label class="form-label">Nome</label>
                        <input type="text" name="Nome" class="form-control" required>
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
                        <label class="form-label">Tipo de Máquina</label>
                        <input type="text" name="Maquina" class="form-control" placeholder="Ex: Empilhadeira" required>
                    </div>
                </form>

                <form id="form-empresas">
                     <div class="form-group">
                        <label class="form-label">Nome da Empresa</label>
                        <input type="text" name="Empresa" class="form-control" required>
                    </div>
                     <div class="form-group">
                        <label class="form-label">Mensagem</label>
                        <textarea name="Mensagem" class="form-control" placeholder="Como podemos ajudar?" required></textarea>
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

    return { init };
})();
