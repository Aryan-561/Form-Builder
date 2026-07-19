import { AppSidebar } from "~/components/organisms/AppSidebar";
import { DashboardTopNav } from "~/components/organisms/DashboardTopNav";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full min-w-0">
          <DashboardTopNav />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
