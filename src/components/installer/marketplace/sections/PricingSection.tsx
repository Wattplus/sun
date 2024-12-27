import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, Sparkles, Building2, User, Check, Star } from "lucide-react";

export const PricingSection = () => {
  return (
    <Card className="p-4 bg-gradient-to-br from-background/95 via-background/90 to-background border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <Euro className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Tarifs des leads</h3>
            <p className="text-xs text-primary/80">
              Choisissez l'offre adaptée à vos besoins
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative transform hover:scale-105 transition-all duration-300">
            {/* Badge RECOMMANDÉ avec animation améliorée */}
            <div className="absolute -right-2 -top-2 z-10">
              <div 
                className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse"
                style={{
                  background: 'linear-gradient(90deg, #F97316 0%, #D946EF 50%, #F97316 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'gradient 3s linear infinite',
                }}
              >
                RECOMMANDÉ
              </div>
            </div>
            
            {/* Carte principale avec effet de glow et dégradé plus vif */}
            <div 
              className="p-4 rounded-lg relative overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.4) 0%, rgba(217,70,239,0.4) 100%)',
                boxShadow: '0 0 30px rgba(249,115,22,0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#F97316] to-[#D946EF] p-2.5 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold bg-gradient-to-r from-[#F97316] to-[#D946EF] text-transparent bg-clip-text">
                      Lead particulier
                    </span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <span className="text-sm flex items-center gap-2 text-white">
                        <Check className="h-4 w-4 text-[#F97316]" /> Avec compte prépayé
                      </span>
                      <span className="text-sm flex items-center gap-2 text-white">
                        <Star className="h-4 w-4 text-[#D946EF]" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#F97316] to-[#D946EF] text-transparent bg-clip-text">
                  26€
                </div>
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.3) 0%, rgba(139,92,246,0.3) 100%)',
              boxShadow: '0 0 20px rgba(14,165,233,0.2)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] p-2 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-transparent bg-clip-text">
                    Lead particulier
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-white/80 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-transparent bg-clip-text">
                35€
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(234,88,12,0.3) 0%, rgba(249,115,22,0.3) 100%)',
              boxShadow: '0 0 20px rgba(234,88,12,0.2)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#EA580C] to-[#F97316] p-2 rounded-full">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium bg-gradient-to-r from-[#EA580C] to-[#F97316] text-transparent bg-clip-text">
                    Lead professionnel
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-white/80 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Projets B2B
                    </span>
                    <span className="text-sm text-white/80 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> Potentiel élevé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#EA580C] to-[#F97316] text-transparent bg-clip-text">
                59€
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full gap-2 text-base font-medium py-6 bg-gradient-to-r from-[#F97316] via-[#D946EF] to-[#F97316] hover:from-[#EA580C] hover:via-[#D946EF] hover:to-[#EA580C] border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient"
        >
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};