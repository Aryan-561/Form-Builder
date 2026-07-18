import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-20 px-4 md:px-10 bg-muted" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl font-semibold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="font-sans text-base text-muted-foreground">Start for free and scale as you grow. No hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 flex flex-col">
            <div className="mb-8">
              <h3 className="font-sans text-2xl font-semibold text-foreground mb-2">Free</h3>
              <p className="font-sans text-sm text-muted-foreground">For personal projects</p>
              <div className="mt-4">
                <span className="font-sans text-5xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Up to 10 forms</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">100 monthly responses</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Basic templates</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full py-6 rounded-xl font-semibold">Get Started</Button>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-xl border-2 border-primary flex flex-col relative transform md:scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs uppercase font-bold">Most Popular</div>
            <div className="mb-8">
              <h3 className="font-sans text-2xl font-semibold text-foreground mb-2">Pro</h3>
              <p className="font-sans text-sm text-muted-foreground">For growing teams</p>
              <div className="mt-4">
                <span className="font-sans text-5xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Unlimited forms</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">5,000 monthly responses</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Advanced logic & branching</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Brand-free forms</span>
              </li>
            </ul>
            <Button className="w-full py-6 rounded-xl font-semibold shadow-md">Go Pro</Button>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 flex flex-col">
            <div className="mb-8">
              <h3 className="font-sans text-2xl font-semibold text-foreground mb-2">Enterprise</h3>
              <p className="font-sans text-sm text-muted-foreground">For large organizations</p>
              <div className="mt-4">
                <span className="font-sans text-5xl font-bold text-foreground">Custom</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Unlimited everything</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">SSO & Security features</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Dedicated support</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="text-primary w-5 h-5" /> <span className="text-sm">Custom integrations</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full py-6 rounded-xl font-semibold">Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
