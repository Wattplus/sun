import { ArrowRight, MapPin, Sun, Battery } from "lucide-react";
import { Button } from "./ui/button";

export const ProjectGallery = () => {
  const projects = [
    {
      image: "/lovable-uploads/29a0fbb4-3379-413d-ae00-258f0ba2e117.png",
      title: "Villa Provençale",
      location: "Aix-en-Provence",
      power: "4.8 kWc",
      savings: "680€/an",
      description: "Installation complète en toiture avec optimiseurs de puissance",
    },
    {
      image: "/lovable-uploads/0b51d6d7-66aa-4644-93ee-f8abae4c972f.png",
      title: "Maison Contemporaine",
      location: "Bordeaux",
      power: "9.6 kWc",
      savings: "1250€/an",
      description: "Système bi-directionnel avec stockage d'énergie",
    },
    {
      image: "/lovable-uploads/dbc910f6-7ea8-4b5b-99c5-9e8500203595.png",
      title: "Résidence Moderne",
      location: "Lyon",
      power: "12.4 kWc",
      savings: "1580€/an",
      description: "Installation premium sur toiture complète avec système d'optimisation intelligent",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.1)_0%,rgba(0,0,0,0.4)_100%)]" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Nos Réalisations
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Découvrez nos installations photovoltaïques réalisées par nos experts certifiés
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Project Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                
                <div className="space-y-3 text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-400" />
                    <span>Puissance: {project.power}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-green-400" />
                    <span>Économies: <span className="text-green-400 font-bold">{project.savings}</span></span>
                  </div>
                  
                  <p className="text-sm text-blue-200">{project.description}</p>
                </div>
                
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white group/btn mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
                  variant="default"
                >
                  Voir le projet
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  Réalisé
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-white/10 hover:bg-green-500 text-white border border-white/20 hover:border-green-500 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Découvrez tous nos projets
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};