import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const ProjectGallery = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
          Nos Réalisations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80"
                alt="Villa moderne à Lyon"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Villa Moderne</h3>
              
              <div className="space-y-3 text-gray-600">
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
                  <span className="text-green-600 font-bold">750€/an</span>
                </div>
              </div>
              
              <Button 
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
                variant="default"
              >
                Voir le projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Réalisé
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};