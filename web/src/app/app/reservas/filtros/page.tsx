import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { Label } from "@/components/ui/label";

export default function ReservasFiltrosPage() {
  return (
    <div className="space-y-5 p-6">
      <Button variant="ghost" size="sm" className="-ml-2 gap-1" render={<Link href="/app/reservas" />}>
        <ArrowLeft className="h-4 w-4" />
        Voltar às reservas
      </Button>
      <PageHeader
        title="Filtros avançados"
        description="Combine canal, status, período e propriedade. Filtros podem ser salvos como visualização padrão."
      />
      <Card>
        <CardContent className="space-y-4 p-6">
          {[
            { id: "ch-booking", label: "Booking.com" },
            { id: "ch-airbnb", label: "Airbnb" },
            { id: "ch-vrbo", label: "Vrbo" },
            { id: "ch-direto", label: "Direto" },
          ].map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor={c.id}>{c.label}</Label>
              <input id={c.id} type="checkbox" defaultChecked className="size-4 accent-primary" />
            </div>
          ))}
          <Button render={<Link href="/app/reservas" />}>Aplicar filtros</Button>
        </CardContent>
      </Card>
    </div>
  );
}
