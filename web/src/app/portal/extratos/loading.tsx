import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExtratosLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-2 h-4 w-full max-w-lg" />
      </div>
      <div className="grid gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Skeleton className="size-12 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
              <Skeleton className="h-8 w-28" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
