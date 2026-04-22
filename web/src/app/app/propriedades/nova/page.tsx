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
import { PageHeader } from "@/components/app/page-header";
import { owners } from "@/lib/mock-data";

export default function NovaPropriedadePage() {
  return (
    <div className="space-y-6 p-6">
      <Button variant="ghost" size="sm" className="-ml-2 w-fit gap-1" render={<Link href="/app/propriedades" />}>
        <ArrowLeft className="h-4 w-4" /> Propriedades
      </Button>
      <PageHeader title="Nova propriedade" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Identificação</CardTitle>
            <CardDescription>Apelido interno e endereço completo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Apelido</Label>
              <Input placeholder="Ex.: Casa Búzios" />
            </div>
            <div className="space-y-2">
              <Label>Endereço</Label>
              <Input placeholder="Rua, número, complemento" />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input placeholder="Salvador, BA" />
            </div>
            <div className="space-y-2">
              <Label>Proprietário</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {owners.map((o) => (
                    <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Capacidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2"><Label>Quartos</Label><Input type="number" min={1} defaultValue={2} /></div>
              <div className="space-y-2"><Label>Banheiros</Label><Input type="number" min={1} defaultValue={2} /></div>
              <div className="space-y-2"><Label>Máx. hósp.</Label><Input type="number" min={1} defaultValue={4} /></div>
            </div>
            <Button className="w-full" render={<Link href="/app/propriedades" />}>
              Salvar e continuar depois
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
