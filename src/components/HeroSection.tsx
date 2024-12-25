import { ArrowRight, Sun, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-950/90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-blue-800/50 backdrop-blur-sm px-6 py-2 rounded-full text-sm border border-blue-400/30 shadow-lg animate-fade-in">
              Jusqu'à 8000€ d'aides de l'État
            </div>
            <div className="bg-blue-800/50 backdrop-blur-sm px-6 py-2 rounded-full text-sm border border-blue-400/30 shadow-lg animate-fade-in delay-100">
              Installation en 48h
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-fade-in">
            Passez à l'énergie solaire et{' '}
            <span className="text-green-400">économisez jusqu'à 70%</span> sur vos factures
          </h1>
          
          <p className="text-xl text-blue-100 mb-12 text-center animate-fade-in delay-200">
            Expert en installations photovoltaïques depuis 2010
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { text: "Devis gratuit sous 24h", icon: <Check className="w-5 h-5 text-green-400" /> },
              { text: "Installation par des experts certifiés", icon: <Check className="w-5 h-5 text-green-400" /> },
              { text: "Garantie 25 ans", icon: <Check className="w-5 h-5 text-green-400" /> },
              { text: "Suivi de production en temps réel", icon: <Check className="w-5 h-5 text-green-400" /> },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-sm text-blue-100 bg-blue-900/40 p-3 rounded-lg border border-blue-400/20 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-300">
            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 w-full sm:w-auto"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Demandez votre étude gratuite
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <a 
              href="tel:0977774164" 
              className="flex items-center justify-center gap-2 text-lg font-medium hover:text-green-400 transition-colors w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" />
              09 77 77 41 64
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-24">
            {[
              { title: "Installation rapide", subtitle: "Pose en 48h", icon: "⚡" },
              { title: "Rentabilité garantie", subtitle: "ROI en 6-8 ans", icon: "💰" },
              { title: "Autonomie", subtitle: "Produisez votre énergie", icon: "🔋" },
              { title: "Garantie 25 ans", subtitle: "Performance garantie", icon: "🛡️" },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-blue-800/80 to-blue-900/80 backdrop-blur-sm border border-blue-400/20 shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-3xl mb-3">{item.icon}</span>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-blue-200">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-950 to-transparent" />
    </div>
  );
};