import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { InstallerFormData, VisibilitySettings } from "../types/installer.types";

const defaultVisibilitySettings: VisibilitySettings = {
  showPhoneNumber: true,
  highlightProfile: false,
  acceptDirectMessages: true,
  showCertifications: true
};

export const useProfileForm = () => {
  const [formData, setFormData] = useState<InstallerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    description: "",
    experience: "",
    panelBrands: [],
    inverterBrands: [],
    guaranteeYears: "",
    service_area: [],
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false
    },
    maintenanceServices: false,
    address: "",
    postal_code: "",
    city: "",
    visibility_settings: defaultVisibilitySettings
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          toast.error("Vous devez être connecté pour accéder à cette page");
          return;
        }

        const { data, error } = await supabase
          .from("installers")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Erreur lors de la récupération du profil");
          return;
        }

        if (data) {
          const [firstName, lastName] = (data.contact_name || "").split(" ");
          
          const visibilitySettings = data.visibility_settings as VisibilitySettings || defaultVisibilitySettings;

          setFormData({
            firstName: firstName || "",
            lastName: lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            company: data.company_name || "",
            siret: data.siret || "",
            website: data.website || "",
            description: data.description || "",
            experience: data.experience_years?.toString() || "",
            panelBrands: data.panel_brands || [],
            inverterBrands: data.inverter_brands || [],
            guaranteeYears: data.warranty_years?.toString() || "",
            service_area: data.service_area || [],
            certifications: data.certifications as { qualiPV: boolean; rge: boolean; qualibat: boolean } || {
              qualiPV: false,
              rge: false,
              qualibat: false
            },
            installationTypes: data.installation_types as { residential: boolean; commercial: boolean; industrial: boolean } || {
              residential: false,
              commercial: false,
              industrial: false
            },
            maintenanceServices: data.maintenance_services || false,
            address: data.address || "",
            postal_code: data.postal_code || "",
            city: data.city || "",
            visibility_settings: visibilitySettings
          });
        }
      } catch (error) {
        console.error("Error in fetchProfileData:", error);
        toast.error("Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const updateFormData = (field: keyof InstallerFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return { formData, updateFormData, loading };
};