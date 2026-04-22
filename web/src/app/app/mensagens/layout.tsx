import { Suspense } from "react";
import { Inbox } from "lucide-react";

import { MensagensSidebar } from "@/components/app/mensagens-sidebar";
import { MensagensSidebarSkeleton } from "@/components/app/page-skeletons";
import { PageHeader } from "@/components/app/page-header";

export default function MensagensLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-b px-6 py-3">
        <PageHeader
          title="Mensagens"
          description={
            <span className="inline-flex items-center gap-1.5">
              <Inbox className="h-3.5 w-3.5" />
              Inbox unificado · Booking, Airbnb, WhatsApp e e-mail em uma tela.
            </span>
          }
          className="gap-2 sm:items-center"
        />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-12">
        <Suspense
          fallback={
            <MensagensSidebarSkeleton className="col-span-12 max-h-[40vh] md:col-span-4 md:max-h-none lg:col-span-3" />
          }
        >
          <MensagensSidebar className="col-span-12 max-h-[40vh] md:col-span-4 md:max-h-none lg:col-span-3" />
        </Suspense>
        <div className="col-span-12 flex min-h-0 flex-col md:col-span-8 lg:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}
