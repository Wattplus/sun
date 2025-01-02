import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { LeadCardHeader } from "./LeadCardHeader";
import { LeadCardActions } from "./LeadCardActions";
import { LeadInfoDisplay } from "@/components/installer/marketplace/LeadInfoDisplay";
import { useLeadCardState } from "./hooks/useLeadCardState";
import { useLeadPurchase } from "./hooks/useLeadPurchase";

interface LeadCardProps {
  lead: Lead;
  onPurchase?: (lead: Lead) => void;
  status?: "available" | "purchased";
  showActions?: boolean;
  hasPrepaidAccount?: boolean;
}

export const LeadCard = ({ 
  lead, 
  onPurchase, 
  status = "available",
  showActions = true,
  hasPrepaidAccount = false
}: LeadCardProps) => {
  const { isExpanded, setIsExpanded, isLoading, setIsLoading } = useLeadCardState(lead);
  const { handlePurchase } = useLeadPurchase(lead, onPurchase, setIsLoading);

  return (
    <Card className="overflow-hidden border-[#1EAEDB]/10 bg-[#0A1A2C] text-white">
      <div className="p-6 space-y-6">
        <LeadCardHeader
          firstName={lead.firstname}
          lastName={lead.lastname}
          postalCode={lead.postalcode}
          createdAt={lead.created_at}
          projectType={lead.clienttype}
          budget={lead.price || 0}
          monthlyBill={lead.monthlybill}
          purchasedBy={lead.purchasedby?.map(p => ({
            installerId: p.toString(),
            purchaseType: 'mutualise',
            purchaseDate: new Date().toISOString()
          }))}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          status={status}
        />

        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-white/10">
            <LeadInfoDisplay lead={lead} />
            
            {showActions && status === "available" && (
              <LeadCardActions
                onPurchase={handlePurchase}
                mutualPrice={lead.price || 0}
                exclusivePrice={(lead.price || 0) * 2}
                canPurchaseMutual={true}
                canPurchaseExclusive={true}
                isProfessionalProject={lead.clienttype === 'professional'}
                isLoading={isLoading}
                hasPrepaidAccount={hasPrepaidAccount}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};