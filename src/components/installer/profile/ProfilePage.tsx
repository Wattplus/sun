import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProfileHeader } from "./components/ProfileHeader"
import { PhotovoltaicInfoSection } from "./sections/PhotovoltaicInfoSection"
import { CertificationsSection } from "./sections/CertificationsSection"
import { InstallationTypesSection } from "./sections/InstallationTypesSection"
import { InterventionZonesSection } from "../account/sections/InterventionZonesSection"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import type { Json } from "@/integrations/supabase/types"

export const ProfilePage = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    company: "",
    description: "",
    experience: "",
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    service_area: [] as string[],
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false,
    },
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false,
    },
    maintenanceServices: false,
    firstName: "",
    lastName: "",
    email: "",
  })

  useEffect(() => {
    const loadInstallerData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: installer, error } = await supabase
          .from('installers')
          .select()
          .eq('user_id', user.id)
          .maybeSingle()

        if (error) throw error

        if (installer) {
          const [firstName = "", lastName = ""] = (installer.contact_name || "").split(" ")
          
          setFormData({
            company: installer.company_name || "",
            description: installer.description || "",
            experience: installer.experience_years?.toString() || "",
            panelBrands: Array.isArray(installer.panel_brands) ? installer.panel_brands.join(', ') : "",
            inverterBrands: Array.isArray(installer.inverter_brands) ? installer.inverter_brands.join(', ') : "",
            guaranteeYears: installer.warranty_years?.toString() || "",
            service_area: installer.service_area || [],
            certifications: (installer.certifications as any) || {
              qualiPV: false,
              rge: false,
              qualibat: false,
            },
            installationTypes: (installer.installation_types as any) || {
              residential: false,
              commercial: false,
              industrial: false,
            },
            maintenanceServices: installer.maintenance_services || false,
            firstName,
            lastName,
            email: user.email || "",
          })
        }
      } catch (error) {
        console.error('Error loading installer data:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'installateur",
          variant: "destructive"
        })
      }
    }

    loadInstallerData()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.')
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

      const { error: updateError } = await supabase
        .from('installers')
        .update({
          company_name: formData.company,
          description: formData.description,
          experience_years: parseInt(formData.experience),
          panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
          inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
          warranty_years: parseInt(formData.guaranteeYears),
          service_area: formData.service_area,
          certifications: formData.certifications,
          installation_types: formData.installationTypes,
          maintenance_services: formData.maintenanceServices,
          contact_name: `${formData.firstName} ${formData.lastName}`,
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Profil Professionnel</h1>

        <ProfileHeader formData={formData} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <PhotovoltaicInfoSection formData={formData} handleChange={handleChange} />
          
          <CertificationsSection 
            certifications={formData.certifications}
            handleCheckboxChange={handleCheckboxChange}
          />
          
          <InstallationTypesSection 
            installationTypes={formData.installationTypes}
            maintenanceServices={formData.maintenanceServices}
            handleCheckboxChange={handleCheckboxChange}
          />

          <InterventionZonesSection
            selectedZones={formData.service_area}
            onZonesChange={handleZonesChange}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              Enregistrer les modifications
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}