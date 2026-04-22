import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { params: Promise<{ token: string }> };

export default async function AceiteConvitePage({ params }: Props) {
  const { token } = await params;
  const short = token.length > 12 ? `${token.slice(0, 8)}…` : token;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <CardTitle className="text-center font-display">Convite do proprietário</CardTitle>
          <CardDescription className="text-center">
            Token <span className="font-mono text-foreground">{short}</span> — confirmação de termos ou convite.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center text-sm text-muted-foreground">
          <p>
            Em produção, este link validaria o convite, exibiria o contrato de prestação de serviços e registraría
            assinatura eletrônica + dados bancários para repasse.
          </p>
          <Button className="w-full" render={<Link href="/portal/painel" />}>
            Ir ao portal do proprietário
          </Button>
          <Button variant="outline" className="w-full" render={<Link href="/" />}>
            Voltar ao site
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
