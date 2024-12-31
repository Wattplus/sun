import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface PersonalInfoSectionProps {
  data: any;
}

export const PersonalInfoSection = ({ data }: PersonalInfoSectionProps) => {
  const [formData, setFormData] = useState({
    company_name: data?.company_name || "",
    contact_name: data?.contact_name || "",
    phone: data?.phone || "",
    email: data?.email || "",
    address: data?.address || "",
    postal_code: data?.postal_code || "",
    city: data?.city || "",
    website: data?.website || "",
    description: data?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("installers")
        .update(formData)
        .eq("id", data.id);

      if (error) throw error;
      toast.success("Informations mises à jour avec succès");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nom de l'entreprise"
          id="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Nom du contact"
          id="contact_name"
          value={formData.contact_name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Téléphone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Adresse"
          id="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <FormField
          label="Code postal"
          id="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
          required
        />
        <FormField
          label="Ville"
          id="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <FormField
          label="Site web"
          id="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        Enregistrer les modifications
      </Button>
    </form>
  );
};