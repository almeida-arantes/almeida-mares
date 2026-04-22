import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ModuleLinks } from "@/components/app/module-links";
import { channels } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";

const share = [
  { ch: "booking" as const, v: 38 },
  { ch: "airbnb" as const, v: 47 },
  { ch: "vrbo" as const, v: 9 },
  { ch: "direto" as const, v: 6 },
];

export default function RelatorioCanaisPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Distribuição por canal"
        description="% da receita bruta por origem no período selecionado."
      />
      <Card>
        <CardContent className="space-y-4 p-6">
          {share.map((s) => (
            <div key={s.ch} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span style={{ color: channels[s.ch].hex }}>{channels[s.ch].label}</span>
                <span className="font-mono">{s.v}%</span>
              </div>
              <Progress value={s.v} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
      <ModuleLinks
        title="Outros relatórios"
        items={[
          { href: "/app/relatorios", label: "Índice" },
          { href: "/app/relatorios/por-proprietario", label: "Por proprietário" },
          { href: "/app/relatorios/gerar/extrato-mensal", label: "Gerador extrato (template)" },
        ]}
      />
    </div>
  );
}
