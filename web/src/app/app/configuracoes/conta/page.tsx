import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { auth } from "@/auth";
import { getAccountSettings } from "@/lib/app-settings";
import { PageHeader } from "@/components/app/page-header";
import { ContaSettingsForm } from "./conta-settings-form";

export default async function ConfigContaPage() {
  const session = await auth();
  const fallback = {
    name: session?.user?.name ?? "Ingrid Almeida",
    email: session?.user?.email ?? "operacao@almeidamares.com.br",
  };
  const values = await getAccountSettings(fallback);

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Minha conta"
        description="Perfil operacional · e-mail e identificação nos relatórios."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <ContaSettingsForm defaultName={values.name} defaultEmail={values.email} />
        </CardContent>
      </Card>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/equipe", label: "Equipe & RBAC" },
          { href: "/app/configuracoes/empresa", label: "Empresa" },
          { href: "/app/configuracoes/lgpd", label: "LGPD" },
        ]}
      />
    </div>
  );
}
