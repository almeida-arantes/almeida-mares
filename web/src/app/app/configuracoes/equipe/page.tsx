import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLinks } from "@/components/app/module-links";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/app/page-header";

const membros = [
  { nome: "Ingrid Almeida", email: "operacao@...", papel: "Admin", iniciais: "IA" },
  { nome: "Financeiro", email: "financeiro@...", papel: "Financeiro", iniciais: "FN" },
  { nome: "Camila (limpeza)", email: "camila@...", papel: "Operação", iniciais: "CS" },
];

export default function ConfigEquipePage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Equipe & permissões"
        description="RBAC com papéis pré-definidos e flags por módulo."
      />
      <div className="space-y-2">
        {membros.map((m) => (
          <Card key={m.nome}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar><AvatarFallback className="bg-primary/15 text-primary">{m.iniciais}</AvatarFallback></Avatar>
                <div>
                  <div className="font-medium">{m.nome}</div>
                  <div className="font-mono text-xs text-muted-foreground">{m.email}</div>
                </div>
              </div>
              <Badge variant="secondary">{m.papel}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <ModuleLinks
        title="Configurações"
        items={[
          { href: "/app/configuracoes", label: "Índice" },
          { href: "/app/configuracoes/conta", label: "Conta" },
          { href: "/app/configuracoes/templates", label: "Templates" },
        ]}
      />
    </div>
  );
}
