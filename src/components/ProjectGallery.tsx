import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80",
    title: "Villa Moderne",
    location: "Lyon",
    power: "6 kWc",
    savings: "750€/an",
  },
  {
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=800&q=80",
    title: "Maison Traditionnelle",
    location: "Bordeaux",
    power: "9 kWc",
    savings: "950€/an",
  },
  {
    image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=800&q=80",
    title: "Résidence Contemporaine",
    location: "Toulouse",
    power: "4.5 kWc",
    savings: "600€/an",
  },
];

export const ProjectGallery = () => {
  return (
    <div className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.50),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Nos réalisations
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez nos installations solaires récentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-300">Localisation</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Puissance</p>
                    <p className="font-medium">{project.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Économies</p>
                    <p className="font-medium text-green-400">{project.savings}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Réalisé
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20 transform transition-all duration-300 hover:scale-105"
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