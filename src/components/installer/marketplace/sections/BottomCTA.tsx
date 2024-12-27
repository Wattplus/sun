import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BottomCTAProps {
  onPrepaidAccount: () => void;
}

export const BottomCTA = ({ onPrepaidAccount }: BottomCTAProps) => {
  return (
    <Card className="mt-8 p-8 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-primary/20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">Prêt à développer votre activité ?</h2>
        <p className="text-white/80">
          Nous recommandons de maintenir un solde minimum de 200€ pour ne pas manquer d'opportunités.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
          <div className="p-4 bg-white/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold text-white mb-2">Lead Particulier</h3>
            <div className="space-y-2">
              <p className="text-primary text-2xl font-bold">26€</p>
              <p className="text-sm text-white/60">avec compte prépayé</p>
              <p className="text-lg text-white/80">35€</p>
              <p className="text-sm text-white/60">sans compte prépayé</p>
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold text-white mb-2">Lead Professionnel</h3>
            <div className="space-y-2">
              <p className="text-primary text-2xl font-bold">49€</p>
              <p className="text-sm text-white/60">avec compte prépayé</p>
              <p className="text-lg text-white/80">59€</p>
              <p className="text-sm text-white/60">sans compte prépayé</p>
            </div>
          </div>
        </div>
        <Button 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90"
          onClick={onPrepaidAccount}
        >
          Recharger mon compte
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};