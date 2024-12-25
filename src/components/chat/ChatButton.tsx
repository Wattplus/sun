import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatDialog } from "./ChatDialog";

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};