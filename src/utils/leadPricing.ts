import { Lead } from "@/types/crm";

export const calculateLeadPrice = (lead: Lead): number => {
  const basePrice = 25;
  let multiplier = 1;

  // Add price modifiers based on lead properties
  if (lead.projectType === 'professional') {
    multiplier *= 1.5;
  }

  // Add recency bonus (leads less than 24h old)
  const leadDate = new Date(lead.created_at);
  const now = new Date();
  const hoursDiff = (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60);
  
  if (hoursDiff <= 24) {
    multiplier *= 1.2;
  }

  return Math.round(basePrice * multiplier);
};
