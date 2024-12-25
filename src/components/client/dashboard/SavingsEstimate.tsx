import { Card } from "@/components/ui/card";
import { SunIcon } from "lucide-react";

export const SavingsEstimate = () => {
  return (
    <Card className="p-6 glass-panel">
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
          <span className="text-2xl font-bold text-primary">75 €</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Économies annuelles</span>
          <span className="text-2xl font-bold text-primary">900 €</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Économies totales</span>
          <span className="text-2xl font-bold text-primary">18 000 €</span>
        </div>
      </div>
    </Card>
  );
};