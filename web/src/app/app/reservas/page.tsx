import { Download, Filter, Plus, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { channels, properties, reservations } from "@/lib/mock-data";
import { brl, dateShort, initials } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  confirmada: { label: "Confirmada", className: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  em_estadia: { label: "Em estadia", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  concluida: { label: "Concluída", className: "bg-muted text-muted-foreground" },
  cancelada: { label: "Cancelada", className: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
  pendente: { label: "Pendente", className: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
};

function propName(id: string) {
  return properties.find((p) => p.id === id)?.nickname ?? "—";
}

export default function ReservasPage() {
  const sorted = [...reservations].sort(
    (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime(),
  );
  const stats = {
    total: reservations.length,
    active: reservations.filter((r) => r.status !== "cancelada").length,
    confirmed: reservations.filter((r) => r.status === "confirmada").length,
    checkedIn: reservations.filter((r) => r.status === "em_estadia").length,
    gross: reservations.reduce((s, r) => s + r.grossValue, 0),
  };

  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Reservas</h1>
          <p className="text-sm text-muted-foreground">
            {stats.total} reservas · {stats.active} ativas · {brl(stats.gross)} em bruto
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Nova reserva
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todas">
        <TabsList>
          <TabsTrigger value="todas">Todas ({stats.total})</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas ({stats.confirmed})</TabsTrigger>
          <TabsTrigger value="estadia">Em estadia ({stats.checkedIn})</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por hóspede, código, propriedade…" className="pl-8" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          Filtros
          <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">3</Badge>
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px]">Código</TableHead>
              <TableHead>Hóspede</TableHead>
              <TableHead>Propriedade</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead className="text-center">Check-in</TableHead>
              <TableHead className="text-center">Check-out</TableHead>
              <TableHead className="text-center">Noites</TableHead>
              <TableHead className="text-right">Bruto</TableHead>
              <TableHead className="text-right">Líquido</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((r) => {
              const ch = channels[r.channel];
              const s = statusConfig[r.status];
              return (
                <TableRow key={r.id} className="group cursor-pointer">
                  <TableCell className="font-mono text-xs">{r.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                          {initials(r.guestName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {r.guestName}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {r.guests} hóspedes · {r.guestCountry}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate text-sm">{propName(r.propertyId)}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-medium"
                      style={{ borderColor: ch.hex, color: ch.hex }}
                    >
                      {ch.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {dateShort(r.checkIn)}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {dateShort(r.checkOut)}
                  </TableCell>
                  <TableCell className="text-center text-sm font-mono">
                    {r.nights}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {brl(r.grossValue)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    {brl(r.netOwner)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                        s.className,
                      )}
                    >
                      {s.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
