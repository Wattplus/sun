import type { DatabaseInstallerData } from "@/types/installer";

export const mockInstallers: DatabaseInstallerData[] = [
  {
    id: "1",
    user_id: "user1",
    company_name: "SolarTech Pro",
    contact_name: "Jean Dupont",
    email: "contact@solartech.fr",
    phone: "0123456789",
    siret: "12345678901234",
    address: "123 rue du Soleil",
    postal_code: "75001",
    city: "Paris",
    website: "www.solartech.fr",
    description: "Installation de panneaux solaires depuis 2010",
    experience_years: 12,
    panel_brands: ["SunPower", "LG"],
    inverter_brands: ["SMA", "Enphase"],
    warranty_years: 25,
    service_area: ["75", "77", "78"],
    certifications: {
      qualiPV: true,
      rge: true,
      qualibat: false
    },
    installation_types: {
      residential: true,
      commercial: true,
      industrial: false
    },
    maintenance_services: true,
    visibility_settings: {
      showPhoneNumber: true,
      highlightProfile: false,
      showCertifications: true,
      acceptDirectMessages: true
    },
    credits: 100,
    verified: true,
    created_at: new Date().toISOString()
  }
];