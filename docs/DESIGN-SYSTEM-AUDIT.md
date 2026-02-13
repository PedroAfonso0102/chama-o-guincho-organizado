# 🎨 Auditoria do Design System — Chama o Guincho

> **Data:** 07/12/2025  
> **Autor:** Design Ops Lead  
> **Status:** Análise Completa

---

## 📊 Resumo Executivo

### Diagnóstico Geral

| Aspecto | Status | Nota |
|---------|--------|------|
| **Cores** | ⚠️ Fragmentado | 3/5 |
| **Tipografia** | ✅ Bom | 4/5 |
| **Espaçamentos** | ⚠️ Inconsistente | 2/5 |
| **Componentes** | ✅ Padronizado | 4/5 |
| **CSS Variables** | ✅ Implementado | 4/5 |
| **Estilos Inline** | 🔴 Problemático | 1/5 |

### Principais Problemas Identificados

1. **35+ estilos inline** no HTML (cores, espaçamentos, tamanhos)
2. **4 cores hardcoded** fora do sistema de tokens
3. **Espaçamentos ad-hoc** sem padrão definido
4. **Duplicação** de valores entre CSS e HTML inline

---

## 🎨 1. AUDITORIA DE CORES

### 1.1 Cores no Design System (✅ Corretas)

O projeto já utiliza CSS Custom Properties baseadas no padrão shadcn/ui:

```css
:root {
    /* Neutras */
    --background: 0 0% 100%;           /* #FFFFFF */
    --foreground: 240 10% 3.9%;        /* #09090B */
    --muted: 240 4.8% 95.9%;           /* #F4F4F5 */
    --muted-foreground: 240 3.8% 46.1%; /* #71717A */
    
    /* Marca */
    --primary: 355 78% 56%;            /* #E63946 */
    --primary-foreground: 0 0% 98%;    /* #FAFAFA */
    
    /* Semânticas */
    --destructive: 0 84.2% 60.2%;      /* #EF4444 */
    --border: 240 5.9% 90%;            /* #E4E4E7 */
}
```

### 1.2 Cores FORA do Sistema (🔴 Fragmentação)

| Cor Hardcoded | Ocorrências | Uso | Recomendação |
|---------------|-------------|-----|--------------|
| `#25d366` | 3 | WhatsApp | Criar `--whatsapp` |
| `#1ebc57` | 1 | WhatsApp hover | Criar `--whatsapp-hover` |
| `#10b981` | 4 | Sucesso/Válido | Criar `--success` |
| `#047857` | 1 | Badge "Disponível" (inline) | Usar `--success-foreground` |
| `#1d4ed8` | 1 | Badge "30 min" (inline) | Criar `--info` |
| `#4b5563` | 2 | Texto cinza (inline) | Usar `--muted-foreground` |
| `#6b7280` | 1 | Texto secundário (inline) | Usar `--muted-foreground` |

### 1.3 Cores Inline no HTML (🔴 Crítico)

Encontradas **20+ ocorrências** de estilos inline com cores:

```html
<!-- index.html:176 -->
<span style="background: rgba(16, 185, 129, 0.2); color: #047857;">

<!-- index.html:177 -->
<span style="background: rgba(59, 130, 246, 0.2); color: #1d4ed8;">

<!-- index.html:184 -->
<p style="color: #4b5563;">

<!-- index.html:599 -->
<div style="background-color: #10b981; color: white;">
```

---

## 📝 2. AUDITORIA DE TIPOGRAFIA

### 2.1 Fonte Base (✅ Consistente)

- **Fonte:** Inter (via Google Fonts)
- **Fallback:** sans-serif

### 2.2 Escala Tipográfica (✅ Boa)

```css
h1: clamp(2.5rem, 5vw, 3.75rem)   /* 40px → 60px */
h2: clamp(2rem, 4vw, 3rem)        /* 32px → 48px */
h3: 1.5rem                         /* 24px */
body: 1rem                         /* 16px */
small: 0.875rem                    /* 14px */
xs: 0.75rem                        /* 12px */
```

### 2.3 Fragmentação Encontrada (⚠️ Atenção)

Valores inline duplicados:

| Valor | Ocorrências | Localização |
|-------|-------------|-------------|
| `font-size: 0.875rem` | 12 | Footer, badges, texto |
| `font-size: 0.75rem` | 4 | Badges, pills |
| `font-size: 1.25rem` | 2 | Subtítulos |
| `font-size: 1.125rem` | 3 | Texto destaque |
| `font-size: 3rem` | 2 | Ícones modal |

**Recomendação:** Criar classes utilitárias `.text-sm`, `.text-xs`, `.text-lg`

---

## 📐 3. AUDITORIA DE ESPAÇAMENTOS

### 3.1 Escala Base (Parcial)

Alguns espaçamentos seguem múltiplos de 4px:

```css
gap-2: 0.5rem   /* 8px */
gap-4: 1rem     /* 16px */
mt-4: 1rem      /* 16px */
mb-4: 1rem      /* 16px */
```

### 3.2 Valores Inconsistentes (🔴 Fragmentação)

| Valor | Ocorrências | Problema |
|-------|-------------|----------|
| `padding: 0.25rem 0.75rem` | 6 | Não segue escala |
| `margin-right: 0.5rem` | 6 | Inline repetido |
| `gap: 0.5rem` | 8 | Misturado com classes |
| `margin-bottom: 2rem` | 3 | Inconsistente |
| `margin-top: 1.5rem` | 2 | Inline desnecessário |

### 3.3 Espaçamentos Inline no HTML

```html
<!-- Repetição de padrões -->
<li><i style="margin-right: 0.5rem"></i> Texto</li>
<li><i style="margin-right: 0.5rem"></i> Texto</li>
<li><i style="margin-right: 0.5rem"></i> Texto</li>
```

**Recomendação:** Criar classe `.icon-text` ou `.icon-inline`

---

## 📦 4. AUDITORIA DE COMPONENTES

### 4.1 Componentes Bem Estruturados (✅)

- **Botões:** `.btn`, `.btn--primary`, `.btn--whatsapp`
- **Cards:** `.card`, `.card--service`, `.card--highlight`
- **Formulários:** `.form-group`, `.form-control`, `.form-label`
- **Modais:** `.modal`, `.modal__content`, `.modal__header`
- **Navegação:** `.nav`, `.nav__menu`, `.nav__link`

### 4.2 Componentes com Estilos Inline (⚠️)

| Componente | Problema |
|------------|----------|
| Hero Badges | Estilos hardcoded no HTML |
| Modal Success | Background verde inline |
| Footer Lists | `display: flex` inline |
| Hero Subtitle | Tamanho e cor inline |

---

## 🔄 5. MAPEAMENTO: LEGADO → TOKENS

### 5.1 Cores para Migração

| Valor Atual | Token Proposto | Variável CSS |
|-------------|----------------|--------------|
| `#25d366` | WhatsApp | `--whatsapp: 142 70% 49%` |
| `#1ebc57` | WhatsApp Hover | `--whatsapp-hover: 142 75% 43%` |
| `#10b981` | Success | `--success: 160 84% 39%` |
| `#047857` | Success Dark | `--success-foreground: 161 94% 18%` |
| `rgba(16,185,129,0.2)` | Success BG | `--success-bg: 160 84% 39% / 0.2` |
| `#1d4ed8` | Info | `--info: 226 83% 48%` |
| `rgba(59,130,246,0.2)` | Info BG | `--info-bg: 217 91% 60% / 0.2` |
| `#4b5563` | Gray 600 | Usar `--muted-foreground` |
| `#6b7280` | Gray 500 | Usar `--muted-foreground` |

### 5.2 Classes Utilitárias a Criar

```css
/* Tipografia */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }

/* Espaçamentos */
.mr-2 { margin-right: 0.5rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }

/* Componentes compostos */
.icon-inline { margin-right: 0.5rem; }
.badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
.badge--success { background: hsl(var(--success-bg)); color: hsl(var(--success-foreground)); }
.badge--info { background: hsl(var(--info-bg)); color: hsl(var(--info)); }
```

---

## 📋 6. PLANO DE MIGRAÇÃO GRADUAL

### Fase 1: Fundação (Semana 1) ✅

1. Criar arquivo `design-tokens.css` com todas as variáveis
2. Adicionar novas cores semânticas ao `:root`
3. Criar classes utilitárias de tipografia
4. Criar classes utilitárias de espaçamento

### Fase 2: CSS Cleanup (Semana 2)

1. Substituir cores hardcoded no `style.css` por variáveis
2. Unificar sombras (box-shadow) em variáveis
3. Criar variáveis para border-radius consistentes

### Fase 3: HTML Cleanup (Semana 3-4)

1. Substituir estilos inline no `index.html` por classes
2. Substituir estilos inline no `servicos.html` por classes
3. Criar componentes para badges, pills, etc.

### Fase 4: Documentação (Semana 5)

1. Criar Storybook ou página de componentes
2. Documentar padrões de uso
3. Definir guidelines para novos componentes

---

## 📄 7. ARQUIVO DE TOKENS PROPOSTO

Ver arquivo: `assets/css/design-tokens.css`

---

## 🚀 8. PRÓXIMOS PASSOS IMEDIATOS

1. [ ] Revisar e aprovar tokens propostos
2. [ ] Criar `design-tokens.css`
3. [ ] Atualizar `:root` no `style.css`
4. [ ] Migrar estilos inline prioritários (badges, modais)
5. [ ] Testar em produção

---

*Documento gerado automaticamente pela análise de Design Ops.*
