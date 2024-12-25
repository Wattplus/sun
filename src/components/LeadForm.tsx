import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FormField } from "./form/FormField";
import { validateEmail, validatePhone, validatePostalCode } from "@/utils/formValidation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
}

export const LeadForm = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!validateEmail(formData.email)) newErrors.email = "Email invalide";
    if (!validatePhone(formData.phone)) newErrors.phone = "Numéro de téléphone invalide";
    if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = "Code postal invalide";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    console.log("Form submitted:", formData);
    
    toast({
      title: "Demande envoyée avec succès !",
      description: "Votre étude personnalisée vous sera envoyée très prochainement.",
    });
    
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Demandez votre étude gratuite</h2>
        <p className="text-gray-500">
          Découvrez votre potentiel d'économies avec une étude personnalisée sans engagement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Prénom"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        
        <FormField
          label="Nom"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        
        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        <FormField
          label="Téléphone"
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="06 12 34 56 78"
        />
        
        <FormField
          label="Code postal"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          error={errors.postalCode}
          placeholder="75001"
        />

        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
        >
          Recevoir mon étude gratuite
        </Button>
      </form>
    </div>
  );
};