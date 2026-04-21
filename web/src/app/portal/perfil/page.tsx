import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PerfilPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Meu perfil</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mantenha seus dados atualizados. Alterações sensíveis (conta bancária,
          documento) passam por confirmação da Almeida Mares.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Dados pessoais</CardTitle>
          <CardDescription>Seus contatos para comunicação e relatórios.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Nome completo</Label>
            <Input defaultValue="Ricardo Mendonça" />
          </div>
          <div className="space-y-1.5">
            <Label>CPF</Label>
            <Input defaultValue="214.***.***-08" disabled />
          </div>
          <div className="space-y-1.5">
            <Label>E-mail</Label>
            <Input defaultValue="ricardo.m@gmail.com" type="email" />
          </div>
          <div className="space-y-1.5">
            <Label>WhatsApp</Label>
            <Input defaultValue="+55 71 99***-1120" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Conta para recebimento</CardTitle>
          <CardDescription>PIX ou TED. Alteração requer aprovação.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Chave PIX</Label>
            <Input defaultValue="214***08" disabled />
          </div>
          <div className="space-y-1.5">
            <Label>Banco</Label>
            <Input defaultValue="077 · Banco Inter" disabled />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar alterações</Button>
      </div>
    </div>
  );
}
