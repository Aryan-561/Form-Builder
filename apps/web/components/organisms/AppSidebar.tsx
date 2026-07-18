import Link from "next/link";
import { 
  FileText, 
  LayoutDashboard, 
  FileSpreadsheet, 
  LayoutTemplate, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut,
  Plus
} from "lucide-react";
import { Button } from "~/components/ui/button";

export function AppSidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-background flex flex-col py-8 px-4 z-50 border-r border-border">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-sans text-xl font-bold text-foreground tracking-tight">ProForms</h1>
            <p className="text-xs text-muted-foreground">Workspace Pro</p>
          </div>
        </div>
      </div>
      <Button className="mb-8 w-full font-bold flex items-center justify-center gap-2 shadow-sm">
        <Plus className="w-4 h-4" />
        Create New Form
      </Button>
      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-2 border-primary bg-accent transition-colors duration-200">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-sans text-sm">Dashboard</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
          <FileSpreadsheet className="w-5 h-5" />
          <span className="font-sans text-sm">Forms</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
          <LayoutTemplate className="w-5 h-5" />
          <span className="font-sans text-sm">Templates</span>
        </Link>
        <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
          <BarChart2 className="w-5 h-5" />
          <span className="font-sans text-sm">Analytics</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-sans text-sm">Settings</span>
        </Link>
      </nav>
      <div className="mt-auto pt-8 border-t border-border space-y-1">
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="font-sans text-sm">Help Center</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-sans text-sm">Log Out</span>
        </Link>
      </div>
    </aside>
  );
}
