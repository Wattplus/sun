import { HeroSection } from "@/components/HeroSection";
import { Benefits } from "@/components/Benefits";
import { LeadForm } from "@/components/LeadForm";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <Benefits />
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <LeadForm />
        </div>
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;