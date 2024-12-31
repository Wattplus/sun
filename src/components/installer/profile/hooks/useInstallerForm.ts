import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InstallerFormData } from "../types/installer";

export const useInstallerForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const updateInstaller = async (formData: InstallerFormData): Promise<boolean> => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour mettre à jour votre profil",
          variant: "destructive"
        });
        return false;
      }

      const installerData = {
        user_id: user.id,
        contact_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        company_name: formData.company,
        website: formData.website,
        description: formData.description,
        experience_years: parseInt(formData.experience) || null,
        panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
        inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
        warranty_years: parseInt(formData.guaranteeYears) || null,
        service_area: formData.service_area,
        certifications: formData.certifications,
        installation_types: formData.installationTypes,
        maintenance_services: formData.maintenanceServices,
        address: formData.address,
        postal_code: formData.postal_code,
        city: formData.city,
        siret: formData.siret,
        visibility_settings: formData.visibility_settings
      };

      const { error: upsertError } = await supabase
        .from('installers')
        .upsert(installerData);

      if (upsertError) throw upsertError;

      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour avec succès",
      });

      return true;
    } catch (error) {
      console.error('Error updating installer:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateInstaller,
    loading
  };
};