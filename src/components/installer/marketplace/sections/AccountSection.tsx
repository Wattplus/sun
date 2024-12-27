import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, User, Building2, Wallet, ArrowRight, CreditCard, Plus } from "lucide-react";

export const AccountSection = () => {
  return (
    <div className="space-y-4">
      {/* Compte prépayé */}
      <Card className="bg-gradient-to-br from-background to-primary/20 p-6 border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Compte Prépayé</h3>
            <p className="text-lg text-white/60">Solde disponible</p>
            <div className="flex items-center gap-2">
              <Euro className="h-8 w-8 text-primary" />
              <span className="text-4xl font-bold text-white">150</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button 
              variant="default" 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient group"
            >
              <CreditCard className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Paiement direct
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 via-green-400 to-green-500 hover:from-green-600 hover:via-green-500 hover:to-green-600 border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient group"
            >
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              Recharger mon compte
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Grille de prix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Lead particulier avec compte */}
        <Card className="bg-gradient-to-br from-background to-primary/20 p-6 border-primary/20 hover:bg-primary/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-primary-light p-3 rounded-xl group-hover:scale-110 transition-transform">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-white">Lead particulier</span>
                <p className="text-sm text-white/60">Avec compte</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-white">26€</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4 border-primary/20 hover:bg-primary/20 group"
          >
            Voir les leads disponibles
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>

        {/* Lead particulier sans compte */}
        <Card className="bg-gradient-to-br from-background to-primary/20 p-6 border-primary/20 hover:bg-primary/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-primary-light p-3 rounded-xl group-hover:scale-110 transition-transform">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-white">Lead particulier</span>
                <p className="text-sm text-white/60">Sans compte</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-white">35€</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4 border-primary/20 hover:bg-primary/20 group"
          >
            Voir les leads disponibles
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>

        {/* Lead professionnel */}
        <Card className="col-span-1 sm:col-span-2 bg-gradient-to-br from-background to-primary/20 p-6 border-primary/20 hover:bg-primary/10 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-primary-light p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-medium text-white">Lead professionnel</span>
                <p className="text-sm text-white/60">Tous comptes</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-white">59€</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4 border-primary/20 hover:bg-primary/20 group"
          >
            Voir les leads professionnels
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Card>
      </div>
    </div>
  );
};