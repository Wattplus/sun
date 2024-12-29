import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Phone } from "lucide-react";
import { Lead } from "@/types/lead";
import { LeadPurchaseInfo } from "../LeadPurchaseInfo";

interface LeadContactProps {
  lead: Lead;
}

export const LeadContact = ({ lead }: LeadContactProps) => {
  return (
    <>
      <div className="font-medium">
        {lead.firstname} {lead.lastname}
      </div>
      <LeadPurchaseInfo lead={lead} />
      <div className="space-y-1.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href={`mailto:${lead.email}`} 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="truncate max-w-[200px]">{lead.email}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              Envoyer un email
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href={`tel:${lead.phone}`} 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{lead.phone}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              Appeler
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};