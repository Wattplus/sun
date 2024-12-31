import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData } from "@/types/installer"
import { convertFormToDbFormat } from "@/types/installer"

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
      if (category === "certifications" || category === "installationTypes" || category === "visibility_settings") {
        setFormData({
          ...formData,
          [category]: {
            ...(formData[category as keyof InstallerFormData] as Record<string, boolean>),
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