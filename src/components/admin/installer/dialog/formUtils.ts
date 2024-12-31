import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Installer, InstallerStatus } from "@/types/crm"
import { defaultCertifications } from "./defaultValues"

export const fetchInstallerData = async (installerId: string) => {
  const { data, error } = await supabase
    .from('installers')
    .select('*')
    .eq('id', installerId)
    .single()

  if (error) {
    console.error('Error fetching installer data:', error)
    toast.error("Erreur lors du chargement des données")
    throw error
  }

  return data
}

export const processInstallerData = (data: any, installer: Installer) => {
  const nationwide = data.service_area?.includes("Toute France")
  
  let certifications = defaultCertifications
  
  if (data.certifications) {
    const certData = data.certifications as Record<string, boolean>
    if (typeof certData === 'object' && !Array.isArray(certData)) {
      certifications = {
        qualiPV: true,
        rge: true,
        qualibat: true
      }
    }
  }

  return {
    nationwide,
    formData: {
      ...installer,
      zones: data.service_area || [],
      certifications,
      status: "active" as InstallerStatus,
      companyName: data.company_name || "",
      contactName: data.contact_name || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      siret: data.siret || "",
      siren: data.siren || "",
      commission: data.commission || 0,
      leadsAssigned: data.leads_assigned || 0,
      conversionRate: data.conversion_rate || 0,
      paymentType: data.payment_type || "prepaid",
      yearFounded: data.year_founded || new Date().getFullYear().toString()
    }
  }
}