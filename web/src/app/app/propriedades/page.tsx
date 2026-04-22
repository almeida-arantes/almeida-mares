import Link from "next/link";
import { Bath, Bed, MapPin, Plus, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { channels, owners, properties } from "@/lib/mock-data";
import { brl, pct } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/app/page-header";

const statusDot: Record<string, string> = {
  synced: "bg-emerald-500",
  syncing: "bg-sky-500 animate-pulse",
  stale: "bg-amber-500",
  error: "bg-rose-500",
  "n/a": "bg-muted-foreground/30",
};

const typeLabel: Record<string, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  chale: "Chalé",
  flat: "Flat",
};

export default function PropriedadesPage() {
  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title="Propriedades"
        description={`${properties.length} imóveis sob gestão em ${new Set(properties.map((p) => p.city)).size} cidades`}
      >
        <Button size="sm" className="gap-1.5" render={<Link href="/app/propriedades/nova" />}>
          <Plus className="h-4 w-4" />
          Nova propriedade
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => {
          const owner = owners.find((o) => o.id === p.ownerId);
          return (
            <Link key={p.id} href={`/app/propriedades/${p.id}`} className="block">
            <Card className="group h-full overflow-hidden transition hover:border-primary/40">
              <div
                className="relative h-44 bg-muted bg-cover bg-center"
                style={{ backgroundImage: `url('${p.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                  <div className="text-white">
                    <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider opacity-90">
                      <MapPin className="h-3 w-3" />
                      {p.city}
                    </div>
                    <div className="font-display text-lg font-semibold leading-tight">
                      {p.nickname}
                    </div>
                  </div>
                  <Badge className="bg-white/90 text-foreground shadow-sm hover:bg-white">
                    {typeLabel[p.type]}
                  </Badge>
                </div>
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/40 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {p.rating.toFixed(2)}
                </div>
              </div>

              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" /> {p.bedrooms}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" /> {p.bathrooms}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {p.maxGuests}
                  </span>
                  <span className="ml-auto font-mono text-foreground">
                    {brl(p.baseNightly)}/noite
                  </span>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="uppercase text-muted-foreground">Ocupação 30d</span>
                    <span className="font-medium">{pct(p.occupancy30d, 0)}</span>
                  </div>
                  <Progress value={p.occupancy30d} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Receita 30d</span>
                  <span className="font-mono font-medium">{brl(p.revenue30d)}</span>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <div className="text-[10px] text-muted-foreground">
                    {owner?.name}
                  </div>
                  <div className="flex gap-1.5">
                    {(["airbnb", "booking", "vrbo", "direto"] as const).map((c) => {
                      const st = p.syncStatus[c];
                      if (st === "n/a") return null;
                      return (
                        <div
                          key={c}
                          className="flex items-center gap-1 rounded border bg-background px-1.5 py-0.5 text-[9px]"
                          title={`${channels[c].label} · ${st}`}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              statusDot[st],
                            )}
                          />
                          <span
                            style={{ color: channels[c].hex }}
                            className="font-medium"
                          >
                            {channels[c].label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
