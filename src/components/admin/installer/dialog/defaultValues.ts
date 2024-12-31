import { Installer } from "@/types/crm"

export const defaultCertifications = {
  qualiPV: true,
  rge: true,
  qualibat: true
}

export const defaultFormData: Installer = {
  id: crypto.randomUUID(),
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  zones: [],
  status: "active",
  commission: 0,
  leadsAssigned: 0,
  conversionRate: 0,
  paymentType: "prepaid",
  certifications: defaultCertifications,
  yearFounded: new Date().getFullYear().toString(),
  siret: "",
  siren: ""
}