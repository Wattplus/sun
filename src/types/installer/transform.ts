import type { DatabaseInstallerData } from './database';
import type { InstallerFormData } from './form';

export function convertDbToFormFormat(data: DatabaseInstallerData): InstallerFormData {
  const [firstName = "", lastName = ""] = (data.contact_name || "").split(" ");
  
  return {
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    company_name: data.company_name,
    contact_name: data.contact_name,
    siret: data.siret,
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
    address: data.address,
    postal_code: data.postal_code,
    city: data.city || "",
    // Legacy form fields
    company: data.company_name,
    experience: String(data.experience_years || ""),
    panelBrands: (data.panel_brands || []).join(", "),
    inverterBrands: (data.inverter_brands || []).join(", "),
    guaranteeYears: String(data.warranty_years || "")
  };
}

export function convertFormToDbFormat(formData: InstallerFormData, userId: string): DatabaseInstallerData {
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
    service_area: formData.service_area,
    certifications: formData.certifications,
    installation_types: formData.installation_types,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings,
    verified: false,
    credits: 0
  };
}