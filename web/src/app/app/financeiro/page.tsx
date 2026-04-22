import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, Download, FileSpreadsheet, Receipt, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { owners, reservations } from "@/lib/mock-data";
import { brl, brlCents, dateShort, initials } from "@/lib/formatters";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

export default function FinanceiroPage() {
  const grossMonth = reservations.reduce((s, r) => s + r.grossValue, 0);
  const otaFees = reservations.reduce((s, r) => s + r.otaFee, 0);
  const mgmt = reservations.reduce((s, r) => s + r.managementFee, 0);
  const netOwners = reservations.reduce((s, r) => s + r.netOwner, 0);

  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Financeiro"
        description="Fechamento abril / 2026 · 5 extratos pendentes de aprovação"
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          render={<Link href="/app/integracoes/contabil" />}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Exportar contabilidade
        </Button>
        <Button size="sm" className="gap-1.5" render={<Link href="/app/financeiro/repasses" />}>
          <CheckCircle2 className="h-4 w-4" />
          Aprovar todos
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase text-muted-foreground">Receita bruta</div>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 font-display text-2xl font-semibold">{brl(grossMonth)}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              +12,8% vs. mar/26
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase text-muted-foreground">Taxas OTAs</div>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 font-display text-2xl font-semibold">{brl(otaFees)}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-rose-600">
              <ArrowDownRight className="h-3 w-3" />
              {((otaFees / grossMonth) * 100).toFixed(1).replace(".", ",")}% do bruto
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase text-muted-foreground">Líquido proprietários</div>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 font-display text-2xl font-semibold">{brl(netOwners)}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">após todas as deduções</div>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase text-muted-foreground">Taxa Almeida Mares</div>
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 font-display text-2xl font-semibold text-primary">
              {brl(mgmt)}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">retenção média 18,2%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Repasses a aprovar</CardTitle>
          <CardDescription>
            Valores calculados automaticamente a partir das reservas do mês. Revise, ajuste e aprove com um clique.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proprietário</TableHead>
                <TableHead className="text-right">Bruto</TableHead>
                <TableHead className="text-right">Taxas OTAs</TableHead>
                <TableHead className="text-right">Custos</TableHead>
                <TableHead className="text-right">Gestão</TableHead>
                <TableHead className="text-right">Repasse líquido</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {owners.map((o, i) => {
                const factor = 1 + (i - 2) * 0.15;
                const bruto = Math.round(o.pendingPayout * 2.8 * factor);
                const ota = Math.round(bruto * 0.14);
                const costs = Math.round(bruto * 0.04);
                const mg = Math.round((bruto - ota) * (o.commissionPct / 100));
                const net = bruto - ota - costs - mg;
                return (
                  <TableRow key={o.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7">
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                            {initials(o.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{o.name}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {o.propertiesCount} imóveis · {o.commissionPct}%
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">{brl(bruto)}</TableCell>
                    <TableCell className="text-right font-mono text-sm text-rose-600">
                      −{brl(ota)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm text-rose-600">
                      −{brl(costs)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm text-rose-600">
                      −{brl(mg)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold">
                      {brl(net)}
                    </TableCell>
                    <TableCell>
                      {i === 0 ? (
                        <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                          <CheckCircle2 className="mr-1 h-3 w-3" /> Aprovado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          <Clock className="mr-1 h-3 w-3" /> Revisão
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1"
                          render={<Link href="/app/relatorios/gerar/extrato-mensal" />}
                        >
                          <Download className="h-3 w-3" />
                          PDF
                        </Button>
                        <Button
                          size="sm"
                          className="h-7"
                          render={<Link href={`/app/proprietarios/${o.id}/repasses`} />}
                        >
                          Aprovar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Memória de cálculo</CardTitle>
            <CardDescription>Ricardo Mendonça · abril / 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: "9 reservas × diária média", value: brlCents(23_850.0) },
              { label: "Taxa de limpeza (repasse)", value: brlCents(2_240.0) },
              { label: "= Receita bruta", value: brlCents(26_090.0), bold: true },
              { label: "− Comissão Booking (15%)", value: brlCents(-2_100.0), negative: true },
              { label: "− Comissão Airbnb (14%)", value: brlCents(-1_540.0), negative: true },
              { label: "− Limpeza terceirizada", value: brlCents(-1_120.0), negative: true },
              { label: "− Manutenção pontual", value: brlCents(-260.0), negative: true },
              { label: "− Taxa de gestão Almeida Mares (20%)", value: brlCents(-4_650.0), negative: true, primary: true },
              { label: "= Líquido a repassar", value: brlCents(16_420.0), bold: true, emerald: true },
            ].map((l) => (
              <div key={l.label} className="flex items-baseline justify-between">
                <span
                  className={`${l.bold ? "font-medium" : ""} ${
                    l.primary ? "text-primary" : ""
                  }`}
                >
                  {l.label}
                </span>
                <span
                  className={`font-mono ${l.bold ? "font-semibold" : ""} ${
                    l.negative ? "text-rose-600" : ""
                  } ${l.emerald ? "text-emerald-600" : ""}`}
                >
                  {l.value}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>PIX agendado</span>
              <span className="font-mono">05/05/2026 · 09h00</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Faturas das OTAs</CardTitle>
            <CardDescription>
              Conciliação automática linha-a-linha com reservas. Divergências destacadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { src: "Booking.com", month: "Abr/26", total: "R$ 38.400", status: "Match", ok: true },
              { src: "Airbnb", month: "Abr/26", total: "R$ 52.100", status: "Match", ok: true },
              { src: "Vrbo", month: "Abr/26", total: "R$ 8.200", status: "1 divergência", ok: false },
              { src: "Booking.com", month: "Mar/26", total: "R$ 41.200", status: "Match", ok: true },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <div className="text-sm font-medium">{f.src}</div>
                  <div className="text-[10px] text-muted-foreground">{f.month} · PDF 124 KB</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-medium">{f.total}</div>
                  <Badge
                    variant="outline"
                    className={
                      f.ok
                        ? "text-emerald-600 border-emerald-300"
                        : "text-amber-600 border-amber-300"
                    }
                  >
                    {f.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ModuleLinks
        layout="grid"
        title="Módulos financeiros"
        items={[
          { href: "/app/financeiro/fluxo-caixa", label: "Fluxo de caixa", description: "Entradas e saídas projetadas" },
          { href: "/app/financeiro/contas-pagar", label: "Contas a pagar" },
          { href: "/app/financeiro/contas-receber", label: "Contas a receber" },
          { href: "/app/financeiro/repasses", label: "Repasses" },
          { href: "/app/financeiro/faturas", label: "Faturas OTA" },
          { href: "/app/financeiro/conciliacao", label: "Conciliação bancária" },
        ]}
      />
    </div>
  );
}
