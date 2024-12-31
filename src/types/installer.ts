export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface VisibilitySettings {
  showPhoneNumber: boolean;
  highlightProfile: boolean;
  showCertifications: boolean;
  acceptDirectMessages: boolean;
  [key: string]: boolean;
}

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

export interface DatabaseInstallerData {
  id?: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  siret: string;
  address: string;
  postal_code: string;
  city: string;
  website?: string;
  description?: string;
  experience_years?: number;
  panel_brands?: string[];
  inverter_brands?: string[];
  warranty_years?: number;
  service_area: string[];
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  credits?: number;
  verified?: boolean;
  created_at?: string;
  status?: string;
}

export interface InstallerFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  siret: string;
  company_name: string;
  contact_name: string;
  address: string;
  postal_code: string;
  city: string;
  website: string;
  description: string;
  experience_years: number;
  panel_brands: string[];
  inverter_brands: string[];
  warranty_years: number;
  service_area: string[];
  certifications: Certifications;
  installation_types: InstallationTypes;
  maintenance_services: boolean;
  visibility_settings: VisibilitySettings;
  experience: string;
  panelBrands: string;
  inverterBrands: string;
  guaranteeYears: string;
}

export const defaultFormData: InstallerFormData = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  siret: "",
  company_name: "",
  contact_name: "",
  address: "",
  postal_code: "",
  city: "",
  website: "",
  description: "",
  experience_years: 0,
  panel_brands: [],
  inverter_brands: [],
  warranty_years: 0,
  service_area: [],
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false
  },
  installation_types: {
    residential: false,
    commercial: false,
    industrial: false
  },
  maintenance_services: false,
  visibility_settings: {
    showPhoneNumber: true,
    highlightProfile: false,
    showCertifications: true,
    acceptDirectMessages: true
  },
  experience: "",
  panelBrands: "",
  inverterBrands: "",
  guaranteeYears: ""
};

export function transformDatabaseToForm(data: DatabaseInstallerData): InstallerFormData {
  const [firstName = "", lastName = ""] = data.contact_name.split(" ");
  
  return {
    firstName,
    lastName,
    company: data.company_name,
    email: data.email,
    phone: data.phone,
    siret: data.siret,
    company_name: data.company_name,
    contact_name: data.contact_name,
    address: data.address,
    postal_code: data.postal_code,
    city: data.city || "",
    website: data.website || "",
    description: data.description || "",
    experience_years: data.experience_years || 0,
    panel_brands: data.panel_brands || [],
    inverter_brands: data.inverter_brands || [],
    warranty_years: data.warranty_years || 0,
    service_area: data.service_area,
    certifications: data.certifications,
    installation_types: data.installation_types,
    maintenance_services: data.maintenance_services,
    visibility_settings: data.visibility_settings,
    experience: String(data.experience_years || ""),
    panelBrands: (data.panel_brands || []).join(", "),
    inverterBrands: (data.inverter_brands || []).join(", "),
    guaranteeYears: String(data.warranty_years || "")
  };
}

export function transformFormToDatabase(formData: InstallerFormData): DatabaseInstallerData {
  return {
    user_id: "", // This should be set by the caller
    company_name: formData.company_name,
    contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    phone: formData.phone,
    siret: formData.siret,
    address: formData.address,
    postal_code: formData.postal_code,
    city: formData.city,
    website: formData.website,
    description: formData.description,
    experience_years: Number(formData.experience) || formData.experience_years,
    panel_brands: formData.panelBrands.split(",").map(s => s.trim()),
    inverter_brands: formData.inverterBrands.split(",").map(s => s.trim()),
    warranty_years: Number(formData.guaranteeYears) || formData.warranty_years,
    service_area: formData.service_area,
    certifications: formData.certifications,
    installation_types: formData.installation_types,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings
  };
}

export function validateInstallerData(data: Partial<DatabaseInstallerData>): string[] {
  const errors: string[] = [];

  if (!data.company_name) errors.push("Le nom de l'entreprise est requis");
  if (!data.contact_name) errors.push("Le nom du contact est requis");
  if (!data.phone) errors.push("Le numéro de téléphone est requis");
  if (!data.siret) errors.push("Le numéro SIRET est requis");
  if (!data.email) errors.push("L'email est requis");
  if (!data.address) errors.push("L'adresse est requise");
  if (!data.postal_code) errors.push("Le code postal est requis");
  if (!data.city) errors.push("La ville est requise");

  return errors;
}