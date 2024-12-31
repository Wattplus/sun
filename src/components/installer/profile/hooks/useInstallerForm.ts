import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData } from "@/types/installer"

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
      const currentValue = formData[category as keyof InstallerFormData]
      if (typeof currentValue === 'object' && !Array.isArray(currentValue)) {
        setFormData({
          ...formData,
          [category]: {
            ...currentValue,
            [item]: checked
          }
        })
      }
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
        company_name: formData.company_name,
        contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        siret: formData.siret,
        address: formData.address,
        postal_code: formData.postal_code,
        city: formData.city,
        website: formData.website,
        description: formData.description,
        service_area: formData.service_area,
        experience_years: Number(formData.experience) || formData.experience_years,
        panel_brands: formData.panelBrands.split(",").map(s => s.trim()),
        inverter_brands: formData.inverterBrands.split(",").map(s => s.trim()),
        warranty_years: Number(formData.guaranteeYears) || formData.warranty_years,
        certifications: formData.certifications,
        installation_types: formData.installation_types,
        maintenance_services: formData.maintenance_services,
        visibility_settings: formData.visibility_settings
      }

      const { error } = await supabase
        .from("installers")
        .upsert({
          ...installerData,
          user_id: user.id
        })

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