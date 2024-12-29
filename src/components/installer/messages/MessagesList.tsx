import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Clock, User, CheckCircle2, Star, Archive, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

interface Message {
  id: string;
  sender: {
    name: string;
    type: 'admin' | 'client' | 'installer';
  };
  content: string;
  date: string;
  read: boolean;
  starred?: boolean;
}

interface MessagesListProps {
  onMessageSent: () => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Jean Dupont",
      type: "client"
    },
    content: "Bonjour, je souhaiterais avoir plus d'informations sur l'installation de panneaux solaires.",
    date: "2024-03-20",
    read: false,
    starred: true
  },
  {
    id: "2",
    sender: {
      name: "Support Technique",
      type: "admin"
    },
    content: "Nouveau lead disponible dans votre région ! Consultez votre tableau de bord pour plus de détails.",
    date: "2024-03-19",
    read: true,
  },
];

export function MessagesList({ onMessageSent }: MessagesListProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: {
        name: "Vous",
        type: "installer"
      },
      content: newMessage,
      date: new Date().toISOString().split('T')[0],
      read: true
    };

    setMessages(prev => [newMsg, ...prev]);
    setNewMessage("");
    onMessageSent();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  const getSenderBadge = (type: Message['sender']['type']) => {
    switch (type) {
      case 'admin':
        return <Badge variant="default" className="bg-primary text-primary-foreground">Admin</Badge>;
      case 'client':
        return <Badge variant="default" className="bg-green-500">Client</Badge>;
      case 'installer':
        return <Badge variant="default" className="bg-orange-500">Installateur</Badge>;
    }
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleBulkAction = (action: 'archive' | 'delete' | 'markRead') => {
    switch (action) {
      case 'archive':
        // Implement archive logic
        toast({
          title: "Messages archivés",
          description: `${selectedMessages.length} messages ont été archivés`
        });
        break;
      case 'delete':
        setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg.id)));
        break;
      case 'markRead':
        setMessages(prev => prev.map(msg => 
          selectedMessages.includes(msg.id) ? { ...msg, read: true } : msg
        ));
        break;
    }
    setSelectedMessages([]);
  };

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={selectedMessages.length > 0} 
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedMessages(messages.map(m => m.id));
              } else {
                setSelectedMessages([]);
              }
            }}
          />
          {selectedMessages.length > 0 && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('archive')}>
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('delete')}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('markRead')}>
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {messages.filter(m => !m.read).length} non lus
          </span>
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <AnimatePresence>
          <div className="space-y-2">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`p-4 transition-all hover:shadow-md ${
                    !message.read ? 'border-primary/50 bg-primary/5' : 'border-border/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      checked={selectedMessages.includes(message.id)}
                      onCheckedChange={() => toggleMessageSelection(message.id)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{message.sender.name}</span>
                          {getSenderBadge(message.sender.type)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Star 
                              className={`h-4 w-4 ${message.starred ? 'text-yellow-400 fill-yellow-400' : ''}`}
                            />
                          </Button>
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(message.date)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </ScrollArea>

      <div className="flex flex-col gap-2 pt-4 border-t mt-4">
        <Textarea
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="min-h-[100px] bg-background/50"
        />
        <Button 
          onClick={handleSendMessage}
          className="self-end"
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4 mr-2" />
          Envoyer
        </Button>
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun message pour le moment</p>
        </div>
      )}
    </div>
  );
}