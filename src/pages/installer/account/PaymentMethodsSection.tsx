import { Card } from "@/components/ui/card";
import { SavedCards } from "@/components/installer/dashboard/prepaid/SavedCards";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PaymentMethodsSection = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState([
    {
      id: "1",
      last4: "4242",
      brand: "Visa",
      expMonth: 12,
      expYear: 2024,
    }
  ]);

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    toast({
      title: "Carte supprimée",
      description: "La carte a été supprimée avec succès.",
    });
  };

  const handleAddCard = () => {
    toast({
      title: "Ajouter une carte",
      description: "Redirection vers la page de paiement...",
    });
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
      <SavedCards
        cards={cards}
        onDeleteCard={handleDeleteCard}
        onAddCard={handleAddCard}
      />
    </Card>
  );
};