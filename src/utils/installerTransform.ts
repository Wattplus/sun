import { DatabaseInstallerData } from "@/types/installer/database";
import { Installer, InstallerStatus } from "@/types/crm";

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
    yearFounded: new Date().getFullYear()
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
    rating: 0,
    total_reviews: 0,
    last_active: new Date().toISOString(),
    subscription_end_date: null
  };
};