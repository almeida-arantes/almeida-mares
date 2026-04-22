import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Hash,
  MapPin,
  MessageSquare,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { ReservaAcoesMenu } from "@/components/app/reserva-acoes-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailNav } from "@/components/app/detail-nav";
import { channels, getPropertyById, getReservationById } from "@/lib/mock-data";
import { brl, dateLong } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function ReservaDetalhePage({ params }: Props) {
  const { id } = await params;
  const r = getReservationById(id);
  if (!r) notFound();
  const prop = getPropertyById(r.propertyId);
  const ch = channels[r.channel];

  const nav = [
    { href: `/app/reservas/${id}`, label: "Visão geral" },
    { href: `/app/reservas/${id}/financeiro`, label: "Financeiro" },
    { href: `/app/reservas/${id}/mensagens`, label: "Mensagens" },
    { href: `/app/reservas/${id}/timeline`, label: "Timeline" },
  ];

  return (
    <div className="space-y-5 p-6">
      <div className="space-y-3 border-b pb-4">
        <Button variant="ghost" size="sm" className="-ml-2 w-fit text-muted-foreground" render={<Link href="/app/reservas" />}>
          ← Todas as reservas
        </Button>
        <PageHeader
          title={
            <span className="inline-flex flex-wrap items-center gap-2">
              {r.guestName}
              <Badge style={{ borderColor: ch.hex, color: ch.hex }} variant="outline">
                {ch.label}
              </Badge>
              <Badge variant="secondary" className="font-mono text-xs">
                {r.code}
              </Badge>
            </span>
          }
          description={`${prop?.nickname} · ${prop?.city}`}
        >
          <Button variant="outline" size="sm" render={<Link href={`/app/mensagens/${r.id}`} />}>
            <MessageSquare className="mr-1 h-4 w-4" /> Abrir thread
          </Button>
          <ReservaAcoesMenu id={id} />
        </PageHeader>
      </div>

      <DetailNav items={nav} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">Resumo</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Check-in</div>
                <div className="font-medium">{dateLong(r.checkIn)}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Check-out</div>
                <div className="font-medium">{dateLong(r.checkOut)}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Hóspedes</div>
                <div className="font-medium">{r.guests} · {r.guestCountry}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Propriedade</div>
                <Button variant="link" className="h-auto p-0" render={<Link href={`/app/propriedades/${r.propertyId}`} />}>
                  {prop?.nickname}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Valores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bruto</span>
              <span className="font-mono font-medium">{brl(r.grossValue)}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Taxa OTA</span>
              <span className="font-mono">−{brl(r.otaFee)}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Limpeza</span>
              <span className="font-mono">−{brl(r.cleaningFee)}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Gestão</span>
              <span className="font-mono">−{brl(r.managementFee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Líquido proprietário</span>
              <span className="font-mono text-emerald-600">{brl(r.netOwner)}</span>
            </div>
            <Button className="w-full gap-1" variant="outline" size="sm" render={<Link href={`/app/reservas/${id}/financeiro`} />}>
              Detalhe financeiro <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="font-display text-base">IDs externos (sync)</CardTitle>
        </CardHeader>
        <CardContent className="font-mono text-xs text-muted-foreground">
          reservation_id: {r.id} · property_id: {r.propertyId} · channel_ref: {r.code}
        </CardContent>
      </Card>
    </div>
  );
}
