import { useState } from "react"
import { Installer } from "@/types/crm"
import { supabase } from "@/integrations/supabase/client"
import { transformInstallerToDatabase } from "@/utils/installerTransform"
import { toast } from "sonner"

export const useInstallerSubmit = (onSave: (installer: Installer) => void, onOpenChange: (open: boolean) => void) => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent, formData: Installer, setSiretError: (error: string) => void) => {
    e.preventDefault()
    setIsSaving(true)
    setSiretError("")

    try {
      const dbData = transformInstallerToDatabase(formData)
      
      const { error } = await supabase
        .from('installers')
        .upsert({ 
          ...dbData,
          user_id: formData.id,
          verified: true,
          status: "active"
        })

      if (error) {
        console.error('Database error:', error)
        if (error.message?.includes("installers_siret_unique")) {
          setSiretError("Ce numéro SIRET est déjà utilisé par un autre installateur")
          return
        }
        throw error
      }

      toast.success("Modifications enregistrées avec succès")
      onSave(formData)
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error saving installer:', error)
      toast.error("Erreur lors de l'enregistrement des modifications")
    } finally {
      setIsSaving(false)
    }
  }

  return {
    isSaving,
    handleSubmit
  }
}