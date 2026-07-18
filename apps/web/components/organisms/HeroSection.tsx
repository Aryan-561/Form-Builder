import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block py-1 px-3 mb-6 rounded-full bg-accent text-accent-foreground font-sans text-xs uppercase tracking-wider font-semibold">
          Next-Gen Form Builder
        </span>
        <h1 className="font-sans text-4xl md:text-6xl max-w-4xl mx-auto mb-8 text-foreground font-bold tracking-tight">
          Forms that feel like conversations
        </h1>
        <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Build professional forms in minutes with our intuitive builder. No code required. Power your data collection with conversational flows that users actually enjoy.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto px-8 py-6 rounded-xl font-sans font-semibold text-base shadow-md">
            Create Your First Form
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 rounded-xl font-sans font-semibold text-base text-muted-foreground">
            View Live Demo
          </Button>
        </div>
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-border/50">
            <img 
              className="w-full h-auto rounded-xl shadow-inner" 
              alt="FormBuilder interface" 
              src="/builder_screenshot.png" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
