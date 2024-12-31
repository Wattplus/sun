import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { InstallerFormData, VisibilitySettings, DatabaseInstallerData } from "@/types/installer"
import { convertFormToDbFormat } from "@/types/installer"

export const useProfileFormHandlers = (
  formData: InstallerFormData,
  setFormData: (data: InstallerFormData) => void,
  visibilitySettings: VisibilitySettings,
  setVisibilitySettings: (settings: VisibilitySettings) => void
) => {
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

  const handleToggleChange = (field: keyof VisibilitySettings) => {
    setVisibilitySettings({
      ...visibilitySettings,
      [field]: !visibilitySettings[field],
    })
  }

  const handleZonesChange = (zones: string[]) => {
    setFormData({
      ...formData,
      service_area: zones
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const installerData = convertFormToDbFormat(formData, user.id)

      const { error } = await supabase
        .from("installers")
        .upsert(installerData)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour avec succès",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil",
        variant: "destructive"
      })
    }
  }

  return {
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange,
    handleSubmit
  }
}