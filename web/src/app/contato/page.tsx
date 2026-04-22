import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { ContatoForm } from "./contato-form";

export default function ContatoPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Contato</h1>
        <p className="mt-4 text-muted-foreground">
          Fale com a equipe comercial ou de suporte. Resposta em até um dia útil.
        </p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Envie uma mensagem</CardTitle>
            <CardDescription>Campos obrigatórios. Você receberá confirmação no e-mail informado.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContatoForm />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="flex gap-4 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Endereço</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Av. Oceânica, 880 — sala 302<br />Ondina · Salvador, BA · CEP 40.170-110
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Telefone</div>
                <div className="mt-1 text-sm text-muted-foreground">+55 71 3200-7700</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">E-mail</div>
                <div className="mt-1 text-sm text-muted-foreground">contato@almeidamares.com.br</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">WhatsApp</div>
                <div className="mt-1 text-sm text-muted-foreground">+55 71 99900-7700 (comercial)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingShell>
  );
}
