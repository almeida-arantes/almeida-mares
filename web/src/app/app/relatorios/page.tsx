import Link from "next/link";
import {
  BarChart3,
  Calendar,
  Download,
  FileBarChart,
  FileText,
  Home,
  PieChart,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    icon: FileText,
    title: "Extrato mensal do proprietário",
    description:
      "Receita bruta, taxas das OTAs, custos operacionais, taxa de gestão e líquido a repassar — com anexos das faturas originais.",
    badge: "Mais usado",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Calendar,
    title: "Relatório de ocupação",
    description:
      "Taxa de ocupação consolidada e por propriedade, dia a dia. Com comparativo YoY e MoM.",
    tone: "bg-chart-3/15 text-chart-3",
  },
  {
    icon: TrendingUp,
    title: "Performance por canal",
    description:
      "Distribuição de reservas entre Booking, Airbnb, Vrbo e direto, com comissão efetiva e tempo de conversão.",
    tone: "bg-chart-5/15 text-chart-5",
  },
  {
    icon: BarChart3,
    title: "ADR & RevPAR",
    description:
      "Diária média e receita por unidade disponível, com série histórica e benchmarking entre propriedades.",
    tone: "bg-chart-4/15 text-chart-4",
  },
  {
    icon: PieChart,
    title: "Breakdown financeiro",
    description:
      "Detalhamento de receitas e despesas categorizadas. Ideal para fechamento contábil mensal.",
    tone: "bg-chart-2/15 text-chart-2",
  },
  {
    icon: Home,
    title: "Desempenho por propriedade",
    description:
      "Ocupação, ADR, receita e rating por imóvel. Identifica subperformance e oportunidades de ajuste de preço.",
    tone: "bg-chart-1/15 text-chart-1",
  },
  {
    icon: FileBarChart,
    title: "Relatório fiscal (Carnê-Leão)",
    description:
      "Pronto para declaração do proprietário pessoa física. Rendimentos por mês com DARF 0190.",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Pipeline e forecast",
    description:
      "Reservas confirmadas, pré-reservas e projeção dos próximos 90 dias por propriedade.",
    tone: "bg-chart-3/15 text-chart-3",
  },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Relatórios
          </h1>
          <p className="text-sm text-muted-foreground">
            Gere em PDF, XLSX ou envie direto para o proprietário por e-mail e WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <Card key={t.title} className="group transition hover:border-primary/40">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`inline-flex size-10 items-center justify-center rounded-lg ${t.tone}`}>
                  <t.icon className="h-5 w-5" />
                </div>
                {t.badge && <Badge variant="secondary">{t.badge}</Badge>}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Gerar
                </Button>
                <Button size="sm" className="flex-1 gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/5 via-transparent to-accent/10">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold">Agendamento recorrente</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Todo dia 5, o sistema gera e envia automaticamente os extratos mensais para todos os proprietários, com anexos das faturas. Configure uma vez, esqueça para sempre.
            </p>
          </div>
          <Button render={<Link href="/app/configuracoes" />}>
            Configurar agendamento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
