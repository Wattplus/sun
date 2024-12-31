import { useState, useEffect } from "react"
import { Installer, InstallerStatus } from "@/types/crm"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface DatabaseCertifications {
  qualiPV: boolean;
  rge: boolean;
  qualibat: boolean;
}

export const useInstallerForm = (installer: Installer | null) => {
  const [formData, setFormData] = useState<Installer>(installer || {
    id: crypto.randomUUID(),
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    zones: [],
    status: "active" as InstallerStatus,
    commission: 0,
    leadsAssigned: 0,
    conversionRate: 0,
    paymentType: "prepaid",
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    yearFounded: new Date().getFullYear().toString(),
    siret: "",
    siren: ""
  })
  const [isNationwide, setIsNationwide] = useState(false)
  const [siretError, setSiretError] = useState("")

  useEffect(() => {
    const fetchInstallerData = async () => {
      if (installer?.id) {
        try {
          const { data, error } = await supabase
            .from('installers')
            .select('*')
            .eq('id', installer.id)
            .single()

          if (error) throw error

          if (data) {
            const nationwide = data.service_area?.includes("Toute France")
            setIsNationwide(nationwide)
            
            // Safely cast certifications with type checking
            let certifications: DatabaseCertifications = {
              qualiPV: false,
              rge: false,
              qualibat: false
            }
            
            if (data.certifications && typeof data.certifications === 'object' && !Array.isArray(data.certifications)) {
              const cert = data.certifications as Record<string, unknown>
              certifications = {
                qualiPV: Boolean(cert.qualiPV),
                rge: Boolean(cert.rge),
                qualibat: Boolean(cert.qualibat)
              }
            }
            
            setFormData({
              ...installer,
              zones: data.service_area || [],
              certifications
            })
          }
        } catch (error) {
          console.error('Error fetching installer data:', error)
          toast.error("Erreur lors du chargement des données")
        }
      }
      setSiretError("")
    }

    fetchInstallerData()
  }, [installer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiretError("")
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleZonesChange = (value: string) => {
    if (!isNationwide) {
      const zones = value.split(",").map((zone) => zone.trim()).filter(Boolean)
      setFormData({ ...formData, zones })
    }
  }

  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked)
    if (checked) {
      setFormData({ ...formData, zones: ["Toute France"] })
    } else {
      setFormData({ ...formData, zones: [] })
    }
  }

  const handleCertificationChange = (certification: keyof Installer['certifications'], checked: boolean) => {
    setFormData({
      ...formData,
      certifications: {
        ...formData.certifications,
        [certification]: checked
      }
    })
  }

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as InstallerStatus })
  }

  return {
    formData,
    setFormData,
    isNationwide,
    siretError,
    setSiretError,
    handleChange,
    handleZonesChange,
    handleNationwideChange,
    handleCertificationChange,
    handleStatusChange
  }
}