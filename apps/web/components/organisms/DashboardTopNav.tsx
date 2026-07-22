import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { SidebarTrigger } from "~/components/ui/sidebar";

export function DashboardTopNav() {
  return (
    <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 sticky top-0 bg-background z-40 border-b border-border">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <SidebarTrigger className="-ml-2 md:ml-0 text-muted-foreground hover:text-foreground" />
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            className="w-full bg-accent/50 border-none rounded-full py-2 pl-10 pr-4 focus-visible:ring-1 focus-visible:ring-primary text-sm"
            placeholder="Search forms, responses..."
          />
        </div>
      </div>
    </header>
  );
}
