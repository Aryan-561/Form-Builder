import { Button } from "~/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-card rounded-3xl p-12 md:p-24 text-center relative overflow-hidden border border-border/50 shadow-sm">
        <div className="relative z-10">
          <h2 className="font-sans text-4xl md:text-5xl text-foreground mb-8 font-bold tracking-tight">Ready to revolutionize your data?</h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of teams already building better conversations with ProForms.
          </p>
          <Button size="lg" className="px-10 py-8 rounded-xl font-sans font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl">
            Start Building for Free
          </Button>
          <p className="mt-6 text-xs text-muted-foreground opacity-80">No credit card required. 14-day Pro trial included.</p>
        </div>
      </div>
    </section>
  );
}
