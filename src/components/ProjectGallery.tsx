import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const ProjectGallery = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a5fb4] to-[#0ea5e9]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Nos Réalisations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80"
                alt="Villa moderne à Lyon"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div className="p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute inset-0 flex flex-col justify-end text-white">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in">Villa Moderne</h3>
              
              <div className="space-y-3 text-white/90">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Localisation:</span>
                  <span>Lyon</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Puissance:</span>
                  <span>6 kWc</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Économies:</span>
                  <span className="text-green-400 font-bold">750€/an</span>
                </div>
              </div>
              
              <Button 
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white group/btn"
                variant="default"
              >
                Voir le projet
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </div>
            
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg animate-fade-in">
                Réalisé
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};