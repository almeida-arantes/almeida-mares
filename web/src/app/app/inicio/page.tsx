import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Home,
  Info,
  KeyRound,
  LogIn,
  LogOut,
  MessageSquare,
  Percent,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { OccupancyChart } from "@/components/dashboard/occupancy-chart";
import {
  alerts,
  channels,
  kpis,
  properties,
  reservations,
} from "@/lib/mock-data";
import { brl, dateShort, initials, pct } from "@/lib/formatters";
import { cn } from "@/lib/utils";

function getPropName(id: string) {
  return properties.find((p) => p.id === id)?.nickname ?? "—";
}

export default function InicioPage() {
  const todayISO = new Date().toISOString().split("T")[0];

  const todaysCheckIns = reservations
    .filter((r) => r.checkIn.startsWith(todayISO) || r.checkIn.startsWith(new Date(Date.now() + 86_400_000).toISOString().split("T")[0]))
    .slice(0, 5);
  const todaysCheckOuts = reservations
    .filter((r) => r.checkOut.startsWith(todayISO) || r.checkOut.startsWith(new Date(Date.now() + 86_400_000).toISOString().split("T")[0]))
    .slice(0, 5);

  const alertIcon = {
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
    success: CheckCircle2,
  } as const;
  const alertTone = {
    warning: "text-amber-600 bg-amber-500/10",
    error: "text-rose-600 bg-rose-500/10",
    info: "text-sky-600 bg-sky-500/10",
    success: "text-emerald-600 bg-emerald-500/10",
  } as const;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Boa tarde, Ingrid.
            </h1>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Abril / 2026
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão consolidada de{" "}
            <span className="font-medium text-foreground">{properties.length}</span>{" "}
            propriedades,{" "}
            <span className="font-medium text-foreground">5</span>{" "}
            proprietários e{" "}
            <span className="font-medium text-foreground">
              {reservations.filter((r) => r.status !== "cancelada").length}
            </span>{" "}
            reservas ativas.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <CalendarCheck2 className="h-4 w-4" />
            Últimos 30 dias
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            render={<Link href="/app/reservas" />}
          >
            Nova reserva
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPIs grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Ocupação global"
          value={pct(kpis.occupancy)}
          delta={kpis.occupancyDelta}
          deltaSuffix=" pp"
          hint="vs. mês anterior"
          icon={Percent}
          tone="primary"
        />
        <KpiCard
          label="Receita bruta"
          value={brl(kpis.grossRevenue)}
          delta={kpis.grossRevenueDelta}
          hint="12 meses móveis"
          icon={TrendingUp}
          tone="accent"
        />
        <KpiCard
          label="Líquido proprietários"
          value={brl(kpis.netOwners)}
          delta={kpis.netOwnersDelta}
          hint="após taxas e custos"
          icon={DollarSign}
        />
        <KpiCard
          label="Taxa de gestão"
          value={brl(kpis.managementFee)}
          delta={kpis.managementFeeDelta}
          hint="Almeida Mares"
          icon={CreditCard}
          tone="primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard label="ADR" value={brl(kpis.adr)} delta={kpis.adrDelta} hint="diária média" />
        <KpiCard label="RevPAR" value={brl(kpis.revpar)} delta={kpis.revparDelta} hint="por noite disponível" />
        <KpiCard label="Estadia média" value={`${kpis.avgStay.toString().replace(".", ",")} noites`} delta={kpis.avgStayDelta} hint="LOS" />
        <KpiCard label="Pickup 7d" value={`+${kpis.pickup7d}`} delta={kpis.pickup7dDelta} deltaSuffix="" hint="novas reservas" />
        <KpiCard label="Direto" value={`${kpis.directShare}%`} delta={kpis.directShareDelta} hint="share do canal" />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="font-display text-lg">
                Receita por canal
              </CardTitle>
              <CardDescription>Últimos 12 meses · em BRL</CardDescription>
            </div>
            <Badge variant="outline" className="gap-1 font-mono text-[10px]">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sincronizado há 2 min
            </Badge>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        {/* Alerts feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg">Alertas inteligentes</CardTitle>
              <Badge variant="secondary">{alerts.length}</Badge>
            </div>
            <CardDescription>Últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a) => {
              const Icon = alertIcon[a.type];
              return (
                <div
                  key={a.id}
                  className="flex gap-3 rounded-md border border-border/60 p-3 transition hover:bg-muted/40"
                >
                  <div
                    className={cn(
                      "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md",
                      alertTone[a.type],
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-snug">
                      {a.title}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {a.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Second grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's arrivals */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg">Movimento de hoje e amanhã</CardTitle>
              <CardDescription>
                {todaysCheckIns.length} chegadas · {todaysCheckOuts.length} saídas
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" render={<Link href="/app/operacao" />}>
              Ver operação
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-600">
                <LogIn className="h-3.5 w-3.5" />
                Check-ins
              </div>
              <div className="space-y-2">
                {todaysCheckIns.length === 0 && (
                  <div className="text-xs text-muted-foreground">Sem chegadas.</div>
                )}
                {todaysCheckIns.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 rounded-md border border-border/60 p-2.5"
                  >
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {initials(r.guestName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        {r.guestName}
                        <Badge
                          variant="outline"
                          className="h-4 px-1 text-[9px]"
                          style={{
                            borderColor: channels[r.channel].hex,
                            color: channels[r.channel].hex,
                          }}
                        >
                          {channels[r.channel].label}
                        </Badge>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {getPropName(r.propertyId)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">{dateShort(r.checkIn)}</div>
                      <div className="text-[10px] text-muted-foreground">15h00</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-rose-600">
                <LogOut className="h-3.5 w-3.5" />
                Check-outs
              </div>
              <div className="space-y-2">
                {todaysCheckOuts.length === 0 && (
                  <div className="text-xs text-muted-foreground">Sem saídas.</div>
                )}
                {todaysCheckOuts.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 rounded-md border border-border/60 p-2.5"
                  >
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-chart-2/15 text-chart-2 text-xs">
                        {initials(r.guestName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{r.guestName}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {getPropName(r.propertyId)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">{dateShort(r.checkOut)}</div>
                      <div className="text-[10px] text-muted-foreground">11h00</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy + direct KPIs */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Ocupação 12 meses</CardTitle>
            <CardDescription>Média ponderada da carteira</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <OccupancyChart />
            <Separator />
            <div className="space-y-3">
              {[
                { label: "Booking.com", value: 38, hex: channels.booking.hex },
                { label: "Airbnb", value: 47, hex: channels.airbnb.hex },
                { label: "Vrbo", value: 9, hex: channels.vrbo.hex },
                { label: "Direto", value: 6, hex: channels.direto.hex },
              ].map((r) => (
                <div key={r.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: r.hex }}
                      />
                      {r.label}
                    </span>
                    <span className="font-medium">{r.value}%</span>
                  </div>
                  <Progress value={r.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="group cursor-pointer transition hover:border-primary/40">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <KeyRound className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Fechamento mensal</div>
              <div className="text-xs text-muted-foreground">
                5 extratos pendentes de aprovação
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </CardContent>
        </Card>
        <Card className="group cursor-pointer transition hover:border-primary/40">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Caixa de mensagens</div>
              <div className="text-xs text-muted-foreground">
                3 conversas aguardando resposta
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </CardContent>
        </Card>
        <Card className="group cursor-pointer transition hover:border-primary/40">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-chart-3/15 text-chart-3">
              <Home className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Turnover pendente</div>
              <div className="text-xs text-muted-foreground">
                2 limpezas a agendar nas próximas 24h
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
