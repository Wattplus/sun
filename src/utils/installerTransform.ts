import type { DatabaseInstallerData, InstallerFormData, InstallationTypes, Certifications, VisibilitySettings } from "@/types/installer";

function normalizeInstallationTypes(data: any): InstallationTypes {
  return {
    residential: Boolean(data?.residential),
    commercial: Boolean(data?.commercial),
    industrial: Boolean(data?.industrial),
  };
}

function normalizeCertifications(data: any): Certifications {
  return {
    qualiPV: Boolean(data?.qualiPV),
    rge: Boolean(data?.rge),
    qualibat: Boolean(data?.qualibat),
    ...Object.entries(data || {}).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: Boolean(value)
    }), {})
  };
}

function normalizeVisibilitySettings(data: any): VisibilitySettings {
  return {
    showPhoneNumber: data?.showPhoneNumber ?? true,
    highlightProfile: data?.highlightProfile ?? false,
    showCertifications: data?.showCertifications ?? true,
    acceptDirectMessages: data?.acceptDirectMessages ?? true,
  };
}

export function transformDatabaseToForm(data: DatabaseInstallerData): InstallerFormData {
  return {
    company_name: data.company_name,
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone,
    siret: data.siret,
    address: data.address,
    postal_code: data.postal_code,
    city: data.city || "",
    website: data.website || "",
    description: data.description || "",
    experience_years: data.experience_years || 0,
    panel_brands: data.panel_brands || [],
    inverter_brands: data.inverter_brands || [],
    warranty_years: data.warranty_years || 0,
    certifications: normalizeCertifications(data.certifications),
    installation_types: normalizeInstallationTypes(data.installation_types),
    maintenance_services: data.maintenance_services,
    visibility_settings: normalizeVisibilitySettings(data.visibility_settings),
    service_area: data.service_area
  };
}

export function transformFormToDatabase(formData: InstallerFormData, userId: string): Omit<DatabaseInstallerData, "id" | "created_at"> {
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
    certifications: formData.certifications,
    installation_types: formData.installation_types,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings,
    service_area: formData.service_area,
    verified: false,
    credits: 0
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