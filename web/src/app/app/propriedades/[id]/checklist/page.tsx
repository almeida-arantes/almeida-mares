import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";

import { DetailNav } from "@/components/app/detail-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getPropertyById } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";
import { propertyDetailNav } from "@/lib/property-detail-nav";

type Props = { params: Promise<{ id: string }> };

const items = [
  { label: "Roupa de cama premium (4 conjuntos)", ok: true },
  { label: "Toalhas de banho + rosto", ok: true },
  { label: "Kit amenities reposição", ok: false },
  { label: "Extintor validade & CO", ok: true },
  { label: "Água no filtro / geladeira", ok: true },
];

export default async function PropriedadeChecklistPage({ params }: Props) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();

  return (
    <div className="space-y-5 p-6">
      <Link href={`/app/propriedades/${id}`} className="text-sm text-muted-foreground hover:text-foreground">
        ← {p.nickname}
      </Link>
      <PageHeader title="Checklist de enxoval" />
      <DetailNav items={propertyDetailNav(id)} />
      <div className="space-y-2">
        {items.map((it) => (
          <Card key={it.label}>
            <CardContent className="flex items-center gap-3 p-4">
              {it.ok ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Circle className="h-5 w-5 text-amber-500" />
              )}
              <span className={it.ok ? "" : "text-muted-foreground"}>{it.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
