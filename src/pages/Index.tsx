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
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-white to-[#0B1221]">
      <Navbar />
      <main className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="relative">
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
          <div className="bg-gradient-to-b from-[#0B1221] to-[#1a5fb4] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <LeadForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;