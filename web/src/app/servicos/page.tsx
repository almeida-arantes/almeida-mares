import { Building2, CalendarClock, FileSpreadsheet, Headphones, MessageSquare, Shield, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { MarketingShell } from "@/components/marketing/marketing-shell";

const services = [
  {
    icon: CalendarClock,
    title: "Gestão integrada de canais",
    text: "Booking.com (Connectivity API em XML), Airbnb (iCal hoje; Partner API quando aprovado), Vrbo e site direto no mesmo calendário.",
  },
  {
    icon: MessageSquare,
    title: "Atendimento e messaging",
    text: "Inbox unificado com tradução, templates e IA para sugestão de resposta. WhatsApp Business Cloud para o que importa.",
  },
  {
    icon: FileSpreadsheet,
    title: "Fechamento financeiro",
    text: "Extratos mensais com memória de cálculo, anexos de faturas OTA e repasses via PIX em lote. Nada em planilha paralela.",
  },
  {
    icon: Users,
    title: "Relacionamento com proprietários",
    text: "Portal dedicado: calendário de leitura, extratos, documentos e canal direto com a operação.",
  },
  {
    icon: Building2,
    title: "Operação de housekeeping",
    text: "Kanban de limpeza e manutenção, fotos de vistoria e checklist por unidade.",
  },
  {
    icon: Shield,
    title: "Compliance LGPD & auditoria",
    text: "Log imutável, consentimentos, exportação de dados e pseudonimização no portal.",
  },
  { icon: Headphones, title: "Suporte à equipe", text: "Onboarding dos canais, treinamento e acompanhamento nos primeiros fechamentos mensais." },
];

export default function ServicosPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Serviços</h1>
        <p className="mt-4 text-muted-foreground">
          O que a Almeida Mares entrega para proprietários e para a sua operação — unificado numa única plataforma.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <Card key={s.title} className="border-border/60">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingShell>
  );
}
