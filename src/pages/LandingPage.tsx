import { Benefits } from "@/components/Benefits";
import { ElectricityPriceSection } from "@/components/ElectricityPriceSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { LeadForm } from "@/components/LeadForm";
import { Navbar } from "@/components/Navbar";
import { PrimeRates } from "@/components/PrimeRates";
import { Process } from "@/components/Process";
import { ProjectGallery } from "@/components/ProjectGallery";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { Testimonials } from "@/components/Testimonials";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Benefits />
        <Process />
        <ElectricityPriceSection />
        <TechnicalSpecs />
        <PrimeRates />
        <ProjectGallery />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};