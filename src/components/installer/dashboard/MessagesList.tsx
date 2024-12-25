import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  }
];

export const MessagesList = () => {
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

  return (
    <div className="space-y-4">
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
              className={`p-4 ${message.read ? 'bg-background/50' : 'bg-primary/5'}`}
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

      <div className="flex gap-2">
        <Input
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};