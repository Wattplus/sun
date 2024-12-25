import { Card } from "@/components/ui/card";
import { SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SavingsEstimateProps {
  monthlyBill?: string;
}

export const SavingsEstimate = ({ monthlyBill }: SavingsEstimateProps) => {
  const [savings, setSavings] = useState({
    monthly: 0,
    annual: 0,
    total: 0
  });

  useEffect(() => {
    if (monthlyBill && !isNaN(parseFloat(monthlyBill))) {
      const monthlyAmount = parseFloat(monthlyBill);
      const monthlyEstimate = monthlyAmount * 0.7; // 70% d'économies estimées
      const annualEstimate = monthlyEstimate * 12;
      const totalEstimate = annualEstimate * 20; // sur 20 ans

      setSavings({
        monthly: monthlyEstimate,
        annual: annualEstimate,
        total: totalEstimate
      });
    } else {
      setSavings({
        monthly: 0,
        annual: 0,
        total: 0
      });
    }
  }, [monthlyBill]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    });
  };

  if (!monthlyBill) {
    return (
      <Card className="glass-panel p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/20">
            <SunIcon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold gradient-text">
              Économies estimées
            </h3>
            <p className="text-sm text-gray-400">
              Remplissez vos informations pour voir vos économies estimées
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-panel p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/20">
          <SunIcon className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold gradient-text">
            Économies estimées
          </h3>
          <p className="text-sm text-gray-400">sur 20 ans</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Économies mensuelles</span>
          <span className="text-2xl font-bold text-primary">{formatCurrency(savings.monthly)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Économies annuelles</span>
          <span className="text-2xl font-bold text-primary">{formatCurrency(savings.annual)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Économies totales</span>
          <span className="text-2xl font-bold text-primary">{formatCurrency(savings.total)}</span>
        </div>
      </div>
    </Card>
  );
};