import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const slugs = ["contrato-gestao-2024", "procuracao", "adendo-abril-2025", "carne-leao-2024"] as const;

type Props = { params: Promise<{ slug: string }> };

export default async function PortalDocumentoDownloadPage({ params }: Props) {
  const { slug } = await params;
  if (!slugs.includes(slug as (typeof slugs)[number])) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-6 py-8">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="text-sm text-muted-foreground">
            O arquivo <span className="font-mono">{slug}</span> será disponibilizado para download.
          </p>
          <Button render={<Link href={`/portal/documentos/${slug}`} />}>Voltar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
