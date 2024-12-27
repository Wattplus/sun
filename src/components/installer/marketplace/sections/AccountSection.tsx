import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, User, Building2 } from "lucide-react";

export const AccountSection = () => {
  return (
    <div className="space-y-4">
      {/* Compte prépayé */}
      <Card className="bg-gradient-to-br from-background to-primary/20 p-4 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">Compte Prépayé</h3>
            <p className="text-sm text-white/60">Solde disponible</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-white">150</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 bg-primary/10 border-primary/20 text-white hover:bg-primary/20"
            >
              Recharger
            </Button>
          </div>
        </div>
      </Card>

      {/* Grille de prix en 2 colonnes */}
      <div className="grid grid-cols-2 gap-3">
        {/* Lead particulier avec compte */}
        <Card className="bg-gradient-to-br from-background to-primary/20 p-3 border-primary/20 hover:bg-primary/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <span className="text-sm text-white">Lead particulier</span>
                <p className="text-xs text-white/60">Avec compte</p>
              </div>
            </div>
            <span className="font-bold text-white">26€</span>
          </div>
        </Card>

        {/* Lead particulier sans compte */}
        <Card className="bg-gradient-to-br from-background to-primary/20 p-3 border-primary/20 hover:bg-primary/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <span className="text-sm text-white">Lead particulier</span>
                <p className="text-xs text-white/60">Sans compte</p>
              </div>
            </div>
            <span className="font-bold text-white">35€</span>
          </div>
        </Card>

        {/* Lead professionnel */}
        <Card className="col-span-2 bg-gradient-to-br from-background to-primary/20 p-3 border-primary/20 hover:bg-primary/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <div>
                <span className="text-sm text-white">Lead professionnel</span>
                <p className="text-xs text-white/60">Tous comptes</p>
              </div>
            </div>
            <span className="font-bold text-white">59€</span>
          </div>
        </Card>
      </div>
    </div>
  );
};