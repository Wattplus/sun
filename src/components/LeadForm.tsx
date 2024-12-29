import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ClientTypeForm } from "./lead-form/ClientTypeForm";
import { PersonalInfoForm } from "./lead-form/PersonalInfoForm";
import { FormField } from "./form/FormField";
import { FormHeader } from "./form/FormHeader";
import { SubmitButton } from "./form/SubmitButton";
import { createClientAccount, createLead } from "@/lib/supabase-client";
import { useNavigate } from "react-router-dom";

interface FormData {
  clientType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyBill: string;
  postalCode: string;
  password: string;
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
    password: ""
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
      // Créer le compte client
      const { error: accountError } = await createClientAccount(
        formData.email,
        formData.password,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        }
      );

      if (accountError) throw accountError;

      // Créer le lead
      const { error: leadError } = await createLead(formData);

      if (leadError) throw leadError;

      toast({
        title: "Compte créé avec succès",
        description: "Vous allez être redirigé vers votre espace client.",
      });

      // Rediriger vers l'espace client
      setTimeout(() => {
        navigate("/client-portal");
      }, 2000);

    } catch (error) {
      console.error("Erreur lors de la création du compte:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre compte.",
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

              <FormField
                label="Mot de passe"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                placeholder="Choisissez un mot de passe"
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