import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] bg-gradient-to-br from-blue-900 to-blue-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-blue-800/50 backdrop-blur-sm px-6 py-2 rounded-full text-sm border border-blue-400/30">
              Devis gratuit et sans engagement
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text">
            Réduisez votre facture d'électricité avec l'énergie solaire
          </h1>
          
          <p className="text-xl text-blue-100 mb-12">
            Profitez des aides de l'État jusqu'à 75% pour votre installation photovoltaïque
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 w-full sm:w-auto"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Je calcule mes aides
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <a 
              href="tel:0977774164" 
              className="flex items-center justify-center gap-2 text-lg font-medium hover:text-green-400 transition-colors w-full sm:w-auto"
            >
              09 77 77 41 64
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {[
              { title: "Installation rapide", subtitle: "En 48h", emoji: "⚡" },
              { title: "Garantie 25 ans", subtitle: "Tranquillité assurée", emoji: "🛡️" },
              { title: "Aides de l'État", subtitle: "Jusqu'à 75%", emoji: "💰" },
              { title: "Suivi en temps réel", subtitle: "Application mobile", emoji: "📱" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-blue-800/50 to-blue-900/50 backdrop-blur-sm border border-blue-400/20"
              >
                <span className="text-3xl mb-2">{item.emoji}</span>
                <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-blue-200">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};