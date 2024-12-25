import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { LeadCard } from "./LeadCard";
import { mockLeads, Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const LeadMarketplace = () => {
  const { toast } = useToast();
  const [purchasedLeads, setPurchasedLeads] = useState<string[]>([]);
  const availableLeads = mockLeads.filter(lead => lead.status === "qualified");

  const handlePurchase = (lead: Lead) => {
    setPurchasedLeads(prev => [...prev, lead.id]);
    toast({
      title: "Lead acheté avec succès",
      description: `Le lead ${lead.firstName} ${lead.lastName} a été ajouté à votre liste.`,
    });
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      <div className="bg-background/50 backdrop-blur-md p-6 rounded-xl border border-primary/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent">
            Marketplace des Leads
          </h2>
          <div className="text-sm text-muted-foreground">
            Leads vendus: {purchasedLeads.length} / {availableLeads.length}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableLeads.map(lead => (
            <LeadCard 
              key={lead.id} 
              lead={lead} 
              onPurchase={handlePurchase}
              isPurchased={purchasedLeads.includes(lead.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};