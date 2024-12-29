import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ClientTypeForm } from "./lead-form/ClientTypeForm";
import { PersonalInfoForm } from "./lead-form/PersonalInfoForm";
import { initEmailJS, sendEmail } from "@/config/emailConfig";
import { FormField } from "./form/FormField";

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
    }
  };

  return (
    <Card className="p-6" id="lead-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ClientTypeForm
          value={formData.clientType}
          onChange={(value) => handleFieldChange("clientType", value)}
        />
        
        <div className="space-y-4">
          <FormField
            label="Facture mensuelle (€)"
            id="monthlyBill"
            type="number"
            value={formData.monthlyBill}
            onChange={(e) => handleFieldChange("monthlyBill", e.target.value)}
            placeholder="Ex: 150"
          />
          
          <FormField
            label="Code postal"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleFieldChange("postalCode", e.target.value)}
            placeholder="Ex: 75001"
          />
        </div>

        <PersonalInfoForm
          firstName={formData.firstName}
          lastName={formData.lastName}
          email={formData.email}
          phone={formData.phone}
          onFieldChange={handleFieldChange}
        />

        <Button type="submit" className="w-full">
          Envoyer
        </Button>
      </form>
    </Card>
  );
};