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
  console.log('Calculating price for:', { clientType, hasPrepaidAccount });
  const prices = clientType === 'professional' ? LEAD_PRICES.professional : LEAD_PRICES.particular;
  return hasPrepaidAccount ? prices.withPrepaid : prices.withoutPrepaid;
};

export const getPriceId = (clientType: string, hasPrepaidAccount: boolean): string => {
  if (clientType === 'professional') {
    return hasPrepaidAccount ? 'price_1Qa0nUFOePj4Hv47Ih00CR8k' : 'price_1Qa0nUFOePj4Hv47XHGG9Vwt';
  }
  // Prix pour les leads particuliers
  if (hasPrepaidAccount) {
    return 'price_1QaAlfFOePj4Hv47XHGG9Vwt'; // 26€
  }
  return 'price_1QaAlfFOePj4Hv475LWE2bGQ'; // 35€
};