import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DetailNav } from "@/components/app/detail-nav";
import { getPropertyById } from "@/lib/mock-data";
import { PageHeader } from "@/components/app/page-header";
import { propertyDetailNav } from "@/lib/property-detail-nav";

type Props = { params: Promise<{ id: string }> };

export default async function PropriedadeFotosPage({ params }: Props) {
  const { id } = await params;
  const p = getPropertyById(id);
  if (!p) notFound();

  const gallery = [p.image, p.image, p.image];

  return (
    <div className="space-y-5 p-6">
      <Link href={`/app/propriedades/${id}`} className="text-sm text-muted-foreground hover:text-foreground">
        ← {p.nickname}
      </Link>
      <PageHeader title="Galeria de fotos" description="Ordem arrastável · primeira foto = capa nos canais.">
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Adicionar fotos
        </Button>
      </PageHeader>
      <DetailNav items={propertyDetailNav(id)} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
            <Image src={src} alt="" fill className="object-cover" sizes="(max-width:768px)50vw,33vw" />
          </div>
        ))}
      </div>
    </div>
  );
}
