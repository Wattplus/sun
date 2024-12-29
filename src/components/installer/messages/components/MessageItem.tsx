import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, User, Star, CheckCircle2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface MessageItemProps {
  message: {
    id: string;
    sender: {
      name: string;
      type: 'admin' | 'client' | 'installer';
      email?: string;
      phone?: string;
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
    return format(new Date(dateString), "d MMM yyyy", { locale: fr });
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
        className={`p-3 md:p-4 transition-all hover:shadow-md ${
          !message.read ? 'border-primary/50 bg-primary/5' : 'border-border/50'
        }`}
      >
        <div className="flex items-start gap-2 md:gap-4">
          <Checkbox 
            checked={selected}
            onCheckedChange={() => onSelect(message.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium truncate">{message.sender.name}</span>
                {getSenderBadge(message.sender.type)}
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 md:h-8 md:w-8"
                  onClick={() => onToggleStar(message.id)}
                >
                  <Star 
                    className={`h-3 w-3 md:h-4 md:w-4 ${message.starred ? 'text-yellow-400 fill-yellow-400' : ''}`}
                  />
                </Button>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {formatDate(message.date)}
                  </span>
                </div>
                {message.read && (
                  <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                )}
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
              {message.content}
            </p>
            {(message.sender.email || message.sender.phone) && (
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                {message.sender.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {message.sender.email}
                  </div>
                )}
                {message.sender.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {message.sender.phone}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};