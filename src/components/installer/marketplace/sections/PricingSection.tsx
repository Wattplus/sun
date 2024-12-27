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
          <div className="relative">
            {/* Badge RECOMMANDÉ avec animation et couleurs flashy */}
            <div className="absolute -right-3 -top-3 z-10">
              <div 
                className="px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse"
                style={{
                  background: 'linear-gradient(90deg, #F97316 0%, #D946EF 100%)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              >
                RECOMMANDÉ
              </div>
            </div>
            
            {/* Carte principale avec effet de glow et dégradé plus vif */}
            <div 
              className="p-4 rounded-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(14,165,233,0.3) 100%)',
                boxShadow: '0 0 30px rgba(139,92,246,0.3)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#8B5CF6] p-2.5 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold" style={{ color: '#8B5CF6' }}>Lead particulier</span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <span className="text-sm flex items-center gap-2 text-white">
                        <Check className="h-4 w-4 text-[#0EA5E9]" /> Avec compte prépayé
                      </span>
                      <span className="text-sm flex items-center gap-2 text-white">
                        <Star className="h-4 w-4 text-[#F97316]" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#0EA5E9]">26€</div>
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg border border-muted/20 hover:border-muted/40 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(217,70,239,0.1) 100%)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F97316]/20 p-2 rounded-full">
                  <User className="h-4 w-4 text-[#F97316]" />
                </div>
                <div>
                  <span className="text-base font-medium text-[#F97316]">Lead particulier</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-white/80 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#F97316]">35€</div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg border border-accent/10 hover:border-accent/30 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(139,92,246,0.1) 100%)'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#0EA5E9]/20 p-2 rounded-full">
                  <Building2 className="h-4 w-4 text-[#0EA5E9]" />
                </div>
                <div>
                  <span className="text-base font-medium text-[#0EA5E9]">Lead professionnel</span>
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
              <div className="text-2xl font-bold text-[#0EA5E9]">59€</div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full gap-2 text-base font-medium py-6" 
          size="lg"
          style={{
            background: 'linear-gradient(90deg, #8B5CF6 0%, #0EA5E9 100%)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #7C3AED 0%, #0284C7 100%)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #8B5CF6 0%, #0EA5E9 100%)';
          }}
        >
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};