import { DatabaseInstallerData } from "@/types/installer";

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
    service_area: ["75", "77", "78"],
    credits: 100,
    verified: true,
    website: "www.solartech.fr",
    description: "Installation de panneaux solaires",
    experience_years: 10,
    panel_brands: ["SunPower", "LG"],
    inverter_brands: ["SMA", "Enphase"],
    warranty_years: 20,
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
      highlightProfile: true,
      showCertifications: true,
      acceptDirectMessages: true
    },
    status: "active",
    created_at: new Date().toISOString(),
    rating: 4.5,
    total_reviews: 12,
    conversion_rate: 75,
    satisfied_clients: 45,
    subscription_plan: "premium",
    profile_views: 150,
    last_active: new Date().toISOString(),
    subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];