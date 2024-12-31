import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { InstallerFormData } from '@/types/installer'

export const useInstallerData = () => {
  const [formData, setFormData] = useState<InstallerFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [noProfile, setNoProfile] = useState(false)

  useEffect(() => {
    const fetchInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          throw new Error('No authenticated user')
        }

        // Get profile data first
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        // Get installer data
        const { data: installer } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (installer) {
          const fullFormData = {
            firstName: profile?.first_name || installer.contact_name?.split(' ')[0] || '',
            lastName: profile?.last_name || installer.contact_name?.split(' ')[1] || '',
            email: profile?.email || installer.email || user.email || '',
            phone: profile?.phone || installer.phone || '',
            company_name: installer.company_name || '',
            contact_name: installer.contact_name || '',
            siret: installer.siret || '',
            website: installer.website || '',
            description: installer.description || '',
            experience_years: installer.experience_years || 0,
            panel_brands: installer.panel_brands || [],
            inverter_brands: installer.inverter_brands || [],
            warranty_years: installer.warranty_years || 0,
            service_area: installer.service_area || [],
            certifications: installer.certifications || {
              qualiPV: false,
              rge: false,
              qualibat: false
            },
            installation_types: installer.installation_types || {
              residential: false,
              commercial: false,
              industrial: false
            },
            maintenance_services: installer.maintenance_services || false,
            visibility_settings: installer.visibility_settings || {
              showPhoneNumber: true,
              highlightProfile: false,
              showCertifications: true,
              acceptDirectMessages: true
            },
            address: installer.address || '',
            postal_code: installer.postal_code || '',
            city: installer.city || '',
            // Legacy form fields
            company: installer.company_name || '',
            experience: installer.experience_years?.toString() || '',
            panelBrands: (installer.panel_brands || []).join(", "),
            inverterBrands: (installer.inverter_brands || []).join(", "),
            guaranteeYears: installer.warranty_years?.toString() || ''
          }
          setFormData(fullFormData)
        } else {
          setNoProfile(true)
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

  return { formData, setFormData, loading, noProfile }
}