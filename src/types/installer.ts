export interface Certifications {
  qualiPV: boolean;
  rge: boolean;
  qualibat: boolean;
  [key: string]: boolean;
}

export interface InstallationTypes {
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
  [key: string]: boolean;
}

export interface VisibilitySettings {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  acceptDirectMessages: boolean;
  showCertifications: boolean;
  [key: string]: boolean;
}

export interface DatabaseInstallerData {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  service_area: string[];
  credits: number;
  verified: boolean;
  website?: string;
  description?: string;
  experience_years?: number;
  panel_brands?: string[];
  inverter_brands?: string[];
  warranty_years?: number;
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  subscription_plan?: string;
  profile_views?: number;
  conversion_rate?: number;
  satisfied_clients?: number;
  created_at?: string;
}

export interface InstallerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  siret: string;
  website: string;
  description: string;
  experience: string;
  panelBrands: string;
  inverterBrands: string;
  guaranteeYears: string;
  service_area: string[];
  certifications: Certifications;
  installationTypes: InstallationTypes;
  maintenanceServices: boolean;
  address: string;
  postal_code: string;
  city: string;
  visibility_settings: VisibilitySettings;
}

export const convertDbToFormFormat = (data: DatabaseInstallerData, email: string): InstallerFormData => {
  const [firstName = "", lastName = ""] = data.contact_name?.split(" ") || [];
  
  return {
    firstName,
    lastName,
    email,
    phone: data.phone || "",
    company: data.company_name || "",
    siret: data.user_id || "",
    website: data.website || "",
    description: data.description || "",
    experience: data.experience_years?.toString() || "",
    panelBrands: data.panel_brands?.join(", ") || "",
    inverterBrands: data.inverter_brands?.join(", ") || "",
    guaranteeYears: data.warranty_years?.toString() || "",
    service_area: data.service_area || [],
    certifications: data.certifications,
    installationTypes: data.installation_types,
    maintenanceServices: data.maintenance_services,
    address: data.address || "",
    postal_code: data.postal_code || "",
    city: data.city || "",
    visibility_settings: data.visibility_settings
  };
};

export const convertFormToDbFormat = (formData: InstallerFormData, userId: string): Partial<DatabaseInstallerData> => {
  return {
    user_id: userId,
    company_name: formData.company,
    contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
    phone: formData.phone,
    address: formData.address,
    postal_code: formData.postal_code,
    city: formData.city,
    service_area: formData.service_area,
    website: formData.website,
    description: formData.description,
    experience_years: parseInt(formData.experience) || null,
    panel_brands: formData.panelBrands.split(",").map(s => s.trim()).filter(Boolean),
    inverter_brands: formData.inverterBrands.split(",").map(s => s.trim()).filter(Boolean),
    warranty_years: parseInt(formData.guaranteeYears) || null,
    certifications: formData.certifications,
    installation_types: formData.installationTypes,
    maintenance_services: formData.maintenanceServices,
    visibility_settings: formData.visibility_settings
  };
};