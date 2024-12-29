import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, User, Star, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageInput } from "./components/MessageInput";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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
    content: "Installation de panneaux photovoltaïques sur toiture résidentielle. Surface disponible 45m², orientation sud-ouest, consommation annuelle 8500 kWh.",
    date: "28 DÉC.",
    details: {
      "Type de projet": "Résidentiel",
      "Surface disponible": "45m²",
      "Orientation": "Sud-Ouest",
      "Consommation annuelle": "8500 kWh",
      "Type de toiture": "Tuiles",
      "Code Postal": "75012",
      "Ville": "Paris",
      "Numéro de téléphone": "0612345678",
      "Email": "client@example.com",
      "Prénom pour le devis": "Thomas",
      "Nom pour le devis": "Martin"
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
          {messages.map((message, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {message.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    Nouveau LEAD
                  </Badge>
                  <Star className="h-4 w-4 text-muted-foreground hover:text-yellow-400 transition-colors" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {message.details?.["Conditionnement"]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {message.details?.["Poids total en kg"]} kg
                </Badge>
              </div>
            </motion.div>
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