import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Send, RefreshCw, Star, ChevronLeft, Search, Plus, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

export const MessagesPage = () => {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
      case 'paiement':
        toast({
          title: "Paiement",
          description: "Redirection vers la page de paiement"
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
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/espace-installateur")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un message ou un client..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar - Client Info */}
          <Card className="col-span-3 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                    AM
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Accard Marie</h3>
                  <Badge variant="secondary">Nouveau LEAD</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">mlerrible@wanadoo.fr</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">0674909294</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="font-medium">25380 longevelle les russey</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleQuickAction('paiement')}
              >
                <Send className="h-4 w-4 mr-2" />
                Percevoir le paiement
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('note')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une note
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('rappel')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Ajouter un rappel de suivi
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <Card className="col-span-9 p-4">
            <Tabs defaultValue="conversation" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="conversation">Conversation</TabsTrigger>
                <TabsTrigger value="notes">Notes complémentaires</TabsTrigger>
                <TabsTrigger value="rdv">RDV</TabsTrigger>
                <TabsTrigger value="paiements">Paiements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversation" className="mt-0">
                <MessagesList />
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