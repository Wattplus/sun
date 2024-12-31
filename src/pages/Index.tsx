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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, LogIn, Users, TrendingUp, CheckCircle } from "lucide-react";

export const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Index: Checking session...", session);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Index: Auth state changed:", event, session?.user?.id);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Installation Panneaux Solaires - Expert Photovoltaïque</title>
        <meta name="description" content="Expert en installation de panneaux solaires photovoltaïques. Obtenez un devis gratuit pour votre projet d'énergie solaire et bénéficiez des meilleures aides." />
        <meta name="keywords" content="panneaux solaires, photovoltaïque, installation solaire, énergie renouvelable, devis solaire" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sun-prospect-connector.lovable.app" />
        <meta property="og:title" content="Installation Panneaux Solaires - Expert Photovoltaïque" />
        <meta property="og:description" content="Expert en installation de panneaux solaires photovoltaïques. Obtenez un devis gratuit pour votre projet d'énergie solaire." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sun-prospect-connector.lovable.app" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
        <header>
          <Navbar />
        </header>
        
        <main>
          <article>
            <HeroSection />
            
            {/* Section Espace Installateur */}
            <section className="py-16 bg-gradient-to-b from-background/95 to-background">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Espace Installateur
                  </h2>
                  <p className="text-lg text-white/80 max-w-2xl mx-auto">
                    Rejoignez notre réseau d'installateurs certifiés et accédez à des leads qualifiés pour développer votre activité.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Carte Création de Compte */}
                  <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Créer un compte installateur</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-white/80">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Accès à des leads qualifiés</span>
                        </li>
                        <li className="flex items-center gap-2 text-white/80">
                          <Users className="h-5 w-5 text-primary" />
                          <span>Rejoignez un réseau d'experts</span>
                        </li>
                        <li className="flex items-center gap-2 text-white/80">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          <span>Développez votre activité</span>
                        </li>
                      </ul>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => navigate("/espace-installateur/inscription")}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Créer un compte
                      </Button>
                    </div>
                  </Card>

                  {/* Carte Connexion */}
                  <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <LogIn className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Déjà inscrit ?</h3>
                      <p className="text-white/80">
                        Connectez-vous à votre espace installateur pour accéder à vos leads et gérer votre compte.
                      </p>
                      <div className="flex-1" /> {/* Spacer */}
                      <Button 
                        variant="outline"
                        className="w-full border-primary/20 hover:bg-primary/10"
                        onClick={() => navigate("/login")}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Se connecter
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </section>

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