import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageInput } from "./components/MessageInput";

interface Message {
  id: string;
  content: string;
  date: string;
  details?: {
    [key: string]: string;
  };
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

export function MessagesList() {
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
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-muted/50 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="text-sm text-muted-foreground">{message.date}</div>
              </div>
              <p className="text-sm">{message.content}</p>
              {message.details && (
                <div className="mt-4 space-y-2">
                  {Object.entries(message.details).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <MessageInput onSend={handleSendMessage} />

      {messages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun message pour le moment</p>
        </div>
      )}
    </div>
  );
}