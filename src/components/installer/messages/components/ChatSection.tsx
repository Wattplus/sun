import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { messagesService } from "@/lib/supabase";
import type { Message } from "@/types/messages";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const ChatSection = () => {
  const { id: conversationId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => {
      if (!conversationId) throw new Error('Conversation ID is required');
      return messagesService.getMessages(conversationId);
    },
    enabled: !!conversationId,
    retry: 1,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => {
      if (!conversationId) throw new Error('Conversation ID is required');
      return messagesService.sendMessage({
        content,
        conversation_id: conversationId,
        sender_id: 'current-installer-id',
        sender_type: 'installer',
        read: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès",
      });
      setNewMessage("");
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessageMutation.mutate(newMessage);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] p-4">
        <p className="text-destructive text-center mb-4">
          Une erreur est survenue lors du chargement des messages
        </p>
        <Button 
          variant="outline"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })}
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="animate-pulse text-muted-foreground">
          Chargement des messages...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender_type === "installer" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender_type === "installer" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {message.sender_type === "installer" ? "IN" : "CL"}
                </div>
              </Avatar>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender_type === "installer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.created_at).toLocaleString()}
                </p>
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
          <Button 
            onClick={handleSendMessage} 
            className="h-auto"
            disabled={sendMessageMutation.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};