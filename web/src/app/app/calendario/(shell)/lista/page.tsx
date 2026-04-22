import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { channels, properties, reservations } from "@/lib/mock-data";
import { brl, dateShort } from "@/lib/formatters";

export default function CalendarioListaPage() {
  const rows = [...reservations]
    .filter((r) => r.status !== "cancelada")
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-lg">Lista de estadias</CardTitle>
        <CardDescription>Ordenado por check-in · clique no código para abrir</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Hóspede</TableHead>
              <TableHead>Propriedade</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead className="text-right">Bruto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const ch = channels[r.channel];
              const prop = properties.find((p) => p.id === r.propertyId);
              return (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">
                    <Link href={`/app/reservas/${r.id}`} className="text-primary hover:underline">
                      {r.code}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{r.guestName}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">{prop?.nickname}</TableCell>
                  <TableCell>
                    <Badge variant="outline" style={{ borderColor: ch.hex, color: ch.hex }}>
                      {ch.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{dateShort(r.checkIn)}</TableCell>
                  <TableCell className="text-sm">{dateShort(r.checkOut)}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{brl(r.grossValue)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
