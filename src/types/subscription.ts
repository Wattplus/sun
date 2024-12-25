export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  tier: SubscriptionTier;
  priceId: string; // Stripe price ID
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    tier: 'free',
    priceId: '',
    features: [
      'Accès aux leads de base',
      'Maximum 5 leads par mois',
      'Prix standard des leads',
      'Profil de base',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49.99,
    tier: 'pro',
    priceId: 'price_1QZyJpFOePj4Hv47sd76eDOz',
    features: [
      'Accès prioritaire aux leads',
      'Leads illimités',
      '-10% sur tous les leads',
      'Profil premium',
      'Support prioritaire',
      'Statistiques avancées',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99.99,
    tier: 'premium',
    priceId: 'price_1QZyKUFOePj4Hv47qEFQ1KzF',
    features: [
      'Tous les avantages Pro',
      'Leads exclusifs',
      '-20% sur tous les leads',
      'API d\'intégration',
      'Support dédié',
      'Formation personnalisée',
      'Tableau de bord personnalisé',
    ],
  },
];