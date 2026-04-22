import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DetailNav } from "@/components/app/detail-nav";
import { channels, getPropertyById, type Channel } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";
import { propertyDetailNav } from "@/lib/property-detail-nav";

const reconnectHref: Record<Channel, string> = {
  airbnb: "/app/integracoes/airbnb",
  booking: "/app/integracoes/booking",
  vrbo: "/app/integracoes/vrbo",
  direto: "/app/integracoes",
};

type Props = { params: Promise<{ id: string }> };

export default async function PropriedadeCanaisPage({ params }: Props) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();

  return (
    <div className="space-y-5 p-6">
      <Link href={`/app/propriedades/${id}`} className="text-sm text-muted-foreground hover:text-foreground">
        ← {p.nickname}
      </Link>
      <PageHeader title="Canais OTA" description={`Sincronização · ${p.nickname}`} />
      <DetailNav items={propertyDetailNav(id)} />
      <div className="grid gap-4 md:grid-cols-2">
        {(["airbnb", "booking", "vrbo", "direto"] as const).map((c) => {
          const st = p.syncStatus[c];
          return (
            <Card key={c}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium" style={{ color: channels[c].hex }}>{channels[c].label}</div>
                  <div className="text-xs text-muted-foreground">
                    {st === "n/a" ? "Não utilizado" : `Status: ${st}`}
                  </div>
                </div>
                {st !== "n/a" && (
                  <Button
                    size="sm"
                    variant="outline"
                    render={<Link href={reconnectHref[c] as never} />}
                  >
                    Reconectar
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Booking.com usa Basic Auth sobre HTTPS; iCal para Airbnb até aprovação Partner API.
      </p>
    </div>
  );
}
