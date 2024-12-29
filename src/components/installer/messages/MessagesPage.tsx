import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Bell, Archive, Trash2, Send, RefreshCw, Star, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const MessagesPage = () => {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const handleMessageSent = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    });
  };

  const SidebarContent = () => (
    <div className="space-y-2">
      <Button variant="ghost" className="w-full justify-start" size="sm">
        <MessageSquare className="h-4 w-4 mr-2" />
        Boîte de réception
      </Button>
      <Button variant="ghost" className="w-full justify-start" size="sm">
        <Star className="h-4 w-4 mr-2" />
        Suivis
      </Button>
      <Button variant="ghost" className="w-full justify-start" size="sm">
        <Send className="h-4 w-4 mr-2" />
        Envoyés
      </Button>
      <Button variant="ghost" className="w-full justify-start" size="sm">
        <Archive className="h-4 w-4 mr-2" />
        Archives
      </Button>
      <Button variant="ghost" className="w-full justify-start" size="sm">
        <Trash2 className="h-4 w-4 mr-2" />
        Corbeille
      </Button>
      
      <Separator className="my-4" />
      
      <Button className="w-full" size="sm">
        Gérer les notifications
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1200px] mx-auto space-y-4 md:space-y-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/espace-installateur")}
            className="md:hidden"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <Input 
            placeholder="Rechercher dans les messages..." 
            className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Sidebar - Desktop */}
          <Card className="hidden md:block md:col-span-3 p-4">
            <SidebarContent />
          </Card>

          {/* Sidebar - Mobile */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:hidden mb-4">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Menu des messages
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80vw] sm:w-[385px]">
                <div className="py-6">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Main Content */}
          <Card className="col-span-1 md:col-span-9 p-4 md:p-6 shadow-lg bg-card/50 backdrop-blur-sm">
            <Tabs defaultValue="conversation" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="conversation">Conversation</TabsTrigger>
                <TabsTrigger value="notes">Notes complémentaires</TabsTrigger>
                <TabsTrigger value="rdv">RDV</TabsTrigger>
                <TabsTrigger value="paiements">Paiements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversation">
                <MessagesList onMessageSent={handleMessageSent} />
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
};