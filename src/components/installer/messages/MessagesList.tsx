import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageInput } from "./components/MessageInput";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  date: string;
  details?: {
    [key: string]: string;
  };
}

interface MessagesListProps {
  onMessageClick?: (id: string) => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "transport d'un tracteur 25380 longevelle les russey à Val de drome st jean des essartiers 14350 calvados",
    date: "28 DÉC.",
    details: {
      "Conditionnement": "Autres",
      "Précisez la nature de la marchandise": "tracteur ih553",
      "Quantité de colis/palette": "1",
      "Poids total en kg": "3600",
      "Dimensions du colis ou palette en cm": "3m75",
      "Départ de envoi : Code Postal et ville de départ": "25380",
      "Arrivée de envoi : Code Postal et ville de livraison": "14350",
      "Numéro de téléphone": "0674909294",
      "Email": "mlerrible@wanadoo.fr",
      "Prénom pour le devis": "Accard",
      "Nom pour le devis": "marie"
    }
  }
];

export function MessagesList({ onMessageClick }: MessagesListProps) {
  const [messages] = useState(mockMessages);
  const { toast } = useToast();

  const handleSendMessage = (content: string) => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès"
    });
  };

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className="group bg-muted/30 hover:bg-muted/50 rounded-lg p-4 space-y-4 cursor-pointer transition-all duration-200 border border-primary/10 hover:border-primary/20"
              onClick={() => onMessageClick?.(message.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{message.details?.["Prénom pour le devis"]} {message.details?.["Nom pour le devis"]}</h3>
                    <p className="text-sm text-muted-foreground">{message.details?.["Email"]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    Nouveau LEAD
                  </Badge>
                  <span className="text-sm text-muted-foreground">{message.date}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun message pour le moment</p>
        </div>
      )}
    </div>
  );
}