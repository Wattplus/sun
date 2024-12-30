import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CheckoutHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="text-white/60 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>
      <div className="text-sm text-white/60">
        Paiement sécurisé
      </div>
    </div>
  );
};