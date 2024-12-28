import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Step {
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  date: string;
  installerId?: string;
  installerName?: string;
}

export const NextSteps = () => {
  const navigate = useNavigate();
  
  const steps: Step[] = [
    {
      title: "Étude Personnalisée",
      description: "Analyse détaillée de votre consommation et de votre toiture",
      status: "completed",
      date: "15/03/2024",
      installerId: "inst-123",
      installerName: "Solar Expert"
    },
    {
      title: "Visite Technique",
      description: "Inspection sur site par notre expert technique",
      status: "current",
      date: "22/03/2024",
      installerId: "inst-123",
      installerName: "Solar Expert"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  const handleViewInstaller = (installerId: string) => {
    navigate(`/directory/${installerId}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="p-6 bg-background/95 backdrop-blur-sm">
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-primary">
              Prochaines Étapes
            </h3>
            <p className="text-sm text-muted-foreground">
              Suivi de l'avancement de votre projet
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
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
                      {step.installerName && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm text-primary mt-1"
                          onClick={() => step.installerId && handleViewInstaller(step.installerId)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Voir le profil de {step.installerName}
                        </Button>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {step.date}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="ml-3 mt-2 mb-2 w-px h-8 bg-border" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};