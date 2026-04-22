import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { DetailNav } from "@/components/app/detail-nav";
import { getReservationById } from "@/lib/mock-data";
import { dateLong } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function ReservaMensagensPage({ params }: Props) {
  const { id } = await params;
  const r = getReservationById(id);
  if (!r) notFound();

  const nav = [
    { href: `/app/reservas/${id}`, label: "Visão geral" },
    { href: `/app/reservas/${id}/financeiro`, label: "Financeiro" },
    { href: `/app/reservas/${id}/mensagens`, label: "Mensagens" },
    { href: `/app/reservas/${id}/timeline`, label: "Timeline" },
  ];

  const preview = [
    { t: "Hóspede", text: "Oi! Chegamos por volta das 16h.", when: "Ontem · 10:24" },
    { t: "Operação", text: "Olá! Código do portão e instruções enviados no WhatsApp.", when: "Ontem · 10:26" },
    { t: "Sistema", text: "Confirmação de check-in registrada (geo dentro do raio).", when: "Hoje · 15:02" },
  ];

  return (
    <div className="space-y-5 p-6">
      <div>
        <Link href="/app/reservas" className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Voltar às reservas
        </Link>
        <PageHeader
          title={`Mensagens · ${r.guestName}`}
          description="Histórico unificado dos canais (Booking, Airbnb, etc.) e mensagens internas da operação."
        />
      </div>
      <DetailNav items={nav} />
      <div className="flex justify-end">
        <Button render={<Link href={`/app/mensagens/${id}`} />}>Abrir inbox completo</Button>
      </div>
      <div className="space-y-3">
        {preview.map((m, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{m.t}</span>
                <span>{m.when}</span>
              </div>
              <p className="mt-2 text-sm">{m.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Última atividade registrada · check-in {dateLong(r.checkIn)}
      </p>
    </div>
  );
}
