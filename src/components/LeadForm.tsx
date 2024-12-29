import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FormField } from "./form/FormField";
import { validateEmail, validatePhone, validatePostalCode } from "@/utils/formValidation";
import { FormHeader } from "./form/FormHeader";
import { SubmitButton } from "./form/SubmitButton";
import emailjs from '@emailjs/browser';

// Configuration d'EmailJS avec les paramètres SMTP sécurisés
emailjs.init("nSGUhEBvdNcDlBp0F");

const SMTP_CONFIG = {
  host: "mail.wattplus.org",
  port: 465,
  secure: true,
  auth: {
    user: "mikael@wattplus.org",
    pass: "Hanna77026@"
  }
};

interface FormData {
  clientType: string;
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
    clientType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.clientType) newErrors.clientType = "Veuillez sélectionner un type de client";
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
      await emailjs.send(
        'service_611ohbh',
        'template_ct280jq',
        {
          client_type: formData.clientType,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          postal_code: formData.postalCode,
          date: new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        },
        'nSGUhEBvdNcDlBp0F',
        SMTP_CONFIG
      );

      toast({
        title: "Demande envoyée avec succès ! 🎉",
        description: "Votre étude personnalisée vous sera envoyée très prochainement.",
        duration: 6000,
      });
      
      setFormData({
        clientType: "",
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
    <div className="relative group my-20" id="lead-form">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
      <div className="relative w-full max-w-2xl mx-auto p-10 rounded-xl bg-gradient-to-br from-[#1a5fb4] to-[#0B1221] text-white border border-white/10 backdrop-blur-sm shadow-2xl">
        <FormHeader />

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="clientType" className="block text-sm font-medium text-white">
              Type de projet photovoltaïque
            </label>
            <select
              id="clientType"
              name="clientType"
              value={formData.clientType}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-white/10 border ${
                errors.clientType ? 'border-red-500' : 'border-white/20'
              } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:text-black [&>option]:bg-white/90`}
            >
              <option value="" className="text-gray-400">Sélectionnez votre type de projet</option>
              <option value="particulier">Résidentiel</option>
              <option value="professionnel">Professionnel / Industriel</option>
            </select>
            {errors.clientType && (
              <p className="text-sm text-red-500 mt-1">{errors.clientType}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};