import { Shield, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Certifications = () => {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Nos certifications
          </h2>
          <p className="text-xl text-gray-600">
            Une expertise reconnue et certifiée
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
              <div className="relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl">
                <div className={`rounded-xl bg-gradient-to-br ${cert.color} p-4 text-white shadow-lg mb-6`}>
                  <cert.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-center">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Faites confiance à des experts certifiés
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};