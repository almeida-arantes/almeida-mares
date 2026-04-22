import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Mail, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DetailNav } from "@/components/app/detail-nav";
import { PageHeader } from "@/components/app/page-header";
import { getOwnerById, propertiesByOwner } from "@/lib/mock-data";
import { brl, dateLong, initials } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function ProprietarioDetalhePage({ params }: Props) {
  const { id } = await params;
  const o = getOwnerById(id);
  if (!o) notFound();
  const props = propertiesByOwner(o.id);

  const nav = [
    { href: `/app/proprietarios/${id}`, label: "Perfil" },
    { href: `/app/proprietarios/${id}/propriedades`, label: "Propriedades" },
    { href: `/app/proprietarios/${id}/repasses`, label: "Repasses" },
    { href: `/app/proprietarios/${id}/documentos`, label: "Documentos" },
  ];

  return (
    <div className="space-y-6 p-6">
      <Link href="/app/proprietarios" className="text-sm text-muted-foreground hover:text-foreground">← Proprietários</Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Avatar className="size-16 shrink-0">
          <AvatarFallback className="bg-primary/15 text-primary text-xl">{initials(o.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-3">
          <PageHeader
            title={
              <span className="inline-flex flex-wrap items-center gap-2">
                {o.name}
                <Badge variant="secondary">{o.commissionPct}% gestão</Badge>
              </span>
            }
            description={`${o.document} · ${o.city}`}
          >
            <Button render={<Link href={`/portal/painel`} />}>Ver como no portal</Button>
          </PageHeader>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{o.email}</span>
            <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{o.phone}</span>
          </div>
        </div>
      </div>

      <DetailNav items={nav} />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs uppercase text-muted-foreground">Receita YTD</div>
            <div className="mt-1 font-display text-xl font-semibold">{brl(o.ytdRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs uppercase text-muted-foreground">A repassar</div>
            <div className="mt-1 font-display text-xl font-semibold text-emerald-600">{brl(o.pendingPayout)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs uppercase text-muted-foreground">Cliente desde</div>
            <div className="mt-1 text-sm font-medium">{dateLong(o.since)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5" /> Imóveis ({props.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {props.map((p) => (
            <Link
              key={p.id}
              href={`/app/propriedades/${p.id}` as never}
              className="flex items-center justify-between rounded-md border p-3 text-sm transition hover:bg-muted/50"
            >
              <span className="font-medium">{p.nickname}</span>
              <span className="text-xs text-muted-foreground">{p.city}</span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
