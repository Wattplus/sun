import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowRight, Sun } from "lucide-react";

export const SavingsCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [roofSize, setRoofSize] = useState("");
  const [savings, setSavings] = useState<number | null>(null);

  const calculateSavings = () => {
    const monthly = parseFloat(monthlyBill);
    const size = parseFloat(roofSize);
    if (!isNaN(monthly) && !isNaN(size)) {
      const annualSavings = monthly * 12 * 0.4;
      setSavings(annualSavings);
    }
  };

  return (
    <div className="py-12 sm:py-24 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Calculez vos économies
          </h2>
          <p className="text-lg sm:text-xl text-blue-200">
            Jusqu'à 40% d'économies sur vos factures d'électricité
          </p>
        </div>

        <div className="mx-auto max-w-xl glass-panel p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyBill" className="text-white">Facture mensuelle actuelle (€)</Label>
              <Input
                id="monthlyBill"
                type="number"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                placeholder="150"
                className="bg-secondary border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roofSize" className="text-white">Surface de toiture disponible (m²)</Label>
              <Input
                id="roofSize"
                type="number"
                value={roofSize}
                onChange={(e) => setRoofSize(e.target.value)}
                placeholder="30"
                className="bg-secondary border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <Button 
              onClick={calculateSavings}
              className="w-full bg-primary hover:bg-primary-dark text-white"
              size="lg"
            >
              <Calculator className="mr-2" />
              Calculer mes économies
            </Button>

            {savings && (
              <div className="mt-6 sm:mt-8 glass-panel">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                  <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Vos économies estimées
                  </h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
                  {savings.toLocaleString('fr-FR')}€ / an
                </p>
                <p className="text-xs sm:text-sm text-blue-200 text-center mb-4">
                  Retour sur investissement moyen : 7 ans
                </p>
                <Button 
                  className="w-full bg-primary hover:bg-primary-dark"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Obtenir mon étude détaillée
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};