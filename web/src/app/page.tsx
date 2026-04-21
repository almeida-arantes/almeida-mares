import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  FileText,
  Globe,
  Home,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wallet,
  Waves,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const features = [
  {
    icon: CalendarRange,
    title: "Calendário unificado",
    text:
      "Airbnb, Booking.com, Vrbo e reservas diretas em uma única linha do tempo. Sem mais alternar entre abas.",
  },
  {
    icon: Wallet,
    title: "Fechamento financeiro automático",
    text:
      "Extrato mensal do proprietário gerado com um clique — receita bruta, taxas das OTAs, custos operacionais e repasse líquido.",
  },
  {
    icon: FileText,
    title: "Relatórios que encantam o proprietário",
    text:
      "PDFs com a marca Almeida Mares, anexos das faturas originais e QR de validação. Enviados por e-mail e WhatsApp.",
  },
  {
    icon: MessageSquare,
    title: "Caixa de mensagens unificada",
    text:
      "Fale com todos os hóspedes num único inbox, com templates multi-idioma e respostas sugeridas por IA.",
  },
  {
    icon: ShieldCheck,
    title: "Imutabilidade financeira",
    text:
      "Lançamentos nunca são editados — só estornados. Audit log assinado. Confiança total dos proprietários.",
  },
  {
    icon: Globe,
    title: "Portal do Proprietário",
    text:
      "Seu cliente acessa um painel transparente com calendário, extratos e documentos. Sem jargão técnico.",
  },
];

const integrations = [
  { name: "Booking.com", note: "Connectivity API" },
  { name: "Airbnb", note: "iCal + Partner API" },
  { name: "Vrbo", note: "EPS Rapid" },
  { name: "WhatsApp", note: "Cloud API oficial" },
  { name: "PIX", note: "Asaas / Stark Bank" },
  { name: "Open Finance", note: "Pluggy / Belvo" },
];

const steps = [
  {
    n: "01",
    title: "Conecta os canais",
    text:
      "Em minutos, vincule cada propriedade ao Airbnb, Booking e Vrbo. O calendário e as reservas fluem automaticamente.",
  },
  {
    n: "02",
    title: "Opera tranquila no dia-a-dia",
    text:
      "Kanban de limpeza, alertas de overbooking e WhatsApp transacional. Sua irmã foca no cliente, não na planilha.",
  },
  {
    n: "03",
    title: "Fecha o mês em 30 minutos",
    text:
      "No dia 1, o sistema prepara todos os extratos. Você revisa, aprova, dispara o PIX e cada proprietário recebe seu relatório.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-brand-gradient" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-grid-faint opacity-60" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">
              Produto
            </a>
            <a href="#integracoes" className="hover:text-foreground transition-colors">
              Integrações
            </a>
            <a href="#como-funciona" className="hover:text-foreground transition-colors">
              Como funciona
            </a>
            <a href="#portal" className="hover:text-foreground transition-colors">
              Proprietários
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              render={<Link href="/login" />}
            >
              Entrar
            </Button>
            <Button size="sm" render={<Link href="/app/inicio" />}>
              Ver demonstração
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-6 gap-1.5 rounded-full border-border/80 bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
            Versão 2026.1 · Hospitality intelligence
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Gestão profissional de imóveis por temporada{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-primary">sem planilha</span>
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/30"
              >
                <path
                  d="M2 9c28-6 68-6 100 0s68 6 100 0 68-6 96 0"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            A Almeida Mares unifica Airbnb, Booking e canais diretos em um só painel.
            Relatórios financeiros com um clique. Proprietários atendidos com a clareza
            de um software de ponta — pelo custo de uma gestora independente.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="gap-2" render={<Link href="/app/inicio" />}>
              Abrir dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/portal/painel" />}>
              Ver portal do proprietário
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Demo com dados fictícios. Nenhum cadastro necessário.
          </p>
        </div>

        {/* Hero preview card */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-chart-3/20 to-accent/30 blur-2xl opacity-60" />
          <Card className="relative overflow-hidden rounded-2xl border-border/80 shadow-2xl">
            <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-amber-400/70" />
                <span className="size-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="ml-3 flex-1">
                <div className="mx-auto flex h-6 max-w-md items-center justify-center gap-2 rounded-md bg-background/70 px-3 text-xs text-muted-foreground">
                  <Waves className="h-3 w-3" />
                  app.almeidamares.com.br/app/inicio
                </div>
              </div>
            </div>

            <CardContent className="p-0">
              <div className="grid grid-cols-12 gap-6 p-6">
                {/* Mini sidebar */}
                <aside className="col-span-3 hidden space-y-1 lg:block">
                  <Logo size="sm" />
                  <div className="h-4" />
                  {[
                    "Início",
                    "Calendário",
                    "Reservas",
                    "Proprietários",
                    "Propriedades",
                    "Financeiro",
                    "Relatórios",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                        i === 0
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      {item}
                    </div>
                  ))}
                </aside>

                {/* Fake dashboard content */}
                <div className="col-span-12 space-y-4 lg:col-span-9">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      { label: "Ocupação", value: "81,4%", delta: "+4,2 pp" },
                      { label: "Receita bruta", value: "R$ 487 mil", delta: "+12,8%" },
                      { label: "Líquido proprietários", value: "R$ 312 mil", delta: "+9,6%" },
                      { label: "Almeida Mares", value: "R$ 89 mil", delta: "+14,1%" },
                    ].map((k) => (
                      <div
                        key={k.label}
                        className="rounded-lg border bg-card p-3"
                      >
                        <div className="text-xs text-muted-foreground">{k.label}</div>
                        <div className="mt-1 font-display text-lg font-semibold">
                          {k.value}
                        </div>
                        <div className="text-[10px] text-emerald-600">{k.delta}</div>
                      </div>
                    ))}
                  </div>
                  {/* Fake chart bars */}
                  <div className="rounded-lg border bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-medium">Receita por canal · 12 meses</div>
                      <div className="flex gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="size-2 rounded-sm bg-primary" />
                          Booking
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="size-2 rounded-sm bg-chart-5" />
                          Airbnb
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="size-2 rounded-sm bg-chart-2" />
                          Direto
                        </span>
                      </div>
                    </div>
                    <div className="flex h-24 items-end gap-1.5">
                      {[40, 45, 68, 52, 44, 48, 56, 92, 100, 74, 62, 54].map((h, i) => (
                        <div key={i} className="flex-1 space-y-0.5">
                          <div
                            className="rounded-sm bg-chart-5/80"
                            style={{ height: `${h * 0.4}%` }}
                          />
                          <div
                            className="rounded-sm bg-primary"
                            style={{ height: `${h * 0.35}%` }}
                          />
                          <div
                            className="rounded-sm bg-chart-2"
                            style={{ height: `${h * 0.15}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Recursos</Badge>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Um sistema por cima de todos os canais
            </h2>
            <p className="mt-4 text-muted-foreground">
              Construído para gestores independentes que querem a potência de um
              Guesty ou Stays sem o custo — e com atenção real ao mercado brasileiro.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border-border/60">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrações */}
      <section id="integracoes" className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Integrações 2026</Badge>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Conectado onde importa
              </h2>
              <p className="mt-4 text-muted-foreground">
                Implementação honesta das APIs reais. Booking.com via Connectivity
                API (XML/OTA 2003B). Airbnb via iCal no dia 1 e Partner API quando
                aprovado. Pagamentos via PIX direto no banco da Almeida Mares.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Autenticação Basic Auth sobre HTTPS — TLS 1.3",
                  "Polling de reservas Booking a cada 20s (limite oficial)",
                  "Webhooks internos para eventos reservation.created, cancelled, modified",
                  "Reconciliação automática de faturas via OCR (GPT-4o Vision)",
                  "Pagamento em lote via PIX Asaas ou arquivo CNAB 240",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {integrations.map((i) => (
                <Card key={i.name} className="border-border/60">
                  <CardContent className="flex h-24 flex-col justify-center p-4">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.note}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Como funciona</Badge>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Do onboarding ao fechamento mensal em três atos
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} className="relative overflow-hidden border-border/60">
                <CardContent className="p-6">
                  <div className="font-display text-5xl font-semibold text-primary/15">
                    {s.n}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portal do proprietário */}
      <section id="portal" className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Portal do Proprietário</Badge>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Transparência como diferencial competitivo
              </h2>
              <p className="mt-4 text-muted-foreground">
                Cada proprietário tem um login próprio. Vê seu calendário, seus
                extratos, seus contratos — sem enxergar dados de outros clientes e
                sem conseguir alterar nada. Zero tempo gasto com "me manda o
                relatório de novo" no WhatsApp.
              </p>
              <div className="mt-6 flex gap-3">
                <Button render={<Link href="/portal/painel" />}>
                  Entrar como proprietário
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
            <Card className="border-border/60 bg-gradient-to-br from-primary/5 via-transparent to-accent/10">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Olá, Ricardo — referência abril / 2026
                    </div>
                    <div className="mt-0.5 font-display text-2xl font-semibold">
                      R$ 18.420
                    </div>
                    <div className="text-xs text-muted-foreground">
                      a receber em 05/05 · PIX
                    </div>
                  </div>
                  <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                    Aprovado
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 border-t pt-3">
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Bruto</div>
                    <div className="text-sm font-medium">R$ 26.840</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Ocupação</div>
                    <div className="text-sm font-medium">86%</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground">Reservas</div>
                    <div className="text-sm font-medium">9</div>
                  </div>
                </div>
                <div className="rounded-md border bg-background/60 p-3 text-xs text-muted-foreground">
                  Extrato detalhado em PDF com anexos das faturas Booking e Airbnb.
                  QR code de validação. Enviado automaticamente por e-mail e WhatsApp.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Pronta para largar a planilha?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Esta é uma demonstração viva. Clique em qualquer seção do dashboard para
            ver dados realistas e navegar como se fosse um dia normal da operação.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="gap-2" render={<Link href="/app/inicio" />}>
              Abrir dashboard agora
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <Logo />
          <div className="text-xs text-muted-foreground">
            © 2026 Almeida Mares · Construído com Next.js, shadcn/ui e Tailwind CSS.
            <br className="sm:hidden" /> Versão de demonstração.
          </div>
        </div>
      </footer>
    </div>
  );
}
