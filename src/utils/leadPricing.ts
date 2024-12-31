import { Lead } from "@/types/crm";
import { differenceInDays } from "date-fns";

export const calculateLeadPrice = (lead: Lead): number => {
  if (lead.clienttype === 'professional') {
    return 49;
  }

  const daysOld = differenceInDays(new Date(), new Date(lead.created_at));
  
  if (daysOld >= 45) return 15;
  if (daysOld >= 30) return 19;
  if (daysOld >= 15) return 21;
  return 26;
};

export const getLeadPriceId = (lead: Lead): string => {
  if (lead.clienttype === 'professional') {
    return 'price_1Qa0nUFOePj4Hv47Ih00CR8k'; // 49€
  }

  const daysOld = differenceInDays(new Date(), new Date(lead.created_at));
  
  if (daysOld >= 45) return 'price_1QbzyKFOePj4Hv47zISfJkUz'; // 15€
  if (daysOld >= 30) return 'price_1QbzxlFOePj4Hv47XHGG9Vwt'; // 19€
  if (daysOld >= 15) return 'price_1QbzwKFOePj4Hv47XHGG9Vwt'; // 21€
  return 'price_1QaAlfFOePj4Hv475LWE2bGQ'; // 26€
};