import { HeroSection } from "@/components/HeroSection";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { EnvironmentalImpact } from "@/components/EnvironmentalImpact";
import { Certifications } from "@/components/Certifications";
import { PrimeRates } from "@/components/PrimeRates";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,95,180,0.15)_0%,rgba(11,18,33,0.4)_100%)]" />
      <div className="relative z-10">
        <Navbar />
        <main className="space-y-0">
          <HeroSection />
          <PrimeRates />
          <div id="lead-form" className="section-spacing container-padding">
            <div className="mx-auto max-w-7xl">
              <LeadForm />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221] to-transparent h-32" />
            <Benefits />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1221] h-32" />
            <TechnicalSpecs />
          </div>
          <Process />
          <SavingsCalculator />
          <EnvironmentalImpact />
          <Certifications />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;