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
            <div className="absolute -right-2 -top-2 z-10">
              <div 
                className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #1EAEDB 0%, #33C3F0 50%, #1EAEDB 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'gradient 3s linear infinite',
                }}
              >
                RECOMMANDÉ
              </div>
            </div>
            
            <div 
              className="p-4 rounded-lg relative overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(30,174,219,0.2) 0%, rgba(51,195,240,0.2) 100%)',
                boxShadow: '0 0 30px rgba(30,174,219,0.2)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary to-primary-light p-2.5 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
                      Lead particulier
                    </span>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <span className="text-sm flex items-center gap-2 text-white">
                        <Check className="h-4 w-4 text-primary" /> Avec compte prépayé
                      </span>
                      <span className="text-sm flex items-center gap-2 text-white">
                        <Star className="h-4 w-4 text-primary-light" /> Tarif préférentiel
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
                  26€
                </div>
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(11,18,33,0.3) 0%, rgba(26,95,180,0.3) 100%)',
              boxShadow: '0 0 20px rgba(26,95,180,0.2)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium bg-gradient-to-r from-secondary to-accent text-transparent bg-clip-text">
                    Lead particulier
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-sm text-white/80 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Sans compte prépayé
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent text-transparent bg-clip-text">
                35€
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(30,174,219,0.15) 0%, rgba(26,95,180,0.15) 100%)',
              boxShadow: '0 0 20px rgba(30,174,219,0.15)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-base font-medium bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
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
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
                59€
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full gap-2 text-base font-medium py-6 bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-dark hover:via-primary hover:to-primary-light border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient"
        >
          <Sparkles className="h-5 w-5" />
          Créer un compte prépayé
        </Button>
      </div>
    </Card>
  );
};