import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData } from "@/types/installer"
import { defaultFormData } from "@/types/installer"
import { transformDatabaseToForm } from "@/utils/installerTransform"

export const useInstallerData = () => {
  const [formData, setFormData] = useState<InstallerFormData>(defaultFormData)
  const [loading, setLoading] = useState(true)
  const [noProfile, setNoProfile] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setNoProfile(true)
          return
        }

        const { data: installer, error } = await supabase
          .from("installers")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            setNoProfile(true)
          } else {
            throw error
          }
        }

        if (installer) {
          const transformedData = transformDatabaseToForm(installer)
          setFormData(transformedData)
          setNoProfile(false)
        }
      } catch (error) {
        console.error("Error loading installer data:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'installateur",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadInstallerData()
  }, [toast])

  return { formData, setFormData, loading, noProfile }
}