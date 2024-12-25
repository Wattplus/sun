import { Lead } from "@/types/crm";
import { differenceInDays } from "date-fns";
import { SubscriptionTier } from "@/types/subscription";

interface PriceCalculationResult {
  mutualPrice: number;
  exclusivePrice: number;
}

const getSubscriptionDiscount = (tier: SubscriptionTier = 'free'): number => {
  switch (tier) {
    case 'premium':
      return 0.20; // 20% de réduction
    case 'pro':
      return 0.10; // 10% de réduction
    default:
      return 0; // Pas de réduction
  }
};

export const calculateLeadPrice = (
  lead: Lead, 
  subscriptionTier: SubscriptionTier = 'free'
): PriceCalculationResult => {
  const basePrice = {
    mutualPrice: 19,
    exclusivePrice: 35
  };

  const createdAt = new Date(lead.createdAt);
  const today = new Date();
  const daysOld = differenceInDays(today, createdAt);

  // Prix minimum fixe après 30 jours
  if (daysOld >= 30) {
    return {
      mutualPrice: 12,
      exclusivePrice: 12
    };
  }

  // Réduction de 20% après 15 jours
  let currentPrices = daysOld >= 15 
    ? {
        mutualPrice: Math.max(12, basePrice.mutualPrice * 0.8),
        exclusivePrice: Math.max(12, basePrice.exclusivePrice * 0.8)
      }
    : basePrice;

  // Application de la réduction liée à l'abonnement
  const subscriptionDiscount = getSubscriptionDiscount(subscriptionTier);
  if (subscriptionDiscount > 0) {
    currentPrices = {
      mutualPrice: Math.max(12, currentPrices.mutualPrice * (1 - subscriptionDiscount)),
      exclusivePrice: Math.max(12, currentPrices.exclusivePrice * (1 - subscriptionDiscount))
    };
  }

  return currentPrices;
};

export const formatPrice = (price: number): string => {
  return `${price.toFixed(0)}€`;
};