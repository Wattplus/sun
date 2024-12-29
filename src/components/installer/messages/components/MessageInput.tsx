import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Link, List, ListOrdered, Send } from "lucide-react";

interface MessageInputProps {
  onSend: (content: string) => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="space-y-2">
      <div className="border rounded-lg p-2">
        <div className="flex gap-2 mb-2 border-b pb-2">
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          placeholder="Saisissez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] border-none focus-visible:ring-0"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSend} className="gap-2">
          <Send className="h-4 w-4" />
          Envoyer
        </Button>
      </div>
    </div>
  );
}