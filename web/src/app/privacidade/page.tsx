import { MarketingShell } from "@/components/marketing/marketing-shell";
import { LegalArticle } from "@/components/legal/legal-article";

const toc = [
  { id: "finalidades", label: "Finalidades" },
  { id: "bases-legais", label: "Bases legais" },
  { id: "direitos", label: "Direitos do titular" },
  { id: "seguranca", label: "Segurança" },
] as const;

export default function PrivacidadePage() {
  return (
    <MarketingShell>
      <LegalArticle
        title="Política de privacidade (LGPD)"
        subtitle="Controlador: Almeida Mares Gestão de Imóveis LTDA · abril/2026"
        toc={[...toc]}
      >
        <h2 id="finalidades">Finalidades</h2>
        <p>
          Tratamos dados de proprietários, hóspedes e equipe para operar reservas, financeiro, comunicação por canais
          oficiais (incluindo WhatsApp Business) e cumprimento legal (fiscal, contábil e LGPD).
        </p>
        <h2 id="bases-legais">Bases legais</h2>
        <p>
          Execução de contrato, legítimo interesse (segurança e melhoria do serviço), consentimento quando exigido
          (ex.: marketing não essencial) e obrigação legal.
        </p>
        <h2 id="direitos">Direitos do titular</h2>
        <p>
          Acesso, correção, portabilidade, anonimização, informação sobre compartilhamentos e revogação de consentimento.
          Canal:{" "}
          <a href="mailto:privacidade@almeidamares.com.br" className="text-primary underline">
            privacidade@almeidamares.com.br
          </a>
          .
        </p>
        <h2 id="seguranca">Segurança</h2>
        <p>
          Criptografia em trânsito (TLS), controles de acesso por papéis (RBAC), backup e trilha de auditoria imutável
          para eventos financeiros e administrativos.
        </p>
      </LegalArticle>
    </MarketingShell>
  );
}
