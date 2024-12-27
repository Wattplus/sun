import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedCards } from "../dashboard/prepaid/SavedCards";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const AccountPage = () => {
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
  };

  const handleAddCard = () => {
    // Logique pour ajouter une carte
    console.log("Ajouter une carte");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mon Compte</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
          <TabsTrigger value="prepaid">Compte prépayé</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Informations du profil</h2>
            {/* Contenu du profil */}
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="p-6">
            <SavedCards
              cards={cards}
              onDeleteCard={handleDeleteCard}
              onAddCard={handleAddCard}
            />
          </Card>
        </TabsContent>

        <TabsContent value="prepaid">
          <Card className="p-6">
            <PrepaidBalance balance={150} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};