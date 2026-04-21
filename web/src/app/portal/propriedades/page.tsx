import { Bath, Bed, MapPin, Star, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { owners, properties } from "@/lib/mock-data";
import { brl } from "@/lib/formatters";

export default function PortalPropriedadesPage() {
  const rick = owners[0];
  const mine = properties.filter((p) => p.ownerId === rick.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Minhas propriedades</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mine.length} imóveis sob gestão da Almeida Mares.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mine.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div
              className="relative h-48 bg-muted bg-cover bg-center"
              style={{ backgroundImage: `url('${p.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 text-white">
                <div>
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-90">
                    <MapPin className="h-3 w-3" />
                    {p.city}
                  </div>
                  <div className="font-display text-lg font-semibold">{p.nickname}</div>
                </div>
                <Badge className="bg-white/90 text-foreground">
                  <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                  {p.rating.toFixed(2)}
                </Badge>
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
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-[10px]">
                  <span className="uppercase text-muted-foreground">Ocupação 30d</span>
                  <span className="font-medium">{p.occupancy30d}%</span>
                </div>
                <Progress value={p.occupancy30d} className="h-1.5" />
              </div>
              <div className="flex items-center justify-between border-t pt-3 text-sm">
                <span className="text-muted-foreground">Receita 30d</span>
                <span className="font-mono font-medium">{brl(p.revenue30d)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
