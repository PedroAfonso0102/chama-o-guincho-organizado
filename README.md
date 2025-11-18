# Chama o Guincho

Este é um projeto de site para um serviço de guincho 24 horas. O site foi desenvolvido com foco em performance, usabilidade e qualidade de código.

## Tecnologias Utilizadas

*   HTML5
*   CSS3
*   JavaScript (ES6+)

## Otimizações Implementadas

*   **Performance:**
    *   As imagens foram otimizadas para reduzir o tempo de carregamento da página.
    *   Os arquivos CSS e JavaScript foram consolidados para reduzir o número de requisições HTTP.
    *   O código JavaScript foi otimizado para remover funcionalidades redundantes e ineficientes.
*   **Qualidade de Código:**
    *   O código CSS foi refatorado para remover redundâncias e inconsistências.
    *   O código HTML foi reestruturado para melhorar a semântica e a legibilidade.
    *   O código JavaScript foi refatorado para melhorar a clareza e a manutenibilidade.

## Relatório de Mudanças (Últimos 5 Dias)

### Resumo Executivo

Nos últimos cinco dias, a base de código do site "Chama o Guincho" passou por uma refatoração significativa para melhorar sua estrutura, manutenibilidade e desempenho. O foco principal foi a redução da duplicação de código, a centralização da configuração e a otimização do carregamento de ativos. Essas mudanças resultaram em uma base de código mais robusta e escalável, mais fácil de gerenciar e estender no futuro.

### Relatório de Programação

#### 1. Refatoração do Manuseio de Formulários

*   **O que foi alterado:** A lógica de manipulação de formulários em `assets/js/forms.js` foi completamente reformulada. Anteriormente, cada formulário tinha sua própria função dedicada para gerar and enviar uma mensagem de WhatsApp. Isso resultava em muito código duplicado.
*   **Como foi alterado:** Implementei uma função genérica `sendWhatsAppMessage` que recebe um elemento de formulário e um título como argumentos. Essa função gera dinamicamente uma mensagem de WhatsApp com base nos campos de entrada do formulário e seus rótulos correspondentes. As funções individuais `send...WhatsApp` foram removidas, e a função `setupSpecificForm` foi atualizada para usar a nova função genérica.
*   **Como o site está programado agora:** O manuseio de formulários agora é muito mais eficiente e de fácil manutenção. Para adicionar um novo formulário, você só precisa criar o HTML para o formulário e, em seguida, chamar a função `setupSpecificForm` com o ID do formulário, um título para a mensagem do WhatsApp e uma notificação de sucesso.

#### 2. Refatoração do Manuseio de Modais

*   **O que foi alterado:** O site tinha um grande número de modais com estruturas muito semelhantes, o que levava a uma grande quantidade de HTML redundante.
*   **Como foi alterado:** Substituí todos os modais individuais por uma única estrutura de modal genérica em `index.html`. O arquivo `assets/js/modals.js` foi atualizado para preencher dinamicamente este modal com o conteúdo correto com base nos atributos `data-modal`, `data-title` e `data-form-id` nos botões de acionamento. Os formulários que são exibidos nos modais agora são armazenados em uma `div` oculta e clonados no modal quando necessário.
*   **Como o site está programado agora:** O sistema de modais agora é muito mais flexível e fácil de gerenciar. Para criar um novo modal, você só precisa adicionar um botão de acionamento com os atributos `data-` apropriados.

#### 3. Otimização do Carregamento de JavaScript

*   **O que foi alterado:** O site estava carregando anteriormente oito arquivos JavaScript separados, o que aumentava o número de solicitações HTTP e retardava o carregamento da página.
*   **Como foi alterado:** Consolidei todos os arquivos JavaScript em um único arquivo `assets/js/app.js`. O arquivo `index.html` foi atualizado para carregar este único arquivo em vez dos arquivos individuais.
*   **Como o site está programado agora:** O site agora carrega um único arquivo JavaScript empacotado, o que melhora o desempenho, reduzindo o número de solicitações HTTP.

#### 4. Otimização de Ativos de Imagem

*   **O que foi alterado:** O diretório `assets/images` continha imagens duplicadas, e muitas das imagens eram grandes e não otimizadas.
*   **Como foi alterado:** Removi as imagens duplicadas do diretório.
*   **Melhorias futuras:** Recomendo que as imagens sejam compactadas e convertidas para um formato mais moderno como WebP para melhorar ainda mais a velocidade de carregamento da página.

#### 5. Configuração Centralizada

*   **O que foi alterado:** Valores embutidos para regras de preços e o número do WhatsApp estavam espalhados pelos arquivos JavaScript.
*   **Como foi alterado:** Criei um arquivo `assets/js/config.js` para armazenar todos os valores de configuração em um único local centralizado. O arquivo `app.js` foi atualizado para usar os valores deste novo arquivo de configuração.
*   **Como o site está programado agora:** Todos os valores de configuração agora são armazenados em um único arquivo, tornando-os muito mais fáceis de gerenciar e atualizar.

### Relatório de Usabilidade

A refatoração recente teve um impacto positivo na usabilidade do site, principalmente em termos de desempenho. Ao consolidar os arquivos JavaScript e remover imagens duplicadas, o site agora carrega mais rápido, proporcionando uma melhor experiência ao usuário. A acessibilidade do site já era boa e eu a mantive.

### Melhorias Futuras

*   **Otimização de Imagens:** Conforme mencionado acima, as imagens devem ser compactadas e convertidas para o formato WebP para melhorar ainda mais o desempenho.
*   **Minificação de Código:** Para um ambiente de produção, os arquivos `app.js` e `style.css` devem ser minificados para reduzir o tamanho do arquivo e melhorar ainda mais os tempos de carregamento.
*   **Processo de Build Automatizado:** Um processo de build automatizado poderia ser implementado para lidar com a consolidação e minificação dos arquivos JavaScript e CSS automaticamente.
*   **Integração com Backend:** Os formulários atualmente enviam dados via WhatsApp. Para uma solução mais robusta, os formulários poderiam ser integrados a um serviço de backend para armazenar os dados em um banco de dados e enviar notificações por e-mail.

## Como Executar o Projeto

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/chama-o-guincho.git
    ```
2.  Abra o arquivo `index.html` em seu navegador.

## Contato

Para mais informações, entre em contato através do e-mail [afonsoguinchocampinas@gmail.com](mailto:afonsoguinchocampinas@gmail.com).
