import { useState, useEffect } from "react"
import { Installer, InstallerStatus } from "@/types/crm"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Json } from "@/lib/database.types"

interface DatabaseCertifications {
  qualiPV: boolean;
  rge: boolean;
  qualibat: boolean;
}

interface InstallerData {
  certifications: DatabaseCertifications;
  service_area?: string[];
  [key: string]: any;
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
      qualiPV: true, // Pré-coché par défaut
      rge: true,     // Pré-coché par défaut
      qualibat: true // Pré-coché par défaut
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
            
            const defaultCertifications: DatabaseCertifications = {
              qualiPV: true,  // Pré-coché même si pas de données
              rge: true,      // Pré-coché même si pas de données
              qualibat: true  // Pré-coché même si pas de données
            }
            
            let certifications = defaultCertifications
            
            if (data.certifications) {
              // First cast to unknown, then to the expected type
              const certData = data.certifications as unknown as Record<string, boolean>
              if (typeof certData === 'object' && !Array.isArray(certData)) {
                certifications = {
                  qualiPV: Boolean(certData.qualiPV),
                  rge: Boolean(certData.rge),
                  qualibat: Boolean(certData.qualibat)
                }
              }
            }
            
            setFormData({
              ...installer,
              zones: data.service_area || [],
              certifications,
              status: "active" // Force le statut à "active"
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