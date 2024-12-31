import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData } from "@/types/installer"
import type { Json } from "@/integrations/supabase/types"

export const useInstallerForm = (
  formData: InstallerFormData,
  setFormData: (data: InstallerFormData) => void
) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes(".")) {
      const [category, item] = field.split(".")
      setFormData({
        ...formData,
        [category]: {
          ...(formData[category as keyof typeof formData] as Record<string, boolean>),
          [item]: checked
        }
      })
    } else {
      setFormData({
        ...formData,
        [field]: checked
      })
    }
  }

  const handleZonesChange = (zones: string[]) => {
    setFormData({
      ...formData,
      service_area: zones
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const installerData = {
        user_id: user.id,
        company_name: formData.company,
        contact_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        address: formData.address,
        postal_code: formData.postal_code,
        city: formData.city,
        website: formData.website,
        description: formData.description,
        experience_years: parseInt(formData.experience) || null,
        panel_brands: formData.panelBrands.split(",").map(brand => brand.trim()),
        inverter_brands: formData.inverterBrands.split(",").map(brand => brand.trim()),
        warranty_years: parseInt(formData.guaranteeYears) || null,
        service_area: formData.service_area,
        certifications: formData.certifications as unknown as Json,
        installation_types: formData.installationTypes as unknown as Json,
        maintenance_services: formData.maintenanceServices,
        visibility_settings: formData.visibility_settings as unknown as Json
      }

      const { error } = await supabase
        .from("installers")
        .upsert(installerData)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour avec succès",
      })
    } catch (error) {
      console.error("Error updating installer:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    handleChange,
    handleCheckboxChange,
    handleZonesChange,
    handleSubmit,
    loading
  }
}