import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/logo";

export default function RecuperarSenhaPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Logo className="[&_*]:text-primary-foreground" />
        <p className="max-w-sm text-sm opacity-90">
          Enviaremos um link seguro para redefinir sua senha. O fluxo completo estará disponível após a integração com o provedor de autenticação.
        </p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1" render={<Link href="/login" />}>
            <ArrowLeft className="h-4 w-4" /> Voltar ao login
          </Button>
          <div>
            <h1 className="font-display text-2xl font-semibold">Recuperar senha</h1>
            <p className="mt-1 text-sm text-muted-foreground">Digite o e-mail da sua conta.</p>
          </div>
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="voce@empresa.com.br" />
              </div>
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Enviar link de recuperação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
