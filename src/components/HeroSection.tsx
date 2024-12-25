import { ArrowRight, Sun, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1e40af] text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-950/90" />
        <div className="absolute inset-0 bg-[url('/solar-panels-bg.jpg')] bg-cover bg-center opacity-30" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-blue-800/50 backdrop-blur-sm px-6 py-2 rounded-full text-sm">
              Jusqu'à 8000€ d'aides de l'État
            </div>
            <div className="bg-blue-800/50 backdrop-blur-sm px-6 py-2 rounded-full text-sm">
              Installation en 48h
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Passez à l'énergie solaire et{' '}
            <span className="text-green-400">économisez jusqu'à 70%</span> sur vos factures
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            Expert en installations photovoltaïques depuis 2010
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { text: "Devis gratuit sous 24h", icon: <Check className="w-5 h-5 text-green-400" /> },
              { text: "Installation par des experts certifiés", icon: <Check className="w-5 h-5 text-green-400" /> },
              { text: "Garantie 25 ans", icon: <Check className="w-5 h-5 text-green-400" /> },
              { text: "Suivi de production en temps réel", icon: <Check className="w-5 h-5 text-green-400" /> },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-sm text-blue-100">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <Button 
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Demandez votre étude gratuite
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-24">
            {[
              { title: "Installation rapide", subtitle: "Pose en 48h", icon: "⚡" },
              { title: "Rentabilité garantie", subtitle: "ROI en 6-8 ans", icon: "💰" },
              { title: "Autonomie", subtitle: "Produisez votre énergie", icon: "🔋" },
              { title: "Garantie 25 ans", subtitle: "Performance garantie", icon: "🛡️" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center p-6 rounded-2xl bg-blue-800/30 backdrop-blur-sm">
                <span className="text-3xl mb-3">{item.icon}</span>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-blue-200">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};