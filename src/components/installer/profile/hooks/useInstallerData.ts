import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData, DatabaseInstallerData } from "@/types/installer"
import { convertDbToFormFormat } from "@/types/installer"

const defaultFormData: InstallerFormData = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  siret: "",
  address: "",
  postal_code: "",
  city: "",
  website: "",
  description: "",
  service_area: [],
  experience_years: 0,
  panel_brands: [],
  inverter_brands: [],
  warranty_years: 0,
  certifications: {
    qualiPV: false,
    rge: false,
    qualibat: false
  },
  installation_types: {
    residential: false,
    commercial: false,
    industrial: false
  },
  maintenance_services: false,
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
  const { toast } = useToast()

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession()
        if (!session?.session?.user) {
          throw new Error('No authenticated user')
        }

        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', session.session.user.id)
          .single()

        if (error) throw error

        if (data) {
          setFormData(convertDbToFormFormat(data as DatabaseInstallerData))
        }
      } catch (error) {
        console.error('Error fetching installer:', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger vos informations',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    loadInstallerData()
  }, [toast])

  return { formData, setFormData, loading }
}