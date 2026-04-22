import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CalendarioFiltrosPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-lg">Filtros do calendário</CardTitle>
        <CardDescription>
          Preferências sincronizadas com a sua conta após o login. Alterações locais são aplicadas
          imediatamente.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {[
          { id: "booking", label: "Mostrar reservas Booking.com", defaultOn: true },
          { id: "airbnb", label: "Mostrar reservas Airbnb", defaultOn: true },
          { id: "vrbo", label: "Mostrar reservas Vrbo", defaultOn: true },
          { id: "direto", label: "Mostrar reservas diretas", defaultOn: true },
          { id: "turnover", label: "Mostrar janelas de limpeza", defaultOn: true },
        ].map((f) => (
          <div key={f.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <Label htmlFor={f.id} className="text-sm font-medium">
              {f.label}
            </Label>
            <input
              id={f.id}
              type="checkbox"
              defaultChecked={f.defaultOn}
              className="size-4 accent-primary"
            />
          </div>
        ))}
        <Button className="w-full sm:w-auto" render={<Link href="/app/calendario" />}>
          Aplicar e voltar
        </Button>
      </CardContent>
    </Card>
  );
}
