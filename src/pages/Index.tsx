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
import { Helmet } from "react-helmet";

export const Index = () => {
  return (
    <>
      <Helmet>
        <title>Installation Panneaux Solaires - Expert Photovoltaïque</title>
        <meta name="description" content="Expert en installation de panneaux solaires photovoltaïques. Obtenez un devis gratuit pour votre projet d'énergie solaire et bénéficiez des meilleures aides." />
        <meta name="keywords" content="panneaux solaires, photovoltaïque, installation solaire, énergie renouvelable, devis solaire" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://votre-domaine.fr" />
        <meta property="og:title" content="Installation Panneaux Solaires - Expert Photovoltaïque" />
        <meta property="og:description" content="Expert en installation de panneaux solaires photovoltaïques. Obtenez un devis gratuit pour votre projet d'énergie solaire." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votre-domaine.fr" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <header>
          <Navbar />
        </header>
        
        <main>
          <article>
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
            <FAQ />
            <div className="py-16 bg-gradient-to-b from-background/95 to-background">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Prêt à réduire vos factures d'électricité ?
                  </h2>
                  <p className="text-lg text-white/80">
                    Remplissez le formulaire ci-dessous pour recevoir votre étude personnalisée gratuite
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;