---
trigger: always_on
---

🏗️ Workspace Rules: Chama o Guincho (Vite/Tailwind/Hostinger)

1. Arquitetura CSS & Cascade (CRÍTICO)
Para evitar o problema de "Títulos Minúsculos" e conflitos de especificidade, siga estritamente esta ordem no arquivo de entrada CSS (
assets/css/input.css
):

Design Tokens: Variáveis CSS globais (:root).
Tailwind Base: @tailwind base; (O Reset do navegador).
Custom Base Styles: Seus estilos de tipografia e resets personalizados (ex:
style.css
). NOTA: Injete/concatene o conteúdo aqui. NÃO use @import após comandos @tailwind para evitar erros do PostCSS/Vite.
Tailwind Components: @tailwind components;.
Tailwind Utilities: @tailwind utilities;.
Regra de Ouro: Estilos personalizados de Tags (h1, p, body) DEVEM vir após @tailwind base para não serem sobrescritos pelo reset.

1. Padrões JavaScript (ES Modules)
Este projeto utiliza ES Custom Modules nativos.

NÃO use IIFE (
(function(){...})()
) para exportar módulos. Use export const UI = { ... }.
NÃO use DOMContentLoaded dentro de scripts type="module". Módulos já são diferidos (deferred) por padrão. A inicialização deve ser direta ou chamada explicitamente no HTML.
Tratamento de Erro: Funções que buscam elementos do DOM (ex: querySelector) devem verificar se o elemento existe antes de tentar manipulá-lo e logar um console.warn se falhar.
3. Workflow de Deploy (Hostinger)
O ambiente de produção é a Hostinger (Apache/LiteSpeed).

Build Artifact: O Vite constrói em dist, mas a Hostinger espera public_html.
Comando de Sync: Sempre que rodar npm run build, execute o script de sincronização para criar/atualizar a pasta public_html com:
Conteúdo de dist/.
Arquivos de configuração de servidor:
robots.txt
,
.htaccess
,
manifest.json
.
Conteúdo da pasta public/.
4. Direção de Arte & Microcopy (Premium/Trust)
Tom de Voz: Humano, Empático, Seguro e Transparente.
🚫 Evitar: Texto "pomposo" ou exagerado ("Tecnologia alienígena", "Líder mundial").
✅ Preferir: Fatos concretos e tranquilizadores ("Chegamos em 30 min", "Preço sem surpresas").
Design: Priorize fontes grandes, contraste alto e hierarquia visual clara. O usuário está em uma situação de stress (carro quebrado); a informação deve ser imediata.
5. Estrutura de Arquivos
Mantenha a lógica separada em assets/js/components/ (UI, Layout) e assets/js/modules/ (Lógica de negócio).
Importe dependências CSS globais no input.css para que o Vite faça o bundle único. Evite <link rel="stylesheet"> manuais no HTML para arquivos que podem ser processados pelo Vite.
