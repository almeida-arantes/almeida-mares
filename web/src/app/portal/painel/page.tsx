import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  Download,
  FileText,
  Home,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { OccupancyChart } from "@/components/dashboard/occupancy-chart";
import { brl } from "@/lib/formatters";

export default function PortalPainelPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Olá, Ricardo.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aqui está um resumo claro do desempenho dos seus imóveis em{" "}
            <span className="font-medium text-foreground">abril de 2026</span>.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1 w-fit">
          <Sparkles className="h-3 w-3" />
          Próximo repasse em 5 dias
        </Badge>
      </div>

      {/* Hero card — próximo repasse */}
      <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Valor a receber
            </div>
            <div className="mt-1 font-display text-4xl font-semibold">
              R$ 18.420
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              PIX agendado para 05/05/2026 · conta do Banco Inter
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-emerald-600 hover:bg-emerald-600">Aprovado</Badge>
              <Badge variant="outline">Referência Abril/26</Badge>
              <Badge variant="outline">3 propriedades</Badge>
            </div>
          </div>
          <Button size="lg" className="gap-2" render={<Link href="/portal/extratos" />}>
            <Download className="h-4 w-4" />
            Baixar extrato
          </Button>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Receita bruta", value: "R$ 26.840", icon: TrendingUp, hint: "+9,2% vs. mar/26" },
          { label: "Ocupação", value: "86%", icon: CalendarCheck2, hint: "+4 pp vs. mês anterior" },
          { label: "Reservas", value: "9", icon: Home, hint: "3 via Airbnb · 4 Booking · 2 diretas" },
          { label: "Diária média (ADR)", value: "R$ 648", icon: Receipt, hint: "acima da média do litoral" },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase text-muted-foreground">{k.label}</div>
                <k.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 font-display text-2xl font-semibold">{k.value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{k.hint}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + properties */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">Desempenho da sua carteira</CardTitle>
            <CardDescription>Ocupação média dos seus imóveis · 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <OccupancyChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Seus imóveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Casa Buzios — Salvador", occ: 86, rev: 22_140 },
              { name: "Flat Ondina Vista Mar", occ: 72, rev: 9_860 },
              { name: "Apto Rio Vermelho", occ: 68, rev: 5_940 },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="font-mono">{brl(p.rev)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={p.occ} className="h-1.5 flex-1" />
                  <span className="w-8 text-right font-mono text-[11px] text-muted-foreground">
                    {p.occ}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Extratos recentes */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Extratos recentes</h2>
          <Button variant="ghost" size="sm" render={<Link href="/portal/extratos" />}>
            Ver todos <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { id: "abr-26", month: "Abril / 2026", value: "R$ 18.420", tag: "Novo" },
            { id: "mar-26", month: "Março / 2026", value: "R$ 16.890" },
            { id: "fev-26", month: "Fevereiro / 2026", value: "R$ 19.240" },
          ].map((e) => (
            <Link key={e.id} href={`/portal/extratos/${e.id}`} className="block">
              <Card className="group h-full transition hover:border-primary/40">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      {e.month}
                      {e.tag ? <Badge>{e.tag}</Badge> : null}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">{e.value}</div>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Card className="border-dashed bg-muted/30">
        <CardContent className="flex items-start gap-3 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Transparência total.</span>{" "}
            Cada extrato acompanha as faturas originais do Booking e Airbnb com QR
            code de validação. Qualquer número pode ser auditado — é só clicar. Dúvidas?
            Fale diretamente com a Almeida Mares pelo WhatsApp.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
