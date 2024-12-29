import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LeadInfoSidebar } from "./components/LeadInfoSidebar";
import { ChatSection } from "./components/ChatSection";

export function ConversationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'note':
        toast({
          title: "Note ajoutée",
          description: "Votre note a été ajoutée avec succès"
        });
        break;
      case 'rappel':
        toast({
          title: "Rappel créé",
          description: "Le rappel a été programmé"
        });
        break;
      case 'devis':
        toast({
          title: "Devis",
          description: "Redirection vers la création de devis"
        });
        break;
      case 'visio':
        toast({
          title: "Visioconférence",
          description: "Planification d'un rendez-vous visio"
        });
        break;
      case 'message':
        toast({
          title: "SMS",
          description: "Envoi d'un SMS au client"
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-2 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto space-y-4"
      >
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/espace-installateur/messages")}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Retour aux messages
        </Button>

        <div className="grid grid-cols-12 gap-4">
          <LeadInfoSidebar onQuickAction={handleQuickAction} />

          <Card className="col-span-12 md:col-span-9 p-4">
            <Tabs defaultValue="conversation" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="conversation">Conversation</TabsTrigger>
                <TabsTrigger value="notes">Notes complémentaires</TabsTrigger>
                <TabsTrigger value="rdv">RDV</TabsTrigger>
                <TabsTrigger value="paiements">Paiements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversation" className="mt-0">
                <ChatSection />
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="text-center py-12 text-muted-foreground">
                  Aucune note complémentaire
                </div>
              </TabsContent>
              
              <TabsContent value="rdv">
                <div className="text-center py-12 text-muted-foreground">
                  Aucun rendez-vous planifié
                </div>
              </TabsContent>
              
              <TabsContent value="paiements">
                <div className="text-center py-12 text-muted-foreground">
                  Aucun paiement enregistré
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="text-center py-12 text-muted-foreground">
                  Aucun document disponible
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}