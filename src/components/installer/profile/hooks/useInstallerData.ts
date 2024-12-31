import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData } from "@/types/installer"

const defaultFormData: InstallerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  siret: "",
  website: "",
  description: "",
  experience: "",
  panelBrands: "",
  inverterBrands: "",
  guaranteeYears: "",
  service_area: [],
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false
  },
  installationTypes: {
    residential: false,
    commercial: false,
    industrial: false
  },
  maintenanceServices: false,
  address: "",
  postal_code: "",
  city: "",
  visibility_settings: {
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true
  }
}

export const useInstallerData = () => {
  const [formData, setFormData] = useState<InstallerFormData>(defaultFormData)
  const [loading, setLoading] = useState(true)
  const [noProfile, setNoProfile] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setLoading(false)
          return
        }

        const { data: installer, error } = await supabase
          .from("installers")
          .select()
          .eq("user_id", user.id)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!installer) {
          setNoProfile(true)
          setLoading(false)
          return
        }

        const [firstName, lastName] = (installer.contact_name || "").split(" ")
        
        setFormData({
          firstName: firstName || "",
          lastName: lastName || "",
          email: user.email || "",
          phone: installer.phone || "",
          company: installer.company_name || "",
          siret: installer.siret || "",
          website: installer.website || "",
          description: installer.description || "",
          experience: installer.experience_years?.toString() || "",
          panelBrands: Array.isArray(installer.panel_brands) ? installer.panel_brands.join(", ") : "",
          inverterBrands: Array.isArray(installer.inverter_brands) ? installer.inverter_brands.join(", ") : "",
          guaranteeYears: installer.warranty_years?.toString() || "",
          service_area: installer.service_area || [],
          certifications: installer.certifications as unknown as InstallerFormData["certifications"],
          installationTypes: installer.installation_types as unknown as InstallerFormData["installationTypes"],
          maintenanceServices: installer.maintenance_services || false,
          address: installer.address || "",
          postal_code: installer.postal_code || "",
          city: installer.city || "",
          visibility_settings: installer.visibility_settings as unknown as InstallerFormData["visibility_settings"],
        })
      } catch (error) {
        console.error("Error loading installer data:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'installateur",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadInstallerData()
  }, [toast])

  return { formData, setFormData, loading, noProfile }
}