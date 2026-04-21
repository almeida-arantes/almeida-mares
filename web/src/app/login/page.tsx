import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/logo";

export default function LoginPage() {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,theme(colors.white/.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,theme(colors.white/.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-faint opacity-15" />
        <Logo className="relative z-10 text-primary-foreground [&_*]:text-primary-foreground" />
        <div className="relative z-10 space-y-4">
          <blockquote className="font-display text-2xl leading-snug text-balance">
            &ldquo;A Almeida Mares finalmente me deu visibilidade real do meu
            imóvel. O extrato chega pronto, com as faturas anexas. Em 3 meses
            eu deixei de ficar no WhatsApp pedindo explicação.&rdquo;
          </blockquote>
          <footer className="text-sm opacity-80">
            Ricardo Mendonça · proprietário desde 2023
          </footer>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Bem-vinda de volta
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Use seu e-mail para entrar. Enviaremos um link mágico de acesso.
            </p>
          </div>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@almeidamares.com.br"
                  autoComplete="email"
                />
              </div>
              <Button className="w-full gap-2" render={<Link href="/app/inicio" />}>
                <Mail className="h-4 w-4" />
                Entrar com magic link
              </Button>
              <div className="relative text-center text-xs text-muted-foreground">
                <span className="relative z-10 bg-card px-2">ou</span>
                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              </div>
              <Button
                variant="outline"
                className="w-full gap-2"
                render={<Link href="/app/inicio" />}
              >
                Continuar como demonstração
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            É proprietário? <Link href="/portal/painel" className="underline hover:text-foreground">Acesse o portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
