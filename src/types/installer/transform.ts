import type { DatabaseInstallerData } from './database';
import type { InstallerFormData } from './form';
import type { DatabaseJson, InstallationTypes, Certifications, VisibilitySettings } from './base';

export function transformDatabaseToForm(data: DatabaseInstallerData): InstallerFormData {
  const [firstName = "", lastName = ""] = (data.contact_name || "").split(" ");
  
  const certifications: Certifications = {
    qualiPV: false,
    rge: false,
    qualibat: false,
    ...(data.certifications as Record<string, boolean>)
  };

  const installationTypes: InstallationTypes = {
    residential: false,
    commercial: false,
    industrial: false,
    ...(data.installation_types as Record<string, boolean>)
  };

  const visibilitySettings: VisibilitySettings = {
    showPhoneNumber: true,
    highlightProfile: false,
    showCertifications: true,
    acceptDirectMessages: true,
    ...(data.visibility_settings as Record<string, boolean>)
  };

  return {
    firstName,
    lastName,
    company: data.company_name,
    email: data.email || "",
    phone: data.phone,
    siret: data.siret || "",
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
    certifications,
    installation_types: installationTypes,
    maintenance_services: data.maintenance_services || false,
    visibility_settings: visibilitySettings,
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
    certifications: formData.certifications as unknown as DatabaseJson,
    installation_types: formData.installation_types as unknown as DatabaseJson,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings as unknown as DatabaseJson,
    service_area: formData.service_area,
    credits: 0,
    verified: false
  };
}