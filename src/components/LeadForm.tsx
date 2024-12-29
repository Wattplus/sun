import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ClientTypeForm } from "./lead-form/ClientTypeForm";
import { PersonalInfoForm } from "./lead-form/PersonalInfoForm";
import { initEmailJS, sendEmail } from "@/config/emailConfig";
import { FormField } from "./form/FormField";
import { FormHeader } from "./form/FormHeader";
import { SubmitButton } from "./form/SubmitButton";

// Initialisation d'EmailJS
initEmailJS();

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
    setIsSubmitting(true);

    try {
      await sendEmail("template_lead", {
        client_type: formData.clientType,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        monthly_bill: formData.monthlyBill,
        postal_code: formData.postalCode,
      });

      toast({
        title: "Formulaire envoyé",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });

      setFormData({
        clientType: "particulier",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        monthlyBill: "",
        postalCode: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
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