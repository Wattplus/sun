import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { InstallerFormData, VisibilitySettings } from "../types/installer.types";
import type { Json } from "@/integrations/supabase/types";

export const useInstallerForm = () => {
  const [loading, setLoading] = useState(false);

  const updateInstaller = async (formData: InstallerFormData) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error("Vous devez être connecté pour effectuer cette action");
        return false;
      }

      // Convert form data to database format
      const visibilitySettings: Json = {
        showPhoneNumber: formData.visibility_settings.showPhoneNumber,
        highlightProfile: formData.visibility_settings.highlightProfile,
        acceptDirectMessages: formData.visibility_settings.acceptDirectMessages,
        showCertifications: formData.visibility_settings.showCertifications
      };

      const { error } = await supabase
        .from("installers")
        .update({
          company_name: formData.company,
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: formData.address,
          postal_code: formData.postal_code,
          city: formData.city,
          website: formData.website,
          description: formData.description,
          experience_years: parseInt(formData.experience),
          panel_brands: formData.panelBrands,
          inverter_brands: formData.inverterBrands,
          warranty_years: parseInt(formData.guaranteeYears),
          service_area: formData.service_area,
          certifications: formData.certifications,
          installation_types: formData.installationTypes,
          maintenance_services: formData.maintenanceServices,
          visibility_settings: visibilitySettings,
          siret: formData.siret
        })
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error updating installer:", error);
        toast.error("Erreur lors de la mise à jour du profil");
        return false;
      }

      toast.success("Profil mis à jour avec succès");
      return true;
    } catch (error) {
      console.error("Error in updateInstaller:", error);
      toast.error("Une erreur est survenue");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateInstaller, loading };
};