import { DatabaseInstallerData } from "@/types/installer/database";
import { Installer } from "@/types/crm";

export const transformDatabaseToInstaller = (data: DatabaseInstallerData): Installer => {
  return {
    id: data.id,
    companyName: data.company_name,
    contactName: data.contact_name,
    email: data.email || "",
    phone: data.phone,
    address: data.address,
    zones: data.service_area,
    status: data.status || "pending",
    siret: data.siret || "",
    siren: data.siret?.slice(0, 9) || "",
    certifications: {
      qualiPV: data.certifications?.qualiPV || false,
      rge: data.certifications?.rge || false,
      qualibat: data.certifications?.qualibat || false
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
    status: data.status
  };
};