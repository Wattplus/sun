import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Jean Dupont",
    content: "Bonjour, je souhaiterais avoir plus d'informations sur l'installation de panneaux solaires.",
    date: "2024-03-20",
    read: false,
  },
  {
    id: "2",
    sender: "Marie Martin",
    content: "Est-ce possible de programmer un rendez-vous pour la semaine prochaine ?",
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Conversations
          <Badge variant="secondary" className="ml-2">
            {mockMessages.filter(m => !m.read).length} nouveaux
          </Badge>
        </h2>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`p-4 transition-all hover:shadow-md ${
                !message.read ? 'border-primary/50 bg-primary/5' : 'border-border/50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{message.sender}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(message.date)}
                  </div>
                </div>
                {!message.read && (
                  <Badge variant="default" className="bg-primary/15 text-primary border-0">
                    Nouveau
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {message.content}
              </p>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-4 border-t">
        <Input
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="bg-background/50"
        />
        <Button onClick={handleSendMessage}>
          <Send className="h-4 w-4 mr-2" />
          Envoyer
        </Button>
      </div>

      {mockMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun message pour le moment</p>
        </div>
      )}
    </div>
  );
}