import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { Lead } from "@/types/lead";

interface LeadActionsProps {
  lead: Lead;
  onEditClick: (lead: Lead) => void;
  onAssignClick: (lead: Lead) => void;
  onDeleteClick: (lead: Lead) => void;
}

export const LeadActions = ({ lead, onEditClick, onAssignClick, onDeleteClick }: LeadActionsProps) => {
  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditClick(lead)}
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4 text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Éditer
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAssignClick(lead)}
              disabled={lead.status === "assigned" || lead.status === "converted"}
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
            >
              <UserPlus className="h-4 w-4 text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Assigner
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeleteClick(lead)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Supprimer
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};