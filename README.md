# Chama o Guincho - Plataforma de Auto-Socorro 24h

Bem-vindo ao repositório oficial do projeto **Chama o Guincho**. Este é um site estático de alta performance desenvolvido para um serviço de guincho e assistência automotiva na região de Campinas e RMC.

O projeto foca em **Velocidade (Core Web Vitals)**, **SEO Local** e **Conversão (UX Mobile-First)**, utilizando tecnologias modernas sem a sobrecarga de frameworks complexos.

---

## 🚀 Tecnologias e Ferramentas

*   **HTML5 Semântico:** Estrutura acessível e otimizada para SEO.
*   **CSS3 & Tailwind CSS:** Estilização utilitária com design tokens personalizados para consistência visual.
*   **JavaScript (ES6+):** Lógica modular (Vanilla JS) para interatividade, livre de dependências pesadas.
*   **Vite:** Ferramenta de build e servidor de desenvolvimento ultrarrápido.
*   **PostCSS:** Processamento de CSS moderno.
*   **Bibliotecas Auxiliares:**
    *   `imask`: Máscaras de input (telefones, etc).
    *   `toastify-js`: Notificações toast leves.
    *   `@formkit/auto-animate`: Animações automáticas de lista.

---

## 📂 Estrutura do Projeto

A arquitetura segue o padrão de **Site Estático** com organização modular de assets.

```text
/
├── assets/
│   ├── css/
│   │   ├── design-tokens.css   # Variáveis CSS (Cores, Tipografia, Espaçamentos)
│   │   └── input.css           # Diretivas Tailwind e Estilos Globais
│   ├── js/
│   │   ├── components/         # Componentes de UI (Layout, Cards)
│   │   ├── modules/            # Módulos funcionais (Forms, Mapa, Calculadora)
│   │   ├── services/           # Lógica de negócio pura (API, Preços)
│   │   └── app.js              # Ponto de entrada (Entry Point)
│   └── images/                 # Ativos de imagem otimizados (WebP)
├── dist/                       # Saída de produção (gerado pelo build)
├── public/                     # Arquivos estáticos copiados para a raiz
├── .gitignore
├── index.html                  # Página Principal (Home)
├── servicos.html               # Página de Serviços Detalhada
├── portfolio-labareda.html     # Landing Page Específica (Legado/Campanha)
├── package.json                # Dependências e Scripts
├── tailwind.config.js          # Configuração do Tailwind
└── vite.config.js              # Configuração do Vite
```

---

## 🛠️ Instalação e Uso

### Pré-requisitos

*   Node.js (versão 16 ou superior)
*   NPM ou Yarn

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/chama-o-guincho.git
    cd chama-o-guincho
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:5173` (ou porta similar).

4.  **Gere a versão de produção:**
    ```bash
    npm run build
    ```
    Os arquivos otimizados serão gerados na pasta `dist/`.

5.  **Visualize a versão de produção localmente:**
    ```bash
    npm run preview
    ```

---

## ✨ Funcionalidades Principais

### 1. 📱 Mobile-First & Responsivo
Interface projetada pensando primeiramente na experiência em dispositivos móveis, garantindo botões acessíveis, textos legíveis e navegação fluida em qualquer tamanho de tela.

### 2. 📍 Geolocalização Inteligente
*   Detecção automática da localização do usuário via API do navegador.
*   Cálculo de distância em tempo real utilizando OSRM (Open Source Routing Machine).
*   Preenchimento automático de endereços (Reverse Geocoding) via Nominatim/OpenStreetMap.

### 3. 💰 Calculadora de Preços Dinâmica
*   Estimativa de custo baseada na distância (KM) e tipo de veículo.
*   Regras de negócio configuráveis (Preço base, adicional noturno/fim de semana).
*   Feedback visual imediato para o usuário.

### 4. 💬 Integração com WhatsApp
*   Todos os formulários (Emergência, Agendamento, Orçamento) geram links diretos para a API do WhatsApp.
*   Mensagens pré-formatadas com os dados preenchidos pelo usuário, facilitando o atendimento.

### 5. 🗺️ Mapa de Cobertura Interativo
*   Visualização das cidades atendidas.
*   Atualização dinâmica do mapa ao selecionar uma região.

---

## 🎨 Design System e Estilização

O projeto utiliza um sistema de **Design Tokens** definido em `assets/css/design-tokens.css`. Isso garante que cores, tipografia e espaçamentos sejam consistentes em toda a aplicação.

*   **Primary Color:** Laranja Intenso (`hsl(25 95% 53%)`) - Foco em ação e urgência.
*   **Secondary/Background:** Tons de Cinza e Preto - Sofisticação e contraste.
*   **Tipografia:** Família Sans-Serif moderna para legibilidade máxima.

---

## 📝 Documentação do Código

O código JavaScript é documentado utilizando **JSDoc**.
*   **Services (`assets/js/services/`):** Classes estáticas contendo lógica pura e chamadas de API.
*   **Modules (`assets/js/modules/`):** Funções que conectam a lógica de negócio (Services) com a interface (DOM).
*   **Components (`assets/js/components/`):** Renderizadores de HTML reutilizável (Header, Footer, Cards).

---

## 🤝 Contribuição

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`).
3.  Commit suas mudanças (`git commit -m 'Adiciona funcionalidade X'`).
4.  Push para a Branch (`git push origin feature/MinhaFeature`).
5.  Abra um Pull Request.

---

## 📞 Contato e Suporte

Para suporte técnico ou dúvidas sobre o projeto:
*   **Email:** afonsoguinchocampinas@gmail.com
*   **WhatsApp:** (19) 99350-2969

---
&copy; 2024 Chama o Guincho. Todos os direitos reservados.
