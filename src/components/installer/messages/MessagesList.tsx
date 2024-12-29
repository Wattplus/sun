import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Clock, User, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Message {
  id: string;
  sender: {
    name: string;
    type: 'admin' | 'client' | 'installer';
  };
  content: string;
  date: string;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Jean Dupont",
      type: "client"
    },
    content: "Bonjour, je souhaiterais avoir plus d'informations sur l'installation de panneaux solaires.",
    date: "2024-03-20",
    read: false,
  },
  {
    id: "2",
    sender: {
      name: "Support Technique",
      type: "admin"
    },
    content: "Nouveau lead disponible dans votre région ! Consultez votre tableau de bord pour plus de détails.",
    date: "2024-03-19",
    read: true,
  },
];

export function MessagesList() {
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    });
    
    setNewMessage("");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  const getSenderBadge = (type: Message['sender']['type']) => {
    switch (type) {
      case 'admin':
        return <Badge variant="default" className="bg-primary text-primary-foreground">Admin</Badge>;
      case 'client':
        return <Badge variant="default" className="bg-green-500">Client</Badge>;
      case 'installer':
        return <Badge variant="default" className="bg-orange-500">Installateur</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Messages</h2>
          {mockMessages.filter(m => !m.read).length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {mockMessages.filter(m => !m.read).length} nouveaux
            </Badge>
          )}
        </div>
      </div>

      <Card className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`p-4 transition-all hover:shadow-md ${
                    !message.read ? 'border-primary/50 bg-primary/5' : 'border-border/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{message.sender.name}</span>
                      {getSenderBadge(message.sender.type)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(message.date)}
                      </span>
                      {message.read && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                    {message.content}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-2 pt-4 border-t mt-4">
          <Textarea
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px] bg-background/50"
          />
          <Button 
            onClick={handleSendMessage}
            className="self-end"
          >
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
        </div>
      </Card>

      {mockMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun message pour le moment</p>
        </div>
      )}
    </div>
  );
}