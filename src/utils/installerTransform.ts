import { DatabaseInstallerData } from "@/types/installer/database";
import { Installer, InstallerStatus } from "@/types/crm";
import { InstallerFormData } from "@/types/installer";

export const transformDatabaseToInstaller = (data: DatabaseInstallerData): Installer => {
  return {
    id: data.id,
    companyName: data.company_name,
    contactName: data.contact_name,
    email: data.email || "",
    phone: data.phone,
    address: data.address,
    zones: data.service_area,
    status: (data.status || "pending") as InstallerStatus,
    siret: data.siret || "",
    siren: data.siret?.slice(0, 9) || "",
    certifications: {
      qualiPV: typeof data.certifications === 'object' && data.certifications !== null ? (data.certifications as any).qualiPV || false : false,
      rge: typeof data.certifications === 'object' && data.certifications !== null ? (data.certifications as any).rge || false : false,
      qualibat: typeof data.certifications === 'object' && data.certifications !== null ? (data.certifications as any).qualibat || false : false
    },
    commission: 0,
    leadsAssigned: 0,
    conversionRate: data.conversion_rate ? Number(data.conversion_rate) : 0,
    paymentType: "prepaid",
    yearFounded: data.created_at ? new Date(data.created_at).getFullYear().toString() : new Date().getFullYear().toString()
  };
};

export const transformInstallerToDatabase = (data: Installer): Omit<DatabaseInstallerData, 'id' | 'user_id' | 'created_at'> => {
  return {
    company_name: data.companyName,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    service_area: data.zones,
    postal_code: data.address.split(' ').pop() || '',
    certifications: {
      qualiPV: data.certifications.qualiPV,
      rge: data.certifications.rge,
      qualibat: data.certifications.qualibat
    },
    credits: 0,
    verified: false,
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
    status: data.status,
    siret: data.siret,
    city: null,
    website: null,
    description: null,
    experience_years: null,
    panel_brands: null,
    inverter_brands: null,
    warranty_years: null,
    subscription_plan: null,
    profile_views: null,
    conversion_rate: data.conversionRate,
    satisfied_clients: null,
    subscription_status: null,
    subscription_end_date: null
  };
};

export const transformFormToDatabase = (formData: InstallerFormData, userId: string): Omit<DatabaseInstallerData, 'id' | 'created_at'> => {
  return {
    user_id: userId,
    company_name: formData.company_name,
    contact_name: formData.contact_name,
    email: formData.email,
    phone: formData.phone,
    siret: formData.siret || "",
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
    credits: 0,
    verified: false,
    subscription_plan: null,
    profile_views: null,
    conversion_rate: 0,
    satisfied_clients: null,
    status: 'pending',
    subscription_status: null,
    subscription_end_date: null
  };
};