import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PhotovoltaicInfoSection } from "./sections/PhotovoltaicInfoSection"
import { CertificationsSection } from "./sections/CertificationsSection"
import { InstallationTypesSection } from "./sections/InstallationTypesSection"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"

export const ProfileSection = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    experience: "",
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    service_area: [] as string[],
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false
    },
    maintenanceServices: false
  })

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour accéder à cette page",
          variant: "destructive",
        })
        navigate("/login")
        return
      }

      // Fetch existing profile data
      const { data: installer, error: fetchError } = await supabase
        .from('installers')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (fetchError) {
        console.error("Error fetching installer profile:", fetchError)
      } else if (installer) {
        setFormData({
          experience: installer.experience_years?.toString() || "",
          panelBrands: installer.panel_brands?.join(", ") || "",
          inverterBrands: installer.inverter_brands?.join(", ") || "",
          guaranteeYears: installer.warranty_years?.toString() || "",
          service_area: installer.service_area || [],
          certifications: installer.certifications || {
            qualiPV: false,
            rge: false,
            qualibat: false
          },
          installationTypes: installer.installation_types || {
            residential: false,
            commercial: false,
            industrial: false
          },
          maintenanceServices: installer.maintenance_services || false
        })
      }
    }

    getSession()
  }, [navigate, toast])

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
          ...prev[category],
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
    setIsLoading(true)

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        throw new Error("Vous devez être connecté pour créer votre profil")
      }

      const { error } = await supabase
        .from('installers')
        .upsert([
          {
            user_id: session.user.id,
            experience_years: parseInt(formData.experience),
            panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
            inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
            warranty_years: parseInt(formData.guaranteeYears),
            service_area: formData.service_area,
            certifications: formData.certifications,
            installation_types: formData.installationTypes,
            maintenance_services: formData.maintenanceServices,
          }
        ], {
          onConflict: 'user_id'
        })

      if (error) throw error

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès",
      })
      
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la mise à jour de votre profil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
      <PhotovoltaicInfoSection 
        formData={formData} 
        handleChange={handleChange}
      />
      
      <InterventionZonesSection 
        selectedZones={formData.service_area}
        onZonesChange={handleZonesChange}
      />
      
      <CertificationsSection 
        certifications={formData.certifications}
        handleCheckboxChange={handleCheckboxChange}
      />
      
      <InstallationTypesSection 
        installationTypes={formData.installationTypes}
        maintenanceServices={formData.maintenanceServices}
        handleCheckboxChange={handleCheckboxChange}
      />

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Enregistrement..." : "Créer mon profil"}
      </Button>
    </form>
  )
}