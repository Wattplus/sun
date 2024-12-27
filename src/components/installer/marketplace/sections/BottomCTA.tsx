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
          Rechargez votre compte prépayé pour bénéficier de tarifs avantageux sur tous vos leads
        </p>
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