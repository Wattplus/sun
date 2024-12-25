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
import { ProjectGallery } from "@/components/ProjectGallery";
import { Certifications } from "@/components/Certifications";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <Benefits />
        <SavingsCalculator />
        <Process />
        <TechnicalSpecs />
        <EnvironmentalImpact />
        <ProjectGallery />
        <Testimonials />
        <Certifications />
        <FAQ />
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <LeadForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;