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
      const annualSavings = monthly * 12 * 0.7; // Estimation simplifiée
      setSavings(annualSavings);
    }
  };

  return (
    <div className="py-24 sm:py-32 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Calculez vos économies
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez combien vous pourriez économiser avec l'énergie solaire
          </p>
        </div>

        <div className="mx-auto max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyBill">Facture mensuelle actuelle (€)</Label>
              <Input
                id="monthlyBill"
                type="number"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                placeholder="150"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roofSize">Surface de toiture disponible (m²)</Label>
              <Input
                id="roofSize"
                type="number"
                value={roofSize}
                onChange={(e) => setRoofSize(e.target.value)}
                placeholder="30"
              />
            </div>

            <Button 
              onClick={calculateSavings}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              size="lg"
            >
              <Calculator className="mr-2" />
              Calculer mes économies
            </Button>

            {savings && (
              <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Sun className="h-8 w-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Vos économies estimées
                  </h3>
                </div>
                <p className="text-4xl font-bold text-green-600 text-center mb-4">
                  {savings.toLocaleString('fr-FR')}€ / an
                </p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600"
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