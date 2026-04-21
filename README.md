# Almeida Mares

Plataforma de gestão profissional de imóveis por temporada.
Unifica Airbnb, Booking.com, Vrbo e canais diretos em um só dashboard, com
relatórios financeiros automáticos e portal transparente para proprietários.

> Esta é a versão de demonstração: dados fictícios, tudo navegável, nenhum
> cadastro necessário.

## Demo online

- **Landing**: `/`
- **Dashboard operacional**: `/app/inicio`
- **Portal do proprietário**: `/portal/painel`

Deploy automático: qualquer push em `main` é publicado pela Vercel.

## Stack

| Camada              | Tecnologia                                                     |
| ------------------- | -------------------------------------------------------------- |
| Framework           | Next.js 16 (App Router, Turbopack, RSC)                        |
| Linguagem           | TypeScript 5                                                   |
| UI kit              | shadcn/ui (Base UI + Tailwind CSS 4 + tokens OKLCH)            |
| Charts              | Recharts                                                       |
| Ícones              | lucide-react                                                   |
| Dark mode           | next-themes (com token CSS `.dark`)                            |
| Tipografia          | Geist Sans · Geist Mono · Fraunces (display)                   |

As cores da marca (azul profundo do mar + dourado da areia) estão em
`web/src/app/globals.css` (tokens `--primary`, `--accent`, `--chart-*`).

## Rodar localmente

```bash
cd web
npm install
npm run dev       # http://localhost:3000
npm run build     # build de produção
npm start         # servir produção local
```

## Estrutura de rotas

```
app/
├── page.tsx                  Landing pública
├── login/                    Magic link (UI estática)
├── app/                      Dashboard operacional (Almeida Mares)
│   ├── inicio/               KPIs, gráficos, check-ins, alertas
│   ├── calendario/           Gantt multi-propriedade
│   ├── reservas/             Tabela de reservas (todos os canais)
│   ├── mensagens/            Inbox unificado com IA
│   ├── proprietarios/        Carteira de clientes
│   ├── propriedades/         Cards com ocupação e sync por canal
│   ├── financeiro/           Fechamento mensal + reconciliação de faturas
│   ├── relatorios/           Templates prontos (PDF, XLSX, Carnê-Leão)
│   ├── operacao/             Kanban de limpeza/turnover
│   ├── integracoes/          Status das APIs (Booking, Airbnb, etc)
│   ├── auditoria/            Log imutável com hash assinado
│   └── configuracoes/        Empresa, equipe, templates, LGPD
└── portal/                   Portal do proprietário (view isolada)
    ├── painel/               Próximo repasse + KPIs
    ├── calendario/           Calendário dos imóveis do proprietário
    ├── extratos/             Histórico de repasses (PDF + anexos)
    ├── propriedades/         Imóveis do proprietário
    ├── documentos/           Contratos e procurações
    └── perfil/               Dados e conta de recebimento
```

## Especificação técnica completa

A arquitetura, o modelo de dados, as integrações reais com Booking
(Connectivity API / B.XML) e Airbnb (iCal + Partner Program) e o roadmap de 5
fases estão em [`docs/SPEC.md`](./docs/SPEC.md).

## Deploy na Vercel

1. Importar o repositório no [Vercel](https://vercel.com/new).
2. Definir **Root Directory** como `web`.
3. Framework detection = Next.js (padrão).
4. Pronto — URL pública tipo `almeida-mares.vercel.app`.

## Licença

Código-fonte privado. © 2026 Almeida Mares.
