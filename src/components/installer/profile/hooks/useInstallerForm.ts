import { supabase } from "@/lib/supabase-client"
import { toast } from "sonner"
import { InstallerFormData } from "@/types/installer"

export const useInstallerForm = (
  formData: InstallerFormData | null,
  setFormData: (data: InstallerFormData) => void
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (!formData) return
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
    if (!formData) return
    setFormData({
      ...formData,
      service_area: zones
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone
        })

      if (profileError) throw profileError

      // Update installers table
      const { error: installerError } = await supabase
        .from('installers')
        .upsert({
          user_id: user.id,
          company_name: formData.company_name,
          contact_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          siret: formData.siret,
          address: formData.address,
          postal_code: formData.postal_code,
          city: formData.city,
          website: formData.website,
          description: formData.description,
          experience_years: formData.experience_years,
          panel_brands: formData.panel_brands,
          inverter_brands: formData.inverter_brands,
          warranty_years: formData.warranty_years,
          service_area: formData.service_area,
          certifications: formData.certifications,
          installation_types: formData.installation_types,
          maintenance_services: formData.maintenance_services,
          visibility_settings: formData.visibility_settings
        })

      if (installerError) throw installerError

      toast.success("Votre profil a été mis à jour avec succès")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Une erreur est survenue lors de la mise à jour du profil")
    }
  }

  return {
    handleChange,
    handleCheckboxChange,
    handleZonesChange,
    handleSubmit
  }
}