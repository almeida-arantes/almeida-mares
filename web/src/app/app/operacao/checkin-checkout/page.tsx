import { LogIn, LogOut } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { properties, reservations } from "@/lib/mock-data";
import { dateShort, initials } from "@/lib/formatters";
import { PageHeader } from "@/components/app/page-header";

function propName(id: string) {
  return properties.find((p) => p.id === id)?.nickname ?? "—";
}

export default function CheckinCheckoutPage() {
  const today = new Date();
  const sample = reservations.filter((r) => r.status === "em_estadia" || r.status === "confirmada").slice(0, 6);

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Check-in & Check-out do dia"
        description={today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <LogIn className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Check-ins</span>
            </div>
            <ul className="space-y-2 text-sm">
              {sample.slice(0, 3).map((r) => (
                <li key={r.id} className="flex justify-between border-b border-border/60 py-2 last:border-0">
                  <span>{initials(r.guestName)} · {r.guestName.split(" ")[0]}</span>
                  <span className="text-muted-foreground">{propName(r.propertyId)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Check-outs</span>
            </div>
            <ul className="space-y-2 text-sm">
              {sample.slice(3, 6).map((r) => (
                <li key={r.id} className="flex justify-between border-b border-border/60 py-2 last:border-0">
                  <span>{r.guestName}</span>
                  <span className="text-muted-foreground">{dateShort(r.checkOut)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <ModuleLinks
        title="Navegação"
        items={[
          { href: "/app/operacao", label: "Operação" },
          { href: "/app/operacao/limpeza", label: "Limpeza" },
          { href: "/app/operacao/manutencao", label: "Manutenção" },
          { href: "/app/operacao/estoque", label: "Estoque" },
        ]}
      />
    </div>
  );
}
