import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Archive, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageHeader } from "./components/MessageHeader";
import { MessageInput } from "./components/MessageInput";
import { MessageItem } from "./components/MessageItem";

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
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSendMessage = (content: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: {
        name: "Vous",
        type: "installer"
      },
      content,
      date: new Date().toISOString().split('T')[0],
      read: true
    };

    setMessages(prev => [newMsg, ...prev]);
    onMessageSent();
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès"
    });
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
        toast({
          title: "Messages archivés",
          description: `${selectedMessages.length} messages ont été archivés`
        });
        break;
      case 'delete':
        setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg.id)));
        toast({
          title: "Messages supprimés",
          description: `${selectedMessages.length} messages ont été supprimés`
        });
        break;
      case 'markRead':
        setMessages(prev => prev.map(msg => 
          selectedMessages.includes(msg.id) ? { ...msg, read: true } : msg
        ));
        toast({
          title: "Messages marqués comme lus",
          description: `${selectedMessages.length} messages ont été marqués comme lus`
        });
        break;
    }
    setSelectedMessages([]);
  };

  const toggleMessageStar = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  return (
    <div className="space-y-6">
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
        <MessageHeader unreadCount={messages.filter(m => !m.read).length} />
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              selected={selectedMessages.includes(message.id)}
              onSelect={toggleMessageSelection}
              onToggleStar={toggleMessageStar}
            />
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
