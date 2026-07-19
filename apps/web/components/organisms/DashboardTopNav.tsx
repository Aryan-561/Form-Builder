import { Search, Bell } from "lucide-react";
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
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <a className="text-muted-foreground font-sans text-sm hover:text-primary transition-colors" href="#">Share</a>
          <a className="text-muted-foreground font-sans text-sm hover:text-primary transition-colors" href="#">Preview</a>
          <a className="text-muted-foreground font-sans text-sm hover:text-primary transition-colors" href="#">Publish</a>
        </div>
        <div className="h-6 w-px bg-border"></div>
        <div className="flex items-center gap-4">
          <button className="text-primary font-bold text-sm hover:underline active:scale-95 transition-all">Upgrade Plan</button>
          <button className="relative text-muted-foreground hover:text-primary transition-all active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border cursor-pointer active:scale-95 transition-all">
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AL
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
