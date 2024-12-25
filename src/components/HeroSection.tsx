import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-[#0B1221] via-[#1a5fb4] to-[#0B1221] text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.15)_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="glass-panel px-6 py-2 rounded-full text-sm shadow-lg animate-fadeIn">
              Devis gratuit et sans engagement
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 animate-fadeIn text-shadow">
            <span className="gradient-text">
              Installez des panneaux solaires pour produire votre propre énergie
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-6 animate-fadeIn leading-relaxed">
            Jusqu'à 40% d'économies sur vos factures grâce aux panneaux photovoltaïques
          </p>

          <p className="text-lg text-blue-200 mb-12 animate-fadeIn leading-relaxed">
            Découvrez nos offres exclusives de panneaux photovoltaïques et commencez à économiser sur vos factures d'électricité dès aujourd'hui. Chez Carrefour Énergies, on s'engage à fournir des solutions énergétiques durables et économiques pour tous les foyers.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fadeIn">
            <Button 
              size="lg"
              className="glass-button group w-full sm:w-auto"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Je calcule mes aides
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <a 
              href="tel:0977774164" 
              className="flex items-center justify-center gap-2 text-lg font-medium hover:text-green-400 transition-colors w-full sm:w-auto group"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-400 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
                09 77 77 41 64
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-fadeIn">
            {[
              { title: "Installation rapide", subtitle: "En 48h", emoji: "⚡" },
              { title: "Garantie 25 ans", subtitle: "Tranquillité assurée", emoji: "🛡️" },
              { title: "Aides de l'État", subtitle: "Jusqu'à 75%", emoji: "💰" },
              { title: "Suivi en temps réel", subtitle: "Application mobile", emoji: "📱" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-panel p-4 card-hover gradient-border"
              >
                <span className="text-3xl mb-2 block">{item.emoji}</span>
                <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-blue-200">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/20 to-transparent" />
    </div>
  );
};