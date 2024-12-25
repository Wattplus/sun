import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    image: "/lovable-uploads/c3748686-72dc-46ba-91f0-9ccae4c51fc6.png",
    title: "Villa Contemporaine",
    location: "Lyon",
    power: "6 kWc",
    savings: "750€/an",
    features: ["Toit bi-pente", "Intégration parfaite", "Domotique intégrée"],
    completion: "2023"
  },
  {
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
    title: "Maison Passive",
    location: "Bordeaux",
    power: "9 kWc",
    savings: "950€/an",
    features: ["Autoconsommation", "Batterie Tesla", "Optimiseurs"],
    completion: "2023"
  },
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    title: "Villa Moderne",
    location: "Toulouse",
    power: "4.5 kWc",
    savings: "600€/an",
    features: ["Design épuré", "Monitoring", "Garantie 25 ans"],
    completion: "2023"
  },
];

export const ProjectGallery = () => {
  return (
    <div className="relative py-24 sm:py-32 bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,118,210,0.1),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 backdrop-blur-sm">
            Nos réalisations
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Des installations solaires d'exception
          </h2>
          <p className="text-xl text-blue-200">
            Découvrez nos plus belles réalisations photovoltaïques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 p-8 w-full">
                <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Localisation</p>
                    <p className="font-medium text-white">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Puissance</p>
                    <p className="font-medium text-white">{project.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Économies</p>
                    <p className="font-medium text-green-400">{project.savings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Réalisation</p>
                    <p className="font-medium text-white">{project.completion}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-blue-900/60 text-blue-100 rounded-full border border-blue-400/20 backdrop-blur-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-green-500/25">
                  Réalisé
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg rounded-full shadow-xl shadow-green-500/20 transform transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Démarrez votre projet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};