import { AppSidebar } from "~/components/organisms/AppSidebar";
import { DashboardTopNav } from "~/components/organisms/DashboardTopNav";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AiGenerateFormDialog } from "~/components/ai-generate-form-dialog";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background relative">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full min-w-0">
          <DashboardTopNav />
          <main className="flex-1 p-6 pb-24">{children}</main>
        </div>

        {/* Floating AI Icon in bottom right of viewport */}
        <div className="fixed bottom-6 right-6 z-40">
          <AiGenerateFormDialog
            isIconOnly
            triggerClassName="h-12 w-12 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border-primary/20 bg-background text-primary"
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
