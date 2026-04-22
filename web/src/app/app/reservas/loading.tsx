import { Skeleton } from "@/components/ui/skeleton";
import { PageHeaderSkeleton, TableSkeleton } from "@/components/app/page-skeletons";

export default function ReservasLoading() {
  return (
    <div className="space-y-5 p-6">
      <PageHeaderSkeleton />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28" />
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-32" />
      </div>
      <TableSkeleton rows={7} columns={6} />
    </div>
  );
}
