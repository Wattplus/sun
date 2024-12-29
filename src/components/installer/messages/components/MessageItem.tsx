import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, User, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface MessageItemProps {
  message: {
    id: string;
    sender: {
      name: string;
      type: 'admin' | 'client' | 'installer';
    };
    content: string;
    date: string;
    read: boolean;
    starred?: boolean;
  };
  selected: boolean;
  onSelect: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export const MessageItem = ({ message, selected, onSelect, onToggleStar }: MessageItemProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  const getSenderBadge = (type: 'admin' | 'client' | 'installer') => {
    switch (type) {
      case 'admin':
        return <Badge variant="default" className="bg-primary text-primary-foreground">Admin</Badge>;
      case 'client':
        return <Badge variant="default" className="bg-green-500">Client</Badge>;
      case 'installer':
        return <Badge variant="default" className="bg-orange-500">Installateur</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`p-4 transition-all hover:shadow-md ${
          !message.read ? 'border-primary/50 bg-primary/5' : 'border-border/50'
        }`}
      >
        <div className="flex items-center gap-4">
          <Checkbox 
            checked={selected}
            onCheckedChange={() => onSelect(message.id)}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{message.sender.name}</span>
                {getSenderBadge(message.sender.type)}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onToggleStar(message.id)}
                >
                  <Star 
                    className={`h-4 w-4 ${message.starred ? 'text-yellow-400 fill-yellow-400' : ''}`}
                  />
                </Button>
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(message.date)}
                </span>
                {message.read && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};