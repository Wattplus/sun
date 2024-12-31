import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InstallerFormData, InstallerData, VisibilitySettings } from "../types/installer.types";

const defaultVisibilitySettings: VisibilitySettings = {
  showPhoneNumber: true,
  highlightProfile: false,
  acceptDirectMessages: true,
  showCertifications: true
};

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
  visibility_settings: defaultVisibilitySettings
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
          const typedData = installerData as unknown as InstallerData;
          setInstaller(typedData);
          
          const [firstName = "", lastName = ""] = (typedData.contact_name || "").split(" ");
          
          setFormData({
            firstName,
            lastName,
            email: user.email || "",
            phone: typedData.phone || "",
            company: typedData.company_name || "",
            siret: typedData.siret || "",
            website: typedData.website || "",
            description: typedData.description || "",
            experience: typedData.experience_years?.toString() || "",
            panelBrands: Array.isArray(typedData.panel_brands) ? typedData.panel_brands.join(', ') : "",
            inverterBrands: Array.isArray(typedData.inverter_brands) ? typedData.inverter_brands.join(', ') : "",
            guaranteeYears: typedData.warranty_years?.toString() || "",
            service_area: typedData.service_area || [],
            certifications: typedData.certifications,
            installationTypes: typedData.installation_types,
            maintenanceServices: typedData.maintenance_services,
            address: typedData.address || "",
            postal_code: typedData.postal_code || "",
            city: typedData.city || "",
            visibility_settings: typedData.visibility_settings || defaultVisibilitySettings
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