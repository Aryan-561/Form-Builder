import { AppSidebar } from "~/components/organisms/AppSidebar";
import { DashboardTopNav } from "~/components/organisms/DashboardTopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <DashboardTopNav />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
