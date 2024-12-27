import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Building } from "lucide-react";

export const ProfileSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Prénom"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            lightMode
          />
          <FormField
            label="Nom"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            lightMode
          />
          <FormField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            lightMode
          />
          <FormField
            label="Téléphone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+33 6 12 34 56 78"
            lightMode
          />
          <FormField
            label="Entreprise"
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nom de votre entreprise"
            lightMode
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Enregistrer les modifications
        </Button>
      </form>
    </Card>
  );
};