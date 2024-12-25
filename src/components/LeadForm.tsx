import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FormField } from "./form/FormField";
import { validateEmail, validatePhone, validatePostalCode } from "@/utils/formValidation";
import { Send } from "lucide-react";
import emailjs from '@emailjs/browser';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        postal_code: formData.postalCode,
        to_name: "Service Commercial",
        message: `Nouvelle demande d'étude :
          Nom complet : ${formData.firstName} ${formData.lastName}
          Email : ${formData.email}
          Téléphone : ${formData.phone}
          Code postal : ${formData.postalCode}`
      };

      await emailjs.send(
        'service_611ohbh',
        'template_id', // Vous devrez créer un template dans EmailJS et utiliser son ID ici
        templateParams,
        '12Wtu7mylEymnNxyV' // Votre clé publique
      );

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
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Un problème est survenu lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
      <div className="relative w-full max-w-3xl mx-auto p-8 rounded-xl bg-gradient-to-br from-[#1a5fb4] to-[#0B1221] text-white border border-white/10 backdrop-blur-sm shadow-2xl">
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Demandez votre étude gratuite
          </h2>
          <p className="text-gray-100">
            Découvrez votre potentiel d'économies avec une étude personnalisée sans engagement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Prénom"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              lightMode
            />
            
            <FormField
              label="Nom"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              lightMode
            />
          </div>
          
          <FormField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            lightMode
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Téléphone"
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="06 12 34 56 78"
              lightMode
            />
            
            <FormField
              label="Code postal"
              id="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              error={errors.postalCode}
              placeholder="75001"
              lightMode
            />
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
            <Button 
              type="submit" 
              className="relative w-full bg-green-500 hover:bg-green-600 text-lg h-14 gap-2 rounded-full"
              disabled={isSubmitting}
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Envoi en cours..." : "Recevoir mon étude gratuite"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};