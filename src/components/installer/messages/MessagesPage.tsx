import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_type: 'admin' | 'installer';
  sender_name: string;
  read: boolean;
}

export const MessagesPage = () => {
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['installer-messages'],
    queryFn: async () => {
      const { data: installer } = await supabase
        .from('installers')
        .select('id')
        .single();

      if (!installer) {
        return [];
      }

      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('installer_id', installer.id)
        .order('created_at', { ascending: false });

      return messages || [];
    }
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { data: installer } = await supabase
        .from('installers')
        .select('id')
        .single();

      if (!installer) {
        throw new Error('Installer not found');
      }

      const { error } = await supabase
        .from('messages')
        .insert({
          content: newMessage,
          installer_id: installer.id,
          sender_type: 'installer',
          read: false
        });

      if (error) throw error;

      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès",
      });

      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">Chargement des messages...</p>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Messages</h2>
          {messages.filter(m => !m.read).length > 0 && (
            <Badge variant="secondary">
              {messages.filter(m => !m.read).length} nouveaux
            </Badge>
          )}
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun message pour le moment</p>
            </div>
          ) : (
            messages.map((message) => (
              <Card 
                key={message.id}
                className={`p-4 ${!message.read ? 'border-primary/50 bg-primary/5' : 'border-border/50'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {message.sender_type === 'admin' ? 'Support WattPlus' : 'Vous'}
                    </span>
                    <Badge variant={message.sender_type === 'admin' ? 'default' : 'secondary'}>
                      {message.sender_type === 'admin' ? 'Admin' : 'Vous'}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.created_at)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {message.content}
                </p>
              </Card>
            ))
          )}
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
  );
};