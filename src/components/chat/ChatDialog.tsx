import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatDialog = ({ open, onOpenChange }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Tu es un assistant commercial de WattPlus (mikael@wattplus.org - ID: 9feb2fad-a606-44af-9087-17bb5d5e1b25) spécialisé dans les panneaux solaires. Tu dois aider les utilisateurs à comprendre les avantages des panneaux solaires et les rediriger vers le formulaire de contact s'ils sont intéressés. Si c'est un installateur, redirige-le vers la création de compte installateur.",
            },
            ...messages,
            userMessage,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de communication avec l'API");
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.choices[0].message.content,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Vérifier si l'utilisateur est intéressé par l'installation
      if (assistantMessage.content.toLowerCase().includes("formulaire")) {
        setTimeout(() => {
          onOpenChange(false);
          const element = document.getElementById("lead-form");
          element?.scrollIntoView({ behavior: "smooth" });
        }, 2000);
      }

      // Vérifier si c'est un installateur
      if (assistantMessage.content.toLowerCase().includes("installateur")) {
        setTimeout(() => {
          window.location.href = "/espace-installateur";
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold">Comment puis-je vous aider ?</h2>
          <p className="text-sm text-muted-foreground">
            Je suis là pour répondre à vos questions sur les panneaux solaires
          </p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && (
              <ChatMessage
                role="assistant"
                content="En train d'écrire..."
                isLoading
              />
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};