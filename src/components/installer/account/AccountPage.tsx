import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedCards } from "../dashboard/prepaid/SavedCards";
import { PrepaidBalance } from "../dashboard/PrepaidBalance";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { Button } from "@/components/ui/button";
import { Loader2, User, CreditCard, Wallet } from "lucide-react";
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
      await supabase.auth.refreshSession();
      await queryClient.invalidateQueries();
      localStorage.clear();
      
      toast({
        title: "Cache vidé",
        description: "Le cache a été vidé avec succès. La page va se recharger.",
      });
      
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background-dark p-6 space-y-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-white">Mon Compte</h1>
          <Button 
            variant="outline" 
            onClick={clearCache}
            disabled={isClearing}
            className="bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/20"
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
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-background-dark/80 border border-primary/10 p-1">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger 
              value="payment" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Moyens de paiement
            </TabsTrigger>
            <TabsTrigger 
              value="prepaid" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Compte prépayé
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="payment">
            <Card className="p-6 bg-background-dark/80 backdrop-blur-sm border-primary/20">
              <SavedCards
                cards={cards}
                onDeleteCard={handleDeleteCard}
                onAddCard={handleAddCard}
              />
            </Card>
          </TabsContent>

          <TabsContent value="prepaid">
            <Card className="p-6 bg-background-dark/80 backdrop-blur-sm border-primary/20">
              <PrepaidBalance balance={150} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};