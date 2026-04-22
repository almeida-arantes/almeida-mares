import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { DetailNav } from "@/components/app/detail-nav";
import { getReservationById } from "@/lib/mock-data";
import { dateLong } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function ReservaTimelinePage({ params }: Props) {
  const { id } = await params;
  const r = getReservationById(id);
  if (!r) notFound();

  const nav = [
    { href: `/app/reservas/${id}`, label: "Visão geral" },
    { href: `/app/reservas/${id}/financeiro`, label: "Financeiro" },
    { href: `/app/reservas/${id}/mensagens`, label: "Mensagens" },
    { href: `/app/reservas/${id}/timeline`, label: "Timeline" },
  ];

  const events = [
    { label: "Reserva criada no canal", at: dateLong(r.checkIn), meta: `Sync ${r.code}` },
    { label: "Pagamento pré-autorizado", at: dateLong(r.checkIn), meta: "Gateway OTA" },
    { label: "Lembrete de check-in (WhatsApp)", at: dateLong(r.checkIn), meta: "Automático" },
    { label: "Check-in efetivado", at: "Hoje · 15:05", meta: "App hóspede" },
  ];

  return (
    <div className="space-y-5 p-6">
      <div>
        <Link href="/app/reservas" className="mb-2 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Voltar às reservas
        </Link>
        <PageHeader
          title={`Timeline · ${r.guestName}`}
          description="Eventos operacionais e de sistema para auditoria."
        />
      </div>
      <DetailNav items={nav} />
      <div className="relative border-l-2 border-muted pl-6">
        {events.map((e, i) => (
          <div key={i} className="mb-8 last:mb-0">
            <div className="absolute -left-[9px] mt-1 size-4 rounded-full border-2 border-primary bg-background" />
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">{e.label}</div>
                <div className="text-xs text-muted-foreground">{e.at}</div>
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">{e.meta}</div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
