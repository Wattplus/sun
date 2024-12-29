import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Bell, Archive, Trash2, Send, RefreshCw, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const MessagesPage = () => {
  const { toast } = useToast();

  const handleMessageSent = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1200px] mx-auto space-y-6"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Boîte de réception</h1>
              <p className="text-muted-foreground">
                Gérez vos conversations et suivez vos échanges
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <Card className="col-span-3 p-4">
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
            </div>
            
            <Separator className="my-4" />
            
            <div className="pt-4">
              <Button className="w-full" size="sm">
                Gérer les notifications
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <Card className="col-span-9 p-6 shadow-lg bg-card/50 backdrop-blur-sm">
            <MessagesList onMessageSent={handleMessageSent} />
          </Card>
        </div>
      </motion.div>
    </div>
  );
};