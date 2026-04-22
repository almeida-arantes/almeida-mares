import { MarketingShell } from "@/components/marketing/marketing-shell";
import { LegalArticle } from "@/components/legal/legal-article";

const toc = [
  { id: "aceitacao", label: "Aceitação" },
  { id: "servico", label: "Serviço" },
  { id: "dados", label: "Dados" },
  { id: "limitacao", label: "Limitação" },
] as const;

export default function TermosPage() {
  return (
    <MarketingShell>
      <LegalArticle
        title="Termos de uso"
        subtitle="Última atualização: abril de 2026"
        toc={[...toc]}
      >
        <h2 id="aceitacao">1. Aceitação</h2>
        <p>
          Ao acessar ou utilizar a plataforma Almeida Mares, você declara ter lido e concordado com estes termos
          e com a política de privacidade aplicável ao seu perfil (operador ou proprietário).
        </p>
        <h2 id="servico">2. Serviço</h2>
        <p>
          A plataforma oferece ferramentas de gestão de aluguel por temporada, incluindo calendário unificado,
          relatórios financeiros e portal do proprietário, conforme descrito no site e na documentação interna.
        </p>
        <h2 id="dados">3. Dados</h2>
        <p>
          O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados (LGPD). Detalhes na{" "}
          <a href="/privacidade" className="text-primary underline">
            Política de privacidade
          </a>
          .
        </p>
        <h2 id="limitacao">4. Limitação</h2>
        <p>
          O serviço é prestado conforme contrato de prestação de serviços ou termos de adesão firmados entre as
          partes. Para esclarecimentos jurídicos, utilize os canais oficiais indicados no portal ou no contrato.
        </p>
      </LegalArticle>
    </MarketingShell>
  );
}
