import { HeroSection } from "@/components/HeroSection";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { ElectricityPriceSection } from "@/components/ElectricityPriceSection";
import { EnvironmentalImpact } from "@/components/EnvironmentalImpact";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Certifications } from "@/components/Certifications";
import { PrimeRates } from "@/components/PrimeRates";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <Navbar />
      <main>
        <HeroSection />
        <Benefits />
        <Process />
        <ElectricityPriceSection />
        <ProjectGallery />
        <EnvironmentalImpact />
        <TechnicalSpecs />
        <PrimeRates />
        <Testimonials />
        <Certifications />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;