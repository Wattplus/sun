import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { SubmitButton } from "@/components/form/SubmitButton";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const NewCardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const formatExpiryDate = (value: string) => {
    // Supprimer tous les caractères non numériques
    const numbers = value.replace(/\D/g, "");
    
    // Ne pas permettre plus de 4 chiffres
    if (numbers.length > 4) return formData.expiryDate;
    
    // Ajouter le slash après les 2 premiers chiffres
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2);
    }
    
    return numbers;
  };

  const validateExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length !== 4) return "Format invalide (MM/AA)";
    
    const month = parseInt(numbers.slice(0, 2));
    const year = parseInt(numbers.slice(2));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (month < 1 || month > 12) return "Mois invalide";
    if (year < currentYear) return "Carte expirée";
    if (year === currentYear && month < currentMonth) return "Carte expirée";
    
    return "";
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formattedValue });
    
    if (formattedValue.length === 5) {
      const error = validateExpiryDate(formattedValue);
      setErrors(prev => ({ ...prev, expiryDate: error }));
    } else {
      setErrors(prev => ({ ...prev, expiryDate: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Valider la date d'expiration avant la soumission
    const expiryError = validateExpiryDate(formData.expiryDate);
    if (expiryError) {
      setErrors(prev => ({ ...prev, expiryDate: expiryError }));
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulation d'un délai d'ajout de carte
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Carte ajoutée avec succès",
        description: "Votre nouvelle carte a été enregistrée.",
      });
      
      navigate("/espace-installateur/compte");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la carte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Ajouter une carte</h1>
                  <p className="text-white/60">
                    Ajoutez une nouvelle carte pour vos paiements
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Numéro de carte"
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  error={errors.cardNumber}
                  lightMode
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Date d'expiration"
                    id="expiryDate"
                    type="text"
                    placeholder="MM/AA"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    error={errors.expiryDate}
                    lightMode
                  />
                  <FormField
                    label="CVV"
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value })
                    }
                    error={errors.cvv}
                    lightMode
                  />
                </div>

                <FormField
                  label="Nom sur la carte"
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={(e) =>
                    setFormData({ ...formData, cardholderName: e.target.value })
                  }
                  error={errors.cardholderName}
                  lightMode
                />

                <SubmitButton isSubmitting={isSubmitting} />
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};