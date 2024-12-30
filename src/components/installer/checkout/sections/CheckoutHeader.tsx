import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="text-white/60 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>
      <h1 className="text-2xl font-bold">Finaliser l'achat</h1>
    </div>
  );
};