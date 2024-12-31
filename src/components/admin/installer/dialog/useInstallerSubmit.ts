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
      // 1. First, ensure user exists in the users table
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('id')
        .eq('id', formData.id)
        .single()

      if (userCheckError || !existingUser) {
        // Create user entry if it doesn't exist
        const { error: userInsertError } = await supabase
          .from('users')
          .insert({
            id: formData.id,
            email: formData.email
          })

        if (userInsertError) throw userInsertError
      }

      // 2. Then create/update installer
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