import type { DatabaseInstallerData, InstallerFormData } from '@/types/installer';

export function convertDbToFormFormat(data: DatabaseInstallerData): InstallerFormData {
  const [firstName = "", lastName = ""] = (data.contact_name || "").split(" ");
  
  return {
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    company: data.company_name,
    siret: data.siret,
    website: data.website || "",
    description: data.description || "",
    experience: String(data.experience_years || ""),
    panelBrands: (data.panel_brands || []).join(", "),
    inverterBrands: (data.inverter_brands || []).join(", "),
    guaranteeYears: String(data.warranty_years || ""),
    service_area: data.service_area,
    certifications: data.certifications,
    installation_types: data.installation_types,
    maintenance_services: data.maintenance_services,
    visibility_settings: data.visibility_settings,
    address: data.address,
    postal_code: data.postal_code,
    city: data.city || ""
  };
}

export function convertFormToDbFormat(formData: InstallerFormData, userId: string): DatabaseInstallerData {
  return {
    user_id: userId,
    company_name: formData.company,
    contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    phone: formData.phone,
    siret: formData.siret,
    address: formData.address,
    postal_code: formData.postal_code,
    city: formData.city,
    website: formData.website,
    description: formData.description,
    experience_years: parseInt(formData.experience) || 0,
    panel_brands: formData.panelBrands.split(",").map(s => s.trim()),
    inverter_brands: formData.inverterBrands.split(",").map(s => s.trim()),
    warranty_years: parseInt(formData.guaranteeYears) || 0,
    service_area: formData.service_area,
    certifications: formData.certifications,
    installation_types: formData.installation_types,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings,
    verified: false,
    credits: 0
  };
}