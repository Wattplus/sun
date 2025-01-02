import { useState } from "react";
import { Lead } from "@/types/crm";

export const useLeadCardState = (lead: Lead) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Logs détaillés pour le débogage
  console.log('Lead détaillé:', {
    id: lead.id,
    clientType: lead.clienttype,
    firstName: lead.firstname,
    lastName: lead.lastname,
    monthlyBill: lead.monthlybill,
    price: lead.price,
    purchasedBy: lead.purchasedby,
    status: lead.status,
    rawLead: lead
  });

  return {
    isExpanded,
    setIsExpanded,
    isLoading,
    setIsLoading
  };
};