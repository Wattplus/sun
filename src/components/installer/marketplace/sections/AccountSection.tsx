import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, User, Building2 } from "lucide-react";

export const AccountSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Compte prépayé */}
      <Card className="bg-gradient-to-br from-[#0B1221] to-[#1a5fb4] p-4 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">Compte Prépayé</h3>
            <p className="text-sm text-white/60">Solde disponible</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-[#1EAEDB]" />
              <span className="text-2xl font-bold text-white">150</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Recharger
            </Button>
          </div>
        </div>
      </Card>

      {/* Grille de prix compacte */}
      <Card className="bg-gradient-to-br from-[#0B1221] to-[#1a5fb4] p-4 border-primary/20">
        <h3 className="text-lg font-semibold text-white mb-3">Tarifs des leads</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex items-center justify-between bg-white/5 p-2 rounded">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#1EAEDB]" />
              <div>
                <span className="text-sm text-white">Lead particulier</span>
                <p className="text-xs text-white/60">Avec compte</p>
              </div>
            </div>
            <span className="font-bold text-white">26€</span>
          </div>
          <div className="col-span-2 flex items-center justify-between bg-white/5 p-2 rounded">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#1EAEDB]" />
              <div>
                <span className="text-sm text-white">Lead particulier</span>
                <p className="text-xs text-white/60">Sans compte</p>
              </div>
            </div>
            <span className="font-bold text-white">35€</span>
          </div>
          <div className="col-span-2 flex items-center justify-between bg-white/5 p-2 rounded">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#1EAEDB]" />
              <div>
                <span className="text-sm text-white">Lead professionnel</span>
                <p className="text-xs text-white/60">Tous comptes</p>
              </div>
            </div>
            <span className="font-bold text-white">59€</span>
          </div>
        </div>
      </Card>
    </div>
  );
};