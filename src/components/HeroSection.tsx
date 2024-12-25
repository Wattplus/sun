import { ArrowRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/solar-pattern.svg')] opacity-5" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <Sun className="h-16 w-16 text-orange-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Passez à l'énergie solaire
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Économisez jusqu'à 70% sur vos factures d'électricité
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Devis gratuit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold">Jusqu'à 8000€</span> d'aides de l'État
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            {[
              { text: "Installation en 48h", icon: "⚡" },
              { text: "Garantie 25 ans", icon: "🛡️" },
              { text: "Suivi en temps réel", icon: "📱" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white/50 rounded-lg shadow-sm">
                <span className="text-2xl mb-2">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};