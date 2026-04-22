import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { PageHeader } from "@/components/app/page-header";

const faturas = [
  { name: "Booking_fatura_abr2026.pdf", size: "124 KB", canal: "Booking.com" },
  { name: "Airbnb_payout_abr2026.pdf", size: "98 KB", canal: "Airbnb" },
  { name: "Vrbo_statement_abr2026.pdf", size: "76 KB", canal: "Vrbo" },
];

const hub = [
  { href: "/app/financeiro", label: "Visão geral" },
  { href: "/app/financeiro/conciliacao", label: "Conciliação" },
];

export default function FaturasOtaPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Faturas & payouts das OTAs"
        description="PDFs importados por e-mail ou API, OCR e vínculo automático."
      />
      <div className="space-y-2">
        {faturas.map((f) => (
          <Card key={f.name}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="font-mono text-sm">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.canal} · {f.size}</div>
              </div>
              <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> Baixar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks title="Navegação" items={hub} />
    </div>
  );
}
