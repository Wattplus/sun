import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Send, Plus, Calendar, FileText, Home, Sun, Euro, MapPin, Phone, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesList } from "./MessagesList";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ConversationPage() {
  const { id } = useParams();
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
          {/* Sidebar - Client Info */}
          <Card className="col-span-12 md:col-span-3 p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                    AM
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Accard Marie</h3>
                  <Badge variant="secondary" className="mt-1">Lead Photovoltaïque</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 bg-secondary/5 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Type de projet</p>
                  <p className="font-medium">Résidentiel - 35m²</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Orientation</p>
                  <p className="font-medium">Plein Sud</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Facture mensuelle</p>
                  <p className="font-medium">180€</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">mlerrible@wanadoo.fr</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium">0674909294</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Adresse</p>
                  <p className="font-medium">25380 longevelle les russey</p>
                </div>
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
}