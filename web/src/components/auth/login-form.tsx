"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FlaskConical, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Role = "staff" | "owner";

type LoginFormProps = {
  /** Mostra atalho de login sem credenciais (só quando isAuthDevBypass no servidor). */
  devShortcutEnabled?: boolean;
};

export function LoginForm({ devShortcutEnabled = false }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRaw = searchParams.get("next");
  const context = searchParams.get("context");

  const [role, setRole] = useState<Role>(context === "portal" ? "owner" : "staff");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (searchParams.get("context") === "portal") setRole("owner");
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        code,
        role,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Não foi possível entrar. Verifique e-mail, código e perfil selecionado.");
        return;
      }
      const next =
        nextRaw && (nextRaw.startsWith("/app") || nextRaw.startsWith("/portal"))
          ? nextRaw
          : role === "owner"
            ? "/portal/painel"
            : "/app/inicio";
      router.push(next);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  async function devQuickLogin(target: "staff" | "owner") {
    setPending(true);
    try {
      const res = await signIn("credentials", {
        email:
          target === "staff"
            ? "dev@almeidamares.com.br"
            : "ricardo.m@gmail.com",
        code: "dev",
        role: target,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Atalho de desenvolvimento indisponível (verifique o modo dev).");
        return;
      }
      const next =
        nextRaw && (nextRaw.startsWith("/app") || nextRaw.startsWith("/portal"))
          ? nextRaw
          : target === "owner"
            ? "/portal/painel"
            : "/app/inicio";
      router.push(next);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Tabs
        value={role}
        onValueChange={(v) => setRole(v as Role)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staff">Equipe operacional</TabsTrigger>
          <TabsTrigger value="owner">Proprietário</TabsTrigger>
        </TabsList>
        <TabsContent value="staff" className="mt-3 space-y-1">
          <p className="text-xs text-muted-foreground">
            Use o e-mail corporativo (@almeidamares.com.br) ou um e-mail autorizado pela empresa.
          </p>
        </TabsContent>
        <TabsContent value="owner" className="mt-3 space-y-1">
          <p className="text-xs text-muted-foreground">
            Use o mesmo e-mail cadastrado no contrato de gestão.
          </p>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="login-email">E-mail</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder={
            role === "staff" ? "voce@almeidamares.com.br" : "seu@email.com"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-code">Código de acesso</Label>
        <Input
          id="login-code"
          type="password"
          autoComplete="off"
          placeholder="Fornecido pela Almeida Mares"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        {process.env.NODE_ENV === "development" ? (
          <p className="text-xs text-muted-foreground">
            Desenvolvimento: configure{" "}
            <code className="rounded bg-muted px-1">AUTH_LOGIN_CODE</code> no servidor. Em produção, use magic link
            ou SSO.
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-full gap-2" disabled={pending}>
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
        Entrar
      </Button>

      {devShortcutEnabled ? (
        <div className="space-y-2 rounded-lg border border-dashed border-amber-500/50 bg-amber-500/5 p-3">
          <p className="text-xs font-medium text-amber-950 dark:text-amber-100">
            Desenvolvimento — sem credenciais
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2 border-amber-500/40"
              disabled={pending}
              onClick={() => void devQuickLogin("staff")}
            >
              <FlaskConical className="h-4 w-4 shrink-0" />
              Painel equipe
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2 border-amber-500/40"
              disabled={pending}
              onClick={() => void devQuickLogin("owner")}
            >
              <FlaskConical className="h-4 w-4 shrink-0" />
              Portal proprietário
            </Button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
