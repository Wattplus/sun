import { DatabaseInstallerData } from "@/types/installer/database";
import { Installer } from "@/types/crm";
import { Json } from "@/lib/database.types";

export const transformDatabaseToInstaller = (data: DatabaseInstallerData): Installer => {
  return {
    id: data.id,
    companyName: data.company_name,
    contactName: data.contact_name,
    email: data.email || "",
    phone: data.phone,
    address: data.address,
    zones: data.service_area,
    status: data.subscription_status || "pending",
    siret: data.siret || "",
    siren: data.siret?.slice(0, 9) || "",
    certifications: {
      qualiPV: typeof data.certifications === 'object' && data.certifications !== null ? (data.certifications as any).qualiPV || false : false,
      rge: typeof data.certifications === 'object' && data.certifications !== null ? (data.certifications as any).rge || false : false,
      qualibat: typeof data.certifications === 'object' && data.certifications !== null ? (data.certifications as any).qualibat || false : false
    },
    commission: 0,
    leadsAssigned: 0,
    conversionRate: 0,
    paymentType: "prepaid",
    yearFounded: new Date().getFullYear()
  };
};

export const transformInstallerToDatabase = (data: Installer): Omit<DatabaseInstallerData, 'id' | 'created_at' | 'user_id'> => {
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
    subscription_status: data.status,
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
    conversion_rate: null,
    satisfied_clients: null,
    rating: 0,
    total_reviews: 0,
    last_active: null,
    subscription_end_date: null
  };
};

export const transformDatabaseToForm = (data: DatabaseInstallerData) => {
  return {
    firstName: "",
    lastName: "",
    email: data.email || "",
    phone: data.phone,
    company_name: data.company_name,
    contact_name: data.contact_name,
    siret: data.siret || "",
    website: data.website || "",
    description: data.description || "",
    experience_years: data.experience_years || 0,
    panel_brands: data.panel_brands || [],
    inverter_brands: data.inverter_brands || [],
    warranty_years: data.warranty_years || 0,
    service_area: data.service_area,
    certifications: data.certifications as any || {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    installation_types: data.installation_types as any || {
      residential: false,
      commercial: false,
      industrial: false
    },
    maintenance_services: data.maintenance_services || false,
    visibility_settings: data.visibility_settings as any || {
      showPhoneNumber: true,
      highlightProfile: false,
      showCertifications: true,
      acceptDirectMessages: true
    },
    address: data.address,
    postal_code: data.postal_code,
    city: data.city || "",
    company: data.company_name,
    experience: data.experience_years?.toString() || "",
    panelBrands: data.panel_brands?.join(", ") || "",
    inverterBrands: data.inverter_brands?.join(", ") || "",
    guaranteeYears: data.warranty_years?.toString() || ""
  };
};

export const transformFormToDatabase = (formData: any, userId: string): Omit<DatabaseInstallerData, 'id' | 'created_at'> => {
  return {
    user_id: userId,
    company_name: formData.company_name,
    contact_name: formData.contact_name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    postal_code: formData.postal_code,
    city: formData.city,
    service_area: formData.service_area,
    credits: 0,
    verified: false,
    website: formData.website,
    description: formData.description,
    experience_years: parseInt(formData.experience_years) || 0,
    panel_brands: formData.panel_brands,
    inverter_brands: formData.inverter_brands,
    warranty_years: parseInt(formData.warranty_years) || 0,
    certifications: formData.certifications,
    installation_types: formData.installation_types,
    maintenance_services: formData.maintenance_services,
    visibility_settings: formData.visibility_settings,
    subscription_status: 'pending',
    siret: formData.siret,
    subscription_plan: 'free',
    profile_views: 0,
    conversion_rate: 0,
    satisfied_clients: 0,
    rating: 0,
    total_reviews: 0,
    last_active: new Date().toISOString(),
    subscription_end_date: null
  };
};