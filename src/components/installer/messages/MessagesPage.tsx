import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Bell, Archive, Trash2, Send, RefreshCw, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

export const MessagesPage = () => {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Boîte de réception</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Gérez vos conversations et suivez vos échanges
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Actualiser</span>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </Button>
          </div>
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
            <MessagesList onMessageSent={handleMessageSent} />
          </Card>
        </div>
      </motion.div>
    </div>
  );
};