import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedCards } from "../dashboard/prepaid/SavedCards";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";
import { useQueryClient } from "@tanstack/react-query";

export const AccountPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isClearing, setIsClearing] = useState(false);
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
    console.log("Ajouter une carte");
  };

  const clearCache = async () => {
    setIsClearing(true);
    try {
      // Clear Supabase cache
      await supabase.auth.refreshSession();
      
      // Clear React Query cache
      await queryClient.invalidateQueries();
      
      // Clear localStorage
      localStorage.clear();
      
      toast({
        title: "Cache vidé",
        description: "Le cache a été vidé avec succès. La page va se recharger.",
      });
      
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Erreur lors du vidage du cache:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du vidage du cache.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mon Compte</h1>
        <Button 
          variant="outline" 
          onClick={clearCache}
          disabled={isClearing}
          className="bg-background/50 backdrop-blur-sm"
        >
          {isClearing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Vidage du cache...
            </>
          ) : (
            'Vider le cache'
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
          <TabsTrigger value="prepaid">Compte prépayé</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection />
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