import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/dbc910f6-7ea8-4b5b-99c5-9e8500203595.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Passez à l'énergie solaire et <span className="text-primary">réduisez vos factures</span>
          </motion.h1>

          <p className="text-lg text-blue-200 mb-12 animate-fadeIn leading-relaxed">
            Découvrez nos offres exclusives de panneaux photovoltaïques et commencez à économiser sur vos factures d'électricité dès aujourd'hui. Chez WattPlus, on s'engage à fournir des solutions énergétiques durables et économiques pour tous les foyers.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fadeIn">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Demander un devis gratuit
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/10 text-primary px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Calculer vos économies
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-primary/10">
              <h3 className="text-2xl font-bold text-primary mb-2">80%</h3>
              <p className="text-white/80">d'économies sur votre facture</p>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-primary/10">
              <h3 className="text-2xl font-bold text-primary mb-2">15 ans</h3>
              <p className="text-white/80">de garantie performance</p>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-primary/10">
              <h3 className="text-2xl font-bold text-primary mb-2">+75%</h3>
              <p className="text-white/80">d'aides de l'état</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};