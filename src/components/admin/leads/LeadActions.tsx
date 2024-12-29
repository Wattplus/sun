import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { Lead } from "@/types/crm";

interface LeadActionsProps {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onAssignClick: (lead: Lead) => void;
  onDeleteClick: (lead: Lead) => void;
}

export const LeadActions = ({
  lead,
  onEditClick,
  onAssignClick,
  onDeleteClick,
}: LeadActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEditClick(lead)}
        className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
      >
        <Edit className="h-4 w-4 mr-2 text-[#1EAEDB]" />
        Éditer
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAssignClick(lead)}
        disabled={lead.status === "assigned" || lead.status === "converted"}
        className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40 hover:bg-[#33C3F0]/10"
      >
        <UserPlus className="h-4 w-4 mr-2 text-[#1EAEDB]" />
        Assigner
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDeleteClick(lead)}
        className="border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4 mr-2 text-red-500" />
        Supprimer
      </Button>
    </div>
  );
};