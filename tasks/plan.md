# Plano: Pesquisa de Descoberta — ERP Inteligente

## Resumo

Adaptar o `index.html` existente do ormind-entrevista (questionário de scoring) para um
formulário de pesquisa de descoberta usando técnica SPIN (Situação → Problema → Implicação → Need-payoff),
com suporte PT/EN, campos de identificação do respondedor, e envio de respostas por email via SMTP.

## Dependências entre tarefas

```
T1 (base i18n + identificação)
 └─ T2 (conteúdo SPIN + lógica do formulário)
     └─ T3 (email function + vercel.json + deploy)
```

Cada tarefa é vertical: produz um `index.html` que já funciona parcialmente.

---

## T1 — Estrutura do formulário + i18n + identificação

**O que fazer:**
- Adicionar seletor de idioma PT/EN no topo da página
- Estruturar objeto i18n com TODAS as strings (títulos, placeholders, botões, labels)
- Substituir textos hardcoded no HTML e JS por referências ao `i18n[currentLang]`
- Redesenhar o cabeçalho do formulário: remover campos de lead da Ormind,
  adicionar campos obrigatórios (nome, empresa, cargo) + email opcional com aviso
- Remover sidebar de scoring, ring, dimensões, POC — não se aplica mais
- Manter timeline de progresso e identidade visual Ormind

**Critério de aceite:**
- Seletor de idioma visível no topo
- Ao trocar PT↔EN, labels de identificação mudam
- Formulário mostra campos: Nome*, Empresa*, Cargo*, Email (opcional) com aviso
- Layout responsivo funcional

**Checkpoint T1 ✅ → aprovação antes de T2**

---

## T2 — Conteúdo SPIN + lógica da pesquisa

**O que fazer:**
- Substituir as seções antigas (estrutura/dor/gatilho/canal) por seções SPIN:
  - **Situação** (3-4 perguntas): contexto atual, estrutura, ferramentas usadas
  - **Problema** (4-5 perguntas): dificuldades, dores, gaps
  - **Implicação** (3-4 perguntas): consequências dos problemas
  - **Need-payoff** (3-4 perguntas): o que seria ideal, valor de uma solução
- Cada pergunta em PT/EN no objeto i18n
- Pergunta final sutil sobre a solução idealizada (sem revelar que é sua ideia)
- Adaptar lógica JS para o novo formato (sem scoring, navegação linear SPIN)
- Adaptar export/timeline/progresso para o novo conteúdo

**Critério de aceite:**
- Todas as perguntas SPIN aparecem nos dois idiomas
- Navegação linear funcional
- Progresso contador de perguntas respondidas
- Pergunta final sutil no Need-payoff
- Funciona em modo autosserviço (respondedor sozinho) e presencial

**Checkpoint T2 ✅ → aprovação antes de T3**

---

## T3 — Envio de email + Vercel deploy

**O que fazer:**
- Criar `api/send-email.js` (Vercel Function) que recebe respostas via POST
  e envia email via SMTP (config do ormind-hub)
- Adicionar chamada fetch para a API ao finalizar formulário
- Criar `vercel.json` configurando serverless function
- Deploy no Vercel

**Critério de aceite:**
- Ao finalizar pesquisa, email chega em guilherme@ormind.com.br
- Se respondedor informou email, cópia chega pra ele também
- Link do Vercel acessível publicamente
- HTML funciona 100% em produção (sem erro CORS, sem broken paths)

**Checkpoint T3 ✅ → projeto finalizado**
