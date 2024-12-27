import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Euro, CreditCard, Plus, ArrowRight, Wallet, User, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export const AccountSection = () => {
  return (
    <div className="space-y-4">
      {/* Compte prépayé */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background border-2 border-primary/20 group hover:border-primary/30 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Compte Prépayé
              </h3>
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">Solde disponible</p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="p-3 rounded-full bg-primary/10 animate-pulse">
                    <Euro className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    150
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button 
                variant="outline"
                size="lg"
                className="relative group/btn overflow-hidden bg-background border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary group-hover/btn:scale-110 transition-transform" />
                  <span className="font-semibold">Paiement direct</span>
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button 
                size="lg"
                className="relative group/btn overflow-hidden bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 border-0 transition-all duration-300 bg-[length:200%_100%] animate-gradient"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                <span className="relative flex items-center gap-2">
                  <Wallet className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-semibold">Recharger mon compte</span>
                  <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform" />
                </span>
              </Button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary/10">
            <Button 
              variant="ghost" 
              className="flex flex-col items-center gap-2 h-auto py-4 group hover:bg-primary/10"
            >
              <div className="p-2 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Recharger 50€</span>
            </Button>

            <Button 
              variant="ghost"
              className="flex flex-col items-center gap-2 h-auto py-4 group hover:bg-primary/10"
            >
              <div className="p-2 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Recharger 100€</span>
            </Button>

            <Button 
              variant="ghost"
              className="flex flex-col items-center gap-2 h-auto py-4 group hover:bg-primary/10"
            >
              <div className="p-2 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Recharger 200€</span>
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