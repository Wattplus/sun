import { DatabaseInstallerData } from "@/types/installer";

export const mockInstallers: DatabaseInstallerData[] = [
  {
    id: "1",
    user_id: "user1",
    company_name: "Solar Pro SARL",
    contact_name: "Jean Dupont",
    email: "jean@solarpro.fr",
    phone: "0123456789",
    address: "123 rue du Soleil",
    postal_code: "75001",
    city: "Paris",
    siret: "12345678901234",
    service_area: ["75", "77", "78"],
    credits: 100,
    verified: true,
    website: "www.solarpro.fr",
    description: "Installation de panneaux solaires",
    experience_years: 10,
    panel_brands: ["SunPower", "LG"],
    inverter_brands: ["SMA", "Enphase"],
    warranty_years: 25,
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
    }
  }
];