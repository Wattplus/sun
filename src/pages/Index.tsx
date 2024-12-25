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
import { ChatButton } from "@/components/chat/ChatButton";
import { ElectricityPriceSection } from "@/components/ElectricityPriceSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,95,180,0.15)_0%,rgba(11,18,33,0.4)_100%)]" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <div id="lead-form-top" className="py-16">
            <div className="container mx-auto px-4">
              <LeadForm />
            </div>
          </div>
          <ElectricityPriceSection />
          <Benefits />
          <TechnicalSpecs />
          <Process />
          <SavingsCalculator />
          <EnvironmentalImpact />
          <Certifications />
          <Testimonials />
          <FAQ />
          <PrimeRates />
          <div id="lead-form-bottom" className="py-16">
            <div className="container mx-auto px-4">
              <LeadForm />
            </div>
          </div>
        </main>
        <Footer />
        <ChatButton />
      </div>
    </div>
  );
};

export default Index;