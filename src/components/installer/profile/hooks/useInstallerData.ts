import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InstallerFormData, InstallerData, VisibilitySettings } from "../types/installer";

const defaultFormData: InstallerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  siret: "",
  website: "",
  description: "",
  experience: "",
  panelBrands: "",
  inverterBrands: "",
  guaranteeYears: "",
  service_area: [],
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false,
  },
  installationTypes: {
    residential: false,
    commercial: false,
    industrial: false,
  },
  maintenanceServices: false,
  address: "",
  postal_code: "",
  city: "",
  visibility_settings: {
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  }
};

export const useInstallerData = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InstallerFormData>(defaultFormData);
  const [loading, setLoading] = useState(true);
  const [installer, setInstaller] = useState<InstallerData | null>(null);

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const { data: installerData, error } = await supabase
          .from('installers')
          .select()
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (installerData) {
          setInstaller(installerData);
          const [firstName = "", lastName = ""] = (installerData.contact_name || "").split(" ");
          
          setFormData({
            firstName,
            lastName,
            email: user.email || "",
            phone: installerData.phone || "",
            company: installerData.company_name || "",
            siret: installerData.siret || "",
            website: installerData.website || "",
            description: installerData.description || "",
            experience: installerData.experience_years?.toString() || "",
            panelBrands: Array.isArray(installerData.panel_brands) ? installerData.panel_brands.join(', ') : "",
            inverterBrands: Array.isArray(installerData.inverter_brands) ? installerData.inverter_brands.join(', ') : "",
            guaranteeYears: installerData.warranty_years?.toString() || "",
            service_area: installerData.service_area || [],
            certifications: installerData.certifications as InstallerFormData['certifications'] || defaultFormData.certifications,
            installationTypes: installerData.installation_types as InstallerFormData['installationTypes'] || defaultFormData.installationTypes,
            maintenanceServices: installerData.maintenance_services || false,
            address: installerData.address || "",
            postal_code: installerData.postal_code || "",
            city: installerData.city || "",
            visibility_settings: installerData.visibility_settings as VisibilitySettings || defaultFormData.visibility_settings,
          });
        }
      } catch (error) {
        console.error('Error loading installer data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'installateur",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadInstallerData();
  }, [toast]);

  return {
    formData,
    setFormData,
    loading,
    installer
  };
};