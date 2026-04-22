import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailNav } from "@/components/app/detail-nav";
import { channels, getReservationById } from "@/lib/mock-data";
import { brl, dateLong } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function ReservaFinanceiroPage({ params }: Props) {
  const { id } = await params;
  const r = getReservationById(id);
  if (!r) notFound();
  const ch = channels[r.channel];

  const nav = [
    { href: `/app/reservas/${id}`, label: "Visão geral" },
    { href: `/app/reservas/${id}/financeiro`, label: "Financeiro" },
    { href: `/app/reservas/${id}/mensagens`, label: "Mensagens" },
    { href: `/app/reservas/${id}/timeline`, label: "Timeline" },
  ];

  return (
    <div className="space-y-5 p-6">
      <div>
        <Link href="/app/reservas" className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Voltar às reservas
        </Link>
        <PageHeader
          title={`Financeiro · ${r.guestName}`}
          description="Lançamentos derivados da reserva — imutáveis; estornos geram nova linha."
        />
      </div>
      <DetailNav items={nav} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Memória de cálculo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Receita bruta (canal)" value={brl(r.grossValue)} accent={`${ch.label}`} />
            <Row label="Comissão OTA" value={`−${brl(r.otaFee)}`} negative />
            <Row label="Taxa de limpeza (repasse)" value={`−${brl(r.cleaningFee)}`} negative />
            <Row label="Taxa de gestão Almeida Mares" value={`−${brl(r.managementFee)}`} negative />
            <Separator />
            <Row label="Líquido proprietário" value={brl(r.netOwner)} bold />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Conciliação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Fatura {ch.label} referente ao período <strong className="text-foreground">{dateLong(r.checkIn)}</strong> a{" "}
              <strong className="text-foreground">{dateLong(r.checkOut)}</strong> conciliada automaticamente com o extrato importado.
            </p>
            <p className="font-mono text-xs">hash_ledger: 0x7f2a…91 · criado em sync #{r.code}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  negative,
  bold,
  accent,
}: {
  label: string;
  value: string;
  negative?: boolean;
  bold?: boolean;
  accent?: string;
}) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold" : ""}`}>
      <span className="text-muted-foreground">
        {label}
        {accent && <span className="ml-1 text-[10px]">({accent})</span>}
      </span>
      <span className={`font-mono ${negative ? "text-rose-600" : ""}`}>{value}</span>
    </div>
  );
}
