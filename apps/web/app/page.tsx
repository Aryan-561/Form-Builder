import { SiteHeader } from "~/components/organisms/SiteHeader";
import { HeroSection } from "~/components/organisms/HeroSection";
import { FeaturesSection } from "~/components/organisms/FeaturesSection";
import { TemplatesSection } from "~/components/organisms/TemplatesSection";
import { PricingSection } from "~/components/organisms/PricingSection";
import { CTASection } from "~/components/organisms/CTASection";
import { SiteFooter } from "~/components/organisms/SiteFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <PricingSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
