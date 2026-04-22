import { PageHeaderSkeleton, PropertyCardsSkeleton } from "@/components/app/page-skeletons";

export default function PropriedadesLoading() {
  return (
    <div className="space-y-5 p-6">
      <PageHeaderSkeleton />
      <PropertyCardsSkeleton count={6} />
    </div>
  );
}
