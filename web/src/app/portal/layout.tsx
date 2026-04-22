import { Shield } from "lucide-react";

import { PortalHeader } from "@/components/portal/portal-header";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <PortalHeader />

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="mx-auto max-w-6xl px-6 py-8 outline-none"
      >
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            Acesso criptografado · LGPD compliant
          </div>
          <div>© 2026 Almeida Mares</div>
        </div>
      </footer>
    </div>
  );
}
