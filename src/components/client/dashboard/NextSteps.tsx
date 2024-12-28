import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

export const NextSteps = () => {
  const steps = [
    {
      title: "Étude Personnalisée",
      description: "Analyse détaillée de votre consommation et de votre toiture",
      status: "completed",
      date: "15/03/2024"
    },
    {
      title: "Visite Technique",
      description: "Inspection sur site par notre expert technique",
      status: "current",
      date: "22/03/2024"
    },
    {
      title: "Proposition Commerciale",
      description: "Devis détaillé et plan de financement",
      status: "pending",
      date: "29/03/2024"
    },
    {
      title: "Installation",
      description: "Mise en place de votre installation solaire",
      status: "pending",
      date: "15/04/2024"
    }
  ];

  return (
    <Card className="p-6 bg-background/95 backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-primary">
            Prochaines Étapes
          </h3>
          <p className="text-sm text-muted-foreground">
            Suivi de l'avancement de votre projet
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              {step.status === "completed" ? (
                <CheckCircle2 className="h-6 w-6 text-green-400 mt-1" />
              ) : (
                <Circle className={`h-6 w-6 ${
                  step.status === "current" ? "text-blue-400" : "text-gray-400"
                } mt-1`} />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {step.date}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="ml-3 mt-2 mb-2 w-px h-8 bg-border" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};