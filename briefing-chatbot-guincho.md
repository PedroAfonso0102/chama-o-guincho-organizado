# Briefing: Frontend com Chatbot para Registro de Corridas (Guincho Copilot)

> **Status**: Rascunho Inicial
> **Destinado a**: Engenharia de Software / Product Design
> **Contexto**: Chama o Guincho (Operação Interna / Motoristas)

---

## 1. Visão Geral e Objetivo
Criar uma interface frontend focada no motorista ("Guincheiro") para **registro e acompanhamento de corridas** através de um **Chatbot Inteligente (LLM)**.

**A Dor:** O motorista está no trânsito, com graxa na mão ou com pressa. Preencher formulários com `select` boxes, datas e campos de texto é cognitivamente custoso e propenso a falhas.
**A Solução:** Uma interface de chat minimalista ("WhatsApp-like") onde o motorista envia áudio ou texto livre, e a IA estrutura esses dados no banco de dados.

---

## 2. Princípios de Design & UX (Cognitive Load Minimizer)
*Ref: @[/ux-cognitive-load-minimiser], @[/advanced-art-direction-and-atmosphere]*

1.  **Zero "Frufru", Máxima Eficiência**:
    - Sem animações de entrada demoradas.
    - Botões gigantes (hit area > 48px).
    - **Dark Mode Obrigatório**: Previne ofuscamento durante operações noturnas.

2.  **Interação Assimétrica**:
    - **Input do Motorista**: Desleixado, informal, rápido (ex: áudio, gírias, texto curto).
    - **Processamento do Sistema**: Estruturado, formal, preciso (JSON no banco).

3.  **Feedback Visual Imediato**:
    - Status de "Ouvindo/Processando" claro.
    - Confirmação visual de dados críticos (Valor, Origem, Destino) antes de salvar.

---

## 3. Funcionalidades Core (Divergent Feature Explorer)
*Ref: @[/brainstorm-divergent-feature-explorer]*

### 3.1. O "Bot Despachante" (Core)
O motorista envia mensagens como:
> *"Levei um Corolla da Norte Sul praunicamp agora, cobrei 180 no pix."*

O sistema (LLM) deve:
1.  **Extrair Entidades**:
    - **Veículo**: Toyota Corolla.
    - **Origem**: Av. Norte-Sul, Campinas (Inferência de cidade baseada no contexto).
    - **Destino**: Unicamp.
    - **Valor**: R$ 180,00.
    - **Pagamento**: Pix.
    - **Data/Hora**: `NOW()`.
2.  **Responder**: Confirmação resumida ("Registrado: Corolla, N-Sul -> Unicamp, R$ 180 (Pix). Confere?").
3.  **Ação**: Botão [Confirmar] ou [Corrigir].

### 3.2. Retrieval & Assistência (RAG Simples)
Permitir perguntas sobre o histórico:
- *"Quanto eu fiz hoje?"* -> Query no DB -> Soma do dia.
- *"Qual foi a corrida das 14h?"* -> Busca no histórico.

### 3.3. Painel de Bordo (Dashboard Minimalista)
Uma view secundária acessível por swipe ou tab única:
- Meta do dia (Barra de progresso).
- Lista das últimas 5 corridas (Card simples).

---

## 4. Arquitetura Técnica Sugerida
*Stack alinhada ao projeto atual (Vite/Tailwind)*

### Frontend (Client)
- **Framework**: HTML5 + JS Modules (Manter padrão atual) ou React (se a complexidade de estado do chat justificar).
- **UI Kit**: Tailwind CSS (Cores de alto contraste: Amarelo Segurança, Preto Absoluto, Cinza Chumbo).
- **Audio API**: Web Speech API para *speech-to-text* nativo ou integração com API de transcrição (Whisper) se a precisão nativa for ruim.

### Backend (Serverless/Edge)
- **API Wrapper**: Netlify Functions ou Supabase Edge Functions.
- **LLM**: OpenAI GPT-4o-mini ou Gemini Flash (Baixa latência/custo).
    - *Prompt System*: "Você é um despachante de guincho eficiente. Extraia JSON deste texto..."
- **Database**: Supabase (PostgreSQL) ou Firebase.
    - Tabela: `rides` (id, driver_id, origin, destination, value, payment_method, vehicle_type, raw_input, status, created_at).

---

## 5. Microcopy & Tom de Voz
*Ref: @[/ux-microcopy-and-content-strategist]*

- **Bot**: "Despachante Digital".
- **Tom**: Curto, direto, parceiro.
    - *Ruim*: "Por favor, informe os dados da corrida para que possamos processar."
    - *Bom*: "Manda a corrida. Ouvi."
    - *Erro*: "Não entendi o valor. Foi quanto?" (Em vez de "Erro de validação").

---

## 6. Roadmap de Implementação (Sugestão)

1.  **Fase 1: Interface & Mock**:
    - Criar layout do Chat (Input fixo rodapé, área de mensagens scrollável).
    - Criar Cards de "Corrida Identificada".

2.  **Fase 2: Conexão LLM**:
    - Implementar função de envio de texto p/ API.
    - Testar prompts de extração de dados.

3.  **Fase 3: Persistência**:
    - Conectar ao Banco de Dados para salvar confirmações.

4.  **Fase 4: Voz (Opcional/Fase 2)**:
    - Adicionar botão de microfone.

---

## 7. Próximos Passos
1.  Aprovar este briefing.
2.  Definir tecnologia de Banco de Dados (Supabase recomendado pela facilidade com JS).
3.  Iniciar prototipação da UI no arquivo `driver.html` (novo entrypoint).
