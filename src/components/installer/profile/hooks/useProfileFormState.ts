import { useState } from "react";
import { InstallerFormData } from "@/types/installer";

export const useProfileFormState = (initialData?: Partial<InstallerFormData>) => {
  const [formData, setFormData] = useState<InstallerFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    company: initialData?.company || "",
    siret: initialData?.siret || "",
    website: initialData?.website || "",
    description: initialData?.description || "",
    experience: initialData?.experience || "",
    panelBrands: initialData?.panelBrands || "",
    inverterBrands: initialData?.inverterBrands || "",
    guaranteeYears: initialData?.guaranteeYears || "",
    service_area: initialData?.service_area || [],
    certifications: initialData?.certifications || {
      qualiPV: false,
      rge: false,
      qualibat: false,
    },
    installation_types: initialData?.installation_types || {
      residential: false,
      commercial: false,
      industrial: false,
    },
    maintenance_services: initialData?.maintenance_services || false,
    visibility_settings: initialData?.visibility_settings || {
      showPhoneNumber: true,
      highlightProfile: false,
      showCertifications: true,
      acceptDirectMessages: true,
    },
    address: initialData?.address || "",
    postal_code: initialData?.postal_code || "",
    city: initialData?.city || "",
  });

  return {
    formData,
    setFormData,
  };
};