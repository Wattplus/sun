import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ClientTypeForm } from "./lead-form/ClientTypeForm";
import { PersonalInfoForm } from "./lead-form/PersonalInfoForm";
import { Card } from "@/components/ui/card";
import { FormHeader } from "./form/FormHeader";
import { FormField } from "./form/FormField";
import { SubmitButton } from "./form/SubmitButton";
import { useNavigate } from "react-router-dom";
import { validateForm } from "@/utils/formValidation";
import { handleFormSubmission } from "@/utils/formSubmission";

interface FormData {
  clientType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyBill: string;
  postalCode: string;
}

export const LeadForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    clientType: "particulier",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    monthlyBill: "",
    postalCode: "",
  });

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData, toast)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await handleFormSubmission(formData, toast, navigate);

      if (success) {
        toast({
          title: "Demande envoyée !",
          description: "Votre demande a bien été prise en compte. Vous allez recevoir un email de confirmation.",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8" id="lead-form">
      <Card className="relative overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-background/95 to-background/80 border border-primary/20 shadow-2xl backdrop-blur-lg rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
        
        <div className="relative z-10">
          <FormHeader />
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 sm:space-y-8">
            <ClientTypeForm
              value={formData.clientType}
              onChange={(value) => handleFieldChange("clientType", value)}
            />
            
            <div className="space-y-4 sm:space-y-6">
              <FormField
                label="Facture mensuelle (€)"
                id="monthlyBill"
                type="number"
                value={formData.monthlyBill}
                onChange={(e) => handleFieldChange("monthlyBill", e.target.value)}
                placeholder="Ex: 150"
                required
                lightMode
              />
              
              <FormField
                label="Code postal"
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                placeholder="Ex: 75001"
                required
                lightMode
              />
            </div>

            <PersonalInfoForm
              firstName={formData.firstName}
              lastName={formData.lastName}
              email={formData.email}
              phone={formData.phone}
              onFieldChange={handleFieldChange}
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </Card>
    </div>
  );
};