import { GitBranch, BarChart3, Wand2 } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted px-4 md:px-10" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl font-semibold text-foreground mb-4">Powerful Features for Modern Teams</h2>
          <p className="font-sans text-base text-muted-foreground max-w-xl mx-auto">
            Everything you need to collect data, analyze results, and automate your workflow in one seamless platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <GitBranch className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Logic-driven flows</h3>
            <p className="font-sans text-base text-muted-foreground">
              Create complex paths and conditional questions that adapt to user responses in real-time. Personalization at scale.
            </p>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Real-time analytics</h3>
            <p className="font-sans text-base text-muted-foreground">
              Watch conversions happen live. Deep-dive into drop-off points and visualize your data with beautiful, interactive charts.
            </p>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <Wand2 className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Beautiful templates</h3>
            <p className="font-sans text-base text-muted-foreground">
              Starting from scratch is hard. Choose from over 100+ designer-crafted templates optimized for conversion and engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
