import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "installer" | "client";
  timestamp: string;
}

export const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bonjour, je souhaite installer des panneaux photovoltaïques sur ma maison. J'ai une surface de toit de 35m² orientée plein sud. Ma facture d'électricité est de 180€ par mois. Pouvez-vous me faire un devis ?",
      sender: "client",
      timestamp: new Date().toLocaleString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "installer",
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
    });
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender === "installer" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "installer" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {message.sender === "installer" ? "IN" : "CL"}
                </div>
              </Avatar>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "installer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} className="h-auto">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};