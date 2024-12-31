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
import { Helmet } from "react-helmet";

export const Index = () => {
  return (
    <>
      <Helmet>
        <title>Installation Panneaux Solaires - Expert Photovoltaïque</title>
        <meta name="description" content="Expert en installation de panneaux solaires photovoltaïques. Obtenez un devis gratuit pour votre projet d'énergie solaire et bénéficiez des meilleures aides." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <main>
          <article>
            <HeroSection />
            
            <div className="container mx-auto px-4 py-12">
              <div className="glass-panel p-8 rounded-2xl border border-primary/20 backdrop-blur-md">
                <div className="mb-6 space-y-3">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Demandez votre étude gratuite
                  </h2>
                  <p className="text-white/80">
                    Découvrez votre potentiel d'économies en 2 minutes. Notre équipe d'experts analysera votre situation et vous proposera la meilleure solution pour votre installation photovoltaïque.
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>

            <Benefits />
            <Process />
            <ElectricityPriceSection />
            <ProjectGallery />
            <EnvironmentalImpact />
            <TechnicalSpecs />
            <PrimeRates />
            <Testimonials />
            <Certifications />
            <FAQ />
          </article>
        </main>
      </div>
    </>
  );
};

export default Index;