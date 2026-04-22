import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/app/page-header";
import { properties } from "@/lib/mock-data";

export default function NovaReservaPage() {
  return (
    <div className="space-y-6 p-6">
      <Button variant="ghost" size="sm" className="-ml-2 w-fit gap-1" render={<Link href="/app/reservas" />}>
        <ArrowLeft className="h-4 w-4" /> Reservas
      </Button>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="Nova reserva"
          description="Reserva manual, bloqueio ou canal direto. Revise valores e disponibilidade antes de confirmar."
        />
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline" render={<Link href="/app/reservas" />}>Cancelar</Button>
          <Button render={<Link href="/app/reservas" />}>Salvar rascunho</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Hóspede</CardTitle>
            <CardDescription>Nome como aparecerá nos canais internos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input placeholder="Maria Silva" />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input type="email" placeholder="maria@email.com" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Telefone / WhatsApp</Label>
                <Input placeholder="+55 71 99999-0000" />
              </div>
              <div className="space-y-2">
                <Label>País</Label>
                <Input placeholder="BR" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Observações internas</Label>
              <Textarea placeholder="Notas visíveis só para a equipe Almeida Mares" className="min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Estadia</CardTitle>
            <CardDescription>Propriedade, datas e canal de origem.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Propriedade</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nickname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Check-in</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Check-out</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Canal</Label>
              <Select defaultValue="direto">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direto">Direto (site / WhatsApp)</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="vrbo">Vrbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Valor bruto (R$)</Label>
                <Input placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label>Hóspedes</Label>
                <Input type="number" min={1} defaultValue={2} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
