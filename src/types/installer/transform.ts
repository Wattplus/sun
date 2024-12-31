import type { InstallerFormData, DatabaseInstallerData } from "./index"

export const convertFormToDbFormat = (formData: InstallerFormData, userId: string): Omit<DatabaseInstallerData, 'id' | 'created_at' | 'credits' | 'verified'> => {
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
    service_area: formData.service_area,
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
    status: 'pending'
  }
}