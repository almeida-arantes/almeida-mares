import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailNav } from "@/components/app/detail-nav";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/app/page-header";
import { getOwnerById, propertiesByOwner } from "@/lib/mock-data";
import { brl } from "@/lib/formatters";

type Props = { params: Promise<{ id: string }> };

export default async function ProprietarioPropriedadesPage({ params }: Props) {
  const { id } = await params;
  const o = getOwnerById(id);
  if (!o) notFound();
  const list = propertiesByOwner(o.id);

  const nav = [
    { href: `/app/proprietarios/${id}`, label: "Perfil" },
    { href: `/app/proprietarios/${id}/propriedades`, label: "Propriedades" },
    { href: `/app/proprietarios/${id}/repasses`, label: "Repasses" },
    { href: `/app/proprietarios/${id}/documentos`, label: "Documentos" },
  ];

  return (
    <div className="space-y-5 p-6">
      <Link href="/app/proprietarios" className="text-sm text-muted-foreground hover:text-foreground">← Proprietários</Link>
      <PageHeader title={`Propriedades · ${o.name}`} />
      <DetailNav items={nav} />
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <Link href={`/app/propriedades/${p.id}` as never} className="font-medium hover:underline">
                {p.nickname}
              </Link>
              <div className="mt-1 text-xs text-muted-foreground">{p.city}</div>
              <div className="mt-2 font-mono text-sm">{brl(p.revenue30d)} · 30 dias</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
