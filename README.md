# Chama o Guincho

Este é um projeto de site para um serviço de guincho 24 horas. O site foi desenvolvido com foco em performance, usabilidade e SEO Local.

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)

## Estrutura do Projeto e Arquitetura (Diretrizes)

Este projeto adota uma arquitetura de **Site Estático** para garantir máxima performance e facilidade de hospedagem. Embora não utilizemos um framework como React ou Next.js, nem bundlers como Webpack, seguimos uma organização lógica para manter o código sustentável.

### Organização de Pastas (Lógica)

* **Raiz (`/`)**: Contém a `index.html` (Home - Foco em Campinas) e arquivos de configuração global.
* **Páginas de Cidades (`/guincho-{cidade}/`)**: Cada cidade atendida possui um diretório próprio com um arquivo `index.html`.
  * *Exemplo:* `/guincho-valinhos/index.html`, `/guincho-vinhedo/index.html`.
  * Isso garante URLs limpas e amigáveis para SEO (ex: `chamaoguincho.com.br/guincho-valinhos/`).
* **Assets (`/assets/`)**:
  * `/css`: Estilos globais.
  * `/js`: Lógica de interação (formulários, modais, cálculo de preço).
  * `/images`: Imagens otimizadas (WebP).

### Componentes Reutilizáveis

Como não há um processo de build, "componentes" como **Header** e **Footer** são replicados em cada arquivo HTML.

* **Diretriz de Manutenção:** Ao alterar o Header ou Footer na Home, a alteração deve ser replicada manualmente para todas as páginas de cidade (`guincho-*/index.html`).
* **Futuro:** Em caso de migração para um Gerador de Site Estático (SSG), esses blocos de código devem ser extraídos para uma pasta `/components` (ex: `Header.js`, `Footer.js`).

### Padrões de Nomeação

* **Arquivos e Pastas:** Sempre utilizar `kebab-case` (ex: `guincho-valinhos`, `style.css`).
* **IDs e Classes CSS:** Utilizar `kebab-case` (ex: `emergency-form`, `btn-primary`).

## Otimizações Implementadas

* **SEO Local:**
  * Páginas dedicadas para cidades satélites com conteúdo customizado (Title, Meta Description, H1).
  * Tags `Canonical` para evitar punição por conteúdo duplicado.
  * Schema.org (`AutoTowingService`) com `areaServed` detalhada.
* **Performance:**
  * Imagens em formato WebP.
  * Scripts deferidos (`defer`).
  * CSS crítico otimizado para Mobile First.

## Relatório de Mudanças (Últimos 5 Dias)

### Resumo Executivo

Nos últimos cinco dias, a base de código do site "Chama o Guincho" passou por uma refatoração significativa para melhorar sua estrutura, manutenibilidade e desempenho. O foco principal foi a redução da duplicação de código, a centralização da configuração e a otimização do carregamento de ativos. Essas mudanças resultaram em uma base de código mais robusta e escalável, mais fácil de gerenciar e estender no futuro.

### Relatório de Programação

#### 1. Refatoração do Manuseio de Formulários

* **O que foi alterado:** A lógica de manipulação de formulários em `assets/js/forms.js` foi completamente reformulada. Anteriormente, cada formulário tinha sua própria função dedicada para gerar and enviar uma mensagem de WhatsApp. Isso resultava em muito código duplicado.
* **Como foi alterado:** Implementei uma função genérica `sendWhatsAppMessage` que recebe um elemento de formulário e um título como argumentos. Essa função gera dinamicamente uma mensagem de WhatsApp com base nos campos de entrada do formulário e seus rótulos correspondentes. As funções individuais `send...WhatsApp` foram removidas, e a função `setupSpecificForm` foi atualizada para usar a nova função genérica.
* **Como o site está programado agora:** O manuseio de formulários agora é muito mais eficiente e de fácil manutenção. Para adicionar um novo formulário, você só precisa criar o HTML para o formulário e, em seguida, chamar a função `setupSpecificForm` com o ID do formulário, um título para a mensagem do WhatsApp e uma notificação de sucesso.

#### 2. Refatoração do Manuseio de Modais

* **O que foi alterado:** O site tinha um grande número de modais com estruturas muito semelhantes, o que levava a uma grande quantidade de HTML redundante.
* **Como foi alterado:** Substituí todos os modais individuais por uma única estrutura de modal genérica em `index.html`. O arquivo `assets/js/modals.js` foi atualizado para preencher dinamicamente este modal com o conteúdo correto com base nos atributos `data-modal`, `data-title` e `data-form-id` nos botões de acionamento. Os formulários que são exibidos nos modais agora são armazenados em uma `div` oculta e clonados no modal quando necessário.
* **Como o site está programado agora:** O sistema de modais agora é muito mais flexível e fácil de gerenciar. Para criar um novo modal, você só precisa adicionar um botão de acionamento com os atributos `data-` apropriados.

#### 3. Arquitetura Modular e Otimização de JavaScript

* **O que foi alterado:** A arquitetura de scripts foi migrada de um monolito para um sistema modular baseado em módulos ES6 em `/assets/js/modules/`.
* **Módulos Implementados:**
  * `app.js`: Ponto de entrada (Entry Point) principal.
  * `forms.js`: Centralização da lógica de formulários e integração com WhatsApp.
  * `modals.js`: Sistema genérico de modais via templates.
  * `ui.js`: Controladores de interface (animações, navegação, skeletons).
  * `calculator.js`: Motor de cálculo de preços dinâmicos.
  * `config.js`: Centralização de constantes de negócio.
  * `map.js`: Integração com mapas de cobertura.
* **Como o site está programado agora:** O site carrega um único bundle via `app.js` (em desenvolvimento via Vite, em produção via bundle otimizado). Isso garante baixo tempo de carregamento e alta manutenibilidade.

#### 4. Novo Sistema de Modais Genéricos

* **O que foi alterado:** Removidos modais redundantes e implementada uma estrutura única em `index.html` que é populada dinamicamente.
* **Funcionamento:** Botões agora usam `data-toggle="modal"` e `data-target="TEMPLATE_ID"` para disparar modais leves e performáticos.
* **Resultados:** Redução drástica de linhas de HTML repetidas e carregamento instantâneo de janelas de diálogo.

#### 5. Otimização de Ativos de Imagem

* **O que foi alterado:** O diretório `assets/images` continha imagens duplicadas, e muitas das imagens eram grandes e não otimizadas.
* **Como foi alterado:** Removi as imagens duplicadas do diretório.
* **Melhorias futuras:** Recomendo que as imagens sejam compactadas e convertidas para um formato mais moderno como WebP para melhorar ainda mais a velocidade de carregamento da página.

#### 5. Configuração Centralizada

* **O que foi alterado:** Valores embutidos para regras de preços e o número do WhatsApp estavam espalhados pelos arquivos JavaScript.
* **Como foi alterado:** Criei um arquivo `assets/js/config.js` para armazenar todos os valores de configuração em um único local centralizado. O arquivo `app.js` foi atualizado para usar os valores deste novo arquivo de configuração.
* **Como o site está programado agora:** Todos os valores de configuração agora são armazenados em um único arquivo, tornando-os muito mais fáceis de gerenciar e atualizar.

### Relatório de Usabilidade

A refatoração recente teve um impacto positivo na usabilidade do site, principalmente em termos de desempenho. Ao consolidar os arquivos JavaScript e remover imagens duplicadas, o site agora carrega mais rápido, proporcionando uma melhor experiência ao usuário. A acessibilidade do site já era boa e eu a mantive.

### Melhorias Futuras

* **Otimização de Imagens:** Conforme mencionado acima, as imagens devem ser compactadas e convertidas para o formato WebP para melhorar ainda mais o desempenho.
* **Minificação de Código:** Para um ambiente de produção, os arquivos `app.js` e `style.css` devem ser minificados para reduzir o tamanho do arquivo e melhorar ainda mais os tempos de carregamento.
* **Processo de Build Automatizado:** Um processo de build automatizado poderia ser implementado para lidar com a consolidação e minificação dos arquivos JavaScript e CSS automaticamente.
* **Integração com Backend:** Os formulários atualmente enviam dados via WhatsApp. Para uma solução mais robusta, os formulários poderiam ser integrados a um serviço de backend para armazenar os dados em um banco de dados e enviar notificações por e-mail.

## Como Executar o Projeto

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/chama-o-guincho.git
    ```

2. Abra o arquivo `index.html` em seu navegador.

## Contato

Para mais informações, entre em contato através do e-mail [afonsoguinchocampinas@gmail.com](mailto:afonsoguinchocampinas@gmail.com).
