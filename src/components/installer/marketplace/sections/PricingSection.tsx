import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, Sparkles, Building2, User, Check, Star } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-6 bg-white border-none shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-1.5 rounded-full">
            <Euro className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Tarifs des leads</h3>
            <p className="text-xs text-gray-500">
              Choisissez l'offre adaptée à vos besoins
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative transform hover:scale-105 transition-all duration-300">
            <div className="absolute -right-2 -top-2 z-10">
              <div className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-[length:200%_100%] animate-gradient">
                RECOMMANDÉ
              </div>
            </div>
            
            <div className="p-4 rounded-lg relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-white to-orange-50 border border-orange-100 shadow-lg hover:shadow-orange-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2.5 rounded-full shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                      Lead particulier
                    </span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <span className="text-sm flex items-center gap-2 text-gray-700">
                        <Check className="h-4 w-4 text-orange-500" /> Avec compte prépayé
                      </span>
                      <span className="text-sm flex items-center gap-2 text-gray-700">
                        <Star className="h-4 w-4 text-pink-500" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
                  26€
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-purple-50 border border-purple-100 shadow-lg hover:shadow-purple-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full shadow-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Lead particulier
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                35€
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 shadow-lg hover:shadow-emerald-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-full shadow-lg">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
                    Lead professionnel
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Projets B2B
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> Potentiel élevé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
                59€
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full gap-2 text-base font-medium py-6 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 hover:from-orange-600 hover:via-pink-600 hover:to-orange-600 border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient text-white"
        >
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};