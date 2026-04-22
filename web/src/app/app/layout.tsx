import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-0">
        <AppHeader />
        <main
          id="conteudo-principal"
          tabIndex={-1}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-muted/25 outline-none"
        >
          <div className="mx-auto min-h-full w-full max-w-[1680px]">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
