import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
}

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) return;
    onSend(content);
    setContent("");
  };

  return (
    <div className="flex flex-col gap-2 pt-4 border-t mt-4">
      <Textarea
        placeholder="Saisissez votre message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        className="min-h-[100px] bg-background/50"
      />
      <Button 
        onClick={handleSend}
        className="self-end"
        disabled={!content.trim()}
      >
        <Send className="h-4 w-4 mr-2" />
        Envoyer
      </Button>
    </div>
  );
};