import Link from "next/link";
import { Globe, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="font-sans text-xl font-bold text-foreground">ProForms</h2>
          <p className="font-sans text-sm text-muted-foreground max-w-xs text-center md:text-left">
            © 2024 ProForms Inc. Built for high-performance teams. The conversational data standard.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-8">
          <Link className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline transition-all" href="#">Terms</Link>
          <Link className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline transition-all" href="#">Privacy</Link>
          <Link className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline transition-all" href="#">Support</Link>
          <Link className="font-sans text-sm text-muted-foreground hover:text-foreground hover:underline transition-all" href="#">API Docs</Link>
        </nav>
        <div className="flex gap-4">
          <Link className="text-muted-foreground hover:text-primary transition-colors" href="#"><Globe className="w-5 h-5" /></Link>
          <Link className="text-muted-foreground hover:text-primary transition-colors" href="#"><Mail className="w-5 h-5" /></Link>
        </div>
      </div>
    </footer>
  );
}
