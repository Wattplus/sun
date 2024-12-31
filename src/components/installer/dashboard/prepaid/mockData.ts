export const mockCards = [
  {
    id: "1",
    last4: "4242",
    brand: "Visa",
    expMonth: 12,
    expYear: 2024,
  }
];

export const mockTransactions = [
  {
    id: "1",
    date: new Date().toISOString(),
    description: "Rechargement du compte",
    amount: 500,
    type: "credit" as const,
  },
  {
    id: "2",
    date: new Date().toISOString(),
    description: "Achat de lead",
    amount: 25,
    type: "debit" as const,
  }
];

export const faqItems = [
  {
    question: "Comment recharger mon compte ?",
    answer: "Vous pouvez recharger votre compte en utilisant une carte bancaire. Cliquez sur le bouton 'Recharger' et choisissez le montant souhaité."
  },
  {
    question: "Quand mes crédits seront-ils disponibles ?",
    answer: "Vos crédits sont disponibles immédiatement après le paiement."
  },
  {
    question: "Comment sont utilisés mes crédits ?",
    answer: "Vos crédits sont automatiquement déduits lors de l'achat de leads."
  }
];