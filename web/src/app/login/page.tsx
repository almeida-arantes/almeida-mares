import Link from "next/link";
import { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/brand/logo";
import { LoginForm } from "@/components/auth/login-form";
import { isAuthDevBypass } from "@/lib/dev-auth-bypass";

export default function LoginPage() {
  const devBypass = isAuthDevBypass();

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
              Escolha o perfil, informe seu e-mail e o código de acesso fornecido pela
              equipe.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Suspense fallback={null}>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>

          {devBypass ? (
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-950 dark:text-amber-100">
              <strong className="font-medium">Modo desenvolvedor:</strong> com{" "}
              <code className="rounded bg-background/80 px-1 py-px font-mono">
                NEXT_PUBLIC_AUTH_DEV_BYPASS=true
              </code>{" "}
              no <code className="font-mono">.env.local</code> você acessa o painel direto:{" "}
              <Link href="/app/inicio" className="underline font-medium">
                /app/inicio
              </Link>
              {" · "}
              <Link href="/portal/painel" className="underline font-medium">
                /portal/painel
              </Link>
              {" "}
              (sem cadastro e sem formulário).
            </div>
          ) : null}

          <p className="text-center text-xs text-muted-foreground">
            <Link href="/recuperar-senha" className="underline hover:text-foreground">
              Esqueci minha senha
            </Link>
            {" · "}
            É proprietário?{" "}
            <Link href="/login?context=portal" className="underline hover:text-foreground">
              Acesse o portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
