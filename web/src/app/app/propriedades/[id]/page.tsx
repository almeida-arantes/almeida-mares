import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, Bed, MapPin, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetailNav } from "@/components/app/detail-nav";
import { channels, getOwnerById, getPropertyById } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";
import { propertyDetailNav } from "@/lib/property-detail-nav";
import { brl } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function PropriedadeDetalhePage({ params }: Props) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();
  const owner = getOwnerById(p.ownerId);

  const nav = propertyDetailNav(id);

  return (
    <div className="space-y-6 p-6">
      <Link href="/app/propriedades" className="text-sm text-muted-foreground hover:text-foreground">← Propriedades</Link>
      <PageHeader
        title={p.nickname}
        description={`${p.city} · Nota ${p.rating} · Proprietário: ${owner?.name ?? "—"}`}
      />
      <div
        className="relative h-56 overflow-hidden rounded-xl border bg-muted bg-cover bg-center"
        style={{ backgroundImage: `url('${p.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-2 text-xs opacity-90">
            <MapPin className="h-3.5 w-3.5" />{p.city}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30"><Star className="mr-1 h-3 w-3 fill-amber-400" />{p.rating}</Badge>
          </div>
        </div>
      </div>

      <DetailNav items={nav} />

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="flex items-center gap-2 p-4"><Bed className="h-4 w-4" /><span>{p.bedrooms} quartos</span></CardContent></Card>
        <Card><CardContent className="flex items-center gap-2 p-4"><Bath className="h-4 w-4" /><span>{p.bathrooms} banheiros</span></CardContent></Card>
        <Card><CardContent className="flex items-center gap-2 p-4"><Users className="h-4 w-4" /><span>{p.maxGuests} hóspedes</span></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Diária base</div><div className="font-mono font-semibold">{brl(p.baseNightly)}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Sincronização por canal</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {(["airbnb", "booking", "vrbo", "direto"] as const).map((c) => {
            const st = p.syncStatus[c];
            if (st === "n/a") return null;
            return (
              <Badge key={c} variant="outline" style={{ borderColor: channels[c].hex, color: channels[c].hex }}>
                {channels[c].label}: {st}
              </Badge>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button render={<Link href={`/app/proprietarios/${p.ownerId}`} />}>Ver proprietário</Button>
        <Button variant="outline" render={<Link href="/app/calendario" />}>Ver no calendário</Button>
      </div>
    </div>
  );
}
