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

  const generateSecurePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Erreur",
        description: "Le prénom est requis",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.lastName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom est requis",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Erreur",
        description: "L'email est requis",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Erreur",
        description: "Le téléphone est requis",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.monthlyBill.trim()) {
      toast({
        title: "Erreur",
        description: "La facture mensuelle est requise",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.postalCode.trim()) {
      toast({
        title: "Erreur",
        description: "Le code postal est requis",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedPassword = generateSecurePassword();
      
      // Créer le compte client avec le mot de passe généré
      const { error: accountError } = await createClientAccount(
        formData.email,
        generatedPassword,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          postalCode: formData.postalCode,
          clientType: formData.clientType,
          monthlyBill: formData.monthlyBill
        }
      );

      if (accountError) {
        toast({
          title: "Erreur",
          description: accountError.message || "Une erreur est survenue lors de la création de votre compte.",
          variant: "destructive",
        });
        return;
      }

      // Créer le lead
      const { error: leadError } = await createLead(formData);

      if (leadError) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la création de votre demande.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Compte créé avec succès",
        description: "Un email contenant vos identifiants de connexion vous a été envoyé.",
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