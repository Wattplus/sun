import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { InstallerFormData, VisibilitySettings } from "@/types/installer"
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
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof typeof prev] as Record<string, boolean>),
          [item]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: checked
      }))
    }
  }

  const handleToggleChange = (field: keyof VisibilitySettings) => {
    setVisibilitySettings(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleZonesChange = (zones: string[]) => {
    setFormData(prev => ({
      ...prev,
      service_area: zones
    }))
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