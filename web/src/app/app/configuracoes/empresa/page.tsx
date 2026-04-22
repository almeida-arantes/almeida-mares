import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { getCompanySettings } from "@/lib/app-settings";
import { PageHeader } from "@/components/app/page-header";
import { EmpresaSettingsForm } from "./empresa-settings-form";

export default async function ConfigEmpresaPage() {
  const company = await getCompanySettings();

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dados da empresa"
        description="Aparecem em PDFs, contratos e NF quando aplicável."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">{company.legalName}</CardTitle>
          <CardDescription>CNPJ · Simples Nacional · Anexo III</CardDescription>
        </CardHeader>
        <CardContent>
          <EmpresaSettingsForm
            legalName={company.legalName}
            cnpj={company.cnpj}
            address={company.address}
          />
        </CardContent>
      </Card>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/templates", label: "Templates" },
          { href: "/app/configuracoes/lgpd", label: "LGPD" },
        ]}
      />
    </div>
  );
}
