import Link from "next/link";
import { ArrowRight, Building2, Mail, Phone, Plus, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { PageHeader } from "@/components/app/page-header";
import { owners } from "@/lib/mock-data";
import { brl, dateLong, initials } from "@/lib/formatters";

export default function ProprietariosPage() {
  const totals = {
    count: owners.length,
    ytd: owners.reduce((s, o) => s + o.ytdRevenue, 0),
    pending: owners.reduce((s, o) => s + o.pendingPayout, 0),
    properties: owners.reduce((s, o) => s + o.propertiesCount, 0),
  };

  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Proprietários"
        description={`${totals.count} clientes · ${totals.properties} propriedades sob gestão`}
      >
        <Button size="sm" className="gap-1.5" render={<Link href="/app/proprietarios/novo" />}>
          <Plus className="h-4 w-4" />
          Novo proprietário
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs uppercase text-muted-foreground">Receita consolidada YTD</div>
            <div className="mt-1.5 font-display text-2xl font-semibold">{brl(totals.ytd)}</div>
            <div className="mt-1 text-xs text-emerald-600">+18% vs. 2025</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs uppercase text-muted-foreground">Repasses pendentes</div>
            <div className="mt-1.5 font-display text-2xl font-semibold">{brl(totals.pending)}</div>
            <div className="mt-1 text-xs text-muted-foreground">5 extratos aguardando aprovação</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs uppercase text-muted-foreground">Comissão média</div>
            <div className="mt-1.5 font-display text-2xl font-semibold">19%</div>
            <div className="mt-1 text-xs text-muted-foreground">faixa: 15% a 22%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {owners.map((o) => (
          <Card key={o.id} className="group transition hover:border-primary/40">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials(o.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/app/proprietarios/${o.id}`} className="truncate font-display text-lg font-semibold hover:underline">
                      {o.name}
                    </Link>
                    <Badge variant="secondary" className="text-[10px]">
                      {o.commissionPct}%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {o.document} · {o.city}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {o.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {o.phone}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/app/proprietarios/${o.id}`}
                  className="rounded-md p-1.5 opacity-0 transition group-hover:opacity-100 hover:bg-muted"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-3">
                <div>
                  <div className="flex items-center gap-1 text-[10px] uppercase text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    Imóveis
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-medium">
                    {o.propertiesCount}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground">
                    Receita YTD
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-medium">
                    {brl(o.ytdRevenue)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[10px] uppercase text-muted-foreground">
                    <Wallet className="h-3 w-3" />
                    A repassar
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-medium text-emerald-600">
                    {brl(o.pendingPayout)}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[10px] text-muted-foreground">
                Cliente desde {dateLong(o.since)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
