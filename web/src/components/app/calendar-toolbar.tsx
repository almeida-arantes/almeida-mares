import Link from "next/link";
import { Filter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CalendarToolbar() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="gap-1.5" render={<Link href="/app/calendario/filtros" />}>
        <Filter className="h-4 w-4" />
        Filtros
      </Button>
      <Button size="sm" className="gap-1.5" render={<Link href="/app/reservas/nova" />}>
        <Plus className="h-4 w-4" />
        Nova reserva
      </Button>
    </div>
  );
}
