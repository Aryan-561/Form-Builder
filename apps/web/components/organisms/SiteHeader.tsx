import Link from "next/link";
import { Button } from "~/components/ui/button";

export function SiteHeader() {
  return (
    <header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 z-50 bg-background shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="font-sans text-2xl font-bold text-primary">ProForms</h1>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#templates">
            Templates
          </Link>
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" href="#pricing">
            Pricing
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="hidden md:flex text-primary font-semibold hover:bg-accent" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button className="bg-primary text-primary-foreground font-semibold shadow-sm hover:brightness-90 active:scale-95 transition-all" asChild>
          <Link href="/signup">Upgrade Plan</Link>
        </Button>
      </div>
    </header>
  );
}
