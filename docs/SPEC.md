# Almeida Mares — Plataforma de Gestão de Imóveis

> **Especificação de produto e arquitetura — versão 2026.1**
> SaaS interno + Portal do Proprietário para gestão de aluguéis por temporada (Airbnb, Booking.com, Vrbo, etc.)
> Stack: Next.js 16 + shadcn/ui + TypeScript + PostgreSQL
> Público-alvo: operação da Almeida Mares (admin), proprietários (leitura), equipe de limpeza/manutenção (operacional)

---

## 0. Princípios de design

Antes da árvore, os sete princípios que orientam **toda** decisão de produto:

1. **Zero duplo-lançamento.** Nada que seja calculável deve ser digitado. Se o Booking já mandou o valor, o sistema herda — o humano só concilia exceções.
2. **Calendário é fonte de verdade.** Disponibilidade, preço e bloqueio são modelados sobre o calendário, não sobre reservas.
3. **Imutabilidade financeira.** Lançamentos contábeis nunca são editados — são estornados com nova linha. Preserva auditoria e confiança do proprietário.
4. **Realidade de API em 2026.** Booking.com Connectivity é XML/Basic-Auth, não REST/OAuth. Airbnb Partner API exige aprovação formal e 6 meses de implementação mandatória por release — então o MVP **não** depende dela, usa iCal + ingestão de e-mail + (opcional) middleware certificado.
5. **Mobile-first para a operação, desktop-first para finanças.** A irmã edita planilha no computador mas acompanha check-in no celular.
6. **WhatsApp é o canal.** No Brasil, e-mail é segunda opção. Toda notificação crítica sai por WhatsApp Business antes de sair por e-mail.
7. **shadcn 100% + Radix + tokens.** Zero CSS-in-JS, zero lib de componente além do shadcn. Theming via CSS variables. Dark mode nativo. WCAG AA.

---

## 1. Identidade visual & Design System

### 1.1 Marca

- **Nome:** Almeida Mares
- **Posicionamento:** Gestão profissional e transparente de imóveis por temporada no litoral.
- **Tom:** institucional, confiável, "boutique hospitality" (estilo Sonder / Stripe), nada "startup fofa".

### 1.2 Tokens (shadcn `globals.css`)

```
--brand-primary: #0B4F6C   (azul profundo — "Mares")
--brand-accent:  #E6B85C   (areia/dourado — "Almeida")
--brand-ink:     #0A1F2B   (texto primário)
--brand-fog:     #F4F1EA   (fundo neutro claro)
--success:       #16A34A
--warning:       #F59E0B
--danger:        #DC2626
--radius:        0.75rem
--font-sans:     'Inter', 'Geist', system-ui
--font-display:  'Fraunces', serif   (só para cabeçalhos de relatórios)
```

### 1.3 Componentes shadcn utilizados (lista completa)

- **Estrutura:** `sidebar`, `sheet`, `separator`, `scroll-area`, `resizable`
- **Navegação:** `breadcrumb`, `tabs`, `navigation-menu`, `command` (⌘K palette)
- **Dados:** `data-table` (TanStack v8), `table`, `pagination`, `badge`, `avatar`
- **Formulário:** `form` (react-hook-form + zod), `input`, `select`, `combobox`, `calendar`, `date-range-picker`, `input-otp`, `switch`, `slider`, `textarea`, `checkbox`, `radio-group`
- **Feedback:** `toast` (sonner), `alert`, `alert-dialog`, `dialog`, `drawer`, `skeleton`, `progress`, `empty-state`
- **Display:** `card`, `chart` (Recharts), `hover-card`, `tooltip`, `popover`, `dropdown-menu`, `context-menu`, `carousel`
- **Blocos custom (do shadcn.io 2026):** `kanban-property-maintenance` (adaptado para limpeza), `calendar-gantt-multi`, `real-estate-map-block`

### 1.4 Regras de UX não-negociáveis

- Densidade de informação alta (é ferramenta de trabalho, não landing).
- Sidebar colapsável + `Sheet` drawer em `<768px`.
- Command palette (`⌘K` / `Ctrl+K`) acessa QUALQUER reserva, proprietário ou propriedade em 2 cliques.
- Toda tabela: sort + filter + column visibility + CSV export.
- Toda ação destrutiva: `AlertDialog` com digitação de confirmação.
- Skeleton em TODO fetch > 200ms. Nunca spinner no meio da tela.
- Atalhos: `g h` (home), `g r` (reservas), `g c` (calendário), `g p` (proprietários), `n r` (nova reserva), `?` (lista de atalhos).

---

## 2. Sitemap / Árvore de rotas

Estrutura de App Router (Next.js 16):

```
app/
├── (marketing)/                          # landing pública opcional
│   ├── page.tsx                          # "/"  — institucional Almeida Mares
│   ├── servicos/page.tsx
│   └── contato/page.tsx
│
├── (auth)/
│   ├── login/page.tsx                    # magic link + senha
│   ├── recuperar-senha/page.tsx
│   └── aceite/[token]/page.tsx           # convite de proprietário
│
├── (app)/                                # dashboard interno (sidebar)
│   ├── layout.tsx
│   ├── inicio/page.tsx                   # Painel de Controle
│   ├── calendario/page.tsx               # Gantt multi-propriedade
│   │   └── [reservaId]/                  # modal stacked route
│   ├── reservas/
│   │   ├── page.tsx                      # DataTable
│   │   ├── nova/page.tsx                 # reserva manual (bloqueio, direta, etc.)
│   │   └── [id]/
│   │       ├── page.tsx                  # detalhes
│   │       ├── financeiro/page.tsx
│   │       ├── mensagens/page.tsx
│   │       └── timeline/page.tsx
│   ├── mensagens/page.tsx                # inbox unificado
│   │   └── [threadId]/page.tsx
│   ├── proprietarios/
│   │   ├── page.tsx
│   │   ├── novo/page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── propriedades/page.tsx
│   │       ├── repasses/page.tsx
│   │       └── documentos/page.tsx
│   ├── propriedades/
│   │   ├── page.tsx
│   │   ├── nova/page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── canais/page.tsx           # vínculos com OTAs
│   │       ├── tarifas/page.tsx          # rate plans + sazonalidade
│   │       ├── fotos/page.tsx
│   │       ├── custos/page.tsx           # fixos + variáveis
│   │       └── checklist/page.tsx
│   ├── financeiro/
│   │   ├── page.tsx                      # overview
│   │   ├── fluxo-caixa/page.tsx
│   │   ├── contas-pagar/page.tsx
│   │   ├── contas-receber/page.tsx
│   │   ├── repasses/page.tsx             # fechamento mensal
│   │   ├── faturas/page.tsx              # PDFs das OTAs
│   │   └── conciliacao/page.tsx
│   ├── operacao/
│   │   ├── limpeza/page.tsx              # Kanban turnover
│   │   ├── manutencao/page.tsx           # Kanban ordens de serviço
│   │   ├── checkin-checkout/page.tsx     # lista diária
│   │   └── estoque/page.tsx              # amenities/enxoval
│   ├── relatorios/
│   │   ├── page.tsx
│   │   ├── por-proprietario/page.tsx
│   │   ├── por-propriedade/page.tsx
│   │   ├── ocupacao/page.tsx
│   │   ├── adr-revpar/page.tsx
│   │   ├── canais/page.tsx
│   │   └── gerar/[template]/page.tsx
│   ├── integracoes/
│   │   ├── page.tsx                      # status geral
│   │   ├── booking/page.tsx
│   │   ├── airbnb/page.tsx
│   │   ├── vrbo/page.tsx
│   │   ├── whatsapp/page.tsx
│   │   ├── pagamentos/page.tsx
│   │   └── contabil/page.tsx
│   ├── audit-log/page.tsx                # histórico imutável
│   └── configuracoes/
│       ├── conta/page.tsx
│       ├── equipe/page.tsx               # usuários + RBAC
│       ├── empresa/page.tsx              # dados Almeida Mares
│       ├── templates/page.tsx            # mensagens + relatórios
│       ├── webhooks/page.tsx
│       ├── api-keys/page.tsx
│       ├── plano/page.tsx                # (se virar SaaS pra outros gestores)
│       └── lgpd/page.tsx
│
├── (portal)/                             # portal do proprietário
│   ├── layout.tsx                        # UI simplificada
│   ├── painel/page.tsx
│   ├── calendario/page.tsx               # só leitura
│   ├── extratos/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx                 # PDF embed + download
│   ├── propriedades/page.tsx
│   ├── documentos/page.tsx
│   └── perfil/page.tsx
│
└── api/
    ├── webhooks/
    │   ├── booking/route.ts              # se/quando houver
    │   ├── airbnb/route.ts               # reservation.created etc
    │   ├── whatsapp/route.ts
    │   └── pagamentos/route.ts
    ├── cron/
    │   ├── sync-booking-reservations/route.ts   # a cada 20s via QStash
    │   ├── sync-ical/route.ts                   # a cada 10min
    │   ├── close-month/route.ts                 # dia 1 de cada mês
    │   └── send-daily-digest/route.ts
    └── trpc/[trpc]/route.ts
```

---

## 3. Árvore de features (o coração do documento)

### 3.1 Módulo: Painel de Controle (`/inicio`)

#### 3.1.1 Header de contexto
- Seletor global de período (Hoje / Semana / Mês / Trimestre / Ano / Custom com `date-range-picker`)
- Seletor global de propriedade(s) — multi-select com busca
- Comparativo automático vs. período anterior (delta %)

#### 3.1.2 KPIs (linha de `Card`s, todas com sparkline)
- **Taxa de ocupação** — noites vendidas ÷ noites disponíveis
- **Receita bruta** — soma dos valores totais das reservas no período
- **Receita líquida proprietários** — receita – OTA fee – taxa de gestão – custos
- **Taxa de gestão retida** — receita da Almeida Mares
- **ADR** (Average Daily Rate)
- **RevPAR** (Revenue per Available Room)
- **Ticket médio por estadia**
- **Pickup** (reservas confirmadas nos últimos 7d para as próximas 4 semanas)
- **LOS médio** (Length of Stay)
- **Lead time médio** (dias entre booking e check-in)
- **Reservas diretas vs. OTA** (%)

#### 3.1.3 Visões operacionais do dia
- **Check-ins hoje** — nome, propriedade, horário previsto, status (confirmado / chegou / atrasado), CTA "notificar limpeza"
- **Check-outs hoje** — mesma estrutura + CTA "agendar turnover"
- **Limpezas pendentes** — contador com link pro kanban
- **Mensagens não respondidas** — com SLA visual (verde <2h, amarelo 2-6h, vermelho >6h)

#### 3.1.4 Alertas inteligentes (feed cronológico)
- Conflito de calendário detectado (overbooking potencial)
- Reserva cancelada de última hora (<72h)
- Falha de sincronização com canal X há Y minutos
- Fatura da OTA divergente da reserva conciliada
- Proprietário com saldo a repassar > X dias
- Cartão virtual do hóspede ainda não cobrado / prestes a expirar
- Reserva sem limpeza agendada a <24h do check-in

#### 3.1.5 Widgets opcionais (drag-to-reorder)
- Gráfico de receita por canal (stacked bar — Booking, Airbnb, Vrbo, Direto)
- Heatmap de ocupação 90 dias
- Top 5 propriedades por receita
- Próximos repasses a pagar (calendário financeiro)

---

### 3.2 Módulo: Calendário Unificado (`/calendario`)

> **O coração do sistema.** Substitui o hábito de "olhar cada app separado".

#### 3.2.1 Visualizações
- **Gantt multi-propriedade** (padrão) — eixo Y = propriedades, eixo X = dias. Cada reserva é uma barra colorida por canal.
- **Grid mensal clássico** — uma propriedade por vez, estilo calendário
- **Lista cronológica** — útil em mobile
- **Visão de ocupação em calor** — % de ocupação por dia/semana/mês

#### 3.2.2 Controles
- Zoom: dia / semana / 2 semanas / mês / trimestre
- Filtros: canal, proprietário, cidade, tipo de imóvel, status
- Legenda de cores com toggle de camadas (bloqueios, reservas, manutenção, limpeza)
- Botão "hoje", navegação com teclado (`←` `→`)

#### 3.2.3 Interações
- Arrastar barra = mover datas (com validação anti-overbooking)
- Redimensionar barra = alterar check-in/out
- Click vazio = criar bloqueio ou reserva direta
- Hover = mini-preview (hóspede, valor, canal, status)
- Click na barra = drawer lateral com detalhes + ações

#### 3.2.4 Sincronização
- Badge por propriedade mostrando status de cada canal: `synced` (verde) / `syncing` (azul pulsante) / `stale` (amarelo, >15min) / `error` (vermelho)
- Botão "forçar sync" por propriedade
- Timestamp do último sync por canal
- Log de diffs (o que mudou no último sync)

#### 3.2.5 Detecção de conflito
- Overlay vermelho translúcido sobre janelas conflitantes
- Modal de resolução: escolher qual reserva prevalece, qual cancelar, qual mover
- Registro imutável no audit-log

---

### 3.3 Módulo: Reservas (`/reservas`)

#### 3.3.1 DataTable principal
- **Colunas:** status, canal (ícone), código, hóspede, propriedade, check-in, check-out, noites, valor bruto, taxa OTA, valor líquido, taxa de gestão, pagamento, origem
- **Filtros combinados:** período, canal, status, propriedade, proprietário, hóspede, faixa de valor
- **Ações em lote:** exportar, marcar como pago, enviar mensagem, mover status
- **Export:** CSV, XLSX, PDF
- **Densidade:** compact / comfortable / spacious
- **Saved views:** "Chegadas esta semana", "Pendentes de pagamento", "Canceladas últimos 30d"

#### 3.3.2 Status de reserva (máquina de estados)
`rascunho → pendente → confirmada → em_estadia → concluida → (cancelada | no_show | reembolsada)`

Cada transição: registro imutável + webhook interno + possível disparo de mensagem.

#### 3.3.3 Tela de detalhe (`/reservas/[id]`)

**Aba "Visão geral":**
- Header com status badge, canal, código OTA, CTA "abrir no canal"
- Bloco hóspede (nome, contato mascarado, país, idioma, preferências)
- Bloco estadia (datas, noites, adultos/crianças, LOS)
- Bloco valores (bruto, OTA fee, impostos, líquido, gestão, líquido proprietário)
- Bloco pagamento (VCC se Booking, status de captura, remetente)
- Bloco propriedade (link)
- Timeline de eventos (criada, mensagem enviada, check-in feito, limpeza agendada…)

**Aba "Financeiro":**
- Breakdown linha a linha (diária × N + cleaning fee + taxa extra + etc.)
- Deduções (OTA fee por regra do canal, impostos retidos, taxas de cartão)
- Lançamentos contábeis atrelados
- Anexo da fatura OTA

**Aba "Mensagens":**
- Thread do hóspede (unificada de todos os canais)
- Templates sugeridos (pré check-in, boas-vindas, pós check-out, review request)

**Aba "Timeline":**
- Auditoria completa (quem mudou o que, quando, de onde)

#### 3.3.4 Criação manual de reserva
- Wizard de 4 passos: propriedade → datas → hóspede → valor
- Validação anti-overbooking em tempo real
- Tipo: reserva direta / bloqueio (manutenção, uso do proprietário, hold)

---

### 3.4 Módulo: Caixa de Mensagens Unificada (`/mensagens`)

#### 3.4.1 Inbox (estilo Linear/Front)
- Três colunas: threads / conversa / contexto
- Filtros: canal, não-lidas, atribuídas a mim, SLA vencido
- Quick-reply com templates + variáveis (`{{hospede.primeiro_nome}}`, `{{checkin.data}}`, `{{propriedade.endereco}}`)
- Tradução automática (para hóspedes estrangeiros)
- Sugestão de resposta por IA (GPT-4o via API) com "editar antes de enviar" obrigatório
- Anexo de foto / PDF
- Marcação de thread como resolvida / follow-up em X dias

#### 3.4.2 Canais suportados
- Airbnb Messaging (via Partner API quando aprovada, ou inbox forwarding por enquanto)
- Booking.com Messaging (via Connectivity Messaging scope)
- WhatsApp Business Cloud API (oficial Meta)
- E-mail (IMAP/SMTP do domínio almeidamares.com.br)

#### 3.4.3 Automações
- Envio automático de boas-vindas 24h antes do check-in
- Envio automático de instruções de saída 12h antes do check-out
- Pedido de review 3h após check-out
- Follow-up de cobrança para reservas diretas não pagas

---

### 3.5 Módulo: Proprietários (`/proprietarios`)

#### 3.5.1 Lista
- Nome, propriedades, receita YTD, saldo a repassar, último repasse, status (ativo/pausado)

#### 3.5.2 Ficha do proprietário
- **Cadastro:** nome completo, CPF/CNPJ, RG, nacionalidade, e-mail, telefone, WhatsApp, endereço
- **Dados bancários:** banco, agência, conta, tipo, chave PIX (validação via API do banco quando possível)
- **Contrato:** arquivo PDF do contrato, data de início, tipo de comissão (% sobre bruto / % sobre líquido / fixo / híbrido), vigência, regras especiais
- **Propriedades vinculadas** (lista clicável)
- **Regras de repasse:** dia do mês, método (PIX/TED/boleto), retenções
- **Preferências de comunicação:** idioma, canal preferido, frequência de relatório

#### 3.5.3 Sub-abas
- **Repasses** — histórico + próximo valor previsto
- **Documentos** — contratos, DARFs, recibos, procurações
- **Extratos** — todos os relatórios mensais já enviados (com status de leitura/download)
- **Comunicações** — log de e-mails/WhatsApps enviados

---

### 3.6 Módulo: Propriedades (`/propriedades`)

#### 3.6.1 Lista (estilo "property cards")
- Foto capa, apelido, endereço curto, ocupação 30d, receita 30d, status canais (ícones Booking/Airbnb/Vrbo colorindo se OK/erro)

#### 3.6.2 Ficha da propriedade

**Aba "Geral":**
- Apelido interno (ex: "Casa Itacimirim 3 quartos")
- Endereço completo + geolocalização (mapa Mapbox/Google)
- Tipo (casa, apto, chalé, flat), nº quartos, banheiros, camas por tipo
- Capacidade máxima, pets, acessibilidade
- Amenities (checklist padrão OTA: piscina, AC, wifi velocidade, etc.)
- Proprietário vinculado
- Taxa de limpeza padrão
- Instruções de check-in (códigos, chaves, lockbox)
- Wi-Fi (SSID + senha — campo encriptado)
- Regras da casa (texto rico)

**Aba "Canais":**
- Vínculos ativos: Booking property ID, Airbnb listing ID, Vrbo ID
- Último sync por canal, próximo sync, status
- Botão "reconectar" / "desconectar"
- Mapping de room types entre canais

**Aba "Tarifas":**
- Tabela de tarifas base por tipo (fim de semana, semana, feriado)
- Sazonalidade (alta/média/baixa com datas)
- Descontos por LOS (7+ noites, 30+ noites)
- Tarifa mínima e máxima (guardrails)
- Integração opcional com PriceLabs / Wheelhouse para dynamic pricing
- Simulador: "quanto eu cobraria em X data?"

**Aba "Fotos":**
- Galeria com drag-reorder
- Push para canais (onde suportado)
- Metadados (alt text por idioma, categoria)

**Aba "Custos":**
- Custos fixos mensais (condomínio, internet, streaming, IPTU rateado)
- Custos variáveis (consumo de energia, manutenção esporádica)
- Fornecedores vinculados

**Aba "Checklist de turnover":**
- Lista padronizada (roupa de cama, amenities, vistoria, fotos pós)
- Template customizável por propriedade

---

### 3.7 Módulo Financeiro (`/financeiro`)

> **Este é o módulo que substitui o Excel. Prioridade #1 no MVP.**

#### 3.7.1 Contas a Receber
- Tabela de todas as reservas com status de recebimento
- Origem do dinheiro: VCC Booking / Payouts Airbnb / PIX direto / cartão gateway
- Previsão de entrada (data esperada do payout da OTA)
- Conciliação com extrato bancário (OFX import ou API Open Finance — Pluggy/Belvo)

#### 3.7.2 Contas a Pagar
- Repasses a proprietários (calculados automaticamente)
- Fornecedores (limpeza, manutenção, lavanderia)
- Impostos (DAS/MEI, ISS, IRPF Carnê-Leão quando aplicável)
- Despesas da própria Almeida Mares

#### 3.7.3 Fluxo de Caixa
- Gráfico de entradas/saídas projetadas (Recharts)
- Saldo por conta bancária
- Alertas de saldo negativo projetado

#### 3.7.4 Fechamento Mensal / Repasses

**Workflow:**
1. **Dia 1 do mês:** cron job agrega todas as reservas com check-out no mês anterior
2. Sistema gera **prévia do repasse** por proprietário:
   - Receita bruta por reserva
   - (–) Taxa da OTA (15% Booking / 3-15% Airbnb conforme modelo)
   - (–) Impostos retidos na plataforma
   - (–) Custos operacionais lançados (limpeza, manutenção)
   - (–) Taxa de gestão Almeida Mares (%)
   - (=) **Valor líquido a repassar**
3. **Revisão humana:** admin confere, ajusta, aprova
4. **Geração de documentos:**
   - Extrato PDF (branded Almeida Mares — cabeçalho, rodapé, QR code de validação)
   - Recibo de pagamento
   - Anexo: faturas originais das OTAs (baixadas automaticamente ou uploadadas)
5. **Execução:**
   - PIX em lote (integração com Banco Inter / Asaas / Stark Bank)
   - OU geração de arquivo CNAB 240 para upload no internet banking
6. **Notificação:**
   - E-mail para o proprietário com anexos
   - WhatsApp com link pro portal
   - Disponibilização no portal do proprietário
7. **Registro imutável** no audit-log

#### 3.7.5 Faturas OTA (Conciliação)
- Upload manual de PDF OU ingestão automática (IMAP + parser OCR com GPT-4o Vision)
- Vinculação automática reserva ↔ linha da fatura via código da reserva
- Flag de divergência quando valor da fatura ≠ valor no sistema
- Tabela de reconciliação com status: `match`, `partial`, `missing`, `extra`
- Export para contabilidade (layout Domínio/Contmatic)

#### 3.7.6 Plano de contas
- Hierárquico, editável, com códigos
- Pré-populado com plano de contas típico de hospitality (Brasil)
- Classificação automática por regra (ex: "qualquer entrada com 'AIRBNB' no extrato → conta 3.1.02")

---

### 3.8 Módulo: Operação (`/operacao`)

#### 3.8.1 Limpeza / Turnover (Kanban)
Colunas: **A agendar → Agendado → Em andamento → Aguardando vistoria → Concluído**

Card de turnover contém:
- Propriedade + foto
- Data/hora do check-out anterior e check-in seguinte (janela de turnover)
- Faxineira atribuída (avatar)
- Checklist com % de conclusão
- Fotos pós-limpeza
- Custo
- Status de pagamento à faxineira

Features:
- Drag-drop entre colunas
- Notificação WhatsApp automática pra faxineira quando cai em "Agendado"
- App mobile simples (PWA) pra faxineira fazer checklist e upload de fotos
- Alerta se janela de turnover < 3h (risco)

#### 3.8.2 Manutenção (Kanban)
Colunas: **Reportado → Agendado → Em andamento → Aguardando peça → Concluído**

Card de OS contém:
- Propriedade
- Tipo (elétrica, hidráulica, estética, jardinagem, equipamentos)
- Urgência (crítica / alta / média / baixa)
- Fornecedor atribuído
- Orçamento
- Fotos antes/depois
- Custo final
- Quem arca (proprietário / Almeida Mares)

#### 3.8.3 Check-in / Check-out do dia
- Lista com horário, hóspede, propriedade
- Status: `agendado → chegou → instalado → em estadia → saindo → saiu`
- Checklist de check-in (documento, contrato de locação temporada, caução)
- Botão "enviar instruções" (gera link com self check-in)

#### 3.8.4 Estoque
- Amenities (shampoo, sabonete, papel higiênico…) por propriedade
- Enxoval (toalhas, lençóis) com ciclo de vida
- Alerta de reposição baseado em consumo histórico
- Lista de compras gerada automaticamente

---

### 3.9 Módulo: Relatórios (`/relatorios`)

#### 3.9.1 Biblioteca de templates
- **Extrato Mensal do Proprietário** (o principal — substitui o Excel manual)
- Desempenho por propriedade (YoY, MoM)
- Desempenho por canal (comissão efetiva, conversão)
- Ocupação consolidada
- Pricing analysis (ADR vs. mercado via PriceLabs se integrado)
- Relatório fiscal (Carnê-Leão ready)
- Pipeline de reservas (forecast)
- Análise de cancelamentos
- Qualidade (rating médio, NPS, reviews)

#### 3.9.2 Gerador de relatórios
- Escolher template → escolher período → escolher escopo (proprietário/propriedade)
- Preview antes de gerar
- Format: PDF (com React-PDF + branding Almeida Mares), XLSX, CSV
- Envio: download / e-mail / WhatsApp / publicação no portal
- Agendamento recorrente (ex: "todo dia 5, enviar extrato para todos os proprietários")

#### 3.9.3 Estrutura do Extrato Mensal (PDF)
1. **Capa** — logo Almeida Mares, nome do proprietário, mês de referência, QR code de validação
2. **Resumo executivo** — ocupação, receita bruta, receita líquida, KPIs
3. **Detalhamento por propriedade** (se múltiplas)
4. **Reservas do período** — tabela linha a linha
5. **Deduções** — OTA fees, impostos, taxas de cartão
6. **Custos operacionais** — limpeza, manutenção, fornecedores
7. **Taxa de gestão Almeida Mares** — transparente, com % e memória de cálculo
8. **Valor líquido a repassar** — destaque
9. **Comparativo** — vs. mês anterior e vs. mesmo mês ano anterior
10. **Observações** — campo livre da gestora
11. **Anexos** — faturas originais das OTAs, notas fiscais de fornecedores, comprovante de PIX quando quitado

---

### 3.10 Módulo: Integrações (`/integracoes`)

#### 3.10.1 Booking.com Connectivity
> **Realidade 2026:** XML (OTA 2003B ou B.XML), Basic Auth, `secure-supply-xml.booking.com`, **rate limit de 1 chamada a cada 20s** no endpoint `/reservations`. Scopes granulares via Connections API.

**Fluxo de onboarding dentro do sistema:**
1. Admin solicita credencial de "Machine Account" no provider portal Booking
2. Cola username/password no sistema (armazenado criptografado, KMS)
3. Sistema chama `Connections API` pra listar connection requests pendentes das propriedades
4. Admin aceita os scopes desejados por propriedade: `Reservations`, `Rates and Availability`, `Messaging`, `Reporting`, `Content`, `Photos`, `Promotions`
5. Sistema começa polling `POST /hotels/xml/reservations` a cada 20s (único endpoint permitido nessa cadência)

**Cronjobs implementados:**
- `sync-booking-reservations` — 20s — `POST /reservations` (B.XML) retorna novos/modificados/cancelados desde último pull
- `sync-booking-summary` — 15min — `/reservationssummary` para reconciliação de segurança
- `push-rates` — sob demanda — `/roomrates` OTA
- `push-availability` — sob demanda — `/ARIUpdate` OTA

**Estados tratados:**
- Reserva nova (cria no banco, dispara webhooks internos)
- Modificação (datas, valores, hóspede)
- Cancelamento (com captura de motivo)
- No-show
- Virtual Credit Card status (pendente, carregado, expirado)

**Payload crítico a extrair:**
- `id`, `hotel_id`, `booked_at`, `commissionamount`, `currencycode`, `customer`, `date`, `status`, `totalprice`, `room` (child nodes), `cc_current_balance` (se Payments Clarity ativo)

#### 3.10.2 Airbnb Partner API
> **Realidade 2026:** `developer.airbnb.com`. Homes API + Activities API. Acesso **exige aprovação formal** no Partner Program (Preferred / Preferred+). NDA, security review, implementação mandatória de features em 6 meses.

**Estratégia realista em 3 fases:**

**Fase 0 (imediato, semana 1):**
- Sync por **link iCal** de cada anúncio (bidirecional onde Airbnb suporta)
- Sync a cada 10min via cronjob `sync-ical`
- Exportar iCal da Almeida Mares → apontar no Airbnb (pra bloquear datas)
- Importar iCal do Airbnb → atualizar calendário interno
- **Limitação conhecida:** iCal não traz valor financeiro, só datas e hóspede

**Fase 1 (1-3 meses, enquanto Partner não sai):**
- Ingestão de e-mails do Airbnb (IMAP dedicado: `airbnb@almeidamares.com.br`) com parser:
  - Nova reserva → extrai hóspede, datas, valor, taxa, payout
  - Cancelamento
  - Mensagem nova
- Parser com GPT-4o + fallback regex, ambos auditáveis
- Reviewer humano valida na UI antes de persistir (por segurança)

**Fase 2 (quando Airbnb aprovar, ~6-12 meses):**
- OAuth 2.0 + scopes (listings, reservations, messaging, availability, pricing, reviews)
- Webhooks: `reservation.created`, `reservation.accepted`, `reservation.cancelled`, `message.created`, `review.created`
- Push de tarifas, disponibilidade, fotos, descrição
- Resposta a reviews via API

**Alternativa intermediária (recomendada):**
- Integração com **middleware já certificado** (NextPax, Rentals United, Hostaway, Channex) como Channel Manager. Almeida Mares se plugga no middleware, middleware fala com Airbnb. Custo mensal, mas desbloqueia antes.

#### 3.10.3 Vrbo / Expedia Group
- API EPS Rapid + Vrbo Integrations — JSON/REST, OAuth — suporte planejado pós-MVP

#### 3.10.4 WhatsApp Business
- **Meta Cloud API** (oficial, gratuita até 1k conversas/mês)
- Templates aprovados: check-in confirmado, instruções de chegada, pós check-out, extrato disponível
- Número único +55 verificado
- Fallback Z-API em caso de restrição

#### 3.10.5 Gateways de pagamento
- **Stripe** (cartão internacional para reservas diretas)
- **Asaas / Mercado Pago / Stark Bank** (PIX + boleto + TED programado para repasses)
- **Pluggy / Belvo** (Open Finance para conciliação bancária)

#### 3.10.6 Contábil
- Export SPED (NF-e serviços quando aplicável)
- Integração com Domínio / Contmatic / Omie (via CSV padrão)

#### 3.10.7 Precificação dinâmica (opcional)
- **PriceLabs** (mais comum no Brasil) — API v2
- **Wheelhouse** — API
- Recomendação de tarifa → admin aprova → push pros canais

---

### 3.11 Módulo: Portal do Proprietário (`(portal)/*`)

> **Acesso read-only para o cliente da Almeida Mares.**
> Design simplificado (menos itens de sidebar, fontes maiores, zero jargão técnico).

#### 3.11.1 Autenticação
- Magic link por e-mail (padrão — sem senha)
- OTP por SMS como fallback
- Session de 30 dias com refresh

#### 3.11.2 Páginas

**`/portal/painel`:**
- "Olá, {{nome}}. Sua receita em [mês] foi R$ X."
- 4 KPIs grandes: ocupação, receita bruta, custos, líquido
- Gráfico de 12 meses
- Próximo repasse (valor e data)
- CTA: "Ver extrato completo"

**`/portal/calendario`:**
- Calendário simples das propriedades do proprietário
- Código de cores por status (sem dados de hóspedes — LGPD)

**`/portal/extratos`:**
- Lista de todos os extratos mensais
- Badge "novo" no mais recente
- Click abre PDF embed + download + todos os anexos

**`/portal/propriedades`:**
- Ficha resumida de cada propriedade (foto, ocupação, receita ano)
- Histórico de manutenções

**`/portal/documentos`:**
- Contrato de gestão, procuração, adendos, notas fiscais

**`/portal/perfil`:**
- Dados cadastrais (com request de alteração — não edita direto)

---

### 3.12 Módulo: Configurações (`/configuracoes`)

#### 3.12.1 Conta do usuário
- Nome, foto, e-mail, senha, 2FA (TOTP)
- Preferências: idioma, fuso horário, tema (claro/escuro/sistema), notificações

#### 3.12.2 Empresa Almeida Mares
- Razão social, CNPJ, endereço, telefone, e-mail institucional
- Logo (upload, usado em todos os PDFs)
- Dados bancários para recebimento
- Dados fiscais (regime tributário, CNAE, alíquotas)

#### 3.12.3 Equipe + RBAC
Papéis pré-definidos:
- **Owner** (a irmã): tudo
- **Gestor**: tudo exceto billing/plano e apagar dados
- **Financeiro**: módulo financeiro + relatórios
- **Operacional**: calendário, reservas, operação, mensagens
- **Faxineiro**: só módulo de limpeza (app PWA)
- **Manutenção**: só módulo de manutenção
- **Contador**: read-only em financeiro + export

Custom roles com permissões granulares (30+ flags).

#### 3.12.4 Templates
- Mensagens (boas-vindas, check-in, check-out, review request, cobrança) — multi-idioma
- Relatórios (extrato mensal com variações de layout)
- E-mails (HTML + texto)
- Contratos (de gestão, de locação por temporada)

#### 3.12.5 Webhooks e API Keys
- Webhooks de saída (pra integrações custom — ex: automação Zapier/Make)
- API Keys do próprio sistema (pra futuros clientes se virar SaaS)
- Logs de entrega com retry

#### 3.12.6 LGPD
- Política de privacidade customizada
- Gestão de consentimentos
- Export de dados pessoais (DSR - Data Subject Request)
- Anonimização / direito ao esquecimento
- Log de acessos a dados sensíveis

---

### 3.13 Módulo: Audit Log (`/audit-log`)

- Registro imutável (append-only) de **tudo**
- Filtros: usuário, entidade, tipo de evento, período
- Assinatura criptográfica por bloco (cadeia tipo hash-chain) pra garantir não-adulteração
- Export certificado pra eventual uso judicial

---

## 4. Modelo de dados (resumo)

Entidades principais (PostgreSQL, com Prisma/Drizzle):

```
organizations          (Almeida Mares — multi-tenant opcional)
users                  (admin, gestor, operacional, faxineiro...)
roles, permissions     (RBAC)
owners                 (proprietários)
properties             (imóveis)
property_channels      (N:N com channels — Booking/Airbnb IDs)
rate_plans             (tarifas base)
seasons                (sazonalidade)
channels               (Booking, Airbnb, Vrbo, Direto)
reservations           (core)
reservation_events     (state machine audit)
guests
messages, threads
payments
invoices               (faturas OTA)
expenses               (custos)
payouts                (repasses aos proprietários)
ledger_entries         (lançamentos contábeis imutáveis)
chart_of_accounts
tasks                  (limpeza + manutenção)
documents              (contratos, PDFs)
reports                (relatórios gerados)
audit_log              (tudo)
integrations           (credenciais encriptadas)
webhooks, api_keys
ical_feeds
```

Regras-chave:
- Soft delete em todas as entidades relevantes (`deleted_at`)
- `created_by`, `updated_by` em tudo
- Timestamps com timezone (`timestamptz`)
- `audit_log` nunca é deletado
- `ledger_entries` nunca é UPDATE — só INSERT (estorno)

---

## 5. Stack técnica (2026)

### 5.1 Frontend
- **Next.js 16** (App Router, React Server Components, streaming)
- **React 19**
- **TypeScript 5.6+** (strict)
- **shadcn/ui** + **Radix UI primitives**
- **Tailwind CSS 4** (com `@theme` + tokens)
- **TanStack Query v5** (mutations + cache)
- **TanStack Table v8** (DataTables)
- **Recharts** (gráficos — tema sincronizado com shadcn)
- **React Hook Form + Zod** (formulários + validação)
- **Framer Motion** (micro-interações)
- **date-fns** + **date-fns-tz** (datas com fuso America/Sao_Paulo)
- **nuqs** (query state)
- **cmdk** (command palette)

### 5.2 Backend
- **Node.js 22** + **Next.js API routes** para endpoints simples
- **tRPC v11** para type safety end-to-end (OU REST com OpenAPI se quiser expor público)
- **Hono** para webhooks de alta performance (se Next não bastar)
- **Prisma 6** ou **Drizzle ORM** (Drizzle preferido pra performance)
- **Zod** compartilhado entre front e back

### 5.3 Dados & infra
- **PostgreSQL 16** (Neon / Supabase / Railway)
- **Redis** (Upstash) — cache + rate limit + sessions
- **S3-compatible** (Cloudflare R2 ou AWS S3) — faturas, fotos, PDFs
- **QStash / Trigger.dev v3** — cron jobs e filas (inclusive o polling de 20s do Booking)
- **Resend** — transactional e-mail
- **WhatsApp Business Cloud API** (Meta) — mensagens
- **Clerk** OU **Auth.js v5** — autenticação + magic links + 2FA
- **Stripe** — cartão
- **Asaas / Stark Bank** — PIX / TED / boletos (Brasil)

### 5.4 Observabilidade
- **Sentry** — errors + performance
- **PostHog** — product analytics + session replay (com máscara de PII)
- **BetterStack / Axiom** — logs estruturados
- **Uptime Robot / BetterStack** — uptime monitors
- **Statuspage** público para proprietários

### 5.5 DevOps
- **Vercel** (frontend + API routes)
- **Railway / Fly.io** (workers Node pra cron de 20s + webhooks Booking)
- **GitHub Actions** — CI/CD + migrations
- **Terraform** — infra como código (opcional, recomendado pra disaster recovery)
- **Doppler / Vercel secrets** — gestão de secrets
- **Feature flags** — Vercel Flags SDK ou PostHog

### 5.6 Qualidade
- **ESLint** + **Biome** (Biome como formatter principal, mais rápido)
- **Vitest** (unit + integration)
- **Playwright** (E2E — inclusive fluxo de geração de extrato)
- **Storybook 8** (catálogo de componentes custom)
- **Chromatic** (visual regression)
- **Knip** (dead code)
- **Commitlint + Husky + lint-staged**

---

## 6. Compliance & legal (Brasil)

### 6.1 LGPD
- DPO nomeado (mesmo que seja a irmã inicialmente)
- Política de privacidade + termos de uso customizados
- Consentimento granular por finalidade
- Encrypted at rest (AES-256) + in transit (TLS 1.3)
- Retenção definida: reservas 5 anos, mensagens 2 anos, logs 1 ano
- Pseudonimização de dados de hóspede no portal do proprietário
- Processo de DSR (acesso, retificação, exclusão, portabilidade) em até 15 dias

### 6.2 Tributário (aluguel por temporada)
- **Pessoa física proprietária:** Carnê-Leão mensal (tabela progressiva), DARF código 0190
- **Pessoa jurídica proprietária:** competência dela, Almeida Mares emite NF de serviço de intermediação
- **Almeida Mares (PJ):** provavelmente Simples Nacional (Anexo III — serviços), NF-e de serviços
- **ISS:** varia por município — campo configurável
- Relatório Carnê-Leão-ready por proprietário

### 6.3 Contratos
- **Contrato de gestão** (Almeida Mares ↔ proprietário) — gerado pelo sistema com variáveis
- **Contrato de locação por temporada** (Almeida Mares ↔ hóspede) — opcional, mas recomendado; Lei 8.245/91 arts. 48-50

---

## 7. Roadmap (fases)

### Fase 0 — Discovery (2 semanas)
- Entrevista profunda com a irmã (dia típico, dores, fluxo atual)
- Auditoria dos Excels existentes (estrutura dos "compilados manuais")
- Levantamento de proprietários ativos e propriedades
- Definição de alíquotas e plano de contas

### Fase 1 — MVP (8-10 semanas)
Objetivo: **substituir o Excel**. No fim dessa fase a irmã não volta mais pra planilha.
- Auth + RBAC básico
- Cadastros (proprietários, propriedades, canais, tarifas)
- Calendário multi-propriedade (via **iCal** — Booking + Airbnb)
- Reservas manuais + ingestão iCal
- Financeiro: lançamentos, fechamento mensal, gerador de extrato PDF
- Upload manual de faturas OTA
- Repasse via PIX (Asaas)
- WhatsApp transacional (3 templates)
- Portal do proprietário (leitura)

### Fase 2 — Conectividade Booking (4-6 semanas)
- Onboarding com Machine Account
- Sync bidirecional Booking (reservas + tarifas + disponibilidade + messaging)
- Inbox unificada
- Conciliação automática de faturas Booking via OCR

### Fase 3 — Operação & Automação (4 semanas)
- Kanban limpeza + manutenção
- App PWA faxineira
- Automações (mensagens pré/pós estadia, alertas)
- Relatórios avançados (ADR, RevPAR, pickup)
- Dynamic pricing (PriceLabs opcional)

### Fase 4 — Airbnb Partner + Scale (8+ semanas)
- Submissão formal ao Partner Program
- Enquanto aguarda: middleware (NextPax/Rentals United) se fizer sentido econômico
- Vrbo
- Multi-tenant (se quiser vender pra outros gestores)

### Fase 5 — BI & Inteligência (contínuo)
- Dashboard exec com forecasting
- Análise competitiva de mercado
- Benchmarking entre propriedades
- Sugestão automática de ajuste tarifário

---

## 8. Métricas de sucesso do projeto

- **Tempo de fechamento mensal:** de ~X dias manuais → **< 30 minutos** com revisão humana
- **Erros de cálculo por mês:** > 0 → **0**
- **Overbookings:** eventual → **0** (com alertas preventivos)
- **NPS de proprietários:** linha de base no lançamento, +20 pontos em 6 meses
- **Taxa de ocupação média do portfólio:** +5pp em 12 meses (via pricing + pickup)
- **Horas/semana da irmã em tarefas operacionais:** redução ≥ 60%

---

## 9. Riscos & mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Airbnb Partner demora > 12 meses | Alto | Middleware + iCal + e-mail parser desde dia 1 |
| Booking muda schema XML | Médio | Layer de adapters + testes contract + alerta de drift |
| Perda de dados financeiros | Crítico | PITR no Postgres + backup S3 diário + ledger imutável |
| LGPD / vazamento de dados de hóspede | Crítico | Criptografia at-rest, logs de acesso, pseudonimização no portal |
| Limite 20s Booking → latência de reserva | Baixo | Reconciliação de segurança via `/reservationssummary` 15min |
| Irmã sobrecarregada na transição | Médio | Rollout gradual propriedade-a-propriedade, Excel ainda disponível 60 dias |
| Proprietário não confia no número novo | Médio | Transparência total no extrato + QR de validação + chat direto |

---

## 10. Próximos passos concretos

1. **Validar com a irmã** esta árvore — cortar o que não agrega, confirmar prioridades
2. **Registrar conta Connectivity Partner** no Booking (processo leva ~2-4 semanas)
3. **Criar app no `developer.airbnb.com`** e iniciar fila de aprovação (mesmo sabendo que demora)
4. **Provisionar infra mínima:** Vercel + Neon + R2 + Resend + WhatsApp Cloud API
5. **Scaffold do projeto:** `pnpm create next-app` + `shadcn init` + template `next-shadcn-dashboard-starter`
6. **Sprint 0:** design tokens Almeida Mares + auth + shell de layout
7. **Sprint 1:** cadastros + calendário iCal + primeira reserva manual end-to-end

---

*Documento vivo. Qualquer alteração passa por revisão da owner.*
*Última atualização: 2026-04-21.*
