import { Lead } from "@/types/crm";

export const mockAvailableLeads: Lead[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    clienttype: "particulier",
    firstname: "Jean",
    lastname: "Dupont",
    email: "jean.dupont@example.com",
    phone: "0612345678",
    monthlybill: "120",
    postalcode: "75001",
    status: "new",
    projectType: "residential",
    roofType: "tuiles",
    price: 26
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    clienttype: "professionnel",
    firstname: "Marie",
    lastname: "Martin",
    email: "marie.martin@enterprise.com",
    phone: "0687654321",
    monthlybill: "450",
    postalcode: "69001",
    status: "new",
    projectType: "professional",
    roofType: "toit plat",
    price: 49
  }
];