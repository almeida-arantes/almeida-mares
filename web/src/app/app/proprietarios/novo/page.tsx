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

export default function NovoProprietarioPage() {
  return (
    <div className="space-y-6 p-6">
      <Button variant="ghost" size="sm" className="-ml-2 w-fit gap-1" render={<Link href="/app/proprietarios" />}>
        <ArrowLeft className="h-4 w-4" /> Proprietários
      </Button>
      <PageHeader
        title="Novo proprietário"
        description="Cadastro vinculado ao contrato de gestão e ao portal do proprietário."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Dados cadastrais</CardTitle>
            <CardDescription>PF ou PJ.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select defaultValue="pf">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pf">Pessoa física</SelectItem>
                  <SelectItem value="pj">Pessoa jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome / Razão social</Label>
              <Input placeholder="Nome completo" />
            </div>
            <div className="space-y-2">
              <Label>CPF / CNPJ</Label>
              <Input placeholder="000.000.000-00" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input type="email" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input placeholder="+55" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Comercial</CardTitle>
            <CardDescription>Taxa de gestão e D+ do repasse.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Comissão Almeida Mares (%)</Label>
              <Input type="number" defaultValue={20} min={10} max={30} />
            </div>
            <div className="space-y-2">
              <Label>Dia de fechamento</Label>
              <Select defaultValue="1">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 5, 10, 15].map((d) => (
                    <SelectItem key={d} value={String(d)}>Dia {d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" render={<Link href="/app/proprietarios" />}>
              Salvar proprietário
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
