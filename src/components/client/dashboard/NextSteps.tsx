import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  {
    title: "Informations complétées",
    description: "Vos informations de base ont été enregistrées",
    status: "completed"
  },
  {
    title: "Étude technique",
    description: "Notre équipe analyse votre projet",
    status: "current"
  },
  {
    title: "Devis personnalisé",
    description: "Réception de votre devis détaillé",
    status: "pending"
  },
  {
    title: "Installation",
    description: "Planification et réalisation des travaux",
    status: "pending"
  }
];

export const NextSteps = () => {
  return (
    <Card className="p-6 glass-panel">
      <h3 className="text-xl font-semibold mb-4 gradient-text">
        Prochaines étapes
      </h3>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            {step.status === "completed" ? (
              <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
            ) : (
              <Circle className={`w-6 h-6 mt-1 ${
                step.status === "current" ? "text-primary" : "text-gray-600"
              }`} />
            )}
            <div>
              <h4 className={`font-medium ${
                step.status === "pending" ? "text-gray-400" : "text-white"
              }`}>
                {step.title}
              </h4>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};