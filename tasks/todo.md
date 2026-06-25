# Tasks — Pesquisa de Descoberta ERP

## T1 — Estrutura + i18n + identificação
**Status:** pending
**Dependências:** nenhuma

### Acceptance Criteria
- [ ] Seletor de idioma PT/EN funcional no topo
- [ ] Objeto i18n com todas as strings do formulário
- [ ] Campos obrigatórios: Nome, Empresa, Cargo
- [ ] Campo opcional: Email (com aviso "se não informar, não receberá as respostas")
- [ ] Sidebar de scoring removida
- [ ] Timeline de progresso mantida
- [ ] Identidade visual Ormind mantida
- [ ] Layout responsivo

---

## T2 — Conteúdo SPIN + lógica
**Status:** pending
**Dependências:** T1

### Acceptance Criteria
- [ ] Seções: Situação (3-4), Problema (4-5), Implicação (3-4), Need-payoff (3-4)
- [ ] Cada pergunta em PT e EN
- [ ] Pergunta final sutil sobre a solução (sem revelar que é sua ideia)
- [ ] Navegação linear funcional
- [ ] Progresso contador funcional
- [ ] Funciona em modo autosserviço e presencial

---

## T3 — Email + Vercel deploy
**Status:** pending
**Dependências:** T2

### Acceptance Criteria
- [ ] `api/send-email.js` criada e funcional
- [ ] SMTP configurado (credenciais do ormind-hub)
- [ ] Email chega em guilherme@ormind.com.br ao finalizar
- [ ] Cópia para respondedor se email informado
- [ ] `vercel.json` configurado
- [ ] Deploy no Vercel ok
- [ ] Link público acessível
