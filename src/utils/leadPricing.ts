interface PriceStructure {
  withPrepaid: number;
  withoutPrepaid: number;
}

interface LeadPrices {
  particular: PriceStructure;
  professional: PriceStructure;
}

const LEAD_PRICES: LeadPrices = {
  particular: {
    withPrepaid: 26,
    withoutPrepaid: 35
  },
  professional: {
    withPrepaid: 49,
    withoutPrepaid: 59
  }
};

export const calculateLeadPrice = (clientType: string, hasPrepaidAccount: boolean): number => {
  const prices = clientType === 'professional' ? LEAD_PRICES.professional : LEAD_PRICES.particular;
  return hasPrepaidAccount ? prices.withPrepaid : prices.withoutPrepaid;
};