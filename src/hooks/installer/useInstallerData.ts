import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { InstallerFormData, DatabaseInstallerData } from "@/types/installer"
import { convertDbToFormFormat, defaultFormData } from "@/types/installer"

export const useInstallerData = () => {
  const [formData, setFormData] = useState<InstallerFormData>(defaultFormData)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchInstallerData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession()
        if (!session?.session?.user) {
          throw new Error('No authenticated user')
        }

        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', session.session.user.id)
          .maybeSingle()

        if (error) throw error

        if (data) {
          setFormData(convertDbToFormFormat(data as DatabaseInstallerData))
        }
      } catch (error) {
        console.error('Error fetching installer:', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger vos informations',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInstallerData()
  }, [toast])

  return { formData, setFormData, loading }
}