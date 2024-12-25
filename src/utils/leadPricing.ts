import { Lead } from "@/types/crm";
import { differenceInDays } from "date-fns";

export const calculateLeadPrice = (lead: Lead): { mutualPrice: number; exclusivePrice: number } => {
  const basePrice = {
    mutualPrice: 19,
    exclusivePrice: 35
  };

  const createdAt = new Date(lead.createdAt);
  const today = new Date();
  const daysOld = differenceInDays(today, createdAt);

  // After 15 days: -20%
  if (daysOld >= 15 && daysOld < 30) {
    return {
      mutualPrice: Math.max(12, basePrice.mutualPrice * 0.8),
      exclusivePrice: Math.max(12, basePrice.exclusivePrice * 0.8)
    };
  }
  // After 30 days: fixed price of 12€
  else if (daysOld >= 30) {
    return {
      mutualPrice: 12,
      exclusivePrice: 12
    };
  }

  return basePrice;
};

export const formatPrice = (price: number): string => {
  return `${price.toFixed(0)}€`;
};