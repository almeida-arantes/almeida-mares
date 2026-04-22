import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DetailNav } from "@/components/app/detail-nav";
import { getPropertyById } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";
import { propertyDetailNav } from "@/lib/property-detail-nav";

type Props = { params: Promise<{ id: string }> };

export default async function PropriedadeTarifasPage({ params }: Props) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();

  return (
    <div className="space-y-5 p-6">
      <Link href={`/app/propriedades/${id}`} className="text-sm text-muted-foreground hover:text-foreground">
        ← {p.nickname}
      </Link>
      <PageHeader title="Tarifas & sazonalidade" />
      <DetailNav items={propertyDetailNav(id)} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="font-display text-base">Base</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Diária padrão (R$)</Label>
              <Input defaultValue={String(p.baseNightly)} type="number" />
            </div>
            <div className="space-y-2">
              <Label>Taxa de limpeza (R$)</Label>
              <Input defaultValue={String(p.cleaningFee)} type="number" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="font-display text-base">PriceLabs (opcional)</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Sugestões diárias com mínimo/máximo e lead time. Integração em avaliação.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
