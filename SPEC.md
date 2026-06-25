# SPEC — Pesquisa de Descoberta: ERP Inteligente para Startups

## 1. Objective

Criar uma pesquisa de descoberta (survey) para validar a ideia de um **ERP inteligente mínimo** voltado para startups que acabaram de receber aporte financeiro e precisam estruturar um departamento financeiro do zero.

### Público-alvo
CFOs, controllers, diretores financeiros e outros decisores de finanças corporativas.

### Metodologia
- **Técnica SPIN** (Situação → Problema → Implicação → Need-payoff)
- **Pirâmide de Minto** (estrutura de cima pra baixo, agrupamento lógico)
- **Não enviesar**: perguntas indiretas; a solução idealizada só é mencionada sutilmente no final
- **Pergunta final sutil**: coletar percepção se a solução é suficiente sem revelar que é a sua ideia

## 2. Solução idealizada (não revelada na pesquisa)

Um ERP inteligente mínimo com:
- Abordagem agentiva (agentes de IA)
- Automação de tarefas financeiras
- MCP para integrar com chats de IA
- Capacidade dos usuários criarem features (sob supervisão)
- Opção de implementação pela empresa do pesquisador se o cliente não tiver TI

## 3. Features / Acceptance Criteria

### 3.1 Pesquisa funcional
- [ ] Pesquisa em português e inglês (seletor de idioma no topo)
- [ ] Estrutura SPIN: Situação (3-4 perguntas) → Problema (4-5) → Implicação (3-4) → Need-payoff (3-4)
- [ ] Pirâmide de Minto: perguntas agrupadas logicamente, cada grupo com conclusão implícita
- [ ] Pergunta final indireta sobre a solução (sem revelar que é sua ideia)
- [ ] Funciona em reunião presencial (entrevistador pergunta) ou autosserviço (usuário responde link)
- [ ] Seletor de idioma no topo (PT/EN) — todo o conteúdo muda de idioma

### 3.2 Identificação do respondedor
- [ ] Campos obrigatórios: nome, empresa, cargo
- [ ] Campo opcional: e-mail (com aviso: "se não informar, não receberá as respostas por e-mail")
- [ ] Aviso visível sobre o e-mail opcional

### 3.3 Salvamento de respostas
- [ ] Ao finalizar, enviar e-mail para o pesquisador (guilherme@ormind.com.br) com as respostas
- [ ] Se o respondedor informou e-mail, enviar cópia para ele também
- [ ] Usar SMTP do projeto Ormind/ormind-hub (mesma configuração já usada lá)

### 3.4 Deploy
- [ ] Publicar no Vercel (link acessível para o respondedor)
- [ ] Projeto atual `ormind-entrevista` adaptado (não criar repositório novo)

### 3.5 UX/UI
- [ ] Seletor de idioma visível e de fácil acesso
- [ ] Barra de progresso
- [ ] Design responsivo (mobile para responder de qualquer lugar)
- [ ] Confirmação visual ao finalizar
- [ ] Manter identidade visual Ormind (roxo, verde, coral, âmbar)

## 4. Commands

### `/build` (padrão, uma tarefa por vez)
Implementar seguindo TDD: escrever teste → implementar → verificar → commitar.

### `/build auto` (autônomo)
Gerar plano, aprovação única, executar todas as tarefas em ordem.

## 5. Tech Stack

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Frontend | HTML + CSS + JS vanilla | Já existe no projeto, zero dependências |
| Idioma | i18n inline (objeto JSON PT/EN) | Simples, sem framework |
| Email SMTP | Backend serverless (Vercel Functions) | Envio de email pós-submissão |
| Deploy | Vercel | Grátis, link público, fácil |
| Repositório | Este mesmo (ormind-entrevista) | Projeto já existe |

### Estrutura de arquivos
```
/
├── index.html          → Formulário principal (adaptado)
├── api/
│   └── send-email.js   → Vercel Function para envio de email via SMTP
├── .gitignore
├── vercel.json         → Config de deploy Vercel
├── README.md
└── SPEC.md
```

## 6. Test Strategy

- Teste manual: preencher formulário completo em PT e EN
- Teste de email: submeter resposta → verificar se chega o email
- Teste mobile: responsividade em viewport < 700px
- Teste de deploy: vercel deploy preview

## 7. Boundaries

### Always do
- Usar o máximo possível do CSS/HTML/JS existente
- Manter a identidade visual Ormind (cores, fontes, tom)
- SPIN de forma sutil — perguntas parecerem naturais, não um roteiro de vendas
- Seletor de idioma no topo, persistente durante toda a sessão
- Salvar respostas em memória + enviar email (sem backend de banco)

### Ask first about
- Estrutura exata das perguntas SPIN (quantidade, ordem) — o usuário final aprovou
- Configuração SMTP (host, porta, user, pass do projeto ormind-hub)
- Tom da pergunta final (o quão sutil vs explícita)

### Never do
- Não revelar a solução idealizada durante a pesquisa
- Não usar banco de dados (email é a persistência)
- Não criar repositório separado
- Não adicionar dependências JS (React, Vue, Tailwind)
- Não coletar dados sensíveis (senhas, documentos)
