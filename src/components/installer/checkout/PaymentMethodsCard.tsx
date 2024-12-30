import { Card } from "@/components/ui/card";
import { SavedCards } from "../dashboard/prepaid/SavedCards";

export const PaymentMethodsCard = () => {
  const cards = [
    {
      id: "1",
      last4: "4242",
      brand: "Visa",
      expMonth: 12,
      expYear: 2024,
    }
  ];

  const handleDeleteCard = (cardId: string) => {
    // This will be implemented later when we add card management functionality
    console.log("Delete card:", cardId);
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
      <h3 className="text-lg font-semibold mb-4">Moyen de paiement</h3>
      <SavedCards
        cards={cards}
        onDeleteCard={handleDeleteCard}
        onAddCard={() => {}}
      />
    </Card>
  );
};