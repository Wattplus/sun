import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { DatabaseInstallerData } from '@/types/installer/database'
import { toast } from 'sonner'

export const useInstallerData = () => {
  const [formData, setFormData] = useState<DatabaseInstallerData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          throw new Error('No authenticated user')
        }

        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error) throw error

        if (data) {
          setFormData(data as DatabaseInstallerData)
        }
      } catch (error) {
        console.error('Error fetching installer data:', error)
        toast.error('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

    fetchInstallerData()
  }, [])

  return { formData, setFormData, loading }
}