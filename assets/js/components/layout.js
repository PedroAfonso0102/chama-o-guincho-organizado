/**
 * @fileoverview Global Layout Components (Header, Footer, Modals)
 */

const Layout = (function() {

    let config = {
        basePath: './',
        activePage: 'home' // 'home' | 'services' | 'other'
    };

    function getLink(target) {
        // If we are on home, internal links are just #id
        // If we are elsewhere, they are basePath + index.html#id

        if (target.startsWith('#')) {
            if (config.activePage === 'home') {
                return target;
            } else {
                return `${config.basePath}index.html${target}`;
            }
        }

        // Handle specific page links
        if (target === 'index.html') {
             return `${config.basePath}index.html`;
        }
        if (target === 'servicos.html') {
             return `${config.basePath}servicos.html`;
        }

        // External or other links, prepend basePath if not absolute
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
                    <div class="logo__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="32"
                            viewBox="0 0 24 24" width="32" aria-hidden="true">
                            <g>
                                <rect fill="none" height="24" width="24" y="0" />
                            </g>
                            <g>
                                <path fill="currentColor"
                                    d="M19.48,12.35c-1.57-4.08-7.16-4.3-5.81-10.23c0.1-0.44-0.37-0.78-0.75-0.55C9.29,3.71,6.68,8,8.87,13.62 c0.18,0.46-0.36,0.89-0.75,0.59c-1.81-1.37-2-3.34-1.84-4.75c0.06-0.52-0.62-0.77-0.91-0.34C4.69,10.16,4,11.84,4,14.37 c0.38,5.6,5.11,7.32,6.81,7.54c2.43,0.31,5.06-0.14,6.95-1.87C19.84,18.11,20.6,15.03,19.48,12.35z M10.2,17.38 c1.44-0.35,2.18-1.39,2.38-2.31c0.33-1.43-0.96-2.83-0.09-5.09c0.33,1.87,3.27,3.04,3.27,5.08C15.84,17.59,13.1,19.76,10.2,17.38z" />
                            </g>
                        </svg>
                    </div>
                    <div class="logo__text">Chama o <span class="logo__highlight">Guincho</span></div>
                </a>

                <nav class="nav">
                    <button class="nav__toggle" id="nav-toggle" aria-label="Menu de navegação" aria-expanded="false">
                        <i class="fa-solid fa-bars" aria-hidden="true"></i>
                    </button>

                    <ul class="nav__menu" id="nav-menu">
                        <li><a href="${getLink('index.html')}" class="nav__link ${config.activePage === 'home' ? 'active' : ''}">Início</a></li>
                        <li><a href="${getLink('servicos.html')}" class="nav__link ${config.activePage === 'services' ? 'active' : ''}">Serviços</a></li>
                        <li><a href="${getLink('#features')}" class="nav__link">Diferenciais</a></li>
                        <li><a href="${getLink('#coverage')}" class="nav__link">Cobertura</a></li>
                        <li><a href="${getLink('#testimonials')}" class="nav__link">Atendimentos</a></li>
                        <li><a href="${getLink('#price-estimator')}" class="nav__link">Preço</a></li>
                        <li><a href="tel:+5519993502969" class="nav__link nav__link--cta btn btn--primary">
                                <i class="fa-solid fa-phone" aria-hidden="true"></i> Chamar Agora
                            </a></li>
                    </ul>
                </nav>
            </div>
        `;

        const placeholder = document.getElementById('header-placeholder');
        if (placeholder) {
            placeholder.replaceWith(header);
        } else {
            // Fallback
            document.body.prepend(header);
        }
    }

    function renderFooter() {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.id = 'footer';

        const year = new Date().getFullYear();

        footer.innerHTML = `
            <div class="container">
                <div class="footer__grid">
                    <div>
                        <div class="footer__logo">
                            <div class="logo__text text-white">Chama o Guincho</div>
                        </div>
                        <p style="font-size: 0.875rem;">
                            Guincho e reboque 24h em Campinas e região. Segurança e preço justo.
                        </p>
                        <div class="footer__social">
                            <a href="#" class="footer__social-link"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="#" class="footer__social-link"><i class="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>

                    <div>
                        <h3 class="h5 mb-4 text-white">Contato</h3>
                        <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
                            <li><i class="fa-solid fa-phone" style="margin-right: 0.5rem"></i> (19) 99350-2969</li>
                            <li><i class="fa-brands fa-whatsapp" style="margin-right: 0.5rem"></i> (19) 99350-2969</li>
                            <li><i class="fa-solid fa-envelope" style="margin-right: 0.5rem"></i> contato@chamaoguincho.com.br</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="h5 mb-4 text-white">Cidades</h3>
                        <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
                            <li><a href="${config.basePath}guincho-sumare/">Sumaré</a></li>
                            <li><a href="${config.basePath}guincho-hortolandia/">Hortolândia</a></li>
                            <li><a href="${config.basePath}guincho-indaiatuba/">Indaiatuba</a></li>
                            <li><a href="${config.basePath}guincho-valinhos/">Valinhos</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer__copy">
                    &copy; <span id="current-year">${year}</span> Chama o Guincho. Todos os direitos reservados.
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

        // Also add Scroll Top button
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.id = 'scrollTop';
        scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
        scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);

        // Notification container
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.id = 'notification';
        notif.innerHTML = `
            <i class="notification__icon fa-solid fa-circle-info" aria-hidden="true"></i>
            <span class="notification__message">Mensagem de notificação</span>
            <button class="notification__close" aria-label="Fechar notificação">
                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
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
                        <h3 class="modal__title" id="generic-modal-title">Título</h3>
                        <button class="modal__close" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
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
                    <div class="modal__header" style="background-color: #10b981; color: white;">
                        <h3 class="modal__title">Sucesso!</h3>
                        <button class="modal__close" style="color: white;"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal__body text-center">
                        <div style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;"><i class="fa-solid fa-circle-check"></i></div>
                        <h4 class="h5">Solicitação Recebida</h4>
                        <p>Clique abaixo para finalizar no WhatsApp.</p>
                        <a href="#" id="success-modal-whatsapp-btn" class="btn btn--whatsapp btn--lg w-full mt-4">
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
                        <textarea name="Mensagem" class="form-control" required></textarea>
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
