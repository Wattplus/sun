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
          verified: true, // Always set verified to true when admin creates/updates
          status: 'active' // Set status to active
        })

      if (error) throw error

      toast.success(formData.id ? "Installateur modifié avec succès" : "Nouvel installateur créé avec succès")
      onSave(formData)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving installer:', error)
      if (error instanceof Error) {
        if (error.message.includes('siret')) {
          setSiretError("Ce numéro SIRET est invalide ou déjà utilisé")
        } else {
          toast.error("Erreur lors de l'enregistrement de l'installateur")
        }
      }
    } finally {
      setIsSaving(false)
    }
  }

  return {
    isSaving,
    handleSubmit
  }
}