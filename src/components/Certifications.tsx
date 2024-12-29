import { Shield, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Certifications = () => {
  return (
    <div className="relative py-12 sm:py-24 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Nos certifications
          </h2>
          <p className="text-lg sm:text-xl text-blue-200">
            Une expertise reconnue et certifiée
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16">
          {[
            {
              icon: Shield,
              title: "QualiPV",
              description: "Certification des installateurs photovoltaïques",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: Award,
              title: "RGE",
              description: "Reconnu Garant de l'Environnement",
              color: "from-green-400 to-green-600",
            },
            {
              icon: CheckCircle,
              title: "Qualibat",
              description: "Qualification professionnelle du bâtiment",
              color: "from-purple-400 to-purple-600",
            },
          ].map((cert, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-25 blur transition duration-200 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className={`rounded-xl bg-gradient-to-br ${cert.color} p-4 text-white shadow-lg mb-4 sm:mb-6`}>
                  <cert.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-sm sm:text-base text-blue-200 text-center">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
            <Button
              size="lg"
              className="relative w-full sm:w-auto bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full shadow-lg transition-all duration-300 bg-[length:200%_100%] animate-gradient group"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Faites confiance à des experts certifiés
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};