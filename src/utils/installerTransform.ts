import type { DatabaseInstallerData } from '@/types/installer/database';
import type { InstallerFormData } from '@/types/installer/form';
import type { Json, InstallationTypes, Certifications, VisibilitySettings } from '@/types/installer/base';

function normalizeInstallationTypes(data: Json): InstallationTypes {
  const defaultTypes = {
    residential: false,
    commercial: false,
    industrial: false
  };
  
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return { ...defaultTypes, ...data };
  }
  
  return defaultTypes;
}

function normalizeCertifications(data: Json): Certifications {
  const defaultCerts = {
    qualiPV: false,
    rge: false,
    qualibat: false
  };
  
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return { ...defaultCerts, ...data };
  }
  
  return defaultCerts;
}

function normalizeVisibilitySettings(data: Json): VisibilitySettings {
  const defaultSettings = {
    showPhoneNumber: true,
    highlightProfile: false,
    showCertifications: true,
    acceptDirectMessages: true
  };
  
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return { ...defaultSettings, ...data };
  }
  
  return defaultSettings;
}

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
    certifications: normalizeCertifications(data.certifications),
    installation_types: normalizeInstallationTypes(data.installation_types),
    maintenance_services: data.maintenance_services,
    visibility_settings: normalizeVisibilitySettings(data.visibility_settings),
    experience: String(data.experience_years || ""),
    panelBrands: (data.panel_brands || []).join(", "),
    inverterBrands: (data.inverter_brands || []).join(", "),
    guaranteeYears: String(data.warranty_years || "")
  };
}

export function transformFormToDatabase(formData: InstallerFormData, userId: string): Omit<DatabaseInstallerData, 'id'> {
  return {
    user_id: userId,
    company_name: formData.company_name,
    contact_name: formData.contact_name,
    email: formData.email,
    phone: formData.phone,
    siret: formData.siret,
    address: formData.address,
    postal_code: formData.postal_code,
    city: formData.city,
    website: formData.website,
    description: formData.description,
    experience_years: formData.experience_years,
    panel_brands: formData.panel_brands,
    inverter_brands: formData.inverter_brands,
    warranty_years: formData.warranty_years,
    certifications: formData.certifications as unknown as Json,
    installation_types: formData.installation_types as unknown as Json,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings as unknown as Json,
    service_area: formData.service_area,
    credits: 0,
    verified: false
  };
}