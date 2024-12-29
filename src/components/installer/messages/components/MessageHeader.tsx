import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MessageHeaderProps {
  unreadCount: number;
}

export const MessageHeader = ({ unreadCount }: MessageHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <MessageSquare className="h-5 w-5 text-primary" />
      <h2 className="text-lg font-semibold">Messages</h2>
      {unreadCount > 0 && (
        <Badge variant="secondary">
          {unreadCount} nouveaux
        </Badge>
      )}
    </div>
  );
};