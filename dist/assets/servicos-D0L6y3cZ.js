import"./app-maXu92a5.js";const g=(function(){let t={basePath:"./",activePage:"home"};function o(a){return a.startsWith("#")?t.activePage==="home"?a:`${t.basePath}index.html${a}`:a==="index.html"?`${t.basePath}index.html`:a==="servicos.html"?`${t.basePath}servicos.html`:!a.startsWith("http")&&!a.startsWith("tel:")&&!a.startsWith("mailto:")?`${t.basePath}${a}`:a}function p(){const a=document.createElement("header");a.id="header",a.className="header fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur z-50 border-b border-white/10 shadow-2xl shadow-black/5 transition-all duration-300";const r=t.activePage==="home"?"#":`${t.basePath}index.html`;a.innerHTML=`
            <div class="container mx-auto px-4 h-full flex items-center justify-between">
                <a href="${r}" class="flex items-center gap-3 transition-transform hover:scale-105 duration-500">
                    <img src="${t.basePath}assets/images/logos/logo.svg" alt="Chama o Guincho Logo" class="h-10 w-auto">
                    <span class="flex flex-col leading-none">
                        <span class="text-lg font-black tracking-tighter uppercase">Chama o</span>
                        <span class="text-sm font-bold text-primary tracking-widest uppercase -mt-0.5">Guincho</span>
                    </span>
                </a>

                <nav class="hidden lg:flex items-center gap-8">
                    <ul class="flex gap-2">
                        <li><a href="${o("#urgent-request")}" class="btn btn-ghost btn-sm">Emergência</a></li>
                        <li><a href="${o("servicos.html")}" class="btn btn-ghost btn-sm ${t.activePage==="services"?"text-primary bg-primary/5":""}">Serviços</a></li>
                        <li><a href="${o("#price-estimator")}" class="btn btn-ghost btn-sm">Calcular Preço</a></li>
                        <li><a href="${o("#contact")}" class="btn btn-ghost btn-sm">Contato</a></li>
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
                <a href="${o("#urgent-request")}" class="btn btn-ghost w-full justify-start text-lg">Emergência</a>
                <a href="${o("servicos.html")}" class="btn btn-ghost w-full justify-start text-lg">Serviços</a>
                <a href="${o("#price-estimator")}" class="btn btn-ghost w-full justify-start text-lg">Calcular Preço</a>
                <a href="${o("#contact")}" class="btn btn-ghost w-full justify-start text-lg">Contato</a>
                <a href="https://wa.me/5519993502969" class="btn btn-primary w-full gap-2 mt-4">
                    <i class="fa-brands fa-whatsapp"></i> Chamar no WhatsApp
                </a>
            </div>
        `;const i=document.getElementById("header-placeholder");i?i.replaceWith(a):document.body.prepend(a);const n=a.querySelector("#nav-toggle"),s=a.querySelector("#nav-menu");n&&s&&n.addEventListener("click",()=>{s.classList.toggle("hidden")})}function u(){const a=document.createElement("footer");a.id="contact",a.className="bg-[#0A0A0B] text-white pt-24 pb-12 border-t border-white/5";const r=new Date().getFullYear();a.innerHTML=`
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
                    <div class="md:col-span-12 lg:col-span-5">
                        <div class="flex items-center gap-3 mb-8">
                            <img src="${t.basePath}assets/images/logos/logo.svg" alt="Chama o Guincho Logo" class="h-12 w-auto brightness-0 invert">
                            <span class="flex flex-col leading-none">
                                <span class="text-2xl font-black tracking-tighter uppercase">Chama o Guincho</span>
                                <span class="text-xs font-bold text-primary tracking-[0.3em] uppercase">Reboque Automotivo</span>
                            </span>
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
                        <h6 class="text-primary font-bold uppercase tracking-wider text-sm mb-6">Navegação</h6>
                        <ul class="space-y-4 text-white/60">
                            <li><a href="${o("#features")}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Diferenciais</a></li>
                            <li><a href="${o("#coverage")}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Cobertura</a></li>
                            <li><a href="${o("#price-estimator")}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Preço</a></li>
                            <li><a href="${o("#testimonials")}" class="hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span> Atendimentos</a></li>
                        </ul>
                    </div>

                    <div class="md:col-span-4 lg:col-span-2">
                        <h6 class="text-primary font-bold uppercase tracking-wider text-sm mb-6">Cidades</h6>
                        <ul class="space-y-4 text-white/60">
                            <li><a href="${t.basePath}guincho-sumare/" class="hover:text-white transition-colors">Sumaré</a></li>
                            <li><a href="${t.basePath}guincho-hortolandia/" class="hover:text-white transition-colors">Hortolândia</a></li>
                            <li><a href="${t.basePath}guincho-indaiatuba/" class="hover:text-white transition-colors">Indaiatuba</a></li>
                            <li><a href="${t.basePath}guincho-valinhos/" class="hover:text-white transition-colors">Valinhos</a></li>
                        </ul>
                    </div>

                    <div class="md:col-span-4 lg:col-span-3">
                        <h6 class="text-primary font-bold uppercase tracking-wider text-sm mb-6">Central 24h</h6>
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
                        &copy; ${r} Chama o Guincho. Todos os direitos reservados. <br class="md:hidden">
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
        `;const i=document.getElementById("footer-placeholder");i?i.replaceWith(a):document.body.appendChild(a)}function f(){const a=document.createElement("div");a.className="float-buttons",a.innerHTML=`
            <a href="https://wa.me/5519993502969" target="_blank" rel="noopener noreferrer" class="float-button float-button--whatsapp" aria-label="WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="tel:+5519993502969" class="float-button float-button--phone" aria-label="Ligar">
                <i class="fa-solid fa-phone"></i>
            </a>
        `,document.body.appendChild(a);const r=document.createElement("button");r.className="scroll-top",r.id="scrollTop",r.setAttribute("aria-label","Voltar ao topo"),r.innerHTML='<i class="fa-solid fa-arrow-up"></i>',document.body.appendChild(r);const i=document.createElement("div");i.className="notification",i.id="notification",i.innerHTML=`
            <i class="notification__icon fa-solid fa-circle-info" aria-hidden="true"></i>
            <span class="notification__message text-sm font-medium">Mensagem de notificação</span>
        `,document.body.appendChild(i)}function c(){const a=document.createElement("div");a.innerHTML=`
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
        `,document.body.appendChild(a)}function d(a={}){t={...t,...a},p(),u(),f(),c()}return{init:d}})(),b=(function(){let t={basePath:""};const o=[{icon:"fa-solid fa-car-burst",title:"Reboque de Emergência 24h",text:"Veículo quebrou ou sofreu colisão? Atendemos em até 30 minutos em Campinas e região. Guincho plataforma para transporte seguro.",isHighlight:!0,action:{type:"whatsapp",text:"CHAMAR NO WHATSAPP",link:"https://wa.me/5519993502969?text=Olá!%20Preciso%20de%20um%20guincho%20de%20emergência."}},{icon:"fa-solid fa-route",title:"Transporte Intermunicipal",text:"Transporte de veículos para qualquer cidade da região com total segurança e preço transparente.",action:{type:"modal",text:"Solicitar Orçamento",modalId:"generic",modalTitle:"Orçamento: Transporte para Outras Cidades",formId:"form-transporte-cidades"}},{icon:"fa-solid fa-calendar-days",title:"Agendamento de Transporte",text:"Planeje o transporte do seu veículo para revisão, eventos ou outras necessidades. Agende com antecedência.",action:{type:"modal",text:"Agendar",modalId:"generic",modalTitle:"Agendar Transporte",formId:"form-agendamento"}},{icon:"fa-solid fa-screwdriver-wrench",title:"Transporte para Oficinas",text:"Serviço de coleta e entrega do seu veículo na oficina de sua confiança. Condições especiais para oficinas.",action:{type:"modal",text:"Solicitar Orçamento",modalId:"generic",modalTitle:"Orçamento: Leva e Traz para Oficinas",formId:"form-oficinas"}},{icon:"fa-solid fa-boxes-packing",title:"Pequenas Máquinas",text:"Transporte especializado de empilhadeiras, equipamentos e maquinários leves com equipamentos adequados.",action:{type:"modal",text:"Solicitar Orçamento",modalId:"generic",modalTitle:"Orçamento: Transporte de Pequenas Máquinas",formId:"form-maquinas"}},{icon:"fa-solid fa-handshake",title:"Soluções Corporativas",text:"Parcerias estratégicas para empresas que necessitam de serviços de reboque confiáveis.",action:{type:"modal",text:"Falar com Consultor",modalId:"generic",modalTitle:"Contato: Soluções para Empresas",formId:"form-empresas"}}],p=[{icon:"fa-solid fa-user-tie",title:"Fale com o dono",text:"Você fala direto com o proprietário, sem intermediários."},{icon:"fa-solid fa-tag",title:"Preço justo",text:"Saiba o valor do serviço antes da contratação."},{icon:"fa-solid fa-truck",title:"Frota moderna",text:"Transportamos seu veículo com guinchos novos e seguros."},{icon:"fa-solid fa-map-location-dot",title:"Conhecemos a região",text:"Usamos as melhores rotas para chegar rápido."},{icon:"fa-solid fa-car",title:"Todo tipo de veículo",text:"Atendemos carros, motos, vans e até máquinas."},{icon:"fa-solid fa-clock",title:"Sempre disponível",text:"Estamos disponíveis 24 horas, todos os dias."}],u=[{id:"city-campinas",name:"Campinas"},{id:"city-indaiatuba",name:"Indaiatuba"},{id:"city-hortolandia",name:"Hortolândia"},{id:"city-sumare",name:"Sumaré"},{id:"city-americana",name:"Americana"},{id:"city-paulinia",name:"Paulínia"},{id:"city-valinhos",name:"Valinhos"},{id:"city-vinhedo",name:"Vinhedo"},{id:"city-jaguariuna",name:"Jaguariúna"},{id:"city-monte-mor",name:"Monte Mor"},{id:"city-nova-odessa",name:"Nova Odessa"},{id:"city-limeira",name:"Limeira"},{id:"city-sao-paulo",name:"São Paulo"},{id:"city-mogi-mirim",name:"Mogi Mirim"},{id:"city-piracicaba",name:"Piracicaba"}],f=[{title:"Transporte Técnico de Alto Valor",text:"Protocolo zero‑dano para veículos premium; cintas de roda e plataforma ajustada.",tag:"Serviço Especializado",stars:5,image:"assets/images/p01.jpg",alt:"Guincho carregando BMW X6 com cintas de roda, amarração técnica sem contato com a lataria."},{title:"Prontidão Operacional 24h",text:"Capacidade para SUVs e blindados; resposta rápida em rodovias e perímetros urbanos.",tag:"Emergência 24h",stars:5,image:"assets/images/p02.jpg",alt:"Guincho transportando viatura policial SUV, demonstrando capacidade de carga e amarração segura."},{title:"Resgate em Acesso Restrito",text:"Extração segura em subsolos e garagens com equipamento compacto e operadores treinados.",tag:"Acesso Difícil",stars:5,image:"assets/images/p03.jpg",alt:"Guincho realizando manobra próxima a condomínio, mostrando extração em acesso restrito."}];function c(n){const s=document.querySelector(n);s&&(s.innerHTML=o.map((e,l)=>{const m=e.isHighlight,h=e.action.type==="whatsapp"?`<a href="${e.action.link}" class="btn ${m?"btn-primary shadow-lg shadow-primary/20":"btn-outline"} btn-sm w-full gap-2 mt-auto hover:-translate-y-0.5 transition-all">
                    <i class="fa-brands fa-whatsapp"></i> ${e.action.text}
                   </a>`:`<button class="btn btn-outline btn-sm w-full mt-auto hover:-translate-y-0.5 transition-all" 
                    data-toggle="modal" data-target="generic-modal" 
                    data-title="${e.action.modalTitle}" 
                    data-form-id="${e.action.formId}">
                    ${e.action.text}
                   </button>`;return`
                <div class="group relative flex flex-col p-8 rounded-3xl bg-card border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 animate-on-scroll stagger-${l%3+1}">
                    <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6">
                        <i class="${e.icon}"></i>
                    </div>
                    <div class="flex flex-col flex-grow">
                        <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">${e.title}</h3>
                        <p class="text-muted-foreground text-sm leading-relaxed mb-8">${e.text}</p>
                    </div>
                    ${h}
                    ${m?'<div class="absolute top-4 right-4"><span class="badge badge-success badge-sm py-3 px-3 text-white">24h</span></div>':""}
                </div>
            `}).join(""))}function d(n){const s=document.querySelector(n);s&&(s.innerHTML=p.map((e,l)=>`
            <div class="flex gap-4 items-start p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-in-out border border-transparent hover:border-primary/10 group animate-on-scroll stagger-${l%3+1}">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <i class="${e.icon}"></i>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">${e.title}</h3>
                    <p class="text-muted-foreground text-sm leading-tight">${e.text}</p>
                </div>
            </div>
        `).join(""))}function a(n){const s=document.querySelector(n);s&&(s.innerHTML=u.map(e=>`
            <button class="btn btn-outline btn-sm rounded-full animate-on-scroll hover:bg-primary hover:text-white hover:border-primary transition-all">
                ${e.name}
            </button>
        `).join(""))}function r(n){const s=document.querySelector(n);s&&(s.innerHTML=f.map((e,l)=>{const m=Array(e.stars).fill('<i class="fa-solid fa-star"></i>').join("");return`
            <div class="card card--case-study bg-card border border-border overflow-hidden h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-in-out group animate-on-scroll stagger-${l%3+1}">
                <div class="relative h-48 overflow-hidden">
                    <img src="${t.basePath}${e.image}" alt="${e.alt}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div class="card-body p-6 relative">
                    <div class="flex gap-1 text-warning text-sm mb-3">${m}</div>
                    <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">${e.title}</h3>
                    <p class="text-muted-foreground text-sm leading-relaxed">${e.text}</p>
                    <div class="mt-4 pt-4 border-t border-border flex items-center gap-3">
                        <span class="badge badge-primary/10 text-primary border-none font-bold text-xs uppercase tracking-wider">${e.tag}</span>
                    </div>
                </div>
            </div>
        `}).join(""))}function i(n={}){t={...t,...n},c(".services__grid"),d(".features__list"),a(".coverage__cities"),r(".testimonials__list")}return{init:i,renderServices:c,renderFeatures:d,renderCoverageCities:a,renderTestimonials:r}})();document.addEventListener("DOMContentLoaded",()=>{g.init({basePath:"./",activePage:"services"}),b.init()});
