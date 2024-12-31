import { useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import { useProfileFormState } from "./useProfileFormState"
import { useProfileFormHandlers } from "./useProfileFormHandlers"
import { transformDatabaseToForm } from "@/utils/installerTransform"

export const useProfileForm = () => {
  const { toast } = useToast()
  const {
    formData,
    setFormData,
    visibilitySettings,
    setVisibilitySettings
  } = useProfileFormState()

  const handlers = useProfileFormHandlers(
    formData,
    setFormData,
    visibilitySettings,
    setVisibilitySettings
  )

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: installer, error } = await supabase
          .from("installers")
          .select()
          .eq("user_id", user.id)
          .maybeSingle()

        if (error) throw error

        if (installer) {
          const transformedData = transformDatabaseToForm(installer)
          setFormData(transformedData)
        } else {
          toast({
            title: "Profil non trouvé",
            description: "Veuillez remplir vos informations professionnelles",
          })
        }
      } catch (error) {
        console.error("Error loading installer data:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'installateur",
          variant: "destructive"
        })
      }
    }

    loadInstallerData()
  }, [toast, setFormData])

  return {
    formData,
    visibilitySettings,
    ...handlers
  }
}