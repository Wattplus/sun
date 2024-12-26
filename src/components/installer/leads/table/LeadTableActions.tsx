import { Button } from "@/components/ui/button";
import { FileText, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadTableActionsProps {
  leadId: string;
}

export const LeadTableActions = ({ leadId }: LeadTableActionsProps) => {
  const { toast } = useToast();

  const handleNotes = () => {
    toast({
      title: "Notes",
      description: "Fonctionnalité de notes à venir",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message",
      description: "Fonctionnalité de messagerie à venir",
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleNotes(leadId)}
        className="gap-2"
      >
        <FileText className="h-4 w-4" />
        Notes
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleMessage(leadId)}
        className="gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Message
      </Button>
    </div>
  );
};