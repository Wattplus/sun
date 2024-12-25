import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

const mockMessages = [
  {
    id: "1",
    date: "2024-03-22",
    content: "Nouveau lead disponible dans votre région",
    read: false,
    sender: "Système"
  },
  {
    id: "2",
    date: "2024-03-20",
    content: "Votre achat de lead a été confirmé",
    read: true,
    sender: "Support"
  },
  {
    id: "3",
    date: "2024-03-19",
    content: "Bienvenue sur la plateforme !",
    read: true,
    sender: "Support"
  }
];

export const MessagesList = () => {
  return (
    <Card className="bg-background/50 backdrop-blur-md border-primary/20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Badge variant="secondary">
            {mockMessages.filter(m => !m.read).length} nouveaux
          </Badge>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`p-4 ${message.read ? 'bg-background' : 'bg-primary/5'} border-primary/10 hover:border-primary/30 transition-all`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{message.sender}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.date}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};